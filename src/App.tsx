import { useEffect, useRef, useState } from "react";
import { addNote, loadNotes, removeNote, restoreNotes, saveNotes } from "./notes";

import type { Note } from "./notes";

export const UNDO_MS = 5000;

export default function App() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [text, setText] = useState("");

  const [cleared, setCleared] = useState<Note[] | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => saveNotes(notes), [notes]);
  useEffect(() => () => clearTimeout(timer.current), []);

  function clearAll() {
    if (notes.length === 0) return;
    clearTimeout(timer.current);
    setCleared(notes);
    setNotes([]);
    timer.current = setTimeout(() => setCleared(null), UNDO_MS);
  }

  function undo() {
    clearTimeout(timer.current);
    if (cleared) setNotes((n) => restoreNotes(n, cleared));
    setCleared(null);
  }

  return (
    <main>
      <h1>Margin</h1>
      <input
        aria-label="New note"
        placeholder="Write a note and press Enter"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
          setNotes((n) => addNote(n, text));
          setText("");
        }}
      />
      <ul>
        {notes.map((n) => (
          <li key={n.id}>
            <span>{n.text}</span>
            <button
              aria-label={`Remove note: ${n.text}`}
              onClick={() => setNotes((all) => removeNote(all, n.id))}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <button
        className="clear-all"
        disabled={notes.length === 0}
        onClick={clearAll}
      >
        Clear all
      </button>
      {cleared && (
        <div className="toast" role="status">
          <span>Notes cleared</span>
          <button onClick={undo}>Undo</button>
        </div>
      )}
    </main>
  );
}
