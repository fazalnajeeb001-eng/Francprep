import * as fs from "fs";

console.log("=== CHECKING IMAGE SIZES AND METADATA IN PUBLIC/ILLUSTRATIONS ===");

for (let p = 1; p <= 10; p++) {
  for (let q = 1; q <= 4; q++) {
    const fn = `public/illustrations/tcf_p${p}_q${q}.png`;
    if (fs.existsSync(fn)) {
      const stats = fs.statSync(fn);
      console.log(`P${p}Q${q}: ✅ ${fn} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.log(`P${p}Q${q}: ❌ MISSING`);
    }
  }
}
