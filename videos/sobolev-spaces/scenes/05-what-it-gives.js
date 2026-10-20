scene([
  "Derivatives in L p also give continuity.",
  "If k times p is larger than the dimension n, each function is continuous, up to measure zero.",
  ["Sobolev spaces are the modern place to look for solutions of partial differential equations.", 0.2],
], (t, at, b) => {
  const path = (x, z, d, color, ...poses) => place(x, z, merge(poses),
    `<path d="${d}" fill="none" stroke="${PALETTE[color]}" stroke-width="0.07" stroke-linecap="round" stroke-linejoin="round"/>`);
  return mascot(-3.6, t, pop(t, 0.1), hop(t, at(1, "continuous")), blink(t, b[1][1] + 0.2), wave(t, at(2, "modern"), 1.4), spin(t, b[2][1] - 0.6)) +
    label("k p > n", 1.4, 3.7, 0.7, "text", pop(t, at(1, "If k"))) +
    label("continuous", 1.4, 3.0, 0.45, "sky", pop(t, at(1, "continuous"))) +
    path(1.4, 1.8, "M-1.8 0.2Q-1 -0.9 -0.3 -0.1T1 -0.2T1.8 -0.7", "sky", pop(t, at(1, "continuous"))) +
    label("Solutions of PDEs live here", 1.4, 0.6, 0.45, "gold", pop(t, at(2, "modern")));
});
