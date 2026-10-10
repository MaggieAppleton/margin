import { useEffect, useState } from "react";
import { DemoClock } from "./DemoClock";
import { NotificationsProvider } from "./NotificationsContext";
import { ReminderField } from "./ReminderField";
import { createNote, loadNotes, saveNotes, sortNewestFirst, type Note } from "./notes";

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => saveNotes(notes), [notes]);

  const update = (id: string, patch: Partial<Note>) =>
    setNotes((all) => all.map((n) => (n.id === id ? { ...n, ...patch } : n)));

  const add = () => {
    const note = createNote();
    setNotes((all) => sortNewestFirst([note, ...all]));
    setOpenId(note.id);
  };

  return (
    <NotificationsProvider notes={notes} setNotes={setNotes}>
    <div className="app">
      <header className="header">
        <h1>Margin</h1>
        <div className="slot" data-slot="reminder-tray" />
      </header>
      <main className="workspace">
        <button className="new-note" onClick={add}>New note</button>
        {notes.length === 0 && <p className="empty">No notes yet.</p>}
        <ul className="notes">
          {notes.map((note) => {
            const open = note.id === openId;
            return (
              <li key={note.id} className="note">
                <button
                  className="note-summary"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : note.id)}
                >
                  <strong>{note.title || "Untitled"}</strong>
                  <span>{note.body.split("\n")[0]}</span>
                </button>
                {open && (
                  <div className="editor">
                    <input
                      autoFocus={note.id === openId && !note.title && !note.body}
                      aria-label="Title"
                      value={note.title}
                      onChange={(e) => update(note.id, { title: e.target.value })}
                    />
                    <textarea
                      aria-label="Body"
                      rows={5}
                      value={note.body}
                      onChange={(e) => update(note.id, { body: e.target.value })}
                    />
                    <ReminderField
                      remindAt={note.remindAt}
                      onChange={(at) => update(note.id, { remindAt: at })}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </main>
      <footer className="footer">
        <div className="slot" data-slot="demo-clock"><DemoClock /></div>
        <div className="slot" data-slot="system-notifications" />
      </footer>
    </div>
    </NotificationsProvider>
  );
}
