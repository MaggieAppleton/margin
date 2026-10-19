# Margin baseline

This baseline predates Margin's Chopin document. It is a local notes workspace for
the recorded demo. Extend this foundation when working from the document.

## App shell

A two-pane workspace: searchable notes on the left; title and plain-text body on
the right. Each list row shows the note title.
Notes save to localStorage as you type. New and delete are the only note actions.
The interface uses shadcn/ui controls, warm off-white surfaces, a small sans UI
and a sans editor.
There are no accounts, backend, deployment, reminders, or resurfacing features.

## Data

`Note { id, title, body, createdAt, updatedAt, lastViewedAt, tags: string[] }`

`ViewEvent { noteId, viewedAt }`

Timestamps are ISO strings. A versioned localStorage workspace holds notes and a
separate `viewEvents` array, written together to keep the two consistent. Opening
a note updates `lastViewedAt` and appends an event without changing `updatedAt`.
Creating a note counts as its first view. Deleting a note also removes its events.
Search matches title, body, and tags, case-insensitively. List order follows edit
date; opening a note does not reorder it. An empty workspace stays empty on reload.

## Seed data

First run creates 150 notes: 40 individually written notes and 110 deterministic
variations about design, reading, and developer tools. Fixtures use day offsets
relative to the current day and span 90 days. Every note has a creation view;
40% are never reopened, most others have one or two reopens, and a few have many.
`?reset` restores this workspace and is consumed so an ordinary reload preserves
subsequent edits. Opening the first visible note records a real view. On phones,
startup shows only the list; a view is recorded when its editor opens, including
when returning to the same note from the list.

## Implementation and verification

1. Add Vite/React/TypeScript and small model, seed, and storage modules. Check
   fixture counts, temporal consistency, viewing distribution, and persistence.
2. Add the list and editor in separate components. Verify search, create/delete,
   immediate autosave, reload, reset, and view events in a running browser.
3. On `demo/simulate-fallback` only, compare three scheduling approaches over 90
   days using these fixtures. Keep the script and its output out of `baseline`.
4. Run build and typecheck, capture the real UI, and open a PR to `main` with the
   screenshot. Leave both branches unmerged.
