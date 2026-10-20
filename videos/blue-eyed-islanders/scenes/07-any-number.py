import look, mascot

NARRATION = [
    "The pattern is the same for any number.",
    "Say n people have blue eyes. Then they all leave on day n.",
    "Each of them waits. They think: if I have brown eyes, then only n minus 1 people have blue eyes. They leave on day n minus 1.",
    "Day n minus 1 comes, and nobody leaves. So each person knows they have blue eyes too.",
    "On this island, 100 people have blue eyes. So all 100 leave on day 100.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.9, 0, 0))
    look.pop(m.root, 0.2)
    m.hop(beats[0][0])
    l1 = look.label("n blue-eyed people", (1.4, 0, 3.4), size=0.6, color="blue")
    l2 = look.label("leave on day n", (1.4, 0, 2.6), size=0.6)
    look.pop(l1, beats[1][0])
    look.pop(l2, beats[1][0] + 0.8)
    l3 = look.label("If I am brown-eyed:", (1.4, 0, 1.7), size=0.4)
    l4 = look.label("n-1 people leave on day n-1.", (1.4, 0, 1.2), size=0.4)
    look.pop(l3, beats[2][0])
    look.pop(l4, beats[2][0] + 2.0)
    l5 = look.label("Day n-1: nobody leaves.", (1.4, 0, 0.6), size=0.4, color="blue")
    look.pop(l5, beats[3][0])
    m.blink(beats[3][1])
    for o in (l1, l2, l3, l4, l5):
        look.vanish(o, beats[4][0])
    big1 = look.label("100 blue-eyed people", (1.4, 0, 3.0), size=0.6, color="blue")
    big2 = look.label("leave on day 100", (1.4, 0, 2.0), size=0.6)
    look.pop(big1, beats[4][0] + 0.4)
    look.pop(big2, beats[4][0] + 1.4)
    m.hop(beats[4][1] - 1.0)
