import { describe, expect, it } from "vitest";
import { parseReminder, presetTime } from "./parseReminder";

const now = new Date(2026, 9, 10, 14, 0); // Sat 10 Oct 2026, 14:00
const at = (r: ReturnType<typeof parseReminder>) => {
  if (!r.ok) throw new Error(r.message);
  return new Date(r.at);
};

describe("parseReminder", () => {
  it("parses 'tomorrow 9am'", () => {
    expect(at(parseReminder("tomorrow 9am", now))).toEqual(new Date(2026, 9, 11, 9, 0));
  });
  it("parses 'in 20 minutes'", () => {
    expect(at(parseReminder("in 20 minutes", now))).toEqual(new Date(2026, 9, 10, 14, 20));
  });
  it("rejects bare 'at 5'", () => {
    const r = parseReminder("at 5", now);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toMatch(/am\/pm/);
  });
  it("rejects 'tmrw 9'", () => {
    expect(parseReminder("tmrw 9", now).ok).toBe(false);
  });
  it("rejects 'later' and empty input", () => {
    expect(parseReminder("later", now).ok).toBe(false);
    expect(parseReminder("  ", now).ok).toBe(false);
  });
  it("accepts 24-hour time", () => {
    expect(at(parseReminder("17:00", now))).toEqual(new Date(2026, 9, 10, 17, 0));
  });
  it("pins morning/evening/tonight to app times", () => {
    expect(at(parseReminder("tomorrow morning", now))).toEqual(new Date(2026, 9, 11, 9, 0));
    expect(at(parseReminder("this evening", now))).toEqual(new Date(2026, 9, 10, 18, 0));
    expect(at(parseReminder("tonight", now))).toEqual(new Date(2026, 9, 10, 18, 0));
    expect(at(parseReminder("morning", now))).toEqual(new Date(2026, 9, 11, 9, 0));
    expect(at(parseReminder("friday evening", now))).toEqual(new Date(2026, 9, 16, 18, 0));
  });
  it("rolls past clock times forward", () => {
    expect(parseReminder("1pm", new Date(2026, 9, 10, 14, 0)).ok).toBe(true); // rolls forward
  });
});

describe("presetTime", () => {
  it("in 1 hour is now + 1h", () => {
    expect(presetTime("in-1-hour", now)).toEqual(new Date(2026, 9, 10, 15, 0));
  });
  it("this evening is 18:00 today", () => {
    expect(presetTime("this-evening", now)).toEqual(new Date(2026, 9, 10, 18, 0));
  });
  it("tomorrow morning is 09:00 tomorrow", () => {
    expect(presetTime("tomorrow-morning", now)).toEqual(new Date(2026, 9, 11, 9, 0));
  });
});
