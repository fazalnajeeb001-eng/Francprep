const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

async function checkStats() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");

  const count = await db.collection("ttscaches").countDocuments();
  console.log(`=== 📊 MONGODB TTS CACHE STATS ===`);
  console.log(`Total Stored Audio Files in MongoDB: ${count}`);

  const sample = await db.collection("ttscaches").find({}).sort({ createdAt: -1 }).limit(3).toArray();
  sample.forEach((item, idx) => {
    console.log(`\nSample Cached Item ${idx + 1}:`);
    console.log(`  - Text Hash: ${item.textHash}`);
    console.log(`  - Voice: ${item.voice}`);
    console.log(`  - Text Snippet: "${item.text.slice(0, 60)}..."`);
    console.log(`  - Audio Payload: ${Math.round(item.audioBase64?.length / 1024)} kB`);
    console.log(`  - Created At: ${item.createdAt}`);
  });

  await client.close();
}

checkStats().catch(console.error);
