"""The characters. Each one is a soft blob with two pill eyes. No arms, no mouth.
They are built from code, so they are always the same."""
import look


def _blink(eyes, t):
    for e in eyes:
        s = tuple(e.scale)
        look.key(e, t, scale=s)
        look.key(e, t + 0.08, scale=(s[0], s[1], s[2] * 0.1))
        look.key(e, t + 0.16, scale=s)


class Blob:
    """shape = "ball", "squircle" or "cloud". size 1.0 = 2 units high."""

    def __init__(self, loc, shape, color, size=1.0, eye_color="ink", tilt=0.22):
        self.root = look.empty("blob")

        def add(o):
            o.parent = self.root
            return o

        if shape == "squircle":
            add(look.squircle("body", (0, 0, 1), (0.95, 0.8, 0.95), color))
            front = 0.8
        elif shape == "cloud":
            puffs = [(-0.6, 0.85, 0.7), (0.6, 0.85, 0.7), (-0.35, 1.45, 0.65), (0.4, 1.45, 0.65), (0, 1.1, 0.85)]
            for i, (x, z, r) in enumerate(puffs):
                add(look.ball(f"puff{i}", (x, 0, z), (r, 0.8 * r, r), color))
            front = 0.7
        else:
            add(look.ball("body", (0, 0, 1), (1, 0.85, 1), color))
            front = 0.78
        self.eyes = [add(look.capsule("eye", (sx * 0.3, -front - 0.09, 1.15), 0.14, 0.58, eye_color, rot=(0, tilt, 0)))
                     for sx in (-1, 1)]
        self.root.location = loc
        self.root.scale = (size, size, size)
        self.x = loc[0]

    def blink(self, t):
        _blink(self.eyes, t)

    def hop(self, t, height=0.5):
        look.hop(self.root, t, height, 0.5)

    def wave(self, t, secs=1.6):
        """Tilt from side to side."""
        look.key(self.root, t, rot=(0, 0, 0))
        for i in range(4):
            look.key(self.root, t + 0.2 + i * (secs - 0.4) / 4, rot=(0, 0.3 if i % 2 == 0 else -0.3, 0))
        look.key(self.root, t + secs, rot=(0, 0, 0))


def Mascot(loc=(0, 0, 0)):
    """The narrator: a teal cloud."""
    return Blob(loc, "cloud", "teal", size=1.15)


def Islander(loc, eyes="brown", scale=1.0, shape="ball"):
    """A white blob. The eye color is blue or brown. It is the only thing that tells islanders apart."""
    b = Blob(loc, shape, "white", size=0.62 * scale, eye_color=eyes)
    b.leave = lambda t, dist=9.0: _leave(b, t, dist)
    return b


def _leave(b, t, dist):
    """Hop, step back behind the row, then walk out of the picture to the right."""
    look.hop(b.root, t, 0.3, 0.4)
    x, y, z = b.root.location
    look.move(b.root, t + 0.4, t + 0.7, (x, y + 1.6, z))
    look.move(b.root, t + 0.7, t + 2.2, (x + dist, y + 1.6, z))


def crowd(eyes, center=0.0, step=1.25, y=0.0):
    """A row of islanders. eyes is a list like ["blue", "brown", "brown"]."""
    x0 = center - step * (len(eyes) - 1) / 2
    return [Islander((x0 + i * step, y, 0), e, shape=("ball", "squircle")[i % 2]) for i, e in enumerate(eyes)]


def appear(people, t0, gap=0.12):
    for i, p in enumerate(people):
        look.pop(p.root, t0 + gap * i)
