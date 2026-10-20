"""The mascot. Round body, simple eyes, soft colors. It is built from code, so it is always the same."""
import look


class Mascot:
    def __init__(self, loc=(0, 0, 0)):
        self.root = look.empty("mascot")

        def part(name, p, s, color):
            o = look.ball(name, p, s, color)
            o.parent = self.root
            return o

        self.body = part("body", (0, 0, 1.05), (0.95, 0.8, 0.95), "body")
        self.belly = part("belly", (0, -0.5, 0.9), (0.6, 0.35, 0.65), "belly")
        self.eye_l = part("eye_l", (-0.32, -0.68, 1.45), (0.11, 0.08, 0.17), "ink")
        self.eye_r = part("eye_r", (0.32, -0.68, 1.45), (0.11, 0.08, 0.17), "ink")
        part("shine_l", (-0.29, -0.75, 1.53), (0.04, 0.03, 0.05), "white")
        part("shine_r", (0.35, -0.75, 1.53), (0.04, 0.03, 0.05), "white")
        self.hand_l = part("hand_l", (-1.05, -0.15, 0.8), (0.24, 0.24, 0.24), "body")
        self.hand_r = part("hand_r", (1.05, -0.15, 0.8), (0.24, 0.24, 0.24), "body")
        part("foot_l", (-0.4, -0.25, 0.12), (0.32, 0.4, 0.14), "ink")
        part("foot_r", (0.4, -0.25, 0.12), (0.32, 0.4, 0.14), "ink")
        self.root.location = loc
        self.rest_r = tuple(self.hand_r.location)

    def blink(self, t):
        for e in (self.eye_l, self.eye_r):
            s = tuple(e.scale)
            look.key(e, t, scale=s)
            look.key(e, t + 0.08, scale=(s[0], s[1], s[2] * 0.1))
            look.key(e, t + 0.16, scale=s)

    def hop(self, t, height=0.5):
        look.hop(self.root, t, height, 0.5)

    def wave(self, t, secs=1.6):
        h = self.hand_r
        look.key(h, t, loc=self.rest_r)
        for i in range(4):
            x = 1.5 if i % 2 == 0 else 1.15
            look.key(h, t + 0.3 + i * (secs - 0.6) / 4, loc=(x, -0.3, 1.9))
        look.key(h, t + secs, loc=self.rest_r)

    def reach(self, target_xz, t0, t1):
        """Move the right hand to a point in the world. target_xz = (x, z)."""
        rx, rz = self.root.location[0], self.root.location[2]
        look.move(self.hand_r, t0, t1, (target_xz[0] - rx, -0.5, target_xz[1] - rz))

    def rest(self, t0, t1):
        look.move(self.hand_r, t0, t1, self.rest_r)
