"""Video tool. Run it with uv.

  uv run vid.py setup            download the voice model (one time)
  uv run vid.py still SCENE [T]  render one small frame at T seconds to cache/still/
  uv run vid.py scene SCENE      make the clip for one scene
  uv run vid.py video NAME       make all scenes of videos/NAME, join them, write out/NAME.mp4
  uv run vid.py clean            delete cache/
"""
import hashlib
import importlib.util
import shutil
import subprocess
import sys
import time
import traceback
from pathlib import Path

import config

ROOT = Path(__file__).resolve().parent
CACHE, OUT, MODELS = ROOT / "cache", ROOT / "out", ROOT / "models"
MODEL_URL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
MODEL_FILES = ["kokoro-v1.0.onnx", "voices-v1.0.bin"]
CODE = ["vid.py", "config.py", "look.py", "mascot.py", "speak.py", "uv.lock"]
ENC = ["-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
       "-c:a", "aac", "-ar", "48000", "-ac", "2"]


def ffmpeg(*args):
    import imageio_ffmpeg
    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-y", "-loglevel", "error", *map(str, args)]
    subprocess.run(cmd, check=True)


def cache_key(scene):
    h = hashlib.sha256()
    for p in [scene] + [ROOT / c for c in CODE if (ROOT / c).exists()]:
        h.update(p.read_bytes())
    h.update(str(config.size()).encode())
    return h.hexdigest()[:16]


def clipdir(scene):
    return CACHE / f"{scene.parent.parent.name}-{scene.stem}-{cache_key(scene)}"


def setup():
    MODELS.mkdir(exist_ok=True)
    for f in MODEL_FILES:
        if not (MODELS / f).exists():
            print("download", f)
            subprocess.run(["curl", "-L", "--fail", "-o", str(MODELS / f), MODEL_URL + f], check=True)


def load(path):
    spec = importlib.util.spec_from_file_location("scene", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def child(scene, d, mode, t):
    """Runs in its own process. It uses Blender. If it fails, the parent goes on."""
    sys.path.insert(0, str(ROOT))
    d.mkdir(parents=True, exist_ok=True)
    try:
        import bpy
        import look
        import speak
        mod = load(scene)
        n = len(mod.NARRATION)
        if mode == "still":   # no voice for a still. Use even beats.
            beats = [(0.5 + 3 * i, 2.5 + 3 * i) for i in range(n)]
            secs = 0.5 + 3 * n + 0.8
        else:
            beats, secs = speak.narrate(mod.NARRATION, d / "narration.wav")
        look.reset(preview=(mode == "still"), camera=getattr(mod, "CAMERA", "perspective"), seconds=secs)
        mod.build(beats)
        sc = bpy.context.scene
        if mode == "still":
            at = float(t) if t else secs * 0.6
            sc.frame_set(look.frame(at))
            sc.render.filepath = str(d / (scene.parent.parent.name + "-" + scene.stem + ".png"))
            bpy.ops.render.render(write_still=True)
            print(f"STILL {sc.render.filepath} at {at:.1f} s")
            return
        sc.render.filepath = str(d / "frames" / "f_")
        t0 = time.time()
        bpy.ops.render.render(animation=True)
        print(f"RENDER {sc.frame_end} frames, {(time.time() - t0) / sc.frame_end:.2f} s/frame")
        ffmpeg("-framerate", config.FPS, "-i", d / "frames" / "f_%04d.png", "-i", d / "narration.wav",
               *ENC, "-shortest", d / "clip.mp4")
        shutil.rmtree(d / "frames")
    except BaseException:
        (d / "error.txt").write_text(traceback.format_exc())
        raise


def make_scene(scene):
    d = clipdir(scene)
    clip = d / "clip.mp4"
    if clip.exists():
        print("cached", scene.name)
        return clip
    (d / "error.txt").unlink(missing_ok=True)
    t0 = time.time()
    subprocess.run([sys.executable, __file__, "_run", scene, d, "final", ""],
                   check=True, timeout=config.TIMEOUT)
    print(f"{scene.name}: {time.time() - t0:.0f} s")
    return clip


def still(scene, t):
    subprocess.run([sys.executable, __file__, "_run", str(scene), str(CACHE / "still"), "still", t or ""],
                   check=True, timeout=config.TIMEOUT)


def placeholder(scene):
    import soundfile as sf
    wav = clipdir(scene) / "narration.wav"
    secs = sf.info(str(wav)).duration if wav.exists() else 5.0
    w, h = config.size()
    out = CACHE / "placeholders" / f"{scene.parent.parent.name}-{scene.stem}.mp4"
    out.parent.mkdir(parents=True, exist_ok=True)
    ffmpeg("-f", "lavfi", "-i", f"color=c=0x808080:s={w}x{h}:r={config.FPS}",
           "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo", "-t", secs, *ENC, out)
    return out


def make_video(name):
    scenes = sorted((ROOT / "videos" / name / "scenes").glob("*.py"))
    failures = ROOT / "videos" / name / "failures"
    shutil.rmtree(failures, ignore_errors=True)
    clips, failed = [], 0
    for s in scenes:
        try:
            clips.append(make_scene(s))
        except Exception as e:   # a bad scene never stops the run
            failed += 1
            err = clipdir(s) / "error.txt"
            note = f"{s.name}: {type(e).__name__}\n" + (err.read_text() if err.exists() else str(e))
            failures.mkdir(exist_ok=True)
            (failures / f"{s.stem}.txt").write_text(note)
            print("FAILED", s.name, "(placeholder used)")
            clips.append(placeholder(s))
    listing = CACHE / "concat" / f"{name}.txt"
    listing.parent.mkdir(parents=True, exist_ok=True)
    listing.write_text("".join(f"file '{c}'\n" for c in clips))
    OUT.mkdir(exist_ok=True)
    ffmpeg("-f", "concat", "-safe", "0", "-i", listing, "-c", "copy", OUT / f"{name}.mp4")
    print(f"{len(scenes)} scenes, {failed} failed -> {OUT / (name + '.mp4')}")


def main(argv):
    cmd, a = (argv[0], argv[1:]) if argv else ("", [])
    if cmd == "setup":
        setup()
    elif cmd == "still":
        still(Path(a[0]).resolve(), a[1] if len(a) > 1 else None)
    elif cmd == "scene":
        make_scene(Path(a[0]).resolve())
    elif cmd == "video":
        make_video(a[0])
    elif cmd == "clean":
        shutil.rmtree(CACHE, ignore_errors=True)
    elif cmd == "_run":
        child(Path(a[0]), Path(a[1]), a[2], a[3] if len(a) > 3 else None)
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv[1:])
