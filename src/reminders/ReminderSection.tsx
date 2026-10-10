import { now } from "../scheduler/store";
import { useState } from "react";
import {
  PRESETS,
  formatReminder,
  parseReminder,
  presetTime,
} from "./parseReminder";

type Props = {
  reminderAt: number | string | null | undefined;
  onChange: (reminderAt: number | null) => void;
};

export function ReminderSection({ reminderAt, onChange }: Props) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const parsed = text.trim() ? parseReminder(text, new Date(now())) : null;

  const set = (at: number) => {
    onChange(at);
    setText("");
    setMessage(null);
  };

  const confirm = () => {
    const result = parseReminder(text, new Date(now()));
    if (result.ok) set(result.at);
    else setMessage(result.message);
  };

  const hasReminder = reminderAt != null && reminderAt !== "";

  return (
    <div className="reminder">
      {hasReminder && (
        <p className="reminder-current">
          Reminder: <strong>{formatReminder(new Date(reminderAt).getTime())}</strong>{" "}
          <button type="button" onClick={() => onChange(null)}>
            Clear reminder
          </button>
        </p>
      )}
      <div className="reminder-entry">
        <input
          aria-label="Reminder time"
          placeholder={hasReminder ? "Change reminder…" : "Remind me… e.g. tomorrow 9am"}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setMessage(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              confirm();
            }
          }}
        />
        <button type="button" disabled={!parsed?.ok} onClick={confirm}>
          Set reminder
        </button>
      </div>
      {parsed?.ok && (
        <p className="reminder-preview" aria-live="polite">
          → {formatReminder(parsed.at)}
        </p>
      )}
      {parsed && !parsed.ok && (
        <p className="reminder-message" role="status">
          {parsed.message}
        </p>
      )}
      {message && !parsed && <p className="reminder-message">{message}</p>}
      <div className="reminder-presets">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => set(presetTime(p.id, new Date(now())).getTime())}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
