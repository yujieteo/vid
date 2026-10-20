scene([
  "On this island, 100 people have blue eyes.",
  ["And 900 people have brown eyes.", 0.5],
  "The people do not know these numbers.",
  "One day, a visitor arrives. The visitor also has blue eyes.",
  ["The visitor says: it is unusual to see another blue-eyed person here.", 1],
], (t, at, b) => {
  const big = { s: 1.3 };
  return islander(0.4, t, "blue", "ball", big, pop(t, at(0, "100")), blink(t, b[2][0])) +
    label("100", 0.4, 2.5, 1, "blue", pop(t, at(0, "100") + 0.2)) +
    islander(3.4, t, "brown", "ball", big, pop(t, at(1, "900")), blink(t, b[2][0] + 0.2)) +
    label("900", 3.4, 2.5, 1, "amber", pop(t, at(1, "900") + 0.2)) +
    islander(-7, t, "blue", "ball", big, walk(t, at(3, "visitor") - 0.3, at(3, "arrives") + 0.9, 3),
      hop(t, at(3, "also")), hop(t, at(4, "says"), 0.3)) +
    label("Unusual to see another", -1.6, 3.8, 0.38, "text", pop(t, at(4, "unusual"))) +
    label("blue-eyed person here!", -1.6, 3.3, 0.38, "text", pop(t, at(4, "blue-eyed")));
});
