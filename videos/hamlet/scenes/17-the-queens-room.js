scene([
  "Hamlet goes to the room of the Queen. Polonius hides behind a curtain to listen.",
  "Hamlet says: “Mother, you have my father much offended.” The Queen is afraid.",
  "She thinks that he will kill her, and she cries for help.",
  "Polonius cries out from behind the curtain. Hamlet stabs through it.",
  "A voice says: “O, I am slain!” Hamlet asks: “Is it the King?”",
  "It is Polonius. Hamlet says: “Thou wretched, rash, intruding fool, farewell!”",
  "The Queen says it was a rash and bloody deed. Hamlet says it was almost as bad as to kill a king and marry his brother.",
  "Then the ghost comes. Hamlet sees it, but Gertrude does not see it.",
  ["She says: “Nothing at all; yet all that is I see.” She thinks that Hamlet is mad.", 0.2],
  "Hamlet says he is not mad. He asks her to stay away from Claudius.",
  ["He says: “I must be cruel, only to be kind:”", 0.4],
], (t, at, b) =>
  hact(3, t) + hn(t, look(t, at(3, "Polonius cries"), at(7), 1)) +
  hb("gertrude", -1.4, t, pop(t, 0.2), squash(t, at(2, "cries")), look(t, at(7, "Then"), at(8), 1), out(t, at(10) + 1.6)) +
  hb("polonius", 4.4, t, { s: 0.8 }, pop(t, 0.3), out(t, at(5, "It is") - 0.2)) +
  hb("hamlet", 0.8, t, pop(t, at(0, "Hamlet")), wave(t, at(1, "Hamlet says"), 1.2, 6), hop(t, at(3, "Hamlet stabs"), 0.3), look(t, at(7, "Hamlet sees"), at(8), 1), wave(t, at(10, "He says"), 1.2, 6)) +
  hb("ghost", 2.8, t, pop(t, at(7, "ghost")), out(t, at(9) - 0.2)) +
  hprop("sword", 0.8, 2.0, "text", pop(t, at(3, "stabs")), out(t, at(5) - 0.2)) +
  hsay(["Mother, you have my father", "much offended."], -1.4, 3.3, "violet", pop(t, at(1, "Hamlet says")), out(t, at(2) - 0.1)) +
  hsay(["O, I am slain!"], -1.4, 3.3, "gold", pop(t, at(4, "A voice")), out(t, at(4, "Hamlet asks") - 0.1)) +
  hsay(["Is it the King?"], -1.4, 3.3, "violet", pop(t, at(4, "Hamlet asks")), out(t, at(5) - 0.1)) +
  hsay(["Thou wretched, rash,", "intruding fool, farewell!"], -1.4, 3.3, "violet", pop(t, at(5, "Hamlet says")), out(t, at(6) - 0.1)) +
  hsay(["Nothing at all;", "yet all that is I see."], -1.4, 3.3, "blue", pop(t, at(8, "She says")), out(t, at(9) - 0.1)) +
  hsay(["I must be cruel,", "only to be kind:"], -1.4, 3.3, "violet", pop(t, at(10, "He says"))));
