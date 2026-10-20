scene([
  "Laertes goes to France. First he warns his sister Ophelia about Hamlet.",
  "He says that a prince must think of the state. Hamlet may not be free to choose.",
  "Laertes tells her: “Fear it, Ophelia, fear it, my dear sister.”",
  "Polonius comes and gives Laertes some advice before he goes.",
  "One of his lines is: “This above all: to thine own self be true.”",
  "Then Polonius asks Ophelia what Laertes said. She says it was about Hamlet.",
  "Polonius says that the vows of Hamlet are not true.",
  "He tells her to stop all talk with Hamlet. Ophelia says: “I shall obey, my lord.”",
], (t, at, b) =>
  hact(1, t) + hn(t, look(t, at(0, "Laertes"), at(1), 1)) +
  hb("laertes", 0.2, t, pop(t, at(0, "Laertes")), hop(t, at(2, "Laertes"), 0.25), look(t, at(1, "He says"), at(3), 1), out(t, at(5, "Then") - 0.3)) +
  hb("ophelia", 2.2, t, pop(t, at(0, "Ophelia")), look(t, at(2, "Laertes"), at(3), -1), squint(t, at(6, "vows"), 1.5), hop(t, at(7, "Ophelia says"), 0.2)) +
  hb("polonius", 4.0, t, pop(t, at(3, "Polonius")), hop(t, at(3, "advice"), 0.2), wave(t, at(6, "Polonius says"), 1.5, 8)) +
  hsay(["Fear it, Ophelia, fear it,", "my dear sister."], 1.4, 3.3, "green", pop(t, at(2, "Fear")), out(t, at(3) - 0.1)) +
  hsay(["This above all:", "to thine own self be true."], 1.4, 3.3, "gold", pop(t, at(4, "This above")), out(t, at(5) - 0.1)) +
  hsay(["I shall obey, my lord."], 1.4, 3.3, "orange", pop(t, at(7, "I shall"))));
