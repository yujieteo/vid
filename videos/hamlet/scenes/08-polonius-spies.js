scene([
  "In his house, Polonius gives money and notes to his servant Reynaldo.",
  "Reynaldo must go to France and spy on Laertes. He must ask other people what Laertes does.",
  "Then Ophelia runs in. She is afraid.",
  "She says Hamlet came to her room. His clothes were in a mess.",
  "She says he was “Pale as his shirt, his knees knocking each other,”",
  "He held her wrist and looked at her face for a long time. Then he left without a word.",
  "Polonius asks: “Mad for thy love?” He thinks this is the reason.",
  ["He goes to tell the King.", 0.4],
], (t, at, b) =>
  hact(2, t) + hn(t, look(t, at(2, "Ophelia"), at(3), 1)) +
  hb("polonius", -1.2, t, pop(t, 0.2), hop(t, at(0, "gives"), 0.2), look(t, at(1, "Reynaldo must"), at(2), 1), wave(t, at(6, "Polonius asks"), 1.2, 6), out(t, at(7, "goes"))) +
  hb("digger", 0.6, t, { s: 0.9 }, pop(t, at(0, "Reynaldo")), out(t, at(2, "Then") - 0.2)) +
  label("Reynaldo", 0.6, -0.55, 0.34, "text", pop(t, at(0, "Reynaldo")), out(t, at(2, "Then") - 0.2)) +
  hprop("letter", 0.0, 0.1, "white", pop(t, at(0, "notes")), out(t, at(2, "Then") - 0.2)) +
  hb("ophelia", 2.6, t, pop(t, at(2, "Ophelia")), squash(t, at(2, "afraid")), look(t, at(3, "Hamlet"), at(6), -1)) +
  hb("hamlet", 4.2, t, { s: 0.7 }, pop(t, at(3, "Hamlet came")), wave(t, at(4, "Pale"), 1.5, 10), out(t, at(5, "Then") - 0.1)) +
  hsay(["Pale as his shirt,", "his knees knocking each other,"], 1.4, 3.3, "orange", pop(t, at(4, "Pale")), out(t, at(5) - 0.1)) +
  hsay(["Mad for thy love?"], 1.4, 3.3, "gold", pop(t, at(6, "Mad"))));
