scene([
  "The court meets for the match. Claudius puts a cup of wine on the table for Hamlet.",
  "Hamlet and Laertes take the swords. Hamlet asks Laertes to forgive him.",
  "Hamlet hits first. Osric says: “A hit, a very palpable hit.”",
  "Claudius puts a pearl in the cup and asks Hamlet to drink. Hamlet says he will play first.",
  "Gertrude takes the cup. She says: “The Queen carouses to thy fortune, Hamlet.” Claudius says: “Gertrude, do not drink.” But she drinks.",
  "The men fence again. Laertes wounds Hamlet with the poison sword.",
  "They fight and the swords change hands. Hamlet wounds Laertes with the same sword.",
  "The Queen falls. She says: “No, no, the drink, the drink!”",
  ["She says: “I am poison'd.” Then Gertrude dies.", 0.4],
], (t, at, b) =>
  hact(5, t) + hn(t, look(t, at(1, "Hamlet and"), at(8), 1)) +
  hb("claudius", 3.9, t, pop(t, 0.2), hop(t, at(0, "Claudius"), 0.2), hop(t, at(3, "Claudius"), 0.2), squint(t, at(7, "The Queen"), 2)) +
  hb("gertrude", 2.4, t, pop(t, 0.3), hop(t, at(4, "Gertrude"), 0.25), out(t, at(8, "Then") + 0.5)) +
  hb("hamlet", -2.0, t, pop(t, at(1, "Hamlet and")), hop(t, at(2, "Hamlet hits"), 0.35), squash(t, at(5, "Laertes wounds")), squash(t, at(6, "Hamlet wounds"))) +
  hb("laertes", 0.0, t, pop(t, at(1, "Hamlet and")), squash(t, at(2, "A hit")), hop(t, at(5, "Laertes wounds"), 0.35), squash(t, at(6, "Hamlet wounds"))) +
  hb("osric", -0.9, t, { s: 0.6 }, pop(t, 0.35), hop(t, at(2, "Osric"), 0.2)) +
  hprop("cup", 3.9, 1.8, "green", pop(t, at(0, "cup")), out(t, at(7, "The Queen") - 0.3)) +
  hprop("sword", -1.0, 2.1, "text", pop(t, at(1, "swords")), out(t, at(8) - 0.2)) +
  hsay(["A hit, a very palpable hit."], -1.0, 3.3, "sky", pop(t, at(2, "Osric says")), out(t, at(3) - 0.1)) +
  hsay(["The Queen carouses", "to thy fortune, Hamlet."], -1.0, 3.3, "blue", pop(t, at(4, "She says")), out(t, at(5) - 0.1)) +
  hsay(["Gertrude, do not drink."], -1.0, 2.4, "red", pop(t, at(4, "Claudius says")), out(t, at(5) - 0.1)) +
  hsay(["No, no, the drink, the drink!"], -1.0, 3.3, "blue", pop(t, at(7, "She says")), out(t, at(8) - 0.1)) +
  hsay(["I am poison'd."], -1.0, 3.3, "blue", pop(t, at(8, "She says"))));
