export interface Note {
  id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  lastViewedAt: string
  tags: string[]
  archivedAt?: string
  reviewedAt?: string
}

export interface ViewEvent { noteId: string; viewedAt: string }

export interface Workspace {
  version: 1
  notes: Note[]
  viewEvents: ViewEvent[]
  today?: { day: string; noteIds: string[] }
}

export interface SeedFixture {
  id: string
  title: string
  body: string
  tags: string[]
  createdDaysAgo: number
  updatedDaysAgo: number
  viewedDaysAgo: number[]
}
