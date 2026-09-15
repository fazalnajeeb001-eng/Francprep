import 'dotenv/config';
import { buildWhisperBiasingPrompt } from '../routes/speaking.routes';
import { writingService } from '../services/writing.service';

async function runPhase6Verification() {
  console.log('================================================================');
  console.log('🎙️ PHASE 6 VERIFICATION: WHISPER STT BIASING & PHONETIC TOLERANCE');
  console.log('================================================================\n');

  let passedChecks = 0;
  let totalChecks = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalChecks++;
    if (condition) {
      passedChecks++;
      console.log(`✅ [PASS] ${testName}`);
    } else {
      console.error(`❌ [FAIL] ${testName}${detail ? ` — ${detail}` : ''}`);
    }
  }

  // TEST 1: Whisper Prompt Biasing Generation & Token Budget
  console.log('--- TEST GROUP 1: Whisper Prompt Biasing Dictionaries ---');
  const promptT1 = buildWhisperBiasingPrompt(1);
  const promptT2 = buildWhisperBiasingPrompt(2);
  const promptT3 = buildWhisperBiasingPrompt(3);
  const promptDefault = buildWhisperBiasingPrompt();

  assert(promptT1.includes('Montréal') && promptT1.includes('Sherbrooke') && promptT1.includes('Québec'), 'T1 includes Canadian geography');
  assert(promptT1.includes("Côte d'Ivoire") && promptT1.includes('Kollam') && promptT1.includes('Casablanca'), 'T1 includes Francophone demographics');
  assert(promptT1.includes('ingénieur') && promptT1.includes('superviseur') && promptT1.includes('informaticien'), 'T1 includes professional titles');
  assert(promptT1.includes('Présentation personnelle'), 'T1 includes presentation vocabulary');
  assert(promptT1.includes('514-123-4567') && promptT1.includes('32 ans'), 'T1 includes phone and age numeric anchors');
  assert(promptT2.includes('logement') && promptT2.includes('loyer') && promptT2.includes('caution'), 'T2 includes roleplay/interaction lexicon');
  assert(promptT2.includes('850 $') && promptT2.includes('14 h 30'), 'T2 includes currency ($) and time (14 h 30) anchors');
  assert(promptT3.includes('argumentation') && promptT3.includes('débat d\'idées') && promptT3.includes('néanmoins'), 'T3 includes argumentative lexicon');
  assert(promptT3.includes('75 %') && promptT3.includes('3,5 millions'), 'T3 includes percentage (%) and decimal statistic anchors');

  // Verify prompt lengths are strictly within Whisper's context bounds (< 224 tokens ~ 800 chars)
  assert(promptT1.length <= 800 && promptT1.length >= 200, `T1 Prompt length is optimal (${promptT1.length} chars)`);
  assert(promptT2.length <= 800 && promptT2.length >= 200, `T2 Prompt length is optimal (${promptT2.length} chars)`);
  assert(promptT3.length <= 800 && promptT3.length >= 200, `T3 Prompt length is optimal (${promptT3.length} chars)`);
  assert(promptDefault.length <= 800 && promptDefault.length >= 200, `Default Prompt length is optimal (${promptDefault.length} chars)`);

  // TEST 2: Evaluator Phonetic Tolerance on Spoken Transcripts
  console.log('\n--- TEST GROUP 2: Evaluator Phonetic Tolerance & Homophone Forgiveness ---');

  // Sample A: T1 B1/B2 candidate with regional proper nouns and Whisper past-tense homophone ("j'ai travailler", "ville coutière", "Kollam", "Sherbrooke")
  const sampleA = {
    transcript: "Bonjour. Je viens de Kollam, une ville coutière en Inde, et j'habite maintenant à Sherbrooke au Québec. Actuellement, j'ai travailler pendant quatre ans comme ingénieur en informatique. J'ai choisi de m'installer au Canada car la qualité de vie est excellente et je souhaite obtenir la résidence permanente avec ma famille. À l'avenir, j'aimerais créer ma propre entreprise.",
    scenario: "Présentation personnelle et projets d'immigration au Canada.",
    taskNumber: 1
  };

  console.log(`Evaluating Sample A (T1 - B1/B2 candidate with proper nouns and homophones)...`);
  const resultA = await writingService.analyzeSpeaking(
    sampleA.transcript,
    sampleA.scenario,
    'Tâche 1',
    'French',
    sampleA.taskNumber
  );

  console.log(`  Output Score: ${resultA.scoreOutOf20}/20 Marks (${resultA.nclcGrade})`);
  console.log(`  Subscores: Task=${resultA.taskFulfillmentScore}/5, Flow=${resultA.coherenceScore}/5, Lex=${resultA.lexicalScore}/5, Gram=${resultA.grammarScore}/5`);
  console.log(`  Reported Errors (${resultA.corrections.length}):`, resultA.corrections.map((e: any) => `${e.quote} -> ${e.correction}`));

  // In T1, max score ceiling is 11/20 (B1 max). This strong presentation should achieve 9-11/20.
  assert(resultA.scoreOutOf20 >= 9 && resultA.scoreOutOf20 <= 11, `Sample A scored within official T1 ceiling (Awarded ${resultA.scoreOutOf20}/20)`);
  assert(resultA.grammarScore >= 3, `Sample A grammar score is protected (Awarded ${resultA.grammarScore}/5)`);

  // Check that "j'ai travailler" or "coutière" were NOT reported as spoken errors!
  const hasHomophoneError = resultA.corrections.some((err: any) => {
    const q = (err.quote || '').toLowerCase();
    return q.includes('travailler') || q.includes('coutière') || q.includes('kollam') || q.includes('sherbrooke');
  });
  assert(!hasHomophoneError, 'Zero false-positive homophone errors reported for Sample A');

  // Sample B: T2 B2 candidate roleplay with questions and homophones ("c'est vacances", "qu'elle est le prix", "vous seriez disponible")
  const sampleB = {
    transcript: "Bonjour monsieur. Je vous appelle pour l'appartement à louer à Montréal. Pourriez-vous me dire qu'elle est la superficie exacte du logement? Est-ce que le loyer comprend les charges comme l'électricité et le chauffage? Combien coûte la caution? Y a-t-il un stationnement disponible pour une voiture? Est-ce que les animaux sont permis dans l'immeuble? Quels sont les commerces à proximité? Le quartier est-il bien desservi par les transports en commun comme le métro? Enfin, à quelle date l'appartement sera-t-il disponible pour une visite? Je vous remercie pour toutes ces informations.",
    scenario: "Vous téléphonez au propriétaire d'un appartement pour obtenir des informations pratiques.",
    taskNumber: 2
  };

  console.log(`\nEvaluating Sample B (T2 - B2 roleplay with 8 formal questions)...`);
  const resultB = await writingService.analyzeSpeaking(
    sampleB.transcript,
    sampleB.scenario,
    'Tâche 2',
    'French',
    sampleB.taskNumber
  );

  console.log(`  Output Score: ${resultB.scoreOutOf20}/20 Marks (${resultB.nclcGrade})`);
  console.log(`  Subscores: Task=${resultB.taskFulfillmentScore}/5, Flow=${resultB.coherenceScore}/5, Lex=${resultB.lexicalScore}/5, Gram=${resultB.grammarScore}/5`);
  console.log(`  Reported Errors (${resultB.corrections.length}):`, resultB.corrections.map((e: any) => `${e.quote} -> ${e.correction}`));

  // 8 formal questions in T2: B2 Target (12 to 15/20 Marks)
  assert(resultB.scoreOutOf20 >= 12 && resultB.scoreOutOf20 <= 15, `Sample B scored within B2 benchmark (Awarded ${resultB.scoreOutOf20}/20)`);
  assert(resultB.taskFulfillmentScore >= 4, `Sample B task fulfillment recognized (Awarded ${resultB.taskFulfillmentScore}/5)`);

  console.log('\n================================================================');
  console.log(`🏁 PHASE 6 VERIFICATION SUMMARY: ${passedChecks}/${totalChecks} CHECKS PASSED (${Math.round((passedChecks / totalChecks) * 100)}%)`);
  console.log('================================================================\n');

  if (passedChecks === totalChecks) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runPhase6Verification().catch((err) => {
  console.error('Fatal error during Phase 6 verification:', err);
  process.exit(1);
});
