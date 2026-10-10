import { useState } from "react";

type Note = { id: string; title: string; body: string };

const sampleNotes: Note[] = [
  { id: "3", title: "Call the dentist", body: "Ask about a Thursday slot." },
  { id: "2", title: "Groceries", body: "Oats, lemons, coffee." },
  { id: "1", title: "Book ideas", body: "Short essays on small tools." },
];

export function App() {
  const [notes, setNotes] = useState(sampleNotes);
  const [openId, setOpenId] = useState<string | null>(null);

  const update = (id: string, patch: Partial<Note>) =>
    setNotes((all) => all.map((n) => (n.id === id ? { ...n, ...patch } : n)));

  return (
    <div className="app">
      <header className="header">
        <h1>Margin</h1>
        <div className="slot" data-slot="reminder-tray" />
      </header>
      <main className="workspace">
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
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </main>
      <footer className="footer">
        <div className="slot" data-slot="demo-clock" />
        <div className="slot" data-slot="system-notifications" />
      </footer>
    </div>
  );
}
