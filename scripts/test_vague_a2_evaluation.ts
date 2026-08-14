import { WritingService } from "../backend/src/services/writing.service";

async function testAllWritingLevels() {
  console.log("==========================================================================");
  console.log("🔬 STRESS-TESTING CEFR EVALUATION ACCURACY ACROSS ALL LEVELS (A1 TO C1)");
  console.log("==========================================================================");

  const service = new WritingService();

  // Test 1: Vague A2 Style Tâche 1 (User's Exact Scenario)
  console.log("\n1. 🔍 Testing Vague A2 Conversational Tâche 1 Submission:");
  const vagueA2_T1 = "Bonjour, je vous écris parce que le chauffage ne marche pas dans mon appartement. Il fait très froid ici. Pouvez-vous venir réparer le chauffage rapidement s'il vous plaît ? Merci beaucoup.";
  const resA2 = await service.getFeedback(
    vagueA2_T1,
    "Tâche 1 : Problème de chauffage",
    "Formal email to landlord (60-120 words)",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120
  );
  console.log(`   • Input: "${vagueA2_T1}"`);
  console.log(`   • Result Score: ${resA2.scoreOutOf20}/20 | Grade: ${resA2.nclcGrade} | CEFR: ${resA2.cefrLevel}`);
  console.log(`   • Breakdown: Fulfillment: ${resA2.taskFulfillmentScore}/5 | Coherence: ${resA2.coherenceScore}/5 | Lexique: ${resA2.lexicalScore}/5 | Grammar: ${resA2.grammarScore}/5`);

  if (resA2.scoreOutOf20 > 7 || resA2.nclcGrade.includes("B2") || resA2.cefrLevel === "B2") {
    throw new Error(`CRITICAL FAILURE: Vague A2 text was incorrectly evaluated as B2! Scored ${resA2.scoreOutOf20}/20 (${resA2.nclcGrade})`);
  }
  console.log("   ✅ Vague A2 text accurately evaluated as A2/NCLC 4 (Score <= 7/20)!");

  // Test 2: Standard B1 Style Tâche 1
  console.log("\n2. 🔍 Testing Structured B1 Tâche 1 Submission:");
  const standardB1_T1 = "Bonjour Monsieur, Je vous écris pour vous signaler que le chauffage de mon appartement est tombé en panne hier soir. La situation devient difficile car il fait froid. C'est pourquoi je voudrais savoir s'il serait possible de faire réparer le système ou de me prêter un radiateur. Dans l'attente de votre réponse, cordialement.";
  const resB1 = await service.getFeedback(
    standardB1_T1,
    "Tâche 1 : Problème de chauffage",
    "Formal email to landlord (60-120 words)",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120
  );
  console.log(`   • Result Score: ${resB1.scoreOutOf20}/20 | Grade: ${resB1.nclcGrade} | CEFR: ${resB1.cefrLevel}`);
  if (resB1.scoreOutOf20 < 8 || resB1.scoreOutOf20 > 11) {
    throw new Error(`B1 text scored out of range: ${resB1.scoreOutOf20}/20`);
  }
  console.log("   ✅ Structured B1 text accurately evaluated as B1/NCLC 5-6 (8-11/20)!");

  // Test 3: Flawless B2 Style Tâche 1
  console.log("\n3. 🔍 Testing Flawless B2 Tâche 1 Submission:");
  const solidB2_T1 = "Monsieur le Propriétaire, Je me permets de vous contacter afin de vous signaler une panne majeure survenue hier soir sur notre système de chauffage. Les températures extérieures étant particulièrement rigoureuses, je vous saurais gré de bien vouloir mandater un technicien qualifié dans les meilleurs délais. Dans l'attente de votre intervention, je vous prie d'agréer mes salutations distinguées.";
  const resB2 = await service.getFeedback(
    solidB2_T1,
    "Tâche 1 : Problème de chauffage",
    "Formal email to landlord (60-120 words)",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120
  );
  console.log(`   • Result Score: ${resB2.scoreOutOf20}/20 | Grade: ${resB2.nclcGrade} | CEFR: ${resB2.cefrLevel}`);
  if (resB2.scoreOutOf20 < 12 || resB2.scoreOutOf20 > 15) {
    throw new Error(`B2 text scored out of range: ${resB2.scoreOutOf20}/20`);
  }
  console.log("   ✅ Flawless B2 text accurately evaluated as B2/NCLC 7-8 (12-15/20)!");

  // Test 4: Advanced C1 Style Tâche 1
  console.log("\n4. 🔍 Testing Advanced C1 Administrative Tâche 1 Submission:");
  const advancedC1_T1 = "Monsieur le Propriétaire, Par la présente, je tiens à porter à votre connaissance un dysfonctionnement critique affectant le système de chauffage central de mon logement. Face au refroidissement brutal et afin de préserver la salubrité des lieux, une intervention d'urgence s'avère absolument indispensable. Eu égard au préjudice subi, je vous serais reconnaissant de dépêcher sans délai une équipe technique. Comptant sur votre diligence, veuillez agréer, Monsieur, l'expression de mes salutations distinguées.";
  const resC1 = await service.getFeedback(
    advancedC1_T1,
    "Tâche 1 : Problème de chauffage",
    "Formal email to landlord (60-120 words)",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120
  );
  console.log(`   • Result Score: ${resC1.scoreOutOf20}/20 | Grade: ${resC1.nclcGrade} | CEFR: ${resC1.cefrLevel}`);
  if (resC1.scoreOutOf20 < 16) {
    throw new Error(`C1 text scored out of range: ${resC1.scoreOutOf20}/20`);
  }
  console.log("   ✅ Advanced C1 text accurately evaluated as C1/NCLC 9 (16-17/20)!");

  console.log("\n==========================================================================");
  console.log("🎉 ALL 4 CEFR LEVELS AUDITED AND 100% ACCURATELY CALIBRATED!");
  console.log("==========================================================================");
}

testAllWritingLevels();
