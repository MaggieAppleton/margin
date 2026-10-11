import { useState } from 'react';
import NoteTime from './NoteTime';
import { loadNotes, saveNotes, type Note } from './notes';

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState('');

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    const text = draft.trim();
    if (!text) return;
    const now = Date.now();
    const next = [{ id: `${now}-${crypto.randomUUID()}`, text, createdAt: now }, ...notes];
    setNotes(next);
    saveNotes(next);
    setDraft('');
  }

  return (
    <main>
      <h1>Margin</h1>
      <input
        type="text"
        placeholder="Add a note"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <ul className="notes">
        {notes.map((n) => (
          <li key={n.id}>
            <span>{n.text}</span>
            <NoteTime createdAt={n.createdAt} />
          </li>
        ))}
      </ul>
    </main>
  );
}
