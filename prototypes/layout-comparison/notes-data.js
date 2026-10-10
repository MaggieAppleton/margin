const NOTES = [
  "Buy oat milk.",
  "Call Dana back about the Thursday workshop; she wanted to move it to the afternoon if the room is free.",
  "Idea: a note app where the only navigation is search.",
  "Read the chapter on spaced repetition before Friday.",
  "Meeting recap: we agreed to ship the small version first. Design review moves to next week. Open question is whether tags are worth the complexity at this stage, or whether plain search covers it. Revisit after two weeks of real use.",
  "Passport renewal form is in the blue folder.",
  "Quote to remember: \"The details are not the details. They make the design.\"",
  "Gift ideas for Mum: a good pair of gardening gloves, the ceramic planter from the market, a book of pressed-flower prints. Check her wishlist before buying anything."
];
function render(layout) {
  document.body.className = layout;
  document.getElementById('list').innerHTML = NOTES.map(n => `<li>${n}</li>`).join('');
}
