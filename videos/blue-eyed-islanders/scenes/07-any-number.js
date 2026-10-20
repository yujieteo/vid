scene([
  "The pattern is the same for any number.",
  "Say n people have blue eyes. Then they all leave on day n.",
  ["Each of them waits. They think: if I have brown eyes, then only n minus 1 people have blue eyes. They leave on day n minus 1.", 0.6],
  ["Day n minus 1 comes, and nobody leaves. So each person knows they have blue eyes too.", 0.6],
  ["On this island, 100 people have blue eyes. So all 100 leave on day 100.", 1],
], (t, at, b) => {
  const COLORS = ["green", "gold", "red", "orange"], X = [-0.9, 0.7, 2.3, 3.9];
  const person = (i) => islander(X[i], t, COLORS[i], "blue", { s: 0.7 }, pop(t, at(1, "n people") + 0.1 * i),
    wave(t, at(2, "waits"), 2, 4), squint(t, at(2, "think"), 2.5),                    // waits and thinks
    squash(t, at(3, "So each") + 0.06 * i),                                           // knows
    spin(t, at(4, "leave") + 0.06 * i), out(t, at(4, "leave") + 0.9 + 0.06 * i));     // done: leaves
  const day = (text, from, to) => label(text, 1.6, 3.7, 0.6, "text", pop(t, from), out(t, to));
  return mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "same")), blink(t, b[3][1]), hop(t, at(4, "So all"))) +
    [0, 1, 2, 3].map(person).join("") +
    label("n blue-eyed people", 1.6, 2.6, 0.5, "blue", pop(t, at(1, "n people")), out(t, at(4))) +
    label("100 blue-eyed people", 1.6, 2.6, 0.5, "blue", pop(t, at(4, "100 people"))) +
    day("Day n", at(1, "day n"), at(2, "Each")) +
    day("Day n-1", at(2, "They leave"), at(3, "Day n minus 1 comes")) +
    label("Day n-1: nobody leaves", 1.6, 3.7, 0.5, "blue", pop(t, at(3, "nobody")), out(t, at(4))) +
    label("Day 100", 1.6, 3.7, 0.6, "text", pop(t, at(4, "day 100")));
});
