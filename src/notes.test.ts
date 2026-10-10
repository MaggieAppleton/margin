import { describe, expect, it } from "vitest";
import { footerText } from "./notes";

describe("footerText", () => {
  it("handles zero notes", () => expect(footerText(0)).toBe("0 notes"));
  it("handles one note", () => expect(footerText(1)).toBe("1 note"));
  it("handles many notes", () => expect(footerText(3)).toBe("3 notes"));
});
