import assert from 'node:assert/strict'
import test from 'node:test'
import { archiveNote, unarchiveNote, openNote } from '../src/data/notes.ts'
import { readWorkspace } from '../src/data/storage.ts'
import { createSeedWorkspace } from '../src/data/seeds.ts'

const at = '2026-10-20T09:00:00.000Z'

function storageWith(value: unknown) {
  return { getItem: () => JSON.stringify(value), setItem: () => {} }
}

test('archiving sets archivedAt on one note and leaves activity untouched', () => {
  const state = openNote(createSeedWorkspace(), createSeedWorkspace().notes[0].id, at)
  const id = state.notes[3].id
  const next = archiveNote(state, id, at)
  assert.equal(next.notes[3].archivedAt, at)
  assert.equal(next.notes.filter(n => n.archivedAt).length, 1)
  assert.equal(next.notes[3].updatedAt, state.notes[3].updatedAt)
  assert.equal(next.notes[3].lastViewedAt, state.notes[3].lastViewedAt)
  assert.deepEqual(next.viewEvents, state.viewEvents)
  assert.equal(next.version, 1)
})

test('unarchiving removes the field and leaves activity untouched', () => {
  const state = archiveNote(createSeedWorkspace(), createSeedWorkspace().notes[3].id, at)
  const next = unarchiveNote(state, state.notes[3].id)
  assert.equal('archivedAt' in next.notes[3], false)
  assert.equal(next.notes[3].updatedAt, state.notes[3].updatedAt)
  assert.equal(next.notes[3].lastViewedAt, state.notes[3].lastViewedAt)
  assert.deepEqual(next.viewEvents, state.viewEvents)
})

test('workspaces load with or without a valid archivedAt', () => {
  const state = createSeedWorkspace()
  assert.equal(readWorkspace(storageWith(state)).notes.length, 150)
  const archived = archiveNote(state, state.notes[0].id, at)
  assert.equal(readWorkspace(storageWith(archived)).notes[0].archivedAt, at)
})

test('an invalid archivedAt is reported as unreadable', () => {
  const state = createSeedWorkspace()
  const bad = { ...state, notes: [{ ...state.notes[0], archivedAt: 'yesterday' }, ...state.notes.slice(1)] }
  assert.throws(() => readWorkspace(storageWith(bad)), /saved notes/)
  const num = { ...state, notes: [{ ...state.notes[0], archivedAt: 5 }, ...state.notes.slice(1)] }
  assert.throws(() => readWorkspace(storageWith(num)), /saved notes/)
})
