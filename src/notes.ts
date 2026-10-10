export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  remindAt?: number | string;
};

export const STORAGE_KEY = "margin.notes.v1";

const isNote = (v: unknown): v is Note => {
  if (typeof v !== "object" || v === null) return false;
  const n = v as Record<string, unknown>;
  return (
    typeof n.id === "string" &&
    typeof n.title === "string" &&
    typeof n.body === "string" &&
    typeof n.createdAt === "number" &&
    (n.remindAt === undefined || typeof n.remindAt === "number" || typeof n.remindAt === "string")
  );
};

export const sortNewestFirst = (notes: Note[]): Note[] =>
  [...notes].sort((a, b) => b.createdAt - a.createdAt);

export function loadNotes(storage: Pick<Storage, "getItem"> = localStorage): Note[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortNewestFirst(parsed.filter(isNote));
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[], storage: Pick<Storage, "setItem"> = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage full or unavailable; keep working in memory
  }
}

export function createNote(now: number = Date.now()): Note {
  return { id: `${now}-${Math.random().toString(36).slice(2, 8)}`, title: "", body: "", createdAt: now };
}
