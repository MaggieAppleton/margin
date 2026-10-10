import { FormEvent, useEffect, useState } from "react";
import { CountBadge } from "./CountBadge";

const KEY = "margin.notes";

function load(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "string") : [];
  } catch {
    return [];
  }
}

export function App() {
  const [notes, setNotes] = useState<string[]>(load);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }, [notes]);

  function add(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setNotes([...notes, text]);
    setDraft("");
  }

  return (
    <main>
      <header className="title-row">
        <h1>Margin</h1>
        <CountBadge count={notes.length} />
      </header>
      <form onSubmit={add}>
        <input
          aria-label="New note"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {notes.map((note, i) => (
          <li key={i}>
            {note}{" "}
            <button onClick={() => setNotes(notes.filter((_, j) => j !== i))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
