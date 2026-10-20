scene([
  "The magician shows two coins.",
  ["One is an American half dollar.", 0.4],
  ["The other is a Mexican centavo. It is a little smaller.", 0.8],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "shows")), glance(t, at(2, "smaller")), blink(t, b[2][1])) +
  ball(0.5, 1.6, 0.9, 0.9, "white", pop(t, at(0, "two")), flip(t, at(1, "American"), at(1, "American") + 1.4)) +
  ball(2.9, 1.6, 0.78, 0.78, "gold", pop(t, at(0, "coins")), flip(t, at(2, "Mexican"), at(2, "Mexican") + 1.4)) +
  label("half dollar", 0.5, 0.3, 0.4, "text", pop(t, at(1, "half"))) +
  label("centavo", 2.9, 0.3, 0.4, "text", pop(t, at(2, "centavo"))));
