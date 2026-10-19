import { useState } from 'react'
import type { Workspace } from './data/model'
import { createNote, deleteNote, editNote, openNote } from './data/notes'
import { saveWorkspace } from './data/storage'
import { NoteList } from './components/NoteList'
import { NoteEditor } from './components/NoteEditor'

export function App({ initial, initialId, initialError }: { initial: Workspace; initialId: string | null; initialError: string | null }) {
  const [workspace, setWorkspace] = useState(initial)
  const [selectedId, setSelectedId] = useState(initialId)
  const [query, setQuery] = useState('')
  const [error, setError] = useState(initialError)
  const [mobileEditor, setMobileEditor] = useState(false)

  function commit(next: Workspace) {
    setWorkspace(next)
    try {
      saveWorkspace(localStorage, next)
      setError(null)
    } catch {
      setError('Your browser couldn’t save these changes. Keep this tab open and free up browser storage, then edit again to retry.')
    }
  }

  function select(id: string) {
    if (id !== selectedId) commit(openNote(workspace, id, new Date().toISOString()))
    setSelectedId(id)
    setMobileEditor(true)
  }

  function add() {
    const id = crypto.randomUUID()
    commit(createNote(workspace, id, new Date().toISOString()))
    setSelectedId(id)
    setQuery('')
    setMobileEditor(true)
  }

  function remove() {
    if (!selectedId) return
    let next = deleteNote(workspace, selectedId)
    const nextId = [...next.notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.id ?? null
    if (nextId) next = openNote(next, nextId, new Date().toISOString())
    commit(next)
    setSelectedId(nextId)
    if (!nextId) setMobileEditor(false)
  }

  const needle = query.toLocaleLowerCase().trim()
  const visible = workspace.notes.filter(note => !needle || `${note.title}\n${note.body}\n${note.tags.join(' ')}`.toLocaleLowerCase().includes(needle))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const selected = workspace.notes.find(note => note.id === selectedId)

  return <div className={`workspace${mobileEditor ? ' show-editor' : ''}`}>
    <NoteList notes={visible} selectedId={selectedId} query={query} onQuery={setQuery} total={workspace.notes.length} onSelect={select} onNew={add} />
    <NoteEditor note={selected} error={error} onBack={() => setMobileEditor(false)} onNew={add} onDelete={remove} onEdit={patch => {
      if (selectedId) commit(editNote(workspace, selectedId, patch, new Date().toISOString()))
    }} />
  </div>
}
