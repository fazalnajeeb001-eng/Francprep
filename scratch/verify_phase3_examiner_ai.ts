import { writingService } from "../backend/src/services/writing.service";

async function testPhase3ExaminerAI() {
  console.log("=== 🔬 PHASE 3: INTERACTIVE EXAMINER AI LOGIC VERIFICATION ===");

  let errors = 0;

  // Test Tâche 1
  try {
    const res1 = await writingService.chatWithTutor(
      [{ role: 'user', content: "Bonjour, je m'appelle Paul, je suis ingénieur et je souhaite m'installer à Montréal." }],
      "B2",
      "Tâche 1: Entretien dirigé - Présentation personnelle",
      "French"
    );
    console.log(`\n✅ Tâche 1 Response (${res1.model}):`);
    console.log(`   "${res1.reply}"`);
    if (!res1.reply || res1.reply.length < 5) errors++;
  } catch (e) {
    console.error("❌ Tâche 1 Error:", e);
    errors++;
  }

  // Test Tâche 2
  try {
    const res2 = await writingService.chatWithTutor(
      [{ role: 'user', content: "Bonjour, je voudrais savoir quels sont vos tarifs pour les cours de français ?" }],
      "B2",
      "Tâche 2: Exercice en interaction - Institut Linguistique de Montréal",
      "French"
    );
    console.log(`\n✅ Tâche 2 Response (${res2.model}):`);
    console.log(`   "${res2.reply}"`);
    if (!res2.reply || res2.reply.length < 5) errors++;
  } catch (e) {
    console.error("❌ Tâche 2 Error:", e);
    errors++;
  }

  // Test Tâche 3
  try {
    const res3 = await writingService.chatWithTutor(
      [{ role: 'user', content: "Je pense que le télétravail est indispensable pour réduire la pollution et améliorer le bien-être." }],
      "B2",
      "Tâche 3: Expression d'un point de vue - Le télétravail dans la société moderne",
      "French"
    );
    console.log(`\n✅ Tâche 3 Response (${res3.model}):`);
    console.log(`   "${res3.reply}"`);
    if (!res3.reply || res3.reply.length < 5) errors++;
  } catch (e) {
    console.error("❌ Tâche 3 Error:", e);
    errors++;
  }

  console.log(`\n📊 Total Phase 3 Tests Run: 3`);
  console.log(`📊 Errors Detected: ${errors}`);

  if (errors === 0) {
    console.log("\n🎉 PHASE 3 EXAMINER AI LOGIC VERIFICATION PASSED 100%!");
  } else {
    console.error("\n❌ PHASE 3 VERIFICATION FAILED!");
    process.exit(1);
  }
}

testPhase3ExaminerAI();
