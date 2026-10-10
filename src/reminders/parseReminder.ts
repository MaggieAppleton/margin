import * as chrono from "chrono-node";

export type ReminderResult =
  | { ok: true; at: number }
  | { ok: false; message: string };

export type PresetId = "in-1-hour" | "this-evening" | "tomorrow-morning";

export const PRESETS: { id: PresetId; label: string }[] = [
  { id: "in-1-hour", label: "In 1 hour" },
  { id: "this-evening", label: "This evening" },
  { id: "tomorrow-morning", label: "Tomorrow morning" },
];

const MORNING_HOUR = 9;
const EVENING_HOUR = 18;

const AMBIGUOUS =
  "Add am/pm (e.g. “5pm”) or use 24-hour time (“17:00”) — or pick a preset.";
const UNRECOGNISED =
  "Couldn’t read a date and time. Try “tomorrow 9am” or “in 20 minutes” — or pick a preset.";
const PAST = "That time has already passed — pick a later time or a preset.";

function atHour(base: Date, hour: number, dayOffset = 0): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, 0, 0, 0);
  return d;
}

export function presetTime(id: PresetId, now: Date): Date {
  switch (id) {
    case "in-1-hour":
      return new Date(now.getTime() + 60 * 60 * 1000);
    case "this-evening":
      return atHour(now, EVENING_HOUR);
    case "tomorrow-morning":
      return atHour(now, MORNING_HOUR, 1);
  }
}

export function parseReminder(input: string, now: Date): ReminderResult {
  const text = input.trim();
  if (!text) return { ok: false, message: UNRECOGNISED };

  const named = text.match(/\b(morning|evening|tonight)\b/i);
  const result = named ? parseNamed(text, named[1].toLowerCase(), now) : parsePlain(text, now);
  if (result.ok && result.at <= now.getTime()) return { ok: false, message: PAST };
  return result;
}

function parseNamed(text: string, word: string, now: Date): ReminderResult {
  const hour = word === "morning" ? MORNING_HOUR : EVENING_HOUR;
  const rest = text
    .replace(/\b(morning|evening|tonight)\b/i, " ")
    .replace(/\b(this|in the|the|at|on)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (/\d\s*(am|pm|:)|\bat\s*\d/i.test(text)) return { ok: false, message: UNRECOGNISED };
  if (!rest) {
    const today = atHour(now, hour);
    return { ok: true, at: (today > now ? today : atHour(now, hour, 1)).getTime() };
  }
  const found = chrono.parse(rest, now, { forwardDate: true });
  if (found.length !== 1 || found[0].text.length !== rest.length) {
    return { ok: false, message: UNRECOGNISED };
  }
  const d = found[0].start.date();
  d.setHours(hour, 0, 0, 0);
  return { ok: true, at: d.getTime() };
}

function parsePlain(text: string, now: Date): ReminderResult {
  const found = chrono.parse(text, now, { forwardDate: true });
  if (found.length === 0) return { ok: false, message: UNRECOGNISED };
  const r = found[0];
  const leftover = (text.slice(0, r.index) + text.slice(r.index + r.text.length)).trim();
  if (found.length > 1 || /\d/.test(leftover)) return { ok: false, message: AMBIGUOUS };
  if (!r.start.isCertain("hour")) {
    return { ok: false, message: r.start.isCertain("day") || r.start.isCertain("weekday") ? AMBIGUOUS : UNRECOGNISED };
  }
  const hour = r.start.get("hour") ?? 0;
  const twentyFourHour = hour === 0 || hour > 12 || /(^|\D)0\d:?\d\d/.test(r.text);
  if (!r.start.isCertain("meridiem") && !twentyFourHour) {
    return { ok: false, message: AMBIGUOUS };
  }
  return { ok: true, at: r.start.date().getTime() };
}

export function formatReminder(at: number): string {
  const d = new Date(at);
  const date = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const time = d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: false });
  return `${date}, ${time}`;
}
