import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/lora'
import './styles.css'
import { App } from './App'
import { readWorkspace, saveWorkspace } from './data/storage'
import { openNote } from './data/notes'

const root = createRoot(document.getElementById('root')!)

try {
  const url = new URL(location.href)
  let initial = readWorkspace(localStorage, url.searchParams.has('reset'))
  url.searchParams.delete('reset')
  history.replaceState(null, '', url)
  const initialId = [...initial.notes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]?.id ?? null
  let initialError: string | null = null
  if (initialId && matchMedia('(min-width: 701px)').matches) {
    initial = openNote(initial, initialId, new Date().toISOString())
    try { saveWorkspace(localStorage, initial) } catch { initialError = 'This browser couldn’t save the latest view. Your notes are available to read; edits will retry saving.' }
  }
  root.render(<StrictMode><App initial={initial} initialId={initialId} initialError={initialError} /></StrictMode>)
} catch (error) {
  root.render(<main className="recovery"><h1>Your notes need a moment.</h1><p role="alert">{error instanceof Error ? error.message : 'Browser storage is unavailable.'}</p><p>Check that browser storage is enabled, then reload. To discard saved data and restore the demo notes, open this page with <code>?reset</code>.</p><button onClick={() => location.reload()}>Try again</button></main>)
}
