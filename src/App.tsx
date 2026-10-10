import { useEffect, useState } from "react";
import { footerText, loadNotes, makeId, saveNotes, type Note } from "./notes";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  function add() {
    const text = draft.trim();
    if (!text) return;
    setNotes((prev) => [{ id: makeId(), text }, ...prev]);
    setDraft("");
  }

  return (
    <main style={{ maxWidth: 560, margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Margin</h1>
      <input
        aria-label="New note"
        placeholder="Write a note and press Enter"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") add();
        }}
        style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notes.map((n) => (
          <li key={n.id} style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", padding: "0.5rem 0", borderBottom: "1px solid #ddd" }}>
            <span style={{ overflowWrap: "anywhere" }}>{n.text}</span>
            <button aria-label="Remove note" onClick={() => setNotes((prev) => prev.filter((x) => x.id !== n.id))}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <footer style={{ color: "#6b7280", fontSize: 12 }}>
        {footerText(notes.length)}
      </footer>
    </main>
  );
}
