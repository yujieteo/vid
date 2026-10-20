scene([
  "Laertes falls. He says: “Hamlet, thou art slain.” The sword that wounded Hamlet had poison on it.",
  "He tells Hamlet that his mother has poison from the cup. He says: “The King, the King's to blame.”",
  ["Hamlet says: “Then, venom, to thy work.” He stabs Claudius.", 0.2],
  "He forces the King to drink from the cup. He says: “Drink off this potion.”",
  "Claudius dies. Laertes asks: “Exchange forgiveness with me, noble Hamlet.” Then Laertes dies.",
  "Horatio takes the cup. He wants to die with Hamlet. Hamlet takes it from him and says: “Give me the cup.”",
  "Hamlet asks Horatio to live and to tell his story. He says: “Absent thee from felicity awhile,”",
  "Far away, guns fire. Fortinbras has come from Poland. Hamlet says that Fortinbras will be the next King.",
  ["Hamlet says: “The rest is silence.” Then he dies.", 0.5],
  "Horatio says: “Now cracks a noble heart. Good night, sweet prince,”",
], (t, at, b) =>
  hact(5, t) + hn(t, look(t, at(0, "Laertes falls"), at(8), 1)) +
  hb("laertes", -2.0, t, pop(t, 0.2), squash(t, at(0, "Laertes falls")), out(t, at(4, "Then") + 0.3)) +
  hb("claudius", 2.6, t, pop(t, 0.2), squash(t, at(2, "He stabs")), out(t, at(4, "Claudius dies") + 0.3)) +
  hb("hamlet", 0.2, t, pop(t, 0.3), hop(t, at(2, "Hamlet says"), 0.3), wave(t, at(3, "He forces"), 1.2, 8), wave(t, at(6, "Hamlet asks"), 1.2, 6), squint(t, at(8, "Hamlet says"), 2), out(t, at(8, "Then he dies") + 0.6)) +
  hb("horatio", 4.2, t, pop(t, at(5, "Horatio") - 0.2), hop(t, at(5, "takes"), 0.25), look(t, at(6, "Hamlet asks"), at(8), -1)) +
  hprop("cup", 2.6, 1.8, "green", pop(t, at(1, "cup")), out(t, at(5, "Horatio takes") + 1)) +
  hsay(["Hamlet, thou art slain."], -1.0, 3.3, "green", pop(t, at(0, "He says")), out(t, at(1) - 0.1)) +
  hsay(["The King, the King's to blame."], -1.0, 3.3, "green", pop(t, at(1, "He says")), out(t, at(2) - 0.1)) +
  hsay(["Then, venom, to thy work."], -1.0, 3.3, "violet", pop(t, at(2, "Hamlet says")), out(t, at(3) - 0.1)) +
  hsay(["Drink off this potion."], -1.0, 3.3, "violet", pop(t, at(3, "He says")), out(t, at(4) - 0.1)) +
  hsay(["Exchange forgiveness with me,", "noble Hamlet."], -1.0, 3.3, "green", pop(t, at(4, "Laertes asks")), out(t, at(5) - 0.1)) +
  hsay(["Give me the cup."], -1.0, 3.3, "violet", pop(t, at(5, "Give")), out(t, at(6) - 0.1)) +
  hsay(["Absent thee from felicity awhile,"], -1.0, 3.3, "violet", pop(t, at(6, "He says")), out(t, at(7) - 0.1)) +
  hsay(["The rest is silence."], -1.0, 3.3, "violet", pop(t, at(8, "Hamlet says")), out(t, at(9) - 0.1)) +
  hsay(["Now cracks a noble heart.", "Good night, sweet prince,"], -1.0, 3.3, "sky", pop(t, at(9, "Horatio says"))));
