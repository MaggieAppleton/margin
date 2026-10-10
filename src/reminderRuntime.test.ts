import { describe, expect, it } from "vitest";
import type { Note } from "./notes";
import { clockNow, done, fireNext, initialState, realClock, setDemo, snooze, tick } from "./reminderRuntime";

const note = (id: string, remindAt?: number): Note => ({ id, title: id, body: "", createdAt: 0, remindAt });
const MIN = 60_000;

describe("demo clock", () => {
  it("runs real time when off", () => {
    expect(clockNow(realClock(), 5000)).toBe(5000);
  });
  it("advances one minute per real second when on", () => {
    const c = setDemo(realClock(), true, 1000);
    expect(clockNow(c, 1000)).toBe(1000);
    expect(clockNow(c, 2000)).toBe(1000 + MIN);
    expect(clockNow(c, 4000)).toBe(1000 + 3 * MIN);
  });
  it("returns to real time when turned off", () => {
    const c = setDemo(setDemo(realClock(), true, 0), false, 5000);
    expect(clockNow(c, 6000)).toBe(6000);
  });
});

describe("tick", () => {
  it("fires only due reminders", () => {
    const notes = [note("a", 100), note("b", 200), note("c")];
    const r = tick(notes, initialState(), 150);
    expect(r.fired.map((f) => f.noteId)).toEqual(["a"]);
    expect(r.state.due).toEqual([{ noteId: "a", firedAt: 150 }]);
  });
  it("fires a 2-minute reminder within 2 real seconds on the demo clock", () => {
    const c = setDemo(realClock(), true, 0);
    const notes = [note("a", clockNow(c, 0) + 2 * MIN)];
    expect(tick(notes, initialState(), clockNow(c, 1000)).fired).toHaveLength(0);
    expect(tick(notes, initialState(), clockNow(c, 2000)).fired).toHaveLength(1);
  });
  it("never fires twice for the same reminder", () => {
    const notes = [note("a", 100)];
    const s1 = tick(notes, initialState(), 100).state;
    expect(tick(notes, s1, 200).fired).toHaveLength(0);
    const dismissed = { ...s1, due: [] };
    expect(tick(notes, dismissed, 300).fired).toHaveLength(0);
  });
});

describe("fireNext", () => {
  it("fires the soonest pending reminder immediately", () => {
    const notes = [note("late", 900), note("soon", 500), note("none")];
    const r = fireNext(notes, initialState(), 10);
    expect(r.fired).toEqual([{ noteId: "soon", firedAt: 10 }]);
    const r2 = fireNext(notes, r.state, 11);
    expect(r2.fired[0].noteId).toBe("late");
    expect(fireNext(notes, r2.state, 12).fired).toHaveLength(0);
  });
  it("does not re-fire naturally afterwards", () => {
    const notes = [note("a", 500)];
    const s = fireNext(notes, initialState(), 10).state;
    expect(tick(notes, s, 600).fired).toHaveLength(0);
  });
});

describe("done and snooze", () => {
  it("done clears remindAt and the notification", () => {
    const notes = [note("a", 100)];
    const s = tick(notes, initialState(), 100).state;
    const r = done(notes, s, "a");
    expect(r.notes[0].remindAt).toBeUndefined();
    expect(r.state.due).toEqual([]);
  });
  it("snooze moves remindAt from now, removes the notification, and re-fires later", () => {
    const notes = [note("a", 100)];
    const s = tick(notes, initialState(), 100).state;
    const r = snooze(notes, s, "a", 10, 1000);
    expect(r.notes[0].remindAt).toBe(1000 + 10 * MIN);
    expect(r.state.due).toEqual([]);
    expect(tick(r.notes, r.state, 1000 + 9 * MIN).fired).toHaveLength(0);
    expect(tick(r.notes, r.state, 1000 + 10 * MIN).fired).toHaveLength(1);
  });
  it("re-fires when rescheduled to a new time", () => {
    const s = tick([note("a", 100)], initialState(), 100).state;
    const s2 = { ...s, due: [] };
    expect(tick([note("a", 500)], s2, 600).fired).toHaveLength(1);
  });
});
