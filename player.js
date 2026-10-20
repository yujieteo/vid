// The page of one video. It plays the scenes with their voice and draws at the refresh rate of the display.
// It uses only plain scripts and audio files, so it opens from file:// with no server.
const SCENES = [];
const scene = (narration, draw) => SCENES.push({ narration, draw });   // each scene file calls this

function video(voice) {   // voice[i][j] = [audio file, seconds] of sentence j in scene i
  const $ = (id) => document.getElementById(id);
  let total = 0;
  const scenes = SCENES.map((s, i) => {
    const { beats, length } = timeline(s.narration, voice[i].map((v) => v[1]));
    total += length;
    return { ...s, beats, start: total - length, at: cues(beats, s.narration) };
  });
  const clips = scenes.flatMap((s, i) => s.beats.map(([b0, b1], j) =>
    ({ at: s.start + b0, end: s.start + b1, audio: Object.assign(new Audio(voice[i][j][0]), { preload: "auto" }) })));

  // The picture clock is performance.now(). While a sentence plays, the clock moves to the time of the sound,
  // by at most 2 ms in each frame. Thus the picture and the voice stay together, and the picture never jumps.
  let zero = null, pos = 0, last = "";   // zero: the clock time of video time 0 while the video plays, else null
  const clock = () => performance.now() / 1000;
  const now = () => (zero === null ? pos : clock() - zero);
  const play = () => { if (pos >= total) pos = 0; zero = clock() - pos; $("play").textContent = "Pause"; };
  const stop = () => {
    pos = Math.min(now(), total);
    zero = null;
    for (const c of clips) if (c.on) { c.audio.pause(); c.on = false; }
    $("play").textContent = "Play";
  };
  const toggle = () => (zero === null ? play() : stop());
  $("play").onclick = $("pic").onclick = toggle;
  addEventListener("keydown", (e) => { if (e.key === " ") { e.preventDefault(); toggle(); } });
  $("seek").max = total;
  $("seek").oninput = () => { const was = zero !== null; stop(); pos = +$("seek").value; if (was) play(); };
  const mmss = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  (function frame() {
    let t = now();
    if (zero !== null && t >= total) stop();
    if (zero !== null) for (const c of clips) {
      const on = t >= c.at && t < c.end;
      if (on && !c.on) { c.audio.currentTime = t - c.at; c.audio.play(); }
      if (!on && c.on) c.audio.pause();
      if (on) zero += Math.max(-0.002, Math.min(0.002, t - c.at - c.audio.currentTime));
      c.on = on;
    }
    t = Math.min(now(), total - 1e-6);
    const s = scenes.findLast((s) => s.start <= t), pic = svg(s.draw(t - s.start, s.at, s.beats));
    if (pic !== last) $("pic").innerHTML = last = pic;
    $("seek").value = t;
    $("clock").textContent = `${mmss(t)} / ${mmss(total)}`;
    requestAnimationFrame(frame);
  })();
}
