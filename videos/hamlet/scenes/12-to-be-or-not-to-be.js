scene([
  "Claudius and Polonius make a plan. Ophelia will meet Hamlet, and they will hide and watch.",
  "Hamlet comes in alone. He does not see Ophelia, and he speaks to himself.",
  "He says: “To be, or not to be, that is the question:”",
  "He thinks about death. Death is like a sleep, and it ends the pain of life.",
  "But he fears what comes after. No one comes back from that land to say what it is.",
  "So people bear the bad things that they know, and they do not go to the things that they do not know.",
  ["He says: “Thus conscience does make cowards of us all,”", 0.4],
  "Hamlet does not act. He only thinks about it.",
], (t, at, b) =>
  hact(3, t) + hn(t, look(t, at(1, "Hamlet comes"), at(2), 1)) +
  hb("claudius", 3.0, t, { s: 0.55 }, pop(t, 0.2), out(t, at(1, "Hamlet comes") - 0.2)) +
  hb("polonius", 4.4, t, { s: 0.55 }, pop(t, 0.3), out(t, at(1, "Hamlet comes") - 0.2)) +
  hb("hamlet", -0.4, t, pop(t, at(1, "Hamlet comes")), look(t, at(2, "He says"), at(3), 1, 0.4), squint(t, at(3, "death"), 2), wave(t, at(6, "He says"), 1.2, 6), look(t, at(7, "Hamlet does"), at(7) + 2, -1)) +
  hprop("skull", 2.4, 0.2, "white", pop(t, at(3, "death")), out(t, at(5) - 0.2)) +
  hsay(["To be, or not to be,", "that is the question:"], 1.4, 3.3, "violet", pop(t, at(2, "To be")), out(t, at(3) - 0.1)) +
  hsay(["Thus conscience does make", "cowards of us all,"], 1.4, 3.3, "violet", pop(t, at(6, "Thus"))));
