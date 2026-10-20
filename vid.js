// The tool for the videos. It needs Node 22 or later.
//   node vid.js make    Make the voice of each new sentence, and the page of each video: videos/<name>/index.html.
//   node vid.js check   Draw each scene at 60 frames each second. Fail if a frame has an error.
// The check uses the voice times if the voice exists. If not (for example in CI), it uses stand-in times.
import fs from "node:fs";
import vm from "node:vm";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

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

// The voice packages and the voice model live in 1 folder for all copies of the project. The model downloads into its node_modules.
const VOICE_HOME = path.join(os.homedir(), ".cache", "vid");
function voiceInstall() {   // installs the voice packages (npm ci) if they are missing or if their lock file is not the project's
  const lock = fs.readFileSync("package-lock.json", "utf8"), done = path.join(VOICE_HOME, "installed-lock.json");
  if (!fs.existsSync(path.join(VOICE_HOME, "node_modules")) || !fs.existsSync(done) || fs.readFileSync(done, "utf8") !== lock) {
    console.log(`Installing the voice packages in ${VOICE_HOME}`);
    fs.mkdirSync(VOICE_HOME, { recursive: true });
    fs.rmSync(done, { force: true });
    fs.copyFileSync("package.json", path.join(VOICE_HOME, "package.json"));
    fs.writeFileSync(path.join(VOICE_HOME, "package-lock.json"), lock);
    execFileSync("npm", ["ci"], { cwd: VOICE_HOME, stdio: "inherit" });
    fs.writeFileSync(done, lock);   // written last: a failed install is tried again
  }
}
const fromVoice = (pkg, file) => import(pathToFileURL(path.join(VOICE_HOME, "node_modules", pkg, file)).href);

let tts, Mp3Encoder;
async function speak(text) {   // gives the mp3 bytes and the length in samples
  if (!tts) {
    voiceInstall();
    ({ Mp3Encoder } = await fromVoice("@breezystack/lamejs", "dist/lamejs.js"));
    const { KokoroTTS } = await fromVoice("kokoro-js", "dist/kokoro.js");
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
