export type Note = { id: string; text: string; createdAt: number };

export const STORAGE_KEY = "margin.notes";

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
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

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable or full; keep in-memory state
  }
}

export function createNote(text: string): Note | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return { id: crypto.randomUUID(), text: trimmed, createdAt: Date.now() };
}
