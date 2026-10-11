import { useEffect, useState } from "react";
import { loadNotes, saveNotes, type Note } from "./notesStorage";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = () => {
    const text = draft.trim();
    if (!text) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text,
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setDraft("");
  };

  const removeNote = (id: string) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  return (
    <>
      <header>
        <h1>Margin</h1>
        <input
          type="text"
          aria-label="Note"
          placeholder="Write a note"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNote();
            }
          }}
        />
      </header>
      <main>
        <ul aria-label="Notes">
          {notes.map((n) => (
            <li key={n.id}>
              <span>{n.text}</span>
              <button
                type="button"
                aria-label="Remove note"
                onClick={() => removeNote(n.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer style={{ color: "#6b7280", fontSize: "12px" }}>
        {notes.length} {notes.length === 1 ? "note" : "notes"}
      </footer>
    </>
  );
}
