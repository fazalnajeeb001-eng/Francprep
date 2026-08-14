import * as fs from "fs";
import { generateListeningQuestions } from "../src/lib/examSchema";
import { translateOptionToEnglish } from "../src/lib/examSchema";
import { resolveOptionTranslation } from "./build_full_practice_translations_module";

console.log("=== 🔍 COLLECTING ALL REMAINING UNTRANSLATED FRENCH PHRASES ===");

const remainingFrench = new Set<string>();

for (let p = 1; p <= 5; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach((q) => {
    q.options.forEach((opt) => {
      const translated = resolveOptionTranslation(opt);
      if (/\b(à|du|des|pour|dans|le|la|les|une|un|fermeture|annulation|départ|proposée|réduction|l'|d')\b/i.test(translated)) {
        remainingFrench.add(opt);
      }
    });
  });
}

console.log(`Found ${remainingFrench.size} distinct French option strings to fully translate.`);
fs.writeFileSync("scratch/remaining_french_options.json", JSON.stringify(Array.from(remainingFrench), null, 2));
console.log("Saved to scratch/remaining_french_options.json");
