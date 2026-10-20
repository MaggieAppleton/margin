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

export function HomePage({ notes, onOpen, onArchive, onKeep, onDelete, onBack }: Props) {
  const [deleting, setDeleting] = useState<Note | null>(null)
  return <main className="editor home" aria-label="Home">
    <header className="editor-toolbar">
      <Button className="back-button" variant="ghost" onClick={onBack}><ChevronLeft />Notes</Button>
    </header>
    <div className="editor-scroll">
      <div className="home-page">
        <header className="home-header">
          <h2>Home</h2>
          <p className="meta">{notes.length ? `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} to revisit` : 'Nothing to revisit right now'}</p>
        </header>
        {notes.length > 0
          ? <ul className="home-list">
            {notes.map(note => <li key={note.id} className="home-card">
              <span className="meta">Edited {relativeDate(note.updatedAt)}</span>
              <h3 className="home-card-title">{note.title.trim() || 'Untitled'}</h3>
              {note.body.trim() && <p className="home-card-body">{note.body.trim()}</p>}
              <div className="home-actions">
                <Button className="home-action" variant="ghost" onClick={() => onOpen(note.id)}>Open</Button>
                <Button className="home-action" variant="ghost" onClick={() => onKeep(note.id)}>Keep</Button>
                <Button className="home-action" variant="ghost" onClick={() => onArchive(note.id)}>Archive</Button>
                <Button className="home-action home-action-danger" variant="ghost" onClick={() => setDeleting(note)}>Delete…</Button>
              </div>
            </li>)}
          </ul>
          : <p className="home-empty">Notes you haven’t seen in a while will show up here.</p>}
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
