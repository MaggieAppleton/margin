import type { Note } from "./types";

export const STORAGE_KEY = "margin.notes";

function isNote(v: unknown): v is Note {
  if (!v || typeof v !== "object") return false;
  const n = v as Record<string, unknown>;
  return (
    typeof n.id === "string" &&
    typeof n.title === "string" &&
    typeof n.body === "string" &&
    typeof n.createdAt === "number"
  );
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isNote) : [];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage full or unavailable; keep working in memory
  }
}
