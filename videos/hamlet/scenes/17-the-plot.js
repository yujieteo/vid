scene([
  "Claudius gets a letter from Hamlet. It says that Hamlet is back in Denmark.",
  "The King reads: “High and mighty, you shall know I am set naked on your kingdom.”",
  "Claudius and Laertes make a plan. Hamlet will fence with Laertes in a match.",
  "Laertes says that he will use a sword with no cover on the point. He will put poison on it.",
  ["He says: “To cut his throat i' th' church.”", 0.2],
  "If the sword does not kill Hamlet, Claudius has a second plan.",
  "There will be a cup of poison for Hamlet to drink when he is hot and dry.",
  "Then the Queen comes in with sad news. Ophelia fell into a brook and drowned.",
  ["She says: “There is a willow grows aslant a brook,”", 0.3],
  "Laertes weeps. He says: “Too much of water hast thou, poor Ophelia,”",
], (t, at, b) =>
  hact(4, t) + hn(t, look(t, at(2, "Claudius and"), at(7), 1)) +
  hb("claudius", -0.4, t, pop(t, 0.2), hop(t, at(0, "gets"), 0.2), wave(t, at(1, "The King"), 1.2, 6), squint(t, at(6, "There"), 2)) +
  hb("laertes", 1.8, t, pop(t, at(2, "Laertes")), wave(t, at(3, "Laertes says"), 1.2, 6), squint(t, at(9, "Laertes weeps"), 2)) +
  hb("gertrude", 3.8, t, pop(t, at(7, "Queen")), look(t, at(8, "She says"), at(9), -1)) +
  hprop("letter", -0.4, 1.9, "white", pop(t, at(0, "letter")), out(t, at(2) - 0.2)) +
  hprop("sword", 1.8, 1.9, "text", pop(t, at(3, "sword")), out(t, at(5) - 0.2)) +
  hprop("cup", 1.8, 1.9, "green", pop(t, at(6, "cup")), out(t, at(7) - 0.2)) +
  hsay(["High and mighty, you shall know", "I am set naked on your kingdom."], -0.2, 3.5, "red", pop(t, at(1, "The King")), out(t, at(2) - 0.1)) +
  hsay(["To cut his throat i' th' church."], -0.2, 3.3, "green", pop(t, at(4, "He says")), out(t, at(5) - 0.1)) +
  hsay(["There is a willow", "grows aslant a brook,"], -0.2, 3.3, "blue", pop(t, at(8, "She says")), out(t, at(9) - 0.1)) +
  hsay(["Too much of water hast thou,", "poor Ophelia,"], -0.2, 3.3, "green", pop(t, at(9, "He says"))));
