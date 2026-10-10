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

function writeNotes(notes: Note[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // storage full or unavailable; keep working in memory
  }
}

const SAVE_DELAY_MS = 300;
let pending: Note[] | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;

export function flushNotes(): void {
  clearTimeout(timer);
  timer = undefined;
  if (pending) {
    const notes = pending;
    pending = null;
    writeNotes(notes);
  }
}

// Coalesces rapid edits into one write of the latest state.
export function saveNotes(notes: Note[]): void {
  pending = notes;
  clearTimeout(timer);
  timer = setTimeout(flushNotes, SAVE_DELAY_MS);
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flushNotes);
  window.addEventListener("beforeunload", flushNotes);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushNotes();
  });
}
