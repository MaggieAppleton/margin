export type Note = { id: string; text: string; createdAt: number };

export const STORAGE_KEY = "margin.notes";

export function loadNotes(): Note[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
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
    // storage unavailable or full; keep working in memory
  }
}
