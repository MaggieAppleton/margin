import { useEffect, useRef, useSyncExternalStore } from "react";
import type { Note } from "../notes/types";
import { getDemo, getDueEvents, subscribe, tickScheduler } from "./store";

export const useDueReminders = () => useSyncExternalStore(subscribe, getDueEvents);
export const useDemoClock = () => useSyncExternalStore(subscribe, getDemo);

// Ticks once per real second against the latest notes.
export function useScheduler(notes: Note[]) {
  const ref = useRef(notes);
  ref.current = notes;
  useEffect(() => {
    tickScheduler(ref.current);
    const id = setInterval(() => tickScheduler(ref.current), 1000);
    return () => clearInterval(id);
  }, []);
}
