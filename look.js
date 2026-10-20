// The look and the motion of all videos. It is a plain script (no module), so that a page loads it from file://.
// Each function is pure: the same t always gives the same SVG. Motion that looks random comes from hash(), not Math.random().
// The frame shows x from -5 to 5 (to the right) and z from -1.2 to 4.4 (up). All times are in seconds.
// A pose is a small object such as {z: 0.3} or {s: 0.5}. A shape takes any number of poses and adds them:
// dx, z, up (height above the ground), tilt (degrees), ex and ez (eye move) and spin (the face around the body, radians) add.
// s (size), sx, sz (squash and stretch), eye (eye height) and gaze (how much the eyes look around by themselves) multiply.

// The stage (crust) and the text come from Catppuccin Mocha (https://catppuccin.com/palette).
// The bots: 1 bright, saturated color each, with white eyes, as in Grok Bot.
const PALETTE = {
  crust: "#11111b", text: "#cdd6f4", white: "#ffffff",
  hotpink: "#ff2e88", red: "#ff3b3b", orange: "#ff7a1a", gold: "#ffaa00",
  green: "#1fc95b", sky: "#2ec5ff", blue: "#3d6bff", violet: "#9d4dff",
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

// The stage is 1 plain, flat, near-black color.
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -4.4 10 5.625" font-family="Inter" font-weight="600">` +
  `${DEFS}<rect x="-5" y="-4.4" width="10" height="5.625" fill="${PALETTE.crust}"/>${body}</svg>`;

// ---- motion: each function gives a pose for time t ---------------------------------------------

const clamp = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);
function ease(t, t0, t1) {   // 0 before t0, 1 after t1, smooth in and out
  const u = clamp((t - t0) / (t1 - t0));
  return u * u * (3 - 2 * u);
}
const bump = (t, t0, t1) => (t <= t0 || t >= t1 ? 0 : Math.sin((Math.PI * (t - t0)) / (t1 - t0)) ** 2);
const hold = (t, t0, t1, r) => ease(t, t0, t0 + r) - ease(t, t1 - r, t1);   // go to 1 in r seconds, stay, go back to 0 at t1
// The blink and the turn of the head come from the Grok Bot reference animations (https://github.com/njpatel/omabot):
// a blink closes in 0.13 s, stays closed 0.06 s and opens in 0.21 s, and the head turns on a spring that is almost critically damped.
const shut = (t, t0) => ease(t, t0, t0 + 0.13) - ease(t, t0 + 0.19, t0 + 0.4);
const settle = (u) => (u <= 0 ? 0 : 1 - Math.exp(-21.7 * u) * (Math.cos(7.9 * u) + 2.75 * Math.sin(7.9 * u)));   // a quick move that settles
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

function hop(t, t0, h = 0.5, d = 0.5) {   // crouch, jump on an arc with wide eyes, land with a squash, bounce once more, settle
  const arc = (k, k0, k1, hh) => (k > k0 && k < k1 ? (4 * hh * (k - k0) * (k1 - k)) / (k1 - k0) ** 2 : 0);
  const z = (tt) => { const k = (tt - t0) / d; return arc(k, 0, 1, h) + arc(k, 1.2, 1.6, 0.15 * h); };
  return {
    up: z(t), ez: 0.4 * (z(t - 0.06) - z(t)),   // the eyes follow a little late
    eye: 1 + 0.15 * bump(t, t0, t0 + d) - 0.4 * bump(t, t0 + d - 0.02, t0 + d + 0.2),
    ...stretch(1 - 0.08 * bump(t, t0 - 0.16, t0 + 0.04) + 0.07 * bump(t, t0, t0 + 0.5 * d)
      - 0.12 * bump(t, t0 + d, t0 + 1.2 * d) - 0.05 * bump(t, t0 + 1.6 * d, t0 + 1.6 * d + 0.16)),
  };
}

function squash(t, t0) {   // stretch up a little, press down with closed eyes, then spring back with an overshoot
  const press = bump(t, t0, t0 + 0.26);
  return { eye: 1 - 0.7 * press, ...stretch(1 + 0.04 * bump(t, t0 - 0.22, t0) - 0.12 * press
    + 0.05 * bump(t, t0 + 0.2, t0 + 0.46) - 0.015 * bump(t, t0 + 0.42, t0 + 0.62)) };
}

const blink = (t, t0) => ({ eye: 1 - 0.92 * shut(t, t0) });
const squint = (t, t0, d = 1) => ({ eye: 1 - 0.5 * hold(t, t0, t0 + d, 0.18), sz: 1 - 0.03 * hold(t, t0, t0 + d, 0.18) });

// The eyes: ex and ez go from -1 to 1 (right and up). gaze stops the eyes from looking around by themselves.
const look = (t, t0, t1, ex, ez = 0) => {   // look at one place from t0 to t1, with a blink at the turn
  const m = settle(t - t0) - settle(t - t1);
  return { ex: 0.22 * ex * m, ez: 0.14 * ez * m, gaze: 1 - hold(t, t0 - 0.2, t1 + 0.3, 0.2), eye: 1 - 0.92 * shut(t, t0 - 0.05) };
};
const glance = (t, t0, d = 1.2) => {   // look to one side, then to the other side
  const k = clamp((t - t0) / d);
  return { ex: 0.16 * Math.sin(2 * Math.PI * k) * Math.sin(Math.PI * k), gaze: 1 - Math.sin(Math.PI * k) };
};

const wave = (t, t0, d = 1.6, deg = 12) => {   // rock from side to side
  const k = clamp((t - t0) / d);
  return { tilt: deg * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k) };
};

const spin = (t, t0, d = 0.9) =>   // the face goes 1 time around the body, as in the Grok Bot "working" and "done" states
  ({ spin: 2 * Math.PI * ease(t, t0, t0 + d), gaze: 1 - bump(t, t0 - 0.2, t0 + d + 0.2) });

// What a bot does by itself, at its own times. seed makes each bot different.
function gaze(t, seed) {   // where the eyes look: [x, z] from -1 to 1. A new place every 1 to 2.2 s.
  const len = 1 + 1.2 * hash(seed, 3), k = Math.floor(t / len);
  const to = (j) => (hash(seed, 4 * j + 10) < 0.25 ? [0, 0] : [2 * hash(seed, 4 * j + 11) - 1, 1.5 * hash(seed, 4 * j + 12) - 0.5]);
  const m = settle(t - k * len - 0.45 * len * hash(seed, 4 * k + 13)), a = to(k - 1), b = to(k);
  return [a[0] + (b[0] - a[0]) * m, a[1] + (b[1] - a[1]) * m];
}
function lids(t, seed) {   // a blink every 2.8 to 7.4 s (sometimes 2 blinks), and a squint now and then
  const len = 2.8 + 4.6 * hash(seed, 5), k = Math.floor(t / len), t0 = k * len + 0.5 * len * hash(seed, 3 * k + 20);
  const twice = hash(seed, 3 * k + 21) < 0.25 ? shut(t, t0 + 0.45) : 0;
  const sl = 4.5 + 3 * hash(seed, 6), j = Math.floor(t / sl), s0 = j * sl + 0.4 * sl * hash(seed, 3 * j + 22);
  const narrow = hash(seed, 3 * j + 23) < 0.6 ? hold(t, s0, s0 + 1.1, 0.18) : 0;
  return (1 - 0.92 * Math.max(shut(t, t0), twice)) * (1 - 0.45 * narrow);
}

// ---- shapes and characters ----------------------------------------------------------------------

const ADD = new Set(["dx", "z", "up", "tilt", "ex", "ez", "spin"]);
function merge(poses) {
  const p = { s: 1, sx: 1, sz: 1, dx: 0, z: 0, up: 0, tilt: 0, eye: 1, gaze: 1, ex: 0, ez: 0, spin: 0 };
  for (const q of poses.flat(2)) for (const k in q) p[k] = ADD.has(k) ? p[k] + q[k] : p[k] * q[k];
  return p;
}
const place = (x, z, p, body) =>
  `<g transform="translate(${n(x + p.dx)} ${n(-z - p.z - p.up)}) rotate(${n(p.tilt)}) scale(${n(p.s * p.sx)} ${n(p.s * p.sz)})">${body}</g>`;

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
const smooth = (points) => {   // a closed smooth path through the middles of the sides of a polygon
  const mid = (p, q) => `${n((p[0] + q[0]) / 2)} ${n((p[1] + q[1]) / 2)}`;
  return `M${mid(points.at(-1), points[0])}` + points.map((p, i) => `Q${n(p[0])} ${n(p[1])} ${mid(p, points[(i + 1) % points.length])}`).join("") + "Z";
};
function curve(f, count = 72) {   // a smooth closed body through count points of f(angle) = [x, z]. The lowest point goes to z = 0.
  const points = Array.from({ length: count }, (_, i) => f((2 * Math.PI * i) / count)), low = Math.min(...points.map((q) => q[1]));
  return `<path d="${smooth(points.map(([x, z]) => [x, low - z]))}"/>`;
}
const power = (v, e) => Math.sign(v) * Math.abs(v) ** e;
function drop(r, tip, half) {   // a ball of radius r on the ground, drawn up to a round point (radius tip, half angle half)
  const s = Math.sin(half), c = Math.cos(half), top = r + r / s - tip / s;   // top: the height of the centre of the point
  const at = (x, rr, z) => `${n(x * rr * c)} ${n(-z - rr * s)}`;   // where a side touches the circle of radius rr at height z
  return `<path d="M${at(-1, tip, top)}A${tip} ${tip} 0 0 1 ${at(1, tip, top)}L${at(1, r, r)}A${r} ${r} 0 1 1 ${at(-1, r, r)}Z"/>`;
}

// The bodies are the 8 shapes of the Grok Bot avatar system (https://x.ai/news/designing-grok-bot), measured there and drawn again.
// All are 2 units wide (the ball is 2 units high), as in Grok Bot. The feet are at (0, 0).
// round: [middle height, half width, half height] of a ball with about the shape of the body. The eyes sit on it, at the height high.
const BODY = {
  ball: { body: circles([[0, 1, 1]]), round: [1, 1, 1], high: 1.05 },
  pebble: { body: curve((a) => [Math.cos(a), Math.sin(a) * (0.9 + 0.1 * Math.sin(a))]), round: [0.85, 1, 0.9], high: 1 },   // wide at the bottom
  squircle: { body: curve((a) => [power(Math.cos(a), 0.63), power(Math.sin(a), 0.63)]), round: [1, 1, 1], high: 1.05 },
  pill: { body: `<rect x="-1" y="-1.3" width="2" height="1.3" rx="0.65"/>`, round: [0.65, 1, 0.65], high: 0.72 },
  drop: { body: drop(0.8, 0.12, 0.68), round: [0.8, 0.8, 0.8], high: 0.85 },
  tri: { body: rounded([[0, 2.1], [1.21, 0], [-1.21, 0]], 0.27), round: [0.7, 0.85, 0.7], high: 0.75 },
  cloud: { body: circles([[0.54, 0.59, 0.455], [-0.02, 0.525, 0.525], [-0.53, 0.59, 0.47], [-0.18, 1.06, 0.545], [0.37, 1.06, 0.435]]),
    round: [0.85, 1, 0.8], high: 0.9 },
  hex: { body: rounded(around(6, 1.045, 1, Math.PI / 2), 0.2), round: [1, 0.95, 1], high: 1 },
};
const DEFS = "<defs>" + Object.entries(BODY).map(([name, b]) => `<clipPath id="clip-${name}">${b.body}</clipPath>`).join("") + "</defs>";

// The eyes have the Grok Bot proportions, measured in the reference pictures: the eye centres are 0.27 of the body width apart,
// and an eye is a pill 0.115 of the body width wide and 0.25 long (with the round ends). APART is half the space between the eyes.
// EYE is the outline of the pill as points [a, h] (to the right and up): the right side, the top end, the left side, the bottom end.
const APART = 0.27, EYE = ((r, len) => {
  const side = (k) => [-1, -1 / 3, 1 / 3, 1].map((u) => [k * r, (k * u * len) / 2]);
  const end = (k) => [1, 2, 3, 4, 5].map((j) => [k * r * Math.cos((j * Math.PI) / 6), k * (len / 2 + r * Math.sin((j * Math.PI) / 6))]);
  return [...side(1), ...end(1), ...side(-1), ...end(-1)];
})(0.115, 0.27);

// A bot: a flat body in 1 color with 2 flat eyes (white, or the color of kind.eyes) (no outline, no shading, no shadow). By itself it breathes, looks around,
// blinks and squints, at its own times. The body stays upright: the eyes do the looking. kind: shape, color, eyes (optional).
function blob(x, t, kind, ...poses) {
  const b = BODY[kind.shape], p = merge(poses), name = `${x} ${kind.shape} ${kind.color}`;
  let seed = 7;
  for (let i = 0; i < name.length; i++) seed = Math.imul(seed ^ name.charCodeAt(i), 16777619);
  const breath = Math.sin(2 * Math.PI * (t / (2.4 + hash(seed, 1)) + hash(seed, 2)));
  const [gx, gz] = gaze(t, seed);
  p.ex += 0.22 * gx * p.gaze;
  p.ez += 0.14 * gz * p.gaze + 0.015 * breath;
  p.sz *= 1 + 0.015 * breath;
  p.sx *= 1 - 0.01 * breath;
  p.eye *= lids(t, seed);

  // The face turns on the ball: the eyes go around its curve, and the eye near the edge gets narrow and bends.
  // At most about 24 degrees to a side and 20 degrees up, as in the Grok Bot reference animations. The face also rolls
  // to the side that it looks at (at most 25 degrees), so the eyes tilt as in the reference pictures.
  // A spin takes the face around the back of the body: a point behind the ball goes to its edge, and a part that is all behind is not drawn.
  const [cz, ax, az] = b.round, gap = APART / ax, turn = 1.9 * p.ex, rise = 2.5 * p.ez;
  const yaw = Math.max(gap - 1.12, Math.min(1.12 - gap, turn)) + p.spin;
  const pitch = Math.max(-0.9, Math.min(0.9, Math.asin(Math.max(-1, Math.min(1, (b.high - cz) / az))) + rise));
  const face = (i, points) => {   // from the face to the ball: go a and h along the surface from the place of eye i (-1, 0 or 1)
    const y = yaw + i * gap, cy = Math.cos(y), sy = Math.sin(y), cp = Math.cos(pitch), sp = Math.sin(pitch);
    let front = 0;
    const on = points.map(([a, h]) => {
      const u = a / ax, v = h / az, r = Math.hypot(u, v), f = r ? Math.sin(r) / r : 1;
      const px = sy * cp * Math.cos(r) + f * (u * cy - v * sy * sp), pz = sp * Math.cos(r) + f * v * cp;
      const near = cy * cp * Math.cos(r) - f * (u * sy + v * cy * sp) >= 0, k = near ? 1 : 1 / Math.hypot(px, pz);
      front += near;
      return [ax * px * k, -cz - az * pz * k];
    });
    return front ? smooth(on) : "";
  };
  const draw = (d) => (d ? `<path d="${d}"/>` : "");
  const eyes = [-1, 1].map((i) => draw(face(i, EYE.map(([a, h]) => [a, h * p.eye])))).join("");
  const roll = Math.max(-25, Math.min(25, -90 * p.ex)), mid = `${n(ax * Math.sin(yaw) * Math.cos(pitch))} ${n(-cz - az * Math.sin(pitch))}`;
  return place(x, 0, p, `<g fill="${PALETTE[kind.color]}">${b.body}</g>` +
    `<g clip-path="url(#clip-${kind.shape})" fill="${PALETTE[kind.eyes ?? "white"]}"><g transform="rotate(${n(roll)} ${mid})">${eyes}</g></g>`);
}

// The cast: 8 bots, 1 for each shape, all with the same size and the same eyes. Each one has its own color.
// No bot has a shape and a color that the Grok Bot pictures show. 0 is the narrator: the approved hot pink ball.
const CAST = [
  { shape: "ball", color: "hotpink" },
  { shape: "hex", color: "green" },
  { shape: "pebble", color: "violet" },
  { shape: "squircle", color: "red" },
  { shape: "drop", color: "orange" },
  { shape: "cloud", color: "blue" },
  { shape: "tri", color: "gold" },
  { shape: "pill", color: "sky" },
];

const mascot = (x, t, ...poses) => blob(x, t, CAST[0], ...poses);   // the narrator
