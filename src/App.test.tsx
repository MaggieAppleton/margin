// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

const input = () => screen.getByLabelText("New note");
const items = () => screen.queryAllByRole("listitem").map((l) => l.textContent);

test("empty state, add, newest first, clear, reject blank, persist", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);
  expect(screen.getByText("No notes yet.")).toBeTruthy();

  await user.type(input(), "first{Enter}");
  await user.type(input(), "second{Enter}");
  expect(items()).toEqual(["second", "first"]);
  expect((input() as HTMLInputElement).value).toBe("");

  await user.type(input(), "   {Enter}");
  await user.type(input(), "{Enter}");
  expect(items()).toEqual(["second", "first"]);

  unmount();
  render(<App />);
  expect(items()).toEqual(["second", "first"]);
});

test("corrupt storage is ignored", () => {
  localStorage.setItem("margin.notes", "{bad");
  render(<App />);
  expect(screen.getByText("No notes yet.")).toBeTruthy();
});
