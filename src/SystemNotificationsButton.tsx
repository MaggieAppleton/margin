import { useEffect, useState } from "react";
import { useNotifications } from "./NotificationsContext";
import { loadNotes } from "./notes";
import { buttonLabel, notifySystem, permissionState, requestPermission, type SystemPermission } from "./systemNotifications";

export function SystemNotificationsButton() {
  const { subscribe } = useNotifications();
  const [permission, setPermission] = useState<SystemPermission>(() => permissionState());

  useEffect(() => subscribe((fired) => notifySystem(fired, loadNotes())), [subscribe]);

  return (
    <button
      type="button"
      disabled={permission !== "default"}
      onClick={async () => setPermission(await requestPermission())}
    >
      {buttonLabel(permission)}
    </button>
  );
}
