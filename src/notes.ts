export interface Note {
  id: string;
  text: string;
  createdAt: number;
}

const KEY = "margin.notes";

export function loadNotes(): Note[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
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
    localStorage.setItem(KEY, JSON.stringify(notes));
  } catch {
    // storage unavailable or full; keep working in memory
  }
}
