import type { Note, ReviewState, Workspace } from './model.ts'

const dayMs = 86400000

export const ratingGrades = { faded: 2, familiar: 4, fresh: 5 } as const
export type Rating = keyof typeof ratingGrades
export const ratings = Object.keys(ratingGrades) as Rating[]

export const dailyResurfacingLimit = 5
export const initialEaseFactor = 2.5
export const minimumEaseFactor = 1.3
export const provisionalJoinDelayDays = 7

export function applyRating(review: ReviewState | undefined, rating: Rating, at: string): ReviewState {
  const grade = ratingGrades[rating]
  const easeFactor = review?.easeFactor ?? initialEaseFactor
  const repetitions = review?.repetitions ?? 0
  const passed = grade >= 3
  const intervalDays = !passed ? 1
    : repetitions === 0 ? 1
    : repetitions === 1 ? 6
    : Math.round((review?.intervalDays ?? 1) * easeFactor)
  const shortfall = 5 - grade
  return {
    easeFactor: Math.max(minimumEaseFactor, easeFactor + 0.1 - shortfall * (0.08 + shortfall * 0.02)),
    intervalDays,
    repetitions: passed ? repetitions + 1 : 0,
    dueAt: new Date(Date.parse(at) + intervalDays * dayMs).toISOString(),
    lastReviewedAt: at,
    lastRating: rating,
  }
}

export function dueAt(note: Note): string {
  return note.review?.dueAt ?? new Date(Date.parse(note.createdAt) + provisionalJoinDelayDays * dayMs).toISOString()
}

function localDayBounds(day: Date) {
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate())
  const end = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
  return { start: +start, end: +end }
}

export function reviewedOn(note: Note, day: Date): boolean {
  if (!note.review) return false
  const { start, end } = localDayBounds(day)
  const reviewed = Date.parse(note.review.lastReviewedAt)
  return reviewed >= start && reviewed < end
}

export function selectResurfacedNotes(notes: Note[], day: Date): Note[] {
  const { end } = localDayBounds(day)
  const byId = (a: Note, b: Note) => a.id.localeCompare(b.id)
  const reviewed = notes.filter(note => reviewedOn(note, day))
    .sort((a, b) => a.review!.lastReviewedAt.localeCompare(b.review!.lastReviewedAt) || byId(a, b))
  const due = notes.filter(note => !reviewedOn(note, day) && Date.parse(dueAt(note)) < end)
    .sort((a, b) => Date.parse(dueAt(a)) - Date.parse(dueAt(b)) || byId(a, b))
  return [...reviewed, ...due].slice(0, dailyResurfacingLimit)
}

export function rateNote(state: Workspace, id: string, rating: Rating, at: Date): Workspace {
  const note = state.notes.find(candidate => candidate.id === id)
  if (!note || reviewedOn(note, at)) return state
  const review = applyRating(note.review, rating, at.toISOString())
  return { ...state, notes: state.notes.map(candidate => candidate.id === id ? { ...candidate, review } : candidate) }
}
