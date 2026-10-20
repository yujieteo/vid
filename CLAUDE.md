# Video repo: rules for Claude

One prompt makes one video. A video is a folder `videos/<name>/`: an outline and 1 script for each scene.
A scene draws flat 2D SVG as a pure function of time. A page plays the scenes with the voice.
Each change goes to https://github.com/yujieteo/vid through a pull request. CI runs `node vid.js check`.

## Parts
- `look.js`: the timing, the shapes, the characters and the motion. All scenes use it.
- `player.js` and `player.css`: the page of a video. The Inter font is inside `player.css`.
- `vid.js`: `node vid.js make` makes the voice and the page. `node vid.js check` checks all scenes.
- Plain scripts only (no modules, no build step), so the page opens from file:// with a double-click.
- Git does not track the voice (`videos/<name>/voice/`) or the page (`videos/<name>/index.html`). `make` writes them.

## Steps for one video
1. Write `outline.md` (1 page). List the sources and the facts. Use only facts that you read in a source.
   Never guess a fact. If a fact is missing, write that in the outline and leave it out of the video.
2. Write the scene files: `videos/<name>/scenes/01-name.js`, `02-name.js`, ...
3. Run `node vid.js check`. Fix each error.
4. Run `node vid.js make`. It makes the voice only for new sentences.
5. Open `videos/<name>/index.html` in Chrome. Look at a few frames of each scene and fix what is wrong.
First time on a machine: `npm install` (only `make` needs it).

## Scene file
```js
scene([
  "Sentence one.",          // 1 sentence = 1 beat. The voice (Kokoro, af_heart) sets the length of the beat.
  ["Sentence two.", 0.8],   // a pause after the sentence (seconds): the picture holds after a change
], (t, at, b) =>            // t: seconds from the scene start. at(i, "word"): the time of "word" in sentence i.
  mascot(-3.6, t, pop(t, 0.1), hop(t, at(0, "one"))) +   // b[i] = [start, end] of sentence i
  label("Title", 1.5, 2.3, 0.75, "blue", pop(t, at(1))));
```
- Shapes: `label`, `blob`, `mascot`, `islander`. Motion: `pop`, `out`, `hop`, `squash`, `blink`, `squint`,
  `look`, `follow`, `glance`, `wave`, `spin`. A shape takes any number of motions. Each motion is a function of t.
- Colors come from `PALETTE`. Use only these colors.
- Frame: x from -5 to 5, z from -1.2 to 4.4 (up). The narrator is at x = -3.6. The subject is at the right.
- All scene files share 1 global scope: put constants inside the draw function.
- Keep the SVG ready for export: only shapes, paths, clip paths and text in Inter. No CSS animation, no HTML in the SVG.

## Look
Reference pictures are in `ref/` on the local machine only. They are third-party art: never add them to Git.
Look at them before you change the look.
The look: Grok Bot. A plain near-black stage, each body in 1 flat color from `PALETTE` with flat eyes (no outline, no shading),
the Grok Bot proportions (measured in `ref/`, written in `look.js`), the Inter SemiBold font.
Characters are a soft blob with 2 big eyes. No arms, no mouth, no feet. They breathe, blink, squint and look around.
- `mascot(x, t, ...)` is the narrator (hot pink ball).
- `islander(x, t, color, eyes, ...)` is the bot of that body color with "blue" or "brown" eyes (the eye color of the story).
- `blob(x, t, kind, ...)` draws a character. `CAST` holds the bots. Shapes: ball, pebble, squircle, pill, drop, tri, cloud, hex.
Match the Grok Bot style, but never make an exact copy of a Grok Bot character.

## Rules for change
- Delete before you add. Add a rule or a part only when a failed scene shows the need.
- Write all text in ASD-STE100.
