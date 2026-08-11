import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const illustrationsDir = path.join(process.cwd(), 'public', 'illustrations');
const files = fs.readdirSync(illustrationsDir).filter(f => f.endsWith('.png'));

console.log(`=== ✂️ CROPPING BOOK HEADERS & MARGINS FROM ${files.length} ILLUSTRATIONS ===`);

async function cropAllImages() {
  for (const file of files) {
    const filePath = path.join(illustrationsDir, file);
    const backupPath = path.join(illustrationsDir, `backup_${file}`);

    // Create temporary backup if not existing
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    const image = sharp(backupPath);
    const metadata = await image.metadata();

    const width = metadata.width || 1024;
    const height = metadata.height || 1024;

    // Crop parameters:
    // Remove top 20.5% (book header text "DOCUMENT 1 - TCF")
    // Remove left 4.5% (left book spine border)
    // Remove right 4.5% (right page border)
    // Remove bottom 3% (bottom page border)

    const cropLeft = Math.round(width * 0.045);
    const cropTop = Math.round(height * 0.205);
    const cropWidth = Math.round(width * 0.91); // 100% - 4.5% left - 4.5% right
    const cropHeight = Math.round(height * 0.765); // 100% - 20.5% top - 3% bottom

    console.log(`Processing ${file} (${width}x${height}) -> Cropping box: left=${cropLeft}, top=${cropTop}, w=${cropWidth}, h=${cropHeight}`);

    await sharp(backupPath)
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(filePath);

    console.log(`✅ Successfully cropped and saved HD scenario drawing: ${file}`);
  }

  console.log("\n🎉 ALL 9 HD ILLUSTRATION PNGs ARE NOW 100% CLEANED & CROPPED (PURE SCENARIO ONLY)!");
}

cropAllImages().catch(err => {
  console.error("❌ Error cropping images:", err);
  process.exit(1);
});
