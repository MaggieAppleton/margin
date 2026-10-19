import { ArrowLeft, Check, FileText, Trash2 } from 'lucide-react'
import type { Note } from '../data/model'
import { fullDate } from '../lib/dates'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'

interface Props {
  note: Note | undefined
  error: string | null
  onEdit: (patch: { title?: string; body?: string }) => void
  onDelete: () => void
  onBack: () => void
  onNew: () => void
}

export function NoteEditor({ note, error, onEdit, onDelete, onBack, onNew }: Props) {
  if (!note) return <main className="editor empty-editor"><FileText size={30} strokeWidth={1} aria-hidden="true" /><h2>A place for a thought.</h2><p>Start a note. See where it takes you.</p><Button onClick={onNew}>New note</Button></main>
  const words = note.body.trim() ? note.body.trim().split(/\s+/).length : 0
  return <main className="editor" aria-label="Note editor">
    <header className="editor-toolbar">
      <Button className="back-button" variant="ghost" onClick={onBack}><ArrowLeft />All notes</Button>
      <span className="editor-context">Notes <span aria-hidden="true">/</span> <span>{note.title.trim() || 'Untitled note'}</span></span>
      <AlertDialog>
        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="delete-note" aria-label="Delete note" title="Delete note"><Trash2 size={17} /></Button></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Delete this note?</AlertDialogTitle><AlertDialogDescription>“{note.title.trim() || 'Untitled note'}” will be permanently deleted from this browser.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Keep note</AlertDialogCancel><AlertDialogAction onClick={onDelete}>Delete note</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
    {error && <p className="save-error" role="alert">{error}</p>}
    <div className="editor-scroll">
      <article className="note-page" key={note.id}>
        <div className="note-date"><span className="date-rule" aria-hidden="true" /><time dateTime={note.createdAt}>{fullDate(note.createdAt)}</time></div>
        <Textarea className="note-title" rows={1} aria-label="Note title" placeholder="Untitled note" value={note.title} onChange={event => onEdit({ title: event.target.value.replace(/\n/g, ' ') })} autoFocus={!note.title && !note.body} />
        {note.tags.length > 0 && <ul className="note-tags" aria-label="Tags">{note.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
        <Textarea className="note-body" aria-label="Note body" placeholder="Begin anywhere…" value={note.body} onChange={event => onEdit({ body: event.target.value })} />
      </article>
    </div>
    <footer className="editor-footer"><span className={error ? 'unsaved' : 'saved'}>{!error && <Check size={14} aria-hidden="true" />}{error ? 'Changes not saved' : 'Saved locally'}</span><span>{words} {words === 1 ? 'word' : 'words'}</span></footer>
  </main>
}
