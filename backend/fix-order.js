const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async () => {
  const db = mongoose.connection.db;

  // ====== ORDER FIX FOR A1 ======
  const a1Order = [
    { title: 'Greetings', order: 1 },
    { title: 'Personal Information', order: 2 },
    { title: 'Describing People', order: 3 },
    { title: 'Daily Routines', order: 4 },
    { title: 'Food & Dining', order: 5 },
    { title: 'Shopping', order: 6 },
    { title: 'Numbers', order: 7 },
    { title: 'Places & Directions', order: 8 },
    { title: 'Weather', order: 9 },
    { title: 'Health', order: 10 },
  ];

  for (const item of a1Order) {
    const ch = await db.collection('chapters').findOne({ title: { $regex: item.title, $options: 'i' } });
    if (ch) {
      await db.collection('chapters').updateOne({ _id: ch._id }, { $set: { order: item.order } });
      console.log(`A1: "${ch.title}" → order ${item.order}`);
    } else {
      console.log(`A1: NOT FOUND matching "${item.title}"`);
    }
  }

  // ====== ORDER FIX FOR A2 ======
  const a2Order = [
    { title: 'Housing & Home', order: 1 },
    { title: 'Neighborhood & Local', order: 2 },
    { title: 'Neighbors & Community', order: 3 },
    { title: 'Describing Your Town', order: 4 },
    { title: 'Jobs & Workplaces', order: 5 },
    { title: 'School & Studies', order: 6 },
    { title: 'Past Routines', order: 7 },
    { title: 'Comparing Then', order: 8 },
    { title: 'Travel & Transport', order: 9 },
    { title: 'Narrating Past', order: 10 },
    { title: 'Hobbies & Free', order: 11 },
    { title: 'Making Plans', order: 12 },
  ];

  for (const item of a2Order) {
    const ch = await db.collection('chapters').findOne({ title: { $regex: item.title, $options: 'i' } });
    if (ch) {
      await db.collection('chapters').updateOne({ _id: ch._id }, { $set: { order: item.order } });
      console.log(`A2: "${ch.title}" → order ${item.order}`);
    } else {
      console.log(`A2: NOT FOUND matching "${item.title}"`);
    }
  }

  console.log('\n=== VERIFY A1 ORDER ===');
  const a1Course = await db.collection('courses').findOne({level:'A1'});
  const a1Chapters = await db.collection('chapters').find({}).sort({order:1}).toArray();
  const allModules = await db.collection('modules').find().toArray();
  const modMap = {};
  allModules.forEach(m => modMap[m._id.toString()] = m);
  
  a1Chapters.forEach(ch => {
    const mod = modMap[ch.moduleId?.toString()];
    if (mod && mod.courseId?.toString() === a1Course._id.toString()) {
      console.log(`  ${ch.order}. ${ch.title} (${mod.title})`);
    }
  });

  console.log('\n=== VERIFY A2 ORDER ===');
  const a2Course = await db.collection('courses').findOne({level:'A2'});
  a1Chapters.forEach(ch => {
    const mod = modMap[ch.moduleId?.toString()];
    if (mod && mod.courseId?.toString() === a2Course?._id?.toString()) {
      console.log(`  ${ch.order}. ${ch.title} (${mod.title})`);
    }
  });

  mongoose.disconnect();
}).catch(e => { console.error(e); mongoose.disconnect(); });