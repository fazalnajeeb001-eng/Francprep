const mongoose = require('../backend/node_modules/mongoose');
const dotenv = require('../backend/node_modules/dotenv');
dotenv.config({ path: './backend/.env' });

function normalizeText(t) {
  const clean = (t || '').replace(/^(locuteur|locutrice|annonceur|annonceuse)\s*:\s*/i, '');
  return clean.toLowerCase().replace(/['’`"«».,!?;:\s\-\u2013\u2014]+/g, '').trim();
}

async function benchmarkQuery() {
  const uri = process.env.MONGODB_URI;
  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas.");

  const client = mongoose.connection.client;
  const db = client.db('francprep');
  const col = db.collection('ttscaches');

  const testText = "Locutrice: L'hypothèse selon laquelle les structures de gouvernance mondiales...";
  const normTarget = normalizeText(testText);

  // 1. Benchmark Cursor Scan (Old method)
  const start1 = Date.now();
  const cursor = col.find({});
  let found1 = null;
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (doc && doc.text) {
      if (normalizeText(doc.text) === normTarget) {
        found1 = doc;
        break;
      }
    }
  }
  const time1 = Date.now() - start1;
  console.log(`⏱️ Old Full Collection Cursor Scan Time: ${time1} ms (Found: ${Boolean(found1)})`);

  // 2. Add index on normalizedText and query directly
  const start2 = Date.now();
  const found2 = await col.findOne({ normalizedText: normTarget });
  const time2 = Date.now() - start2;
  console.log(`⚡ New Indexed Direct Query Time: ${time2} ms (Found: ${Boolean(found2)})`);

  await mongoose.disconnect();
}

benchmarkQuery().catch(console.error);
