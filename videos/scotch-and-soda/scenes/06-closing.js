scene([
  ["The set uses a special coin.", 0.4],
  "Good magic is a puzzle.",
  ["Watch the coins. Ask what changed, and when.", 1.2],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(1, "puzzle")), blink(t, b[2][1])) +
  ball(1.6, 1.6, 0.9, 0.9, "gold", pop(t, at(0, "special")), flip(t, at(0, "coin"), b[0][1] + 0.8)) +
  label("What changed, and when?", 1.6, 3.4, 0.45, "text", pop(t, at(2, "Ask"))));
