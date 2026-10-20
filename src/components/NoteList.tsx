import { House, Plus, Search, X } from 'lucide-react'
import type { Note } from '../data/model'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
  notes: Note[]
  selectedId: string | null
  query: string
  total: number
  homeActive: boolean
  onHome: () => void
  onQuery: (query: string) => void
  onSelect: (id: string) => void
  onNew: () => void
}

const mod = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K'

export function NoteList({ notes, selectedId, query, total, homeActive, onHome, onQuery, onSelect, onNew }: Props) {
  const searching = query.trim()
  return <aside className="sidebar" aria-label="Notes">
    <header className="sidebar-header">
      <h1>Margin</h1>
      <Button className="new-note" size="icon" variant="ghost" aria-label="New note" title="New note" onClick={onNew}><Plus /></Button>
    </header>
    <div className="search">
      <Search className="search-icon" size={14} strokeWidth={1.75} aria-hidden="true" />
      <Input className="search-input" type="search" aria-label="Search notes" placeholder="Search" value={query} onChange={event => onQuery(event.target.value)} onKeyDown={event => {
        if (event.key !== 'Escape') return
        if (query) onQuery('')
        else event.currentTarget.blur()
      }} />
      {query
        ? <Button className="search-end clear-search" variant="ghost" size="icon" aria-label="Clear search" title="Clear search" onClick={() => onQuery('')}><X size={14} strokeWidth={1.75} /></Button>
        : <span className="search-end" aria-hidden="true"><kbd className="search-kbd">{mod}</kbd></span>}
    </div>
    <button className={`note-row home-row${homeActive ? ' selected' : ''}`} aria-current={homeActive ? 'page' : undefined} onClick={onHome}>
      <House size={14} strokeWidth={1.75} aria-hidden="true" /><span className="note-row-title">Home</span>
    </button>
    {searching && <p className="results" aria-live="polite">{notes.length} {notes.length === 1 ? 'result' : 'results'}</p>}
    <nav className="notes-scroll" aria-label="Choose a note">
      {notes.map(note => <button key={note.id} className={`note-row${selectedId === note.id ? ' selected' : ''}`} aria-current={selectedId === note.id ? 'true' : undefined} onClick={() => onSelect(note.id)}>
        <span className="note-row-title">{note.title.trim() || 'Untitled'}</span>
      </button>)}
      {!notes.length && <p className="list-empty">{searching ? `No matches for “${searching}”` : total ? 'No notes' : 'No notes yet'}</p>}
    </nav>
  </aside>
}
