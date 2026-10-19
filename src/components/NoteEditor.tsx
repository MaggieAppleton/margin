import { useState } from 'react'
import { ChevronLeft, FileText, MoreHorizontal, Trash2 } from 'lucide-react'
import type { Note } from '../data/model'
import { fullDate, relativeDate } from '../lib/dates'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog'

interface Props {
  note: Note | undefined
  error: string | null
  onEdit: (patch: { title?: string; body?: string }) => void
  onDelete: () => void
  onBack: () => void
  onNew: () => void
}

export function NoteEditor({ note, error, onEdit, onDelete, onBack, onNew }: Props) {
  const [confirming, setConfirming] = useState(false)
  if (!note) return <main className="editor empty-editor"><FileText size={20} strokeWidth={1.75} aria-hidden="true" /><p className="empty-title">No notes yet</p><Button className="primary-button" onClick={onNew}>New note</Button></main>
  const words = note.body.trim() ? note.body.trim().split(/\s+/).length : 0
  const name = note.title.trim() || 'Untitled note'
  return <main className="editor" aria-label="Note editor">
    <header className="editor-toolbar">
      <Button className="back-button" variant="ghost" onClick={onBack}><ChevronLeft />Notes</Button>
      <div className="toolbar-end">
        <span className="meta">Edited {relativeDate(note.updatedAt)}</span>
        <span className="meta">{words} {words === 1 ? 'word' : 'words'}</span>
        {error ? <span className="save-state">Not saved</span> : <span className="sr-only" role="status">Saved locally</span>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="more-button" aria-label="More actions"><MoreHorizontal /></Button></DropdownMenuTrigger>
          <DropdownMenuContent className="menu" align="end">
            <DropdownMenuItem className="menu-item" onSelect={() => setConfirming(true)}><Trash2 />Delete note…</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <AlertDialog open={confirming} onOpenChange={setConfirming}>
      <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Delete this note?</AlertDialogTitle><AlertDialogDescription>“{name}” will be permanently deleted from this browser.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel><AlertDialogAction className="danger-button" onClick={onDelete}>Delete</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    {error && <p className="save-error" role="alert">{error}</p>}
    <div className="editor-scroll">
      <article className="note-page" key={note.id}>
        <time className="note-date" dateTime={note.createdAt}>{fullDate(note.createdAt)}</time>
        <Textarea className="note-title" rows={1} aria-label="Note title" placeholder="Untitled note" value={note.title} onChange={event => onEdit({ title: event.target.value.replace(/\n/g, ' ') })} autoFocus={!note.title && !note.body} />
        <Textarea className="note-body" aria-label="Note body" placeholder="Begin anywhere…" value={note.body} onChange={event => onEdit({ body: event.target.value })} />
      </article>
    </div>
  </main>
}
