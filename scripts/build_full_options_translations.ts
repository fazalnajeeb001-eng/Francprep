import * as fs from "fs";

console.log("=== 🌐 EXTRACTING ALL UNIQUE OPTIONS NEEDING TRANSLATION ===");

const untranslatedList: { id: string; optIdx: number; fr: string }[] = JSON.parse(fs.readFileSync("scratch/untranslated_options.json", "utf-8"));

const uniqueFrenchOptions = new Set<string>();
untranslatedList.forEach(item => uniqueFrenchOptions.add(item.fr));

console.log(`Found ${uniqueFrenchOptions.size} unique French options across all 5 practice papers.`);

fs.writeFileSync("scratch/unique_french_options.json", JSON.stringify(Array.from(uniqueFrenchOptions), null, 2));
console.log("Saved unique options to scratch/unique_french_options.json");
