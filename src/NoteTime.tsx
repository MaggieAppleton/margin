import { useEffect, useState } from 'react';
import { absoluteTime, relativeTime } from './relativeTime';
import './NoteTime.css';

export default function NoteTime({ createdAt }: { createdAt: number }) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className="note-time" dateTime={new Date(createdAt).toISOString()} title={absoluteTime(createdAt)}>
      {relativeTime(createdAt, now)}
    </time>
  );
}
