import { useEffect, useState } from "react";
import { addNote, loadNotes, saveNotes } from "./notes";
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
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </main>
  );
}
