import { useEffect, useState } from "react";
import { createNote, loadNotes, saveNotes, type Note } from "./notes";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  function add() {
    const note = createNote(draft);
    if (!note) return;
    setNotes((prev) => [note, ...prev]);
    setDraft("");
  }

  return (
    <>
      <h1>Margin</h1>
      <main>
        <input
          type="text"
          aria-label="New note"
          placeholder="Write a note and press Enter"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) add();
          }}
        />
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          <ul>
            {notes.map((n) => (
              <li key={n.id}>{n.text}</li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
