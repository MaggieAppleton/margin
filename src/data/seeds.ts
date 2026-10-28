import { seedFixtures } from './fixtures.ts'
import type { Workspace } from './model.ts'

export function createSeedWorkspace(now = new Date()): Workspace {
  const at = (daysAgo: number) => new Date(+now - daysAgo * 86400000).toISOString()
  return {
    version: 2,
    notes: seedFixtures.map(fixture => ({
      id: fixture.id, title: fixture.title, body: fixture.body, tags: [...fixture.tags],
      createdAt: at(fixture.createdDaysAgo),
      updatedAt: at(fixture.updatedDaysAgo),
      lastViewedAt: at(fixture.viewedDaysAgo.at(-1)!),
    })),
    viewEvents: seedFixtures.flatMap(fixture => fixture.viewedDaysAgo.map(daysAgo => ({
      noteId: fixture.id, viewedAt: at(daysAgo),
    }))).sort((a, b) => a.viewedAt.localeCompare(b.viewedAt)),
  }
}
