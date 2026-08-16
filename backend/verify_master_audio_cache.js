const mongoose = require('mongoose');
const fs = require('fs');

async function verifyMasterAudioCache() {
  console.log('🔍 ======================================================');
  console.log('🚀 AUDITING 100% OF LISTENING & SPEAKING CACHE IN MONGODB');
  console.log('🔍 ======================================================\n');

  await mongoose.connect('mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep');
  const col = mongoose.connection.db.collection('ttscaches');

  const total = await col.countDocuments();
  const edgeCount = await col.countDocuments({ voice: { $regex: /^edge-neural/ } });
  console.log(`Total Documents in MongoDB: ${total}`);
  console.log(`Microsoft Neural Studio Tracks: ${edgeCount}\n`);

  const transcriptsPath = './listening_transcripts.json';
  if (!fs.existsSync(transcriptsPath)) {
    console.error('❌ listening_transcripts.json not found');
    await mongoose.disconnect();
    return;
  }

  const raw = JSON.parse(fs.readFileSync(transcriptsPath, 'utf-8'));
  let totalFound = 0;
  let totalMissing = 0;

  for (let p = 1; p <= 10; p++) {
    const list = raw[p.toString()] || [];
    let pFound = 0;
    let missing = [];

    for (const q of list) {
      const text = q.text.trim();
      const clean = text.replace(/(?:^|\n)\s*(?:Locuteur\s*\d*|Locutrice\s*\d*|Homme\s*\d*|Femme\s*\d*|Annonceur|Annonceuse|Journaliste|Intervenant(?:e)?|Professeur)\s*:\s*/gi, ' ').trim();

      const doc = await col.findOne({
        $or: [
          { text: text },
          { text: clean }
        ]
      });

      if (doc && doc.audioBase64 && doc.audioBase64.length > 500) {
        pFound++;
        totalFound++;
      } else {
        missing.push(q.qNum);
        totalMissing++;
      }
    }

    console.log(`📄 Paper ${p.toString().padStart(2, ' ')}: ${pFound}/${list.length} (${((pFound/list.length)*100).toFixed(1)}%) cached`, missing.length > 0 ? `⚠️ Missing: [${missing.join(', ')}]` : '✅ 100% HIT');
  }

  console.log('\n======================================================');
  console.log(`TOTAL LISTENING QUESTIONS VERIFIED: ${totalFound}/390 (${((totalFound/390)*100).toFixed(1)}%)`);
  console.log(`TOTAL MISSING: ${totalMissing}`);
  console.log('======================================================\n');

  await mongoose.disconnect();
}

verifyMasterAudioCache().catch(console.error);
