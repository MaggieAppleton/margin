import type { Note } from "../notes/types";

export type DueEvent = { noteId: string; reminderAt: number; firedAt: number };

type Schedulable = Pick<Note, "id" | "reminderAt">;

function toMs(v: Note["reminderAt"]): number | null {
  if (v == null || v === "") return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
}

// Tracks which (note, reminderAt) pairs have fired. Changing reminderAt re-arms.
export function createScheduler(now: () => number) {
  const fired = new Map<string, number>();

  const pending = (notes: Schedulable[]) => {
    const live = new Set<string>();
    const out: { noteId: string; at: number }[] = [];
    for (const n of notes) {
      const at = toMs(n.reminderAt);
      if (at === null) continue;
      live.add(n.id);
      if (fired.get(n.id) !== at) out.push({ noteId: n.id, at });
    }
    for (const id of fired.keys()) if (!live.has(id)) fired.delete(id);
    return out.sort((a, b) => a.at - b.at);
  };

  const emit = (p: { noteId: string; at: number }): DueEvent => {
    fired.set(p.noteId, p.at);
    return { noteId: p.noteId, reminderAt: p.at, firedAt: now() };
  };

  return {
    tick(notes: Schedulable[]): DueEvent[] {
      const t = now();
      return pending(notes).filter((p) => p.at <= t).map(emit);
    },
    fireNext(notes: Schedulable[]): DueEvent | null {
      const [first] = pending(notes);
      return first ? emit(first) : null;
    },
  };
}
