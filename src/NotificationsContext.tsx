import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Note } from "./notes";
import {
  clockNow, done as doneStep, fireNext as fireNextStep, initialState, realClock, setDemo, snooze as snoozeStep,
  tick, type Clock, type DueNotification, type RuntimeState, type StepResult,
} from "./reminderRuntime";

export type NotificationsApi = {
  due: DueNotification[];
  demoClock: boolean;
  now: () => number;
  setDemoClock: (on: boolean) => void;
  fireNext: () => void;
  snooze: (noteId: string, minutes: number) => void;
  done: (noteId: string) => void;
  /** Called with each batch of newly due reminders. Returns an unsubscribe function. */
  subscribe: (listener: (fired: DueNotification[]) => void) => () => void;
};

const Ctx = createContext<NotificationsApi | null>(null);

type Props = { notes: Note[]; setNotes: (fn: (all: Note[]) => Note[]) => void; children: ReactNode };

export function NotificationsProvider({ notes, setNotes, children }: Props) {
  const [state, setState] = useState<RuntimeState>(initialState);
  const [clock, setClock] = useState<Clock>(realClock);
  const stateRef = useRef(state);
  const clockRef = useRef(clock);
  const notesRef = useRef(notes);
  const listeners = useRef(new Set<(f: DueNotification[]) => void>());
  notesRef.current = notes;

  const now = useCallback(() => clockNow(clockRef.current, Date.now()), []);

  const commit = useCallback((s: RuntimeState) => {
    stateRef.current = s;
    setState(s);
  }, []);

  const apply = useCallback(
    (r: StepResult) => {
      if (r.state === stateRef.current) return;
      commit(r.state);
      if (r.fired.length) listeners.current.forEach((l) => l(r.fired));
    },
    [commit],
  );

  useEffect(() => {
    // Checks every second; ten times a second on the demo clock so a reminder
    // 2 simulated minutes out fires within 2 real seconds.
    const id = setInterval(() => apply(tick(notesRef.current, stateRef.current, now())), clock.demo ? 100 : 1000);
    return () => clearInterval(id);
  }, [apply, now, clock.demo]);

  const api = useMemo<NotificationsApi>(
    () => ({
      due: state.due,
      demoClock: clock.demo,
      now,
      setDemoClock: (on) => {
        const next = setDemo(clockRef.current, on, Date.now());
        clockRef.current = next;
        setClock(next);
      },
      fireNext: () => apply(fireNextStep(notesRef.current, stateRef.current, now())),
      snooze: (noteId, minutes) => {
        const r = snoozeStep(notesRef.current, stateRef.current, noteId, minutes, now());
        notesRef.current = r.notes;
        setNotes(() => r.notes);
        commit(r.state);
      },
      done: (noteId) => {
        const r = doneStep(notesRef.current, stateRef.current, noteId);
        notesRef.current = r.notes;
        setNotes(() => r.notes);
        commit(r.state);
      },
      subscribe: (l) => {
        listeners.current.add(l);
        return () => void listeners.current.delete(l);
      },
    }),
    [state.due, clock.demo, now, apply, commit, setNotes],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useNotifications(): NotificationsApi {
  const v = useContext(Ctx);
  if (!v) throw new Error("useNotifications must be used inside NotificationsProvider");
  return v;
}
