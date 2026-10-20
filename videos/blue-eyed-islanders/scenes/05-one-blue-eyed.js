scene([
  "Start with a tiny island. Only one person has blue eyes.",
  "That person sees only brown eyes.",
  "The visitor says: there is a blue-eyed person here.",
  ["The person looks around. They see no blue eyes. So it must be them.", 0.5],
  ["They leave at noon the next day. That is day 1.", 1],
], (t, at, b) => {
  const EYES = ["brown", "brown", "blue", "brown", "brown"], X = row(5, 1.2), BLUE = 2;
  const person = (i) => islander(X[i], t, EYES[i], i % 2 ? "squircle" : "ball", pop(t, b[0][0] + 0.1 * i),
    i === BLUE ? [glance(t, at(3, "looks")), hop(t, at(3, "So it")), leave(t, at(4, "leave"))] : blink(t, at(1, "brown") + 0.1 * i));
  return islander(-4.4, t, "blue", "ball", { s: 1.2 }, pop(t, 0.1), hop(t, at(2, "says"), 0.3)) +
    label("Blue eyes are here!", -2.3, 2.9, 0.4, "text", pop(t, at(2, "there"))) +
    person(BLUE) + [0, 1, 3, 4].map(person).join("") +   // the one who leaves walks behind the row
    label("?", X[BLUE], 2.2, 0.9, "blue", pop(t, at(1)), out(t, at(3, "So it"))) +
    label("Day 1", 1.2, 3.6, 0.8, "text", pop(t, at(4, "day 1")));
});
