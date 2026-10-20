import look, mascot

NARRATION = [
    "The magician puts both coins in the hand of a person from the audience.",
    "Everyone can see the coins go in.",
    "The person closes the hand.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    palm = look.ball("palm", (1.55, 0, 0.45), (2.4, 0.9, 0.28), "skin")
    half = look.disc("half_dollar", 0.9, "silver", (0.6, 0, 3.2))
    cent = look.disc("centavo", 0.78, "gold", (2.5, 0, 3.2))
    fist = look.ball("fist", (1.55, 0, 1.15), (1.4, 0.9, 1.0), "skin")
    look.pop(half, 0.2)
    look.pop(cent, 0.2)
    look.pop(fist, beats[2][0])
    look.move(half, beats[0][0], beats[0][1], (0.6, 0, 1.45))
    look.move(cent, beats[0][0] + 0.3, beats[0][1], (2.5, 0, 1.33))
    m.blink(beats[1][0])
    look.vanish(half, beats[2][0])
    look.vanish(cent, beats[2][0])
    look.vanish(palm, beats[2][0] + 0.1)
