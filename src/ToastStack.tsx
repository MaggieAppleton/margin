import { useEffect, useRef, useState } from "react";
import type { Note } from "./notes";
import { NotificationCard } from "./NotificationCard";
import { useNotifications } from "./NotificationsContext";
import { TOAST_MS, addToasts, visibleToasts } from "./toasts";

type Props = { notes: Note[]; onOpen: (noteId: string) => void };

export function ToastStack({ notes, onOpen }: Props) {
  const { due, subscribe } = useNotifications();
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => subscribe((fired) => setIds((cur) => addToasts(cur, fired))), [subscribe]);

  const shown = visibleToasts(ids, due);
  const dismiss = (id: string) => setIds((cur) => cur.filter((x) => x !== id));

  return (
    <div className="toasts" role="status" aria-live="polite">
      {shown.map((id) => {
        const note = notes.find((n) => n.id === id);
        return note ? <Toast key={id} note={note} onOpen={onOpen} onExpire={() => dismiss(id)} /> : null;
      })}
    </div>
  );
}

function Toast({ note, onOpen, onExpire }: { note: Note; onOpen: (id: string) => void; onExpire: () => void }) {
  const [paused, setPaused] = useState(false);
  const expire = useRef(onExpire);
  expire.current = onExpire;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => expire.current(), TOAST_MS);
    return () => clearTimeout(t);
  }, [paused]);

  return (
    <div
      className="toast"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <NotificationCard note={note} onOpen={onOpen} />
    </div>
  );
}
