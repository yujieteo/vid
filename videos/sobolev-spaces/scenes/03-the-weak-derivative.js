scene([
  "A weak derivative comes from integration by parts.",
  "The derivative moves onto a smooth test function.",
  ["A weak derivative is only defined up to a set of measure zero.", 0.2],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "weak")), squint(t, at(1, "moves"), 1.5), wave(t, at(2, "measure"), 1.2)) +
  label("∫ u φ′ = −∫ v φ", 1.4, 3.3, 0.6, "text", pop(t, at(0, "integration"))) +
  label("u: the function", 1.4, 2.3, 0.4, "sky", pop(t, at(0, "weak"))) +
  label("v: the weak derivative", 1.4, 1.75, 0.4, "green", pop(t, at(0, "derivative"))) +
  label("φ: a smooth test function", 1.4, 1.2, 0.4, "gold", pop(t, at(1, "smooth"))) +
  label("v is unique up to measure zero", 1.4, 0.4, 0.4, "hotpink", pop(t, at(2, "set")))
);
