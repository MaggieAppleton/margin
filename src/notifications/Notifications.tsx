import type { Note } from "../notes/types";
import { now } from "../scheduler/store";
import { NotificationBell } from "./NotificationBell";
import type { NotificationActions } from "./NotificationCard";
import { dismissNotification, SNOOZE_MS, useNotifications } from "./store";
import { ToastStack } from "./ToastStack";
import "./notifications.css";

type Props = {
  notes: Note[];
  edit: (id: string, patch: Partial<Pick<Note, "reminderAt">>) => void;
  completeReminder: (id: string) => void;
  openNote: (id: string) => void;
  part: "bell" | "toasts";
};

export function Notifications({ notes, edit, completeReminder, openNote, part }: Props) {
  const { list, announcement } = useNotifications(notes);
  const actions: NotificationActions = {
    snooze: (n) => {
      edit(n.noteId, { reminderAt: now() + SNOOZE_MS });
      dismissNotification(n.key);
    },
    done: (n) => {
      completeReminder(n.noteId);
      dismissNotification(n.key);
    },
    open: (n) => {
      openNote(n.noteId);
      dismissNotification(n.key);
    },
  };
  return part === "bell" ? (
    <NotificationBell list={list} actions={actions} />
  ) : (
    <ToastStack list={list} announcement={announcement} actions={actions} />
  );
}
