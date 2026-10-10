import type { Note } from "./notes";
import type { DueNotification } from "./reminderRuntime";

export const OPEN_NOTE_EVENT = "margin:open-note";
export type OpenNoteDetail = { noteId: string };

export type SystemPermission = NotificationPermission | "unsupported";

export function permissionState(env: { Notification?: typeof Notification } = globalThis): SystemPermission {
  return env.Notification ? env.Notification.permission : "unsupported";
}

export async function requestPermission(env: { Notification?: typeof Notification } = globalThis): Promise<SystemPermission> {
  if (!env.Notification) return "unsupported";
  return (await env.Notification.requestPermission()) ?? env.Notification.permission;
}

export function buttonLabel(p: SystemPermission): string {
  switch (p) {
    case "granted": return "System notifications on";
    case "denied": return "System notifications blocked in browser settings";
    case "unsupported": return "System notifications not supported";
    default: return "Enable system notifications";
  }
}

/** Asks the app to focus and scroll to a note. The in-app Open handler listens for this. */
export function openNote(noteId: string, win: Window = window): void {
  win.focus();
  win.dispatchEvent(new CustomEvent<OpenNoteDetail>(OPEN_NOTE_EVENT, { detail: { noteId } }));
}

/** Shows an OS notification per fired reminder, only when permitted and the page is hidden. */
export function notifySystem(
  fired: DueNotification[],
  notes: Note[],
  env: { Notification?: typeof Notification; document?: Pick<Document, "hidden">; window?: Window } = globalThis,
): void {
  const N = env.Notification;
  if (!N || N.permission !== "granted" || !env.document?.hidden) return;
  for (const f of fired) {
    const note = notes.find((n) => n.id === f.noteId);
    if (!note) continue;
    const n = new N(note.title, { body: note.body });
    n.onclick = () => {
      n.close();
      openNote(note.id, env.window ?? window);
    };
  }
}
