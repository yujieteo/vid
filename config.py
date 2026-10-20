"""Settings. Change a value here. Do not change it in other files."""
import os

FPS = 24
SIZE = (1920, 1080)       # final size
SIZE_4K = (3840, 2160)    # used when VID_RES=4k
PREVIEW = (640, 360)      # used for stills
SAMPLES = 32              # Eevee samples for final frames
TIMEOUT = 1800            # seconds. Hard time limit for one scene.
VOICE, SPEED = "af_heart", 1.0   # one fixed Kokoro voice


def size(preview=False):
    if preview:
        return PREVIEW
    return SIZE_4K if os.environ.get("VID_RES") == "4k" else SIZE
