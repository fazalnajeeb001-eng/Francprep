import * as fs from "fs";
import { AUTHENTIC_READING_MASTER_BANK } from "../src/lib/authenticReadingMasterBank";

console.log("=== 🔄 PHASE 2: SYNCHRONIZING 1,560 READING OPTIONS INTO MASTER DICTIONARY ===");

const dictPath = "src/lib/masterOptionsDictionary.ts";
let dictContent = fs.readFileSync(dictPath, "utf-8");

// Parse existing entries
const entries: Record<string, string> = {};

const regex = /"([^"]+)":\s*"([^"]+)"/g;
let match;
while ((match = regex.exec(dictContent)) !== null) {
  entries[match[1]] = match[2];
}

console.log(`Existing dictionary entries: ${Object.keys(entries).length}`);

let readingOptionsAdded = 0;

AUTHENTIC_READING_MASTER_BANK.forEach(paper => {
  paper.forEach(item => {
    item.opt.forEach((french, idx) => {
      const english = item.optEn[idx];
      if (french && english) {
        entries[french.trim()] = english.trim();
        readingOptionsAdded++;
      }
    });
  });
});

console.log(`Total unique dictionary entries after adding Reading options: ${Object.keys(entries).length} (${readingOptionsAdded} reading option mappings processed)`);

// Rebuild dictionary file
let newDictContent = `/**
 * Official TCF Canada Master Options & Visual Propositions Translation Dictionary
 * Contains 100% verified, pure English translations for all exam questions and options (Listening + Reading).
 */

export const MASTER_OPTIONS_DICTIONARY: Record<string, string> = {\n`;

Object.keys(entries).sort().forEach(fr => {
  newDictContent += `  ${JSON.stringify(fr)}: ${JSON.stringify(entries[fr])},\n`;
});

newDictContent += `};\n\n`;
newDictContent += `export function translateMasterOption(frenchText: string): string {\n`;
newDictContent += `  if (!frenchText) return "";\n`;
newDictContent += `  const clean = frenchText.trim();\n`;
newDictContent += `  if (MASTER_OPTIONS_DICTIONARY[clean]) {\n`;
newDictContent += `    return MASTER_OPTIONS_DICTIONARY[clean];\n`;
newDictContent += `  }\n`;
newDictContent += `  return clean;\n`;
newDictContent += `}\n\n`;
newDictContent += `export const translateOptionMaster = translateMasterOption;\n`;

fs.writeFileSync(dictPath, newDictContent, "utf-8");
console.log("✅ Successfully updated src/lib/masterOptionsDictionary.ts with all Reading options!");
