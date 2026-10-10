import type { Note } from "../notes/types";
import { useDemoClock } from "./hooks";
import { fireNextReminder, setDemoClock } from "./store";

export function Footer({ notes }: { notes: Note[] }) {
  const demo = useDemoClock();
  return (
    <footer className="margin-footer">
      <label>
        <input
          type="checkbox"
          checked={demo}
          onChange={(e) => setDemoClock(e.target.checked)}
        />{" "}
        Demo clock
      </label>
      <button onClick={() => fireNextReminder(notes)}>Fire next reminder</button>
    </footer>
  );
}
