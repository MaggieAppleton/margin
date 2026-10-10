import { useId, useRef, useState } from "react";
import { NotificationCard, type NotificationActions } from "./NotificationCard";
import type { Notification } from "./store";

export function NotificationBell({
  list,
  actions,
}: {
  list: Notification[];
  actions: NotificationActions;
}) {
  const [open, setOpen] = useState(false);
  const trayId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="bell"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <button
        ref={toggle}
        aria-controls={open ? trayId : undefined}
        aria-label={`Notifications, ${list.length} outstanding`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        🔔
        {list.length > 0 && (
          <span className="badge" data-testid="badge">
            {list.length}
          </span>
        )}
      </button>
      {open && (
        <div id={trayId} className="tray" role="region" aria-label="Notifications">
          {list.length === 0 ? (
            <p className="empty">No reminders due.</p>
          ) : (
            <ul className="notification-list">
              {list.map((n) => (
                <NotificationCard key={n.key} n={n} actions={actions} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
