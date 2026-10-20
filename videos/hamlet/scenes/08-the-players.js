scene([
  "Then actors come to the castle. Hamlet is happy to see them.",
  "One actor gives a speech about the fall of Troy and the grief of a Queen. His eyes fill with tears.",
  "Hamlet is alone, and he is angry with himself. The actor can cry for a story. Hamlet cannot act.",
  "Hamlet asks the First Player: “Can you play The Murder of Gonzago?” The man says yes.",
  "Hamlet will add some lines of his own. The play will show a murder like the death of his father.",
  "He thinks: the ghost may be a devil that lies to him. He needs a proof.",
  "He will watch the King during the play. If the King shows fear, Hamlet will know that the ghost is true.",
  ["He says: “The play's the thing wherein I'll catch the conscience of the King.”", 0.5],
], (t, at, b) =>
  hact(2, t) + hn(t, look(t, at(3, "Hamlet asks"), at(5), 1)) +
  hb("player", 0.4, t, pop(t, at(0, "actors")), hop(t, at(1, "One actor"), 0.2), squash(t, at(3, "yes")), out(t, at(2, "Hamlet is alone") - 0.2)) +
  hb("player", 2.2, t, { s: 0.6 }, pop(t, at(0, "actors") + 0.15), out(t, at(2, "Hamlet is alone") - 0.2)) +
  hb("hamlet", 3.6, t, pop(t, at(0, "Hamlet is happy")), squint(t, at(2, "angry"), 1.5), wave(t, at(3, "Hamlet asks"), 1.2, 6), look(t, at(5, "He thinks"), at(6), 1, 0.4), wave(t, at(7, "He says"), 1.2, 6)) +
  hprop("crown", 0.4, 1.9, "gold", pop(t, at(1, "Queen")), out(t, at(2, "Hamlet is alone") - 0.2)) +
  hprop("letter", 2.2, 1.9, "white", pop(t, at(4, "lines")), out(t, at(5) - 0.2)) +
  hsay(["Can you play", "The Murder of Gonzago?"], -1.0, 3.3, "violet", pop(t, at(3, "Can you")), out(t, at(4) - 0.1)) +
  hsay(["The play's the thing", "wherein I'll catch the conscience", "of the King."], -1.0, 3.6, "violet", pop(t, at(7, "The play's"))));
