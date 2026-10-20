scene([
  "Two gravediggers dig a grave in the churchyard. They joke and sing as they work.",
  "They say the grave is for a woman who died in the water. The first digger tells the second how she died.",
  "Hamlet comes back to Denmark with Horatio. He sees the diggers and he asks whose grave it is.",
  "The digger throws up a skull. Hamlet thinks it was a lawyer, or a lord.",
  "The digger says it is the skull of Yorick, the jester of the King.",
  "Hamlet takes the skull in his hands. He says: “Alas, poor Yorick. I knew him,”",
  "He remembers that Yorick carried him on his back when he was a boy.",
  ["He says: “Here hung those lips that I have kiss'd I know not how oft.”", 0.3],
  "Hamlet and Horatio see that every man goes to the dust, even a king.",
], (t, at, b) =>
  hact(5, t) + hn(t, look(t, at(2, "Hamlet comes"), at(5), 1)) +
  hb("digger", -1.8, t, pop(t, 0.2), hop(t, at(0, "joke"), 0.2), hop(t, at(3, "throws"), 0.3)) +
  hb("digger", -0.2, t, { s: 0.7 }, pop(t, 0.35), look(t, at(1, "The first"), at(2), -1)) +
  hb("hamlet", 1.8, t, pop(t, at(2, "Hamlet comes")), look(t, at(3, "The digger"), at(4), -1), wave(t, at(5, "He says"), 1.2, 6), squint(t, at(7, "He says"), 2.5)) +
  hb("horatio", 3.6, t, pop(t, at(2, "Horatio")), look(t, at(3, "The digger"), at(5), -1)) +
  hprop("skull", 1.8, 1.9, "white", pop(t, at(3, "skull")), hop(t, at(5, "takes"), 0.15)) +
  hsay(["Alas, poor Yorick.", "I knew him,"], -0.8, 3.3, "violet", pop(t, at(5, "He says")), out(t, at(6) - 0.1)) +
  hsay(["Here hung those lips that I have", "kiss'd I know not how oft."], -0.8, 3.3, "violet", pop(t, at(7, "He says"))));
