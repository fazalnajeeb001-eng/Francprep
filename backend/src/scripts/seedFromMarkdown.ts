/**
 * Seed script: Import all chapter markdown files into MongoDB.
 * Usage: npx ts-node src/scripts/seedFromMarkdown.ts
 */
import { connectDatabase } from '../config/database';
import { importChapterMarkdown } from '../services/markdownImport.service';
import * as path from 'path';

const CHAPTERS_DIR = path.resolve(__dirname, '../../../full a1 content including ledger and course skeleton');

const CHAPTERS = [
  { level: 'A1', chapterNum: 1, filename: 'FrancPrep_A1_Chapter1_Greetings_First_Contact.md' },
  { level: 'A1', chapterNum: 2, filename: 'FrancPrep_A1_Chapter2_Personal_Information.md' },
  { level: 'A1', chapterNum: 3, filename: 'FrancPrep_A1_Chapter3_Describing_People_Family.md' },
  { level: 'A1', chapterNum: 4, filename: 'FrancPrep_A1_Chapter4_Daily_Routines.md' },
  { level: 'A1', chapterNum: 5, filename: 'FrancPrep_A1_Chapter5_Food_Dining.md' },
  { level: 'A1', chapterNum: 6, filename: 'FrancPrep_A1_Chapter6_Shopping_Money.md' },
  { level: 'A1', chapterNum: 7, filename: 'FrancPrep_A1_Chapter7_Numbers_Time_Dates.md' },
  { level: 'A1', chapterNum: 8, filename: 'FrancPrep_A1_Chapter8_Places_Directions.md' },
  { level: 'A1', chapterNum: 9, filename: 'FrancPrep_A1_Chapter9_Weather_Nature.md' },
  { level: 'A1', chapterNum: 10, filename: 'FrancPrep_A1_Chapter10_Health_Body_Leisure.md' },
];

async function main() {
  console.log('Connecting to database...');
  await connectDatabase();
  console.log('Connected.\n');

  let totalLessons = 0, totalCreated = 0, totalUpdated = 0, totalSkipped = 0, totalErrors = 0;

  for (const ch of CHAPTERS) {
    const filePath = path.join(CHAPTERS_DIR, ch.filename);
    console.log(`Importing Chapter ${ch.chapterNum}: ${ch.filename}...`);

    try {
      const result = await importChapterMarkdown(filePath, ch.level, ch.chapterNum);
      console.log(`  → ${result.total} lessons: ${result.created} created, ${result.updated} updated, ${result.skipped} skipped`);

      if (result.errors.length > 0) {
        for (const e of result.errors) {
          console.log(`  ✗ ${e.lessonId}: ${e.error}`);
        }
      }

      totalLessons += result.total;
      totalCreated += result.created;
      totalUpdated += result.updated;
      totalSkipped += result.skipped;
      totalErrors += result.errors.length;
    } catch (err: any) {
      console.log(`  ✗ Failed to import: ${err.message}`);
      totalErrors++;
    }
  }

  console.log(`\n=== Import Complete ===`);
  console.log(`Total lessons: ${totalLessons}`);
  console.log(`Created: ${totalCreated}`);
  console.log(`Updated: ${totalUpdated}`);
  console.log(`Skipped: ${totalSkipped}`);
  console.log(`Errors: ${totalErrors}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
