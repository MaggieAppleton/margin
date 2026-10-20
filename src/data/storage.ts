import type { Workspace } from './model.ts'
import { createSeedWorkspace } from './seeds.ts'

const key = 'margin.workspace.v1'
type Reader = Pick<Storage, 'getItem' | 'setItem'>

function isWorkspace(value: unknown): value is Workspace {
  if (!value || typeof value !== 'object') return false
  const state = value as Workspace
  const timestamp = (date: unknown) => typeof date === 'string' && Number.isFinite(Date.parse(date))
  return state.version === 1 && Array.isArray(state.notes) && Array.isArray(state.viewEvents)
    && state.notes.every(note => note && typeof note.id === 'string'
      && typeof note.title === 'string' && typeof note.body === 'string'
      && timestamp(note.createdAt) && timestamp(note.updatedAt) && timestamp(note.lastViewedAt)
      && (note.archivedAt === undefined || timestamp(note.archivedAt))
      && (note.reviewedAt === undefined || timestamp(note.reviewedAt))
      && Array.isArray(note.tags) && note.tags.every(tag => typeof tag === 'string'))
    && (state.today === undefined || (!!state.today && typeof state.today === 'object' && typeof state.today.day === 'string'
      && /^\d{4}-\d{2}-\d{2}$/.test(state.today.day) && Array.isArray(state.today.noteIds)
      && state.today.noteIds.every(id => typeof id === 'string')))
    && state.viewEvents.every(event => event && typeof event.noteId === 'string' && timestamp(event.viewedAt))
}

export function saveWorkspace(storage: Pick<Storage, 'setItem'>, state: Workspace) {
  storage.setItem(key, JSON.stringify(state))
}

export function readWorkspace(storage: Reader, reset = false): Workspace {
  const raw = reset ? null : storage.getItem(key)
  if (raw !== null) {
    try {
      const parsed: unknown = JSON.parse(raw)
      if (isWorkspace(parsed)) return parsed
    } catch { /* Report damaged data without overwriting it. */ }
    throw new Error('Your saved notes could not be read. The original data is still in this browser.')
  }
  const state = createSeedWorkspace()
  saveWorkspace(storage, state)
  return state
}
