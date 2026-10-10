import { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'

export const STORAGE_KEY = 'margin.notes'

export function loadNotes(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((n): n is string => typeof n === 'string')
  } catch {
    return []
  }
}

export default function App() {
  const [notes, setNotes] = useState<string[]>(loadNotes)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
    } catch {
      // storage unavailable or full; keep working in memory
    }
  }, [notes])

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    const text = draft.trim()
    if (!text) return
    setNotes((prev) => [...prev, text])
    setDraft('')
  }

  return (
    <>
      <h1>Margin</h1>
      <input
        type="text"
        aria-label="New note"
        placeholder="Write a note"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <ul>
        {notes
          .map((note, i) => ({ note, i }))
          .reverse()
          .map(({ note, i }) => (
            <li key={i}>{note}</li>
          ))}
      </ul>
    </>
  )
}
