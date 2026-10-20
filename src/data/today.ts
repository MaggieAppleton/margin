import type { Note, Workspace } from './model.ts'

const staleAfter = 30 * 86400000

function lastSeen(note: Note) {
  return Math.max(Date.parse(note.lastViewedAt), note.reviewedAt ? Date.parse(note.reviewedAt) : -Infinity)
}

function dayKey(now: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export function isResurfaceCandidate(note: Note, now: Date): boolean {
  return !note.archivedAt && +now - lastSeen(note) >= staleAfter
}

export function pickToday(state: Workspace, now: Date): Workspace {
  const day = dayKey(now)
  if (state.today?.day === day) return state
  const noteIds = state.notes
    .filter(note => isResurfaceCandidate(note, now))
    .sort((a, b) => lastSeen(a) - lastSeen(b))
    .slice(0, 3)
    .map(note => note.id)
  return { ...state, today: { day, noteIds } }
}

export function todayNotes(state: Workspace, now: Date): Note[] {
  if (state.today?.day !== dayKey(now)) return []
  return state.today.noteIds
    .map(id => state.notes.find(note => note.id === id))
    .filter((note): note is Note => !!note && isResurfaceCandidate(note, now))
}
