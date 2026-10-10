import { useNotifications } from "./NotificationsContext";

export function DemoClock() {
  const { demoClock, setDemoClock, fireNext, due } = useNotifications();
  return (
    <>
      <label>
        <input type="checkbox" checked={demoClock} onChange={(e) => setDemoClock(e.target.checked)} /> Demo clock (1 min/sec)
      </label>
      {demoClock && <button type="button" onClick={fireNext}>Fire next reminder</button>}
      <span data-testid="due-count">{due.length} due</span>
    </>
  );
}
