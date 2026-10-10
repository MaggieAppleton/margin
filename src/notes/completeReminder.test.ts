import { describe, expect, it } from "vitest";
import { clearReminder } from "./useNotes";
import type { Note } from "./types";

describe("completeReminder", () => {
  it("clears reminderAt on the note only", () => {
    const notes: Note[] = [
      { id: "a", title: "", body: "", reminderAt: 5, createdAt: 0 },
      { id: "b", title: "", body: "", reminderAt: 6, createdAt: 0 },
    ];
    const out = clearReminder(notes, "a");
    expect(out[0].reminderAt).toBeNull();
    expect(out[1].reminderAt).toBe(6);
  });
});
