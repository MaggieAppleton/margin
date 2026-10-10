import type { Note } from "./notes";
import { useNotifications } from "./NotificationsContext";

type Props = { note: Note; onOpen: (noteId: string) => void; onAction?: () => void };

export function NotificationCard({ note, onOpen, onAction }: Props) {
  const { snooze, done } = useNotifications();
  const firstLine = note.body.split("\n")[0];
  return (
    <div className="notif-card">
      <strong className="notif-title">{note.title || "Untitled"}</strong>
      {firstLine && <span className="notif-line">{firstLine}</span>}
      <div className="notif-actions">
        <button type="button" onClick={() => { snooze(note.id, 15); onAction?.(); }}>Snooze 15 min</button>
        <button type="button" onClick={() => { done(note.id); onAction?.(); }}>Done</button>
        <button type="button" onClick={() => { onOpen(note.id); onAction?.(); }}>Open</button>
      </div>
    </div>
  );
}
