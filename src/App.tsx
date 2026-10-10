import { useEffect, useState } from "react";

type Note = { id: string; text: string; createdAt: number };

const STORAGE_KEY = "margin.notes";

function loadNotes(): Note[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (n): n is Note =>
        !!n && typeof n.id === "string" && typeof n.text === "string" && typeof n.createdAt === "number",
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // storage unavailable; keep working in memory
    }
  }, [notes]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    const text = draft.trim();
    if (!text) return;
    setNotes((prev) => [{ id: crypto.randomUUID(), text, createdAt: Date.now() }, ...prev]);
    setDraft("");
  }

  return (
    <main style={{ maxWidth: 560, margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <input
        aria-label="New note"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKeyDown}
        style={{ width: "100%", boxSizing: "border-box", padding: "0.5rem", fontSize: "1rem" }}
      />
      {notes.length === 0 ? (
        <p style={{ color: "#888" }}>No notes</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notes.map((n) => (
            <li key={n.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee", whiteSpace: "pre-wrap" }}>
              {n.text}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
