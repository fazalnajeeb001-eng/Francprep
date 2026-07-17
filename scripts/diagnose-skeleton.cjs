const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';

async function main() {
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  console.log('=== MODULES COLLECTION ===');
  const modules = await db.collection('modules').find({}).sort({ order: 1 }).toArray();
  console.log('Count: ' + modules.length);
  modules.forEach(m => {
    console.log('  [' + m._id + '] ' + (m.title || '(no title)') + ' | courseId=' + m.courseId + ' | order=' + m.order + ' | chapters=' + JSON.stringify(m.chapters || []));
  });
  console.log();

  console.log('=== SYLLABI COLLECTION ===');
  const syllabi = await db.collection('syllabuses').find({}).sort({ order: 1 }).toArray();
  console.log('Count: ' + syllabi.length);
  syllabi.forEach(s => {
    console.log('  [' + s._id + '] ' + (s.title || '(no title)') + ' | level=' + s.level + ' | order=' + s.order);
    if (s.units && s.units.length > 0) {
      s.units.forEach(u => {
        console.log('    Unit: ' + u.unit_name + ' (order=' + u.unit_order + ')');
        if (u.chapters) {
          u.chapters.forEach(ch => {
            console.log('      Chapter: ' + ch.chapter_name + ' (order=' + ch.chapter_order + ', lessons=' + (ch.lessons || []).length + ')');
          });
        }
      });
    }
  });
  console.log();

  console.log('=== COURSES COLLECTION ===');
  const courses = await db.collection('courses').find({}).toArray();
  console.log('Count: ' + courses.length);
  courses.forEach(c => {
    console.log('  [' + c._id + '] ' + (c.title || c.name || '(no title)') + ' | level=' + c.level);
  });
  console.log();

  // Check what chapters reference
  console.log('=== CHAPTER MODULE-ID LOOKUP ===');
  const chapters = await db.collection('chapters').find({}).toArray();
  const moduleIds = [...new Set(chapters.map(ch => (ch.moduleId || ch.syllabusId || '').toString()))];
  console.log('Unique moduleIds referenced by chapters: ' + JSON.stringify(moduleIds));

  // Check if those moduleIds exist in modules collection
  for (const mid of moduleIds) {
    const mod = await db.collection('modules').findOne({ _id: require('mongodb').ObjectId.createFromHexString(mid) });
    const syll = await db.collection('syllabuses').findOne({ _id: require('mongodb').ObjectId.createFromHexString(mid) });
    console.log('  ' + mid + ' -> modules: ' + (mod ? mod.title : 'NOT FOUND') + ' | syllabuses: ' + (syll ? syll.title : 'NOT FOUND'));
  }

  await client.close();
  console.log('\nDone.');
}

main().catch(e => { console.error(e); process.exit(1); });
