export type Note = {
  id: string;
  text: string;
  createdAt: number;
  pinned?: boolean;
};

export const NOTES_KEY = "margin.notes";

export function loadNotes(): Note[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(NOTES_KEY) ?? "[]");
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
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable or full; keep in-memory state
  }
}
