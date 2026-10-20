scene([
  "Here is a famous logic puzzle.",
  ["It is called the Blue-Eyed Islanders puzzle.", 1],
  ["Terry Tao shared it on his blog in 2008.", 0.5],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "famous")), blink(t, b[1][1] + 0.3), wave(t, at(2, "Terry"))) +
  label("The Blue-Eyed", 1.5, 2.3, 0.75, "text", pop(t, at(1, "Blue"))) +
  label("Islanders Puzzle", 1.5, 1.3, 0.75, "blue", pop(t, at(1, "Islanders"))));
