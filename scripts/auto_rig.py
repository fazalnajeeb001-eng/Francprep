import bpy
import mathutils
import os

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for col in bpy.data.collections:
        bpy.data.collections.remove(col)
    for mesh in bpy.data.meshes:
        bpy.data.meshes.remove(mesh)
    for armature in bpy.data.armatures:
        bpy.data.armatures.remove(armature)

def import_model(path):
    bpy.ops.import_scene.gltf(filepath=path)
    objs = [o for o in bpy.context.selected_objects if o.type == 'MESH']
    if not objs:
        return None
    obj = objs[0]
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    return obj

def create_armature(name, obj):
    bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
    arm_obj = bpy.context.active_object
    arm_obj.name = name
    arm = arm_obj.data
    arm.name = name + "_data"

    bpy.ops.armature.select_all(action='SELECT')
    bpy.ops.armature.delete()

    bbox = [obj.matrix_world @ mathutils.Vector(corner) for corner in obj.bound_box]
    xs = [b.x for b in bbox]
    zs = [b.z for b in bbox]
    x_min, x_max = min(xs), max(xs)
    z_min, z_max = min(zs), max(zs)
    h = z_max - z_min
    w = (x_max - x_min) / 2
    cx = (x_min + x_max) / 2
    cy = 0

    hips_z = z_min + h * 0.48
    spine_z = z_min + h * 0.56
    chest_z = z_min + h * 0.65
    neck_z = z_min + h * 0.76
    head_z = z_min + h * 0.80
    head_top = z_max

    shoulder_x = w * 0.9
    arm_len = w * 0.85
    forearm_len = w * 0.75
    leg_len = h * 0.24
    lower_leg_len = h * 0.22

    def add_bone(bname, head, tail, parent=None):
        bone = arm.edit_bones.new(bname)
        bone.head = head
        bone.tail = tail
        if parent:
            bone.parent = arm.edit_bones[parent]
            bone.use_connect = False
        return bone

    add_bone("Hips", (cx, cy, hips_z), (cx, cy, spine_z))
    add_bone("Spine", (cx, cy, spine_z), (cx, cy, chest_z), "Hips")
    add_bone("Chest", (cx, cy, chest_z), (cx, cy, neck_z), "Spine")
    add_bone("Neck", (cx, cy, neck_z), (cx, cy, head_z), "Chest")
    add_bone("Head", (cx, cy, head_z), (cx, cy, head_top), "Neck")

    add_bone("RightShoulder", (cx, cy, neck_z), (cx + shoulder_x, cy, neck_z - h*0.02), "Chest")
    add_bone("RightUpperArm", (cx + shoulder_x, cy, neck_z - h*0.02), (cx + shoulder_x + arm_len, cy, neck_z - h*0.08), "RightShoulder")
    add_bone("RightLowerArm", (cx + shoulder_x + arm_len, cy, neck_z - h*0.08), (cx + shoulder_x + arm_len + forearm_len, cy, neck_z - h*0.14), "RightUpperArm")
    add_bone("RightHand", (cx + shoulder_x + arm_len + forearm_len, cy, neck_z - h*0.14), (cx + shoulder_x + arm_len + forearm_len + w*0.3, cy, neck_z - h*0.16), "RightLowerArm")

    add_bone("LeftShoulder", (cx, cy, neck_z), (cx - shoulder_x, cy, neck_z - h*0.02), "Chest")
    add_bone("LeftUpperArm", (cx - shoulder_x, cy, neck_z - h*0.02), (cx - shoulder_x - arm_len, cy, neck_z - h*0.08), "LeftShoulder")
    add_bone("LeftLowerArm", (cx - shoulder_x - arm_len, cy, neck_z - h*0.08), (cx - shoulder_x - arm_len - forearm_len, cy, neck_z - h*0.14), "LeftUpperArm")
    add_bone("LeftHand", (cx - shoulder_x - arm_len - forearm_len, cy, neck_z - h*0.14), (cx - shoulder_x - arm_len - forearm_len - w*0.3, cy, neck_z - h*0.16), "LeftLowerArm")

    add_bone("RightUpperLeg", (cx + w*0.25, cy, hips_z), (cx + w*0.25, cy, hips_z - leg_len), "Hips")
    add_bone("RightLowerLeg", (cx + w*0.25, cy, hips_z - leg_len), (cx + w*0.25, cy, hips_z - leg_len - lower_leg_len), "RightUpperLeg")
    add_bone("RightFoot", (cx + w*0.25, cy, hips_z - leg_len - lower_leg_len), (cx + w*0.25, cy + w*0.15, z_min), "RightLowerLeg")

    add_bone("LeftUpperLeg", (cx - w*0.25, cy, hips_z), (cx - w*0.25, cy, hips_z - leg_len), "Hips")
    add_bone("LeftLowerLeg", (cx - w*0.25, cy, hips_z - leg_len), (cx - w*0.25, cy, hips_z - leg_len - lower_leg_len), "LeftUpperLeg")
    add_bone("LeftFoot", (cx - w*0.25, cy, hips_z - leg_len - lower_leg_len), (cx - w*0.25, cy + w*0.15, z_min), "LeftLowerLeg")

    bpy.ops.object.mode_set(mode='OBJECT')
    return arm_obj

def assign_weights_distance(obj, arm_obj):
    bone_positions = {}
    for bone in arm_obj.data.bones:
        bone_positions[bone.name] = bone.head_local.copy()

    for v in obj.data.vertices:
        co = v.co
        distances = {}
        for bname, bpos in bone_positions.items():
            d = (co - bpos).length
            distances[bname] = d

        sorted_bones = sorted(distances.items(), key=lambda x: x[1])

        nearest = sorted_bones[0][1]
        second = sorted_bones[1][1] if len(sorted_bones) > 1 else nearest + 0.01

        w1 = 1.0 / (nearest + 0.001)
        w2 = 0.5 / (second + 0.001)

        vg1 = obj.vertex_groups.get(sorted_bones[0][0])
        if not vg1:
            vg1 = obj.vertex_groups.new(name=sorted_bones[0][0])
        vg1.add([v.index], w1 / (w1 + w2), 'REPLACE')

        if len(sorted_bones) > 1:
            vg2 = obj.vertex_groups.get(sorted_bones[1][0])
            if not vg2:
                vg2 = obj.vertex_groups.new(name=sorted_bones[1][0])
            vg2.add([v.index], w2 / (w1 + w2), 'REPLACE')

def parent_with_armature(obj, arm_obj):
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    arm_obj.select_set(True)
    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.object.parent_set(type='ARMATURE_NAME')

def export_model(path):
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format='GLB',
        use_selection=False,
        export_apply=True,
        export_animations=False
    )

INPUT_DIR = r"C:\Users\fazal\OneDrive\Desktop\francprep latest(7-9-2026)\Francprep\public\models"
OUTPUT_DIR = r"C:\Users\fazal\OneDrive\Desktop\francprep latest(7-9-2026)\Francprep\public\models"

for gender in ["male", "female"]:
    input_path = os.path.join(INPUT_DIR, f"{gender}-avatar.glb")
    output_path = os.path.join(OUTPUT_DIR, f"{gender}-rigged.glb")

    print(f"\n=== Processing {gender} ===")
    clear_scene()
    obj = import_model(input_path)
    if obj is None:
        print(f"FAILED to import {gender}")
        continue
    print(f"Imported: {obj.name}, verts: {len(obj.data.vertices)}")

    arm_obj = create_armature(f"{gender}_armature", obj)
    print(f"Created armature with {len(arm_obj.data.bones)} bones")

    assign_weights_distance(obj, arm_obj)
    print(f"Assigned distance-based weights to {len(obj.vertex_groups)} vertex groups")

    parent_with_armature(obj, arm_obj)
    print("Parented")

    export_model(output_path)
    print(f"Exported: {output_path}")

print("\n=== DONE ===")
