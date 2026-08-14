import * as fs from "fs";

const schemaPath = "src/lib/examSchema.ts";
let content = fs.readFileSync(schemaPath, "utf-8");

const isCRLF = content.includes("\r\n");
content = content.replace(/\r\n/g, "\n");

const oldBakeries = `  const bakeries = ["Boulangerie Saint-Laurent", "Pâtisserie Royale", "Boulangerie du Marché", "Les Douceurs du Village", "Au Bon Pain"];`;
const newBakeries = `  const bakeries = ["Boulangerie Saint-Laurent", "Pâtisserie Royale", "Boulangerie du Marché", "Les Douceurs du Village", "Au Bon Pain"];
  const bakeriesEn = ["Saint-Laurent Bakery", "Royal Pastry Shop", "Market Bakery", "Village Sweets Bakery", "Au Bon Pain Bakery"];`;

content = content.replace(oldBakeries, newBakeries);
content = content.replace(
  `en: \`Hello! Today at \${bakery}, enjoy a special promotion of \${discountsEn[i % discountsEn.length]} on \${bakeryItemsEn[i % bakeryItemsEn.length]}.\`,`,
  `en: \`Hello! Today at \${bakeriesEn[i % bakeriesEn.length]}, enjoy a special promotion of \${discountsEn[i % discountsEn.length]} on \${bakeryItemsEn[i % bakeryItemsEn.length]}.\`,`
);

if (isCRLF) content = content.replace(/\n/g, "\r\n");

fs.writeFileSync(schemaPath, content, "utf-8");
console.log("✅ Successfully replaced proper noun store names with clean English in en template!");
