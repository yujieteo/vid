"""Narration to audio. Kokoro (ONNX). One fixed voice (see config.py)."""
from pathlib import Path

import numpy as np
import soundfile as sf

import config

LEAD, GAP, TAIL = 0.5, 0.45, 0.8     # seconds of silence: before, between, after
MODELS = Path(__file__).resolve().parent / "models"
_kokoro = None


def _load():
    global _kokoro
    if _kokoro is None:
        files = [MODELS / "kokoro-v1.0.onnx", MODELS / "voices-v1.0.bin"]
        if not all(f.exists() for f in files):
            raise SystemExit("Voice model is missing. Run: uv run vid.py setup")
        from kokoro_onnx import Kokoro
        _kokoro = Kokoro(str(files[0]), str(files[1]))
    return _kokoro


def narrate(sentences, out_wav):
    """Write one wav file. Return (beats, seconds).
    beats[i] = (start, end) of sentence i, in seconds. A scene uses beats as cue points."""
    k = _load()
    clips, sr = [], 24000
    for s in sentences:
        x, sr = k.create(s, voice=config.VOICE, speed=config.SPEED, lang="en-us")
        clips.append(np.asarray(x, dtype=np.float32))
    pad = lambda sec: np.zeros(int(sec * sr), dtype=np.float32)
    parts, beats, t = [pad(LEAD)], [], LEAD
    for x in clips:
        beats.append((t, t + len(x) / sr))
        parts += [x, pad(GAP)]
        t += len(x) / sr + GAP
    parts.append(pad(TAIL))
    t += TAIL
    sf.write(str(out_wav), np.concatenate(parts), sr)
    return beats, t
