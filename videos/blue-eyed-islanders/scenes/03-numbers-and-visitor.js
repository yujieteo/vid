scene([
  "On this island, 100 people have blue eyes.",
  ["And 900 people have brown eyes.", 0.5],
  "The people do not know these numbers.",
  "One day, a visitor arrives. The visitor also has blue eyes.",
  ["The visitor says: it is unusual to see another blue-eyed person here.", 1],
], (t, at, b) =>
  islander(0.6, t, "red", "blue", pop(t, at(0, "100")), blink(t, b[2][0])) +
  label("100", 0.6, 2.7, 1, "blue", pop(t, at(0, "100") + 0.2)) +
  islander(3.5, t, "violet", "brown", pop(t, at(1, "900")), blink(t, b[2][0] + 0.2)) +
  label("900", 3.5, 2.7, 1, "text", pop(t, at(1, "900") + 0.2)) +
  islander(-3.4, t, "orange", "blue", pop(t, at(3, "visitor")), hop(t, at(3, "also"), 0.3), hop(t, at(4, "says"), 0.3)) +
  label("Visitor", -3.4, -0.55, 0.4, "text", pop(t, at(3, "visitor") + 0.2)) +
  label("A blue-eyed person here? Unusual!", -1.4, 3.95, 0.4, "text", pop(t, at(4, "unusual"))));
