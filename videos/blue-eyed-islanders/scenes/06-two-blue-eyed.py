import look, mascot

NARRATION = [
    "Now two people have blue eyes. Call them Ana and Ben.",
    "Ana sees that Ben has blue eyes. She does not know her own eye color.",
    "Ana thinks: if my eyes are brown, Ben sees no blue eyes. Then Ben leaves on day 1.",
    "Day 1 comes. Ben does not leave.",
    "So Ben must see another blue-eyed person. That person is Ana. Ben thinks the same about Ana.",
    "On day 2, both of them leave.",
]
CAMERA = "perspective"


def build(beats):
    people = mascot.crowd(["brown", "blue", "brown", "blue", "brown"], center=1.2)
    ana, ben = people[1], people[3]
    visitor = mascot.Islander((-4.4, 0, 0), "blue", scale=1.2)
    look.pop(visitor.root, 0.2)
    mascot.appear(people, beats[0][0])
    t_ana = look.label("Ana", (ana.x, 0, 2.0), size=0.5, color="blue")
    t_ben = look.label("Ben", (ben.x, 0, 2.0), size=0.5, color="blue")
    look.pop(t_ana, beats[0][0] + 0.8)
    look.pop(t_ben, beats[0][0] + 1.2)
    q = look.label("?", (ana.x, 0, 2.9), size=0.8, color="blue")
    look.pop(q, beats[1][0] + 1.5)
    day1 = look.label("Day 1", (1.2, 0, 3.8), size=0.7)
    look.pop(day1, beats[2][0] + 1.5)
    ben.blink(beats[3][0] + 0.8)
    look.vanish(q, beats[4][0])
    ana.hop(beats[4][0] + 1.0)
    ben.hop(beats[4][0] + 1.6)
    look.vanish(day1, beats[5][0])
    day2 = look.label("Day 2", (1.2, 0, 3.8), size=0.7)
    look.pop(day2, beats[5][0] + 0.3)
    ana.leave(beats[5][0] + 1.0)
    ben.leave(beats[5][0] + 1.0)
