import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './styles.css'
import { App } from './App'
import { readWorkspace } from './data/storage'

const root = createRoot(document.getElementById('root')!)

try {
  const url = new URL(location.href)
  const initial = readWorkspace(localStorage, url.searchParams.has('reset'))
  url.searchParams.delete('reset')
  history.replaceState(null, '', url)
  root.render(<StrictMode><App initial={initial} /></StrictMode>)
} catch (error) {
  root.render(<main className="recovery"><h1>Your notes need a moment.</h1><p role="alert">{error instanceof Error ? error.message : 'Browser storage is unavailable.'}</p><p>Check that browser storage is enabled, then reload. To discard saved data and restore the demo notes, open this page with <code>?reset</code>.</p><button onClick={() => location.reload()}>Try again</button></main>)
}
