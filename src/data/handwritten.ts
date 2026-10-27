// Individually written fictional sample notes for the recording.
export const handwritten: { title: string; body: string; tags: string[] }[] = [
  {
    title: 'The problem with an empty page',
    body: 'A blank page looks neutral, but it quietly asks for a finished thought. That is a rather large first step.\n\nFor the archive-panel exercise, start with three scraps instead: “Where did that go?”, a rough sketch of the old layout, and one example item. Let the person move them around before asking for a name or a folder.\n\nQuestion for the next paper test: does a little bit of material make the task clearer, or does it make the page feel already decided? Try the same prompt with a completely empty sheet as a control.\n\nRecord what the tester does before they speak. If they pick up the example and change it, the prompt has made a useful invitation. If they ask whether they are allowed to touch it, the example is wearing too much authority.',
    tags: ['tools', 'prototyping'],
  },
  {
    title: 'The second cup of tea test',
    body: 'A small continuity test for an interface: leave in the middle of a task, do something else, then come back. Can you tell what you were trying to do before you can remember every click?\n\nFor the prototype, preserve the selected example, the open question and the unfinished sentence. Let the toast disappear; it has done its job.\n\nThe useful measure is not whether the screen is unchanged. It is whether the next action still feels obvious. Try it after closing the tab, after switching projects, and after the network has dropped. Those are three different kinds of interruption.',
    tags: ['design', 'continuity'],
  },
  {
    title: 'Give me something slightly wrong',
    body: 'An empty form makes me invent. A rough example lets me notice. Those are different kinds of effort.\n\nTry a starter paragraph with one visible mistake: the wrong grouping, an overlong title, or a label that almost fits. Ask the tester to fix it while thinking aloud. If they only correct the copy, the example may be too polished; if they understand the task faster, it has done useful work.\n\nNeed to keep the example clearly disposable. A suggestion should not masquerade as a decision already made on someone’s behalf. The reset route should be just as easy to find as the edit action. Test whether people understand that they can take the sample apart.',
    tags: ['prototyping', 'onboarding'],
  },
  {
    title: 'A default ought to leave a trace',
    body: 'A default is a small argument about what most people should do. Sometimes it saves everyone time; sometimes it hides a choice that should have remained visible.\n\nFor the sample workspace, record which view was chosen automatically and make changing it a one-step action. The person should be able to answer “why am I seeing this?” without opening settings or reading a help article.\n\nTest with an empty workspace and a crowded one. A sensible starting point can become a rather bossy rule once the material changes. Also check what happens when a returning reader has already changed the view once; the default may have outlived its usefulness.',
    tags: ['design', 'defaults'],
  },
  {
    title: 'Loading states that tell the truth',
    body: 'Collect a few honest ways to show work arriving: the file name before the preview, a map outline before the street labels, the first paragraph while the rest is still loading.\n\nAvoid the spinner that says “something is happening” for thirty seconds with no other evidence. If the system knows what it is waiting for, say so. If it does not, do not invent a percentage.\n\nSketch three states for the prototype importer: waiting for the folder, reading the list, and ready to review. The person should know what is safe to do during each one. Add a fourth state for the file that cannot be read, and make sure the other files are not held hostage by it.',
    tags: ['interaction', 'feedback'],
  },
  {
    title: 'Reading: A Pattern Language',
    body: 'The scale keeps shifting: a doorway, then a street, then a city. The book makes the small detail feel connected to a way of living, rather than a component waiting to be copied.\n\nFor the reading group, revisit the passages about alcoves. What makes a place feel usable for one person without turning it into a private room? There may be a parallel in shared workspaces, but do not stretch it too far.\n\nQuestion in the margin: how do you preserve the conditions around a pattern when you pass the pattern on? Bring one example from the sample editor and one from an ordinary public place. I want to know whether the pattern still holds when the people using it do not know each other.',
    tags: ['reading', 'patterns'],
  },
  {
    title: 'Undo is part of the material',
    body: 'If a move is cheap to reverse, people can be curious. If it is hard to reverse, they will ask permission from the interface before they try anything.\n\nThe paper prototype should include an undo card from the beginning, not as a polish item. Test a group move, a rename and an accidental archive. Does undo restore the whole action, including selection and context, or only put the item back?\n\nThere is a promise here: try things without losing your place. The tiny link between those two ideas is probably where the interaction lives. Put the undo control in the same place for each test so the exercise is about the recovery, not about finding the button.',
    tags: ['interaction', 'recovery'],
  },
  {
    title: 'Search for the question, too',
    body: 'A command menu is quick if you remember the verb. It is much less helpful when you only remember the problem.\n\nIn the prototype, type “the right panel vanished” and see whether the layout reset appears. Add “show archived items” as a plain-language query, not just an exact command label. Keep the list short enough to scan.\n\nSmall usability check: ask a tester to find one action they have never used before. If they need to know our internal vocabulary first, search is merely a faster way to be confused. Include one query with a typo and one that names the result rather than the action; both happen when people are in a hurry.',
    tags: ['developer tools', 'search'],
  },
  {
    title: 'Paper permits a useful sort of mess',
    body: 'On paper, a sentence can turn sideways. You can cross it out, draw an arrow through a paragraph, or decide a diagram is actually a list. No mode switch required.\n\nThe sketching exercise for Friday: give each person one sheet and ask them to explain the hand-off flow in whatever form is easiest. Do not hand out a diagram template. Notice when the software version would have asked them to choose a block type first.\n\nDigital tools need structure, of course. The question is when it becomes useful to ask for it. Keep the sheets in the order people used them; the changes between versions may explain more than the neatest final drawing.',
    tags: ['tools', 'sketching'],
  },
  {
    title: 'A path through the garden',
    body: 'Sketch a workspace with one useful next step in the centre and the other paths visible at the edges. The first version turned into a dashboard as soon as every possible action got the same sized card.\n\nTry a narrow column of recent work, one open question and a handful of related scraps. No totals, no “productivity” score.\n\nNeed to check whether this layout still works when the project has twenty open items. If everything gets equal visual weight, the path disappears again. Give the overview a clear route into the full collection so the quiet first screen does not become a dead end.',
    tags: ['design', 'sketch'],
  },
  {
    title: 'Link: Ink & Switch on local-first software',
    body: 'https://www.inkandswitch.com/\n\nReturn to the local-first essays and make a two-column note: the technical promise on one side, the felt experience on the other. “Your data is on your machine” is a useful property; it is not the same as feeling able to carry your work away.\n\nFor the prototype export, try a plain folder with readable files, then ask someone unfamiliar with the app to find one note. Export is part of the product’s shape, not a trapdoor for emergencies. A second test: give them the folder with the app closed and ask what they would do if they wanted to keep editing.',
    tags: ['links', 'local-first'],
  },
  {
    title: 'What does the cursor promise?',
    body: 'The cursor is a tiny forecast. It tells me what will happen if I type, drag, or click right now. A surprising number of confusing interactions start because that forecast is wrong.\n\nPrototype the same object with a text cursor, a grab hand and a plain arrow. Ask what each one implies before explaining the behaviour. Then try keyboard focus: the pointer is only one clue, and it disappears as soon as someone starts tabbing.\n\nKeep a screen recording of the mismatches. They are often easier to see afterwards. Add a short note beside each clip with the tester’s expectation; memory tends to tidy the awkward parts away.',
    tags: ['interaction', 'affordances'],
  },
  {
    title: 'A prototype should be allowed to disagree',
    body: 'The prototype is useful when it changes the conversation. If it only makes the original pitch look more persuasive, it may be a presentation with clickable bits.\n\nFor the next review, bring the awkward version too: one where the timeline is too long, one where the notes are grouped badly, and one that makes no recommendation. Ask which assumption each version exposes.\n\nThe aim is not to make a deliberately bad thing. It is to find out which part of the idea depends on everything going perfectly. Keep the original question visible beside each version so the room does not drift into critiquing surface details alone.',
    tags: ['prototyping', 'process'],
  },
  {
    title: 'Name the comma states',
    body: 'Draft, published. Connected, disconnected. Success, failure. The design work is often hiding in the comma: saving, reconnecting, partly finished, waiting for someone else.\n\nMake a state map for the sample editor before drawing the happy path. For each state, write what the person can still do and what information they need. A dimmed button is not an explanation.\n\nStart with “saving” and “waiting to reconnect”; those two are where a long pause can look like lost work.',
    tags: ['systems', 'design'],
  },
  {
    title: 'Browser tabs as little piles',
    body: 'Usability session: a participant dragged five research tabs beside each other, left a gap, then opened a new tab in the middle of the cluster. No labels, no folder. Just a small spatial arrangement.\n\nWe keep reaching for folders because piles look unserious. But the pile is quick to change and easy to scan. Try a saved workspace that keeps relative position as well as names.\n\nQuestion: when does spatial memory stop helping and become a mess? Test with twelve tabs, not five.',
    tags: ['observations', 'research'],
  },
  {
    title: 'Reading note, in my own words',
    body: 'A useful idea from today’s reading: understanding can grow when you are able to change the thing you are trying to understand. This is a paraphrase, not a quotation; find the page before using it in a talk.\n\nWould that hold for an explanation of a legal process, or for a piece of music? Maybe the ability to manipulate a model helps with systems and hurts when the object is someone else’s experience.\n\nFind the edge cases before turning this into a principle.',
    tags: ['reading', 'learning'],
  },
  {
    title: 'Friction with a job to do',
    body: 'Not all friction is a bug. A pause before sending, a preview before publishing, a second step before deleting something difficult to replace: sometimes the extra moment protects an intention.\n\nCompare those with a forced confirmation for changing a view or closing a harmless panel. That sort of friction spends attention without giving anything back.\n\nThe test might be: does this pause help me notice a consequence I care about, or does it merely prove the software is nervous?',
    tags: ['design', 'attention'],
  },
  {
    title: 'An inspector that teaches',
    body: 'The useful inspector shows the current value and gives you a way to test why it is there. Computed styles are evidence, but their reading order is often a scavenger hunt.\n\nTry grouping the sample panel by cause: inherited value, local override, browser default. Add a small “change this here” affordance beside the source. Avoid rewriting the property list as a tutorial.\n\nCan someone follow one style from the page to the component without already knowing the framework? That is the test for this version.',
    tags: ['developer tools', 'learning'],
  },
  {
    title: 'Sketchbook, not filing cabinet',
    body: 'A note does not always need a home. Sometimes it needs a neighbour: a related scrap, an unanswered question, or the rough sketch that made it make sense.\n\nTest a canvas where two or three items can sit together without becoming a folder. Keep the relationship visible when the layout changes; otherwise the arrangement is only decorative.\n\nStill unsure how this scales. Start with a small project and see whether the person asks for names, paths or just a better way to find the first scrap again.',
    tags: ['notes', 'thinking'],
  },
  {
    title: 'Read the empty state aloud',
    body: '“You haven’t created any projects yet.” It sounds as if the software is disappointed.\n\nTry: “Start with a small idea.” Better still, show one place to put it and let the person begin without configuring the whole workspace. The empty state should explain the first useful action, not announce an absence.\n\nRead every version aloud. If the sentence sounds odd from a person, it will sound stranger coming from a rectangle at the centre of the screen.',
    tags: ['writing', 'design'],
  },
  {
    title: 'Link: The Programming Systems Lab',
    body: 'https://www.programming.systems/\n\nA trail into programming environments rather than languages alone. Keep a list of the assumptions our tools make about files, time and who is allowed to change what.\n\nPossible reading-group prompt: which part of the environment teaches you something, and which part merely requires you to remember a convention? Bring one example from an editor, one from a browser and one from a terminal.\n\nNo grand conclusion yet; collect the examples first.',
    tags: ['links', 'developer tools'],
  },
  {
    title: 'Leave the whiteboard untidy for a day',
    body: 'Do not tidy the board immediately after the workshop. Photograph the whole thing, including the strange corner where the arrows double back.\n\nAsk the group the next morning which mark they still remember. It may be the odd connection nobody could explain at the time.\n\nPractical note: write the session date in the photo name and copy the three unresolved questions into the follow-up doc. Otherwise “leave it up” becomes “lose it in a camera roll”.',
    tags: ['workshops', 'process'],
  },
  {
    title: 'Motion as punctuation, not decoration',
    body: 'A quick transition can act like a comma: same thought, slightly different shape. A slower change can signal a paragraph break; take a breath, we are somewhere else.\n\nFor the prototype, animate only the panel opening and the move between related notes. Keep the small hover hints still. If everything moves, nothing gets emphasis.\n\nAsk someone watching the screen recording where they think the animation helped. If they can only say “it felt polished”, try removing it and compare.',
    tags: ['motion', 'interaction'],
  },
  {
    title: 'Let the file earn its name',
    body: 'The first thing a tool asks for is often a filename, before there is anything worth naming. Then that early guess follows the document everywhere.\n\nFor the prototype, let a note begin with its first useful sentence. Offer a rename after it has been edited twice, or when it is shared. Measure whether people actually want that suggestion.\n\nThe risk is replacing one interruption with a clever interruption. Do not prompt just because the data model has a title field.',
    tags: ['developer tools', 'naming'],
  },
  {
    title: 'Reading: The Timeless Way of Building',
    body: 'Make a note about the relationship between a pattern and a feeling. Patterns are easier to copy than the conditions that made them useful; that seems relevant to component libraries.\n\nFor each pattern we discuss, write down the situation it assumes: number of people, amount of time, available space, and what can go wrong. If those conditions change, does the pattern still help?\n\nRevisit the difference between a reusable shape and a recipe that needs local judgement.',
    tags: ['reading', 'design'],
  },
  {
    title: 'A quieter signal that someone is here',
    body: 'A collaborator’s cursor helps until it competes with the work. Try three levels in the shared-canvas prototype: a small name at the edge, a brief highlight on the touched item, and the full live cursor.\n\nAsk the person working alone which signal they noticed and whether it helped them decide what to do. Ask the collaborator which signals made them feel watched.\n\nPresence should give enough context to coordinate. It does not need to turn every keystroke into a performance.',
    tags: ['collaboration', 'attention'],
  },
  {
    title: 'Remember the work, not the irritation',
    body: 'Persist the document, selection and perhaps panel widths. Forget the temporary error, the open tooltip and the frustration of the last session.\n\nFor the return-visit test, close the app during a useful state, then reopen it after a day. Which details make resuming easier? Which feel like the interface has kept a diary without being asked?\n\nWrite down each stored value and its reason. If we cannot explain why it should survive, it probably should not.',
    tags: ['state', 'design'],
  },
  {
    title: 'Workshop: rename the badly named button',
    body: 'Give everyone the same button, labelled “Manage”. Ask them to rename it without changing what it does. Then ask what behaviour would make their chosen name true.\n\nThe second question is the interesting one. A label can reveal a mismatch between the promise and the action, not just a copy problem.\n\nMaterials: three screenshots, sticky notes, one person writing down the arguments. Keep the exercise to fifteen minutes; otherwise it turns into a naming contest.',
    tags: ['workshops', 'writing'],
  },
  {
    title: 'A soft place beside the schema',
    body: 'Strict schemas make good promises and poor scratchpads. The sample capture flow currently asks for a category before the note has settled into one.\n\nTry accepting a rough fragment first, then offering structure when there are two or three clear neighbours. Keep the original text untouched while the person experiments with labels.\n\nNeed to watch for the opposite failure: an “anything goes” inbox becomes a different sort of filing cabinet. Capture should be light; finding should still work.',
    tags: ['systems', 'notes'],
  },
  {
    title: 'Keep one rough sketch near the final one',
    body: 'The polished design hides all the forks in the road. Keep a rough sketch beside the final version so the next person can see why the obvious alternative did not survive.\n\nFor this prototype, pin the three-column layout that failed beside the chosen single-column view. Add one sentence about what the test showed, not a defence of the decision.\n\nThis is useful context, not a museum of every discarded pixel. Keep only the sketch that explains a real trade-off.',
    tags: ['process', 'design'],
  },
  {
    title: 'Link: Bret Victor’s essays',
    body: 'https://worrydream.com/\n\nRevisit the essays on seeing and manipulating programme behaviour. Question for later: what would live feedback mean for a migration, where the interesting effect unfolds over weeks rather than seconds?\n\nTry drawing a timeline of the change, including the point when a person could still reverse it. A live preview is not automatically better if it makes a slow consequence seem harmless.\n\nKeep the discussion grounded in one example.',
    tags: ['links', 'learning'],
  },
  {
    title: 'The margin is room for a second voice',
    body: 'A margin says there is room for something that is not part of the main argument yet: an annotation, a doubt, a tiny drawing, a question to ask later.\n\nIn the review prototype, keep comments visually close to the passage but let the reader hide them without losing the thread. Test a narrow laptop window; the margin should not crush the text into a column of apologies.\n\nMaybe every serious writing tool needs a margin. It certainly needs a way to disagree without rewriting the sentence first.',
    tags: ['notes', 'writing'],
  },
  {
    title: 'Available is not the same as announced',
    body: 'Some information wants to be available, not announced. Before adding a badge, try giving it a stable place to live.\n\nFor the prototype inbox, show the last-sync time in the same quiet location each visit. Reserve a notification for something that changes what a person should do next.\n\nA badge also creates a debt: eventually somebody has to clear it. Check whether that action is meaningful or merely makes the number go away.',
    tags: ['attention', 'notifications'],
  },
  {
    title: 'Two meanings of simple',
    body: 'Simple to understand at first glance. Simple to work with after six months. Sometimes those are the same design; sometimes one has been traded away without anyone saying so.\n\nCompare the sample project with three items and the version with thirty. The first screen should remain legible, but the familiar actions should not move every time the collection grows.\n\nA clean first impression is not the whole cost of a tool. Ask someone to do the same task twice, a week apart.',
    tags: ['design', 'systems'],
  },
  {
    title: 'An error needs to give me a foothold',
    body: 'A useful error says what happened, where to look and one thing to try. A stack trace is evidence; it is not always an explanation.\n\nFor the import prototype, show the file name and the line that could not be read. Keep the raw detail behind a copyable “technical information” link. Do not replace a specific failure with “Something went wrong”.\n\nTest the copy with a person who did not build the importer. Can they tell whether the rest of their files were saved?',
    tags: ['developer tools', 'writing'],
  },
  {
    title: 'Some notes only need an afternoon',
    body: 'Writing something down is sometimes enough. It does not all need to become a permanent system.\n\nFor the example workspace, include a note that says “ask whether the preview can wait until after the list”. It is useful for the afternoon test, but it does not need a category, a reminder or a lifelong home.\n\nThe archive should make short-lived work easy to keep for now and easy to leave behind later.',
    tags: ['notes', 'process'],
  },
  {
    title: 'Read once for the argument, once to disagree',
    body: 'First pass: follow the argument. Second pass: disagree in the margins. Trying to do both at once makes me a slower reader and a worse critic.\n\nFor the reading group, leave a little space between the two rounds. On the second pass, mark the sentence that changed your mind, the claim you want evidence for and the example that does not fit.\n\nNo need to turn every mark into a polished response. A question mark is a perfectly serviceable note.',
    tags: ['reading', 'process'],
  },
  {
    title: 'A useful example has room to move',
    body: 'Specific enough to picture. Small enough that you can change one part. Imperfect enough that there is something to discuss.\n\nFor the component review, use a sample list with one very long title, one missing date and an item that is still being edited. The perfectly tidy example tells us almost nothing about the layout’s limits.\n\nKeep the example short. The point is to create a shared object for the conversation, not to sneak a full specification into the room.',
    tags: ['learning', 'prototyping'],
  },
  {
    title: 'A rainy-afternoon list for the studio',
    body: '• Build a colour picker without a colour wheel\n• Explain a rebase with paper strips\n• Draw an interface using only words\n• Make the slow part of a workflow visible\n\nPick one, set a twenty-minute timer, and stop before anyone reaches for a framework. Photograph the result next to the question it was meant to answer.\n\nIf none of these sounds fun, make a list of the tiny annoyances in the current prototype. That counts too.',
    tags: ['ideas', 'sketching'],
  },
  {
    title: 'When is a tool finished?',
    body: 'Maybe when it stops asking to be noticed. Or maybe that is just when someone has learnt its habits well enough to stop noticing them. Need to separate familiarity from good design.\n\nA practical check for the sample editor: can a returning tester pick up yesterday’s task without a tour? Can a new tester make one useful change without guessing?\n\nThe tool probably is not finished when there is nothing left to add. Better question: what can we remove without taking away a real capability?',
    tags: ['questions', 'tools'],
  },
]
