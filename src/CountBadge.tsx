export function badgeText(count: number): string {
  if (count === 0) return "No notes";
  return count === 1 ? "1 note" : `${count} notes`;
}

export function CountBadge({ count }: { count: number }) {
  return <span className="count-badge">{badgeText(count)}</span>;
}
