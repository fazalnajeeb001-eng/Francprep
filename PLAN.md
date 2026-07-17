# Plan: Animate Leo for Learning Journey (EXECUTING)

## Decisions Made
- **Model**: Use rendered Leo FBX → converted GLB (LOD3, 79K verts, 6.56 MB, 28 Mixamo joints)
- **Triggers**: DOM events (`chapter-completed`, `module-completed`)
- **Animations**: Chapter = small win (walk + fist pump), Module = big win (jump + spin + victory)

## Steps

### Step 1: Deploy new Leo model
- ✅ Converted `rendered leo with animation/Waving.fbx` → GLB via FBX2glTF
- ✅ Stripped LOD0-2, kept LOD3 (79K verts)
- ✅ Removed unused skins, applied quantize
- ⬜ Copy `leo-lod3-clean.glb` → `public/models/male-avatar.glb`

### Step 2: Update SmartAvatar.tsx
- ⬜ Extend `animate` type: `"idle" | "walk" | "celebrate" | "wave" | "chapterComplete" | "moduleComplete"`

### Step 3: Enhance VRMAvatar.tsx
- ⬜ Add `chapterComplete` animation: walk 3 steps → stop → fist pump → proud look (~4s)
- ⬜ Add `moduleComplete` animation: jump → both arms pump → 360° spin → victory pose (~5s)

### Step 4: Update LevelProgress.tsx
- ⬜ Listen for `chapter-completed` / `module-completed` DOM events
- ⬜ Trigger corresponding avatar animations
- ⬜ Add sparkle/particle visual effects

### Step 5: Build verification
- ⬜ Run `npx vite build` to check for type errors
