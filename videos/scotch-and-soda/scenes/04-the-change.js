scene([
  "Then the magician asks for the centavo back.",
  ["But the person cannot give it back.", 0.6],
  ["In one version, the person now has the half dollar and an American quarter.", 1],
], (t, at, b) => {
  const now = at(2, "now");
  return mascot(-3.6, t, pop(t, 0.1), glance(t, at(0, "asks")), hop(t, at(2, "quarter"))) +
    [0.5, 2.9].map((x, i) => ball(x, 0.8, 0.75, 0.7, "purple", wave(t, b[0][0] + 0.2 * i, 1.6, 8), out(t, now))).join("") +
    label("?", 1.7, 2.6, 1.2, "blue", pop(t, at(1, "cannot")), out(t, b[2][0])) +
    ball(0.5, 1.6, 0.9, 0.9, "white", pop(t, now + 0.2)) +
    ball(2.9, 1.6, 0.62, 0.62, "white", pop(t, now + 0.5)) +
    label("half dollar", 0.5, 0.3, 0.4, "text", pop(t, at(2, "half"))) +
    label("quarter", 2.9, 0.3, 0.4, "text", pop(t, at(2, "quarter")));
});
