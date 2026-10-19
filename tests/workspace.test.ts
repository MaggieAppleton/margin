import assert from 'node:assert/strict'
import test from 'node:test'
import { createSeedWorkspace } from '../src/data/seeds.ts'
import { openNote, createNote, editNote, deleteNote } from '../src/data/notes.ts'

const now = new Date('2026-10-19T12:00:00Z')

test('seeds have 150 unique notes and a 40% never-reopened long tail', () => {
  const { notes, viewEvents } = createSeedWorkspace(now)
  assert.equal(notes.length, 150)
  assert.equal(new Set(notes.map(n => n.id)).size, 150)
  assert.equal(notes.filter(n => viewEvents.filter(v => v.noteId === n.id).length === 1).length, 60)
  assert.ok(notes.some(n => viewEvents.filter(v => v.noteId === n.id).length > 10))
  for (const note of notes) {
    const history = viewEvents.filter(v => v.noteId === note.id)
    assert.ok(history.length >= 1)
    assert.equal(note.lastViewedAt, history.at(-1)?.viewedAt)
    assert.ok(Date.parse(note.createdAt) <= Date.parse(note.updatedAt))
    assert.ok(Date.parse(note.updatedAt) <= Date.parse(note.lastViewedAt), `${note.id} was edited after its last view`)
    assert.ok(history.every(v => Date.parse(v.viewedAt) >= Date.parse(note.createdAt) && Date.parse(v.viewedAt) <= +now))
    assert.ok(+now - Date.parse(note.createdAt) <= 90 * 86400000)
  }
})

test('opening appends a view without changing the note edit time', () => {
  const state = createSeedWorkspace(now)
  const note = state.notes[0]
  const viewedAt = new Date(+now + 1000).toISOString()
  const opened = openNote(state, note.id, viewedAt)
  assert.equal(opened.notes[0].lastViewedAt, viewedAt)
  assert.equal(opened.notes[0].updatedAt, note.updatedAt)
  assert.deepEqual(opened.viewEvents.at(-1), { noteId: note.id, viewedAt })
  assert.equal(state.viewEvents.length + 1, opened.viewEvents.length)
  assert.equal(openNote(state, 'missing', viewedAt), state)
})

test('create, edit, and delete preserve timestamps and remove orphan history', () => {
  const initial = createSeedWorkspace(now)
  const at = now.toISOString()
  const added = createNote(initial, 'new-note', at)
  const edited = editNote(added, 'new-note', { title: 'A thought', body: 'Keep this.' }, at)
  const note = edited.notes.find(n => n.id === 'new-note')!
  assert.equal(note.title, 'A thought')
  assert.equal(note.body, 'Keep this.')
  assert.equal(note.createdAt, at)
  assert.equal(note.lastViewedAt, at)
  assert.deepEqual(note.tags, [])
  const deleted = deleteNote(edited, 'new-note')
  assert.equal(deleted.notes.length, 150)
  assert.ok(!deleted.viewEvents.some(v => v.noteId === 'new-note'))
})

test('seed dates move with recording day and remain deterministic', () => {
  const first = createSeedWorkspace(now)
  assert.deepEqual(first, createSeedWorkspace(now))
  const tomorrow = createSeedWorkspace(new Date(+now + 86400000))
  assert.equal(Date.parse(tomorrow.notes[0].createdAt) - Date.parse(first.notes[0].createdAt), 86400000)
})
