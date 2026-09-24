const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function sanitizeImages() {
  const tefDir = path.resolve(process.cwd(), 'public', 'illustrations', 'tef');

  // 1. Sanitize tef_p2_q4_d.png: remove the artificial top banner "EXAMEN TEF CANADA..."
  const p4dPath = path.join(tefDir, 'tef_p2_q4_d.png');
  if (fs.existsSync(p4dPath)) {
    const whiteTop = Buffer.from(
      '<svg width="1024" height="65"><rect width="1024" height="65" fill="#FFFFFF"/></svg>'
    );
    const cleaned = await sharp(p4dPath)
      .composite([{ input: whiteTop, top: 0, left: 0 }])
      .png()
      .toBuffer();
    fs.writeFileSync(p4dPath, cleaned);
    console.log('✓ Successfully sanitized tef_p2_q4_d.png (removed artificial top header banner)');
  }

  // 2. Sanitize tef_p2_q2_a.png: remove bottom labels "PHARMACIEN" and "CLIENTE"
  const p2aPath = path.join(tefDir, 'tef_p2_q2_a.png');
  if (fs.existsSync(p2aPath)) {
    const whiteBottom = Buffer.from(
      '<svg width="1024" height="85"><rect width="1024" height="85" fill="#FFFFFF"/></svg>'
    );
    const cleaned = await sharp(p2aPath)
      .composite([{ input: whiteBottom, top: 939, left: 0 }])
      .png()
      .toBuffer();
    fs.writeFileSync(p2aPath, cleaned);
    console.log('✓ Successfully sanitized tef_p2_q2_a.png (removed artificial character labels)');
  }

  // 3. Sanitize tef_p2_q4_c.png: remove English placards "HANDBAGS" and "CLUTCHES & BELTS"
  // Let's inspect where HANDBAGS and CLUTCHES & BELTS are located in tef_p2_q4_c.png
  const p4cPath = path.join(tefDir, 'tef_p2_q4_c.png');
  if (fs.existsSync(p4cPath)) {
    // Placard 1 (HANDBAGS): x: ~520-610, y: ~170-220
    // Placard 2 (CLUTCHES & BELTS): x: ~790-940, y: ~90-160
    const whitePlacards = Buffer.from(
      `<svg width="1024" height="1024">
        <rect x="520" y="172" width="100" height="48" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
        <rect x="790" y="90" width="155" height="68" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
      </svg>`
    );
    const cleaned = await sharp(p4cPath)
      .composite([{ input: whitePlacards, top: 0, left: 0 }])
      .png()
      .toBuffer();
    fs.writeFileSync(p4cPath, cleaned);
    console.log('✓ Successfully sanitized tef_p2_q4_c.png (cleared English placard text)');
  }
}

sanitizeImages().catch(console.error);
