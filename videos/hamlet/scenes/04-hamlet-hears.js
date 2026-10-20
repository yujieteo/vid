scene([
  "Horatio comes to see Hamlet. He says: “My lord, I think I saw him yesternight.”",
  "Hamlet asks: “Saw? Who?” Horatio says it was the King, the father of Hamlet.",
  "Horatio tells him about the ghost on the wall. Hamlet asks many questions.",
  "Did the ghost look angry? Horatio says: “A countenance more in sorrow than in anger.”",
  "Hamlet will watch with the guards that night.",
  "He says: “My father's spirit in arms! All is not well.”",
  ["He thinks: “I doubt some foul play: would the night were come!”", 0.4],
], (t, at, b) =>
  hact(1, t) + hn(t, look(t, at(0, "Horatio"), at(1) - 0.2, 1)) +
  hb("hamlet", -1.4, t, pop(t, 0.2), look(t, at(1, "Hamlet"), at(2) , 1), squash(t, at(1, "Saw")), wave(t, at(5, "My father"), 1.2, 6), squint(t, at(6, "He thinks"), 2)) +
  hb("horatio", 0.4, t, pop(t, at(0, "Horatio")), hop(t, at(0, "comes"), 0.25), look(t, at(2, "ghost"), at(3) - 0.2, -1)) +
  hb("marcellus", 2.2, t, pop(t, at(4, "guards")), look(t, at(4, "guards"), at(5), -1)) +
  hb("barnardo", 3.9, t, pop(t, at(4, "guards") + 0.15), look(t, at(4, "guards"), at(5), -1)) +
  hsay(["My lord, I think I saw him", "yesternight."], 1.4, 3.3, "sky", pop(t, at(0, "My lord")), out(t, at(1) - 0.1)) +
  hsay(["Saw? Who?"], 1.4, 3.3, "violet", pop(t, at(1, "Saw")), out(t, at(1, "Horatio says") - 0.1)) +
  hsay(["A countenance more in sorrow", "than in anger."], 1.4, 3.3, "sky", pop(t, at(3, "A countenance")), out(t, at(4) - 0.1)) +
  hsay(["My father's spirit in arms!", "All is not well."], 1.4, 3.3, "violet", pop(t, at(5, "My father")), out(t, at(6) - 0.1)) +
  hsay(["I doubt some foul play:", "would the night were come!"], 1.4, 3.3, "violet", pop(t, at(6, "I doubt"))));
