scene([
  "This is Scotch and Soda.",
  ["It is a trick with two coins.", 0.4],
  ["Here is what the audience sees.", 0.5],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), blink(t, b[0][1] + 0.3), hop(t, at(1, "trick")), wave(t, at(2, "audience"))) +
  label("Scotch and Soda", 1.4, 2.6, 0.75, "text", pop(t, at(0, "Scotch"))) +
  ball(0.5, 1.1, 0.55, 0.55, "white", pop(t, at(1, "two")), flip(t, at(1, "two") + 0.3, at(1, "two") + 1.5)) +
  ball(2.3, 1.1, 0.47, 0.47, "gold", pop(t, at(1, "coins")), flip(t, at(1, "coins") + 0.3, at(1, "coins") + 1.5)));
