import { ChevronLeft } from 'lucide-react'
import type { Note } from '../data/model'
import { relativeDate } from '../lib/dates'
import { Button } from './ui/button'

interface Props {
  notes: Note[]
  onOpen: (id: string) => void
  onBack: () => void
}

export function HomePage({ notes, onOpen, onBack }: Props) {
  return <main className="editor home" aria-label="Home">
    <header className="editor-toolbar">
      <Button className="back-button" variant="ghost" onClick={onBack}><ChevronLeft />Notes</Button>
    </header>
    <div className="editor-scroll">
      <div className="home-page">
        <header className="home-header">
          <h2>Home</h2>
          <p className="meta">{notes.length ? `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} to revisit` : 'Nothing to revisit right now'}</p>
        </header>
        {notes.length > 0
          ? <ul className="home-list">
            {notes.map(note => <li key={note.id} className="home-card">
              <span className="meta">Edited {relativeDate(note.updatedAt)}</span>
              <h3 className="home-card-title">{note.title.trim() || 'Untitled'}</h3>
              {note.body.trim() && <p className="home-card-body">{note.body.trim()}</p>}
              <div className="home-actions">
                <Button className="home-action" variant="ghost" onClick={() => onOpen(note.id)}>Open</Button>
              </div>
            </li>)}
          </ul>
          : <p className="home-empty">Notes you haven’t seen in a while will show up here.</p>}
      </div>
    </div>
  </main>
}
