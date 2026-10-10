import { describe, expect, it } from "vitest";
import { parseReminder, presetTime } from "./reminderParse";

// Sat 10 Oct 2026, 11:00 local
const now = new Date(2026, 9, 10, 11, 0, 0).getTime();
const local = (m: number, d: number, h: number, min = 0) => new Date(2026, m, d, h, min).getTime();

describe("parseReminder", () => {
  it("parses tomorrow 9am", () => {
    expect(parseReminder("tomorrow 9am", now)).toEqual({ kind: "ok", at: local(9, 11, 9), needsConfirm: false });
  });
  it("parses in 20 minutes", () => {
    expect(parseReminder("in 20 minutes", now)).toEqual({ kind: "ok", at: now + 20 * 60_000, needsConfirm: false });
  });
  it("rejects unparseable and empty input", () => {
    expect(parseReminder("later", now)).toEqual({ kind: "invalid" });
    expect(parseReminder("blah", now)).toEqual({ kind: "invalid" });
    expect(parseReminder("  ", now)).toEqual({ kind: "empty" });
  });
  it("requires confirmation when no hour is given", () => {
    const r = parseReminder("next week", now);
    expect(r.kind).toBe("ok");
    if (r.kind === "ok") expect(r.needsConfirm).toBe(true);
  });
  it("parses forward from now", () => {
    expect(parseReminder("9am", now)).toMatchObject({ at: local(9, 11, 9) });
    expect(parseReminder("monday", now)).toMatchObject({ kind: "ok", needsConfirm: true });
    const r = parseReminder("mon 8:30", now);
    expect(r).toMatchObject({ at: local(9, 12, 8, 30) });
  });
  it("biases bare small hours to PM", () => {
    expect(parseReminder("friday at 3", now)).toMatchObject({ at: local(9, 16, 15), needsConfirm: false });
    expect(parseReminder("friday at 3am", now)).toMatchObject({ at: local(9, 16, 3) });
  });
  it("uses Margin presets for vague words", () => {
    expect(parseReminder("tomorrow morning", now)).toMatchObject({ at: local(9, 11, 9), needsConfirm: false });
    expect(parseReminder("this evening", now)).toMatchObject({ at: local(9, 10, 18) });
    expect(parseReminder("tonight", now)).toMatchObject({ at: local(9, 10, 18) });
  });
});

describe("presetTime", () => {
  it("resolves the three presets", () => {
    expect(presetTime("in-1-hour", now)).toBe(now + 3_600_000);
    expect(presetTime("this-evening", now)).toBe(local(9, 10, 18));
    expect(presetTime("tomorrow-morning", now)).toBe(local(9, 11, 9));
  });
  it("rolls this evening to tomorrow once 18:00 has passed", () => {
    expect(presetTime("this-evening", local(9, 10, 19))).toBe(local(9, 11, 18));
    expect(presetTime("this-evening", local(9, 10, 18))).toBe(local(9, 11, 18));
  });
});
