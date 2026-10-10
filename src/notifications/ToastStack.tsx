import { useEffect, useState } from "react";
import { NotificationCard, type NotificationActions } from "./NotificationCard";
import { demoteToast, TOAST_MS, type Notification } from "./store";

function Toast({ n, actions }: { n: Notification; actions: NotificationActions }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => demoteToast(n.key), TOAST_MS);
    return () => clearTimeout(id);
  }, [paused, n.key]);
  return (
    <div
      className="toast"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <ul className="notification-list">
        <NotificationCard n={n} actions={actions} />
      </ul>
    </div>
  );
}

export function ToastStack({
  list,
  announcement,
  actions,
}: {
  list: Notification[];
  announcement: string;
  actions: NotificationActions;
}) {
  return (
    <>
      <div className="visually-hidden" aria-live="polite" role="status">
        {announcement}
      </div>
      <div className="toast-stack" data-testid="toast-stack">
        {list.filter((n) => n.toast).map((n) => (
          <Toast key={n.key} n={n} actions={actions} />
        ))}
      </div>
    </>
  );
}
