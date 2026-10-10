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
        {notes.length === 0 ? (
          <div
            data-slot="empty-state"
            style={{
              marginTop: 24,
              padding: "40px 24px",
              textAlign: "center",
              border: "2px dashed #ccc",
              borderRadius: 12,
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 20 }}>No notes yet</h3>
            <p style={{ margin: 0, color: "#666" }}>
              Type above and press Enter to add your first note.
            </p>
          </div>
        ) : (
          <ul data-slot="notes-list">
            {notes.map((n) => (
              <li key={n.id}>{n.text}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
