import { useEffect, useState } from "react";
import { addNote, loadNotes, saveNotes, sortNotes, togglePin } from "./notes";
import "./App.css";

export default function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => saveNotes(notes), [notes]);

  return (
    <main className="margin">
      <h1>Margin</h1>
      <input
        className="margin-input"
        aria-label="New note"
        placeholder="Write a note and press Enter"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
          setNotes((n) => addNote(n, draft));
          setDraft("");
        }}
      />
      <ul className="margin-list">
        {sortNotes(notes).map((n) => (
          <li key={n.id}>
            <span className="note-text">
              {n.pinned && <span className="pin-badge">Pinned</span>}
              {n.text}
            </span>
            <button
              type="button"
              className="pin-button"
              aria-pressed={n.pinned}
              aria-label={n.pinned ? "Unpin note" : "Pin note"}
              onClick={() => setNotes((all) => togglePin(all, n.id))}
            >
              {n.pinned ? "Unpin" : "Pin"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
