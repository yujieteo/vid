import look, mascot

NARRATION = [
    "The magician puts both coins in the hand of a person from the audience.",
    "Everyone can see the coins go in.",
    "Then the person puts the coins behind their back, one coin in each hand.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    palm = look.ball("palm", (1.55, 0, 0.45), (2.4, 0.9, 0.28), "purple")
    half = look.ball("half_dollar", (0.6, 0, 3.2), (0.9, 0.12, 0.9), "white")
    cent = look.ball("centavo", (2.5, 0, 3.2), (0.78, 0.12, 0.78), "gold")
    fists = [look.ball("fist", (x, 0, 0.8), (0.75, 0.7, 0.75), "purple") for x in (0.5, 2.9)]
    look.pop(half, 0.2)
    look.pop(cent, 0.2)
    look.move(half, beats[0][0], beats[0][1], (0.6, 0, 1.45))
    look.move(cent, beats[0][0] + 0.3, beats[0][1], (2.5, 0, 1.33))
    m.blink(beats[1][0])
    look.vanish(half, beats[2][0])
    look.vanish(cent, beats[2][0])
    look.vanish(palm, beats[2][0] + 0.1)
    for i, f in enumerate(fists):
        look.pop(f, beats[2][0] + 1.5 + 0.4 * i)
