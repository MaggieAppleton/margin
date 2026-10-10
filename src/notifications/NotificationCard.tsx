import type { Notification } from "./store";

export type NotificationActions = {
  snooze: (n: Notification) => void;
  done: (n: Notification) => void;
  open: (n: Notification) => void;
};

export function NotificationCard({ n, actions }: { n: Notification; actions: NotificationActions }) {
  return (
    <li className="notification" data-testid="notification">
      <strong className="notification-title">{n.title}</strong>
      {n.firstLine && <span className="notification-body">{n.firstLine}</span>}
      <div className="notification-actions">
        <button onClick={() => actions.snooze(n)}>Snooze 5 min</button>
        <button onClick={() => actions.done(n)}>Done</button>
        <button onClick={() => actions.open(n)}>Open</button>
      </div>
    </li>
  );
}
