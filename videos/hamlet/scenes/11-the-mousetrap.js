scene([
  "The play begins. A King and Queen speak. Then the King sleeps in a garden.",
  "A man called Lucianus comes with poison. He pours it into the ear of the sleeper.",
  "Hamlet says to Ophelia: he poisons him in the garden for his state. You will see how the murderer gets the love of the wife.",
  "Suddenly Ophelia says: “The King rises.”",
  ["Hamlet asks: “What, frighted with false fire?”", 0.3],
  "Claudius cries: “Give me some light. Away.” The court shouts: “Lights, lights, lights.”",
  "Everyone leaves. Only Hamlet and Horatio stay.",
  "Hamlet is happy and wild. He says that he will take the word of the ghost.",
  "Horatio says that he saw the King's face. Both know now that Claudius is the murderer.",
], (t, at, b) =>
  hact(3, t) + hn(t, look(t, at(1, "A man"), at(5), 1)) +
  hb("player", -1.4, t, { s: 0.7 }, pop(t, 0.2), out(t, at(2) - 0.3)) +
  hb("player", 0.4, t, { s: 0.7 }, pop(t, at(1, "A man")), hop(t, at(1, "pours"), 0.25), out(t, at(2) - 0.3)) +
  hprop("cup", 0.4, 1.6, "green", pop(t, at(1, "poison")), out(t, at(2) - 0.3)) +
  hb("claudius", 2.6, t, pop(t, at(2, "Hamlet says") - 0.5), hop(t, at(3, "The King"), 0.3), squash(t, at(5, "Claudius")), out(t, at(6, "Everyone"))) +
  hb("hamlet", 4.2, t, pop(t, at(2, "Hamlet says") - 0.3), look(t, at(2, "Hamlet says"), at(5), -1), wave(t, at(4, "Hamlet asks"), 1.2, 6), hop(t, at(7, "Hamlet is"), 0.25)) +
  hb("horatio", 1.4, t, pop(t, at(6, "Horatio") - 0.1), look(t, at(8, "Horatio says"), at(8) + 2, 1)) +
  hsay(["The King rises."], -0.4, 3.3, "orange", pop(t, at(3, "Suddenly")), out(t, at(4) - 0.1)) +
  hsay(["What, frighted with false fire?"], -0.4, 3.3, "violet", pop(t, at(4, "Hamlet asks")), out(t, at(5) - 0.1)) +
  hsay(["Give me some light. Away."], -0.4, 3.3, "red", pop(t, at(5, "Claudius cries")), out(t, at(6) - 0.1)) +
  hsay(["Lights, lights, lights."], -0.4, 2.6, "sky", pop(t, at(5, "The court")), out(t, at(6) - 0.1)));
