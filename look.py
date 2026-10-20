"""One look for all videos. Change the look here, not in scenes.
Axes: X is right, Y is away from the camera, Z is up. All times are in seconds."""
import math

import bpy

import config

OUTLINE = True                       # thin line around shapes
KEY, FILL, AMBIENT = 1.3, 0.5, 0.45  # light strengths. Tune with a still frame.
PALETTE = {
    "sky": "#EAF3FA", "floor": "#F6E3D3", "body": "#FF8A5B", "belly": "#FFD9C2",
    "ink": "#2B2B3A", "white": "#FFFFFF", "skin": "#F2B48C", "silver": "#C9D1D9",
    "gold": "#EDB93C", "blue": "#5B8DEF",
}
ZERO = (1e-4, 1e-4, 1e-4)


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
        b.inputs["Roughness"].default_value = 0.8
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


def _sun(name, strength, rot_deg, angle_deg, shadow):
    d = bpy.data.lights.new(name, "SUN")
    d.energy = strength
    d.angle = math.radians(angle_deg)
    _set(d, "use_shadow", shadow)
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
    cam.location = (0, -14, 3.5)
    sc.collection.objects.link(cam)
    target = empty("cam_target")
    target.location = (0, 0, 1.4)
    c = cam.constraints.new("TRACK_TO")
    c.target, c.track_axis, c.up_axis = target, "TRACK_NEGATIVE_Z", "UP_Y"
    sc.camera = cam


def _outline(height):
    sc, vl = bpy.context.scene, bpy.context.view_layer
    sc.render.use_freestyle = True
    vl.use_freestyle = True
    fs = vl.freestyle_settings
    ls = fs.linesets[0] if len(fs.linesets) else fs.linesets.new("outline")
    ls.linestyle.thickness = 1.6 * height / 1080
    ls.linestyle.color = rgb(PALETTE["ink"])[:3]


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
    _sun("key", KEY, (50, 0, -30), 20, True)
    _sun("fill", FILL, (70, 0, 40), 40, False)
    _camera(camera)
    if OUTLINE:
        try:
            _outline(h)
        except Exception as e:  # the outline is not vital. The scene can render without it.
            print("outline off:", e)


# ---- shapes -------------------------------------------------------------

def ball(name, loc, scale, color):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=1, location=loc)
    o = bpy.context.object
    o.name, o.scale = name, scale
    bpy.ops.object.shade_smooth()
    o.data.materials.append(mat(color))
    return o


def disc(name, radius, color, loc, thick=0.07):
    """A coin. It stands up and faces the camera."""
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=radius, depth=thick,
                                        location=loc, rotation=(math.pi / 2, 0, 0))
    o = bpy.context.object
    o.name = name
    o.data.materials.append(mat(color))
    return o


def label(text, loc, size=0.5, color="ink"):
    bpy.ops.object.text_add(location=loc, rotation=(math.pi / 2, 0, 0))
    o = bpy.context.object
    o.data.body, o.data.size, o.data.extrude = text, size, 0.02
    o.data.align_x, o.data.align_y = "CENTER", "CENTER"
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
