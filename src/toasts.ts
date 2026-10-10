import type { DueNotification } from "./reminderRuntime";

export const MAX_TOASTS = 2;
export const TOAST_MS = 4000;

/** Adds newly fired reminders as toasts; once MAX_TOASTS are showing, extras go straight to the tray only. */
export function addToasts(current: string[], fired: DueNotification[], max = MAX_TOASTS): string[] {
  const next = [...current];
  for (const f of fired) {
    if (next.length >= max) break;
    if (!next.includes(f.noteId)) next.push(f.noteId);
  }
  return next;
}

/** Toasts only show reminders that are still due. */
export function visibleToasts(toastIds: string[], due: DueNotification[]): string[] {
  return toastIds.filter((id) => due.some((d) => d.noteId === id));
}
