import * as fs from "fs";

const fbxPath = process.argv[2];
const data = fs.readFileSync(fbxPath);
const text = data.toString("latin1");

console.log(`File: ${fbxPath}`);

// Check for FBX skeleton-specific structures
const structures = {
  "Skeleton": text.match(/Skeleton/gi)?.length || 0,
  "SkeletonNode": text.match(/SkeletonNode/gi)?.length || 0,
  "Deformer": text.match(/Deformer/gi)?.length || 0,
  "Cluster": text.match(/Cluster/gi)?.length || 0,
  "Skin": text.match(/\bSkin\b/gi)?.length || 0,
  "NodeAttribute": text.match(/NodeAttribute/gi)?.length || 0,
  "LimbNode": text.match(/LimbNode/gi)?.length || 0,
  "BodyPose": text.match(/BodyPose/gi)?.length || 0,
  "JOINTS": text.match(/JOINTS/gi)?.length || 0,
  "WEIGHTS": text.match(/WEIGHTS/gi)?.length || 0,
};

console.log("\nSkeleton structures:");
for (const [key, count] of Object.entries(structures)) {
  console.log(`  ${key}: ${count}`);
}

// Find specific bone names
const boneNames = ["Hips", "Spine", "Spine1", "Spine2", "Neck", "Head", 
  "LeftShoulder", "LeftArm", "LeftForeArm", "LeftHand",
  "RightShoulder", "RightArm", "RightForeArm", "RightHand",
  "LeftUpLeg", "LeftLeg", "LeftFoot",
  "RightUpLeg", "RightLeg", "RightFoot"];

console.log("\nSpecific bone names found:");
for (const name of boneNames) {
  const regex = new RegExp(`"${name}"`, "g");
  const matches = text.match(regex);
  if (matches) {
    console.log(`  ${name}: ${matches.length}`);
  }
}
