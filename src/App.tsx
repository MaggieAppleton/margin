import { useState } from "react";
import { loadNotes, saveNotes, type Note } from "./notes";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [text, setText] = useState("");

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    const next = [
      { id: crypto.randomUUID(), text: trimmed, createdAt: Date.now() },
      ...notes,
    ];
    setNotes(next);
    saveNotes(next);
    setText("");
  }

  return (
    <main>
      <h1>Margin</h1>
      <section aria-label="New note">
        <input
          type="text"
          placeholder="Write a note…"
          aria-label="New note"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </section>
      <section aria-label="Notes">
        <ul data-slot="notes-list">
          {notes.map((n) => (
            <li key={n.id}>{n.text}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
