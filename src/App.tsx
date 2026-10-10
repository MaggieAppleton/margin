import { useEffect, useState } from "react";
import { loadNotes, saveNotes, type Note } from "./notes";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => saveNotes(notes), [notes]);

  function add() {
    const text = draft.trim();
    if (!text) return;
    const note: Note = { id: crypto.randomUUID(), text, createdAt: Date.now() };
    setNotes((prev) => [note, ...prev]);
    setDraft("");
  }

  return (
    <main>
      <h1>Margin</h1>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
        placeholder="Write a note and press Enter"
        aria-label="New note"
        autoFocus
      />
      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </main>
  );
}
