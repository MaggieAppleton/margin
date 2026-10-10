import { describe, expect, it } from "vitest";
import { addToasts, visibleToasts } from "./toasts";

const f = (noteId: string) => ({ noteId, firedAt: 0 });

describe("toasts", () => {
  it("shows at most 2 toasts; extras are tray-only", () => {
    expect(addToasts([], [f("a"), f("b"), f("c")])).toEqual(["a", "b"]);
    expect(addToasts(["a", "b"], [f("c")])).toEqual(["a", "b"]);
  });
  it("does not duplicate and fills freed slots", () => {
    expect(addToasts(["a"], [f("a"), f("b")])).toEqual(["a", "b"]);
  });
  it("hides toasts no longer due", () => {
    expect(visibleToasts(["a", "b"], [f("b")])).toEqual(["b"]);
  });
});
