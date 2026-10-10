import { useState } from "react";
import { countWords, wordLabel } from "./wordCount";

export default function App() {
  const [text, setText] = useState("");

  return (
    <main className="notes">
      <textarea
        className="notes-input"
        aria-label="Notes"
        placeholder="Write a note…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="word-badge" aria-live="polite">
        {wordLabel(countWords(text))}
      </p>
    </main>
  );
}
