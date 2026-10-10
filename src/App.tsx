import { useCallback, useEffect, useState } from "react";
import { NoteRow } from "./notes/NoteRow";
import { useNotes } from "./notes/useNotes";
import "./App.css";

function isTyping(el: EventTarget | null) {
  return (
    el instanceof HTMLElement &&
    (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
  );
}

export default function App() {
  const { notes, create, edit, flush } = useNotes();
  const [openId, setOpenId] = useState<string | null>(null);

  const closeEditor = useCallback(() => {
    setOpenId(null);
    flush();
  }, [flush]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEditor();
      else if (
        (e.key === "n" || e.key === "N") &&
        !e.metaKey && !e.ctrlKey && !e.altKey &&
        !isTyping(e.target)
      ) {
        e.preventDefault();
        setOpenId(create());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [create, closeEditor]);

  return (
    <main className="margin">
      <header>
        <h1>Margin</h1>
        <button onClick={() => setOpenId(create())}>New note</button>
      </header>
      {notes.length === 0 ? (
        <p className="empty">Write your first note.</p>
      ) : (
        <ul className="notes">
          {notes.map((n) => (
            <NoteRow
              key={n.id}
              note={n}
              open={n.id === openId}
              onOpen={setOpenId}
              onClose={closeEditor}
              onEdit={edit}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
