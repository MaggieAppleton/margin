// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

test("adds notes newest first and persists across reload", async () => {
  const user = userEvent.setup();
  const { unmount } = render(<App />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  await user.type(input, "   {Enter}");
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  await user.type(input, "first{Enter}");
  expect(input.value).toBe("");
  await user.type(input, "second{Enter}");
  expect(screen.getAllByRole("listitem").map((l) => l.firstChild?.textContent?.trim())).toEqual(["second", "first"]);
  expect(JSON.parse(localStorage.getItem("margin.notes")!)).toHaveLength(2);
  unmount();
  render(<App />);
  expect(screen.getAllByRole("listitem").map((l) => l.firstChild?.textContent?.trim())).toEqual(["second", "first"]);
});

test("corrupt storage does not crash", () => {
  localStorage.setItem("margin.notes", "{not json");
  render(<App />);
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

test("each note shows a time stamp", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByRole("textbox"), "stamped{Enter}");
  expect(screen.getByRole("listitem").querySelector("time")?.textContent).toBeTruthy();
});
