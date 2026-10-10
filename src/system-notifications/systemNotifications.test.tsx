// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { STORAGE_KEY } from "../notes/storage";
import type { Note } from "../notes/types";
import { resetNotifications } from "../notifications/store";
import { clearDueEvents } from "../scheduler/store";

const T0 = new Date("2026-01-01T12:00:00Z").getTime();
let run = 0;
function seed() {
  run++;
  const notes: Note[] = [
    { id: "n0", title: "Call Sam", body: "\nBring notes\nSecond", reminderAt: T0 - 1000 - run, createdAt: T0 },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

const made: { title: string; options: Record<string, unknown>; onclick?: () => void; close: ReturnType<typeof vi.fn> }[] = [];
let permission: string;
const requestPermission = vi.fn();
let hidden = true;

function mockNotification() {
  class Mock {
    static get permission() {
      return permission;
    }
    static requestPermission = requestPermission;
    onclick?: () => void;
    close = vi.fn();
    constructor(public title: string, public options: Record<string, unknown>) {
      made.push(this as never);
    }
  }
  vi.stubGlobal("Notification", Mock);
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(T0);
  localStorage.clear();
  clearDueEvents();
  resetNotifications();
  made.length = 0;
  permission = "default";
  hidden = true;
  requestPermission.mockReset().mockImplementation(async () => {
    permission = "granted";
    return "granted";
  });
  mockNotification();
  Object.defineProperty(document, "hidden", { configurable: true, get: () => hidden });
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const enableBtn = () => screen.queryByRole("button", { name: "Enable system notifications" });

describe("system notifications", () => {
  it("shows the button only when permission is default and hides after it changes", async () => {
    render(<App />);
    expect(enableBtn()).toBeTruthy();
    await act(async () => void fireEvent.click(enableBtn()!));
    expect(requestPermission).toHaveBeenCalledTimes(1);
    expect(enableBtn()).toBeNull();
    cleanup();
    for (const p of ["granted", "denied"]) {
      permission = p;
      render(<App />);
      expect(enableBtn()).toBeNull();
      cleanup();
    }
  });

  it("renders nothing and does not throw when the Notification API is missing", () => {
    vi.stubGlobal("Notification", undefined);
    seed();
    render(<App />);
    expect(enableBtn()).toBeNull();
    expect(screen.getAllByTestId("notification").length).toBeGreaterThan(0);
  });

  it.each(["default", "denied"])("never constructs a notification when permission is %s", (p) => {
    permission = p;
    seed();
    render(<App />);
    expect(screen.getAllByTestId("notification").length).toBeGreaterThan(0);
    expect(made).toHaveLength(0);
  });

  it("does not construct one while the page is visible, but still shows in-app", () => {
    permission = "granted";
    hidden = false;
    seed();
    render(<App />);
    expect(made).toHaveLength(0);
    expect(screen.getAllByTestId("notification").length).toBeGreaterThan(0);
  });

  it("constructs exactly one with title, first body line and tag when granted and hidden", () => {
    permission = "granted";
    seed();
    render(<App />);
    act(() => void vi.advanceTimersByTime(5000));
    expect(made).toHaveLength(1);
    expect(made[0].title).toBe("Call Sam");
    expect(made[0].options.body).toBe("Bring notes");
    expect(made[0].options.tag).toBe(`n0@${T0 - 1000 - run}`);
    expect("actions" in made[0].options).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /^Notifications/ }));
    expect(screen.getAllByTestId("notification")).toHaveLength(1);
  });

  it("click focuses the window, closes the notification and opens the note", () => {
    permission = "granted";
    seed();
    const focus = vi.spyOn(window, "focus").mockImplementation(() => {});
    render(<App />);
    act(() => made[0].onclick!());
    expect(focus).toHaveBeenCalled();
    expect(made[0].close).toHaveBeenCalled();
    expect(screen.getByLabelText("Title")).toBeTruthy();
    expect(document.getElementById("note-n0")!.className).toContain("highlight");
  });
});
