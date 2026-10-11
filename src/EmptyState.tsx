import './empty-state.css';

export default function EmptyState() {
  return (
    <section className="empty-state" data-testid="empty-state">
      <h2>No notes yet</h2>
      <p>Type a note above and press Enter.</p>
    </section>
  );
}
