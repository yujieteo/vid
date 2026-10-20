scene([
  "But wait. Everyone could already see blue-eyed people.",
  "So what did the visitor add?",
  ["The visitor made it common knowledge.", 0.6],
  ["Common knowledge means this. Everyone knows it. Everyone knows that everyone knows it. And so on, without end.", 0.8],
  ["Each day when nobody leaves adds one more level of knowing.", 0.6],
  ["After enough days, the blue-eyed people can work out their own eye color.", 1],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), blink(t, b[0][1]), glance(t, at(0, "Everyone")),
    look(t, at(1, "what"), b[1][1], 0.5, 1), squint(t, at(1, "what"), 1.4),            // thinking
    hop(t, at(2, "common")), wave(t, at(4, "Each"), 2.4, 4), squash(t, at(5, "work out"))) +
  label("Common knowledge", 1.6, 3.5, 0.6, "blue", pop(t, at(2, "common"))) +
  label("Everyone knows it.", 1.6, 2.5, 0.5, "text", pop(t, at(3, "Everyone knows it")), out(t, at(4))) +
  label("... and so on, without end.", 1.6, 1.5, 0.5, "text", pop(t, at(3, "And so on")), out(t, at(4) + 0.1)) +
  label("1 day of silence = 1 more level", 1.6, 2.0, 0.5, "blue", pop(t, at(4, "adds"))));
