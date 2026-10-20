import look, mascot

NARRATION = [
    "The magician shows two coins.",
    "One is an American half dollar.",
    "The other is a Mexican centavo. It is a little smaller.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    half = look.ball("half_dollar", (0.5, 0, 1.5), (0.9, 0.12, 0.9), "white")    # a coin is a flat ball
    cent = look.ball("centavo", (2.9, 0, 1.5), (0.78, 0.12, 0.78), "gold")
    t_half = look.label("half dollar", (0.5, 0, 0.35), size=0.4)
    t_cent = look.label("centavo", (2.9, 0, 0.35), size=0.4)
    look.pop(half, beats[0][0])
    look.pop(cent, beats[0][0] + 0.4)
    m.hop(beats[0][0])
    look.pop(t_half, beats[1][0])
    look.spin(half, beats[1][0], beats[1][1])
    look.pop(t_cent, beats[2][0])
    look.spin(cent, beats[2][0], beats[2][0] + 1.5)
    m.blink(beats[2][1])
