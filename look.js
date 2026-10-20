// The look and the motion of all videos. It is a plain script (no module), so that a page loads it from file://.
// Each function is pure: the same t always gives the same SVG.
// The frame shows x from -5 to 5 (to the right) and z from -1.2 to 4.4 (up). All times are in seconds.
// A pose is a small object such as {z: 0.3} or {s: 0.5}. A shape takes any number of poses and adds them:
// dx, z, tilt (degrees), ex and ez (eye move) add. s (size), sx, sz (squash and stretch) and eye (eye height) multiply.

const PALETTE = {
  stage: "#0B0B0D", text: "#FFFFFF", blue: "#1B7BFF", amber: "#FFB000", gold: "#FFC933",
  teal: "#00B89C", purple: "#9B5CFF", white: "#F7F7F7", ink: "#111114", brown: "#8B5A2B",
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

const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -4.4 10 5.625" font-family="Inter" font-weight="600">` +
  `<rect x="-5" y="-4.4" width="10" height="5.625" fill="${PALETTE.stage}"/>${body}</svg>`;

// ---- motion: each function gives a pose for time t ---------------------------------------------

const clamp = (u) => (u < 0 ? 0 : u > 1 ? 1 : u);
function ease(t, t0, t1) {   // 0 before t0, 1 after t1, smooth in and out
  const u = clamp((t - t0) / (t1 - t0));
  return u * u * (3 - 2 * u);
}
const bump = (t, t0, t1) => (t <= t0 || t >= t1 ? 0 : Math.sin((Math.PI * (t - t0)) / (t1 - t0)) ** 2);
const squash = (sz) => ({ sz, sx: 1 / Math.sqrt(sz) });   // keep the area the same

function pop(t, t0) {   // grow from nothing with a spring: overshoot, stretch, then settle
  const u = t - t0;
  if (u <= 0) return { s: 0, z: -0.25 };
  const e = Math.exp(-u / 0.08), s = 1 - e * Math.cos(17.5 * u);
  return { s, z: -0.25 * Math.max(0, 1 - s), ...squash(1 + 0.16 * Math.exp(-u / 0.1) * Math.sin(17.5 * u)) };
}

function out(t, t0, d = 0.3) {   // swell a little, then shrink to nothing
  const k = clamp((t - t0) / d);
  return { s: k >= 1 ? 0 : (1 + 0.15 * Math.sin(Math.PI * k)) * (1 - k ** 3) };
}

function hop(t, t0, h = 0.5, d = 0.5) {   // crouch, jump on an arc, land with a squash
  const z = (tt) => { const k = (tt - t0) / d; return k > 0 && k < 1 ? 4 * h * k * (1 - k) : 0; };
  return {
    z: z(t), ez: 0.4 * (z(t - 0.06) - z(t)),   // the eyes follow a little late
    ...squash(1 - 0.16 * bump(t, t0 - 0.16, t0 + 0.04) + 0.14 * bump(t, t0, t0 + 0.5 * d)
      - 0.2 * bump(t, t0 + d, t0 + d + 0.18) + 0.05 * bump(t, t0 + d + 0.14, t0 + d + 0.36)),
  };
}

const blink = (t, t0) => ({ eye: 1 - 0.9 * bump(t, t0, t0 + 0.18) });

const glance = (t, t0, d = 1.2) => {   // look to one side, then to the other side
  const k = clamp((t - t0) / d);
  return { ex: 0.16 * Math.sin(2 * Math.PI * k) * Math.sin(Math.PI * k) };
};

const wave = (t, t0, d = 1.6, deg = 12) => {   // rock from side to side
  const k = clamp((t - t0) / d);
  return { tilt: deg * Math.sin(4 * Math.PI * k) * Math.sin(Math.PI * k) };
};

function walk(t, t0, t1, dx) {   // go dx to the side with small steps, and lean into the walk
  const e = ease(t, t0, t1), steps = Math.max(2, Math.round(Math.abs(dx) / 0.7));
  return { dx: dx * e, z: 0.12 * Math.abs(Math.sin(Math.PI * steps * e)), tilt: 8 * Math.sign(dx) * Math.sin(Math.PI * e) };
}

const leave = (t, t0) => [   // hop, step back behind the row, then walk out to the right
  hop(t, t0, 0.35, 0.45),
  { z: 0.45 * ease(t, t0 + 0.45, t0 + 0.8), s: 1 - 0.12 * ease(t, t0 + 0.45, t0 + 0.8) },
  walk(t, t0 + 0.8, t0 + 2.8, 9),
];

const glide = (t, t0, t1, dx, dz, arc = 0) => {   // move on an arc
  const e = ease(t, t0, t1);
  return { dx: dx * e, z: dz * e + arc * Math.sin(Math.PI * e) };
};

const flip = (t, t0, t1, turns = 1) => ({ sx: Math.cos(2 * Math.PI * turns * ease(t, t0, t1)) });

// ---- shapes and characters ----------------------------------------------------------------------

const n = (v) => Math.round(v * 1000) / 1000;
const ADD = new Set(["dx", "z", "tilt", "ex", "ez"]);
function merge(poses) {
  const p = { s: 1, sx: 1, sz: 1, dx: 0, z: 0, tilt: 0, eye: 1, ex: 0, ez: 0 };
  for (const q of poses.flat(2)) for (const k in q) p[k] = ADD.has(k) ? p[k] + q[k] : p[k] * q[k];
  return p;
}
// A shape with size 0 stays in the SVG. Thus each frame of a scene has the same shapes, and the check can compare them.
const place = (x, z, p, body) =>
  `<g transform="translate(${n(x + p.dx)} ${n(-z - p.z)}) rotate(${n(p.tilt)}) scale(${n(p.s * p.sx)} ${n(p.s * p.sz)})">${body}</g>`;

const ball = (x, z, rx, rz, color, ...poses) =>
  place(x, z, merge(poses), `<ellipse rx="${rx}" ry="${rz}" fill="${PALETTE[color]}"/>`);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const label = (text, x, z, size, color = "text", ...poses) => place(x, z, merge(poses),
  `<text font-size="${size}" fill="${PALETTE[color]}" text-anchor="middle" dominant-baseline="central">${esc(text)}</text>`);

const BODY = {   // size 1 is 2 units high. The feet are at (0, 0).
  ball: (c) => `<circle cy="-1" r="1" fill="${c}"/>`,
  squircle: (c) => `<rect x="-0.95" y="-1.9" width="1.9" height="1.9" rx="0.55" fill="${c}"/>`,
  cloud: (c) => [[-0.6, 0.85, 0.7], [0.6, 0.85, 0.7], [-0.35, 1.45, 0.65], [0.4, 1.45, 0.65], [0, 1.1, 0.85]]
    .map(([x, z, r]) => `<circle cx="${x}" cy="${-z}" r="${r}" fill="${c}"/>`).join(""),
};

// A character: a flat blob with 2 pill eyes. It breathes and blinks by itself, so it never freezes.
function blob(x, t, shape, color, size, eyes, ...poses) {
  const p = merge(poses), ph = (((x * 0.37) % 1) + 1) % 1;   // each character has its own rhythm
  const breath = Math.sin(2 * Math.PI * (t / 2.6 + ph));
  p.s *= size;
  p.sz *= 1 + 0.018 * breath;
  p.sx *= 1 - 0.012 * breath;
  const eye = p.eye * (1 - 0.9 * bump((t + 3.7 * ph) % 3.7, 0, 0.18));
  const pill = (ex) => `<rect x="-0.14" y="-0.29" width="0.28" height="0.58" rx="0.14" fill="${PALETTE[eyes]}" ` +
    `transform="translate(${n(ex + p.ex)} ${n(-1.15 - p.ez)}) rotate(12.6) scale(1 ${n(eye)})"/>`;
  return place(x, 0, p, BODY[shape](PALETTE[color]) + pill(-0.3) + pill(0.3));
}

const mascot = (x, t, ...poses) => blob(x, t, "cloud", "teal", 1, "ink", ...poses);   // the narrator
const islander = (x, t, eyes, shape, ...poses) => blob(x, t, shape, "white", 0.62, eyes, ...poses);
const row = (count, center = 0, step = 1.25) => Array.from({ length: count }, (_, i) => center + step * (i - (count - 1) / 2));
