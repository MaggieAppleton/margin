import { createClock } from "./clock";
import { createScheduler, type DueEvent } from "./scheduler";
import type { Note } from "../notes/types";

export const clock = createClock();
export const now = clock.now;

const scheduler = createScheduler(now);
let events: DueEvent[] = [];
let demo = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const getDueEvents = () => events;
export const getDemo = () => demo;

export function setDemoClock(on: boolean) {
  clock.setDemo(on);
  demo = clock.isDemo();
  notify();
}

function push(added: DueEvent[]) {
  if (added.length) {
    events = [...events, ...added];
    notify();
  }
}

export const tickScheduler = (notes: Note[]) => push(scheduler.tick(notes));
export const fireNextReminder = (notes: Note[]) => {
  const e = scheduler.fireNext(notes);
  if (e) push([e]);
  return e;
};
export const clearDueEvents = () => {
  events = [];
  notify();
};
