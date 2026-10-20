scene([
  "Rosencrantz and Guildenstern are old friends of Hamlet. He is glad to see them.",
  "Then he says to them: “You were sent for.”",
  "He says it is a prison to him. Hamlet says: “Denmark's a prison.”",
  "They say they do not think so. Hamlet says: “there is nothing either good or bad but thinking makes it so.”",
  "He says he could live in a small nutshell, if he did not have bad dreams.",
  "The two friends look at each other. They do not know what to say.",
  ["Guildenstern says: “My lord, we were sent for.”", 0.3],
  "Hamlet tells them that he knows. The King and the Queen sent them.",
  "He says he is sad, and the world is not good to him. Man is a noble work, but he does not like man now.",
], (t, at, b) =>
  hact(2, t) + hn(t, look(t, at(1, "Then"), at(6), 1)) +
  hb("hamlet", -1.4, t, pop(t, 0.2), hop(t, at(0, "glad"), 0.2), wave(t, at(2, "Denmark"), 1.2, 6), squint(t, at(4, "bad dreams"), 1.5), look(t, at(7, "Hamlet tells"), at(8), 1)) +
  hb("rosencrantz", 1.0, t, pop(t, at(0, "Rosencrantz")), look(t, at(5, "The two"), at(6), 1)) +
  hb("guildenstern", 2.8, t, pop(t, at(0, "Guildenstern")), look(t, at(5, "The two"), at(6), -1), hop(t, at(6, "Guildenstern says"), 0.2)) +
  hsay(["You were sent for."], -1.0, 3.3, "violet", pop(t, at(1, "You were")), out(t, at(2) - 0.1)) +
  hsay(["Denmark's a prison."], -1.0, 3.3, "violet", pop(t, at(2, "Denmark")), out(t, at(3) - 0.1)) +
  hsay(["there is nothing either good or bad", "but thinking makes it so."], -1.0, 3.3, "violet", pop(t, at(3, "there")), out(t, at(4) - 0.1)) +
  hsay(["My lord, we were sent for."], 1.4, 3.3, "gold", pop(t, at(6, "My lord"))));
