import { WritingService } from "../backend/src/services/writing.service";

async function verifyWritingPhase4() {
  console.log("==========================================================================");
  console.log("🔬 AUDITING PHASE 4: CALIBRATED FEI AI WRITING EVALUATION ENGINE");
  console.log("==========================================================================");

  const service = new WritingService();

  // Test 1: Accent Error Scanner Test
  console.log("\n1. 🔍 Testing French Accent & Diacritic Detection Engine:");
  const sampleWithMissingAccents = "J'ai passe un tres bel ete a Montreal ou j'ai decouvert des francais tres accueillants. C'etait un evenement formidable.";
  const accentCorrections = service.detectFrenchAccentAndGrammarIssues(sampleWithMissingAccents);

  console.log(`   • Input with missing accents: "${sampleWithMissingAccents}"`);
  console.log(`   • Detected ${accentCorrections.length} accent errors:`);
  accentCorrections.forEach((c, idx) => {
    console.log(`     ${idx + 1}. [${c.original}] -> [${c.corrected}] | Explanation: "${c.explanation}"`);
  });

  if (accentCorrections.length < 4) {
    throw new Error(`Accent detection missed errors: found ${accentCorrections.length}`);
  }
  console.log("   ✅ Accent Detection Engine passed with flying colors!");

  // Test 2: Tâche 3 Email Format Trap (0/20 mark)
  console.log("\n2. 🔍 Testing Tâche 3 Format Trap (Email in Argumentative Essay):");
  const emailInTache3 = "Bonjour Monsieur le Directeur, Je vous écris pour vous donner mon avis sur les transports en commun. Bien cordialement, Jean.";
  const evalFormatTrap = await service.getFeedback(
    emailInTache3,
    "Tâche 3 : Essai argumentatif",
    "Argumentative Essay (120-180 words)",
    [],
    "French",
    "TCF Canada",
    3,
    120,
    180
  );
  console.log(`   • Score: ${evalFormatTrap.scoreOutOf20}/20 | Grade: ${evalFormatTrap.nclcGrade}`);
  console.log(`   • Task Fulfillment: ${evalFormatTrap.taskFulfillmentScore}/5`);
  if (evalFormatTrap.taskFulfillmentScore !== 0 || evalFormatTrap.scoreOutOf20 > 4) {
    throw new Error(`Format trap failed: scored ${evalFormatTrap.scoreOutOf20}/20`);
  }
  console.log("   ✅ Format Trap Detection accurately awarded 0 marks!");

  // Test 3: Tâche 1 Informal Register Trap (tu instead of vous)
  console.log("\n3. 🔍 Testing Tâche 1 Informal Register Trap (tu with Landlord):");
  const informalTache1 = "Salut le propriétaire, je t'écris pour te dire que ton chauffage ne marche pas dans ton appartement. Peux-tu venir vite ?";
  const evalInformal = await service.getFeedback(
    informalTache1,
    "Tâche 1 : Signalement au propriétaire",
    "Formal message (60-120 words)",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120
  );
  console.log(`   • Task Fulfillment: ${evalInformal.taskFulfillmentScore}/5 (Capped for informal 'tu')`);
  if (evalInformal.taskFulfillmentScore > 3) {
    throw new Error(`Informal register not capped: got ${evalInformal.taskFulfillmentScore}/5`);
  }
  console.log("   ✅ Register mismatch cap passed!");

  // Test 4: Exemplar B2 / NCLC 7 Task 1 Evaluation
  console.log("\n4. 🔍 Testing Authentic Exemplar Response (Tâche 1 - Heating Breakdown):");
  const exemplarTache1 = "Monsieur le Propriétaire, Je vous écris en urgence afin de vous signaler une défaillance de notre système de chauffage survenue hier soir. La température étant glaciale, je vous saurais gré d'intervenir en urgence pour mandater un technicien qualifié. Vous pouvez me joindre par téléphone à tout moment. En vous remerciant par avance pour votre réactivité, je vous prie d'agréer mes salutations distinguées.";
  const evalExemplar = await service.getFeedback(
    exemplarTache1,
    "Tâche 1 : Panne de chauffage",
    "Formal email (60-120 words)",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120
  );
  console.log(`   • Score: ${evalExemplar.scoreOutOf20}/20 | NCLC Grade: ${evalExemplar.nclcGrade} | CRS: +${evalExemplar.expressEntryPoints}`);
  console.log(`   • Task Fulfillment: ${evalExemplar.taskFulfillmentScore}/5 | Coherence: ${evalExemplar.coherenceScore}/5 | Lexique: ${evalExemplar.lexicalScore}/5 | Morphosyntaxe: ${evalExemplar.grammarScore}/5`);
  if (evalExemplar.scoreOutOf20 < 12) {
    throw new Error(`Exemplar scored too low: ${evalExemplar.scoreOutOf20}/20`);
  }
  console.log("   ✅ Authentic Exemplar scored solid NCLC 7+ (B2/C1)!");

  // Test 5: Gibberish Pre-Screening
  console.log("\n5. 🔍 Testing Non-French Gibberish Pre-Screening:");
  const gibberish = "asdfghjkl qwertyuiop zxcvbnm 123456789";
  const evalGibberish = await service.getFeedback(gibberish, "Tâche 1", "", [], "French", "TCF Canada", 1, 60, 120);
  console.log(`   • Score: ${evalGibberish.scoreOutOf20}/20 | Grade: ${evalGibberish.nclcGrade}`);
  if (evalGibberish.scoreOutOf20 !== 0) {
    throw new Error(`Gibberish not rejected: scored ${evalGibberish.scoreOutOf20}/20`);
  }
  console.log("   ✅ Gibberish pre-screening passed with 0/20 grade!");

  console.log("\n==========================================================================");
  console.log("🎉 PHASE 4 AUDIT COMPLETE: CALIBRATED FEI EVALUATION ENGINE VERIFIED 100%!");
  console.log("==========================================================================");
}

verifyWritingPhase4();
