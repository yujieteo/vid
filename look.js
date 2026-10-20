// The look and the motion of all videos. It is a plain script (no module), so that a page loads it from file://.
// Each function is pure: the same t always gives the same SVG. Motion that looks random comes from hash(), not Math.random().
// The frame shows x from -5 to 5 (to the right) and z from -1.2 to 4.4 (up). All times are in seconds.
// A pose is a small object such as {z: 0.3} or {s: 0.5}. A shape takes any number of poses and adds them:
// dx, z, up (height above the ground), tilt (degrees), ex and ez (eye move) add.
// s (size), sx, sz (squash and stretch), eye (eye height) and gaze (how much the eyes look around by themselves) multiply.

// Catppuccin Mocha (https://catppuccin.com/palette). brown is not in Catppuccin: it is peach mixed with crust.
const PALETTE = {
  crust: "#11111b", mantle: "#181825", base: "#1e1e2e", surface0: "#313244", surface1: "#45475a", surface2: "#585b70",
  overlay0: "#6c7086", text: "#cdd6f4", rosewater: "#f5e0dc", flamingo: "#f2cdcd", pink: "#f5c2e7", mauve: "#cba6f7",
  red: "#f38ba8", maroon: "#eba0ac", peach: "#fab387", yellow: "#f9e2af", green: "#a6e3a1", teal: "#94e2d5",
  sky: "#89dceb", sapphire: "#74c7ec", blue: "#89b4fa", lavender: "#b4befe", brown: "#916a56",
};
const LEAD = 0.5, GAP = 0.45, TAIL = 0.8;   // seconds of silence before, between and after sentences

// A sentence of a narration is "text", or ["text", pause]: the pause (seconds) holds the picture after the sentence.
const said = (sentence) => (typeof sentence === "string" ? sentence : sentence[0]);
const pause = (sentence) => (typeof sentence === "string" ? 0 : sentence[1]);

function timeline(narration, secs) {   // 1 sentence = 1 beat. beats[i] = [start, end] of sentence i
  let t = LEAD - GAP;
  const beats = narration.map((sentence, i) => {
    const beat = [t + GAP, t + GAP + secs[i]];
    t = beat[1] + pause(sentence);
    return beat;
  });
  return { beats, length: t + TAIL };
}

// at = cues(beats, narration). Then at(i, "word") is about the time when "word" is said in sentence i,
// and at(i) is the start of sentence i.
const cues = (beats, narration) => (i, word = "") => {
  const text = said(narration[i]), k = text.indexOf(word);
  if (k < 0) throw new Error(`"${word}" is not in sentence ${i}`);
  return beats[i][0] + ((beats[i][1] - beats[i][0]) * k) / text.length;
};

const n = (v) => Math.round(v * 1000) / 1000;
function hash(seed, i) {   // a fixed number from 0 to 1 for each pair of integers
  let h = Math.imul(seed ^ Math.imul(i, 0x9e3779b1), 0x85ebca77);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae3d);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
const mix = (a, b, k) => "#" + [1, 3, 5].map((i) =>
  Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - k) + parseInt(b.slice(i, i + 2), 16) * k).toString(16).padStart(2, "0")).join("");

// ---- the stage: a background in flat tones that moves slowly ------------------------------------

const P = PALETTE;
function stage(t) {   // a sky, 2 far hills, a round floor and dust. They move at different speeds, as with depth.
  const cam = 0.4 * Math.sin(t / 6) + 0.12 * Math.sin(t / 2.3 + 1);   // the camera turns slowly around the middle
  const dust = Array.from({ length: 22 }, (_, i) => {   // d: the depth, from far (0) to near (1)
    const d = hash(91, i), u = (t * (0.012 + 0.02 * d) + hash(92, i)) % 1;
    const x = -5.6 + 11.2 * hash(93, i) + (0.5 - d) * 1.6 * cam + 0.15 * Math.sin(t / 3 + 6 * hash(94, i));
    return `<circle cx="${n(x)}" cy="${n(1.4 - 6 * u)}" r="${n(0.015 + 0.035 * d)}" fill="${P.lavender}" ` +
      `opacity="${n(0.55 * (0.3 + d) * Math.sin(Math.PI * u))}"/>`;
  }).join("");
  return `<rect x="-5" y="-4.4" width="10" height="5.625" fill="${P.base}"/>` +
    `<ellipse cx="${n(-3.2 + 0.9 * cam)}" cy="5.4" rx="6.5" ry="8.2" fill="${mix(P.base, P.surface0, 0.4)}"/>` +
    `<ellipse cx="${n(2.4 + 0.6 * cam)}" cy="6.2" rx="8.5" ry="9.2" fill="${mix(P.base, P.surface0, 0.7)}"/>` +
    `<ellipse cx="${n(0.25 * cam)}" cy="6.65" rx="13" ry="8.8" fill="${P.surface0}"/>` + dust;
}

// t is the time of the video, so that the background does not jump at a scene cut.
const svg = (body, t = 0) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -4.4 10 5.625" font-family="Inter" font-weight="600">${DEFS}${stage(t)}${body}</svg>`;

// ---- motion: each function gives a pose for time t ---------------------------------------------

const clamp = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);
function ease(t, t0, t1) {   // 0 before t0, 1 after t1, smooth in and out
  const u = clamp((t - t0) / (t1 - t0));
  return u * u * (3 - 2 * u);
}
const bump = (t, t0, t1) => (t <= t0 || t >= t1 ? 0 : Math.sin((Math.PI * (t - t0)) / (t1 - t0)) ** 2);
const hold = (t, t0, t1, r) => ease(t, t0, t0 + r) - ease(t, t1 - r, t1);   // go to 1 in r seconds, stay, go back to 0 at t1
const shut = (t, t0) => ease(t, t0, t0 + 0.06) - ease(t, t0 + 0.09, t0 + 0.21);   // close fast, open a little slower
const settle = (u) => (u <= 0 ? 0 : 1 - Math.exp(-28 * u) * (Math.cos(32 * u) + 0.875 * Math.sin(32 * u)));   // a quick move with a small overshoot
const stretch = (sz) => ({ sz, sx: 1 / Math.sqrt(sz) });   // keep the area the same

function pop(t, t0) {   // grow from nothing with a spring: overshoot, stretch, then settle. Then the eyes open.
  const u = t - t0;
  if (u <= 0) return { s: 0, z: -0.25, eye: 0 };
  const e = Math.exp(-u / 0.08), s = 1 - e * Math.cos(17.5 * u);
  return { s, z: -0.25 * Math.max(0, 1 - s), eye: ease(t, t0 + 0.12, t0 + 0.3), ...stretch(1 + 0.16 * Math.exp(-u / 0.1) * Math.sin(17.5 * u)) };
}

function out(t, t0, d = 0.3) {   // swell a little, then shrink to nothing
  const k = clamp((t - t0) / d);
  return { s: k >= 1 ? 0 : (1 + 0.15 * Math.sin(Math.PI * k)) * (1 - k ** 3) };
}

function hop(t, t0, h = 0.5, d = 0.5) {   // crouch, jump on an arc with wide eyes, land with a squash and a squint
  const z = (tt) => { const k = (tt - t0) / d; return k > 0 && k < 1 ? 4 * h * k * (1 - k) : 0; };
  return {
    up: z(t), ez: 0.4 * (z(t - 0.06) - z(t)),   // the eyes follow a little late
    eye: 1 + 0.18 * bump(t, t0, t0 + d) - 0.45 * bump(t, t0 + d - 0.02, t0 + d + 0.24),
    ...stretch(1 - 0.16 * bump(t, t0 - 0.16, t0 + 0.04) + 0.14 * bump(t, t0, t0 + 0.5 * d)
      - 0.2 * bump(t, t0 + d, t0 + d + 0.18) + 0.05 * bump(t, t0 + d + 0.14, t0 + d + 0.36)),
  };
}

function squash(t, t0) {   // stretch up a little, press down with closed eyes, then spring back with an overshoot
  const press = bump(t, t0, t0 + 0.26);
  return { eye: 1 - 0.7 * press, ...stretch(1 + 0.07 * bump(t, t0 - 0.22, t0) - 0.3 * press
    + 0.13 * bump(t, t0 + 0.2, t0 + 0.46) - 0.04 * bump(t, t0 + 0.42, t0 + 0.62)) };
}

const blink = (t, t0) => ({ eye: 1 - 0.92 * shut(t, t0) });
const squint = (t, t0, d = 1) => ({ eye: 1 - 0.5 * hold(t, t0, t0 + d, 0.18), sz: 1 - 0.03 * hold(t, t0, t0 + d, 0.18) });

// The eyes: ex and ez go from -1 to 1 (right and up). gaze stops the eyes from looking around by themselves.
const look = (t, t0, t1, ex, ez = 0) => {   // look at one place from t0 to t1, with a blink at the turn
  const m = settle(t - t0) - settle(t - t1);
  return { ex: 0.22 * ex * m, ez: 0.14 * ez * m, gaze: 1 - hold(t, t0 - 0.2, t1 + 0.3, 0.2), eye: 1 - 0.92 * shut(t, t0 - 0.05) };
};
const follow = (t, t0, t1, from = -1, to = 1) => {   // follow a thing that moves from one side to the other side
  const m = hold(t, t0 - 0.25, t1 + 0.25, 0.25);
  return { ex: 0.22 * (from + (to - from) * ease(t, t0, t1)) * m, gaze: 1 - m };
};
const glance = (t, t0, d = 1.2) => {   // look to one side, then to the other side
  const k = clamp((t - t0) / d);
  return { ex: 0.16 * Math.sin(2 * Math.PI * k) * Math.sin(Math.PI * k), gaze: 1 - Math.sin(Math.PI * k) };
};

const wave = (t, t0, d = 1.6, deg = 12) => {   // rock from side to side
  const k = clamp((t - t0) / d);
  return { tilt: deg * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k) };
};

function walk(t, t0, t1, dx) {   // go dx to the side with small steps, and lean into the walk
  const e = ease(t, t0, t1), steps = Math.max(2, Math.round(Math.abs(dx) / 0.7));
  return { dx: dx * e, up: 0.12 * Math.abs(Math.sin(Math.PI * steps * e)), tilt: 8 * Math.sign(dx) * Math.sin(Math.PI * e) };
}

const leave = (t, t0) => [   // hop, step back behind the row, then walk out to the right
  hop(t, t0, 0.35, 0.45),
  { z: 0.45 * ease(t, t0 + 0.45, t0 + 0.8), s: 1 - 0.12 * ease(t, t0 + 0.45, t0 + 0.8) },
  walk(t, t0 + 0.8, t0 + 2.8, 9),
];

// What a bot does by itself, at its own times. seed makes each bot different.
function gaze(t, seed) {   // where the eyes look: [x, z] from -1 to 1. A new place every 1 to 2.2 s.
  const len = 1 + 1.2 * hash(seed, 3), k = Math.floor(t / len);
  const to = (j) => (hash(seed, 4 * j + 10) < 0.25 ? [0, 0] : [2 * hash(seed, 4 * j + 11) - 1, 1.5 * hash(seed, 4 * j + 12) - 0.5]);
  const m = settle(t - k * len - 0.45 * len * hash(seed, 4 * k + 13)), a = to(k - 1), b = to(k);
  return [a[0] + (b[0] - a[0]) * m, a[1] + (b[1] - a[1]) * m];
}
function lids(t, seed) {   // a blink every 1.6 to 3.4 s (sometimes 2 blinks), and a squint now and then
  const len = 1.6 + 1.8 * hash(seed, 5), k = Math.floor(t / len), t0 = k * len + 0.5 * len * hash(seed, 3 * k + 20);
  const twice = hash(seed, 3 * k + 21) < 0.25 ? shut(t, t0 + 0.27) : 0;
  const sl = 4.5 + 3 * hash(seed, 6), j = Math.floor(t / sl), s0 = j * sl + 0.4 * sl * hash(seed, 3 * j + 22);
  const narrow = hash(seed, 3 * j + 23) < 0.6 ? hold(t, s0, s0 + 1.1, 0.18) : 0;
  return (1 - 0.92 * Math.max(shut(t, t0), twice)) * (1 - 0.45 * narrow);
}

// ---- shapes and characters ----------------------------------------------------------------------

const ADD = new Set(["dx", "z", "up", "tilt", "ex", "ez"]);
function merge(poses) {
  const p = { s: 1, sx: 1, sz: 1, dx: 0, z: 0, up: 0, tilt: 0, eye: 1, gaze: 1, ex: 0, ez: 0 };
  for (const q of poses.flat(2)) for (const k in q) p[k] = ADD.has(k) ? p[k] + q[k] : p[k] * q[k];
  return p;
}
const place = (x, z, p, body) =>
  `<g transform="translate(${n(x + p.dx)} ${n(-z - p.z - p.up)}) rotate(${n(p.tilt)}) scale(${n(p.s * p.sx)} ${n(p.s * p.sz)})">${body}</g>`;

const ball = (x, z, rx, rz, color, ...poses) =>
  place(x, z, merge(poses), `<ellipse rx="${rx}" ry="${rz}" fill="${PALETTE[color]}"/>`);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const label = (text, x, z, size, color = "text", ...poses) => place(x, z, merge(poses),
  `<text font-size="${size}" fill="${PALETTE[color]}" text-anchor="middle" dominant-baseline="central">${esc(text)}</text>`);

const circles = (list) => list.map(([x, z, r]) => `<circle cx="${x}" cy="${-z}" r="${r}"/>`).join("");
function rounded(points, k) {   // a polygon with round corners. points: [x, z]. k: the part of each side that bends
  const at = (a, b) => `${n(a[0] + (b[0] - a[0]) * k)} ${n(-a[1] - (b[1] - a[1]) * k)}`;
  return `<path d="${points.map((q, i) => {
    const p = points.at(i - 1), r = points[(i + 1) % points.length];
    return `${i ? "L" : "M"}${at(q, p)}Q${n(q[0])} ${n(-q[1])} ${at(q, r)}`;
  }).join("")}Z"/>`;
}
const around = (count, r, z, turn = 0) =>
  Array.from({ length: count }, (_, i) => { const a = turn + (2 * Math.PI * i) / count; return [r * Math.cos(a), z + r * Math.sin(a)]; });

// The bodies. Size 1 is about 2 units high and 2 units wide. The feet are at (0, 0).
// round: [middle height, half width, half height] of a ball with about the shape of the body. The eyes and the shading sit on it.
// The face: high (the height of the eyes), gap (half the space between the eyes) and eye (the size of the eyes).
const BODY = {
  ball: { body: circles([[0, 1, 1]]), round: [1, 1, 1], high: 1.1, gap: 0.34, eye: 1 },
  egg: { body: `<ellipse cy="-1.06" rx="0.86" ry="1.06"/>`, round: [1.06, 0.86, 1.06], high: 1.2, gap: 0.3, eye: 0.95 },
  squircle: { body: `<rect x="-0.95" y="-1.9" width="1.9" height="1.9" rx="0.62"/>`, round: [0.95, 0.98, 0.95], high: 1.1, gap: 0.38, eye: 1 },
  pill: { body: `<rect x="-1.12" y="-1.46" width="2.24" height="1.46" rx="0.73"/>`, round: [0.73, 1.12, 0.73], high: 0.78, gap: 0.42, eye: 0.8 },
  mochi: { body: `<path d="M-0.88 0Q-1.04 0 -1.03 -0.25C-1 -1.2 -0.58 -1.78 0 -1.78C0.58 -1.78 1 -1.2 1.03 -0.25Q1.04 0 0.88 0Z"/>`,
    round: [0.78, 1, 1], high: 0.92, gap: 0.36, eye: 0.95 },
  drop: { body: `<path d="M0.12 -2.08C0.42 -1.75 0.92 -1.35 0.92 -0.92A0.92 0.92 0 0 1 -0.92 -0.92C-0.92 -1.45 -0.28 -1.82 0.02 -2.06Q0.07 -2.12 0.12 -2.08Z"/>`,
    round: [0.92, 0.92, 0.92], high: 0.88, gap: 0.3, eye: 0.9 },
  tri: { body: rounded([[0, 2.05], [1.15, 0], [-1.15, 0]], 0.3), round: [0.66, 0.8, 0.66], high: 0.72, gap: 0.26, eye: 0.75 },
  cloud: { body: circles([[-0.6, 0.85, 0.7], [0.6, 0.85, 0.7], [-0.35, 1.45, 0.65], [0.4, 1.45, 0.65], [0, 1.1, 0.85]]),
    round: [1.12, 1.15, 0.95], high: 1.12, gap: 0.36, eye: 1 },
  clover: { body: circles([[0, 0.95, 0.6], ...around(5, 0.52, 0.95, Math.PI / 2).map(([x, z]) => [n(x), n(z), 0.5])]),
    round: [0.95, 0.95, 0.95], high: 1, gap: 0.3, eye: 0.85 },
  hex: { body: rounded(around(6, 1.12, 0.98), 0.22), round: [0.98, 1.02, 0.92], high: 1, gap: 0.34, eye: 0.95 },
};
const DEFS = "<defs>" + Object.entries(BODY).map(([name, b]) => `<clipPath id="clip-${name}">${b.body}</clipPath>`).join("") + "</defs>";

// An eye is a stroke around a spine: an arc of length len that bends by bend (1 / radius). w is the width,
// taper makes the top end thinner, and turn (degrees) turns the eye. Below, each eye gets its outline and its catchlight
// as lists of points [a, b] (to the right and up): sides[0] for the left eye, sides[1] for the right eye (a mirror image).
const EYE = {
  pill: { w: 0.4, len: 0.42 }, tall: { w: 0.32, len: 0.62 }, dot: { w: 0.5, len: 0 }, wide: { w: 0.32, len: 0.38, turn: 90 },
  bean: { w: 0.4, len: 0.48, bend: 1.8 }, comma: { w: 0.46, len: 0.46, bend: 3, taper: 0.75 }, arc: { w: 0.15, len: 0.6, bend: 4.5, turn: 90 },
};
for (const e of Object.values(EYE)) {
  const { w, len, bend = 0, taper = 0 } = e, mid = bend ? (1 - Math.cos((len * bend) / 2)) / (2 * bend) : 0;
  const c = Math.cos(((e.turn ?? 0) * Math.PI) / 180), s = Math.sin(((e.turn ?? 0) * Math.PI) / 180);
  const turn = ([a, b]) => [a * c + b * s, b * c - a * s];
  const spine = Array.from({ length: len ? 7 : 2 }, (_, i) => {
    const u = len ? i / 3 - 1 : 2 * i - 1, g = (u * len * bend) / 2;   // g: the angle of the spine at this point
    return { at: bend ? [(1 - Math.cos(g)) / bend - mid, Math.sin(g) / bend] : [0, (u * len) / 2],
      r: (w / 2) * (1 - (taper * (u + 1)) / 2), nx: Math.cos(g), nz: -Math.sin(g) };   // r: half the width. n: to the right
  });
  const side = (q, k) => [q.at[0] + k * q.r * q.nx, q.at[1] + k * q.r * q.nz];
  const cap = (q, k) => [1, 2, 3, 4, 5].map((j) => {   // a round end: k = 1 at the top, -1 at the bottom
    const cj = Math.cos((j * Math.PI) / 6), sj = Math.sin((j * Math.PI) / 6);
    return [q.at[0] + k * q.r * (q.nx * cj - q.nz * sj), q.at[1] + k * q.r * (q.nz * cj + q.nx * sj)];
  });
  const outline = [...spine.map((q) => side(q, 1)), ...cap(spine.at(-1), 1),
    ...spine.toReversed().map((q) => side(q, -1)), ...cap(spine[0], -1)].map(turn);
  const q = spine[taper ? 1 : spine.length - 2], [qa, qb] = turn(q.at), r = 0.38 * q.r;
  e.sides = [1, -1].map((m) => ({ outline: outline.map(([a, b]) => [m * a, b]),
    shine: w >= 0.3 && Array.from({ length: 10 }, (_, j) =>
      [m * qa - 0.32 * q.r + r * Math.cos((j * Math.PI) / 5), qb + 0.2 * q.r + r * Math.sin((j * Math.PI) / 5)]) }));
}
const smooth = (points) => {   // a closed smooth path through the middles of the sides of a polygon
  const mid = (p, q) => `${n((p[0] + q[0]) / 2)} ${n((p[1] + q[1]) / 2)}`;
  return `M${mid(points.at(-1), points[0])}` + points.map((p, i) => `Q${n(p[0])} ${n(p[1])} ${mid(p, points[(i + 1) % points.length])}`).join("") + "Z";
};

// The shadow side of a body: the part of its ball away from the light. The light comes from the top left and a little
// from the front. The shadow side is painted on the ball, so it turns with the face (yaw to the right, pitch up, in radians).
const LIGHT = [-0.5, 0.6, 0.7].map((v, i, l) => v / Math.hypot(...l));
function shade(yaw, pitch, [cz, ax, az]) {
  const y1 = LIGHT[1] * Math.cos(pitch) + LIGHT[2] * Math.sin(pitch), z1 = LIGHT[2] * Math.cos(pitch) - LIGHT[1] * Math.sin(pitch);
  const lx = LIGHT[0] * Math.cos(yaw) + z1 * Math.sin(yaw), lz = z1 * Math.cos(yaw) - LIGHT[0] * Math.sin(yaw);
  const d = [lx / Math.hypot(lx, y1), y1 / Math.hypot(lx, y1)], e = [-d[1], d[0]], m = [-lz * d[0], -lz * d[1]], K = 0.5523;
  const at = (i, j, k) => `${n(ax * (i * e[0] + j * d[0] + k * m[0]))} ${n(-cz - az * (i * e[1] + j * d[1] + k * m[1]))}`;
  // Across the ball, around a far box on the shadow side, then back along the edge of the light (half an ellipse).
  return `M${at(1, 0, 0)}L${at(3, 0, 0)}L${at(3, -3, 0)}L${at(-3, -3, 0)}L${at(-3, 0, 0)}L${at(-1, 0, 0)}` +
    `C${at(-1, 0, K)} ${at(-K, 0, 1)} ${at(0, 0, 1)}C${at(K, 0, 1)} ${at(1, 0, K)} ${at(1, 0, 0)}Z`;
}

// A bot: a flat blob with 2 big eyes. By itself it breathes, looks around, blinks and squints, at its own times,
// and the body leans after the eyes. kind: shape, color, eyes (the eye color), eye (the eye shape),
// tilt (degrees, or [left, right]), gap, side and high (the place of the eyes; the shape gives gap and high), size.
function blob(x, t, kind, ...poses) {
  const b = BODY[kind.shape], k = { eyes: "crust", eye: "pill", tilt: 0, gap: b.gap, high: b.high, side: 0, size: 1, ...kind };
  const p = merge(poses), name = `${x} ${k.shape} ${k.color}`;
  let seed = 7;
  for (let i = 0; i < name.length; i++) seed = Math.imul(seed ^ name.charCodeAt(i), 16777619);
  const breath = Math.sin(2 * Math.PI * (t / (2.4 + hash(seed, 1)) + hash(seed, 2)));
  const [gx, gz] = gaze(t, seed), lean = gaze(t - 0.14, seed)[0];   // the body follows the eyes a little late
  p.tilt += 6 * lean * p.gaze + 25 * p.ex;
  p.ex += 0.22 * gx * p.gaze;
  p.ez += 0.14 * gz * p.gaze + 0.015 * breath;
  p.sz *= 1 + 0.028 * breath;
  p.sx *= 1 - 0.018 * breath;
  p.eye *= lids(t, seed);
  p.s *= k.size;

  const s = p.s, X = x + p.dx, air = Math.min(1, p.up / 1.2), c = PALETTE[k.color];
  const shadow = `<ellipse cx="${n(X)}" cy="${n(-p.z)}" rx="${n(1.05 * s * (1 - 0.4 * air))}" ry="${n(0.2 * s * (1 - 0.4 * air))}" ` +
    `fill="${PALETTE.crust}" opacity="${n(0.5 * (1 - 0.6 * air))}"/>`;
  // The face turns on the ball: the eyes go around its curve, and the eye near the edge gets narrow and bends.
  const [cz, ax, az] = b.round, gap = k.gap / ax, turn = 2.7 * p.ex, rise = 2.5 * p.ez;
  const yaw = Math.max(gap - 1.12, Math.min(1.12 - gap, Math.asin(k.side / ax) + turn));
  const pitch = Math.max(-0.9, Math.min(0.9, Math.asin(Math.max(-1, Math.min(1, (k.high - cz) / az))) + rise));
  const rim = k.eyes === "crust" || k.eyes === "text" ? "" : ` stroke="${PALETTE.crust}" stroke-width="0.06"`;
  const eye = (i) => {   // i = -1 (left) or 1 (right)
    const y = yaw + i * gap, cy = Math.cos(y), sy = Math.sin(y), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const tilt = ([k.tilt].flat().at(i < 0 ? 0 : -1) * Math.PI) / 180, ct = Math.cos(tilt), st = Math.sin(tilt);
    const size = b.eye, { outline, shine } = EYE[k.eye].sides[(i + 1) / 2];
    const path = (points) => smooth(points.map(([a, h]) => {   // from the face to the ball: go a and h along the surface
      h *= p.eye;
      const u = (size * (a * ct + h * st)) / ax, v = (size * (h * ct - a * st)) / az, r = Math.hypot(u, v), f = r ? Math.sin(r) / r : 1;
      return [ax * (sy * cp * Math.cos(r) + f * (u * cy - v * sy * sp)), -cz - az * (sp * Math.cos(r) + f * v * cp)];
    }));
    return `<path d="${path(outline)}" fill="${PALETTE[k.eyes]}"${rim}/>` +
      (shine && k.eyes !== "text" ? `<path d="${path(shine)}" fill="${PALETTE.text}" opacity="0.85"/>` : "");
  };
  return shadow + place(x, 0, p, `<g fill="${c}">${b.body}</g><g clip-path="url(#clip-${k.shape})">` +
    `<path d="${shade(turn / 2, rise / 2, b.round)}" fill="${mix(c, PALETTE.crust, 0.32)}"/>${eye(-1)}${eye(1)}</g>`);
}

// The bots. 0 is the narrator. Each one has its own shape, colors and eyes.
const CAST = [
  { shape: "cloud", color: "teal" },
  { shape: "ball", color: "mauve", eye: "bean", tilt: 10 },
  { shape: "drop", color: "peach", eye: "dot", side: 0.12 },
  { shape: "tri", color: "pink", eye: "tall" },
  { shape: "squircle", color: "text" },
  { shape: "clover", color: "red", eye: "wide", tilt: [14, -14] },
  { shape: "hex", color: "yellow", eye: "dot", side: 0.32, high: 0.8, gap: 0.25 },
  { shape: "pill", color: "green", eye: "arc" },
  { shape: "egg", color: "sky", eye: "comma", tilt: -8 },
  { shape: "mochi", color: "lavender", eye: "bean" },
  { shape: "ball", color: "overlay0", eyes: "text", eye: "tall", tilt: 18, side: -0.12 },
  { shape: "cloud", color: "flamingo", eye: "arc", tilt: 16 },
  { shape: "tri", color: "sapphire", eye: "dot" },
  { shape: "drop", color: "maroon", eye: "comma", tilt: [-10, 10] },
  { shape: "squircle", color: "blue", eye: "tall", side: 0.1 },
  { shape: "hex", color: "rosewater", eye: "bean", tilt: 6 },
  { shape: "egg", color: "peach", eye: "tall" },
  { shape: "clover", color: "green", eye: "comma", tilt: -6, high: 1.08 },
];

const mascot = (x, t, ...poses) => blob(x, t, CAST[0], ...poses);   // the narrator
const islander = (x, t, eyes, shape, ...poses) => blob(x, t, { shape, color: "text", eyes, size: 0.62 }, ...poses);
const row = (count, center = 0, step = 1.25) => Array.from({ length: count }, (_, i) => center + step * (i - (count - 1) / 2));
