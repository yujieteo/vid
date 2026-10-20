import look, mascot

NARRATION = [
    "The magician shows two coins.",
    "One is an American half dollar.",
    "The other is a Mexican centavo. It is a little smaller.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    half = look.disc("half_dollar", 0.9, "silver", (0.5, 0, 1.5))
    cent = look.disc("centavo", 0.78, "gold", (2.9, 0, 1.5))
    t_half = look.label("half dollar", (0.5, 0, 0.35), size=0.4)
    t_cent = look.label("centavo", (2.9, 0, 0.35), size=0.4)
    look.pop(half, beats[0][0])
    look.pop(cent, beats[0][0] + 0.4)
    m.reach((0.5, 1.5), beats[0][0], beats[0][0] + 0.8)
    m.rest(beats[0][1], beats[0][1] + 0.5)
    look.pop(t_half, beats[1][0])
    look.spin(half, beats[1][0], beats[1][1])
    look.pop(t_cent, beats[2][0])
    look.spin(cent, beats[2][0], beats[2][0] + 1.5)
    m.blink(beats[2][1])
