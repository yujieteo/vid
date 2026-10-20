scene([
  "Sailors bring a letter to Horatio. It is from Hamlet.",
  "Hamlet writes that a pirate ship chased his ship two days after it left.",
  ["He says: “I alone became their prisoner.”", 0.2],
  "The pirates treated him well, because they knew he could pay them back for it.",
  "Hamlet asks Horatio to come to him with as much haste as he would fly death.",
  "He has words to tell that will make Horatio dumb.",
  "Rosencrantz and Guildenstern go on to England.",
  ["Hamlet writes: “of them I have much to tell thee.”", 0.4],
  "Hamlet is alive and he is coming back to Denmark.",
], (t, at, b) =>
  hact(4, t) + hn(t, look(t, at(1, "Hamlet writes"), at(4), 1)) +
  hb("horatio", -0.8, t, pop(t, 0.2), hop(t, at(0, "letter"), 0.25), look(t, at(1, "Hamlet writes"), at(4), 1), squash(t, at(5, "dumb")), look(t, at(8, "Hamlet is"), at(8) + 2, 1)) +
  hb("digger", 1.8, t, pop(t, at(0, "Sailors")), hop(t, at(0, "bring"), 0.2), out(t, at(1, "Hamlet writes"))) +
  hb("digger", 3.2, t, { s: 0.7 }, pop(t, at(0, "Sailors") + 0.15), out(t, at(1, "Hamlet writes"))) +
  hprop("letter", 1.8, 1.9, "white", pop(t, at(0, "letter")), out(t, at(2) - 0.2)) +
  hb("hamlet", 2.4, t, pop(t, at(1, "Hamlet writes") + 0.3), wave(t, at(2, "He says"), 1.2, 6), hop(t, at(8, "Hamlet is"), 0.3)) +
  hb("rosencrantz", 4.0, t, { s: 0.6 }, pop(t, at(6, "Rosencrantz")), out(t, at(7) + 1.2)) +
  hsay(["I alone became", "their prisoner."], 0.4, 3.3, "violet", pop(t, at(2, "He says")), out(t, at(3) - 0.1)) +
  hsay(["of them I have much", "to tell thee."], 0.4, 3.3, "violet", pop(t, at(7, "Hamlet writes"))));
