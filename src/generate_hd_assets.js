import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "illustrations");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".png"));

let code = `/**
 * Official TCF HD Illustration Data URIs
 * Embedded Base64 for 100% instant, bulletproof image loading across all environments & Vercel deployments.
 */

export const HD_ILLUSTRATIONS: Record<string, string> = {\n`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  const buffer = fs.readFileSync(filePath);
  const base64 = buffer.toString("base64");
  const key = file.replace(".png", "");
  code += `  "${key}": "data:image/png;base64,${base64}",\n`;
});

code += `};\n\n`;

code += `export function getHdIllustration(paperIdx: number, qNum: number): string | undefined {\n`;
code += `  const key = \`tcf_p\${paperIdx}_q\${qNum}\`;\n`;
code += `  return HD_ILLUSTRATIONS[key] || HD_ILLUSTRATIONS[\`tcf_p1_q\${qNum}\`];\n`;
code += `}\n`;

fs.writeFileSync(path.join(process.cwd(), "src", "lib", "hdIllustrationAssets.ts"), code);
console.log(`Generated src/lib/hdIllustrationAssets.ts with ${files.length} embedded HD illustrations.`);
