import { Check, List, Plus } from 'lucide-react'
import type { Note } from '../data/model'
import { relativeDate } from '../lib/dates'
import { reviewedOn } from '../data/resurfacing'
import { Button } from './ui/button'

interface Props {
  resurfaced: Note[]
  recent: Note[]
  error: string | null
  onOpen: (id: string) => void
  onOpenResurfaced: (id: string) => void
  onNew: () => void
  onAllNotes: () => void
}

const excerptLength = 220

function excerpt(body: string) {
  const text = body.replace(/\s+/g, ' ').trim()
  if (text.length <= excerptLength) return text
  return `${text.slice(0, text.lastIndexOf(' ', excerptLength))}…`
}

function since(date: string) {
  return relativeDate(date).replace(/^(Today|Yesterday)$/, day => day.toLowerCase())
}

function ResurfacedCard({ note, onOpen }: { note: Note; onOpen: () => void }) {
  const when = note.review ? `Resurfaced ${since(note.review.lastReviewedAt)}` : `Created ${since(note.createdAt)}`
  const reviewed = reviewedOn(note, new Date())
  return <li>
    <button className={`resurfaced-card${reviewed ? ' reviewed' : ''}`} onClick={onOpen}>
      <span className="resurfaced-title">{note.title.trim() || 'Untitled note'}</span>
      {note.body.trim() && <span className="resurfaced-excerpt">{excerpt(note.body)}</span>}
      <span className="resurfaced-meta">
        {reviewed ? <span className="reviewed-mark"><Check size={12} aria-hidden="true" />Reviewed today</span> : <time dateTime={note.review?.lastReviewedAt ?? note.createdAt}>{when}</time>}
        {note.tags.map(tag => <span key={tag} className="resurfaced-tag">{tag}</span>)}
      </span>
    </button>
  </li>
}

export function Home({ resurfaced, recent, error, onOpen, onOpenResurfaced, onNew, onAllNotes }: Props) {
  return <main className="home" aria-label="Home">
    <header className="home-toolbar">
      <Button className="all-notes-button" variant="ghost" onClick={onAllNotes}><List />All notes</Button>
      <Button className="home-new" variant="ghost" onClick={onNew}><Plus />New note</Button>
    </header>
    {error && <p className="save-error" role="alert">{error}</p>}
    <div className="home-scroll">
      <div className="home-page">
        <section className="home-section" aria-labelledby="resurfaced-today">
          <h2 id="resurfaced-today" className="home-heading">Resurfaced today</h2>
          {resurfaced.length
            ? <ul className="resurfaced-list">{resurfaced.map(note => <ResurfacedCard key={note.id} note={note} onOpen={() => onOpenResurfaced(note.id)} />)}</ul>
            : <p className="home-empty">Nothing is due to come back today. Older notes will return here when their time comes.</p>}
        </section>
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
