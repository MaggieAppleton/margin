import { useCallback, useEffect, useState } from "react";
import { flushNotes, loadNotes, saveNotes } from "./storage";
import type { Note } from "./types";

const newestFirst = (a: Note, b: Note) => b.createdAt - a.createdAt;

export function useNotes() {
  // Kept sorted newest-first so edits never need re-sorting.
  const [notes, setNotes] = useState<Note[]>(() => loadNotes().sort(newestFirst));

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const create = useCallback((): string => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      reminderAt: null,
      createdAt: Date.now(),
    };
    setNotes((prev) => [note, ...prev].sort(newestFirst));
    return note.id;
  }, []);

  const edit = useCallback(
    (id: string, patch: Partial<Pick<Note, "title" | "body">>) =>
      setNotes((prev) => {
        const i = prev.findIndex((n) => n.id === id);
        if (i < 0) return prev;
        const next = prev.slice();
        next[i] = { ...prev[i], ...patch };
        return next;
      }),
    [],
  );

  return { notes, create, edit, flush: flushNotes };
}
