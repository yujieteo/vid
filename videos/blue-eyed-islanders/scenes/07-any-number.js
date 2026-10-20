scene([
  "The pattern is the same for any number.",
  "Say n people have blue eyes. Then they all leave on day n.",
  ["Each of them waits. They think: if I have brown eyes, then only n minus 1 people have blue eyes. They leave on day n minus 1.", 0.6],
  ["Day n minus 1 comes, and nobody leaves. So each person knows they have blue eyes too.", 0.6],
  ["On this island, 100 people have blue eyes. So all 100 leave on day 100.", 1],
], (t, at, b) => {
  const lines = [
    ["n blue-eyed people", 3.4, 0.6, "blue", at(1, "n people")],
    ["leave on day n", 2.6, 0.6, "text", at(1, "leave")],
    ["If I am brown-eyed:", 1.7, 0.4, "text", at(2, "if I")],
    ["n-1 people leave on day n-1.", 1.2, 0.4, "text", at(2, "only")],
    ["Day n-1: nobody leaves.", 0.6, 0.4, "blue", at(3, "nobody")],
  ];
  return mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "same")), blink(t, b[3][1]), hop(t, at(4, "So all"))) +
    lines.map(([text, z, size, color, t0], i) => label(text, 1.4, z, size, color, pop(t, t0), out(t, at(4) + 0.06 * i))).join("") +
    label("100 blue-eyed people", 1.4, 3.0, 0.6, "blue", pop(t, at(4, "100 people"))) +
    label("leave on day 100", 1.4, 2.0, 0.6, "text", pop(t, at(4, "day 100")));
});
