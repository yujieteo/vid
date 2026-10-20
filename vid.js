// The tool for the videos. It needs Node 22 or later.
//   node vid.js make    Make the voice of each new sentence, and the page of each video: videos/<name>/index.html.
//   node vid.js check   Draw each scene at 60 frames each second. Fail if a frame has an error.
// The check uses the voice times if the voice exists. If not (for example in CI), it uses stand-in times.
import fs from "node:fs";
import vm from "node:vm";
import { createHash } from "node:crypto";

const VOICE = "af_heart", RATE = 24000, KEEP = 1200;   // KEEP: samples of silence to keep at each end of a sentence (50 ms)
const DELAY = 1105;   // samples of silence that MP3 adds at the start (576 + 529). The file starts with less silence for them.
const STAND_IN = 0.066;   // seconds for each character of a sentence, when the sentence has no voice yet
const FPS = 60;

const look = vm.createContext({});
vm.runInContext(fs.readFileSync("look.js", "utf8"), look, { filename: "look.js" });
const { timeline, cues, svg, said } = vm.runInContext("({ timeline, cues, svg, said })", look);
const scenesOf = (name) => fs.readdirSync(`videos/${name}/scenes`).filter((f) => f.endsWith(".js")).sort();
const videos = () => (fs.existsSync("videos") ? fs.readdirSync("videos") : []).filter((v) => fs.existsSync(`videos/${v}/scenes`) && scenesOf(v).length).sort();

function load(name) {   // the scenes of a video. Each sentence has its voice file (if it exists) and its seconds.
  const dir = `videos/${name}`, have = fs.existsSync(`${dir}/voice`) ? fs.readdirSync(`${dir}/voice`) : [];
  return scenesOf(name).map((file) => {
    let got;
    look.scene = (narration, draw) => (got = { file, narration, draw });
    vm.runInContext(fs.readFileSync(`${dir}/scenes/${file}`, "utf8"), look, { filename: `${dir}/scenes/${file}` });
    got.voice = got.narration.map((sentence) => {
      const id = createHash("sha1").update(`${VOICE} ${said(sentence)}`).digest("hex").slice(0, 12);
      const f = have.find((h) => h.startsWith(`${id}-`));   // the name of a voice file gives its length: <id>-<ms>.mp3
      return { id, text: said(sentence), file: f && `voice/${f}`, seconds: f ? +f.slice(13, -4) / 1000 : STAND_IN * said(sentence).length };
    });
    return got;
  });
}

let tts, Mp3Encoder;
async function speak(text) {   // gives the mp3 bytes and the length in samples
  if (!tts) {
    ({ Mp3Encoder } = await import("@breezystack/lamejs"));
    const { KokoroTTS } = await import("kokoro-js");
    tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "fp32", device: "cpu" });
  }
  const a = (await tts.generate(text, { voice: VOICE })).audio, loud = (v) => Math.abs(v) > 0.01;
  const pcm = a.subarray(Math.max(0, a.findIndex(loud) - KEEP + DELAY), a.findLastIndex(loud) + KEEP);
  const enc = new Mp3Encoder(1, RATE, 48), s16 = Int16Array.from(pcm, (v) => Math.max(-1, Math.min(1, v)) * 32767);
  const parts = [];
  for (let i = 0; i < s16.length; i += 1152) parts.push(enc.encodeBuffer(s16.subarray(i, i + 1152)));
  parts.push(enc.flush());
  return { mp3: Buffer.concat(parts.map((p) => Buffer.from(p.buffer, p.byteOffset, p.length))), samples: pcm.length + DELAY };
}

async function make() {
  for (const name of videos()) {
    const dir = `videos/${name}`, scenes = load(name), made = new Map();
    fs.mkdirSync(`${dir}/voice`, { recursive: true });
    for (const v of scenes.flatMap((s) => s.voice)) {
      if (!v.file && !made.has(v.id)) {
        const { mp3, samples } = await speak(v.text), ms = Math.round((samples / RATE) * 1000);
        made.set(v.id, [`voice/${v.id}-${ms}.mp3`, ms / 1000]);
        fs.writeFileSync(`${dir}/${made.get(v.id)[0]}`, mp3);
        console.log(`${dir}/${made.get(v.id)[0]}: ${v.text}`);
      }
      if (!v.file) [v.file, v.seconds] = made.get(v.id);
    }
    const used = new Set(scenes.flatMap((s) => s.voice.map((v) => v.file)));
    for (const f of fs.readdirSync(`${dir}/voice`)) if (!used.has(`voice/${f}`)) fs.rmSync(`${dir}/voice/${f}`);
    const title = fs.readFileSync(`${dir}/outline.md`, "utf8").match(/^# (.+)$/m)[1];
    fs.writeFileSync(`${dir}/index.html`, `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="../../player.css">
<main id="pic"></main>
<nav><button id="play">Play</button><input id="seek" type="range" min="0" step="any" value="0"><output id="clock"></output></nav>
<script src="../../look.js"></script>
<script src="../../player.js"></script>
${scenes.map((s) => `<script src="scenes/${s.file}"></script>`).join("\n")}
<script>video(${JSON.stringify(scenes.map((s) => s.voice.map((v) => [v.file, v.seconds])))})</script>
`);
    console.log(`${dir}/index.html: ${scenes.length} scenes`);
  }
}

function check() {
  let problems = 0;
  for (const name of videos()) for (const s of load(name)) {
    const where = `videos/${name}/scenes/${s.file}`, fail = (t, why) => (problems++, console.log(`${where} at ${t.toFixed(3)} s: ${why}`));
    const { beats, length } = timeline(s.narration, s.voice.map((v) => v.seconds));
    const at = cues(beats, s.narration);
    for (let k = 0; k <= Math.ceil(length * FPS); k++) {
      const t = k / FPS;
      let pic;
      try { pic = svg(s.draw(t, at, beats)); } catch (e) { fail(t, e.message); break; }
      if (/NaN|undefined|Infinity/.test(pic)) { fail(t, "NaN or undefined in the SVG"); break; }
    }
    const voiced = s.voice.every((v) => v.file) ? "voice" : "stand-in times";
    console.log(`${where}: ${length.toFixed(1)} s (${voiced})`);
  }
  console.log(problems ? `${problems} problems` : "check OK");
  process.exitCode = problems ? 1 : 0;
}

const command = { make, check }[process.argv[2]];
if (!command) throw new Error("usage: node vid.js make | check");
await command();
