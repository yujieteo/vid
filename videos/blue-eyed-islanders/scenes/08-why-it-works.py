import look, mascot

NARRATION = [
    "But wait. Everyone could already see blue-eyed people.",
    "So what did the visitor add?",
    "The visitor made it common knowledge.",
    "Common knowledge means this. Everyone knows it. Everyone knows that everyone knows it. And so on, without end.",
    "Each day when nobody leaves adds one more level of knowing.",
    "After enough days, the blue-eyed people can work out their own eye color.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.9, 0, 0))
    look.pop(m.root, 0.2)
    m.blink(beats[0][1])
    m.hop(beats[1][0])
    head = look.label("Common knowledge", (1.5, 0, 3.5), size=0.7, color="blue")
    look.pop(head, beats[2][0])
    a = look.label("Everyone knows it.", (1.5, 0, 2.5), size=0.4)
    b = look.label("Everyone knows that everyone knows it.", (1.5, 0, 1.9), size=0.35)
    c = look.label("... and so on, without end.", (1.5, 0, 1.3), size=0.4)
    look.pop(a, beats[3][0] + 0.5)
    look.pop(b, beats[3][0] + 2.0)
    look.pop(c, beats[3][0] + 4.5)
    d = look.label("1 day of silence = 1 more level", (1.5, 0, 0.6), size=0.4, color="blue")
    look.pop(d, beats[4][0])
    m.hop(beats[5][0])
