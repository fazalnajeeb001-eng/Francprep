import * as fs from "fs";
import * as path from "path";

const brainDir = "C:\\Users\\black\\.gemini\\antigravity-ide\\brain\\a6e45263-784d-4076-8002-9125b110bf3c";
const destDir = "public/illustrations";

const mapping: Record<string, string> = {
  "tcf_p9_q1.png": "tcf_p9_q1_1786648006975.png",
  "tcf_p9_q2.png": "tcf_p9_q2_1786648033833.png",
  "tcf_p9_q3.png": "tcf_p9_q3_1786648061334.png",
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
