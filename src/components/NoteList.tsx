import { Plus, Search, X } from 'lucide-react'
import type { Note } from '../data/model'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
  notes: Note[]
  selectedId: string | null
  query: string
  total: number
  home: boolean
  onHome: () => void
  onQuery: (query: string) => void
  onSelect: (id: string) => void
  onNew: () => void
}

export function NoteList({ notes, selectedId, query, total, home, onHome, onQuery, onSelect, onNew }: Props) {
  const searching = query.trim()
  return <aside className="sidebar" aria-label="Notes">
    <header className="sidebar-header">
      <h1><button className={`home-link${home ? ' current' : ''}`} aria-current={home ? 'page' : undefined} onClick={onHome}>Margin</button></h1>
      <Button className="new-note" size="icon" variant="ghost" aria-label="New note" title="New note" onClick={onNew}><Plus /></Button>
    </header>
    <div className="search">
      <Search className="search-icon" size={14} strokeWidth={1.75} aria-hidden="true" />
      <Input className="search-input" type="search" aria-label="Search notes" placeholder="Search" value={query} onChange={event => onQuery(event.target.value)} />
      {query
        ? <Button className="search-end clear-search" variant="ghost" size="icon" aria-label="Clear search" title="Clear search" onClick={() => onQuery('')}><X size={14} strokeWidth={1.75} /></Button>
        : <span className="search-end" aria-hidden="true"><kbd className="search-kbd">⌘K</kbd></span>}
    </div>
    {searching && <p className="results" aria-live="polite">{notes.length} {notes.length === 1 ? 'result' : 'results'}</p>}
    <nav className="notes-scroll" aria-label="Choose a note">
      {notes.map(note => <button key={note.id} className={`note-row${selectedId === note.id ? ' selected' : ''}`} aria-current={selectedId === note.id ? 'true' : undefined} onClick={() => onSelect(note.id)}>
        <span className="note-row-title">{note.title.trim() || 'Untitled'}</span>
      </button>)}
      {!notes.length && <p className="list-empty">{searching ? `No matches for “${searching}”` : total ? 'No notes' : 'No notes yet'}</p>}
    </nav>
  </aside>
}
