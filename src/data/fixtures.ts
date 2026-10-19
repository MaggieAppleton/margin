import { handwritten } from './handwritten.ts'
import type { SeedFixture } from './model.ts'

const topics = [
  ['Command menus', 'Try search terms that describe an intention rather than an exact command.', 'developer tools'],
  ['Working offline', 'The connection should be a convenience, not permission to keep working.', 'local-first'],
  ['The first five minutes', 'Show one useful thing before explaining the whole system.', 'onboarding'],
  ['Editing in place', 'Keep the surrounding context visible while the thing changes.', 'interaction'],
  ['Error messages', 'Give the person one concrete next step and enough evidence to trust it.', 'writing'],
  ['A shared canvas', 'Watch how people make groups before giving them a grouping tool.', 'collaboration'],
  ['Reading on screen', 'Leave enough space for a second thought beside the first one.', 'reading'],
  ['Version history', 'A useful history explains decisions as well as saving old versions.', 'developer tools'],
  ['Keyboard paths', 'Walk through the whole flow without touching the trackpad.', 'accessibility'],
  ['Useful constraints', 'Remove one option and see whether the remaining choices become clearer.', 'design'],
  ['Quiet interfaces', 'The work should have more visual weight than the tools around it.', 'attention'],
] as const

const angles = [
  ['A small experiment', 'Make a paper version first. What gets easier when the machinery disappears?'],
  ['From the sketchbook', 'Draw two alternatives side by side. Keep the awkward one around long enough to understand it.'],
  ['A question for later', 'Where does this break down for someone who is coming back after a month?'],
  ['Prototype notes', 'The rough version feels better. Find out which detail the polished version lost.'],
  ['Something to observe', 'Watch someone use it before describing what it is meant to do.'],
  ['One thing to change', 'Try changing only this. Take a screenshot before touching anything else.'],
  ['An unfinished thought', 'There is probably a simpler explanation here. Come back with a concrete example.'],
  ['A test for the next draft', 'Try it with a long title, an empty document, and a task interrupted halfway through.'],
  ['A detail worth keeping', 'It is small enough to overlook, but removing it makes the whole interaction feel less certain.'],
  ['After trying it twice', 'The first attempt helped me learn the tool. The second helped me notice what was getting in the way.'],
] as const

const generated = topics.flatMap(([topic, thought, tag]) => angles.map(([angle, detail], i) => ({
  title: `${topic}: ${angle.toLowerCase()}`,
  body: i % 3 === 0 ? thought : `${thought}\n\n${detail}`,
  tags: [tag],
})))

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
    updatedDaysAgo: index % 7 === 0 ? createdDaysAgo * 0.7 : createdDaysAgo,
    viewedDaysAgo,
  }
})
