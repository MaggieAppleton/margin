export function relativeTime(createdAt: number, now: number = Date.now()): string {
  const sec = Math.max(0, Math.floor((now - createdAt) / 1000));
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const days = Math.floor(hr / 24);
  if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (days < 30) return weeks === 1 ? '1 wk ago' : `${weeks} wk ago`;
  const months = Math.floor(days / 30);
  if (days < 365) return `${months} mo ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? '1 yr ago' : `${years} yr ago`;
}

export function absoluteTime(createdAt: number): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'medium' }).format(createdAt);
}
