export default function App() {
  return (
    <main>
      <h1>Margin</h1>
      <section aria-label="New note">
        <input type="text" placeholder="Write a note…" aria-label="New note" />
      </section>
      <section aria-label="Notes">
        <ul data-slot="notes-list"></ul>
      </section>
    </main>
  );
}
