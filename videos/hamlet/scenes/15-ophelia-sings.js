scene([
  "Hamlet is gone, and Polonius is dead. Ophelia has lost her mind.",
  "She comes to the Queen and sings a sad song.",
  ["She sings: “He is dead and gone, lady,”", 0.3],
  "Then Laertes comes with armed men from France. He wants to know who killed his father.",
  "He says to Claudius: “O thou vile king, Give me my father.”",
  "Claudius is calm. He says that he did not kill Polonius, and that Laertes will hear the truth.",
  "Ophelia comes back with flowers. She gives them to the people in the room.",
  "She says: “There's rosemary, that's for remembrance; pray love, remember.”",
  "Laertes sees his sister in this state and he is full of grief.",
  "Claudius says that he will help Laertes to find the man who did this.",
], (t, at, b) =>
  hact(4, t) + hn(t, look(t, at(1, "She comes"), at(3), 1)) +
  hb("ophelia", -1.2, t, pop(t, 0.2), squint(t, at(0, "Ophelia"), 2), look(t, at(2, "She sings"), at(3), 1, 0.3), hop(t, at(6, "Ophelia comes"), 0.2), wave(t, at(7, "She says"), 1.5, 8)) +
  hb("gertrude", 0.6, t, { s: 0.7 }, pop(t, at(1, "Queen") - 0.3), look(t, at(2, "She sings"), at(3), -1)) +
  hb("laertes", 2.2, t, pop(t, at(3, "Laertes")), wave(t, at(4, "He says"), 1.2, 6), squash(t, at(8, "Laertes sees"))) +
  hb("claudius", 4.0, t, pop(t, at(4, "Claudius")), squint(t, at(5, "calm"), 1.5)) +
  hprop("flower", -1.2, 1.9, "orange", pop(t, at(6, "flowers"))) +
  hsay(["He is dead and gone, lady,"], 1.4, 3.3, "orange", pop(t, at(2, "She sings")), out(t, at(3) - 0.1)) +
  hsay(["O thou vile king,", "Give me my father."], 1.4, 3.3, "green", pop(t, at(4, "He says")), out(t, at(5) - 0.1)) +
  hsay(["There's rosemary, that's for", "remembrance; pray love, remember."], 1.4, 3.3, "orange", pop(t, at(7, "She says")), out(t, at(8) - 0.1)));
