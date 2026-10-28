import assert from 'node:assert/strict'
import test from 'node:test'
import type { Note } from '../src/data/model.ts'
import { applyRating, dailyResurfacingLimit, dueAt, minimumEaseFactor, provisionalJoinDelayDays, ratingGrades, selectResurfacedNotes } from '../src/data/resurfacing.ts'

const dayMs = 86400000
const today = new Date(2026, 9, 28, 9, 0)
const at = today.toISOString()
const daysFrom = (date: Date, days: number) => new Date(+date + days * dayMs).toISOString()

function note(id: string, createdDaysAgo: number, review?: Note['review']): Note {
  const createdAt = daysFrom(today, -createdDaysAgo)
  return { id, title: id, body: '', createdAt, updatedAt: createdAt, lastViewedAt: createdAt, tags: [], review }
}

test('three ratings map to fixed SM-2 grades, one failing and two passing', () => {
  assert.deepEqual(ratingGrades, { faded: 2, familiar: 4, fresh: 5 })
})

test('passing ratings step through 1 day, 6 days, then interval times ease factor', () => {
  const first = applyRating(undefined, 'familiar', at)
  assert.equal(first.intervalDays, 1)
  assert.equal(first.repetitions, 1)
  assert.equal(first.easeFactor, 2.5)
  assert.equal(first.dueAt, daysFrom(today, 1))
  assert.equal(first.lastReviewedAt, at)
  assert.equal(first.lastRating, 'familiar')
  const second = applyRating(first, 'fresh', at)
  assert.equal(second.intervalDays, 6)
  assert.equal(second.repetitions, 2)
  assert.ok(Math.abs(second.easeFactor - 2.6) < 1e-9)
  const third = applyRating(second, 'fresh', at)
  assert.equal(third.intervalDays, Math.round(6 * second.easeFactor))
  assert.equal(third.dueAt, daysFrom(today, third.intervalDays))
})

test('a faded rating resets repetitions to a 1-day interval and lowers ease', () => {
  const learned = { easeFactor: 2.5, intervalDays: 15, repetitions: 3, dueAt: at, lastReviewedAt: at }
  const faded = applyRating(learned, 'faded', at)
  assert.equal(faded.repetitions, 0)
  assert.equal(faded.intervalDays, 1)
  assert.ok(Math.abs(faded.easeFactor - 2.18) < 1e-9)
  assert.equal(faded.dueAt, daysFrom(today, 1))
})

test('ease factor never drops below 1.3', () => {
  let review = applyRating(undefined, 'faded', at)
  for (let i = 0; i < 10; i++) review = applyRating(review, 'faded', at)
  assert.equal(review.easeFactor, minimumEaseFactor)
})

test('notes without review state join the schedule a provisional 7 days after creation', () => {
  assert.equal(provisionalJoinDelayDays, 7)
  const fresh = note('fresh', 3)
  assert.equal(dueAt(fresh), daysFrom(today, 4))
  assert.deepEqual(selectResurfacedNotes([fresh], today), [])
  assert.deepEqual(selectResurfacedNotes([note('old', 7)], today).map(n => n.id), ['old'])
})

test('daily selection caps at 5, most overdue first, and excludes notes not yet due', () => {
  const notes = [note('a', 8), note('b', 30), note('c', 12), note('d', 40), note('e', 9), note('f', 20), note('g', 2),
    note('h', 100, { easeFactor: 2.5, intervalDays: 6, repetitions: 2, dueAt: daysFrom(today, 3), lastReviewedAt: daysFrom(today, -3) })]
  const picked = selectResurfacedNotes(notes, today)
  assert.equal(picked.length, dailyResurfacingLimit)
  assert.deepEqual(picked.map(n => n.id), ['d', 'b', 'f', 'c', 'e'])
})

test('selection is stable through the day and rating does not pull in a sixth note', () => {
  const notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((id, i) => note(id, 10 + i))
  const morning = selectResurfacedNotes(notes, today).map(n => n.id)
  const evening = new Date(2026, 9, 28, 22, 0)
  assert.deepEqual(selectResurfacedNotes(notes, evening).map(n => n.id), morning)
  const rated = notes.map(n => n.id === morning[0] ? { ...n, review: applyRating(n.review, 'faded', at) } : n)
  const after = selectResurfacedNotes(rated, evening).map(n => n.id)
  assert.equal(after.length, 5)
  assert.deepEqual([...after].sort(), [...morning].sort())
  assert.equal(after[0], morning[0])
})
