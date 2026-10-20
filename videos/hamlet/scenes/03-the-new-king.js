scene([
  "Claudius speaks to the court. He took Gertrude as his wife.",
  "The old King died two months ago. Hamlet still wears black.",
  "Claudius calls Hamlet his son. Hamlet says to himself: “A little more than kin, and less than kind.”",
  "Claudius asks why the clouds still hang on Hamlet. Hamlet says: “Not so, my lord, I am too much i' the sun.”",
  "The Queen asks Hamlet not to go back to school in Wittenberg. Hamlet says he will obey her.",
  "Laertes asks to go back to France. Claudius says yes.",
  "Alone, Hamlet thinks of his mother. She married Claudius in a month.",
  ["He says: “Frailty, thy name is woman!”", 0.4],
], (t, at, b) =>
  hact(1, t) + hn(t, look(t, at(2, "Hamlet says"), at(3) - 0.2, 1)) +
  hb("hamlet", -1.4, t, pop(t, at(1, "Hamlet")), squint(t, at(1, "black"), 1.2), look(t, at(2, "Claudius"), at(2, "Hamlet says"), 1), wave(t, at(7, "Frailty"), 1.2, 6)) +
  hb("gertrude", 0.4, t, pop(t, at(0, "Gertrude")), hop(t, at(4, "Queen"), 0.25)) +
  hb("claudius", 2.2, t, pop(t, at(0, "Claudius")), hop(t, at(2, "calls"), 0.25), squash(t, at(5, "yes"))) +
  hprop("crown", 2.2, 1.55, "gold", pop(t, at(0, "Claudius") + 0.3)) +
  hb("laertes", 3.9, t, pop(t, at(5, "Laertes")), hop(t, at(5, "go back"), 0.25)) +
  hsay(["A little more than kin,", "and less than kind."], 1.4, 3.3, "violet", pop(t, at(2, "A little")), out(t, at(3) - 0.1)) +
  hsay(["Not so, my lord,", "I am too much i' the sun."], 1.4, 3.3, "violet", pop(t, at(3, "Not so")), out(t, at(4) - 0.1)) +
  hsay(["Frailty, thy name is woman!"], 1.4, 3.3, "violet", pop(t, at(7, "Frailty"))));
