import look, mascot

NARRATION = [
    "Start with a tiny island. Only one person has blue eyes.",
    "That person sees only brown eyes.",
    "The visitor says: there is a blue-eyed person here.",
    "The person looks around. They see no blue eyes. So it must be them.",
    "They leave at noon the next day. That is day 1.",
]
CAMERA = "perspective"


def build(beats):
    people = mascot.crowd(["brown", "brown", "blue", "brown", "brown"], center=1.2)
    mascot.appear(people, beats[0][0])
    q = look.label("?", (people[2].x, 0, 2.3), size=0.9, color="blue")
    look.pop(q, beats[1][0])
    visitor = mascot.Islander((-4.4, 0, 0), "blue", scale=1.2)
    look.pop(visitor.root, 0.2)
    s = look.label("Blue eyes are here!", (-2.3, 0, 2.9), size=0.4)
    look.pop(s, beats[2][0])
    look.vanish(q, beats[3][0])
    people[2].hop(beats[3][0] + 1.5)
    day = look.label("Day 1", (1.2, 0, 3.6), size=0.8)
    look.pop(day, beats[4][0])
    people[2].leave(beats[4][0] + 1.2)
