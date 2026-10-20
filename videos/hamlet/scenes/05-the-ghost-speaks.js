scene([
  "Hamlet goes up on the wall with Horatio and Marcellus. At night the ghost comes.",
  "It looks like his father. Hamlet follows it, and his friends cannot stop him.",
  "Alone with Hamlet, the ghost says it is the spirit of his father.",
  "It says that fire burns it in the day, because of its sins.",
  "The ghost says: “Revenge his foul and most unnatural murder.”",
  "People say that a snake bit the King when he slept in the orchard. This is not true.",
  "Claudius poured poison in the ear of the sleeping King. He took the crown and the Queen.",
  "The ghost asks Hamlet not to hurt his mother. Then the morning comes and the ghost goes.",
  ["Its last words are: “Adieu, adieu, adieu. Remember me.”", 0.3],
  "Hamlet swears that the order of the ghost will live alone in his brain.",
  ["He writes: “That one may smile, and smile, and be a villain!”", 0.4],
], (t, at, b) =>
  hact(1, t) + hn(t, look(t, at(2, "Alone"), at(4), 1)) +
  hb("hamlet", 0.4, t, pop(t, 0.2), look(t, at(1, "It looks"), at(2), 1), hop(t, at(1, "follows"), 0.25), squash(t, at(4, "Revenge")), squint(t, at(9, "swears"), 2), wave(t, at(10, "writes"), 1.2, 6)) +
  hb("ghost", 3.0, t, pop(t, at(0, "ghost")), squint(t, at(3, "fire"), 1.5), wave(t, at(4, "The ghost"), 1.2, 5), out(t, at(7, "ghost goes"))) +
  hprop("cup", 1.9, 0.0, "green", pop(t, at(6, "poison")), out(t, at(7) - 0.2)) +
  hprop("crown", 4.4, 0.0, "gold", pop(t, at(6, "crown")), out(t, at(7) - 0.2)) +
  hsay(["Revenge his foul and most", "unnatural murder."], 1.4, 3.3, "text", pop(t, at(4, "Revenge")), out(t, at(5) - 0.1)) +
  hsay(["Adieu, adieu, adieu.", "Remember me."], 1.4, 3.3, "text", pop(t, at(8, "Adieu")), out(t, at(9) - 0.1)) +
  hsay(["That one may smile, and smile,", "and be a villain!"], 1.4, 3.3, "violet", pop(t, at(10, "That one"))));
