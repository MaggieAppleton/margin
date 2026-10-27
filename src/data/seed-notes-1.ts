// Individually written fictional sample notes.
export const seedNotes1: { title: string; body: string; tags: string[] }[] = [
  {
    title: 'Command menu: the lost panel',
    body: 'Test phrase: “I closed the bit with the file details.” The command is called Restore inspector, which is precise if you already know the interface. Search should also understand the person’s description.\n\nTry “bring back the right side”, “show details” and “reset layout”. Keep the result labels literal so the search can be forgiving without making the action mysterious.',
    tags: ['developer tools', 'search'],
  },
  {
    title: 'Offline means more than a badge',
    body: 'The notebook prototype opens on a train with the network disabled. Reading and editing still work; sharing waits. Put the last-sync time where it can be found, and show the pending change beside the note it belongs to.\n\nDo not promise “all caught up” until the server has confirmed it. A green dot is not a substitute for knowing which copy is current.',
    tags: ['local-first', 'reliability'],
  },
  {
    title: 'First five minutes: one useful thing',
    body: 'The sample workspace should let someone make a note before it explains every feature. A short prompt, a visible example and an obvious way to change it are enough for the first minute.\n\nMove account settings, keyboard shortcuts and the tour out of the first-run path. Bring them back when the person asks, or when the next step would benefit from them.',
    tags: ['onboarding', 'design'],
  },
  {
    title: 'Editing in place keeps the evidence nearby',
    body: 'In the current sketch, opening an edit form replaces the note and hides the paragraph being changed. That makes the editor feel tidy but removes the evidence needed to make the edit.\n\nTry an inline field with the surrounding two lines still visible. On narrow screens, perhaps expand below the selected text instead of sending the whole note to another page.',
    tags: ['interaction', 'editing'],
  },
  {
    title: 'Error copy for a damaged import',
    body: 'Draft: “We could not read notes-archive.csv. Row 18 has an extra separator. The other 42 rows are ready to review.”\n\nThis is better than “Import failed” because it tells the person what survived. Check that the count comes from the actual parser result, and give them a copyable detail if the row itself is hard to identify.',
    tags: ['writing', 'errors'],
  },
  {
    title: 'Shared canvas: watch the grouping first',
    body: 'Before adding a grouping tool to the prototype board, give the tester six loose cards and watch how they arrange them. Do they make a line, a cluster, a pair with one outsider, or a rough sequence?\n\nAsk what the gaps mean. Do not assume every space is a category. Photograph the arrangement, then test whether the board can preserve the relationship without asking for a label.',
    tags: ['collaboration', 'research'],
  },
  {
    title: 'Reading on screen needs a place to return',
    body: 'The reader prototype remembers the last paragraph and the margin width, but not an open menu. That seems a reasonable first boundary.\n\nTest a long article with a note halfway through. Close the tab, come back tomorrow and see whether the page returns to the passage or merely to the top. Add a small location label; scrolling alone is a poor receipt.',
    tags: ['reading', 'continuity'],
  },
  {
    title: 'Version history should show the decision',
    body: 'A list of timestamps can prove that something changed. It rarely explains why. For the sample document, put the short change summary beside the version and let the reader compare the exact passage.\n\nDo not guess at intent from the edit itself. If nobody wrote a reason, say “No note added” rather than composing a story after the fact.',
    tags: ['developer tools', 'history'],
  },
  {
    title: 'Keyboard route through the review flow',
    body: 'Walk the whole review without touching the trackpad: open the note, move to its comment, reply, close the thread, and return to the list. Record every time focus vanishes.\n\nThe test is not “can a keyboard user reach the buttons?” It is “can they keep a sense of place while doing the task?” Add visible focus before changing the shortcut map.',
    tags: ['accessibility', 'interaction'],
  },
  {
    title: 'Remove one option from the chooser',
    body: 'The new-note chooser has six equally prominent starting points. Remove “meeting notes” for one round and see if the remaining choices become easier to understand.\n\nThis is a test of the categories, not a vote on whether people like meetings. If testers keep reaching for the removed option, that tells us the task belongs somewhere; it does not prove this menu needs another tile.',
    tags: ['design', 'experiments'],
  },
  {
    title: 'Quiet interface, crowded work',
    body: 'The work should have more visual weight than the tools around it. That is easy to say with three notes on the screen.\n\nBuild the crowded state with a long title, three comments, a pinned reference and one overdue question. Check whether the quiet layout still lets someone notice the one thing that changed since yesterday.',
    tags: ['attention', 'layout'],
  },
  {
    title: 'Sorting cards without pretending it is final',
    body: 'A drag gesture can look like a permanent decision even when the person is only exploring. Show a temporary shadow while the card moves; save the arrangement only when it is released.\n\nQuestion: should undo restore the old order or the old grouping? The paper test needs both versions because the gesture currently does not say which one is happening.',
    tags: ['interaction', 'prototyping'],
  },
  {
    title: 'Notes from the paper importer test',
    body: 'Three participants used the printed import screen. Two wanted to inspect the list before choosing a folder; one wanted a folder first because it changed which files were visible.\n\nNext pass: add a clear “review all files” route and keep the folder choice optional. Do not average these preferences into one default until we know what is being filtered out.',
    tags: ['research', 'import'],
  },
  {
    title: 'A reminder should carry its reason',
    body: 'The prototype reminder says “Come back to this”. Come back to what? Add the question or passage that made the reminder useful: “Check whether the second example still fits”.\n\nThe person should be able to edit that reason when the task changes. A notification without context is a small demand for memory, not a reminder.',
    tags: ['writing', 'reminders'],
  },
  {
    title: 'What belongs in the activity stream?',
    body: 'The stream currently mixes “Sam renamed the note”, “export complete” and “new comment”. Those events have different audiences and different shelf lives.\n\nTry a filter that groups work people need to respond to separately from system receipts. Keep the raw timeline available for debugging; it may not belong on the first screen.',
    tags: ['collaboration', 'systems'],
  },
  {
    title: 'A colour token needs a use case',
    body: 'The palette review is full of lovely swatches and no examples of what they mean. Put the colours into a selected row, a warning, a disabled action and a quiet annotation.\n\nCheck them in greyscale and at reduced brightness. If two statuses become indistinguishable, the colour was carrying too much of the meaning by itself.',
    tags: ['design', 'colour'],
  },
  {
    title: 'Reading note: the index is also a map',
    body: 'A good index does more than locate a word; it hints at the company that word keeps. The sample help page could use this idea: list tasks beside the terms people might remember.\n\nTry “bring back a closed panel” near “layout”, “inspector” and “reset”. That is a better kind of redundancy than writing the same paragraph three times.',
    tags: ['reading', 'information design'],
  },
  {
    title: 'Sketch: a shelf for active questions',
    body: 'One narrow shelf above the notes, with no more than four open questions. Each question points to the scraps that made it worth asking.\n\nWhen it is answered, move it into the relevant note rather than leaving a triumphant tick in the shelf. The shelf is for unfinished work, not a scoreboard.',
    tags: ['sketch', 'research'],
  },
  {
    title: 'A tooltip is not a hiding place for the manual',
    body: 'The current tooltip has a heading, two sentences and a keyboard shortcut. That is a help panel wearing a tiny coat.\n\nKeep the tooltip to the missing clue: what this icon does. Put the longer explanation in the destination where a person can read it without holding a pointer still.',
    tags: ['writing', 'interface'],
  },
  {
    title: 'The one-handed phone check',
    body: 'Open the sample list on a narrow phone viewport and try to pin a reference with one thumb. The action is technically visible; the target sits directly under the browser controls.\n\nMove it into the bottom action area and repeat with the phone held in the other hand. Measure reach before polishing the icon.',
    tags: ['mobile', 'accessibility'],
  },
  {
    title: 'No network: save twice, then reconnect',
    body: 'Test script: turn off the network, edit two different notes, close one, reopen the list, then reconnect. Both edits should remain visible and the sync message should identify what is still pending.\n\nTry an edit from another tab before reconnecting. We need a conflict state that explains the choice, not a quiet last-write-wins surprise.',
    tags: ['local-first', 'testing'],
  },
  {
    title: 'The helpful empty search',
    body: 'An empty search result can offer nearby words and recent places, but it should not pretend to know what the person meant.\n\nFor “palette” with no match, suggest “colour notes” and “design review”, clearly labelled as suggestions. Keep the original query in the field so the person can adjust it without starting over.',
    tags: ['search', 'writing'],
  },
  {
    title: 'Small archive, big consequence',
    body: 'Archiving is visually quiet in the mock-up, but people use it to mean several things: hide for now, keep for the record, or remove from active work.\n\nUse one test item with a closed question and a comment thread. Find out which pieces remain searchable and how the person brings it back. The label alone is not enough.',
    tags: ['information architecture', 'research'],
  },
  {
    title: 'Drafting a useful hand-off note',
    body: 'Hand-off template for the studio exercise:\n• What changed since the last review?\n• Which question is still open?\n• What can the next person safely change?\n• Where is the evidence?\n\nKeep the template as prompts, not mandatory fields. If someone has nothing to say for a line, the empty answer should not block the hand-off.',
    tags: ['collaboration', 'writing'],
  },
  {
    title: 'A long title is a layout test, not an edge case',
    body: 'Most useful names are longer than the labels in our mock-ups. Try “Notes from the second accessibility review after the importer changes” in the list, the tab and the breadcrumb.\n\nEach place should preserve enough of the name to recognise it. Truncation is fine when the full title remains one action away.',
    tags: ['layout', 'content'],
  },
  {
    title: 'A useful interruption has an exit',
    body: 'The prototype asks whether to keep unsaved changes and offers Save or Discard. It forgot “Go back”.\n\nThat third option matters when the question appears because someone clicked the wrong control. Test all three outcomes with keyboard and pointer. The person should not have to finish a decision they did not mean to start.',
    tags: ['interaction', 'recovery'],
  },
  {
    title: 'Compare labels at the moment of choice',
    body: '“Keep”, “Save” and “Pin” all seem clear in isolation. Put them beside the same note and ask what each one will do.\n\nIf two labels imply the same promise, the system needs fewer verbs. If they imply different results, show those results in the menu before asking for a click.',
    tags: ['ux writing', 'research'],
  },
  {
    title: 'What should the little count count?',
    body: 'The comment badge shows 4, but the thread contains four comments, one resolved discussion and one new reply. What is the number for?\n\nTry “1 new” beside the item and let the destination show the full history. The trigger should tell me why I might open it; the popover can name the discussions.',
    tags: ['interface', 'collaboration'],
  },
  {
    title: 'Prototype the slow connection first',
    body: 'We keep testing the happy path on the studio network. The sample sync takes 150 milliseconds there, which hides every transition that might matter.\n\nAdd a deliberate six-second delay and a failed second attempt. Watch whether people keep editing, wait, or start clicking the save control repeatedly. Then design for what they actually need to know.',
    tags: ['prototyping', 'reliability'],
  },
  {
    title: 'A timeline needs more than dates',
    body: 'The activity timeline shows when; the reviewer also needs what changed and where to look. In the mock-up, add a short summary and a passage link for each meaningful edit.\n\nDo not fill the timeline with every cursor movement. Keep the quiet, recoverable edits in history and the events that ask for attention in the activity view.',
    tags: ['history', 'information design'],
  },
  {
    title: 'List view: leave room for a second thought',
    body: 'The current row has title, date, tag, owner and a menu. There is nowhere for the small bit of context that makes the item recognisable.\n\nTry a second line with the opening sentence, but let long text wrap only in the selected row. Compare this with a preview on hover; keyboard users need the same clue without hovering.',
    tags: ['reading', 'layout'],
  },
  {
    title: 'Test the empty export folder',
    body: 'When a person exports the sample workspace, what happens to the empty folders? If they vanish, that may be fine; if they represented a deliberate plan, it may look as though the export failed.\n\nWrite the rule down and show a small summary before download. The exported folder should still make sense when opened outside the app.',
    tags: ['local-first', 'export'],
  },
  {
    title: 'A mark on the edge of the page',
    body: 'Try a quiet presence signal: a coloured mark at the edge of the note while another person is reading. It should disappear when they leave, not linger like an unread comment.\n\nAsk whether the mark helps the writer avoid an edit collision. If it only says “someone exists”, perhaps the session list already does that job.',
    tags: ['collaboration', 'presence'],
  },
  {
    title: 'The copy-and-paste boundary',
    body: 'Copy one note from the prototype app into a plain text editor, then paste it back. Which links, list marks and line breaks survive?\n\nThe clipboard should carry useful structure without smuggling in a pile of styling. Try the same note in email and a text file; those are ordinary destinations, not exotic edge cases.',
    tags: ['interoperability', 'testing'],
  },
  {
    title: 'A better way to say “permission denied”',
    body: 'Current copy: “Permission denied.” Better draft: “You can read this workspace, but only its editor can change the shared labels.”\n\nThen give the person a route back to the work they can do. Check that the explanation matches the actual role rules; friendly language cannot rescue an inaccurate boundary.',
    tags: ['writing', 'permissions'],
  },
  {
    title: 'Workshop scrap: the three-minute sketch',
    body: 'Prompt: draw the moment a person realises a shared note has changed. Three minutes, one marker, no interface chrome.\n\nThe first sketches showed a highlighted sentence; the later ones added who changed it and whether the comment was still open. Repeat with a blank sheet and see which details return without prompting.',
    tags: ['workshops', 'sketching'],
  },
  {
    title: 'Do not make the toast do all the work',
    body: '“Saved” appears for two seconds and vanishes. That is useful feedback for a quick action, but it is a poor record of a state someone may need to check later.\n\nKeep a stable last-saved time near the document title and use the toast for the brief confirmation. Test it with reduced motion and a screen reader announcement.',
    tags: ['feedback', 'accessibility'],
  }
]
