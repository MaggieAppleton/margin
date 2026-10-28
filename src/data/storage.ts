import type { ReviewState, Workspace } from './model.ts'
import { createSeedWorkspace } from './seeds.ts'

const key = 'margin.workspace.v1'
type Reader = Pick<Storage, 'getItem' | 'setItem'>

function isReview(value: unknown): value is ReviewState {
  if (!value || typeof value !== 'object') return false
  const review = value as ReviewState
  const date = (text: unknown) => typeof text === 'string' && Number.isFinite(Date.parse(text))
  const count = (number: unknown) => typeof number === 'number' && Number.isFinite(number) && number >= 0
  return count(review.easeFactor) && count(review.intervalDays) && count(review.repetitions)
    && date(review.dueAt) && date(review.lastReviewedAt)
}

function isWorkspace(value: unknown): value is Omit<Workspace, 'version'> & { version: number } {
  if (!value || typeof value !== 'object') return false
  const state = value as Omit<Workspace, 'version'> & { version: number }
  const timestamp = (date: unknown) => typeof date === 'string' && Number.isFinite(Date.parse(date))
  return (state.version === 1 || state.version === 2) && Array.isArray(state.notes) && Array.isArray(state.viewEvents)
    && state.notes.every(note => note && typeof note.id === 'string'
      && typeof note.title === 'string' && typeof note.body === 'string'
      && timestamp(note.createdAt) && timestamp(note.updatedAt) && timestamp(note.lastViewedAt)
      && Array.isArray(note.tags) && note.tags.every(tag => typeof tag === 'string')
      && (note.review === undefined || isReview(note.review)))
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
      if (isWorkspace(parsed)) return { ...parsed, version: 2 }
    } catch { /* Report damaged data without overwriting it. */ }
    throw new Error('Your saved notes could not be read. The original data is still in this browser.')
  }
  const state = createSeedWorkspace()
  saveWorkspace(storage, state)
  return state
}
