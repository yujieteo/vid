import look, mascot

NARRATION = [
    "Here is a famous logic puzzle.",
    "It is called the Blue-Eyed Islanders puzzle.",
    "Terry Tao shared it on his blog in 2008.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    look.pop(m.root, 0.2, 0.5)
    a = look.label("The Blue-Eyed", (1.5, 0, 2.3), size=0.75)
    b = look.label("Islanders Puzzle", (1.5, 0, 1.3), size=0.75, color="blue")
    look.pop(a, beats[1][0])
    look.pop(b, beats[1][0] + 0.3)
    m.hop(beats[0][0])
    m.blink(beats[1][1] + 0.3)
    m.wave(beats[2][0])
