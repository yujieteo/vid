# Video repo: rules for Claude

One prompt makes one video. A video is a folder `videos/<name>/`: an outline and 1 script for each scene.
A scene draws flat 2D SVG as a pure function of time. A page plays the scenes with the voice.
Each change goes to https://github.com/yujieteo/vid through a pull request. CI runs `node vid.js check`.

## Parts
- `look.js`: the timing, the shapes, the characters and the motion. All scenes use it.
- `player.js` and `player.css`: the page of a video. The Inter font is inside `player.css`.
- `vid.js`: `node vid.js make` makes the voice and the page. `node vid.js check` checks all scenes.
- Plain scripts only (no modules, no build step), so the page opens from file:// with a double-click.
- Git tracks the voice (`videos/<name>/voice/`) and the page (`videos/<name>/index.html`). `make` writes them: commit them with the video.

## Steps for one video
1. Write `outline.md` (1 page). List the facts. List the sources only for real facts that the video states, and use only facts that you read in a source.
   Never guess a fact. If a fact is missing, write that in the outline and leave it out of the video.
2. Write the scene files: `videos/<name>/scenes/01-name.js`, `02-name.js`, ...
3. Run `node vid.js check`. Fix each error.
4. Run `node vid.js make`. It makes the voice only for new sentences.
5. Open `videos/<name>/index.html` in Chrome. Look at a few frames of each scene and fix what is wrong.
The first new sentence on a machine installs the voice packages and the voice model in `~/.cache/vid`. All copies of the project share them.

## Scene file
```js
scene([
  "Sentence one.",          // 1 sentence = 1 beat. The voice (Kokoro, af_heart) sets the length of the beat.
  ["Sentence two.", 0.8],   // a pause after the sentence (seconds): the picture holds after a change
], (t, at, b) =>            // t: seconds from the scene start. at(i, "word"): the time of "word" in sentence i.
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "one"))) +   // b[i] = [start, end] of sentence i
  label("Title", 1.5, 2.3, 0.75, "blue", pop(t, at(1))));
```
- Shapes: `label`, `blob`, `mascot`. Motion: `pop`, `out`, `hop`, `squash`, `blink`, `squint`,
  `look`, `glance`, `wave`, `spin`. A shape takes any number of motions. Each motion is a function of t.
- A label takes `^{k,p}` and `_{k}` (or `^p`, `_k`) for small raised or lowered text. Do not make a separate label for it.
- Colors come from `PALETTE`. Use only these colors.
- Frame: x from -5 to 5, z from -1.2 to 4.4 (up). The narrator is at x = -3.6. The subject is at the right.
- All scene files share 1 global scope: put constants inside the draw function.
- Keep the SVG ready for export: only shapes, paths, clip paths and text in Inter. No CSS animation, no HTML in the SVG.

## Look
A look change starts with the comment at the top of `look.js`.
The look: Grok Bot. A plain near-black stage, each body in 1 flat color from `PALETTE` with flat eyes (no outline, no shading), the Inter SemiBold font.
Characters are a soft blob with 2 big eyes. No arms, no mouth, no feet. They breathe, blink, squint and look around.
- `mascot(x, t, ...)` is the narrator (hot pink ball).
- `blob(x, t, kind, ...)` draws a character. `CAST` holds the bots. Shapes: ball, pebble, squircle, pill, drop, tri, cloud, hex.

## Rules for change
- Delete before you add. Add a rule or a part only when a failed scene shows the need.
- Write all text in ASD-STE100.
