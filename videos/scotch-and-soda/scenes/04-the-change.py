import look, mascot

NARRATION = [
    "Then the magician asks for the centavo back.",
    "But the person cannot give it back.",
    "In one version, the person now has the half dollar and an American quarter.",
]
CAMERA = "perspective"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    fists = [look.ball("fist", (x, 0, 0.8), (0.75, 0.7, 0.75), "purple") for x in (0.5, 2.9)]
    half = look.ball("half_dollar", (0.5, 0, 1.5), (0.9, 0.12, 0.9), "white")
    quarter = look.ball("quarter", (2.9, 0, 1.5), (0.62, 0.12, 0.62), "white")
    t_half = look.label("half dollar", (0.5, 0, 0.35), size=0.4)
    t_quarter = look.label("quarter", (2.9, 0, 0.35), size=0.4)
    mark = look.label("?", (1.7, 0, 2.6), size=1.2, color="blue")
    for f in fists:
        look.spin(f, beats[0][0], beats[0][1], turns=0.05, axis=1)
    look.pop(mark, beats[1][0])
    look.vanish(mark, beats[2][0])
    for f in fists:
        look.vanish(f, beats[2][0])
    look.pop(half, beats[2][0] + 0.2)
    look.pop(quarter, beats[2][0] + 0.5)
    look.pop(t_half, beats[2][0] + 1.5)
    look.pop(t_quarter, beats[2][0] + 1.8)
    m.hop(beats[2][0])
