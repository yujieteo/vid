import look, mascot

NARRATION = [
    "The set uses a special coin.",
    "Good magic is a puzzle.",
    "Watch the coins. Ask what changed, and when.",
]
CAMERA = "ortho"


def build(beats):
    m = mascot.Mascot(loc=(-3.6, 0, 0))
    coin = look.ball("special_coin", (1.2, 0, 1.6), (0.9, 0.12, 0.9), "gold")
    text = look.label("What changed, and when?", (1.2, 0, 3.4), size=0.6)
    look.pop(coin, beats[0][0])
    look.spin(coin, beats[0][0], beats[0][1])
    m.hop(beats[1][0])
    look.pop(text, beats[2][0])
    m.blink(beats[2][1])
