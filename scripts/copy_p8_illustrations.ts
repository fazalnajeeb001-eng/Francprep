import * as fs from "fs";
import * as path from "path";

const brainDir = "C:\\Users\\black\\.gemini\\antigravity-ide\\brain\\a6e45263-784d-4076-8002-9125b110bf3c";
const destDir = "public/illustrations";

const mapping: Record<string, string> = {
  "tcf_p8_q1.png": "tcf_p8_q1_1786647880669.png",
  "tcf_p8_q2.png": "tcf_p8_q2_1786647910484.png",
  "tcf_p8_q3.png": "tcf_p8_q3_1786647933637.png",
  "tcf_p8_q4.png": "tcf_p8_q4_1786647957616.png",
};

for (const [dest, src] of Object.entries(mapping)) {
  const srcPath = path.join(brainDir, src);
  const destPath = path.join(destDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${src} -> ${destPath}`);
  } else {
    console.error(`❌ Source missing: ${srcPath}`);
  }
}
