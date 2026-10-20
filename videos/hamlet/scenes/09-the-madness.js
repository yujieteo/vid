scene([
  "Claudius and Gertrude ask Rosencrantz and Guildenstern to find out what is wrong with Hamlet.",
  "Old Norway has stopped the plan of Fortinbras. The young man will go to fight in Poland and not in Denmark.",
  "Polonius says he knows why Hamlet is mad. He reads a letter from Hamlet to Ophelia.",
  "It says: “Doubt thou the stars are fire, Doubt that the sun doth move,”",
  ["The last line is: “But never doubt I love.”", 0.3],
  "The King and the Queen want to test this. They will hide and watch Hamlet meet Ophelia.",
  "Hamlet comes in and reads a book. Polonius asks: “Do you know me, my lord?”",
  "Hamlet says: “Excellent well. You are a fishmonger.” Polonius thinks that Hamlet is mad.",
  ["Polonius says to himself: “Though this be madness, yet there is method in't.”", 0.4],
], (t, at, b) =>
  hact(2, t) + hn(t, look(t, at(2, "Polonius"), at(5), 1)) +
  hb("claudius", -1.8, t, pop(t, 0.2), hop(t, at(0, "Claudius"), 0.2), look(t, at(5, "The King"), at(6), 1)) +
  hb("gertrude", -0.2, t, pop(t, at(0, "Gertrude")), look(t, at(5, "The King"), at(6), 1)) +
  hb("fortinbras", 4.6, t, { s: 0.6 }, pop(t, at(1, "Old Norway")), out(t, at(2) - 0.2)) +
  hb("polonius", 1.6, t, pop(t, at(2, "Polonius")), hop(t, at(2, "reads"), 0.2), wave(t, at(6, "Polonius asks"), 1.2, 6), squint(t, at(8, "Polonius says"), 2.5)) +
  hprop("letter", 1.6, 1.7, "white", pop(t, at(2, "letter")), out(t, at(5) - 0.2)) +
  hb("hamlet", 3.4, t, pop(t, at(6, "Hamlet comes")), wave(t, at(7, "Hamlet says"), 1.2, 6), squint(t, at(7, "fishmonger"), 1.5)) +
  hsay(["Doubt thou the stars are fire,", "Doubt that the sun doth move,"], 0.6, 3.3, "white", pop(t, at(3, "Doubt")), out(t, at(4) - 0.1)) +
  hsay(["But never doubt I love."], 0.6, 3.3, "white", pop(t, at(4, "But")), out(t, at(5) - 0.1)) +
  hsay(["Excellent well.", "You are a fishmonger."], 0.6, 3.3, "violet", pop(t, at(7, "Excellent")), out(t, at(8) - 0.1)) +
  hsay(["Though this be madness,", "yet there is method in't."], 0.6, 3.3, "gold", pop(t, at(8, "Though"))));
