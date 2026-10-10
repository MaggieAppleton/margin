import { useEffect, useState } from "react";
import { loadNotes, saveNotes, sortNotes, type Note } from "./notes";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => saveNotes(notes), [notes]);

  function add() {
    const text = draft.trim();
    if (!text) return;
    const note: Note = { id: crypto.randomUUID(), text, createdAt: Date.now(), pinned: false };
    setNotes((prev) => [note, ...prev]);
    setDraft("");
  }

  function toggle(id: string) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
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
        {sortNotes(notes).map((n) => (
          <li key={n.id}>
            <span>{n.text}</span>
            {n.pinned && <span className="badge">Pinned</span>}
            <button type="button" aria-pressed={n.pinned} onClick={() => toggle(n.id)}>
              {n.pinned ? "Unpin" : "Pin"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
