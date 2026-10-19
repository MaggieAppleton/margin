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
  saveWorkspace(storage, { version: 1, notes: [], viewEvents: [] })
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
