import * as fs from "fs";

const fbxPath = process.argv[2];
if (!fbxPath) {
  console.log("Usage: node check-fbx.mjs <path-to-fbx>");
  process.exit(1);
}

const data = fs.readFileSync(fbxPath);
console.log(`File: ${fbxPath}`);
console.log(`Size: ${(data.length / 1024 / 1024).toFixed(1)} MB`);

const text = data.toString("latin1");
const boneKeywords = ["Hips", "Spine", "Head", "Arm", "Leg", "Hand", "Foot", "Joint", "Bone", "mixamo", "Shoulder", "Neck", "UpperArm", "LowerArm", "UpperLeg", "LowerLeg", "Skeleton", "SkeletonNode", "Deformer", "Skin", "Cluster"];
const found = {};
for (const kw of boneKeywords) {
  const regex = new RegExp(kw, "gi");
  const matches = text.match(regex);
  if (matches) {
    found[kw] = matches.length;
  }
}

console.log("\nBone-related keywords found:");
if (Object.keys(found).length === 0) {
  console.log("  NONE");
} else {
  for (const [kw, count] of Object.entries(found)) {
    console.log(`  ${kw}: ${count} occurrences`);
  }
}
