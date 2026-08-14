import * as fs from "fs";

console.log("=== 🛠️ PATCHING LISTENING TOPICS FOR 100% PURE ENGLISH TRANSLATIONS ===");

const schemaPath = "src/lib/examSchema.ts";
let content = fs.readFileSync(schemaPath, "utf-8");

const isCRLF = content.includes("\r\n");
content = content.replace(/\r\n/g, "\n");

const targetOld = `  const bakeries = ["Boulangerie Saint-Laurent", "Pâtisserie Royale", "Boulangerie du Marché", "Les Douceurs du Village", "Au Bon Pain"];
  const bakeryItems = ["croissants aux amandes", "baguettes tradition", "tartes aux pommes", "pains au chocolat", "gâteaux au citron"];
  const discounts = ["30% de réduction", "une réduction de 50%", "un produit offert", "2$ de rabais"];
  const weatherTypes = ["fortes pluies", "grand soleil", "chutes de neige", "vent violent", "orages isolés"];`;

const targetNew = `  const bakeries = ["Boulangerie Saint-Laurent", "Pâtisserie Royale", "Boulangerie du Marché", "Les Douceurs du Village", "Au Bon Pain"];
  const bakeryItems = ["croissants aux amandes", "baguettes tradition", "tartes aux pommes", "pains au chocolat", "gâteaux au citron"];
  const bakeryItemsEn = ["almond croissants", "traditional baguettes", "apple tarts", "chocolate croissants", "lemon cakes"];
  const discounts = ["30% de réduction", "une réduction de 50%", "un produit offert", "2$ de rabais"];
  const discountsEn = ["30% discount", "50% discount", "one free item", "$2 off discount"];
  const weatherTypes = ["fortes pluies", "grand soleil", "chutes de neige", "vent violent", "orages isolés"];
  const weatherTypesEn = ["heavy rain", "bright sunshine", "snowfall", "strong winds", "isolated thunderstorms"];`;

if (!content.includes(targetOld)) {
  console.error("Target old block not found in examSchema.ts");
  process.exit(1);
}

content = content.replace(targetOld, targetNew);

// Also replace the en interpolations for qNum === 2 and qNum === 3
content = content.replace(
  `en: \`Hello! Today at \${bakery}, enjoy a special promotion of \${disc} on \${item}.\`,`,
  `en: \`Hello! Today at \${bakery}, enjoy a special promotion of \${discountsEn[i % discountsEn.length]} on \${bakeryItemsEn[i % bakeryItemsEn.length]}.\`,`
);

content = content.replace(
  `en: \`Weather report for \${city}: \${wType} expected this afternoon with a temperature of \${temp}.\`,`,
  `en: \`Weather report for \${city}: \${weatherTypesEn[i % weatherTypesEn.length]} expected this afternoon with a temperature of \${temp}.\`,`
);

if (isCRLF) {
  content = content.replace(/\n/g, "\r\n");
}

fs.writeFileSync(schemaPath, content, "utf-8");
console.log("✅ Successfully patched listening topics with 100% pure English translations!");
