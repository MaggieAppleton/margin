import { useState } from 'react';
import EmptyState from './EmptyState';
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
      {notes.length === 0 && <EmptyState />}
      <ul className="notes">
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </main>
  );
}
