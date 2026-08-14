import * as fs from "fs";
import { translateOptionMaster } from "./build_master_options_dictionary_all_10_papers";

const list: string[] = JSON.parse(fs.readFileSync("scratch/all_390_unique_options.json", "utf-8"));

const missing: string[] = [];

list.forEach(opt => {
  const tr = translateOptionMaster(opt);
  if (!tr || tr === opt || /\b(à|du|des|pour|dans|le|la|les|une|un|d'|l'|d’|l’)\b/i.test(tr)) {
    missing.push(opt);
  }
});

console.log(`Extracting ${missing.length} visual items...`);
fs.writeFileSync("scratch/remaining_visual_items.json", JSON.stringify(missing, null, 2));
