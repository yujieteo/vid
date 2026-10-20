scene([
  "But wait. Everyone could already see blue-eyed people.",
  "So what did the visitor add?",
  ["The visitor made it common knowledge.", 0.6],
  ["Common knowledge means this. Everyone knows it. Everyone knows that everyone knows it. And so on, without end.", 0.8],
  ["Each day when nobody leaves adds one more level of knowing.", 0.6],
  ["After enough days, the blue-eyed people can work out their own eye color.", 1],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), blink(t, b[0][1]), glance(t, at(1, "what")), hop(t, at(2, "common")), hop(t, at(5, "work out"))) +
  label("Common knowledge", 1.6, 3.5, 0.6, "blue", pop(t, at(2, "common"))) +
  label("Everyone knows it.", 1.6, 2.5, 0.4, "text", pop(t, at(3, "Everyone knows it"))) +
  label("Everyone knows that everyone knows it.", 1.6, 1.9, 0.3, "text", pop(t, at(3, "Everyone knows that"))) +
  label("... and so on, without end.", 1.6, 1.3, 0.4, "text", pop(t, at(3, "And so on"))) +
  label("1 day of silence = 1 more level", 1.6, 0.6, 0.4, "blue", pop(t, at(4, "adds"))));
