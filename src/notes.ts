export interface Note {
  id: string;
  text: string;
  createdAt: number;
  pinned: boolean;
}

export function sortNotes(notes: Note[]): Note[] {
  return [...notes].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt - a.createdAt,
  );
}

const KEY = "margin.notes";

export function loadNotes(): Note[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (n) =>
          !!n &&
          typeof n.id === "string" &&
          typeof n.text === "string" &&
          typeof n.createdAt === "number",
      )
      .map((n) => ({ ...n, pinned: n.pinned === true }) as Note);
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
