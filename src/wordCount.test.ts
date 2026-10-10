import { describe, expect, it } from "vitest";
import { countWords, wordLabel } from "./wordCount";

describe("countWords", () => {
  it("counts whitespace-separated tokens", () => {
    expect(countWords("one two three")).toBe(3);
  });
  it("returns 0 for empty or whitespace-only text", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("  \n\t ")).toBe(0);
  });
  it("handles repeated whitespace and newlines", () => {
    expect(countWords("  one   two\nthree\t")).toBe(3);
  });
  it("drops when words are removed", () => {
    expect(countWords("one two three")).toBe(3);
    expect(countWords("one two")).toBe(2);
    expect(countWords("one")).toBe(1);
    expect(countWords("")).toBe(0);
  });
});

describe("wordLabel", () => {
  it("pluralises", () => {
    expect(wordLabel(0)).toBe("0 words");
    expect(wordLabel(1)).toBe("1 word");
    expect(wordLabel(3)).toBe("3 words");
  });
});
