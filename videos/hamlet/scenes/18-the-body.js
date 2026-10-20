scene([
  "Gertrude tells Claudius what Hamlet did. Claudius is afraid, because it could have been him.",
  "Rosencrantz and Guildenstern look for Hamlet. They ask where he put the body of Polonius.",
  ["Hamlet will not tell them. He says: “Safely stowed.”", 0.2],
  "At last Claudius asks him: “Now, Hamlet, where's Polonius?” Hamlet says: “At supper.”",
  "Claudius asks where. Hamlet says: “Not where he eats, but where he is eaten.”",
  "He means that worms are eating the old man. Claudius is angry.",
  "Claudius says that Hamlet must go to England at once, and he sends Rosencrantz and Guildenstern with him.",
  "Alone, the King writes a letter to the King of England. The letter asks for “The present death of Hamlet. Do it, England;”",
], (t, at, b) =>
  hact(4, t) + hn(t, look(t, at(3, "At last"), at(7), 1)) +
  hb("gertrude", -1.8, t, { s: 0.75 }, pop(t, 0.2), out(t, at(1, "Rosencrantz") - 0.2)) +
  hb("claudius", 2.8, t, pop(t, 0.2), squash(t, at(0, "afraid")), look(t, at(3, "At last"), at(5), -1), squint(t, at(5, "Claudius is"), 1.5), hop(t, at(7, "Alone"), 0.2)) +
  hb("rosencrantz", -1.2, t, { s: 0.7 }, pop(t, at(1, "Rosencrantz")), out(t, at(6, "Claudius says") + 1.5)) +
  hb("guildenstern", 0.2, t, { s: 0.7 }, pop(t, at(1, "Guildenstern")), out(t, at(6, "Claudius says") + 1.5)) +
  hb("hamlet", 1.6, t, pop(t, at(2, "Hamlet will")), wave(t, at(3, "Hamlet says"), 1.2, 6), squint(t, at(4, "Hamlet says"), 2), out(t, at(6, "Claudius says") + 2.5)) +
  hprop("letter", 2.8, 1.9, "white", pop(t, at(7, "writes"))) +
  hsay(["Safely stowed."], -1.0, 3.3, "violet", pop(t, at(2, "He says")), out(t, at(3) - 0.1)) +
  hsay(["Now, Hamlet,", "where's Polonius?"], -1.0, 3.3, "red", pop(t, at(3, "Now")), out(t, at(3, "Hamlet says") - 0.1)) +
  hsay(["At supper."], -1.0, 3.3, "violet", pop(t, at(3, "Hamlet says")), out(t, at(4) - 0.1)) +
  hsay(["Not where he eats,", "but where he is eaten."], -1.0, 3.3, "violet", pop(t, at(4, "Hamlet says")), out(t, at(5) - 0.1)) +
  hsay(["The present death of Hamlet.", "Do it, England;"], -1.0, 3.3, "red", pop(t, at(7, "The present"))));
