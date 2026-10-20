scene([
  "An island has many people.",
  ["Each person has blue eyes or brown eyes.", 0.5],
  "Everyone can see the eyes of all the other people. But nobody can see their own eyes.",
  "Nobody may talk about eye color.",
  ["If a person learns their own eye color, that person must leave the island. They leave at noon the next day.", 1.2],
  "Everyone is perfectly logical, and everyone knows that the others are too.",
], (t, at, b) => {
  const EYES = ["blue", "brown", "brown", "blue", "brown", "blue", "brown", "brown"], X = row(8, 0, 1.2), GONE = 3;
  const person = (i) => islander(X[i], t, EYES[i], i % 2 ? "squircle" : "ball",
    pop(t, b[0][0] + 0.1 * i), hop(t, at(1, "blue") + 0.08 * i, 0.35), blink(t, b[3][0] + 0.05 * i),
    i === GONE ? leave(t, at(4, "They leave")) : blink(t, b[5][0] + 0.05 * i));
  return ball(3.8, 3.6, 0.45, 0.45, "gold", pop(t, at(4, "noon"))) +
    person(GONE) + [0, 1, 2, 4, 5, 6, 7].map(person).join("") +   // the one who leaves walks behind the row
    label("?", X[GONE], 2.1, 0.9, "blue", pop(t, at(2, "But")), out(t, b[4][0]));
});
