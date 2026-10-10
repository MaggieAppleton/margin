import { useState } from 'react'

const LIMIT = 280
const WARN_BELOW = 20

export default function App() {
  const [notes, setNotes] = useState('')
  const left = LIMIT - notes.length

  return (
    <main>
      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        name="notes"
        maxLength={LIMIT}
        value={notes}
        onChange={(e) => setNotes(e.target.value.slice(0, LIMIT))}
      />
      <p className={left < WARN_BELOW ? 'hint hint-low' : 'hint'}>
        {left} characters left
      </p>
    </main>
  )
}
