"""One look for all videos. Change the look here, not in scenes.
Style: dark stage, flat saturated blob characters with two pill eyes, soft light, a little gloss.
Axes: X is right, Y is away from the camera, Z is up. All times are in seconds."""
import math
from pathlib import Path

import bpy

import config

KEY, AMBIENT = 1.0, 0.6      # light strengths. Tune with a still frame.
PALETTE = {
    "sky": "#FFFFFF", "floor": "#07070A",       # "sky" is the color of the ambient light, not of the picture
    "text": "#FFFFFF", "amber": "#FFB000", "gold": "#FFC933",
    "purple": "#9B5CFF", "teal": "#00B89C", "orange": "#FF6A00", "pink": "#FF2D8E",
    "red": "#FF2D4B", "blue": "#1B7BFF", "white": "#F7F7F7", "ink": "#111114", "brown": "#8B5A2B",
}
ZERO = (1e-4, 1e-4, 1e-4)
FONT = Path(__file__).resolve().parent / "fonts" / "Inter-SemiBold.ttf"   # Inter. License: fonts/LICENSE.txt


def rgb(hex_color):
    h = hex_color.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return (*lin, 1.0)


def _set(obj, name, value):
    """Set a value. Ignore it if this Blender version has no such setting."""
    try:
        setattr(obj, name, value)
    except (AttributeError, TypeError):
        pass


def mat(color):
    name = "m_" + color
    m = bpy.data.materials.get(name)
    if m is None:
        m = bpy.data.materials.new(name)
        _set(m, "use_nodes", True)
        b = m.node_tree.nodes["Principled BSDF"]
        b.inputs["Base Color"].default_value = rgb(PALETTE[color])
        b.inputs["Roughness"].default_value = 0.35       # a little glossy
        if color == "floor":   # no gloss: a glossy floor reflects the white ambient light and looks gray
            b.inputs["Specular IOR Level"].default_value = 0.0
    return m


def empty(name):
    o = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(o)
    return o


def _world():
    w = bpy.data.worlds.new("world")
    bpy.context.scene.world = w
    _set(w, "use_nodes", True)
    nt = w.node_tree
    bg = nt.nodes.get("Background") or nt.nodes.new("ShaderNodeBackground")
    out = nt.nodes.get("World Output") or nt.nodes.new("ShaderNodeOutputWorld")
    if not bg.outputs["Background"].links:
        nt.links.new(bg.outputs["Background"], out.inputs["Surface"])
    bg.inputs["Color"].default_value = rgb(PALETTE["sky"])
    bg.inputs["Strength"].default_value = AMBIENT


def _sun(name, strength, rot_deg, angle_deg):
    d = bpy.data.lights.new(name, "SUN")
    d.energy = strength
    d.angle = math.radians(angle_deg)
    _set(d, "use_shadow", True)
    o = bpy.data.objects.new(name, d)
    o.rotation_euler = [math.radians(a) for a in rot_deg]
    bpy.context.scene.collection.objects.link(o)


def _camera(kind):
    sc = bpy.context.scene
    d = bpy.data.cameras.new("cam")
    if kind == "ortho":
        d.type = "ORTHO"
        d.ortho_scale = 10
    else:
        d.lens = 50
    cam = bpy.data.objects.new("cam", d)
    cam.location = (0, -14, 5.5)   # high enough that the horizon is out of the picture
    sc.collection.objects.link(cam)
    target = empty("cam_target")
    target.location = (0, 0, 1.4)
    c = cam.constraints.new("TRACK_TO")
    c.target, c.track_axis, c.up_axis = target, "TRACK_NEGATIVE_Z", "UP_Y"
    sc.camera = cam


def reset(preview=False, camera="perspective", seconds=5.0):
    """Make a new empty scene with the standard look. camera = "perspective" or "ortho"."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    engines = [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items]
    sc.render.engine = "BLENDER_EEVEE" if "BLENDER_EEVEE" in engines else "BLENDER_EEVEE_NEXT"
    w, h = config.size(preview)
    sc.render.resolution_x, sc.render.resolution_y = w, h
    sc.render.resolution_percentage = 100
    sc.render.fps = config.FPS
    sc.frame_start, sc.frame_end = 1, max(1, math.ceil(seconds * config.FPS))
    sc.render.image_settings.file_format = "PNG"
    sc.render.image_settings.color_mode = "RGB"
    sc.view_settings.view_transform = "Standard"
    _set(sc.eevee, "taa_render_samples", 8 if preview else config.SAMPLES)
    _world()
    bpy.ops.mesh.primitive_plane_add(size=300, location=(0, 0, 0))
    floor = bpy.context.object
    floor.name = "floor"
    floor.data.materials.append(mat("floor"))
    _sun("key", KEY, (50, 0, -30), 25)     # from front left, above
    _camera(camera)


# ---- shapes -------------------------------------------------------------

def ball(name, loc, scale, color):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1, location=loc)
    o = bpy.context.object
    o.name, o.scale = name, scale
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat(color))
    return o


def squircle(name, loc, scale, color):
    """A rounded square (a cube with very round edges)."""
    bpy.ops.mesh.primitive_cube_add(size=2, location=loc)
    o = bpy.context.object
    o.name, o.scale = name, scale
    b = o.modifiers.new("round", "BEVEL")
    b.width, b.segments, b.limit_method = 0.5, 10, "NONE"
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat(color))
    return o


def capsule(name, loc, radius, length, color, rot=(0, 0, 0)):
    """A pill. It stands up and it is flat, like a sticker. Used for eyes."""
    bpy.ops.mesh.primitive_cylinder_add(vertices=32, radius=radius, depth=length, location=loc, rotation=rot)
    o = bpy.context.object
    o.name = name
    o.scale = (1, 0.3, 1)
    b = o.modifiers.new("round", "BEVEL")
    b.width, b.segments, b.limit_method = radius * 0.98, 8, "ANGLE"
    b.angle_limit = math.radians(60)
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat(color))
    return o


def label(text, loc, size=0.5, color="text"):
    bpy.ops.object.text_add(location=loc, rotation=(math.pi / 2, 0, 0))
    o = bpy.context.object
    o.data.body, o.data.size, o.data.extrude = text, size, 0.02
    o.data.align_x, o.data.align_y = "CENTER", "CENTER"
    o.data.font = bpy.data.fonts.load(str(FONT), check_existing=True)
    o.data.materials.append(mat(color))
    return o


# ---- animation ----------------------------------------------------------

def frame(t):
    return round(t * config.FPS) + 1


def key(o, t, loc=None, rot=None, scale=None):
    f = frame(t)
    if loc is not None:
        o.location = loc
        o.keyframe_insert("location", frame=f)
    if rot is not None:
        o.rotation_euler = rot
        o.keyframe_insert("rotation_euler", frame=f)
    if scale is not None:
        o.scale = scale
        o.keyframe_insert("scale", frame=f)


def pop(o, t0, dur=0.35):
    """Hidden until t0. Then it grows in with a small bounce. Call once for each object."""
    s = tuple(o.scale)
    key(o, 0, scale=ZERO)
    key(o, t0, scale=ZERO)
    key(o, t0 + dur * 0.7, scale=tuple(v * 1.15 for v in s))
    key(o, t0 + dur, scale=s)


def vanish(o, t0, dur=0.2):
    s = tuple(o.scale)
    key(o, t0, scale=s)
    key(o, t0 + dur, scale=ZERO)


def move(o, t0, t1, loc):
    key(o, t0, loc=tuple(o.location))
    key(o, t1, loc=tuple(loc))


def hop(o, t0, height=0.5, dur=0.5):
    p = tuple(o.location)
    key(o, t0, loc=p)
    key(o, t0 + dur / 2, loc=(p[0], p[1], p[2] + height))
    key(o, t0 + dur, loc=p)


def spin(o, t0, t1, turns=1, axis=2):
    r = list(o.rotation_euler)
    key(o, t0, rot=tuple(r))
    r[axis] += 2 * math.pi * turns
    key(o, t1, rot=tuple(r))
