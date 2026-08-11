import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'illustrations');
const files = fs.readdirSync(dir);

let removed = 0;
for (const f of files) {
  if (f.startsWith('backup_')) {
    fs.unlinkSync(path.join(dir, f));
    removed++;
  }
}

console.log(`✅ Removed ${removed} temporary backup files from public/illustrations/.`);
