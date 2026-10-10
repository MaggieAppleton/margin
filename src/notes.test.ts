import { describe, expect, it } from "vitest";
import { STORAGE_KEY, createNote, loadNotes, saveNotes, sortNewestFirst } from "./notes";

const mem = (initial?: string) => {
  const data = new Map<string, string>();
  if (initial !== undefined) data.set(STORAGE_KEY, initial);
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
};

describe("notes storage", () => {
  it("round-trips and orders newest first", () => {
    const s = mem();
    const a = createNote(1000);
    const b = { ...createNote(2000), title: "B", remindAt: 5000 };
    saveNotes([a, b], s);
    const loaded = loadNotes(s);
    expect(loaded.map((n) => n.createdAt)).toEqual([2000, 1000]);
    expect(loaded[0].remindAt).toBe(5000);
  });
  it("returns empty on corrupt or wrong-shaped storage", () => {
    expect(loadNotes(mem("{not json"))).toEqual([]);
    expect(loadNotes(mem('{"a":1}'))).toEqual([]);
    expect(loadNotes(mem('[{"id":1},null]'))).toEqual([]);
  });
  it("sorts without mutating", () => {
    const list = [createNote(1), createNote(3)];
    expect(sortNewestFirst(list)[0].createdAt).toBe(3);
    expect(list[0].createdAt).toBe(1);
  });
});
