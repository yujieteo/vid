import look, mascot

NARRATION = [
    "What you know matters.",
    "What you know about what others know matters too.",
    "This version of the puzzle is from the blog of Terry Tao.",
]
CAMERA = "ortho"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    look.pop(m.root, 0.2)
    a = look.label("What you know", (1.4, 0, 3.2), size=0.7)
    b = look.label("What you know about", (1.4, 0, 2.2), size=0.6, color="blue")
    c = look.label("what others know", (1.4, 0, 1.5), size=0.6, color="blue")
    look.pop(a, beats[0][0])
    look.pop(b, beats[1][0])
    look.pop(c, beats[1][0] + 0.8)
    m.hop(beats[1][1])
    m.wave(beats[2][0])
