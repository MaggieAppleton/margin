import assert from 'node:assert/strict'
import test from 'node:test'
import type { Note, Workspace } from '../src/data/model.ts'
import { archiveNote, deleteNote, keepNote, openNote } from '../src/data/notes.ts'
import { isResurfaceCandidate, pickToday, todayNotes } from '../src/data/today.ts'
import { readWorkspace } from '../src/data/storage.ts'

const now = new Date(2026, 9, 20, 12)
const daysAgo = (d: number, from = now) => new Date(+from - d * 86400000).toISOString()
const note = (id: string, viewed: number, extra: Partial<Note> = {}): Note =>
  ({ id, title: id, body: '', createdAt: daysAgo(200), updatedAt: daysAgo(200), lastViewedAt: daysAgo(viewed), tags: [], ...extra })
const space = (...notes: Note[]): Workspace => ({ version: 1, notes, viewEvents: [] })
const ids = (notes: Note[]) => notes.map(n => n.id)

test('candidates exclude archived and notes seen or kept in the last 30 days, oldest view first', () => {
  const state = space(
    note('b', 40), note('fresh', 29), note('arch', 90, { archivedAt: daysAgo(1) }),
    note('a', 60), note('kept', 90, { reviewedAt: daysAgo(10) }), note('edge', 30),
  )
  assert.equal(isResurfaceCandidate(state.notes[1], now), false)
  assert.equal(isResurfaceCandidate(state.notes[4], now), false)
  assert.equal(isResurfaceCandidate(state.notes[5], now), true)
  const picked = pickToday(state, now)
  assert.deepEqual(picked.today, { day: '2026-10-20', noteIds: ['a', 'b', 'edge'] })
})

test('picks at most three and stays fixed for the day without replacements', () => {
  const state = pickToday(space(note('a', 50), note('b', 60), note('c', 70), note('d', 80), note('e', 90)), now)
  assert.deepEqual(state.today?.noteIds, ['e', 'd', 'c'])
  assert.equal(pickToday(state, new Date(2026, 9, 20, 23)), state)
  assert.deepEqual(ids(todayNotes(state, now)), ['e', 'd', 'c'])
  const later = new Date(2026, 9, 20, 18)
  let next = openNote(state, 'e', later.toISOString())
  next = keepNote(next, 'd', later.toISOString())
  next = archiveNote(next, 'c', later.toISOString())
  assert.deepEqual(ids(todayNotes(pickToday(next, later), later)), [])
  assert.deepEqual(ids(todayNotes(pickToday(deleteNote(state, 'd'), later), later)), ['e', 'c'])
  assert.deepEqual(ids(todayNotes(pickToday(openNote(state, 'c', later.toISOString()), later), later)), ['e', 'd'])
})

test('a new day picks a fresh set from current candidates', () => {
  const state = pickToday(space(note('a', 50), note('b', 60), note('c', 70), note('d', 80), note('e', 90)), now)
  const tomorrow = new Date(2026, 9, 21, 9)
  const opened = openNote(state, 'e', tomorrow.toISOString())
  const next = pickToday(opened, tomorrow)
  assert.deepEqual(next.today, { day: '2026-10-21', noteIds: ['d', 'c', 'b'] })
})

test('keep leaves Today, keeps timestamps, and returns after 30 days', () => {
  const state = pickToday(space(note('a', 50, { updatedAt: daysAgo(50) })), now)
  const at = now.toISOString()
  const kept = keepNote(state, 'a', at)
  assert.equal(kept.notes[0].reviewedAt, at)
  assert.equal(kept.notes[0].updatedAt, state.notes[0].updatedAt)
  assert.equal(kept.notes[0].lastViewedAt, state.notes[0].lastViewedAt)
  assert.deepEqual(todayNotes(kept, now), [])
  assert.equal(isResurfaceCandidate(kept.notes[0], new Date(+now + 29 * 86400000)), false)
  assert.equal(isResurfaceCandidate(kept.notes[0], new Date(+now + 30 * 86400000)), true)
})

test('loader accepts workspaces without the new fields and rejects invalid ones', () => {
  const load = (value: unknown) => readWorkspace({ getItem: () => JSON.stringify(value), setItem() {} })
  const base = space(note('a', 50))
  assert.deepEqual(load(base), base)
  const full = { ...pickToday(keepNote(base, 'a', now.toISOString()), now) }
  assert.deepEqual(load(full), full)
  assert.throws(() => load({ ...base, notes: [note('a', 50, { reviewedAt: 'nope' })] }))
  assert.throws(() => load({ ...base, today: { day: '2026-10-20', noteIds: [1] } }))
  assert.throws(() => load({ ...base, today: { day: 'x', noteIds: [] } }))
  assert.throws(() => load({ ...base, today: null }))
})
