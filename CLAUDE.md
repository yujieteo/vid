# Video repo: rules for Claude

One prompt makes one video. A video is a folder of scene files. The same files give the same video.
Versions are pinned in `uv.lock`. All work and all commits happen in this local copy.

## Requirements (version 1)
1. A prompt makes `videos/<name>/outline.md` and one file for each scene in `videos/<name>/scenes/`.
2. Blender (Eevee) renders every scene. The default is 3D with soft light. `CAMERA = "ortho"` gives a 2D look.
3. The voice is Kokoro, one fixed voice. The audio length sets the scene length. One sentence = one beat.
4. Output is 1080p at 24 fps. `VID_RES=4k` gives 4K. Settings are in `config.py`.
5. A scene that fails gets a gray placeholder. The run goes on. The error is in `videos/<name>/failures/`.
6. `cache/` is only for speed. The finished video is in `out/`. Git does not track both.
7. The user does spot checks. Nobody checks each video.
8. Not built yet. Add only when a real scene needs it: Manim formula layer, Cycles, vertical format.

## Steps for one video
1. Write `outline.md` (one page). List the sources. List the facts. Use only facts that you read in a source.
   Never guess a fact. If a fact is missing, say so in the outline and leave it out of the video.
2. Write the scene files. Name them `01-name.py`, `02-name.py`, ...
3. For each scene run `uv run vid.py still videos/<name>/scenes/<file> [seconds]`. Look at the PNG in `cache/still/`.
   Fix the scene until the picture is correct.
4. Run `uv run vid.py video <name>`.
5. If a scene fails: read `videos/<name>/failures/`, fix the scene, run step 4 again. Good scenes come from the cache.
First time on a machine: `uv sync` then `uv run vid.py setup`.

## Scene file
```python
import look, mascot                # do not call Blender at import time
NARRATION = ["Sentence one.", "Sentence two."]
CAMERA = "perspective"            # or "ortho"

def build(beats):                 # beats[i] = (start, end) seconds of sentence i
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    look.pop(m.root, 0.2)
    m.hop(beats[0][0])
```
Tools: `look.ball / disc / label` make shapes. `look.pop / vanish / move / hop / spin / key` animate.
Colors come from `look.PALETTE`. Use only these colors. Do not set lights or materials in a scene.
Time order: write the animation for an object in time order (the code reads the last position).
Frame: camera sees x from -5 to 5. Put the mascot at the left and the subject at the right.

## Look
The look is code in `look.py`: one soft key light, one weak fill light, soft ground shadow, a thin outline,
the standard colors. The mascot is code in `mascot.py`. It is an original character: round, simple eyes.

## Rules for change
- Delete before you add. Add a rule or a part only when a failed scene shows the need.
- Keep a failed scene as a one-frame test in `tests/` when you add a rule for it.
- Write all text in ASD-STE100.
