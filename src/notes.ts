export type Note = {
  id: string;
  text: string;
  createdAt: number;
};

export const STORAGE_KEY = "margin.notes";

export function addNote(notes: Note[], input: string, now = Date.now()): Note[] {
  const text = input.trim();
  if (!text) return notes;
  const note: Note = { id: `${now}-${Math.random().toString(36).slice(2, 8)}`, text, createdAt: now };
  return [note, ...notes];
}

export function parseNotes(raw: string | null): Note[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (n): n is Note =>
        !!n &&
        typeof n.id === "string" &&
        typeof n.text === "string" &&
        typeof n.createdAt === "number",
    );
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
