import { seedFixtures } from '../src/data/fixtures.ts'

export type Approach = 'random' | 'spacedRepetition' | 'decay'
export interface SimNote {
  id: string
  createdDay: number
  lastSeenDay: number
  stage: number
}

const intervals = [1, 3, 7, 14, 30]
const days = 90
const picksPerDay = 3
const randomSeed = 42

function seededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    return state / 4294967296
  }
}

export function chooseNotes(approach: Approach, notes: SimNote[], day: number, random: () => number): SimNote[] {
  const candidates = notes.filter(note => note.createdDay <= day)
  if (approach === 'random') {
    // Sample without replacement; a note cannot appear twice on the same day.
    const selected: SimNote[] = []
    while (selected.length < picksPerDay && candidates.length) {
      selected.push(candidates.splice(Math.floor(random() * candidates.length), 1)[0])
    }
    return selected
  }
  if (approach === 'decay') {
    return candidates.sort((a, b) => a.lastSeenDay - b.lastSeenDay || a.id.localeCompare(b.id)).slice(0, picksPerDay)
  }
  const due = (note: SimNote) => note.lastSeenDay + intervals[note.stage]
  return candidates.filter(note => due(note) <= day)
    .sort((a, b) => due(a) - due(b) || a.id.localeCompare(b.id)).slice(0, picksPerDay)
}

function runApproach(approach: Approach) {
  const notes: SimNote[] = seedFixtures.map(fixture => ({
    id: fixture.id,
    createdDay: -fixture.createdDaysAgo,
    lastSeenDay: -fixture.viewedDaysAgo.at(-1)!,
    stage: Math.min(fixture.viewedDaysAgo.length - 1, intervals.length - 1),
  }))
  const random = seededRandom(randomSeed)
  const seen = new Map<string, number>()
  const repeated = new Set<string>()
  let repeatsWithin14Days = 0
  const ageDistribution = [
    { label: '0–6 days', min: 0, max: 7, count: 0 },
    { label: '7–29 days', min: 7, max: 30, count: 0 },
    { label: '30–89 days', min: 30, max: 90, count: 0 },
    { label: '90+ days', min: 90, max: null, count: 0 },
  ]
  const daily = []
  for (let day = 1; day <= days; day++) {
    const selected = chooseNotes(approach, notes, day, random)
    if (selected.length !== picksPerDay) throw new Error(`Not enough due notes for ${approach} on day ${day}`)
    const agesInDays = selected.map(note => Math.floor(day - note.createdDay))
    const unseenDays = selected.map(note => Number((day - note.lastSeenDay).toFixed(2)))
    for (const note of selected) {
      const previous = seen.get(note.id)
      if (previous !== undefined && day - previous <= 14) {
        repeatsWithin14Days++
        repeated.add(note.id)
      }
      seen.set(note.id, day)
      const age = day - note.createdDay
      ageDistribution.find(bucket => age >= bucket.min && (bucket.max === null || age < bucket.max))!.count++
      note.lastSeenDay = day
      note.stage = Math.min(note.stage + 1, intervals.length - 1)
    }
    daily.push({ day, noteIds: selected.map(note => note.id), coverage: seen.size / notes.length, agesInDays, unseenDays })
  }
  return { uniqueNotes: seen.size, coverage: seen.size / notes.length, repeatsWithin14Days, notesRepeatedWithin14Days: repeated.size, ageDistribution, daily }
}

export function simulate() {
  return {
    settings: { days, picksPerDay, noteCount: seedFixtures.length, randomSeed, intervals },
    definitions: {
      cohort: 'All seed notes exist on day 0; simulate the next 90 days with no new notes.',
      coverage: 'Share of the 150 notes surfaced at least once during this simulation, excluding seed history.',
      repeats: 'A simulated appearance within 14 days (inclusive) of its previous simulated appearance. Seed views do not count as repeats.',
      age: 'Days since creation at each appearance; daily unseenDays also records days since the previous view.',
      spacedRepetition: 'Seed reopens initialise the interval stage. Choose the earliest overdue notes, advance one stage after each view, and cap the interval at 30 days. A three-note daily limit can delay a due note.',
    },
    approaches: {
      random: runApproach('random'),
      spacedRepetition: runApproach('spacedRepetition'),
      decay: runApproach('decay'),
    },
  }
}
