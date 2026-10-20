scene([
  "W k p holds the functions in L p whose weak derivatives up to order k are in L p.",
  "Its norm adds up the sizes of all these derivatives.",
  "With this norm, it is a Banach space.",
  ["For p equal to 2, it is a Hilbert space. It is called H k.", 0.2],
], (t, at, b) =>
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(2, "Banach")), look(t, at(0, "whose"), at(1) - 0.2, 1, 0.6), spin(t, b[3][1] - 0.5)) +
  label("W", 0.7, 3.4, 0.9, "text", pop(t, at(0, "W k p"))) +
  label("k,p", 1.5, 3.7, 0.4, "text", pop(t, at(0, "W k p") + 0.1)) +
  label("u and its weak derivatives", 1.6, 2.5, 0.4, "sky", pop(t, at(0, "functions"))) +
  label("up to order k are in L", 1.4, 2.05, 0.4, "sky", pop(t, at(0, "up to"))) +
  label("p", 3.52, 2.2, 0.28, "sky", pop(t, at(0, "up to"))) +
  label("Norm: sum of the sizes", 1.6, 1.3, 0.4, "green", pop(t, at(1, "norm"))) +
  label("Banach space", 1.6, 0.7, 0.4, "gold", pop(t, at(2, "Banach"))) +
  label("p = 2: Hilbert space H", 1.5, 0.1, 0.4, "hotpink", pop(t, at(3, "Hilbert"))) +
  label("k", 3.72, 0.3, 0.28, "hotpink", pop(t, at(3, "Hilbert")))
);
