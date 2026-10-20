scene([
  "Now two people have blue eyes. Call them Ana and Ben.",
  "Ana sees that Ben has blue eyes. She does not know her own eye color.",
  "Ana thinks: if my eyes are brown, Ben sees no blue eyes. Then Ben leaves on day 1.",
  ["Day 1 comes. Ben does not leave.", 0.8],
  "So Ben must see another blue-eyed person. That person is Ana. Ben thinks the same about Ana.",
  ["On day 2, both of them leave.", 2.3],
], (t, at, b) => {
  const WHO = [["violet", "brown"], ["gold", "blue"], ["blue", "brown"], ["green", "blue"], ["sky", "brown"]], X = [-3.8, -1.9, 0, 1.9, 3.8];
  const ANA = 1, BEN = 3, go = at(5, "leave");
  const acts = {
    [ANA]: [look(t, at(1, "sees"), at(1, "She"), 1), look(t, at(2, "thinks"), at(3) - 0.2, 0.5, 1), squint(t, at(2, "thinks"), 3),   // sees Ben, then thinks
      squash(t, at(4, "That person")), spin(t, go), out(t, go + 1)],                                                                 // knows, then leaves
    [BEN]: [wave(t, at(3, "Day 1"), 2.4, 4), squash(t, at(4, "Ben thinks")), spin(t, go + 0.15), out(t, go + 1.15)],                // waits, knows, leaves
  };
  const waiting = (i) => (i === ANA || i === BEN ? [] : blink(t, at(3, "Day 1") + 0.1 * i));
  const person = (i) => islander(X[i], t, WHO[i][0], WHO[i][1], { s: 0.85 }, pop(t, b[0][0] + 0.12 * i), acts[i] ?? waiting(i));
  return [0, 1, 2, 3, 4].map(person).join("") +
    label("Ana", X[ANA], 2.45, 0.5, "text", pop(t, at(0, "Ana")), out(t, go)) +
    label("Ben", X[BEN], 2.45, 0.5, "text", pop(t, at(0, "Ben")), out(t, go)) +
    label("?", X[ANA], 3.2, 0.7, "blue", pop(t, at(1, "She")), out(t, at(4, "That person"))) +
    label("Day 1", 0, 3.8, 0.7, "text", pop(t, at(2, "day 1")), out(t, at(5) - 0.3)) +
    label("Day 2", 0, 3.8, 0.7, "text", pop(t, at(5, "day 2")));
});
