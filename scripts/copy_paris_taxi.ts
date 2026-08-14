import * as fs from "fs";
import * as path from "path";

const brainDir = "C:\\Users\\black\\.gemini\\antigravity-ide\\brain\\a6e45263-784d-4076-8002-9125b110bf3c";
const srcPath = path.join(brainDir, "tcf_p7_q1_paris_style_1786647837368.png");
const destPath = "public/illustrations/tcf_p7_q1.png";

if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Copied Parisian taxi illustration to ${destPath}`);
} else {
  console.error("❌ Source file missing");
}
