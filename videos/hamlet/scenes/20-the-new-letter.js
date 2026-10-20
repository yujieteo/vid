scene([
  "Later, Hamlet tells Horatio how he found out the plan of the King.",
  "On the ship he took the letter of Claudius from Rosencrantz and Guildenstern, and he read it.",
  "It said that the King of England must kill Hamlet at once.",
  "Hamlet wrote a new letter. It said that the two men must die.",
  ["He says: “I had my father's signet in my purse,”", 0.2],
  "He sealed the new letter with the ring. No one knew that it was not the old letter.",
  "Rosencrantz and Guildenstern are dead. Hamlet says: “They are not near my conscience;”",
  "Then Osric comes with a message from the King. The King wants a fencing match between Hamlet and Laertes.",
  "Horatio says that Hamlet will lose. Hamlet says he will win, but his heart is not at peace.",
  ["He says: “The readiness is all.”", 0.5],
], (t, at, b) =>
  hact(5, t) + hn(t, look(t, at(1, "On the ship"), at(7), 1)) +
  hb("hamlet", -0.4, t, pop(t, 0.2), wave(t, at(0, "Later"), 1.5, 8), hop(t, at(3, "Hamlet wrote"), 0.2), wave(t, at(4, "He says"), 1.2, 6), squint(t, at(8, "Hamlet says"), 1.5), wave(t, at(9, "He says"), 1.2, 6)) +
  hb("horatio", 1.8, t, pop(t, 0.3), look(t, at(1, "On the ship"), at(2), -1), squash(t, at(8, "Horatio says"))) +
  hb("rosencrantz", 3.2, t, { s: 0.6 }, pop(t, at(1, "Rosencrantz")), out(t, at(3, "It said") + 0.2)) +
  hb("guildenstern", 4.3, t, { s: 0.6 }, pop(t, at(1, "Guildenstern")), out(t, at(3, "It said") + 0.2)) +
  hb("osric", 3.2, t, pop(t, at(7, "Osric")), hop(t, at(7, "comes"), 0.2)) +
  hprop("letter", 1.8, 1.9, "white", pop(t, at(2, "It said")), out(t, at(3) - 0.2)) +
  hprop("letter", -0.4, 1.9, "gold", pop(t, at(3, "new letter")), out(t, at(5) + 1)) +
  hsay(["I had my father's", "signet in my purse,"], -1.4, 3.3, "violet", pop(t, at(4, "He says")), out(t, at(5) - 0.1)) +
  hsay(["They are not near", "my conscience;"], -1.4, 3.3, "violet", pop(t, at(6, "Hamlet says")), out(t, at(7) - 0.1)) +
  hsay(["The readiness is all."], -1.4, 3.3, "violet", pop(t, at(9, "He says"))));
