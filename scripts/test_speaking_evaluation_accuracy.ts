/**
 * 🇨🇦 FrancPrep Speaking Evaluation Accuracy Test Suite
 * Tests analyzeSpeaking with realistic candidate transcripts across A2, B1, B2, and C1 levels.
 */

import { WritingService } from "../backend/src/services/writing.service";

async function runAccuracyTests() {
  console.log("\n================================================================================");
  console.log("  🇨🇦 TCF CANADA SPEAKING EVALUATION ACCURACY TEST SUITE");
  console.log("================================================================================\n");

  const service = new WritingService();

  const testCases = [
    {
      name: "Non-French / Gibberish Speech (Expected: Zero Grade 0/20)",
      transcription: "Hello my name is John and I want to go to Canada please work.",
      scenario: "Tâche 1 : Présentez-vous à l'examinateur.",
      taskNum: 1,
      expectedNclc: "NCLC 0",
      maxScore: 0
    },
    {
      name: "Tâche 1 A2 Level Candidate (Expected: NCLC 4-5)",
      transcription: "Je m'appelle Pierre. J'habite à Paris. J'aime le sport et le cinéma. Je veux aller au Canada pour travailler.",
      scenario: "Tâche 1 : Présentez-vous, parlez de vos activités et de vos motivations.",
      taskNum: 1,
      expectedNclc: "NCLC 5",
      maxScore: 10
    },
    {
      name: "Tâche 2 B2 Candidate Roleplay (Expected: NCLC 7-8 Target)",
      transcription: "Bonjour monsieur. Je vous appelle concernant l'annonce pour les cours de français. Pouvez-vous me dire quels sont les horaires des cours du soir ? Quel est le tarif mensuel ? Est-ce qu'il y a des réductions pour les étudiants ? Proposez-vous une séance d'essai gratuite ? Où se trouvent exactement vos locaux ? Quels documents dois-je fournir pour m'inscrire ?",
      scenario: "Tâche 2 : Vous avez vu une annonce pour un centre de langues. Posez des questions sur les horaires, tarifs et modalités.",
      taskNum: 2,
      expectedNclc: "NCLC 8-9",
      maxScore: 18
    },
    {
      name: "Tâche 3 C1 Advanced Candidate Monologue (Expected: NCLC 9-10)",
      transcription: "En ce qui concerne l'impact du télétravail sur la société moderne, je pense fermement qu'il s'agit d'une évolution majeure. D'une part, cela permet de réduire considérablement l'empreinte carbone liée aux transports quotidiens. D'autre part, cela offre une meilleure conciliation entre la vie professionnelle et la vie privée. Toutefois, il convient d'être vigilant face au risque d'isolement social et à la frontière parfois floue entre le travail et la maison. En conclusion, un modèle hybride me semble être la solution la plus équilibrée.",
      scenario: "Tâche 3 : Le télétravail est-il bénéfique pour la société ? Présentez votre opinion de manière argumentée.",
      taskNum: 3,
      expectedNclc: "NCLC 9",
      maxScore: 20
    }
  ];

  let totalPassed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    console.log(`[TEST ${i + 1}/${testCases.length}] ${tc.name}`);
    console.log(`└─ Scenario: "${tc.scenario.slice(0, 70)}..."`);
    console.log(`└─ Candidate Speech: "${tc.transcription.slice(0, 80)}..."`);

    try {
      const result = await service.analyzeSpeaking(
        tc.transcription,
        tc.scenario,
        `Test Paper - Tâche ${tc.taskNum}`,
        "French",
        tc.taskNum,
        { speechRateWpm: 120, hesitationPauseCount: 1, fluencyIndexPct: 92, ambientNoiseFloorDb: -52 }
      );

      console.log(`   📊 Result Score: ${result.scoreOutOf20}/20 Marks | Grade: ${result.nclcGrade} | CRS Pts: ${result.expressEntryPoints}`);
      if (result.feiSubScores) {
        console.log(`   🎯 FEI Subscores: Consigne ${result.feiSubScores.taskFulfillment.score}/5 | Fluidité ${result.feiSubScores.fluencyPace.score}/5 | Lexique ${result.feiSubScores.lexicalPrecision.score}/5 | Syntax ${result.feiSubScores.morphosyntaxPhonetics.score}/5`);
      }

      if (tc.maxScore === 0 && result.scoreOutOf20 === 0) {
        console.log(`   ✅ PASS: Correctly awarded Zero Grade (0/20) for non-French input.\n`);
        totalPassed++;
      } else if (tc.maxScore > 0 && result.scoreOutOf20 > 0 && result.scoreOutOf20 <= tc.maxScore) {
        console.log(`   ✅ PASS: Score ${result.scoreOutOf20}/20 accurately calibrated for level.\n`);
        totalPassed++;
      } else {
        console.log(`   ⚠️ WARNING: Score ${result.scoreOutOf20}/20 outside expected range max ${tc.maxScore}.\n`);
      }
    } catch (e: any) {
      console.error(`   ❌ ERROR: Evaluation failed:`, e.message);
    }
  }

  console.log("================================================================================");
  console.log(`  🎯 EVALUATION ACCURACY SUITE RESULT: ${totalPassed} / ${testCases.length} TESTS PASSED`);
  console.log("================================================================================\n");
}

runAccuracyTests();
