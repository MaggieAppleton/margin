import { useEffect, useState } from "react";
import { addNote, loadNotes, removeNote, saveNotes } from "./notes";

export default function App() {
  const [notes, setNotes] = useState(() => loadNotes());
  const [text, setText] = useState("");

  useEffect(() => saveNotes(notes), [notes]);

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
    </main>
  );
}
