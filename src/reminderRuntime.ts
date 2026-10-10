import type { Note } from "./notes";

export type DueNotification = { noteId: string; firedAt: number };

export type RuntimeState = {
  due: DueNotification[];
  // remindAt value each note has already notified for; prevents repeat fires
  notified: Record<string, number>;
};

export type Clock = { demo: boolean; realAnchor: number; simAnchor: number };

export const DEMO_MS_PER_REAL_SECOND = 60_000;

export const initialState = (): RuntimeState => ({ due: [], notified: {} });

export const realClock = (): Clock => ({ demo: false, realAnchor: 0, simAnchor: 0 });

export const clockNow = (clock: Clock, realNow: number): number =>
  clock.demo ? clock.simAnchor + (realNow - clock.realAnchor) * (DEMO_MS_PER_REAL_SECOND / 1000) : realNow;

// Turning the demo clock on starts from the current time; off returns to real time.
export const setDemo = (clock: Clock, on: boolean, realNow: number): Clock =>
  on === clock.demo ? clock : on ? { demo: true, realAnchor: realNow, simAnchor: realNow } : realClock();

export const toMs = (v: number | string | undefined): number | undefined => {
  if (v === undefined) return undefined;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? undefined : t;
};

const isPending = (note: Note, state: RuntimeState): number | undefined => {
  const at = toMs(note.remindAt);
  if (at === undefined) return undefined;
  if (state.notified[note.id] === at) return undefined;
  if (state.due.some((d) => d.noteId === note.id)) return undefined;
  return at;
};

const fire = (state: RuntimeState, note: Note, at: number, now: number): RuntimeState => ({
  due: [...state.due, { noteId: note.id, firedAt: now }],
  notified: { ...state.notified, [note.id]: at },
});

export type StepResult = { state: RuntimeState; fired: DueNotification[] };

export function tick(notes: Note[], state: RuntimeState, now: number): StepResult {
  let next = state;
  const fired: DueNotification[] = [];
  const due = notes
    .map((n) => ({ n, at: isPending(n, state) }))
    .filter((x): x is { n: Note; at: number } => x.at !== undefined && x.at <= now)
    .sort((a, b) => a.at - b.at);
  for (const { n, at } of due) {
    next = fire(next, n, at, now);
    fired.push({ noteId: n.id, firedAt: now });
  }
  return { state: next, fired };
}

export function fireNext(notes: Note[], state: RuntimeState, now: number): StepResult {
  let best: { n: Note; at: number } | undefined;
  for (const n of notes) {
    const at = isPending(n, state);
    if (at !== undefined && (!best || at < best.at)) best = { n, at };
  }
  if (!best) return { state, fired: [] };
  return { state: fire(state, best.n, best.at, now), fired: [{ noteId: best.n.id, firedAt: now }] };
}

const dismiss = (state: RuntimeState, noteId: string): RuntimeState => ({
  ...state,
  due: state.due.filter((d) => d.noteId !== noteId),
});

export function snooze(
  notes: Note[],
  state: RuntimeState,
  noteId: string,
  minutes: number,
  now: number,
): { notes: Note[]; state: RuntimeState } {
  const remindAt = now + minutes * 60_000;
  return {
    notes: notes.map((n) => (n.id === noteId ? { ...n, remindAt } : n)),
    state: dismiss(state, noteId),
  };
}

export function done(
  notes: Note[],
  state: RuntimeState,
  noteId: string,
): { notes: Note[]; state: RuntimeState } {
  const { [noteId]: _, ...notified } = state.notified;
  return {
    notes: notes.map((n) => {
      if (n.id !== noteId) return n;
      const { remindAt: _r, ...rest } = n;
      return rest;
    }),
    state: { ...dismiss(state, noteId), notified },
  };
}
