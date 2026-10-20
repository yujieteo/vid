import look, mascot

NARRATION = [
    "On this island, 100 people have blue eyes.",
    "And 900 people have brown eyes.",
    "The people do not know these numbers.",
    "One day, a visitor arrives. The visitor also has blue eyes.",
    "The visitor says: it is unusual to see another blue-eyed person here.",
]
CAMERA = "perspective"


def build(beats):
    blue = mascot.Islander((0.4, 0, 0), "blue", scale=1.3)
    brown = mascot.Islander((3.4, 0, 0), "brown", scale=1.3)
    n_blue = look.label("100", (0.4, 0, 2.5), size=1.0, color="blue")
    n_brown = look.label("900", (3.4, 0, 2.5), size=1.0, color="brown")
    look.pop(blue.root, beats[0][0])
    look.pop(n_blue, beats[0][0] + 0.3)
    look.pop(brown.root, beats[1][0])
    look.pop(n_brown, beats[1][0] + 0.3)
    blue.blink(beats[2][0])
    brown.blink(beats[2][0] + 0.2)
    visitor = mascot.Islander((-4.0, 0, 0), "blue", scale=1.3)
    look.pop(visitor.root, beats[3][0])
    visitor.hop(beats[3][0] + 1.5)
    s1 = look.label("Unusual to see another", (-1.6, 0, 3.8), size=0.38)
    s2 = look.label("blue-eyed person here!", (-1.6, 0, 3.3), size=0.38)
    look.pop(s1, beats[4][0])
    look.pop(s2, beats[4][0] + 0.4)
