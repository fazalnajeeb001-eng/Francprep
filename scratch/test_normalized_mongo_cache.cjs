const mongoose = require('../backend/node_modules/mongoose');
const path = require('path');
const dotenv = require('../backend/node_modules/dotenv');
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const { generateListeningQuestions } = require('../src/lib/examSchema.ts');

function normalizeText(t) {
  const clean = (t || '').replace(/^(locuteur|locutrice|annonceur|annonceuse)\s*:\s*/i, '');
  return clean.toLowerCase().replace(/['’`"«».,!?;:\s\-\u2013\u2014]+/g, '').trim();
}

async function testNormalizedCache() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/francprep?appName=Francprep';
  await mongoose.connect(uri);
  console.log("Connected to MongoDB Atlas.");

  const client = mongoose.connection.client;
  const dbFrancprep = client.db('francprep');
  const dbTest = client.db('test');

  const docsFrancprep = await dbFrancprep.collection('ttscaches').find({}).toArray();
  const docsTest = await dbTest.collection('ttscaches').find({}).toArray();
  const allCachedDocs = [...docsFrancprep, ...docsTest];

  console.log(`Total cached documents available across databases: ${allCachedDocs.length}`);

  // Map normalized text to cached document
  const normMap = new Map();
  for (const doc of allCachedDocs) {
    if (doc.text && doc.audioBase64) {
      const norm = normalizeText(doc.text);
      if (!normMap.has(norm)) {
        normMap.set(norm, doc);
      }
    }
  }

  console.log(`Unique normalized text entries in cache: ${normMap.size}`);

  let totalQuestions = 0;
  let totalMatched = 0;
  let totalMissing = 0;

  for (let p = 1; p <= 10; p++) {
    const isPractice = p <= 5;
    const seedOffset = isPractice ? (p * 3) : (p * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

    let pMatched = 0;
    totalQuestions += questions.length;

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const qNum = q.questionNumber || (i + 1);
      const text = (q.transcript || q.text || '').trim();
      const norm = normalizeText(text);

      const hit = normMap.get(norm);
      if (hit) {
        pMatched++;
        totalMatched++;
      } else {
        totalMissing++;
        console.warn(`   ❌ Missing in Paper ${p} Q${qNum}: "${text.substring(0, 50)}..."`);
      }
    }

    console.log(`📄 Paper ${p.toString().padStart(2, ' ')}: ${pMatched}/39 matched (${((pMatched/39)*100).toFixed(1)}%)`);
  }

  console.log("\n==========================================================================");
  console.log(`📊 NORMALIZED CACHE MATCH RESULTS: ${totalMatched} / ${totalQuestions} (${((totalMatched/totalQuestions)*100).toFixed(1)}%)`);
  console.log("==========================================================================");

  await mongoose.disconnect();
}

testNormalizedCache().catch(console.error);
