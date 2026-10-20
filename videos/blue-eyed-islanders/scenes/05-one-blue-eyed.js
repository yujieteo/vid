scene([
  "Start with a tiny island. Only one person has blue eyes.",
  "That person sees only brown eyes.",
  "The visitor says: there is a blue-eyed person here.",
  ["The person looks around. They see no blue eyes. So it must be them.", 0.5],
  ["They leave at noon the next day. That is day 1.", 1],
], (t, at, b) => {
  const WHO = [["violet", "brown"], ["red", "blue"], ["blue", "brown"], ["sky", "brown"]], X = [-2.4, -0.5, 1.4, 3.3], ME = 1;
  const person = (i) => islander(X[i], t, WHO[i][0], WHO[i][1], { s: 0.85 }, pop(t, b[0][0] + 0.12 * i),
    i === ME ? [glance(t, at(1, "sees"), 1.6), look(t, at(2, "says"), at(3) - 0.2, -1, 0.3),            // sees only brown, hears the visitor
      glance(t, at(3, "looks"), 1.6), squash(t, at(3, "So it")),                                         // thinks, then knows
      spin(t, at(4, "leave")), out(t, at(4, "leave") + 1)]                                               // done: leaves
    : blink(t, at(1, "brown") + 0.1 * i));
  return [0, 1, 2, 3].map(person).join("") +
    islander(-4.1, t, "orange", "blue", { s: 0.85 }, pop(t, at(2, "visitor")), hop(t, at(2, "says"), 0.3), out(t, b[2][1] + 0.3)) +
    label("Blue eyes are here!", -2.2, 3.2, 0.4, "text", pop(t, at(2, "there")), out(t, b[2][1] + 0.3)) +
    label("?", X[ME], 2.3, 0.8, "blue", pop(t, at(1)), out(t, at(3, "So it"))) +
    label("Day 1", 1.2, 3.6, 0.8, "text", pop(t, at(4, "day 1")));
});
