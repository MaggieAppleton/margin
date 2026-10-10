import { useCallback, useState } from "react";
import { loadNotes, saveNotes } from "./storage";
import type { Note } from "./types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);

  const update = useCallback((fn: (prev: Note[]) => Note[]) => {
    setNotes((prev) => {
      const next = fn(prev);
      saveNotes(next);
      return next;
    });
  }, []);

  const create = useCallback((): string => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: "",
      body: "",
      reminderAt: null,
      createdAt: Date.now(),
    };
    update((prev) => [note, ...prev]);
    return note.id;
  }, [update]);

  const edit = useCallback(
    (id: string, patch: Partial<Pick<Note, "title" | "body">>) =>
      update((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n))),
    [update],
  );

  return { notes: [...notes].sort((a, b) => b.createdAt - a.createdAt), create, edit };
}
