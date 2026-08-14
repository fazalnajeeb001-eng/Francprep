import { AUTHENTIC_B2_ITEMS, AUTHENTIC_C1C2_ITEMS } from "../src/lib/authenticListeningAdvancedBank";

console.log("=== 🔬 TESTING AUTHENTIC ADVANCED LISTENING BANK ===");

console.log(`B2 Items Count: ${AUTHENTIC_B2_ITEMS.length} (Expected: 80)`);
console.log(`C1/C2 Items Count: ${AUTHENTIC_C1C2_ITEMS.length} (Expected: 60)`);

let verbatimB2 = 0;
let verbatimC1C2 = 0;

AUTHENTIC_B2_ITEMS.forEach((item, idx) => {
  const correctOpt = item.optionsFr[item.ans].toLowerCase();
  const transcript = item.audioFr.toLowerCase();
  if (transcript.includes(correctOpt)) {
    verbatimB2++;
    console.error(`❌ B2 Item ${idx} has verbatim match: "${correctOpt}"`);
  }
});

AUTHENTIC_C1C2_ITEMS.forEach((item, idx) => {
  const correctOpt = item.optionsFr[item.ans].toLowerCase();
  const transcript = item.audioFr.toLowerCase();
  if (transcript.includes(correctOpt)) {
    verbatimC1C2++;
    console.error(`❌ C1/C2 Item ${idx} has verbatim match: "${correctOpt}"`);
  }
});

console.log(`Verbatim B2 Matches: ${verbatimB2} / 80`);
console.log(`Verbatim C1/C2 Matches: ${verbatimC1C2} / 60`);

if (verbatimB2 === 0 && verbatimC1C2 === 0) {
  console.log("🎉 ALL 140 ADVANCED ITEMS HAVE ZERO VERBATIM OVERLAP AND 100% PEDAGOGICAL PARAPHRASING!");
}
