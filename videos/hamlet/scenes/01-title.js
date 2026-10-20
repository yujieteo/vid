// Hamlet only: the bots of the play, the props, and short helpers. All scene files of this video share them.
const HK = {
  hamlet: { shape: "pebble", color: "violet" }, claudius: { shape: "squircle", color: "red" },
  gertrude: { shape: "cloud", color: "blue" }, polonius: { shape: "tri", color: "gold" },
  ophelia: { shape: "drop", color: "orange" }, laertes: { shape: "hex", color: "green" },
  horatio: { shape: "pill", color: "sky" }, ghost: { shape: "pebble", color: "text", eyes: "crust" },
  rosencrantz: { shape: "ball", color: "green" }, guildenstern: { shape: "ball", color: "gold" },
  fortinbras: { shape: "hex", color: "gold" }, osric: { shape: "drop", color: "sky" },
  marcellus: { shape: "squircle", color: "green" }, barnardo: { shape: "pill", color: "red" },
  digger: { shape: "pill", color: "orange" }, player: { shape: "squircle", color: "gold" },
};
const hb = (who, x, t, ...poses) => blob(x, t, HK[who], { s: 0.8 }, ...poses);   // a bot of the play
const hn = (t, ...poses) => mascot(-3.6, t, pop(t, 0.1), ...poses);   // the narrator
const hname = (text, x, t0, t, ...poses) => label(text, x, -0.55, 0.34, "text", pop(t, t0), ...poses);
const hact = (n, t) => label(`Act ${n}`, 4.3, 4.05, 0.3, "sky", pop(t, 0.3));   // the act, at the top right
const hsay = (lines, x, z, color, ...poses) =>   // a quoted line of the play, 1 label for each row
  lines.map((l, i) => label(l, x, z - 0.52 * i, 0.4, color, ...poses)).join("");
// Props: the base is at (x, z). kind: crown, skull, cup, sword, letter, flower, moon.
const hprop = (kind, x, z, color, ...poses) => place(x, z, merge(poses), {
  crown: `<path d="M-0.4 0V-0.4L-0.2 -0.2L0 -0.5L0.2 -0.2L0.4 -0.4V0Z"/>`,
  skull: `<circle cx="0" cy="-0.5" r="0.4"/><rect x="-0.2" y="-0.3" width="0.4" height="0.3" rx="0.06"/>` +
    `<circle cx="-0.15" cy="-0.52" r="0.1" fill="${PALETTE.crust}"/><circle cx="0.15" cy="-0.52" r="0.1" fill="${PALETTE.crust}"/>`,
  cup: `<path d="M-0.35 -0.75H0.35Q0.35 -0.3 0 -0.28Q-0.35 -0.3 -0.35 -0.75Z"/><rect x="-0.04" y="-0.3" width="0.08" height="0.24"/>` +
    `<rect x="-0.22" y="-0.08" width="0.44" height="0.08" rx="0.03"/>`,
  sword: `<g transform="rotate(35)"><rect x="-0.04" y="-1.3" width="0.08" height="1.1" rx="0.04"/>` +
    `<rect x="-0.22" y="-0.2" width="0.44" height="0.07" rx="0.03"/><rect x="-0.04" y="-0.13" width="0.08" height="0.25"/></g>`,
  letter: `<rect x="-0.45" y="-0.6" width="0.9" height="0.6" rx="0.05"/>` +
    `<path d="M-0.45 -0.6L0 -0.25L0.45 -0.6" fill="none" stroke="${PALETTE.crust}" stroke-width="0.05"/>`,
  flower: `<rect x="-0.025" y="-0.5" width="0.05" height="0.5" fill="${PALETTE.green}"/>` +
    [[0, -0.74], [0, -0.46], [-0.14, -0.6], [0.14, -0.6]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="0.14"/>`).join("") +
    `<circle cx="0" cy="-0.6" r="0.1" fill="${PALETTE.gold}"/>`,
  moon: `<circle cx="0" cy="-0.4" r="0.4"/><circle cx="0.2" cy="-0.5" r="0.36" fill="${PALETTE.crust}"/>`,
}[kind].replace(/^/, `<g fill="${PALETTE[color]}">`) + "</g>");

scene([
  "This is the story of Hamlet, a play by William Shakespeare.",
  ["It happens in the castle of Elsinore, in Denmark.", 0.2],
  "Hamlet is a prince. His father, the King, is dead.",
  "Claudius is the new King. He is the brother of the dead King.",
  "Gertrude is the Queen. She is the mother of Hamlet.",
  "Polonius is an old lord. Laertes is his son. Ophelia is his daughter.",
  "Horatio is the friend of Hamlet.",
  ["Almost all of them die before the end.", 0.3],
], (t, at, b) => {
  const ROW = [["hamlet", "Hamlet", 2, "Hamlet"], ["claudius", "Claudius", 3, "Claudius"], ["gertrude", "Gertrude", 4, "Gertrude"],
    ["polonius", "Polonius", 5, "Polonius"], ["laertes", "Laertes", 5, "Laertes"], ["ophelia", "Ophelia", 5, "Ophelia"], ["horatio", "Horatio", 6, "Horatio"]];
  const die = at(7, "die");
  return hn(t, hop(t, at(0, "story"), 0.3)) +
    label("Hamlet", 1.5, 3.5, 1, "text", pop(t, at(0, "Hamlet"))) +
    label("Elsinore, Denmark", 1.5, 2.6, 0.4, "sky", pop(t, at(1, "Elsinore"))) +
    ROW.map(([who, name, i, word], k) => {
      const x = -1.7 + k, t0 = at(i, word), end = who === "horatio" ? hop(t, at(7, "Almost"), 0.3) : squint(t, die, 1.4);
      return hb(who, x, t, { s: 0.6 }, pop(t, t0), end) + label(name, x, k % 2 ? -0.85 : -0.45, 0.22, "text", pop(t, t0 + 0.2));
    }).join("");
});
