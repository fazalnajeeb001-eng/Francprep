import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const filePath = path.join(process.cwd(), 'public', 'illustrations', 'tcf_p3_q1.png');

console.log("=== 🎨 CONVERTING PAPER 3 Q1 TO STYLISTIC BLACK & WHITE LINE ART SKETCH ===");

async function convertToBW() {
  if (!fs.existsSync(filePath)) {
    console.error("❌ File not found:", filePath);
    return;
  }

  // Convert color supermarket drawing to crisp grayscale line-art pencil style
  await sharp(filePath)
    .grayscale()
    .linear(1.35, -20) // boost contrast to mirror black & white pencil sketch lines
    .png({ quality: 100 })
    .toFile(filePath + '.bw');

  fs.renameSync(filePath + '.bw', filePath);
  console.log("✅ Successfully converted tcf_p3_q1.png to 100% consistent Black & White line art style!");
}

convertToBW().catch(err => {
  console.error("❌ Error converting image:", err);
});
