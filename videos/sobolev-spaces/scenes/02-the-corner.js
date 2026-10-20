scene([
  "Take the function absolute value of x.",
  "It has a corner at zero, so it has no ordinary derivative there.",
  ["But it has a weak derivative. This is the sign function: minus 1 on the left, and 1 on the right.", 0.2],
], (t, at, b) => {
  const path = (x, z, d, color, ...poses) => place(x, z, merge(poses),
    `<path d="${d}" fill="none" stroke="${PALETTE[color]}" stroke-width="0.07" stroke-linecap="round" stroke-linejoin="round"/>`);
  const dot = (x, z, color, ...poses) => place(x, z, merge(poses), `<circle r="0.09" fill="${PALETTE[color]}"/>`);
  return mascot(-3.6, t, pop(t, 0.1), hop(t, at(2, "weak")), look(t, at(1, "corner"), at(2) - 0.2, 1, 0), blink(t, b[2][1] + 0.3)) +
    label("|x|", 0, 3.9, 0.55, "text", pop(t, at(0, "absolute"))) +
    path(0, 2.2, "M-1 -1L0 0L1 -1", "sky", pop(t, at(0, "absolute"))) +
    dot(0, 2.2, "hotpink", pop(t, at(1, "corner"))) +
    label("no derivative here", 0, 1.5, 0.35, "hotpink", pop(t, at(1, "no ordinary")), out(t, at(2))) +
    label("sign(x)", 2.9, 3.9, 0.55, "text", pop(t, at(2, "sign"))) +
    path(2.9, 2.2, "M-1 0.8L0 0.8M0 -0.8L1 -0.8", "green", pop(t, at(2, "minus")));
});
