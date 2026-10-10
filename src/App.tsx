import { useEffect, useState } from 'react'
import { relativeTime } from './relativeTime'
import { loadNotes, saveNotes, type Note } from './storage'

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes)
  const [draft, setDraft] = useState('')
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  function add() {
    const text = draft.trim()
    if (!text) return
    const createdAt = Date.now()
    setNotes([{ id: crypto.randomUUID(), text, createdAt }, ...notes])
    setNow(createdAt)
    setDraft('')
  }

  return (
    <main>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && add()}
        placeholder="Write a note"
        aria-label="New note"
        autoFocus
      />
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            <div>{n.text}</div>
            <time className="muted">{relativeTime(n.createdAt, now)}</time>
          </li>
        ))}
      </ul>
    </main>
  )
}
