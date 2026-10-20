scene([
  "Claudius is afraid. He goes alone to pray.",
  "He says: “O, my offence is rank, it smells to heaven;”",
  "He killed his brother, and he still has what he got from it.",
  "He says: “My crown, mine own ambition, and my queen.”",
  "He kneels down, but he cannot say the words.",
  "Hamlet sees him. He says: “Now might I do it pat, now he is praying.”",
  "But Hamlet stops. If he kills Claudius now, Claudius goes to heaven.",
  "That would not be revenge. Hamlet puts his sword away and goes to his mother.",
  ["Claudius says: “My words fly up, my thoughts remain below.”", 0.3],
  ["He says: “Words without thoughts never to heaven go.”", 0.4],
], (t, at, b) =>
  hact(3, t) + hn(t, look(t, at(5, "Hamlet sees"), at(8), 1)) +
  hb("claudius", 0.6, t, pop(t, 0.2), squint(t, at(0, "afraid"), 1.5), { dz: 0 }, hop(t, at(4, "He kneels"), 0.15)) +
  hprop("crown", 0.6, 1.7, "gold", pop(t, at(3, "crown")), out(t, at(5) - 0.2)) +
  hb("hamlet", 3.6, t, pop(t, at(5, "Hamlet sees")), look(t, at(5, "He says"), at(6), -1), squint(t, at(6, "But"), 2), out(t, at(7, "goes") + 0.3)) +
  hprop("sword", 3.6, 1.9, "text", pop(t, at(5, "Now")), out(t, at(7, "puts") + 0.1)) +
  hsay(["O, my offence is rank,", "it smells to heaven;"], -1.4, 3.3, "red", pop(t, at(1, "O,")), out(t, at(2) - 0.1)) +
  hsay(["My crown, mine own ambition,", "and my queen."], -1.4, 3.3, "red", pop(t, at(3, "My crown")), out(t, at(4) - 0.1)) +
  hsay(["Now might I do it pat,", "now he is praying."], -1.4, 3.3, "violet", pop(t, at(5, "Now")), out(t, at(6) - 0.1)) +
  hsay(["My words fly up,", "my thoughts remain below."], -1.4, 3.3, "red", pop(t, at(8, "My words")), out(t, at(9) - 0.1)) +
  hsay(["Words without thoughts", "never to heaven go."], -1.4, 3.3, "red", pop(t, at(9, "Words"))));
