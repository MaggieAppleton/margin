export type Note = { id: string; text: string; createdAt: number }

const KEY = 'margin:notes'

export function loadNotes(): Note[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (n): n is Note =>
        n && typeof n.id === 'string' && typeof n.text === 'string' && typeof n.createdAt === 'number',
    )
  } catch {
    return []
  }
}

export function saveNotes(notes: Note[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(notes))
  } catch {
    // storage unavailable or full; notes stay in memory only
  }
}
