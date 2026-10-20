scene([
  "The magician puts both coins in the hand of a person from the audience.",
  ["Everyone can see the coins go in.", 0.4],
  ["Then the person puts the coins behind their back, one coin in each hand.", 0.8],
], (t, at, b) => {
  const away = at(2, "behind");
  return mascot(-3.6, t, pop(t, 0.1), blink(t, b[1][0]), hop(t, at(2, "one coin"))) +
    ball(1.6, 0.45, 2.4, 0.28, "purple", pop(t, at(0, "hand")), out(t, away + 0.2)) +
    ball(0.5, 3.4, 0.9, 0.9, "white", pop(t, 0.3), glide(t, at(0, "puts"), at(0, "hand") + 0.6, 0.1, -1.7, 0.4), out(t, away)) +
    ball(2.9, 3.4, 0.78, 0.78, "gold", pop(t, 0.5), glide(t, at(0, "puts") + 0.25, at(0, "hand") + 0.85, -0.3, -1.9, 0.4), out(t, away)) +
    [0.5, 2.9].map((x, i) => ball(x, 0.8, 0.75, 0.7, "purple", pop(t, at(2, "one coin") + 0.4 * i))).join("");
});
