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
  expect(screen.getAllByRole("listitem").map((l) => l.textContent)).toEqual(["second", "first"]);
  expect(JSON.parse(localStorage.getItem("margin.notes")!)).toHaveLength(2);
  unmount();
  render(<App />);
  expect(screen.getAllByRole("listitem").map((l) => l.textContent)).toEqual(["second", "first"]);
});

test("corrupt storage does not crash", () => {
  localStorage.setItem("margin.notes", "{not json");
  render(<App />);
  expect(screen.queryAllByRole("listitem")).toHaveLength(0);
});

test("empty state is text-only and replaced by the list after the first note", async () => {
  const user = userEvent.setup();
  const { container } = render(<App />);
  expect(screen.getByText("No notes yet")).toBeTruthy();
  expect(screen.getByText("Type above and press Enter to add your first note.")).toBeTruthy();
  expect(container.querySelector("img, svg")).toBeNull();
  await user.type(screen.getByRole("textbox"), "hello{Enter}");
  expect(screen.queryByText("No notes yet")).toBeNull();
  expect(screen.queryByText("Type above and press Enter to add your first note.")).toBeNull();
  expect(screen.getAllByRole("listitem").map((l) => l.textContent)).toEqual(["hello"]);
});
