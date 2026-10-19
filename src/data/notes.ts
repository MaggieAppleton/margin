import type { Workspace } from './model.ts'

export function openNote(state: Workspace, id: string, at: string): Workspace {
  if (!state.notes.some(note => note.id === id)) return state
  return {
    ...state,
    notes: state.notes.map(note => note.id === id ? { ...note, lastViewedAt: at } : note),
    viewEvents: [...state.viewEvents, { noteId: id, viewedAt: at }],
  }
}

export function createNote(state: Workspace, id: string, at: string): Workspace {
  return {
    ...state,
    notes: [{ id, title: '', body: '', createdAt: at, updatedAt: at, lastViewedAt: at, tags: [] }, ...state.notes],
    viewEvents: [...state.viewEvents, { noteId: id, viewedAt: at }],
  }
}

export function editNote(state: Workspace, id: string, patch: { title?: string; body?: string }, at: string): Workspace {
  return { ...state, notes: state.notes.map(note => note.id === id ? { ...note, ...patch, updatedAt: at } : note) }
}

export function deleteNote(state: Workspace, id: string): Workspace {
  return {
    ...state,
    notes: state.notes.filter(note => note.id !== id),
    viewEvents: state.viewEvents.filter(event => event.noteId !== id),
  }
}
