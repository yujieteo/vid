// Parts only for this video. All scene files share 1 global scope.
PALETTE.brown = "#6b3a14";   // only for brown eyes
// An islander: the bot of the cast with this body color. The eye color ("blue" or "brown") is the fact of the story.
const islander = (x, t, color, eyes, ...poses) => blob(x, t, { ...CAST.find((c) => c.color === color), eyes }, ...poses);

scene([
  "Here is a famous logic puzzle.",
  ["It is called the Blue-Eyed Islanders puzzle.", 1],
  ["Terry Tao shared it on his blog in 2008.", 0.5],
], (t, at, b) => {
  const small = { s: 0.7 };   // the 2 islanders show the 2 eye colors of the title
  return mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "famous")), blink(t, b[1][1] + 0.3), wave(t, at(2, "Terry"))) +
    label("The Blue-Eyed", 1.5, 3.5, 0.75, "text", pop(t, at(1, "Blue"))) +
    label("Islanders Puzzle", 1.5, 2.6, 0.75, "blue", pop(t, at(1, "Islanders"))) +
    islander(0.7, t, "gold", "blue", small, pop(t, at(1, "Blue") + 0.1)) +
    islander(2.3, t, "sky", "brown", small, pop(t, at(1, "Islanders") + 0.1));
});
