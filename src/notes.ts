export type Note = {
  id: string;
  text: string;
  createdAt: number;
  pinned: boolean;
};

export const STORAGE_KEY = "margin.notes";

export function addNote(notes: Note[], input: string, now = Date.now()): Note[] {
  const text = input.trim();
  if (!text) return notes;
  const note: Note = { id: `${now}-${Math.random().toString(36).slice(2, 8)}`, text, createdAt: now, pinned: false };
  return [note, ...notes];
}

export function togglePin(notes: Note[], id: string): Note[] {
  return notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
}

export function sortNotes(notes: Note[]): Note[] {
  return notes
    .map((n, i) => ({ n, i }))
    .sort((a, b) => Number(b.n.pinned) - Number(a.n.pinned) || b.n.createdAt - a.n.createdAt || a.i - b.i)
    .map(({ n }) => n);
}

export function parseNotes(raw: string | null): Note[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (n) =>
          !!n &&
          typeof n.id === "string" &&
          typeof n.text === "string" &&
          typeof n.createdAt === "number",
      )
      .map((n): Note => ({ id: n.id, text: n.text, createdAt: n.createdAt, pinned: n.pinned === true }));
  } catch {
    return [];
  }
}

export function loadNotes(): Note[] {
  try {
    return parseNotes(localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable or full; notes stay in memory
  }
}
