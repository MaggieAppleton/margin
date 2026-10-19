import assert from 'node:assert/strict'
import test from 'node:test'
import { simulate, chooseNotes } from '../scripts/simulation.ts'

test('all approaches pick three distinct existing notes per day for 90 days', () => {
  const results = simulate()
  for (const result of Object.values(results.approaches)) {
    assert.equal(result.daily.length, 90)
    assert.equal(result.ageDistribution.reduce((sum, bucket) => sum + bucket.count, 0), 270)
    let lastCoverage = 0
    for (const day of result.daily) {
      assert.equal(day.noteIds.length, 3)
      assert.equal(new Set(day.noteIds).size, 3)
      assert.ok(day.coverage >= lastCoverage && day.coverage <= 1)
      assert.ok(day.agesInDays.every(age => age >= 0))
      lastCoverage = day.coverage
    }
  }
  assert.equal(results.approaches.decay.uniqueNotes, 150)
  assert.deepEqual(simulate(), results)
})

test('decay chooses oldest last seen and spaced repetition chooses earliest due', () => {
  const notes = [
    { id: 'old', createdDay: -30, lastSeenDay: -20, stage: 4 },
    { id: 'new', createdDay: -10, lastSeenDay: -5, stage: 0 },
    { id: 'middle', createdDay: -20, lastSeenDay: -10, stage: 1 },
    { id: 'fresh', createdDay: -2, lastSeenDay: -1, stage: 0 },
  ]
  assert.deepEqual(chooseNotes('decay', notes, 1, () => .5).map(n => n.id), ['old', 'middle', 'new'])
  assert.deepEqual(chooseNotes('spacedRepetition', notes, 1, () => .5).map(n => n.id), ['middle', 'new', 'fresh'])
})
