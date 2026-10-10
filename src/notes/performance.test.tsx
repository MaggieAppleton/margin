// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { rowProbe } from "./NoteRow";
import { STORAGE_KEY } from "./storage";

const N = 300;
const seed = () =>
  Array.from({ length: N }, (_, i) => ({
    id: `id-${i}`,
    title: `Note ${i}`,
    body: `body ${i}`,
    reminderAt: null,
    createdAt: 1_000_000 + ((i * 7) % N),
  }));

beforeEach(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(seed())));
afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
  localStorage.clear();
});

test("typing in one of 300 notes rerenders only that row, keeps order, persists", async () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
  const { container } = render(<App />);
  const created = Array.from(container.querySelectorAll("li strong")).map((e) => e.textContent);
  const expected = seed().sort((a, b) => b.createdAt - a.createdAt).map((n) => n.title);
  expect(created).toEqual(expected);

  fireEvent.click(screen.getByText("Note 5").closest("button")!);
  const input = screen.getByLabelText("Title") as HTMLInputElement;

  const times: number[] = [];
  for (let i = 0; i < 20; i++) {
    const t = performance.now();
    await act(async () => {
      fireEvent.change(input, { target: { value: input.value + "x" } });
    });
    times.push(performance.now() - t);
  }
  console.log(
    `typing update (300 notes, incl. act): median ${[...times].sort((a, b) => a - b)[10].toFixed(1)}ms max ${Math.max(...times).toFixed(1)}ms`,
  );

  expect(input.value).toBe("Note 5" + "x".repeat(20));
  // Debounced: nothing written yet for the last keystrokes, then one write.
  const before = vi.spyOn(Storage.prototype, "setItem");
  fireEvent.change(input, { target: { value: "final" } });
  fireEvent.change(input, { target: { value: "final2" } });
  expect(before).not.toHaveBeenCalled();
  vi.advanceTimersByTime(400);
  expect(before).toHaveBeenCalledTimes(1);

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
  expect(saved).toHaveLength(N);
  expect(saved.find((n: { id: string }) => n.id === "id-5").title).toBe("final2");

  // unmount + remount simulates reload
  cleanup();
  const again = render(<App />);
  const titles = Array.from(again.container.querySelectorAll("li strong")).map((e) => e.textContent);
  expect(titles).toEqual(expected.map((t) => (t === "Note 5" ? "final2" : t)));
  vi.useRealTimers();
});

test("flush on pagehide writes pending edit; only edited row renders", () => {
  const renders = new Map<string, number>();
  rowProbe.onRender = (id) => renders.set(id, (renders.get(id) ?? 0) + 1);
  render(<App />);
  fireEvent.click(screen.getByText("Note 9").closest("button")!);
  const input = screen.getByLabelText("Title") as HTMLInputElement;
  expect(renders.size).toBe(N);
  renders.clear();
  const spy = vi.spyOn(Storage.prototype, "setItem");
  const t = performance.now();
  fireEvent.change(input, { target: { value: "edited" } });
  console.log(`single keystroke render+commit (300 notes): ${(performance.now() - t).toFixed(1)}ms`);
  expect([...renders.entries()]).toEqual([["id-9", 1]]);
  expect(spy).not.toHaveBeenCalled();
  window.dispatchEvent(new Event("pagehide"));
  expect(spy).toHaveBeenCalledTimes(1);
  rowProbe.onRender = undefined;
});
