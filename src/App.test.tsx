// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { STORAGE_KEY } from "./notes";

const stored = () => JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");

function add(text: string) {
  const input = screen.getByLabelText("New note");
  fireEvent.change(input, { target: { value: text } });
  fireEvent.keyDown(input, { key: "Enter" });
}

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
  render(<App />);
  add("one");
  add("two");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("clear all", () => {
  it("is disabled with no notes", () => {
    cleanup();
    localStorage.clear();
    render(<App />);
    expect(
      (screen.getByRole("button", { name: "Clear all" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it("clears immediately and shows the undo toast", () => {
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(screen.getByRole("button", { name: "Undo" })).toBeTruthy();
    expect(stored()).toEqual([]);
  });

  it("undo restores notes and storage", () => {
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    act(() => void vi.advanceTimersByTime(4999));
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "Undo" })).toBeNull();
    expect(stored().map((n: { text: string }) => n.text)).toEqual(["two", "one"]);
  });

  it("expiry closes the toast and notes stay cleared", () => {
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    act(() => void vi.advanceTimersByTime(5000));
    expect(screen.queryByRole("button", { name: "Undo" })).toBeNull();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    cleanup();
    render(<App />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("restored notes survive a reload", () => {
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    cleanup();
    render(<App />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("undo after adding a note keeps new note first, no duplicates", () => {
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    add("three");
    fireEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(
      stored().map((n: { text: string }) => n.text),
    ).toEqual(["three", "two", "one"]);
  });

  it("a new clear restarts the window", () => {
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    act(() => void vi.advanceTimersByTime(4000));
    add("three");
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    act(() => void vi.advanceTimersByTime(4000));
    expect(screen.getByRole("button", { name: "Undo" })).toBeTruthy();
  });
});
