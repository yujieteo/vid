scene([
  "It is night on the wall of the castle. It is bitter cold.",
  "Two guards, Barnardo and Marcellus, wait with Horatio.",
  "The guards say they saw a ghost on two nights. Horatio does not believe them.",
  "The bell beats one. The ghost comes. It looks like the dead King.",
  ["Horatio is afraid. He speaks to the ghost.", 0.4],
  "The ghost does not answer. It walks away.",
  "It comes again. Then the cock crows, and the ghost goes.",
  ["Horatio says the ghost will speak to young Hamlet. They go to tell him.", 0.3],
], (t, at, b) => {
  const g = at(3, "ghost"), gone = at(6, "cock");
  return hact(1, t) + hn(t, squint(t, at(0, "bitter"), 1.5)) +
    hprop("moon", 1.5, 3.7, "text", pop(t, at(0, "night"))) +
    hb("horatio", -1.6, t, pop(t, at(1, "Horatio")), look(t, g + 0.3, g + 1.5, 1, 0.5), hop(t, at(2, "not"), 0.2)) +
    hb("marcellus", 0.2, t, pop(t, at(1, "Marcellus")), look(t, g + 0.3, g + 1.5, 1, 0.5)) +
    hb("barnardo", 2.0, t, pop(t, at(1, "Barnardo")), look(t, g + 0.3, g + 1.5, 1, 0.5)) +
    hb("ghost", 3.8, t, pop(t, g), out(t, at(5, "walks"))) +
    hb("ghost", 3.8, t, pop(t, at(6, "comes again")), out(t, gone + 0.4)) +
    hsay(["Stay! speak, speak!", "I charge thee speak!"], 0.8, 3.0, "sky", pop(t, at(4, "speaks")), out(t, at(5) - 0.2)) +
    hsay(["This spirit, dumb to us,", "will speak to him."], 0.8, 3.0, "sky", pop(t, at(7, "will")));
});
