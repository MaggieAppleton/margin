import { ChevronLeft } from 'lucide-react'
import type { Note } from '../data/model'
import { relativeDate } from '../lib/dates'
import { Button } from './ui/button'

interface Props {
  notes: Note[]
  onOpen: (id: string) => void
  onBack: () => void
}

export function TodayPage({ notes, onOpen, onBack }: Props) {
  return <main className="editor today" aria-label="Today">
    <header className="editor-toolbar">
      <Button className="back-button" variant="ghost" onClick={onBack}><ChevronLeft />Notes</Button>
    </header>
    <div className="editor-scroll">
      <div className="today-page">
        <header className="today-header">
          <h2>Today</h2>
          <p className="meta">{notes.length ? `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} to revisit` : 'Nothing to revisit today'}</p>
        </header>
        {notes.length > 0
          ? <ul className="today-list">
            {notes.map(note => <li key={note.id} className="today-card">
              <span className="meta">Edited {relativeDate(note.updatedAt)}</span>
              <h3 className="today-card-title">{note.title.trim() || 'Untitled'}</h3>
              {note.body.trim() && <p className="today-card-body">{note.body.trim()}</p>}
              <div className="today-actions">
                <Button className="today-action" variant="ghost" onClick={() => onOpen(note.id)}>Open</Button>
              </div>
            </li>)}
          </ul>
          : <p className="today-empty">Notes you haven’t seen in a while will show up here. Check back tomorrow.</p>}
      </div>
    </div>
  </main>
}
