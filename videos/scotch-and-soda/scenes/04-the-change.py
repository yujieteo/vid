import look, mascot

NARRATION = [
    "Then something impossible happens.",
    "The person opens the hand.",
    "In one version, the small coin is now an American quarter.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    fist = look.ball("fist", (1.55, 0, 1.15), (1.4, 0.9, 1.0), "skin")
    palm = look.ball("palm", (1.55, 0, 0.45), (2.4, 0.9, 0.28), "skin")
    half = look.disc("half_dollar", 0.9, "silver", (0.6, 0, 1.45))
    quarter = look.disc("quarter", 0.62, "silver", (2.5, 0, 1.17))
    mark = look.label("?", (1.55, 0, 3.4), size=1.2, color="blue")
    look.pop(mark, beats[0][0])
    look.spin(fist, beats[0][0], beats[0][1], turns=0.05, axis=1)
    look.vanish(mark, beats[1][0])
    look.vanish(fist, beats[1][0])
    look.pop(palm, beats[1][0] + 0.1)
    look.pop(half, beats[2][0])
    look.pop(quarter, beats[2][0] + 0.3)
    m.hop(beats[2][0])
