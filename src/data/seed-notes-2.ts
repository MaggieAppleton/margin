// Individually written fictional sample notes.
export const seedNotes2: { title: string; body: string; tags: string[] }[] = [
  {
    title: 'Can the menu remember its last useful place?',
    body: 'The inspector menu always opens at the top, even after the person has been working in the lower section. Try remembering the open section for this session only.\n\nDo not restore the exact scroll offset after a layout change; that can open on a heading with none of its controls visible. The useful state is the section, not the pixels.',
    tags: ['state', 'interaction'],
  },
  {
    title: 'Reading reflection: examples carry baggage',
    body: 'An example can make a concept easier to handle, but it also brings its own assumptions along. The “team notes” example quietly assumes a team, a shared schedule and permission to edit.\n\nFor the help page, pair it with an individual project and a read-only situation. Do not pretend one example is universal just because it fits neatly on a slide.',
    tags: ['reading', 'learning'],
  },
  {
    title: 'A small test for the search shortcut',
    body: 'Ask someone to open search without telling them the keyboard shortcut. If they find the icon, can they infer what it searches? If they miss the icon, does the shortcut help them discover it later?\n\nWe need both visible invitation and efficient repeat use. One is for learning, the other is for habit.',
    tags: ['accessibility', 'developer tools'],
  },
  {
    title: 'The draft needs a visible edge',
    body: 'The prototype draft looks almost identical to the published note. That is calm, but the reviewer cannot tell whether a change is shared yet.\n\nAdd a restrained “private draft” label and a clear publish action. Test whether a collaborator can tell which version they are reading without asking the author.',
    tags: ['collaboration', 'states'],
  },
  {
    title: 'Short list: signs a flow is asking too much',
    body: '• The same choice appears on three screens\n• The person needs a glossary before starting\n• “Back” loses an answer\n• The default cannot be changed later\n\nUse this as a review prompt, not a scorecard. One awkward step can be deliberate; four in a row probably mean the flow has forgotten the person’s original task.',
    tags: ['review', 'checklist'],
  },
  {
    title: 'What survives when the window is small?',
    body: 'Resize the sample editor until it is narrow enough that the side panel closes. The selected note should remain readable and there should be a clear route back to the panel.\n\nKeep the selected passage in view when the panel returns. Otherwise the interface has preserved the choice but lost the reason for making it.',
    tags: ['responsive design', 'state'],
  },
  {
    title: 'A saved search is a little contract',
    body: 'The saved search “open questions” currently matches tags and titles, but not comment text. Its name sounds broader than its behaviour.\n\nEither narrow the label to “questions tagged open” or include the places people expect it to search. Show the rule beside the saved query so it can be checked and changed.',
    tags: ['search', 'information architecture'],
  },
  {
    title: 'Sketch: a receipt for shared changes',
    body: 'After a collaborator edits a shared note, leave a small receipt with the changed passage, the time and the person’s name. No confetti, no feed takeover.\n\nIf the edit is still pending, say that. If it has been saved, let the receipt link to the version history. The same visual treatment should not mean two different things.',
    tags: ['collaboration', 'feedback'],
  },
  {
    title: 'The deletion rehearsal',
    body: 'Use a disposable note with one linked reference and one open comment. Delete it, undo, then archive it instead. Note which relationships return and which are lost.\n\nBefore we add a second confirmation, find out whether undo is enough. The important part is restoring the context, not merely putting a card back in the list.',
    tags: ['recovery', 'testing'],
  },
  {
    title: 'The quiet mode question',
    body: 'A quiet mode could hide badges and activity hints while leaving direct replies visible. But is that a mode people must remember to switch on and off?\n\nTry an alternative: keep the hints in a stable place and let each person choose which events deserve a notification. Compare the number of settings before deciding.',
    tags: ['attention', 'notifications'],
  },
  {
    title: 'A hand-drawn map of the import route',
    body: 'Folder chosen → file list checked → readable notes selected → preview inspected → import confirmed.\n\nThe trouble is the arrow from preview back to file list: changes there invalidate the preview. Mark that dependency on the diagram and make the screen say when the preview is out of date.',
    tags: ['sketch', 'import'],
  },
  {
    title: 'An icon can be clear to its maker',
    body: 'The bookmark icon means “keep this close” to the designer and “save a copy” to one tester. The star means favourite to another tester. Neither answer is silly.\n\nShow the verb in the menu and watch what happens after the action. A tiny label beside the icon may be worth the extra width.',
    tags: ['research', 'icons'],
  },
  {
    title: 'How far back should “recent” reach?',
    body: 'The recent list mixes items opened this morning with one from three months ago. Maybe “recent” is currently a polite way to say “whatever was last in the array”.\n\nTry a date window, then a “pick up where you left off” group based on unfinished work. Ask which one helps someone return without making the list feel like surveillance.',
    tags: ['navigation', 'research'],
  },
  {
    title: 'One action, one clear hover surface',
    body: 'The row menu trigger has padding, but the hover colour stops at the icon. Extend the hover surface across the full control so it reads as one action.\n\nKeep left and right breathing room at the row edge. Test with a long title and a visible count; the active area should not look like two unrelated buttons.',
    tags: ['interface', 'accessibility'],
  },
  {
    title: 'The response that does not need a reply',
    body: 'The reviewer added a comment that is really a useful correction, not a question. The reply box makes it look as if the author must answer before moving on.\n\nTry an acknowledge action and a way to mark the comment addressed. Keep “resolve” for the thread’s status, not as a substitute for a conversation-ending gesture.',
    tags: ['collaboration', 'interaction'],
  },
  {
    title: 'If the animation is off, does the task still work?',
    body: 'Turn on reduced motion and repeat the route from the list to a related note. The current transition carries the only cue that the selection changed.\n\nKeep the change visible in a non-moving way: selected label, focus position, and a short status update where needed. Motion can add orientation; it cannot be the only evidence.',
    tags: ['motion', 'accessibility'],
  },
  {
    title: 'A reading queue with room to abandon things',
    body: 'The sample reading queue needs a “leave for now” action. Remove is too final; keep at the top makes every half-read link look like a commitment.\n\nTry a quiet shelf for paused items with the last-opened date. Do not send a reminder when something sits there. The point is to keep the door open, not to invent homework.',
    tags: ['reading', 'tools'],
  },
  {
    title: 'Pairing exercise: explain the selected item',
    body: 'One person selects a note without speaking. The other explains what they think the selection means from the screen alone. Swap roles after two minutes.\n\nThe exercise catches details that look obvious to the person who made the interaction: selected versus focused, pinned versus open, draft versus saved.',
    tags: ['workshops', 'research'],
  },
  {
    title: 'A folder tree has a direction of travel',
    body: 'The breadcrumb shows where the note lives, but not where it came from or what else shares its context. For the prototype, add a “related notes” route beside the path.\n\nTest whether people use the breadcrumb to move upward or the related list to move sideways. Those are different journeys and may deserve different visual weight.',
    tags: ['navigation', 'information architecture'],
  },
  {
    title: 'Maybe the tag wants to be a question',
    body: 'The sample note has four tags: “design”, “tools”, “ideas”, “later”. The last two do not tell us much about how to find it.\n\nTry turning “later” into “what should we test next?” and leave the tag itself optional. A prompt may be more useful than a category when the note is still taking shape.',
    tags: ['notes', 'taxonomies'],
  },
  {
    title: 'A support link should remember the problem',
    body: 'The “Get help” link opens the general guide and forgets the current error. Instead, pass the error name and the screen context into a short help page.\n\nCheck the URL before shipping; it should not include note text or private names. Context helps without turning the help centre into a copy of the workspace.',
    tags: ['support', 'privacy'],
  },
  {
    title: 'Things to put in the prototype drawer',
    body: '• The narrow layout\n• A note with no title\n• A comment that is still open\n• A failed export\n• The keyboard-only route\n\nThese are the conditions that make the design show its working. Keep them one click away from the polished starting screen so the review can reach them quickly.',
    tags: ['prototyping', 'checklist'],
  },
  {
    title: 'A stranger should understand the export',
    body: 'Give a person who has not seen the app an exported sample folder. Ask them to find the note about the importer and explain which version is current.\n\nIf they need the app open to interpret the filenames, the export has kept the data but lost too much of its shape. Try plain names and a small index file before adding a custom format.',
    tags: ['local-first', 'research'],
  },
  {
    title: 'The status label needs a time boundary',
    body: '“Up to date” becomes misleading as soon as the connection drops. Add the time of the last confirmed sync and change the wording to “saved here” when the edit is only local.\n\nUse the same distinction in the list, the editor and the export screen. Status that changes its meaning from place to place is worse than no status.',
    tags: ['reliability', 'writing'],
  },
  {
    title: 'An unfinished note can still be findable',
    body: 'A note with no title currently appears as “Untitled”. Four notes can have that name, which makes the list nearly useless.\n\nUse a short preview from the first line and show a subdued “no title” label. Do not silently promote the first sentence into a permanent title; that may be the very sentence the person is still trying to fix.',
    tags: ['notes', 'search'],
  },
  {
    title: 'The comparison view needs a stable anchor',
    body: 'When the old and new versions scroll independently, the reviewer loses the passage they meant to compare. Try a shared anchor that keeps the selected paragraph aligned while both columns move.\n\nIf a passage was removed, show its gap and the nearest surviving text. Do not quietly jump to the top and call that a comparison.',
    tags: ['history', 'interaction'],
  },
  {
    title: 'Check the labels at ordinary reading speed',
    body: 'Show the list for five seconds, then ask which items are drafts and which are shared. If the answer depends on remembering a tiny icon, strengthen the label.\n\nThe goal is not to make every state shout. It is to make the important difference legible without a scavenger hunt.',
    tags: ['design', 'research'],
  },
  {
    title: 'A private scratchpad beside shared work',
    body: 'The team exercise needs a place to jot a thought before putting it into the shared note. Mark the boundary clearly: private scratchpad on one side, shared document on the other.\n\nTry moving one sentence across and make the destination visible before release. A subtle colour change alone may not be enough to explain who can read it.',
    tags: ['collaboration', 'privacy'],
  },
  {
    title: 'Do dates help this note make sense?',
    body: 'The list shows a precise timestamp even for old scraps. For most notes, “Tuesday” or “three weeks ago” may be enough until someone opens the history.\n\nKeep exact times where order matters, such as a hand-off or a sync receipt. In the main list, use the space for the first line instead.',
    tags: ['content', 'layout'],
  },
  {
    title: 'The button label after the action',
    body: 'The pin button changes to “Unpin” after use, but the selected item has already moved into a pinned section. Now the button sits beside a group that is already pinned.\n\nTry a menu action with current state stated in the trigger, or move the action into the item row. The label should make sense where the person sees it.',
    tags: ['ux writing', 'interaction'],
  },
  {
    title: 'Notes from a desk tidy',
    body: 'Exercise: sort a tray of six cards into “keep nearby”, “ask someone”, and “probably done”. One card belongs in two piles.\n\nThat overlap is the point. Do not add a multi-select feature just yet; ask what the person wants to remember about the overlap. A relation might be enough.',
    tags: ['everyday', 'research'],
  },
  {
    title: 'A short list for the next design review',
    body: '• Can I tell what is selected?\n• Can I reverse the last move?\n• Does the empty state offer a first step?\n• What changes when the network disappears?\n• Can I find this again tomorrow?\n\nChoose two questions for the session. Five is a useful checklist; it is too much to ask one person to think about all at once.',
    tags: ['design', 'checklist'],
  },
  {
    title: 'The archive confirmation is doing the wrong job',
    body: 'The confirmation says “Are you sure?” but does not explain what archiving means. The person is being asked to supply the missing product definition from memory.\n\nTry a short consequence: “This note leaves the active list. You can still find it under Archived.” Then decide whether undo makes the extra confirmation unnecessary.',
    tags: ['writing', 'recovery'],
  },
  {
    title: 'A keyboard shortcut is a promise to repeat',
    body: 'Adding a shortcut says this action will be useful often enough to learn. The prototype currently has a shortcut for opening a menu used once during setup.\n\nKeep shortcuts for navigation and repeated editing. Show them beside the action and make sure they do not collide with browser or assistive-technology commands.',
    tags: ['accessibility', 'developer tools'],
  },
  {
    title: 'Do not hide the failed part of a batch',
    body: 'The importer can read 18 of 20 sample notes. The current screen offers only Retry and Cancel. Add a list of the two files that need attention, plus a way to continue with the readable ones.\n\nPartial success is a state with its own choices; it is not a smaller version of failure.',
    tags: ['import', 'systems'],
  },
  {
    title: 'A printed page is a strange screen size',
    body: 'Print the review view and see whether comments remain attached to the passages they discuss. The browser layout assumes a wide display; paper turns it into one long column with page breaks.\n\nA person may use the printout to mark up a discussion. Keep the author and version visible on every page, not only on the first one.',
    tags: ['reading', 'accessibility'],
  },
  {
    title: 'The collaborator who only reads',
    body: 'The sample workspace has one editor and one reader. The reader needs to leave a comment but should not be able to change the shared labels.\n\nTest whether those permissions feel coherent from the interface. Avoid showing disabled controls with no explanation; if the action belongs to the editor, say so at the point of choice.',
    tags: ['collaboration', 'permissions'],
  }
]
