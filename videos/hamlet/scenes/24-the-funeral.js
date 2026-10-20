scene([
  "A line of people comes to the churchyard. It is a funeral.",
  "The King and the Queen are there, and Laertes. Hamlet and Horatio hide and watch.",
  "Hamlet sees that the dead person is Ophelia. He says: “What, the fair Ophelia?”",
  "Gertrude scatters flowers on the coffin. She says: “Sweets to the sweet. Farewell.”",
  "She says that she hoped Ophelia would be the wife of Hamlet.",
  "Laertes jumps into the grave. He wants to hold his sister once more.",
  "Hamlet cannot stay hidden. He steps forward and says: “This is I, Hamlet the Dane.”",
  "He jumps into the grave too, and the two men fight.",
  "The Queen says that Hamlet is mad. The people pull the two men apart.",
], (t, at, b) =>
  hact(5, t) + hn(t, look(t, at(5, "Laertes jumps"), at(8), 1)) +
  hb("claudius", 1.9, t, pop(t, at(1, "The King")), squint(t, at(8, "The Queen"), 2)) +
  hb("gertrude", 3.0, t, pop(t, at(1, "Queen")), hop(t, at(3, "Gertrude"), 0.2)) +
  hprop("flower", 3.0, 1.8, "orange", pop(t, at(3, "scatters")), out(t, at(4) - 0.2)) +
  hb("laertes", 0.0, t, pop(t, at(1, "Laertes")), hop(t, at(5, "Laertes jumps"), 0.4), wave(t, at(7, "He jumps"), 1.5, 14)) +
  hb("horatio", 4.5, t, { s: 0.6 }, pop(t, at(1, "Hamlet and")), look(t, at(6, "Hamlet cannot"), at(8), -1)) +
  hb("hamlet", -1.8, t, { s: 0.7 }, pop(t, at(1, "Hamlet and") + 0.1), squash(t, at(2, "Hamlet sees")), wave(t, at(6, "This is"), 1.2, 6), wave(t, at(7, "He jumps"), 1.5, 14)) +
  hsay(["What, the fair Ophelia?"], 0.4, 3.3, "violet", pop(t, at(2, "He says")), out(t, at(3) - 0.1)) +
  hsay(["Sweets to the sweet.", "Farewell."], 0.4, 3.3, "blue", pop(t, at(3, "She says")), out(t, at(4) - 0.1)) +
  hsay(["This is I,", "Hamlet the Dane."], 0.4, 3.3, "violet", pop(t, at(6, "Hamlet cannot")), out(t, at(7) - 0.1)));
