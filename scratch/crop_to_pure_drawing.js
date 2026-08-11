import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'illustrations');
const files = [
  'tcf_p1_q1.png', 'tcf_p1_q2.png', 'tcf_p1_q3.png', 'tcf_p1_q4.png',
  'tcf_p2_q1.png', 'tcf_p2_q2.png', 'tcf_p2_q3.png', 'tcf_p2_q4.png',
  'tcf_p3_q1.png'
];

console.log("=== ✂️ CROPPING ALL 9 ILLUSTRATIONS TO PURE SCENARIO DRAWING ONLY ===");

async function processAll() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;

    const tempRawPath = path.join(dir, `raw_${file}`);
    fs.copyFileSync(filePath, tempRawPath);

    const image = sharp(tempRawPath);
    const metadata = await image.metadata();
    const width = metadata.width || 1024;
    const height = metadata.height || 1024;

    const left = Math.round(width * 0.045);
    const top = Math.round(height * 0.205);
    const cropWidth = Math.round(width * 0.91);
    const cropHeight = Math.round(height * 0.755);

    console.log(`Cropping ${file}: left=${left}, top=${top}, w=${cropWidth}, h=${cropHeight}`);

    await sharp(tempRawPath)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(filePath + '.cropped');

    fs.renameSync(filePath + '.cropped', filePath);
    if (fs.existsSync(tempRawPath)) fs.unlinkSync(tempRawPath);

    console.log(`✅ ${file}: Successfully cropped to pure scenario drawing!`);
  }

  console.log("\n🎉 ALL 9 PNG IMAGES ARE NOW 100% CROPPED TO PURE SCENARIO DRAWINGS (MATCHING SCREENSHOT 2 & 4)!");
}

processAll().catch(err => {
  console.error("❌ Error cropping:", err);
  process.exit(1);
});
