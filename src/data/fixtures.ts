import { handwritten } from './handwritten.ts'
import { seedNotes1 } from './seed-notes-1.ts'
import { seedNotes2 } from './seed-notes-2.ts'
import { seedNotes3 } from './seed-notes-3.ts'
import type { SeedFixture } from './model.ts'

const generated = [...seedNotes1, ...seedNotes2, ...seedNotes3]

export const seedFixtures: SeedFixture[] = [...handwritten, ...generated].map((note, index) => {
  const createdDaysAgo = index === 0 ? 0.15 : ((index * 37) % 90) + 0.2
  const reopenCount = index % 10 < 4 ? 0 : index >= 144 ? 16 : 1 + index % 2
  // Fractions keep every historical view after creation and before today.
  const viewedDaysAgo = [createdDaysAgo, ...Array.from({ length: reopenCount }, (_, i) =>
    createdDaysAgo * (1 - (i + 1) / (reopenCount + 1)),
  )]
  return {
    ...note,
    id: `seed-${String(index + 1).padStart(3, '0')}`,
    createdDaysAgo,
    updatedDaysAgo: index % 7 === 0 ? viewedDaysAgo.at(-1)! : createdDaysAgo,
    viewedDaysAgo,
  }
})
