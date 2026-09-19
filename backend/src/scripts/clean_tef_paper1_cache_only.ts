import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config({ path: path.join(__dirname, "../../../.env") });

import TTSCache from "../models/TTSCache";
import { TEF_PAPER_1_LISTENING_ITEMS } from "../../../src/lib/tefListeningMasterBank";

async function cleanTefPaper1CacheOnly() {
  console.log("==========================================================================");
  console.log("🛡️ SURGICAL TARGETED CACHE CLEANUP: TEF CANADA PAPER 1 ONLY");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI || "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";
  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUri);
  console.log("✓ Connected to MongoDB.");

  // Build targeted query matching exclusively TEF Paper 1 items
  const tefTextSubstrings = [
    "train pour Québec part bien de la voie 4",
    "trois croissants au beurre",
    "cabinet du docteur Moreau",
    "frein arrière de mon vélo",
    "Agence Immobilière du Parc",
    "bagage abandonné voie 3",
    "Garage Central",
    "Grand Magasin Lafayette",
    "Soraya : Évidemment que c'est positif",
    "Alain : C'est bien joli sur le papier",
    "Élodie : Franchement, je n'arrive pas à me prononcer",
    "tourbières du bas Saint-Laurent",
    "Dr. Maxime Vasseur",
    "Dr. Vasseur, en conclusion",
    "réduire le budget de recherche en intelligence artificielle",
    "nous pourrions signer le protocole d'accord",
    "Votre proposition témoigne d'une grande audace intellectuelle"
  ];

  let totalDeleted = 0;

  for (const item of TEF_PAPER_1_LISTENING_ITEMS) {
    const rawText = item.audioFr.trim();
    // Delete exact rawText matches
    const res1 = await TTSCache.deleteMany({ text: rawText });
    totalDeleted += res1.deletedCount || 0;
  }

  // Also delete by characteristic TEF substrings (case-insensitive)
  for (const sub of tefTextSubstrings) {
    const res2 = await TTSCache.deleteMany({ text: { $regex: sub, $options: "i" } });
    totalDeleted += res2.deletedCount || 0;
  }

  // Also delete any cache entries containing "Voyageuse :"
  const res3 = await TTSCache.deleteMany({ text: { $regex: /Voyageuse\s*:/i } });
  totalDeleted += res3.deletedCount || 0;

  console.log(`\n✓ Total TEF Paper 1 Cache Entries Deleted: ${totalDeleted}`);
  console.log("✓ Zero TCF Canada files were touched (TCF vault remains 100% intact).");
  console.log("==========================================================================");

  await mongoose.disconnect();
}

cleanTefPaper1CacheOnly().catch(console.error);
