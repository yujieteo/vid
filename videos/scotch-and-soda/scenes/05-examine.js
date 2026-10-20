scene([
  "At the end of the trick, the coins can be examined.",
  ["The person is free to look at both of them.", 0.8],
], (t, at, b) =>
  mascot(-3.6, t, blink(t, at(1) + 0.5), glance(t, at(1, "look"))) +
  ball(0.5, 1.6, 0.9, 0.9, "white", glide(t, b[0][0], b[0][1], 0, 1.1, 0.3), flip(t, b[0][0], b[0][1] + 0.5)) +
  ball(2.9, 1.6, 0.62, 0.62, "white", glide(t, b[1][0], b[1][1], 0, 1.1, 0.3), flip(t, b[1][0], b[1][1] + 0.5)) +
  label("half dollar", 0.5, 0.3, 0.4, "text", out(t, b[0][0])) +
  label("quarter", 2.9, 0.3, 0.4, "text", out(t, b[1][0])));
