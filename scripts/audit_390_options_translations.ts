import { translateOptionToEnglish } from "../src/lib/examSchema";
import * as fs from "fs";

const optionList: string[] = JSON.parse(fs.readFileSync("scratch/all_390_unique_options.json", "utf-8"));

console.log(`Auditing ${optionList.length} unique options...`);

const untranslated: string[] = [];

optionList.forEach(opt => {
  const tr = translateOptionToEnglish(opt);
  if (!tr || tr === opt || /\b(à|du|des|pour|dans|le|la|les|une|un|d'|l'|d’|l’)\b/i.test(tr)) {
    untranslated.push(opt);
  }
});

console.log(`Found ${untranslated.length} / ${optionList.length} options requiring complete English translation.`);
fs.writeFileSync("scratch/untranslated_options_390.json", JSON.stringify(untranslated, null, 2));

console.log("Sample untranslated options:");
untranslated.slice(0, 20).forEach((u, i) => console.log(`${i + 1}. "${u}"`));
