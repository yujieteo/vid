scene([
  "Now two people have blue eyes. Call them Ana and Ben.",
  "Ana sees that Ben has blue eyes. She does not know her own eye color.",
  "Ana thinks: if my eyes are brown, Ben sees no blue eyes. Then Ben leaves on day 1.",
  ["Day 1 comes. Ben does not leave.", 0.8],
  "So Ben must see another blue-eyed person. That person is Ana. Ben thinks the same about Ana.",
  ["On day 2, both of them leave.", 2.3],
], (t, at, b) => {
  const EYES = ["brown", "blue", "brown", "blue", "brown"], X = row(5, 1.2), ANA = 1, BEN = 3, go = at(5, "leave");
  const acts = {
    [ANA]: [glance(t, at(1, "sees")), hop(t, at(4, "That person")), leave(t, go)],
    [BEN]: [blink(t, at(3, "does not")), hop(t, at(4, "Ben thinks")), leave(t, go + 0.15)],
  };
  const person = (i) => islander(X[i], t, EYES[i], i % 2 ? "squircle" : "ball", pop(t, b[0][0] + 0.1 * i), acts[i] ?? []);
  return islander(-4.4, t, "blue", "ball", { s: 1.2 }, pop(t, 0.1)) +
    person(ANA) + person(BEN) + [0, 2, 4].map(person).join("") +   // the ones who leave walk behind the row
    label("Ana", X[ANA], 2.0, 0.5, "blue", pop(t, at(0, "Ana")), out(t, go)) +
    label("Ben", X[BEN], 2.0, 0.5, "blue", pop(t, at(0, "Ben")), out(t, go)) +
    label("?", X[ANA], 2.9, 0.8, "blue", pop(t, at(1, "She")), out(t, at(4, "That person"))) +
    label("Day 1", 1.2, 3.8, 0.7, "text", pop(t, at(2, "day 1")), out(t, at(5) - 0.3)) +
    label("Day 2", 1.2, 3.8, 0.7, "text", pop(t, at(5, "day 2")));
});
