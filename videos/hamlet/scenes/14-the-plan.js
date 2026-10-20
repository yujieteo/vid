scene([
  "Hamlet has a plan to test the King. He asks Horatio for help.",
  "He says that Horatio is a man who is not the slave of his feelings. He says: “Give me that man”",
  "During the play, Horatio must watch the King with one eye, and Hamlet will watch with the other.",
  "If the King does not show his guilt, then the ghost is a devil.",
  "The court comes in: the King, the Queen, Polonius and Ophelia. Hamlet puts on his strange act.",
  "He talks to Ophelia in a rude way. She says that he is sharp.",
  "The play starts with a dumb show. It shows a King who sleeps, and a man who pours poison in his ear.",
  "Claudius does not move. Ophelia asks what the show means.",
], (t, at, b) =>
  hact(3, t) + hn(t, look(t, at(2, "During"), at(4), 1)) +
  hb("hamlet", -1.4, t, pop(t, 0.2), hop(t, at(0, "asks"), 0.2), look(t, at(2, "During"), at(3), 1), squint(t, at(4, "strange"), 1.5), wave(t, at(5, "He talks"), 1.5, 8)) +
  hb("horatio", 0.4, t, pop(t, at(0, "Horatio")), look(t, at(2, "Horatio must"), at(4), 1), squint(t, at(2, "watch"), 2)) +
  hb("claudius", 2.0, t, pop(t, at(4, "court")), squint(t, at(7, "Claudius"), 1.5)) +
  hb("gertrude", 3.2, t, { s: 0.7 }, pop(t, at(4, "court") + 0.15)) +
  hb("ophelia", 4.2, t, { s: 0.7 }, pop(t, at(4, "court") + 0.3), hop(t, at(7, "Ophelia"), 0.15)) +
  hprop("cup", 0.4, 2.1, "green", pop(t, at(6, "poison")), out(t, at(7, "Claudius") - 0.2)) +
  hsay(["Give me that man"], -1.0, 3.3, "violet", pop(t, at(1, "Give me")), out(t, at(2) - 0.1)));
