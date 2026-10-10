import { useEffect, useSyncExternalStore } from "react";
import type { Note } from "../notes/types";
import { getDueEvents, subscribe as subscribeDue } from "../scheduler/store";

export const MAX_TOASTS = 3;
export const TOAST_MS = 4000;
export const SNOOZE_MS = 15 * 60 * 1000;

type Item = { key: string; noteId: string; reminderAt: number; toast: boolean };
type State = { items: Item[]; seen: number; announcement: string };

let state: State = { items: [], seen: 0, announcement: "" };
const listeners = new Set<() => void>();
const set = (next: State) => {
  state = next;
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export const toMs = (v: Note["reminderAt"]): number | null => {
  if (v == null || v === "") return null;
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? null : t;
};

// Pulls unseen scheduler events into the single notification list.
export function syncNotifications(notes: Note[]) {
  const events = getDueEvents();
  const from = events.length < state.seen ? 0 : state.seen;
  if (events.length === from && events.length === state.seen) return;
  let items = state.items;
  const titles: string[] = [];
  for (const e of events.slice(from)) {
    const key = `${e.noteId}@${e.reminderAt}`;
    if (items.some((i) => i.key === key)) continue;
    items = [...items, { key, noteId: e.noteId, reminderAt: e.reminderAt, toast: true }];
    const note = notes.find((n) => n.id === e.noteId);
    titles.push(note?.title || "Untitled");
  }
  let toasts = items.filter((i) => i.toast).length;
  items = items.map((i) => (i.toast && toasts > MAX_TOASTS ? (toasts--, { ...i, toast: false }) : i));
  set({
    items,
    seen: events.length,
    announcement: titles.length ? `Reminder due: ${titles.join(", ")}` : state.announcement,
  });
}

export const demoteToast = (key: string) =>
  set({ ...state, items: state.items.map((i) => (i.key === key ? { ...i, toast: false } : i)) });

export const dismissNotification = (key: string) =>
  set({ ...state, items: state.items.filter((i) => i.key !== key) });

export const resetNotifications = () => set({ items: [], seen: 0, announcement: "" });

export type Notification = {
  key: string;
  noteId: string;
  title: string;
  firstLine: string;
  toast: boolean;
};

export function useNotifications(notes: Note[]) {
  const due = useSyncExternalStore(subscribeDue, getDueEvents);
  const s = useSyncExternalStore(subscribe, () => state);
  useEffect(() => syncNotifications(notes), [due, notes]);

  const list: Notification[] = [];
  for (const i of s.items) {
    const n = notes.find((x) => x.id === i.noteId);
    if (!n || toMs(n.reminderAt) !== i.reminderAt) continue; // snoozed, cleared or deleted
    list.push({
      key: i.key,
      noteId: n.id,
      title: n.title || "Untitled",
      firstLine: n.body.split("\n").find((l) => l.trim()) ?? "",
      toast: i.toast,
    });
  }
  return { list, announcement: s.announcement };
}
