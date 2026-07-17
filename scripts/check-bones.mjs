import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as fs from "fs";
import { FileLoader } from "three";

// We'll just parse the GLB manually to check for skeleton data
const glbPath = process.argv[2];
if (!glbPath) {
  console.log("Usage: node check-bones.mjs <path-to-glb>");
  process.exit(1);
}

const data = fs.readFileSync(glbPath);
console.log(`File: ${glbPath}`);
console.log(`Size: ${(data.length / 1024 / 1024).toFixed(1)} MB`);

// Check for common bone/joint keywords in the binary
const text = data.toString("latin1");
const boneKeywords = ["Hips", "Spine", "Head", "Arm", "Leg", "Hand", "Foot", "Joint", "Bone", "mixamo", "J_Bip", "Shoulder", "Neck", "UpperArm", "LowerArm", "UpperLeg", "LowerLeg"];
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
  console.log("  NONE - This model has NO bones/skeleton");
} else {
  for (const [kw, count] of Object.entries(found)) {
    console.log(`  ${kw}: ${count} occurrences`);
  }
}

// Check for skin/joint data markers
const hasSkin = text.includes("skin") || text.includes("Skin") || text.includes("JOINTS");
const hasWeights = text.includes("WEIGHTS") || text.includes("weights");
console.log(`\nHas skin data: ${hasSkin}`);
console.log(`Has weight data: ${hasWeights}`);
