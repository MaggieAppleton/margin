import { FileText, Plus, Search, X } from 'lucide-react'
import type { Note } from '../data/model'
import { relativeDate } from '../lib/dates'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface Props {
  notes: Note[]
  selectedId: string | null
  query: string
  total: number
  onQuery: (query: string) => void
  onSelect: (id: string) => void
  onNew: () => void
}

export function NoteList({ notes, selectedId, query, total, onQuery, onSelect, onNew }: Props) {
  return <aside className="sidebar" aria-label="Notes">
    <header className="sidebar-header">
      <div className="brand"><span className="brand-mark" aria-hidden="true">m</span><h1>Margin</h1></div>
      <Button className="new-note" size="icon" variant="ghost" aria-label="New note" title="New note" onClick={onNew}><Plus /></Button>
    </header>
    <div className="search-wrap">
      <Search aria-hidden="true" size={17} />
      <Input type="search" aria-label="Search notes" placeholder="Search your notes" value={query} onChange={event => onQuery(event.target.value)} />
      {query && <Button variant="ghost" size="icon" className="clear-search" aria-label="Clear search" onClick={() => onQuery('')}><X size={15} /></Button>}
    </div>
    <div className="list-heading"><span>{query ? 'Search results' : 'All notes'}</span><span aria-live="polite">{query ? `${notes.length} of ${total}` : total}</span></div>
    <nav className="notes-scroll" aria-label="Choose a note">
      {notes.length ? <ul className="notes-list">
        {notes.map(note => <li key={note.id}>
          <button className={`note-row${selectedId === note.id ? ' selected' : ''}`} aria-current={selectedId === note.id ? 'true' : undefined} onClick={() => onSelect(note.id)}>
            <span className="note-row-title">{note.title.trim() || 'Untitled note'}</span>
            <span className="note-preview">{note.body.split('\n').find(line => line.trim()) || 'A little room to think.'}</span>
            <time dateTime={note.updatedAt} title={new Date(note.updatedAt).toLocaleString()}>{relativeDate(note.updatedAt)}</time>
          </button>
        </li>)}
      </ul> : <div className="list-empty"><FileText size={22} aria-hidden="true" /><p>{query ? 'No notes found.' : 'A fresh page awaits.'}</p><span>{query ? 'Try another word or clear your search.' : 'Add a note with the + button above.'}</span></div>}
    </nav>
    <footer className="sidebar-footer"><span className="local-dot" /> A little room to think.</footer>
  </aside>
}
