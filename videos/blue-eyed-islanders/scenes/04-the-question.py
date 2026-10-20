import look, mascot

NARRATION = [
    "Does the visitor's remark change anything?",
    "One argument says no. Every person could already see many blue-eyed people.",
    "So the visitor said nothing new.",
    "Another argument says yes. It says that after 100 days, all 100 blue-eyed people leave.",
    "Both arguments sound right. But they cannot both be right.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    look.pop(m.root, 0.2)
    m.hop(beats[0][0])
    no = look.label("No change?", (1.6, 0, 3.0), size=0.8)
    yes = look.label("A big change?", (1.6, 0, 1.6), size=0.8, color="blue")
    look.pop(no, beats[1][0])
    m.blink(beats[2][0])
    look.pop(yes, beats[3][0])
    m.hop(beats[4][0])
