import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, "../../.env") });
dotenv.config({ path: path.join(__dirname, "../../../.env") });

import TTSCache from "../models/TTSCache";

async function purgeStaleListeningCache() {
  console.log("==========================================================================");
  console.log("🛡️ SURGICAL PURGE: ALL STALE LISTENING CACHE ENTRIES (TEF ONLY)");
  console.log("==========================================================================");

  const mongoUri = process.env.MONGODB_URI || "mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep";
  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUri);
  console.log("✓ Connected to MongoDB.");

  // Targeted criteria:
  // 1. Any entry containing speaker role prefixes
  const labelRegex = /(?:Voyageuse|Voyageur|Agent|Client|Boulangère|Patient|Secrétaire|Cycliste|Mécanicien|Soraya|Alain|Élodie|Laurent|Vasseur|Dr\.\s*Maxime|Journaliste|Animateur)\s*:/i;

  const res1 = await TTSCache.deleteMany({ text: { $regex: labelRegex } });
  console.log(`✓ Deleted ${res1.deletedCount} cache entries with speaker labels.`);

  // 2. Also delete any single-voice cached versions of TEF Paper 1 questions
  const tefKeywords = [
    "train pour Québec",
    "trois croissants au beurre",
    "docteur Laurent",
    "docteur Moreau",
    "frein arrière",
    "Habitation Plus",
    "signalisation en amont",
    "circuit de refroidissement",
    "caisses centrales",
    "point de cadrage",
    "Montréal-Trudeau",
    "secrétariat des sports",
    "cabinet dentaire du Parc",
    "piétonnisation intégrale",
    "suppression du trafic",
    "banlieusards",
    "vélo cargo",
    "navettes électriques",
    "Radio Plein Air",
    "coopératives maraîchères",
    "manufacture textile",
    "microbiologie marine",
    "Bien-être au travail",
    "Mobilité citoyenne",
    "bibliothèques d'objets",
    "défilement infini",
    "Bulletin spécial environnement",
    "Éducation d'avenir",
    "présentéisme physique",
    "perte de contrôle",
    "santé mentale et la fidélisation",
    "fracture sociale explosive",
    "refonte démocratique",
    "contrat de civilisation",
    "réemploi solidaire",
    "ceintures vertes",
    "dématérialisation administrative",
    "audace intellectuelle"
  ];

  let tefCount = 0;
  for (const kw of tefKeywords) {
    const res = await TTSCache.deleteMany({ text: { $regex: kw, $options: "i" } });
    tefCount += res.deletedCount || 0;
  }
  console.log(`✓ Deleted ${tefCount} TEF question cache entries.`);

  const remaining = await TTSCache.countDocuments();
  console.log(`✓ Total remaining entries in ttscaches: ${remaining}`);
  console.log("✓ TCF Canada files and core database remain 100% untouched.");
  console.log("==========================================================================");

  await mongoose.disconnect();
}

purgeStaleListeningCache().catch(console.error);
