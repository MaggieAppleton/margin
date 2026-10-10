import { useState } from "react";
import { PRESETS, formatResolved, parseReminder, presetTime } from "./reminderParse";

type Props = { remindAt?: number | string; onChange: (at: number | undefined) => void };

export function ReminderField({ remindAt, onChange }: Props) {
  const [text, setText] = useState("");
  const [confirming, setConfirming] = useState(false);
  const parsed = parseReminder(text, Date.now());
  const current = remindAt === undefined ? undefined : new Date(remindAt).getTime();

  const commit = (at: number) => {
    onChange(at);
    setText("");
    setConfirming(false);
  };

  const save = () => {
    if (parsed.kind !== "ok") return;
    if (parsed.needsConfirm && !confirming) return setConfirming(true);
    commit(parsed.at);
  };

  return (
    <div className="reminder">
      {current !== undefined && !Number.isNaN(current) && (
        <p className="reminder-current">
          Reminder: <strong>{formatResolved(current)}</strong>{" "}
          <button type="button" className="link" onClick={() => onChange(undefined)}>Clear</button>
        </p>
      )}
      <form
        className="reminder-row"
        onSubmit={(e) => {
          e.preventDefault();
          save();
        }}
      >
        <input
          aria-label="Reminder"
          placeholder={current === undefined ? "Remind me… e.g. tomorrow 9am" : "Change reminder…"}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setConfirming(false);
          }}
        />
        <button type="submit" disabled={parsed.kind !== "ok"}>Set</button>
      </form>
      <p className="reminder-feedback" aria-live="polite">
        {parsed.kind === "ok" && `→ ${formatResolved(parsed.at)}`}
        {parsed.kind === "invalid" && "Couldn’t understand that time."}
      </p>
      {confirming && parsed.kind === "ok" && (
        <p className="reminder-confirm" role="alert">
          No time given — set for {formatResolved(parsed.at)}?{" "}
          <button type="button" onClick={() => commit(parsed.at)}>Confirm</button>{" "}
          <button type="button" className="link" onClick={() => setConfirming(false)}>Cancel</button>
        </p>
      )}
      <div className="chips">
        {PRESETS.map((p) => (
          <button type="button" key={p.id} className="chip" onClick={() => commit(presetTime(p.id, Date.now()))}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
