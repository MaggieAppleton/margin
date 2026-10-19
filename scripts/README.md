# Demo safety net

This folder exists only on `demo/simulate-fallback`. Do not merge it into the
baseline PR or main. The notes app does not import these files.

```sh
npm install
npx tsx scripts/simulate.ts
```

The script writes `scripts/out/simulation.json` and prints a summary. Output is
ignored by git and reproducible with random seed 42. It reuses the app's fixtures
directly: day 0 is the seed load date and all 150 notes already exist. No new
notes arrive during the next 90 days.

- Random: three uniformly sampled distinct notes each day.
- Spaced repetition: 1, 3, 7, 14, then 30 days after last viewing. Historical
  reopens initialise each note's stage; each new view advances it, capped at 30.
  Earliest overdue notes win, with ID as a deterministic tiebreaker. The daily
  budget can delay views beyond their target interval.
- Decay: the three notes with the oldest last-view times, updating after each day.

Coverage counts only views during the simulation. A repeat is an appearance
within 14 days of its preceding simulated appearance; the output also counts
distinct notes with such repeats. Age means time since creation; each daily
record additionally includes time since last seen. The JSON contains daily
coverage and note IDs plus an aggregate age histogram for each approach.
