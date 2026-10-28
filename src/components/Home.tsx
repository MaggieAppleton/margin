import { List, Plus } from 'lucide-react'
import type { Note } from '../data/model'
import { relativeDate } from '../lib/dates'
import { Button } from './ui/button'

interface Props {
  recent: Note[]
  error: string | null
  onOpen: (id: string) => void
  onNew: () => void
  onAllNotes: () => void
}

export function Home({ recent, error, onOpen, onNew, onAllNotes }: Props) {
  return <main className="home" aria-label="Home">
    <header className="home-toolbar">
      <Button className="all-notes-button" variant="ghost" onClick={onAllNotes}><List />All notes</Button>
      <Button className="home-new" variant="ghost" onClick={onNew}><Plus />New note</Button>
    </header>
    {error && <p className="save-error" role="alert">{error}</p>}
    <div className="home-scroll">
      <div className="home-page">
        <section className="home-section" aria-labelledby="recently-edited">
          <h2 id="recently-edited" className="home-heading">Recently edited</h2>
          {recent.length
            ? <ul className="recent-list">{recent.map(note => <li key={note.id}>
                <button className="recent-row" onClick={() => onOpen(note.id)}>
                  <span className="recent-title">{note.title.trim() || 'Untitled note'}</span>
                  <time className="recent-date" dateTime={note.updatedAt}>{relativeDate(note.updatedAt)}</time>
                </button>
              </li>)}</ul>
            : <p className="home-empty">No notes yet. Start one when a thought arrives.</p>}
        </section>
      </div>
    </div>
  </main>
}
