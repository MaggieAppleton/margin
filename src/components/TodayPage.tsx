import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { Note } from '../data/model'
import { relativeDate } from '../lib/dates'
import { Button } from './ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'

interface Props {
  notes: Note[]
  onOpen: (id: string) => void
  onArchive: (id: string) => void
  onKeep: (id: string) => void
  onDelete: (id: string) => void
  onBack: () => void
}

export function TodayPage({ notes, onOpen, onArchive, onKeep, onDelete, onBack }: Props) {
  const [deleting, setDeleting] = useState<Note | null>(null)
  return <main className="editor today" aria-label="Today">
    <header className="editor-toolbar">
      <Button className="back-button" variant="ghost" onClick={onBack}><ChevronLeft />Notes</Button>
    </header>
    <div className="editor-scroll">
      <div className="today-page">
        <header className="today-header">
          <h2>Today</h2>
          <p className="meta">{notes.length ? `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} to revisit` : 'Nothing to revisit today'}</p>
        </header>
        {notes.length > 0
          ? <ul className="today-list">
            {notes.map(note => <li key={note.id} className="today-card">
              <span className="meta">Edited {relativeDate(note.updatedAt)}</span>
              <h3 className="today-card-title">{note.title.trim() || 'Untitled'}</h3>
              {note.body.trim() && <p className="today-card-body">{note.body.trim()}</p>}
              <div className="today-actions">
                <Button className="today-action" variant="ghost" onClick={() => onOpen(note.id)}>Open</Button>
                <Button className="today-action" variant="ghost" onClick={() => onKeep(note.id)}>Keep</Button>
                <Button className="today-action" variant="ghost" onClick={() => onArchive(note.id)}>Archive</Button>
                <Button className="today-action today-action-danger" variant="ghost" onClick={() => setDeleting(note)}>Delete…</Button>
              </div>
            </li>)}
          </ul>
          : <p className="today-empty">Notes you haven’t seen in a while will show up here. Check back tomorrow.</p>}
      </div>
    </div>
    <AlertDialog open={!!deleting} onOpenChange={open => { if (!open) setDeleting(null) }}>
      <AlertDialogContent onOpenAutoFocus={event => { event.preventDefault(); (event.currentTarget as HTMLElement).focus() }}>
        <AlertDialogHeader><AlertDialogTitle>Delete this note?</AlertDialogTitle><AlertDialogDescription>“{deleting?.title.trim() || 'Untitled note'}” will be permanently deleted from this browser.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel><AlertDialogAction className="danger-button" onClick={() => deleting && onDelete(deleting.id)}>Delete</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </main>
}
