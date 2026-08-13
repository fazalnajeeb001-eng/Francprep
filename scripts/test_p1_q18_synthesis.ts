import { generateNeuralAudio } from "../backend/src/services/tts.service.ts";

async function testQ18() {
  console.log("=== 🧪 TESTING SYNTHESIS OF QUESTION 18 TEXT ===");

  const line1 = "Le festival annuel de musique émergente de la métropole de Montréal mettra à l'honneur cette année 13 groupes régionaux d'une grande diversité stylistique. Les organisateurs souhaitent ainsi promouvoir le dynamisme artistique local et offrir une vitrine professionnelle aux jeunes talents émergents de la région.";
  const line2 = "Écoutez la question. Question N°18 : Quel est l'objectif principal de cet événement culturel ?";

  console.log(`Testing Line 1 (Passage - ${line1.length} chars)...`);
  const res1 = await generateNeuralAudio(line1, "female", "fr", "google");
  console.log("Line 1 Result:", res1 ? `SUCCESS (${res1.audioBase64.length} base64 chars, provider: ${res1.provider})` : "FAILED");

  console.log(`\nTesting Line 2 (Question - ${line2.length} chars)...`);
  const res2 = await generateNeuralAudio(line2, "male", "fr", "google");
  console.log("Line 2 Result:", res2 ? `SUCCESS (${res2.audioBase64.length} base64 chars, provider: ${res2.provider})` : "FAILED");
}

testQ18();
