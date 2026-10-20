scene([
  "Fortinbras comes in with his men. He sees the dead and asks: “Where is this sight?”",
  "Horatio says that he will tell the world how all this came to be.",
  "Fortinbras says that he has a claim to the crown, and that he will take it.",
  "He orders his men: “Take up the bodies.” He says that Hamlet must be carried like a soldier.",
  ["He says: “Go, bid the soldiers shoot.”", 0.5],
  "That is the story of Hamlet. A ghost asks a son for revenge.",
  "The son waits and thinks. In the end he does what the ghost asked, and the King dies.",
  "But Gertrude, Laertes and Hamlet die too. Polonius and Ophelia are dead, and so are Rosencrantz and Guildenstern.",
  ["Only Horatio stays alive to tell the story.", 0.6],
], (t, at, b) =>
  hact(5, t) + hn(t, look(t, at(5, "That is"), at(8), 1), hop(t, at(5, "That is"), 0.25)) +
  hb("fortinbras", 2.8, t, pop(t, at(0, "Fortinbras")), hop(t, at(2, "Fortinbras says"), 0.25), wave(t, at(3, "He orders"), 1.2, 6)) +
  hb("fortinbras", 3.9, t, { s: 0.5 }, pop(t, at(0, "his men") + 0.1)) +
  hb("fortinbras", 4.55, t, { s: 0.5 }, pop(t, at(0, "his men") + 0.2)) +
  hb("horatio", 0.6, t, pop(t, 0.3), look(t, at(1, "Horatio says"), at(2), 1), hop(t, at(8, "Only"), 0.3)) +
  hprop("crown", 2.8, 1.9, "gold", pop(t, at(2, "crown")), out(t, at(4) - 0.2)) +
  hsay(["Where is this sight?"], -0.8, 3.3, "gold", pop(t, at(0, "asks")), out(t, at(1) - 0.1)) +
  hsay(["Take up the bodies."], -0.8, 3.3, "gold", pop(t, at(3, "Take")), out(t, at(4) - 0.1)) +
  hsay(["Go, bid the soldiers shoot."], -0.8, 3.3, "gold", pop(t, at(4, "He says")), out(t, at(5) - 0.1)) +
  label("Hamlet", 2.2, 3.4, 0.9, "violet", pop(t, at(5, "That is")), out(t, at(8) + 2)));
