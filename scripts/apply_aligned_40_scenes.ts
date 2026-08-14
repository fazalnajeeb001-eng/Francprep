import * as fs from "fs";
import { ALIGNED_40_SCENES } from "./realign_40_visual_propositions_to_physical_images";

console.log("=== 🛠️ APPLYING ALIGNED 40 VISUAL SCENES TO EXAMSCHEMA.TS ===");

const schemaPath = "src/lib/examSchema.ts";
let schemaContent = fs.readFileSync(schemaPath, "utf-8");

const startMarker = "function getDrawingPropositions(sceneIdx: number): { opt: string[]; optEn: string[]; ans: number; type: string } {";
const endMarker = "  return optionsList[sceneIdx % optionsList.length];\n}";

const sIdx = schemaContent.indexOf(startMarker);
const eIdx = schemaContent.indexOf(endMarker);

if (sIdx === -1 || eIdx === -1) {
  console.error("Markers not found in examSchema.ts");
  process.exit(1);
}

let newFunc = `${startMarker}\n  const optionsList = [\n`;

ALIGNED_40_SCENES.forEach(s => {
  newFunc += `    // Scene ${s.sceneIdx}: P${s.paper}Q${s.qNum} (${s.type} - ${s.situation}) [${s.imgKey}.png]\n`;
  newFunc += `    {\n`;
  newFunc += `      opt: ${JSON.stringify(s.opt)},\n`;
  newFunc += `      optEn: ${JSON.stringify(s.optEn)},\n`;
  newFunc += `      ans: ${s.ans},\n`;
  newFunc += `      type: "${s.type}"\n`;
  newFunc += `    },\n`;
});

newFunc += `  ];\n\n`;

const before = schemaContent.substring(0, sIdx);
const after = schemaContent.substring(eIdx);

const updatedSchema = before + newFunc + after;
fs.writeFileSync(schemaPath, updatedSchema, "utf-8");

console.log("✅ Successfully updated getDrawingPropositions in examSchema.ts with all 40 perfectly aligned scenes!");
