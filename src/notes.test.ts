import { describe, expect, it } from "vitest";
import { STORAGE_KEY, addNote, loadNotes, removeNote, saveNotes } from "./notes";

function memStore(initial?: string) {
  const m = new Map<string, string>();
  if (initial !== undefined) m.set(STORAGE_KEY, initial);
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe("notes", () => {
  it("adds trimmed notes newest first and ignores blanks", () => {
    let n = addNote([], "  first ");
    n = addNote(n, "second");
    n = addNote(n, "   ");
    expect(n.map((x) => x.text)).toEqual(["second", "first"]);
  });

  it("removes by id", () => {
    const n = addNote(addNote([], "a"), "b");
    expect(removeNote(n, n[0].id).map((x) => x.text)).toEqual(["a"]);
  });

  it("round-trips through storage", () => {
    const s = memStore();
    const n = addNote([], "keep");
    saveNotes(n, s);
    expect(loadNotes(s)).toEqual(n);
  });

  it("handles missing, corrupt and malformed storage", () => {
    expect(loadNotes(memStore())).toEqual([]);
    expect(loadNotes(memStore("{nope"))).toEqual([]);
    expect(loadNotes(memStore('{"a":1}'))).toEqual([]);
    expect(loadNotes(memStore('[{"id":"1","text":"ok"},5,{"id":2}]'))).toEqual([
      { id: "1", text: "ok" },
    ]);
  });
});
