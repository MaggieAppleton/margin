import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import type { Workspace } from './data/model'
import { archiveNote, createNote, deleteNote, editNote, openNote, unarchiveNote } from './data/notes'
import { saveWorkspace } from './data/storage'
import { NoteList } from './components/NoteList'
import { NoteEditor } from './components/NoteEditor'

export function App({ initial, initialId, initialError }: { initial: Workspace; initialId: string | null; initialError: string | null }) {
  const [workspace, setWorkspace] = useState(initial)
  const [selectedId, setSelectedId] = useState(initialId)
  const [query, setQuery] = useState('')
  const [error, setError] = useState(initialError)
  const [mobileEditor, setMobileEditor] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      flushSync(() => setMobileEditor(false))
      const input = document.querySelector<HTMLInputElement>('.search-input')
      input?.focus()
      input?.select()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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
    commit(openNote(workspace, id, new Date().toISOString()))
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
    const nextId = [...next.notes].filter(note => !note.archivedAt).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.id ?? null
    if (nextId) next = openNote(next, nextId, new Date().toISOString())
    commit(next)
    setSelectedId(nextId)
    if (!nextId) setMobileEditor(false)
  }

  function archive() {
    if (selectedId) commit(archiveNote(workspace, selectedId, new Date().toISOString()))
  }

  function unarchive() {
    if (selectedId) commit(unarchiveNote(workspace, selectedId))
  }

  const needle = query.toLocaleLowerCase().trim()
  const active = workspace.notes.filter(note => !note.archivedAt)
  const visible = (needle ? workspace.notes : active).filter(note => !needle || `${note.title}\n${note.body}\n${note.tags.join(' ')}`.toLocaleLowerCase().includes(needle))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const selected = workspace.notes.find(note => note.id === selectedId)

  return <div className={`workspace${mobileEditor ? ' show-editor' : ''}`}>
    <NoteList notes={visible} selectedId={selectedId} query={query} onQuery={setQuery} total={active.length} onSelect={select} onNew={add} />
    <NoteEditor note={selected} error={error} onBack={() => setMobileEditor(false)} onNew={add} onDelete={remove} onArchive={archive} onUnarchive={unarchive} onEdit={patch => {
      if (selectedId) commit(editNote(workspace, selectedId, patch, new Date().toISOString()))
    }} />
  </div>
}
