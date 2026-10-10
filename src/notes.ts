export type Note = { id: string; text: string };

export const STORAGE_KEY = "margin.notes";

type Store = Pick<Storage, "getItem" | "setItem">;

export function loadNotes(store: Store | undefined = defaultStore()): Note[] {
  try {
    const raw = store?.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (n): n is Note =>
        !!n && typeof n.id === "string" && typeof n.text === "string",
    );
  } catch {
    return [];
  }
}

export function saveNotes(
  notes: Note[],
  store: Store | undefined = defaultStore(),
): void {
  try {
    store?.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable or full; keep working in memory
  }
}

export function addNote(notes: Note[], text: string): Note[] {
  const trimmed = text.trim();
  if (!trimmed) return notes;
  return [{ id: crypto.randomUUID(), text: trimmed }, ...notes];
}

export function removeNote(notes: Note[], id: string): Note[] {
  return notes.filter((n) => n.id !== id);
}

// Undo keeps notes added since clearing on top and puts the cleared notes
// after them, skipping any already present.
export function restoreNotes(current: Note[], cleared: Note[]): Note[] {
  const ids = new Set(current.map((n) => n.id));
  return [...current, ...cleared.filter((n) => !ids.has(n.id))];
}

function defaultStore(): Store | undefined {
  try {
    return typeof localStorage === "undefined" ? undefined : localStorage;
  } catch {
    return undefined;
  }
}
