import { memo } from "react";
import type { Note } from "./types";

type Props = {
  note: Note;
  open: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  onEdit: (id: string, patch: Partial<Pick<Note, "title" | "body">>) => void;
};

// Test hook: lets tests count row renders.
export const rowProbe: { onRender?: (id: string) => void } = {};

export const NoteRow = memo(function NoteRow({ note: n, open, onOpen, onClose, onEdit }: Props) {
  rowProbe.onRender?.(n.id);
  return (
    <li className={open ? "open" : undefined}>
      {open ? (
        <div className="editor">
          <input
            autoFocus
            aria-label="Title"
            placeholder="Title"
            value={n.title}
            onChange={(e) => onEdit(n.id, { title: e.target.value })}
          />
          <textarea
            aria-label="Body"
            placeholder="Write something…"
            rows={6}
            value={n.body}
            onChange={(e) => onEdit(n.id, { body: e.target.value })}
          />
          <button onClick={onClose}>Close</button>
        </div>
      ) : (
        <button className="row" onClick={() => onOpen(n.id)}>
          <strong>{n.title || "Untitled"}</strong>
          {n.body && <span>{n.body}</span>}
        </button>
      )}
    </li>
  );
});
