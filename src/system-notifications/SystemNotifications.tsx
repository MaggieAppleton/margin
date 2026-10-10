import { useEffect, useRef, useState } from "react";
import type { Note } from "../notes/types";
import { useNotifications } from "../notifications/store";

type Props = { notes: Note[]; openNote: (id: string) => void };

const supported = () => typeof Notification !== "undefined";

export function SystemNotifications({ notes, openNote }: Props) {
  const [permission, setPermission] = useState(() => (supported() ? Notification.permission : "denied"));
  const { list } = useNotifications(notes);
  const seen = useRef(new Set<string>());
  const openRef = useRef(openNote);
  openRef.current = openNote;

  useEffect(() => {
    for (const n of list) {
      if (seen.current.has(n.key)) continue;
      seen.current.add(n.key);
      if (!supported() || Notification.permission !== "granted" || !document.hidden) continue;
      const sys = new Notification(n.title, { body: n.firstLine, tag: n.key });
      sys.onclick = () => {
        window.focus();
        sys.close();
        openRef.current(n.noteId);
      };
    }
  }, [list]);

  if (!supported() || permission !== "default") return null;
  return (
    <button
      onClick={async () => {
        await Notification.requestPermission();
        setPermission(Notification.permission);
      }}
    >
      Enable system notifications
    </button>
  );
}
