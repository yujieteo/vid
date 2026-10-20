scene([
  "On the way to the ship, Hamlet sees an army. It is the army of Fortinbras of Norway.",
  "A captain tells Hamlet that the army goes to Poland. It will fight for a small piece of land.",
  "Hamlet thinks about this. Many men will die for a very small thing.",
  "But Hamlet has a father who was killed and a mother who is shamed, and he has done nothing.",
  ["He says: “How all occasions do inform against me,”", 0.3],
  "He sends Rosencrantz and Guildenstern ahead, and he stays to speak to himself.",
  ["He decides what he will do. He says: “My thoughts be bloody or be nothing worth.”", 0.5],
], (t, at, b) =>
  hact(4, t) + hn(t, look(t, at(1, "A captain"), at(4), 1)) +
  hb("fortinbras", 2.2, t, pop(t, at(0, "Fortinbras")), look(t, at(1, "A captain"), at(2), -1)) +
  hb("fortinbras", 3.4, t, { s: 0.5 }, pop(t, at(0, "army") + 0.2)) +
  hb("fortinbras", 4.3, t, { s: 0.5 }, pop(t, at(0, "army") + 0.4)) +
  hb("hamlet", -0.8, t, pop(t, 0.2), look(t, at(0, "Hamlet sees"), at(2), 1), squint(t, at(3, "But"), 2), wave(t, at(4, "He says"), 1.2, 6), hop(t, at(6, "He decides"), 0.25)) +
  hb("rosencrantz", -2.0, t, { s: 0.55 }, pop(t, 0.3), out(t, at(5, "He sends") + 0.5)) +
  hb("guildenstern", -2.8, t, { s: 0.55 }, pop(t, 0.35), out(t, at(5, "He sends") + 0.5)) +
  hsay(["How all occasions", "do inform against me,"], -0.6, 3.3, "violet", pop(t, at(4, "He says")), out(t, at(5) - 0.1)) +
  hsay(["My thoughts be bloody", "or be nothing worth."], -0.6, 3.3, "violet", pop(t, at(6, "He says"))));
