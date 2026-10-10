import { describe, expect, it } from "vitest";
import { createClock } from "./clock";
import { createScheduler } from "./scheduler";
import type { Note } from "../notes/types";

const mk = (id: string, reminderAt: number | null): Note => ({
  id, title: "", body: "", reminderAt, createdAt: 0,
});

describe("scheduler", () => {
  it("fires a due reminder once, without duplicates", () => {
    let t = 1000;
    const s = createScheduler(() => t);
    const notes = [mk("a", 2000)];
    expect(s.tick(notes)).toHaveLength(0);
    t = 2000;
    expect(s.tick(notes).map((e) => e.noteId)).toEqual(["a"]);
    t = 3000;
    expect(s.tick(notes)).toHaveLength(0);
  });

  it("re-arms when reminderAt changes", () => {
    let t = 2000;
    const s = createScheduler(() => t);
    expect(s.tick([mk("a", 1000)])).toHaveLength(1);
    expect(s.tick([mk("a", 5000)])).toHaveLength(0);
    t = 5000;
    expect(s.tick([mk("a", 5000)])).toHaveLength(1);
  });

  it("demo clock: 2-minute reminder fires within ~2-3 ticks", () => {
    let real = 0;
    const clock = createClock(() => real);
    clock.setDemo(true);
    const s = createScheduler(clock.now);
    const notes = [mk("a", clock.now() + 2 * 60_000)];
    const fires: number[] = [];
    for (let tick = 1; tick <= 5; tick++) {
      real += 1000;
      if (s.tick(notes).length) fires.push(tick);
    }
    expect(fires).toEqual([2]);
  });

  it("toggling demo off stops accelerated time", () => {
    let real = 0;
    const clock = createClock(() => real);
    clock.setDemo(true);
    real += 1000;
    expect(clock.now()).toBe(60_000);
    clock.setDemo(false);
    expect(clock.now()).toBe(real);
    real += 1000;
    expect(clock.now()).toBe(2000);
  });

  it("fireNext picks the soonest unfired reminder", () => {
    const s = createScheduler(() => 0);
    const notes = [mk("late", 9000), mk("none", null), mk("soon", 3000)];
    expect(s.fireNext(notes)?.noteId).toBe("soon");
    expect(s.fireNext(notes)?.noteId).toBe("late");
    expect(s.fireNext(notes)).toBeNull();
  });
});
