import { useEffect, useState } from "react";
import type { Note } from "./notes";
import { NotificationCard } from "./NotificationCard";
import { useNotifications } from "./NotificationsContext";

type Props = { notes: Note[]; onOpen: (noteId: string) => void };

export function NotificationTray({ notes, onOpen }: Props) {
  const { due } = useNotifications();
  const [open, setOpen] = useState(false);
  const items = due.map((d) => notes.find((n) => n.id === d.noteId)).filter((n): n is Note => !!n);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  useEffect(() => {
    if (open) setSeen(new Set(items.map((n) => n.id)));
  }, [open, items.map((n) => n.id).join(",")]);
  const unread = items.filter((n) => !seen.has(n.id)).length;
  return (
    <div className="tray">
      <button
        type="button"
        className="tray-bell"
        aria-label={`Reminders, ${unread} unread, ${items.length} due`}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">🔔</span>
        {unread > 0 && <span className="tray-badge" data-testid="tray-badge">{unread}</span>}
      </button>
      {open && (
        <div className="tray-panel" role="region" aria-label="Due reminders">
          {items.length === 0 && <p className="tray-empty">Nothing due.</p>}
          {items.map((n) => (
            <NotificationCard key={n.id} note={n} onOpen={onOpen} onAction={() => setOpen(false)} />
          ))}
        </div>
      )}
    </div>
  );
}
