# Margin

Notes that remind you.

A small, local notes workspace built with Vite, React, TypeScript, and shadcn/ui.
No accounts or backend. Notes are saved in this browser's localStorage.

## Run locally

Use Node.js 22.18+ (or 24+).

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Search notes on the left; edit a title or body on
the right. Changes save as you type. Use **+** to create a note and the trash icon
to delete one after confirmation.

The first run loads 150 demo notes. Add `?reset` to the URL to discard local edits
and restore the seeds, e.g. `http://localhost:5173/?reset`. The reset parameter is
removed after use so subsequent reloads preserve edits. Seed dates are relative
to the day you open the app.

```sh
npm test
npm run typecheck
npm run build
```

The pre-document foundation is described in [BASELINE.md](BASELINE.md). Future
behaviour follows Margin's Chopin living document. This baseline contains no
reminders or resurfacing.
