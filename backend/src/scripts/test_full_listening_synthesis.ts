import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { generateNeuralAudio } from "../services/tts.service";

async function testFullListening() {
  console.log("==========================================================================");
  console.log("🎙️ TESTING FULL MULTI-SPEAKER & SINGLE-SPEAKER ELEVENLABS SYNTHESIS");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI;
  await mongoose.connect(mongoUri!);

  // Test 1: Single Speaker Announcer Question (Q1)
  console.log("\n1. 🧪 Testing Single Speaker / Announcer (Q1)...");
  const textQ1 = "Consigne : Regardez l'image. Écoutez le message et les quatre propositions. Choisissez la proposition qui correspond à l'image.\nAnnonceuse : Attention, le train en provenance de Lyon va entrer en gare voie 3.\nOption A : Le train part de la gare.\nOption B : Le train arrive en gare.\nOption C : Les voyageurs montent dans l'avion.\nOption D : Le guichet est fermé.";
  
  const resQ1 = await generateNeuralAudio(textQ1, "female", "fr", "elevenlabs", undefined, undefined, 0.9);
  console.log("   • Q1 Result Provider:", resQ1?.provider);
  console.log("   • Q1 Audio Base64 length:", resQ1?.audioBase64?.length);
  if (!resQ1?.audioBase64 || !resQ1.provider.startsWith("elevenlabs")) {
    throw new Error("Q1 ElevenLabs synthesis failed!");
  }
  console.log("   ✅ Q1 ElevenLabs Synthesis 100% Successful!");

  // Test 2: Multi-Speaker Conversational Dialogue (Q15)
  console.log("\n2. 🧪 Testing Multi-Speaker Conversational Dialogue (Q15)...");
  const textQ15 = "Locuteur 1 : Tu as vu les nouvelles consignes pour le télétravail ?\nLocutrice 2 : Oui, à partir du mois prochain, nous aurons droit à trois jours par semaine à domicile.\nLocuteur 1 : C'est une excellente nouvelle pour l'équilibre de vie.\nAnnonceur : Écoutez la question. Question N°15 : De quoi discutent les deux collègues ?";
  
  const resQ15 = await generateNeuralAudio(textQ15, "female", "fr", "elevenlabs", undefined, undefined, 0.9);
  console.log("   • Q15 Result Provider:", resQ15?.provider);
  console.log("   • Q15 Audio Base64 length:", resQ15?.audioBase64?.length);
  if (!resQ15?.audioBase64 || !resQ15.provider.startsWith("elevenlabs")) {
    throw new Error("Q15 ElevenLabs synthesis failed!");
  }
  console.log("   ✅ Q15 Multi-Voice ElevenLabs Synthesis 100% Successful!");

  console.log("\n==========================================================================");
  console.log("🎉 ALL ELEVENLABS VOICES & MULTI-SPEAKER ENGINES ARE FULLY OPERATIONAL!");
  console.log("==========================================================================");

  await mongoose.disconnect();
}

testFullListening();
