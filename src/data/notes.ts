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

export function archiveNote(state: Workspace, id: string, at: string): Workspace {
  return { ...state, notes: state.notes.map(note => note.id === id ? { ...note, archivedAt: at } : note) }
}

export function unarchiveNote(state: Workspace, id: string): Workspace {
  return {
    ...state,
    notes: state.notes.map(note => {
      if (note.id !== id) return note
      const { archivedAt: _archivedAt, ...rest } = note
      return rest
    }),
  }
}

export function keepNote(state: Workspace, id: string, at: string): Workspace {
  return { ...state, notes: state.notes.map(note => note.id === id ? { ...note, reviewedAt: at } : note) }
}
