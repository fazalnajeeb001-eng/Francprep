import * as fs from "fs";

console.log("=== 🔬 CATALOGING EXISTING READING TOPICS IN EXAMSCHEMA.TS ===");

const content = fs.readFileSync("src/lib/examSchema.ts", "utf-8");
const startTag = "function getRichReadingTopics(): ReadingTopicItem[] {";
const endTag = "const READING_TOPICS = getRichReadingTopics();";

const sIdx = content.indexOf(startTag);
const eIdx = content.indexOf(endTag);

if (sIdx === -1 || eIdx === -1) {
  console.error("Tags not found");
  process.exit(1);
}

const funcBody = content.substring(sIdx, eIdx);
const lines = funcBody.split("\n");

// Parse objects
const items: any[] = [];
let currentItem: any = null;

lines.forEach(line => {
  if (line.includes('"level":')) {
    if (currentItem) items.push(currentItem);
    const lvlMatch = line.match(/"level":\s*"([^"]+)"/);
    currentItem = { level: lvlMatch ? lvlMatch[1] : "" };
  } else if (currentItem && line.includes('"q":')) {
    const qMatch = line.match(/"q":\s*"([^"]+)"/);
    if (qMatch) currentItem.q = qMatch[1];
  } else if (currentItem && line.includes('"text":')) {
    const textMatch = line.match(/"text":\s*"([^"]+)"/);
    if (textMatch) currentItem.text = textMatch[1];
  }
});
if (currentItem) items.push(currentItem);

console.log(`Extracted ${items.length} items from getRichReadingTopics()`);

const levels: Record<string, number> = {};
items.forEach(it => {
  levels[it.level] = (levels[it.level] || 0) + 1;
});

console.log("Existing items per level:", levels);
console.log("Target items per level (for 10 unique papers):");
console.log("  A1: 70 items (currently has " + (levels["A1"] || 0) + ")");
console.log("  A2: 80 items (currently has " + (levels["A2"] || 0) + ")");
console.log("  B1: 100 items (currently has " + (levels["B1"] || 0) + ")");
console.log("  B2: 80 items (currently has " + (levels["B2"] || 0) + ")");
console.log("  C1: 40 items (currently has " + (levels["C1"] || 0) + ")");
console.log("  C2: 20 items (currently has " + (levels["C2"] || 0) + ")");
console.log("  TOTAL TARGET: 390 items");
