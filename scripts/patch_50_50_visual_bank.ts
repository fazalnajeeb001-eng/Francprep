import * as fs from "fs";
import { MASTER_40_VISUAL_ITEMS } from "./build_50_50_visual_bank";

const filePath = "src/lib/examSchema.ts";
let content = fs.readFileSync(filePath, "utf-8");

// Generate replacement getDrawingPropositions code
let newFunctionCode = `function getDrawingPropositions(sceneIdx: number): { opt: string[]; optEn: string[]; ans: number; type: string } {\n  const optionsList = [\n`;

MASTER_40_VISUAL_ITEMS.forEach((item) => {
  newFunctionCode += `    // Scene ${item.sceneIdx}: P${item.paperNum}Q${item.qNum} (${item.type} - ${item.theme})\n`;
  newFunctionCode += `    {\n`;
  newFunctionCode += `      opt: ${JSON.stringify(item.options)},\n`;
  newFunctionCode += `      optEn: ${JSON.stringify(item.optionsEnglish)},\n`;
  newFunctionCode += `      ans: ${item.correctIndex},\n`;
  newFunctionCode += `      type: "${item.type}"\n`;
  newFunctionCode += `    },\n`;
});

newFunctionCode += `  ];\n  return optionsList[sceneIdx % optionsList.length];\n}\n`;

// Replace getDrawingPropositions in examSchema.ts
const startTag = "function getDrawingPropositions(sceneIdx: number): { opt: string[]; ans: number } {";
const endTag = "export function getA1A2Propositions(sceneIdx: number): {";

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.error("❌ Tags not found in examSchema.ts");
  process.exit(1);
}

content = content.substring(0, startIndex) + newFunctionCode + "\n" + content.substring(endIndex);
fs.writeFileSync(filePath, content, "utf-8");

console.log("✅ Successfully patched getDrawingPropositions in examSchema.ts!");
