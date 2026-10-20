scene([
  "Ophelia has some gifts from Hamlet. She says that she wants to give them back.",
  "Hamlet says: “I loved you not.” Ophelia says that she was the more deceived.",
  "He tells her again and again: “Get thee to a nunnery.”",
  "Hamlet leaves her. Ophelia is very sad. She says: “O, what a noble mind is here o'erthrown!”",
  "Claudius comes out of his hiding place. He says: “Love? His affections do not that way tend,”",
  "He thinks that Hamlet has a danger in his mind. He will send Hamlet to England.",
  ["He says: “he shall with speed to England”", 0.3],
  "Polonius is not sure. He asks the King to let Gertrude talk with Hamlet, and he will hide and listen.",
], (t, at, b) =>
  hact(3, t) + hn(t, look(t, at(1, "Hamlet says"), at(3), 1)) +
  hb("ophelia", 0.2, t, pop(t, 0.2), hop(t, at(0, "gifts"), 0.2), squash(t, at(1, "deceived")), squint(t, at(3, "Ophelia is"), 2)) +
  hprop("flower", 0.2, 1.9, "orange", pop(t, at(0, "gifts")), out(t, at(1) - 0.2)) +
  hb("hamlet", 2.2, t, pop(t, at(1, "Hamlet says")), wave(t, at(2, "He tells"), 1.5, 6), out(t, at(3, "Hamlet leaves") + 0.2)) +
  hb("claudius", 3.3, t, pop(t, at(4, "Claudius")), look(t, at(4, "He says"), at(5), -1), hop(t, at(6, "He says"), 0.2)) +
  hb("polonius", 4.6, t, { s: 0.7 }, pop(t, at(4, "Claudius") + 0.3), wave(t, at(7, "Polonius"), 1.5, 8)) +
  hsay(["I loved you not."], -1.0, 3.3, "violet", pop(t, at(1, "I loved")), out(t, at(2) - 0.1)) +
  hsay(["Get thee to a nunnery."], -1.0, 3.3, "violet", pop(t, at(2, "Get")), out(t, at(3) - 0.1)) +
  hsay(["O, what a noble mind", "is here o'erthrown!"], -1.0, 3.3, "orange", pop(t, at(3, "O,")), out(t, at(4) - 0.1)) +
  hsay(["Love? His affections", "do not that way tend,"], -1.0, 3.3, "red", pop(t, at(4, "Love")), out(t, at(6) - 0.1)) +
  hsay(["he shall with speed", "to England"], -1.0, 3.3, "red", pop(t, at(6, "He says"))));
