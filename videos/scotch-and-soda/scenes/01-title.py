import look, mascot

NARRATION = [
    "This is Scotch and Soda.",
    "It is a trick with two coins.",
    "Here is what the audience sees.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    look.pop(m.root, 0.2, 0.5)
    title = look.label("Scotch and Soda", (1.5, 0, 1.6), size=0.75)
    look.pop(title, beats[0][0])
    m.blink(beats[0][1] + 0.3)
    m.hop(beats[1][0])
    m.wave(beats[2][0])
