const https = require("https");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";

function analyzeMpegStream(buf, label) {
  let offset = 0;
  if (buf.slice(0, 3).toString() === 'ID3') {
    const b0 = buf[6], b1 = buf[7], b2 = buf[8], b3 = buf[9];
    const tagSize = ((b0 & 0x7F) << 21) | ((b1 & 0x7F) << 14) | ((b2 & 0x7F) << 7) | (b3 & 0x7F);
    offset = 10 + tagSize;
  }

  let frameCount = 0;
  let id3InMiddle = false;

  while (offset < buf.length - 4) {
    if (buf.slice(offset, offset + 3).toString() === 'ID3') {
      id3InMiddle = true;
      offset += 10;
      continue;
    }

    if (buf[offset] === 0xFF && (buf[offset + 1] & 0xE0) === 0xE0) {
      const versionBits = (buf[offset + 1] >> 3) & 0x03;
      const layerBits = (buf[offset + 1] >> 1) & 0x03;
      const bitrateIndex = (buf[offset + 2] >> 4) & 0x0F;
      const samplingIndex = (buf[offset + 2] >> 2) & 0x03;
      const padding = (buf[offset + 2] >> 1) & 0x01;

      const bitrates = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
      const sampleRates = [44100, 48000, 32000, 0];

      const bitrate = bitrates[bitrateIndex] * 1000;
      const sampleRate = sampleRates[samplingIndex];

      if (bitrate > 0 && sampleRate > 0) {
        const frameLength = Math.floor((144 * bitrate) / sampleRate) + padding;
        frameCount++;
        offset += frameLength;
      } else {
        offset++;
      }
    } else {
      offset++;
    }
  }

  const duration = (frameCount * 1152) / 44100;
  return { frameCount, duration, id3InMiddle };
}

function fetchTtsDirect(text, apiKey) {
  // Use our local tts service logic directly
  const { generateNeuralAudio } = require('../backend/dist/src/services/tts.service.js');
  return generateNeuralAudio(text, 'male', 'fr', 'elevenlabs', '', { elevenLabsApiKey: apiKey });
}

async function testAllQuestionTypes() {
  console.log("=== 🔍 TESTING FULL SYNTHESIS ACROSS ALL QUESTION ARCHETYPES ===");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("test");
  const s = await db.collection("settings").findOne();
  const apiKey = s?.elevenLabsApiKey;

  if (!apiKey) {
    console.error("No API key");
    await client.close();
    return;
  }

  const testCases = [
    {
      type: "Q1-4 (Visual Consigne + 4 Spoken Options)",
      text: "Annonceuse : Consigne : Regardez l'image. Écoutez les 4 propositions. Choisissez celle qui correspond à l'image et cochez la bonne réponse.\n... Proposition A : Pardon monsieur, à quelle heure arrive le train ?\n... Proposition B : L'addition s'il vous plaît.\n... Proposition C : Où sont les cabines d'essayage ?\n... Proposition D : Deux places pour le cinéma."
    },
    {
      type: "Q5-8 (Passage + Announcer Question + 4 Spoken Options)",
      text: "Locuteur : Bonjour madame, je cherche la pharmacie de garde ce dimanche.\nAnnonceuse : Écoutez la question et les 4 réponses. Question N°5 : Que recherche cette personne ?\n... A : Un restaurant ouvert.\n... B : La pharmacie de garde.\n... C : La gare centrale.\n... D : Un bureau de poste."
    },
    {
      type: "Q16-25 (Multi-Speaker Dialogue + Announcer Question)",
      text: "Locuteur 1 : Tu as vu l'annonce pour le poste de gestionnaire de projet à Lyon ?\nLocutrice 2 : Oui, mais la date limite de candidature est déjà passée hier soir.\nAnnonceur : Écoutez la question. Question N°16 : Que regrette l'interlocutrice ?"
    }
  ];

  for (const tc of testCases) {
    console.log(`\n🧪 Testing: ${tc.type}`);
    const res = await fetchTtsDirect(tc.text, apiKey);
    if (!res || !res.audioBase64) {
      console.error(`❌ Failed to synthesize for ${tc.type}`);
      continue;
    }

    const buf = Buffer.from(res.audioBase64, 'base64');
    const analysis = analyzeMpegStream(buf, tc.type);

    console.log(`  - Provider: ${res.provider}`);
    console.log(`  - Stitched Buffer: ${buf.length} bytes`);
    console.log(`  - Duration: ${analysis.duration.toFixed(2)} seconds`);
    console.log(`  - Continuous Stream (0 Middle ID3s): ${analysis.id3InMiddle ? "❌ Corrupted" : "✅ 100% CLEAN"}`);
  }

  await client.close();
}

testAllQuestionTypes().catch(console.error);
