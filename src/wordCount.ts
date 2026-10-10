export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

export function wordLabel(count: number): string {
  return count === 1 ? "1 word" : `${count} words`;
}
