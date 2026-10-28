import { useState } from 'react'
import type { Workspace } from './data/model'
import { createNote, deleteNote, editNote, openNote } from './data/notes'
import { saveWorkspace } from './data/storage'
import { NoteList } from './components/NoteList'
import { NoteEditor } from './components/NoteEditor'
import { Home } from './components/Home'

type NoteOrigin = 'home' | 'list'

const recentLimit = 8

export function App({ initial }: { initial: Workspace }) {
  const [workspace, setWorkspace] = useState(initial)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [origin, setOrigin] = useState<NoteOrigin>('home')
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [mobileList, setMobileList] = useState(false)

  function commit(next: Workspace) {
    setWorkspace(next)
    try {
      saveWorkspace(localStorage, next)
      setError(null)
    } catch {
      setError('Your browser couldn’t save these changes. Keep this tab open and free up browser storage, then edit again to retry.')
    }
  }

  function select(id: string, from: NoteOrigin) {
    commit(openNote(workspace, id, new Date().toISOString()))
    setSelectedId(id)
    setOrigin(from)
    setMobileList(false)
  }

  function add() {
    const id = crypto.randomUUID()
    commit(createNote(workspace, id, new Date().toISOString()))
    setSelectedId(id)
    setOrigin(mobileList ? 'list' : 'home')
    setQuery('')
    setMobileList(false)
  }

  function goHome() {
    setSelectedId(null)
    setMobileList(false)
  }

  function back() {
    setSelectedId(null)
    setMobileList(origin === 'list')
  }

  function remove() {
    if (!selectedId) return
    commit(deleteNote(workspace, selectedId))
    goHome()
  }

  const needle = query.toLocaleLowerCase().trim()
  const byEdit = [...workspace.notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const visible = byEdit.filter(note => !needle || `${note.title}\n${note.body}\n${note.tags.join(' ')}`.toLocaleLowerCase().includes(needle))
  const selected = workspace.notes.find(note => note.id === selectedId)

  return <div className={`workspace${mobileList ? ' show-list' : ''}`}>
    <NoteList notes={visible} selectedId={selectedId} query={query} onQuery={setQuery} total={workspace.notes.length} home={!selected} onHome={goHome} onSelect={id => select(id, 'list')} onNew={add} />
    {selected
      ? <NoteEditor note={selected} error={error} backLabel={origin === 'list' ? 'All notes' : 'Home'} onBack={back} onDelete={remove} onEdit={patch => {
          if (selectedId) commit(editNote(workspace, selectedId, patch, new Date().toISOString()))
        }} />
      : <Home recent={byEdit.slice(0, recentLimit)} error={error} onOpen={id => select(id, 'home')} onNew={add} onAllNotes={() => setMobileList(true)} />}
  </div>
}
