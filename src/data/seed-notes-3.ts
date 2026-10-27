// Individually written fictional sample notes.
export const seedNotes3: { title: string; body: string; tags: string[] }[] = [
  {
    title: 'What did the person think would happen?',
    body: 'After each confusing click, ask one question: “What did you expect to happen?” Do not ask whether the design was confusing; that invites a review of the design instead of the person’s expectation.\n\nWrite down the verb they use. Those verbs may be better labels than the ones in the current menu.',
    tags: ['research', 'facilitation'],
  },
  {
    title: 'A note can be a place to resume',
    body: 'Add a one-line “next time” field to the prototype note: “Check the long title in the narrow list”. It should be optional and visible beside the draft, not buried in metadata.\n\nTry it on a note that has sat untouched for a week. If the line sounds like a task imposed by the app, remove it; the person should own the reminder.',
    tags: ['continuity', 'notes'],
  },
  {
    title: 'A small inventory of visible states',
    body: 'For each sample screen, capture: empty, loading, saved, offline, error, and crowded. Put the captures side by side and circle the element that tells the person what changed.\n\nIf two states use the same cue, find a second one. This is a quick audit, not a complete specification.',
    tags: ['systems', 'review'],
  },
  {
    title: 'The popover should name the things inside',
    body: 'The trigger says “3 related”. The popover currently repeats “3 related” at the top and shows only generic rows. Give each row its actual title, icon and colour so the list answers the question that opened it.\n\nKeep the whole row clickable and leave enough padding inside the hover surface. The trigger already supplied the count; the popover can spend its space on names.',
    tags: ['interface', 'navigation'],
  },
  {
    title: 'Make the decision visible before the click',
    body: 'The export menu has “Markdown”, “Text” and “Archive”. The last item means both a file format and an action to hide notes. Separate the verbs before the review session.\n\nA menu is a moment of commitment; labels need to describe the result, not the data model.',
    tags: ['ux writing', 'export'],
  },
  {
    title: 'The list is a working surface',
    body: 'The mock-up treats the list as a place to choose an item and then move on. In the test, people used it to compare titles, skim first lines and decide what could wait.\n\nGive the row enough room to support those small judgements. A list is not merely a thinner version of the document view.',
    tags: ['information design', 'notes'],
  },
  {
    title: 'Try the same task with no mouse',
    body: 'Rename a note, move it into a group and return to the reading position with the keyboard alone. The current flow reaches the group menu but cannot choose a destination without a pointer.\n\nAdd keyboard navigation to the destination list and keep focus on the moved note afterwards. Then test with a screen reader; focus order and spoken order should agree.',
    tags: ['accessibility', 'testing'],
  },
  {
    title: 'A rough draft of the first-run copy',
    body: '“This is a small workspace for notes that are still becoming something. Start with a thought, or open the sample project to see how it works.”\n\nMaybe too earnest. Test it beside a real empty note and a populated sample. If people choose the sample, do they know how to make their own copy?',
    tags: ['writing', 'onboarding'],
  },
  {
    title: 'A team exercise with mismatched clocks',
    body: 'Give two reviewers the same shared note but different assumptions about when the meeting starts. Ask them to arrange the hand-off without a calendar.\n\nThis tests the language around “today”, “later” and “next session”. Relative dates are friendly until people are not in the same time zone or working rhythm.',
    tags: ['collaboration', 'research'],
  },
  {
    title: 'The screen reader announcement after save',
    body: 'When the note saves, the visual toast appears but the screen reader hears nothing. Add a concise live-region message and avoid announcing every keystroke.\n\nTest a slow connection too. “Saved locally; waiting to sync” is useful. “Saved” followed by “not yet saved” is a confusing little play in two acts.',
    tags: ['accessibility', 'feedback'],
  },
  {
    title: 'A place for the note that disagrees',
    body: 'The reference panel currently holds links that support the draft. Add one “counterexample” card and see whether it changes the review conversation.\n\nIf the card feels like a debate tactic, rename it “does not fit yet”. The purpose is to keep the uncomfortable evidence nearby, not to stage a courtroom.',
    tags: ['research', 'thinking'],
  },
  {
    title: 'Do not put the only undo in a toast',
    body: 'The archive toast disappears before the tester has finished reading the confirmation. Move Undo into the toast but also keep the action in the item history.\n\nA short-lived recovery is handy; an action that can only be recovered for five seconds is a trap with good typography.',
    tags: ['recovery', 'interaction'],
  },
  {
    title: 'How much of the project belongs on the home screen?',
    body: 'The prototype home screen currently shows every project, every status and every recent change. The useful starting question may be much smaller: what were you in the middle of?\n\nTry a “continue” section with two items, then let the full collection remain one click away. Ask whether the person feels oriented or managed.',
    tags: ['navigation', 'attention'],
  },
  {
    title: 'Paper test: arrange the evidence',
    body: 'Put a draft, a comment, a source link and a change note on separate slips. Ask the tester to show how they would decide whether a sentence is ready to keep.\n\nDo not supply an order. Watch which pieces they bring together and which they leave at the edge of the table.',
    tags: ['research', 'sketching'],
  },
  {
    title: 'A toast should not cover the next action',
    body: 'The save toast sits exactly where the reader opens the related-note popover. It is brief, but brief overlap is still overlap.\n\nMove the toast above the work area and test with the on-screen keyboard. Feedback should confirm the action without blocking the action that follows.',
    tags: ['layout', 'feedback'],
  },
  {
    title: 'A slower path for the irreversible action',
    body: 'Export can be repeated; permanent deletion cannot. The menu treats them as siblings because they both fit under “More”.\n\nMove delete into a separate confirmation that names the item and its linked work. Add an undo route only if the stored data can really be recovered.',
    tags: ['recovery', 'information architecture'],
  },
  {
    title: 'The draft title that became a tag',
    body: 'During the paper exercise, the tester wrote “ask about the timeline” in the title field, then used the tag to write “research”. That seems more natural than our expected title-plus-category pattern.\n\nAllow both fields to remain rough. The app can offer a clearer name later without insisting on one now.',
    tags: ['observations', 'notes'],
  },
  {
    title: 'Three checks for a calmer menu',
    body: '• Are the actions grouped by what they change?\n• Can a person predict the result from the label?\n• Is the destructive action visually separate?\n\nThe current menu passes the first check and fails the second. “Organise” could mean move, tag or sort. Replace it with the action we actually offer.',
    tags: ['interface', 'review'],
  },
  {
    title: 'A useful delay before publishing',
    body: 'The publish flow could show a preview of what collaborators will see, then offer “Publish now” and “Keep editing”. That is a pause with information in it.\n\nThe current confirmation only asks whether the person is sure. Replace the anxiety with a clear view of the consequence.',
    tags: ['interaction', 'publishing'],
  },
  {
    title: 'Try a note without its tags',
    body: 'Hide tags in the list for one review. Can people still distinguish the sample notes using titles and previews? If not, perhaps the tags are doing useful navigation work.\n\nIf yes, keep tags in the detail view and reduce the visual noise in the list. Do not keep a label visible just because it is available in the data.',
    tags: ['design', 'taxonomies'],
  },
  {
    title: 'What would make this file portable?',
    body: 'The export folder should include readable text, a simple index and enough structure to reconnect related notes. It should not require a special app just to find the first paragraph.\n\nTry opening it on a clean machine with no project setup. The portability promise begins at the moment the files leave the original workspace.',
    tags: ['local-first', 'export'],
  },
  {
    title: 'A second look at the “done” label',
    body: 'The board has a column called Done, but the sample items there include an unanswered question and a note waiting for review. They are done with one activity, not with the work.\n\nTry “Ready to revisit” for one item and “Closed” for another. The board may need to describe the next state instead of judging the whole piece of work.',
    tags: ['language', 'systems'],
  },
  {
    title: 'The sound of a successful save',
    body: 'No sound by default. The studio prototype uses a quiet visual confirmation, and the keyboard route receives a spoken status.\n\nKeep any optional sound off until somebody asks for it. A confirmation that helps one person can interrupt everyone nearby.',
    tags: ['accessibility', 'feedback'],
  },
  {
    title: 'A small change log people can actually scan',
    body: 'Three versions have nearly identical timestamps and the same “edited note” label. Show the opening words of the changed passage and the editor’s optional reason.\n\nKeep the list readable at a glance; full diffs belong one step deeper. The history should answer “what changed?” before it asks someone to compare every line.',
    tags: ['history', 'writing'],
  },
  {
    title: 'The sticky note that fell off the board',
    body: 'In the paper prototype, one card slid off the board when the tester made a new cluster. It was an accident, but the tester assumed the card had been discarded.\n\nMake the drop target explicit and keep a visible tray for ungrouped items. A clean canvas should not require perfect aim.',
    tags: ['prototyping', 'recovery'],
  },
  {
    title: 'A route back from the reference panel',
    body: 'The reference panel opens over the note and closes with Escape. The selected passage stays visible, which is good; focus returns to the toolbar, which is not.\n\nReturn focus to the control that opened the panel and keep the passage highlight briefly. The person should land back in the same thought, not at the top of the interface.',
    tags: ['interaction', 'accessibility'],
  },
  {
    title: 'A better question than “is this clear?”',
    body: 'Ask the reviewer to point to the next thing they would do and explain what they expect to happen. “Is this clear?” gets a polite yes far too easily.\n\nIf the action differs from the expectation, capture both phrases exactly. The gap is the design finding.',
    tags: ['research', 'facilitation'],
  },
  {
    title: 'The ordinary note about the shopping list',
    body: 'Shopping list:\n• oats\n• lemons\n• tape for the paper model\n• remember the small scissors\n\nNo productivity taxonomy required. Cross it out after the trip and forget about it.',
    tags: ['everyday', 'lists'],
  },
  {
    title: 'Can the example be safely changed?',
    body: 'The onboarding sample is so polished that deleting a sentence feels like breaking the tutorial. Add a clear “Reset sample” route and let the person change everything.\n\nA useful example is a starting material, not a glass case. Make the exit obvious before asking people to experiment.',
    tags: ['onboarding', 'prototyping'],
  },
  {
    title: 'Keep the thread when the panel closes',
    body: 'Closing the comment panel currently clears the selected thread. Reopen it and the person must search again.\n\nKeep the selection during the session, but do not automatically pop the panel open on every return visit. Remembering a choice and forcing a view are different promises.',
    tags: ['state', 'collaboration'],
  },
  {
    title: 'A routine list beside the big idea',
    body: 'For the sample project: charge the recorder, print the narrow layout, put fresh paper in the tray, send the room number to the participants.\n\nUseful work is not always conceptually interesting. Keep the list plain, checkable and easy to throw away after the session.',
    tags: ['everyday', 'lists'],
  },
  {
    title: 'The shape of a not-quite-finished review',
    body: 'The reviewer has read the note but not the linked example. The author has answered one comment and left another open. The status label says “Reviewed”.\n\nThat word is too tidy. Try “Review in progress” and show what remains without turning the whole page into a checklist. A review is a conversation with an uneven ending, not a stamp.',
    tags: ['collaboration', 'states'],
  },
  {
    title: 'The thought that does not fit the current project',
    body: 'A note about keyboard navigation arrived while the prototype was focused on importing files. Do not force it into the current folder just to keep the inbox empty.\n\nLeave an unassigned shelf and make its contents searchable. The project can claim the note later if a real connection appears.',
    tags: ['notes', 'organisation'],
  },
  {
    title: 'One more pass on the saved indicator',
    body: 'The cloud icon changes colour when a note syncs, but the colour is too subtle on the warm background. Add a short text state on focus and keep the last confirmed time available.\n\nCheck the offline and reconnect states side by side. The icon should not imply that a local edit has already reached the shared copy.',
    tags: ['local-first', 'accessibility'],
  },
  {
    title: 'A note about the borrowed room',
    body: 'Room setup for the prototype: six chairs in a loose semicircle, paper on the low table, screen visible from the back. The projector crops the far right edge, so keep the key action nearer the middle.\n\nThis is ordinary logistics, but it affects which prototype details anyone can see. Put the setup note beside the session plan, not in a separate facilities document.',
    tags: ['everyday', 'workshops'],
  },
  {
    title: 'A final question for the sample workspace',
    body: 'Can a person leave this workspace without finishing anything and still feel that their work is safe?\n\nTest an unfinished note, an unsent comment and an offline edit. Close the window, return later and trace each one. If the answer depends on a hidden status or a lucky timing window, the design is not finished.',
    tags: ['questions', 'reliability'],
  }
]
