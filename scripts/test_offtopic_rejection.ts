import { WritingService } from "../backend/src/services/writing.service";

async function testOffTopicRejection() {
  console.log("==========================================================================");
  console.log("🔬 TESTING OFF-TOPIC / HORS-SUJET REJECTION (RANDOM C2 TEXT IN TÂCHE 1)");
  console.log("==========================================================================");

  const service = new WritingService();

  // Test 1: Random C2 Philosophy Essay pasted into Tâche 1 (Heating Breakdown Prompt)
  console.log("\n1. 🔍 Testing Random C2 Philosophy Essay submitted to Heating Prompt:");
  const randomC2Philosophy = "Par la présente réflexion, il convient d'analyser la dialectique platonicienne et la transcendance de l'âme humaine face à l'immensité de l'univers. Les préceptes métaphysiques démontrent incontestablement que la quête de la vérité absolue transcende les contingences matérielles. En définitive, l'émancipation intellectuelle s'avère le vecteur cardinal de l'humanité.";
  
  const resOffTopic = await service.getFeedback(
    randomC2Philosophy,
    "Tâche 1 : Signalement d'une panne de chauffage",
    "Vous écrivez à votre propriétaire pour signaler une panne de chauffage dans votre appartement et demander l'intervention d'un technicien.",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120,
    "Vous écrivez à votre propriétaire pour signaler une panne de chauffage dans votre appartement et demander l'intervention d'un technicien."
  );

  console.log(`   • Input: "${randomC2Philosophy.slice(0, 80)}..."`);
  console.log(`   • Result Score: ${resOffTopic.scoreOutOf20}/20 | Grade: ${resOffTopic.nclcGrade}`);
  console.log(`   • Task Fulfillment: ${resOffTopic.taskFulfillmentScore}/5`);
  console.log(`   • Feedback: ${resOffTopic.feedback}`);

  if (resOffTopic.scoreOutOf20 !== 0 || resOffTopic.taskFulfillmentScore !== 0) {
    throw new Error(`CRITICAL FAILURE: Off-topic C2 text was NOT awarded 0/20! Scored ${resOffTopic.scoreOutOf20}/20`);
  }
  console.log("   ✅ Off-topic random C2 text accurately awarded 0/20 (Zero Grade — Hors-Sujet)!");

  // Test 2: Authentic On-Topic Heating Breakdown Email (B2)
  console.log("\n2. 🔍 Testing Authentic On-Topic Heating Breakdown Email (B2):");
  const onTopicB2 = "Monsieur, Je vous écris afin de vous informer d'un problème avec le chauffage de mon appartement. En effet, il ne fonctionne plus depuis hier soir et la température est très basse. Pourriez-vous envoyer un technicien rapidement pour réparer le système ? Dans l'attente de votre réponse, je vous prie d'agréer mes salutations distinguées.";
  
  const resOnTopic = await service.getFeedback(
    onTopicB2,
    "Tâche 1 : Signalement d'une panne de chauffage",
    "Vous écrivez à votre propriétaire pour signaler une panne de chauffage dans votre appartement et demander l'intervention d'un technicien.",
    [],
    "French",
    "TCF Canada",
    1,
    60,
    120,
    "Vous écrivez à votre propriétaire pour signaler une panne de chauffage dans votre appartement et demander l'intervention d'un technicien."
  );

  console.log(`   • Result Score: ${resOnTopic.scoreOutOf20}/20 | Grade: ${resOnTopic.nclcGrade}`);
  if (resOnTopic.scoreOutOf20 < 12) {
    throw new Error(`On-topic text scored too low: ${resOnTopic.scoreOutOf20}/20`);
  }
  console.log("   ✅ Authentic on-topic text successfully evaluated at B2/NCLC 7+!");

  console.log("\n==========================================================================");
  console.log("🎉 HORS-SUJET / OFF-TOPIC AUDIT VERIFIED 100% ACCURATE!");
  console.log("==========================================================================");
}

testOffTopicRejection();
