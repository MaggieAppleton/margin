export interface Note {
  id: string
  title: string
  body: string
  createdAt: string
  updatedAt: string
  lastViewedAt: string
  tags: string[]
  review?: ReviewState
}

export interface ReviewState {
  easeFactor: number
  intervalDays: number
  repetitions: number
  dueAt: string
  lastReviewedAt: string
}

export interface ViewEvent { noteId: string; viewedAt: string }

export interface Workspace {
  version: 2
  notes: Note[]
  viewEvents: ViewEvent[]
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
