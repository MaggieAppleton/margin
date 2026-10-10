export interface Note {
  id: string;
  text: string;
}

export const STORAGE_KEY = "margin.notes";

export function parseNotes(raw: string | null): Note[] {
  if (!raw) return [];
  try {
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
    // storage unavailable or full; keep in-memory state
  }
}

export function makeId(): string {
  return globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}
