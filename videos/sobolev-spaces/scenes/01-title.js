scene([
  "Some functions have a sharp corner.",
  ["Sobolev spaces are a way to work with them.", 0.2],
], (t, at, b) => {
  const path = (d, color, ...poses) => place(2, 1.2, merge(poses),
    `<path d="${d}" fill="none" stroke="${PALETTE[color]}" stroke-width="0.07" stroke-linecap="round" stroke-linejoin="round"/>`);
  return mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "sharp")), blink(t, b[1][1] + 0.3)) +
    label("Sobolev Spaces", 1.5, 3.6, 0.8, "text", pop(t, at(1, "Sobolev"))) +
    path("M-1.2 -1.2L0 0L1.2 -1.2", "sky", pop(t, at(0, "corner")));
});
