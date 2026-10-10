import * as chrono from "chrono-node";

export type ReminderParse =
  | { kind: "empty" }
  | { kind: "invalid" }
  | { kind: "ok"; at: number; needsConfirm: boolean };

export type PresetId = "in-1-hour" | "this-evening" | "tomorrow-morning";

export const PRESETS: { id: PresetId; label: string }[] = [
  { id: "in-1-hour", label: "In 1 hour" },
  { id: "this-evening", label: "This evening" },
  { id: "tomorrow-morning", label: "Tomorrow morning" },
];

const atHour = (base: Date, dayOffset: number, hour: number): Date => {
  const d = new Date(base);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, 0, 0, 0);
  return d;
};

// Margin-defined times. This evening is 18:00 today, or 18:00 tomorrow once
// 18:00 has passed. Tomorrow morning is 09:00 tomorrow.
export function presetTime(id: PresetId, now: number): number {
  const base = new Date(now);
  switch (id) {
    case "in-1-hour":
      return now + 60 * 60 * 1000;
    case "this-evening": {
      const today = atHour(base, 0, 18);
      return (today.getTime() > now ? today : atHour(base, 1, 18)).getTime();
    }
    case "tomorrow-morning":
      return atHour(base, 1, 9).getTime();
  }
}

// chrono's own defaults for these words (06:00, 20:00, 22:00) differ from
// Margin's presets, so they are intercepted unless a digit gives a real time.
const VAGUE: [RegExp, PresetId][] = [
  [/\btomorrow\s+morning\b/i, "tomorrow-morning"],
  [/\b(tonight|this\s+evening)\b/i, "this-evening"],
];

export function parseReminder(text: string, now: number): ReminderParse {
  const input = text.trim();
  if (!input) return { kind: "empty" };

  if (!/\d/.test(input)) {
    for (const [re, id] of VAGUE) {
      if (re.test(input)) return { kind: "ok", at: presetTime(id, now), needsConfirm: false };
    }
  }

  const results = chrono.parse(input, new Date(now), { forwardDate: true });
  const first = results[0];
  if (!first) return { kind: "invalid" };

  const start = first.start;
  const hourGiven = start.isCertain("hour");
  const date = start.date();
  // A bare small hour ("friday at 3") is far more likely afternoon than 03:00.
  if (hourGiven && !start.isCertain("meridiem") && date.getHours() >= 1 && date.getHours() <= 6) {
    date.setHours(date.getHours() + 12);
  }

  const at = date.getTime();
  if (at <= now) return { kind: "invalid" };
  return { kind: "ok", at, needsConfirm: !hourGiven };
}

export function formatResolved(at: number): string {
  const d = new Date(at);
  const day = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${day}, ${time}`;
}
