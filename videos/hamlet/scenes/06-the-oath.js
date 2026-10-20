scene([
  "Horatio and Marcellus find Hamlet. He is wild, and he tells them nothing.",
  "He asks them to swear on his sword that they will tell no one.",
  "A voice under the ground says: “Swear.” It is the ghost.",
  "It says this again, and each time Hamlet moves his friends to a new place.",
  "Hamlet says: “There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.”",
  "Later he may act in a strange way. He asks his friends not to show that they know why.",
  ["Hamlet says: “The time is out of joint. O cursed spite, that ever I was born to set it right.”", 0.5],
], (t, at, b) => {
  const slide = (t0, dx) => ({ dx: dx * ease(t, t0, t0 + 0.7) });
  const s1 = at(3, "each"), s2 = at(3, "new place");
  return hact(1, t) + hn(t, look(t, at(2, "voice"), at(3), 1, -0.5)) +
    hb("hamlet", 0.0, t, pop(t, 0.2), wave(t, at(0, "wild"), 1.2, 8), hop(t, at(1, "sword"), 0.2), slide(s1, 0.6), slide(s2, 0.6), wave(t, at(6, "Hamlet says"), 1.2, 6)) +
    hb("horatio", 1.8, t, pop(t, at(0, "Horatio")), slide(s1, 0.6), slide(s2, 0.6), look(t, at(4, "Horatio"), at(5), -1)) +
    hb("marcellus", 3.6, t, pop(t, at(0, "Marcellus")), slide(s1, 0.6), slide(s2, 0.6)) +
    hprop("sword", 0.0, 1.9, "text", pop(t, at(1, "sword")), out(t, at(2) - 0.2)) +
    hb("ghost", -1.0, t, { s: 0.55, z: -0.35 }, pop(t, at(2, "ghost")), out(t, at(5) - 0.2)) +
    label("Swear", -1.0, -1.0, 0.4, "text", pop(t, at(2, "Swear")), out(t, at(4) - 0.2)) +
    hsay(["There are more things in heaven", "and earth, Horatio, than are dreamt", "of in your philosophy."], 1.4, 3.6, "violet", pop(t, at(4, "There are")), out(t, at(5) - 0.1)) +
    hsay(["The time is out of joint.", "O cursed spite, that ever I was born", "to set it right."], 1.4, 3.6, "violet", pop(t, at(6, "The time")));
});
