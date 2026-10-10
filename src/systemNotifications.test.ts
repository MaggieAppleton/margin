import { describe, expect, it, vi } from "vitest";
import { buttonLabel, notifySystem, OPEN_NOTE_EVENT, permissionState, requestPermission } from "./systemNotifications";

const notes = [{ id: "a", title: "Call Sam", body: "about rent", createdAt: 1 }];

function stub(permission: string) {
  const made: any[] = [];
  const N: any = vi.fn(function (this: any, title: string, opts: any) {
    this.title = title; this.opts = opts; this.close = vi.fn(); made.push(this);
  });
  N.permission = permission;
  N.requestPermission = vi.fn(async () => "granted");
  return { N, made };
}

describe("system notifications", () => {
  it("labels states", () => {
    expect(permissionState({})).toBe("unsupported");
    expect(buttonLabel("unsupported")).toMatch(/not supported/);
    expect(buttonLabel("denied")).toMatch(/blocked/);
    expect(buttonLabel("default")).toBe("Enable system notifications");
  });

  it("requests permission only when called", async () => {
    const { N } = stub("default");
    expect(N.requestPermission).not.toHaveBeenCalled();
    expect(await requestPermission({ Notification: N })).toBe("granted");
    expect(N.requestPermission).toHaveBeenCalledOnce();
  });

  it("notifies only when granted and hidden", () => {
    const fired = [{ noteId: "a", firedAt: 1 }];
    for (const [perm, hidden] of [["default", true], ["denied", true], ["granted", false]] as const) {
      const { N, made } = stub(perm);
      notifySystem(fired, notes, { Notification: N, document: { hidden } });
      expect(made).toHaveLength(0);
    }
    const { N, made } = stub("granted");
    notifySystem(fired, notes, { Notification: N, document: { hidden: true } });
    expect(made).toHaveLength(1);
    expect(made[0].title).toBe("Call Sam");
    expect(made[0].opts).toEqual({ body: "about rent" });
  });

  it("click focuses window and dispatches open-note", () => {
    const { N, made } = stub("granted");
    const win = { focus: vi.fn(), dispatchEvent: vi.fn() } as any;
    notifySystem([{ noteId: "a", firedAt: 1 }], notes, { Notification: N, document: { hidden: true }, window: win });
    made[0].onclick();
    expect(win.focus).toHaveBeenCalled();
    const ev = win.dispatchEvent.mock.calls[0][0];
    expect(ev.type).toBe(OPEN_NOTE_EVENT);
    expect(ev.detail).toEqual({ noteId: "a" });
  });
});
