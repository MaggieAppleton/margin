// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";
import { STORAGE_KEY } from "../notes/storage";
import type { Note } from "../notes/types";
import { clearDueEvents } from "../scheduler/store";
import { resetNotifications } from "./store";

const T0 = new Date("2026-01-01T12:00:00Z").getTime();

// The scheduler remembers fired (note, reminderAt) pairs across tests, so vary reminderAt.
let run = 0;
function seed(n: number, extra: Partial<Note> = {}) {
  run++;
  const notes: Note[] = Array.from({ length: n }, (_, i) => ({
    id: `n${i}`,
    title: `Note ${i}`,
    body: `First line ${i}\nSecond line`,
    reminderAt: T0 - 1000 - run,
    createdAt: T0 - i,
    ...extra,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}
const stored = (): Note[] => JSON.parse(localStorage.getItem(STORAGE_KEY)!);
const toasts = () => within(screen.getByTestId("toast-stack")).queryAllByTestId("notification");
const openTray = () => fireEvent.click(screen.getByRole("button", { name: /^Notifications/ }));
const tray = () => within(screen.getByRole("region", { name: "Notifications" }));
const advance = (ms: number) => act(() => void vi.advanceTimersByTime(ms));

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(T0);
  localStorage.clear();
  clearDueEvents();
  resetNotifications();
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("in-app notifications", () => {
  it("shows a due reminder as a toast and in the tray from one notification", () => {
    seed(1);
    render(<App />);
    expect(toasts()).toHaveLength(1);
    expect(within(toasts()[0]).getByText("Note 0")).toBeTruthy();
    expect(within(toasts()[0]).getByText("First line 0")).toBeTruthy();
    expect(within(toasts()[0]).queryByText("Second line")).toBeNull();
    openTray();
    expect(tray().getAllByTestId("notification")).toHaveLength(1);
    expect(tray().getByText("Note 0")).toBeTruthy();
    for (const name of ["Snooze 15 min", "Done", "Open"])
      expect(within(toasts()[0]).getByRole("button", { name })).toBeTruthy();
  });

  it("demotes the toast after 4s but keeps it in the tray with badge", () => {
    seed(1);
    render(<App />);
    advance(3900);
    expect(toasts()).toHaveLength(1);
    advance(200);
    expect(toasts()).toHaveLength(0);
    expect(screen.getByTestId("badge").textContent).toBe("1");
    openTray();
    expect(tray().getAllByTestId("notification")).toHaveLength(1);
  });

  it("pauses demotion on hover and focus", () => {
    seed(1);
    render(<App />);
    fireEvent.mouseEnter(toasts()[0].closest(".toast")!);
    advance(10000);
    expect(toasts()).toHaveLength(1);
    fireEvent.mouseLeave(toasts()[0].closest(".toast")!);
    advance(4100);
    expect(toasts()).toHaveLength(0);
  });

  it("pauses on focus", () => {
    seed(1);
    render(<App />);
    fireEvent.focus(within(toasts()[0]).getByRole("button", { name: "Done" }));
    advance(10000);
    expect(toasts()).toHaveLength(1);
  });

  it("shows at most 3 toasts while badge counts all", () => {
    seed(5);
    render(<App />);
    expect(toasts()).toHaveLength(3);
    expect(screen.getByTestId("badge").textContent).toBe("5");
  });

  it("snooze moves reminderAt +15 min, removes the notification and re-arms", () => {
    seed(1);
    render(<App />);
    fireEvent.click(within(toasts()[0]).getByRole("button", { name: "Snooze 15 min" }));
    expect(stored()[0].reminderAt).toBe(T0 + 15 * 60 * 1000);
    expect(toasts()).toHaveLength(0);
    expect(screen.queryByTestId("badge")).toBeNull();
    advance(15 * 60 * 1000 + 1000);
    expect(toasts()).toHaveLength(1);
  });

  it("done clears the reminder and removes the notification", () => {
    seed(1);
    render(<App />);
    openTray();
    fireEvent.click(tray().getByRole("button", { name: "Done" }));
    expect(stored()[0].reminderAt).toBeNull();
    expect(toasts()).toHaveLength(0);
    expect(screen.queryByTestId("badge")).toBeNull();
  });

  it("open highlights the note", () => {
    seed(2);
    const scroll = vi.fn();
    Element.prototype.scrollIntoView = scroll;
    render(<App />);
    fireEvent.click(within(toasts()[0]).getByRole("button", { name: "Open" }));
    const li = document.getElementById("note-n0")!;
    expect(li.className).toContain("highlight");
    expect(scroll).toHaveBeenCalled();
  });

  it("announces due reminders in a polite live region", () => {
    seed(1);
    render(<App />);
    const live = document.querySelector('[aria-live="polite"]')!;
    expect(live.textContent).toContain("Reminder due: Note 0");
  });
});
