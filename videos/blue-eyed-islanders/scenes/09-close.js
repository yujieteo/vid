scene([
  "What you know matters.",
  "What you know about what others know matters too.",
  ["This version of the puzzle is from the blog of Terry Tao.", 1],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), hop(t, b[1][1]), wave(t, at(2, "Terry"))) +
  label("What you know", 1.4, 3.2, 0.7, "text", pop(t, at(0))) +
  label("What you know about", 1.4, 2.2, 0.6, "blue", pop(t, at(1))) +
  label("what others know", 1.4, 1.5, 0.6, "blue", pop(t, at(1, "what others"))));
