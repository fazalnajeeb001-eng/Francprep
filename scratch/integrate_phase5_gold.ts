import { GOLD_PAPER_9_ITEMS, GOLD_PAPER_10_ITEMS } from "./phase5_gold_data";
import { AUTHENTIC_READING_MASTER_BANK } from "../src/lib/authenticReadingMasterBank";
import * as fs from "fs";

function integratePhase5GoldData() {
  console.log("=== 🚀 INTEGRATING PHASE 5 GOLD-STANDARD DATA (PAPERS 9 & 10) INTO MASTER BANK ===");

  const fullBank = [...AUTHENTIC_READING_MASTER_BANK];

  // Paper 9 -> Index 8
  fullBank[8] = GOLD_PAPER_9_ITEMS;

  // Paper 10 -> Index 9
  fullBank[9] = GOLD_PAPER_10_ITEMS;

  const content = `import type { ReadingItem } from "./examSchema";

export interface ReadingItem {
  paperNum: number;
  qNum: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  docType: string;
  text: string;
  q: string;
  opt: [string, string, string, string];
  ans: number;
  passEn: string;
  qEn: string;
  optEn: [string, string, string, string];
}

// Master Reading Question Bank for 10 Papers x 39 Questions = 390 Calibrated Authentic Reading Questions.
export const AUTHENTIC_READING_MASTER_BANK: ReadingItem[][] = ${JSON.stringify(fullBank, null, 2)};

export function getReadingPaperItems(paperId: number): ReadingItem[] {
  const index = (paperId - 1) % AUTHENTIC_READING_MASTER_BANK.length;
  return AUTHENTIC_READING_MASTER_BANK[index] || AUTHENTIC_READING_MASTER_BANK[0];
}
`;

  fs.writeFileSync("src/lib/authenticReadingMasterBank.ts", content);
  console.log("✅ Successfully integrated Phase 5 items into src/lib/authenticReadingMasterBank.ts!");
}

integratePhase5GoldData();
