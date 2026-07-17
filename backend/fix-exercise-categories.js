#!/usr/bin/env node
/**
 * Fix Exercise Categories
 * Sets category field on exercises based on their title/type.
 * Usage: node fix-exercise-categories.js [--apply]
 */

const { MongoClient } = require('mongodb');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/francprep';

function inferCategory(exercise) {
  const title = (exercise.title || '').toLowerCase();
  const type = exercise.type || '';

  if (type === 'listening') return 'listening';
  if (type === 'writing') return 'writing';
  if (title.includes('reading') || title.includes('comprehension') || title.includes('passage')) return 'reading';
  if (title.includes('listening') || title.includes('audio') || title.includes('dialogue')) return 'listening';
  if (title.includes('grammar') || title.includes('conjugat') || title.includes('verb') || title.includes('drill')) return 'grammar';
  if (title.includes('vocabulary') || title.includes('vocab') || title.includes('word')) return 'vocabulary';
  if (title.includes('speaking') || title.includes('pronunciation') || title.includes('record')) return 'speaking';
  if (title.includes('writing') || title.includes('compose') || title.includes('essay')) return 'writing';
  if (type === 'multiple_choice') return 'grammar';
  if (type === 'fill_blank') return 'grammar';
  if (type === 'matching') return 'vocabulary';
  return 'grammar';
}

async function main() {
  const apply = process.argv.includes('--apply');
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const col = db.collection('exercises');

    const total = await col.countDocuments();
    const noCategory = await col.countDocuments({ category: { $exists: false } });
    console.log(`Total exercises: ${total}`);
    console.log(`Missing category: ${noCategory}`);

    const cursor = col.find({ category: { $exists: false } });
    let updated = 0;
    while (await cursor.hasNext()) {
      const ex = await cursor.next();
      const cat = inferCategory(ex);
      if (apply) {
        await col.updateOne({ _id: ex._id }, { $set: { category: cat } });
      }
      console.log(`  ${ex.title} -> ${cat}`);
      updated++;
    }

    if (apply) {
      console.log(`\nUpdated ${updated} exercises with category.`);
    } else {
      console.log(`\nDry run. Use --apply to update ${updated} exercises.`);
    }
  } finally {
    await client.close();
  }
}

main().catch(console.error);
