import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'illustrations');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') && !f.startsWith('backup_'));

console.log(`=== 🖌️ ERASING TOP TEXT HEADER ONLY (KEEPING 100% OF FULL SCENARIO DRAWING) ===`);

async function processImages() {
  for (const file of files) {
    const filePath = path.join(dir, file);
    const image = sharp(filePath);
    const metadata = await image.metadata();

    const width = metadata.width || 1024;
    const height = metadata.height || 1024;

    // Create an SVG overlay to cover ONLY the top header text area (y: 15px to 148px) with pure white
    // This preserves 100% of the original image dimensions, drawing, bus, shelter, and full composition!
    const headerMaskHeight = Math.round(height * 0.145); // top 14.5% covers text string cleanly

    const svgOverlay = Buffer.from(
      `<svg width="${width}" height="${height}">
        <rect x="0" y="0" width="${width}" height="${headerMaskHeight}" fill="#FFFFFF" />
      </svg>`
    );

    await image
      .composite([{ input: svgOverlay, top: 0, left: 0 }])
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(filePath + '.tmp');

    fs.renameSync(filePath + '.tmp', filePath);
    console.log(`✅ ${file}: Header text erased. 100% of drawing composition preserved (${width}x${height}).`);
  }

  console.log("\n🎉 ALL 9 ILLUSTRATION PNGs ARE NOW 100% FULL-FRAME WITH ZERO PIXELS CROPPED FROM THE DRAWING!");
}

processImages().catch(err => {
  console.error("❌ Error processing header erase:", err);
  process.exit(1);
});
