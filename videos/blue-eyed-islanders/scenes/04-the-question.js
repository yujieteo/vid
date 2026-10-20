scene([
  "Does the visitor's remark change anything?",
  "One argument says no. Every person could already see many blue-eyed people.",
  ["So the visitor said nothing new.", 0.5],
  ["Another argument says yes. It says that after 100 days, all 100 blue-eyed people leave.", 0.8],
  ["Both arguments sound right. But they cannot both be right.", 0.5],
], (t, at, b) => {
  const clash = at(4, "cannot");
  return mascot(-3.6, t, pop(t, 0.1), look(t, at(0, "change"), at(1) - 0.2, 0.5, 1), squint(t, at(0, "change"), 1.2),
    blink(t, b[2][0] + 0.3), hop(t, clash, 0.3)) +
    label("No change?", 1.6, 3.0, 0.8, "text", pop(t, at(1, "says no")), wave(t, clash, 1.2, 6)) +
    label("A big change?", 1.6, 1.6, 0.8, "blue", pop(t, at(3, "yes")), wave(t, clash + 0.15, 1.2, 6));
});
