const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep').then(async()=>{
  const db = mongoose.connection.db;
  const ch1 = await db.collection('chapters').findOne({title:/Greetings/});
  const l1 = await db.collection('lessons').findOne({chapterId:ch1._id,order:1});
  console.log('L1:', l1.title);
  console.log('Sections:', l1.sections.map(s => s.type + ' bodyLen=' + s.body.length + ' trans=' + (s.translation ? 'YES' : 'NO')));
  
  const l2 = await db.collection('lessons').findOne({chapterId:ch1._id,order:2});
  console.log('L2:', l2.title);
  console.log('Sections:', l2.sections.map(s => s.type + ' bodyLen=' + s.body.length + ' trans=' + (s.translation ? 'YES' : 'NO')));
  
  console.log('L1 objectives:', l1.objectives);
  console.log('L2 objectives:', l2.objectives);
  
  mongoose.disconnect();
}).catch(e=>{console.error(e);mongoose.disconnect();});