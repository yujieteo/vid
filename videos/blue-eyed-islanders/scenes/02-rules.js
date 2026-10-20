scene([
  "An island has many people.",
  ["Each person has blue eyes or brown eyes.", 0.5],
  "Everyone can see the eyes of all the other people. But nobody can see their own eyes.",
  "Nobody may talk about eye color.",
  ["If a person learns their own eye color, that person must leave the island. They leave at noon the next day.", 1.2],
  "Everyone is perfectly logical, and everyone knows that the others are too.",
], (t, at, b) => {
  const WHO = [["violet", "brown"], ["gold", "blue"], ["blue", "brown"], ["green", "blue"], ["sky", "brown"]];
  const X = [-3.8, -1.9, 0, 1.9, 3.8], KNOWS = 3, ME = 1;
  const person = (i) => islander(X[i], t, WHO[i][0], WHO[i][1], { s: 0.85 }, pop(t, b[0][0] + 0.12 * i),
    hop(t, at(1, WHO[i][1] === "blue" ? "blue" : "brown"), 0.3),                       // each color shows itself
    glance(t, at(2, "Everyone"), 1.6),                                                 // all see the others
    i === ME ? look(t, at(2, "But"), at(3) - 0.2, 0, -1) : [],                        // 1 looks down at itself
    wave(t, at(3, "talk"), 0.7, 5),                                                    // blocked: no talk
    i === KNOWS ? [squash(t, at(4, "learns")), spin(t, at(4, "They leave")), out(t, at(4, "noon") + 0.2)]
      : [look(t, at(5, "perfectly"), b[5][1], i - 2 > 0 ? -0.6 : 0.6, 0.8), squint(t, at(5, "perfectly"), 2)]);   // thinking
  return [0, 1, 2, 3, 4].map(person).join("") +
    label("?", X[ME], 2.35, 0.8, "text", pop(t, at(2, "But")), out(t, at(3))) +
    label("No talk about eye color", 0, 3.7, 0.45, "text", pop(t, at(3, "Nobody")), out(t, at(4))) +
    label("Noon, next day", 0, 3.7, 0.45, "text", pop(t, at(4, "noon")), out(t, at(5)));
});
