import * as fs from "fs";

console.log("=== 🔬 AUDITING PHYSICAL ILLUSTRATION FILES IN public/illustrations/ ===");

const files = fs.readdirSync("public/illustrations");
console.log(`Found ${files.length} illustration files:`, files.sort());

for (let p = 1; p <= 10; p++) {
  for (let q = 1; q <= 4; q++) {
    const fn = `tcf_p${p}_q${q}.png`;
    const exists = fs.existsSync(`public/illustrations/${fn}`);
    const size = exists ? fs.statSync(`public/illustrations/${fn}`).size : 0;
    console.log(`Paper ${p} Q${q}: ${fn} => ${exists ? `EXISTS (${(size / 1024).toFixed(1)} KB)` : "MISSING"}`);
  }
}
