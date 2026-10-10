import { useEffect, useState } from "react";
import { ReminderSection } from "./reminders/ReminderSection";
import { useNotes } from "./notes/useNotes";
import { Footer } from "./scheduler/Footer";
import { useScheduler } from "./scheduler/hooks";
import "./App.css";

function isTyping(el: EventTarget | null) {
  return (
    el instanceof HTMLElement &&
    (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)
  );
}

export default function App() {
  const { notes, create, edit } = useNotes();
  useScheduler(notes);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
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
  }, [create]);

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
            <li key={n.id} className={n.id === openId ? "open" : undefined}>
              {n.id === openId ? (
                <div className="editor">
                  <input
                    autoFocus
                    aria-label="Title"
                    placeholder="Title"
                    value={n.title}
                    onChange={(e) => edit(n.id, { title: e.target.value })}
                  />
                  <textarea
                    aria-label="Body"
                    placeholder="Write something…"
                    rows={6}
                    value={n.body}
                    onChange={(e) => edit(n.id, { body: e.target.value })}
                  />
                  <ReminderSection
                    reminderAt={n.reminderAt}
                    onChange={(reminderAt) => edit(n.id, { reminderAt })}
                  />
                  <button onClick={() => setOpenId(null)}>Close</button>
                </div>
              ) : (
                <button className="row" onClick={() => setOpenId(n.id)}>
                  <strong>{n.title || "Untitled"}</strong>
                  {n.body && <span>{n.body}</span>}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <Footer notes={notes} />
    </main>
  );
}
