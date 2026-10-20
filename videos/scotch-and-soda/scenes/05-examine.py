import look, mascot

NARRATION = [
    "At the end of the trick, the coins can be examined.",
    "The person is free to look at both of them.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    half = look.ball("half_dollar", (0.5, 0, 1.5), (0.9, 0.12, 0.9), "white")
    quarter = look.ball("quarter", (2.9, 0, 1.5), (0.62, 0.12, 0.62), "white")
    look.move(half, beats[0][0], beats[0][1], (0.5, 0, 2.6))
    look.spin(half, beats[0][0], beats[0][1] + 0.5)
    look.move(quarter, beats[1][0], beats[1][1], (2.9, 0, 2.6))
    look.spin(quarter, beats[1][0], beats[1][1] + 0.5)
    m.blink(beats[1][0] + 0.5)
