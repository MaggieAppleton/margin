import { describe, expect, it } from "vitest";
import { badgeText } from "./CountBadge";

describe("badgeText", () => {
  it("reads No notes for zero", () => expect(badgeText(0)).toBe("No notes"));
  it("reads 1 note for one", () => expect(badgeText(1)).toBe("1 note"));
  it("reads N notes for many", () => expect(badgeText(3)).toBe("3 notes"));
});
