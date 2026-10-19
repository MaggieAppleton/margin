import { mkdir, writeFile } from 'node:fs/promises'
import { simulate } from './simulation.ts'

const result = simulate()
const out = new URL('./out/', import.meta.url)
await mkdir(out, { recursive: true })
await writeFile(new URL('simulation.json', out), JSON.stringify(result, null, 2) + '\n')

console.table(Object.entries(result.approaches).map(([approach, data]) => ({
  Approach: approach,
  'Unique / 150': data.uniqueNotes,
  Coverage: `${(data.coverage * 100).toFixed(1)}%`,
  'Repeats ≤14d': data.repeatsWithin14Days,
  'Notes repeated': data.notesRepeatedWithin14Days,
  'Age 0–6d': data.ageDistribution[0].count,
  'Age 7–29d': data.ageDistribution[1].count,
  'Age 30–89d': data.ageDistribution[2].count,
  'Age 90+d': data.ageDistribution[3].count,
})))
console.log('Saved scripts/out/simulation.json (90 days × 3 picks per approach).')
