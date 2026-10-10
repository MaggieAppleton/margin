// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App, { STORAGE_KEY } from './App'

beforeEach(() => localStorage.clear())
afterEach(cleanup)

test('adds a trimmed note on Enter, clears the box, and restores after reload', async () => {
  const user = userEvent.setup()
  const { unmount } = render(<App />)
  const box = screen.getByLabelText('New note')

  await user.type(box, '   buy milk   {Enter}')
  expect(screen.getByText('buy milk')).toBeTruthy()
  expect((box as HTMLInputElement).value).toBe('')

  await user.type(box, '    {Enter}')
  expect(screen.getAllByRole('listitem')).toHaveLength(1)

  unmount()
  render(<App />)
  expect(screen.getByText('buy milk')).toBeTruthy()
  expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toEqual(['buy milk'])
})

test('tolerates bad stored data', () => {
  localStorage.setItem(STORAGE_KEY, '{not json')
  render(<App />)
  expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  cleanup()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ a: 1 }))
  render(<App />)
  expect(screen.queryAllByRole('listitem')).toHaveLength(0)
})

test('shows the newest note first', async () => {
  const user = userEvent.setup()
  render(<App />)
  const box = screen.getByLabelText('New note')
  await user.type(box, 'first{Enter}second{Enter}')
  expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['second', 'first'])
})
