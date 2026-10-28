import assert from 'node:assert/strict'
import test from 'node:test'
import { readWorkspace, saveWorkspace } from '../src/data/storage.ts'
import { createSeedWorkspace } from '../src/data/seeds.ts'

function memoryStorage() {
  const data = new Map<string, string>()
  return { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => { data.set(key, value) } }
}

test('first run seeds, edits persist, and reset restores fixtures', () => {
  const storage = memoryStorage()
  const initial = readWorkspace(storage)
  assert.equal(initial.notes.length, 150)
  initial.notes[0].body = 'An edited thought'
  saveWorkspace(storage, initial)
  assert.equal(readWorkspace(storage).notes[0].body, 'An edited thought')
  assert.notEqual(readWorkspace(storage, true).notes[0].body, 'An edited thought')
})

test('an empty workspace persists instead of being seeded again', () => {
  const storage = memoryStorage()
  saveWorkspace(storage, { version: 2, notes: [], viewEvents: [] })
  assert.deepEqual(readWorkspace(storage).notes, [])
})

test('unreadable data is preserved and reported instead of silently overwritten', () => {
  const storage = memoryStorage()
  storage.setItem('margin.workspace.v1', '{broken')
  assert.throws(() => readWorkspace(storage), /saved notes/)
  assert.equal(storage.getItem('margin.workspace.v1'), '{broken')
  assert.equal(readWorkspace(storage, true).notes.length, 150)
})

test('malformed data is rejected and storage errors reach the caller', () => {
  const storage = memoryStorage()
  storage.setItem('margin.workspace.v1', JSON.stringify({ version: 1, notes: [{}], viewEvents: [] }))
  assert.throws(() => readWorkspace(storage), /saved notes/)
  assert.throws(() => saveWorkspace({ setItem() { throw new Error('Quota exceeded') } }, createSeedWorkspace()), /Quota exceeded/)
})

test('a stored version 1 workspace loads as version 2 and saves as version 2', () => {
  const storage = memoryStorage()
  const { notes, viewEvents } = createSeedWorkspace()
  storage.setItem('margin.workspace.v1', JSON.stringify({ version: 1, notes, viewEvents }))
  const loaded = readWorkspace(storage)
  assert.equal(loaded.version, 2)
  assert.deepEqual(loaded.notes, notes)
  assert.deepEqual(loaded.viewEvents, viewEvents)
  assert.ok(loaded.notes.every(note => note.review === undefined))
  saveWorkspace(storage, loaded)
  assert.equal(JSON.parse(storage.getItem('margin.workspace.v1')!).version, 2)
})

test('review state persists and malformed review state is rejected without overwriting', () => {
  const storage = memoryStorage()
  const state = createSeedWorkspace()
  const review = { easeFactor: 2.5, intervalDays: 6, repetitions: 2, dueAt: '2026-11-01T00:00:00.000Z', lastReviewedAt: '2026-10-26T00:00:00.000Z' }
  state.notes[0].review = review
  saveWorkspace(storage, state)
  assert.deepEqual(readWorkspace(storage).notes[0].review, review)
  for (const bad of [{ ...review, easeFactor: 'high' }, { ...review, intervalDays: NaN }, { ...review, dueAt: 'soon' }, { ...review, lastReviewedAt: 5 }, null]) {
    state.notes[0].review = bad as never
    const raw = JSON.stringify(state)
    storage.setItem('margin.workspace.v1', raw)
    assert.throws(() => readWorkspace(storage), /saved notes/)
    assert.equal(storage.getItem('margin.workspace.v1'), raw)
  }
})
