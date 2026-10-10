import { useState } from 'react'
import { loadNotes, saveNotes, type Note } from './notesStorage'

// Notes are stored newest first.
export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes)
  const [draft, setDraft] = useState('')

  function addNote() {
    const text = draft.trim()
    if (!text) return
    const note: Note = { id: crypto.randomUUID(), text, createdAt: Date.now() }
    const next = [note, ...notes]
    setNotes(next)
    saveNotes(next)
    setDraft('')
  }

  function deleteNote(id: string) {
    const next = notes.filter((n) => n.id !== id)
    setNotes(next)
    saveNotes(next)
  }

  return (
    <main className="page">
      <h1>Margin</h1>
      <input
        className="note-input"
        type="text"
        value={draft}
        placeholder="Write a note and press Enter"
        aria-label="New note"
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addNote()
        }}
      />
      <section className="notes" aria-label="Notes">
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <span className="note-text">{n.text}</span>
              <button
                type="button"
                className="note-delete"
                aria-label="Delete note"
                onClick={() => deleteNote(n.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
