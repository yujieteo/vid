import look, mascot

NARRATION = [
    "At the end of the trick, the coins can be examined.",
    "The person is free to look at both of them.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    half = look.disc("half_dollar", 0.9, "silver", (0.6, 0, 1.45))
    quarter = look.disc("quarter", 0.62, "silver", (2.5, 0, 1.17))
    look.move(half, beats[0][0], beats[0][1], (0.6, 0, 2.6))
    look.spin(half, beats[0][0], beats[0][1] + 0.5)
    look.move(quarter, beats[1][0], beats[1][1], (2.5, 0, 2.4))
    look.spin(quarter, beats[1][0], beats[1][1] + 0.5)
    m.blink(beats[1][0] + 0.5)
