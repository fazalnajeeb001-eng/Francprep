const mongoose = require('../backend/node_modules/mongoose');
const dotenv = require('../backend/node_modules/dotenv');
dotenv.config({ path: './backend/.env' });

async function inspectMongoExact() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/francprep?appName=Francprep';
  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas.");

  const client = mongoose.connection.client;
  const dbs = await client.db().admin().listDatabases();
  console.log("All MongoDB Databases:", dbs.databases.map(d => d.name));

  for (const dbInfo of dbs.databases) {
    if (['admin', 'local'].includes(dbInfo.name)) continue;
    const db = client.db(dbInfo.name);
    const collections = await db.listCollections().toArray();
    console.log(`\n--- DB: ${dbInfo.name} ---`);
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`  Collection: ${col.name} (${count} documents)`);
      if (col.name === 'ttscaches') {
        const sample = await db.collection(col.name).findOne({});
        if (sample) {
          console.log(`    Sample Voice: ${sample.voice}`);
          console.log(`    Sample Text: ${sample.text?.substring(0, 40)}...`);
          console.log(`    Sample Base64 Length: ${sample.audioBase64?.length}`);
        }
      }
    }
  }

  await mongoose.disconnect();
}

inspectMongoExact().catch(console.error);
