import * as fs from "fs";
import { PRACTICE_LISTENING_TRANSLATIONS } from "../src/lib/practiceListeningTranslations";

const remaining = new Set<string>();

for (const [id, item] of Object.entries(PRACTICE_LISTENING_TRANSLATIONS)) {
  for (let i = 0; i < 4; i++) {
    const optEn = item.optionsEnglish[i];
    if (/\b(à|du|des|pour|dans|le|la|les|une|un|fermeture|annulation|départ|proposée|réduction|d'|l'|d’|l’)\b/i.test(optEn)) {
      remaining.add(optEn);
    }
  }
}

console.log(`Remaining distinct French option strings: ${remaining.size}`);
fs.writeFileSync("scratch/remaining_49.json", JSON.stringify(Array.from(remaining), null, 2));
