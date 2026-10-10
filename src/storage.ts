export type Note = { id: string; text: string; createdAt: number }

const KEY = 'margin:notes'

function isNote(v: unknown): v is Note {
  if (typeof v !== 'object' || v === null) return false
  const n = v as Record<string, unknown>
  return (
    typeof n.id === 'string' &&
    typeof n.text === 'string' &&
    typeof n.createdAt === 'number' &&
    Number.isFinite(n.createdAt)
  )
}

export function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || !parsed.every(isNote)) return []
    return [...parsed].sort((a, b) => b.createdAt - a.createdAt)
  } catch {
    return []
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes))
  } catch {
    // storage unavailable or full; keep working in memory
  }
}
