import look, mascot

NARRATION = [
    "An island has many people.",
    "Each person has blue eyes or brown eyes.",
    "Everyone can see the eyes of all the other people. But nobody can see their own eyes.",
    "Nobody may talk about eye color.",
    "If a person learns their own eye color, that person must leave the island. They leave at noon the next day.",
    "Everyone is perfectly logical, and everyone knows that the others are too.",
]
CAMERA = "perspective"


def build(beats):
    eyes = ["blue", "brown", "brown", "blue", "brown", "blue", "brown", "brown"]
    people = mascot.crowd(eyes)
    mascot.appear(people, beats[0][0])
    for i, p in enumerate(people):
        p.hop(beats[1][0] + 0.1 * i)
    q = look.label("?", (people[3].x, 0, 2.2), size=0.9, color="blue")
    look.pop(q, beats[2][0])
    for i, p in enumerate(people):
        p.blink(beats[3][0] + 0.05 * i)
    look.vanish(q, beats[4][0])
    sun = look.ball("sun", (3.8, 0, 3.6), (0.5, 0.5, 0.5), "gold")
    look.pop(sun, beats[4][0] + 1.5)
    people[3].leave(beats[4][0] + 2.5)
    for i, p in enumerate(people):
        if i != 3:
            p.blink(beats[5][0] + 0.05 * i)
