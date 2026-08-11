import { generateListeningQuestions } from "../src/lib/examSchema.ts";
import { AVAILABLE_HD_IMAGES } from "../src/lib/hdIllustrationAssets.ts";

async function runFreshExhaustiveAudit() {
  console.log("=== 🔬 FRESH EXHAUSTIVE 360° AUDIT (ALL 390 LISTENING QUESTIONS) ===");
  console.log("Auditing 10 Exam Papers against the 6-Phase Master Framework...\n");

  const totalPapers = 10;
  let totalQuestionsCount = 0;

  // Phase 1 Metrics
  let uniqueOptionSetsCount = 0;
  let uniqueTranscriptsCount = 0;

  // Phase 2 CBT Display Metrics
  let q1_q4_spokenOptionsCount = 0;
  let q5_q8_spokenOptionsCount = 0;
  let q9_q29_printedOptionsDisplayCount = 0;
  let q30_q39_printedPromptsDisplayCount = 0;

  // Phase 4 Gemini Image Metrics
  let liveHdImagesCount = 0;
  let pendingHdImagesCount = 0;

  // Phase 5 Transcript & Translation Metrics
  let specificFrenchPromptsCount = 0;
  let pureEnglishTranslationsCount = 0;

  // Phase 6 Voice Variety Metrics
  let multiVoiceSupportCount = 0;

  const optionTracker = new Set<string>();
  const transcriptTracker = new Set<string>();

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);

    questions.forEach((q) => {
      totalQuestionsCount++;
      const i = q.questionNumber;
      const optStr = q.options.join("|");
      const tr = q.transcript || "";
      const en = q.transcriptEnglish || "";
      const prompt = (q as any).questionPrompt || q.text || "";

      // Phase 1: Uniqueness
      if (!optionTracker.has(optStr)) {
        optionTracker.add(optStr);
        uniqueOptionSetsCount++;
      }
      if (!transcriptTracker.has(tr)) {
        transcriptTracker.add(tr);
        uniqueTranscriptsCount++;
      }

      // Phase 2: CBT Display Rules
      if (i <= 4 && q.hasSpokenOptions) {
        q1_q4_spokenOptionsCount++;
      }
      if (i >= 5 && i <= 8 && q.hasSpokenOptions) {
        q5_q8_spokenOptionsCount++;
      }
      if (i >= 9 && i <= 29 && !q.hasSpokenOptions) {
        q9_q29_printedOptionsDisplayCount++;
      }
      if (i >= 30 && i <= 39 && !q.questionInAudio) {
        q30_q39_printedPromptsDisplayCount++;
      }

      // Phase 4: Image Asset Status
      if (i <= 4) {
        const key = `tcf_p${paperIdx}_q${i}`;
        if (AVAILABLE_HD_IMAGES.has(key)) {
          liveHdImagesCount++;
        } else {
          pendingHdImagesCount++;
        }
      }

      // Phase 5: Specific French Prompts & Pure English Translations
      if (prompt.trim().length > 10 && !prompt.includes("Quel est l'élément ou le message principal à retenir de ce document sonore ?")) {
        specificFrenchPromptsCount++;
      }
      if (en.trim().length > 15 && !en.includes("Écoutez") && !en.includes("propositions") && !en.includes("document sonore")) {
        pureEnglishTranslationsCount++;
      }

      // Phase 6: Voice Tags
      if (tr.includes("Annonceur:") || tr.includes("Annonceuse:") || tr.includes("Locuteur:") || tr.includes("Locutrice:")) {
        multiVoiceSupportCount++;
      }
    });

    console.log(`✅ Paper ${paperIdx} (tcf${paperIdx}): 39/39 questions audited.`);
  }

  console.log("\n=========================================================================");
  console.log("📊 FRESH EXHAUSTIVE AUDIT SUMMARY (390 LISTENING QUESTIONS ACROSS 10 PAPERS)");
  console.log("=========================================================================");
  console.log(`1. PHASE 1: Unique Option Sets:           ${uniqueOptionSetsCount} / 390 (${(uniqueOptionSetsCount/390*100).toFixed(1)}%)`);
  console.log(`   PHASE 1: Unique Audio Transcripts:     ${uniqueTranscriptsCount} / 390 (${(uniqueTranscriptsCount/390*100).toFixed(1)}%)`);
  console.log(`2. PHASE 2: Q1-Q4 Visual Spoken Options:  ${q1_q4_spokenOptionsCount} / 40 (${(q1_q4_spokenOptionsCount/40*100).toFixed(1)}%)`);
  console.log(`   PHASE 2: Q5-Q8 Audio Spoken Options:   ${q5_q8_spokenOptionsCount} / 40 (${(q5_q8_spokenOptionsCount/40*100).toFixed(1)}%)`);
  console.log(`   PHASE 2: Q9-Q29 Printed Option Display:${q9_q29_printedOptionsDisplayCount} / 210 (${(q9_q29_printedOptionsDisplayCount/210*100).toFixed(1)}%)`);
  console.log(`   PHASE 2: Q30-Q39 Printed Prompts:      ${q30_q39_printedPromptsDisplayCount} / 60 (${(q30_q39_printedPromptsDisplayCount/60*100).toFixed(1)}%)`);
  console.log(`4. PHASE 4: Live HD PNG Images (Q1-Q4):   ${liveHdImagesCount} / 40 (${(liveHdImagesCount/40*100).toFixed(1)}%) [Pending: ${pendingHdImagesCount}]`);
  console.log(`5. PHASE 5: Specific French Prompts:      ${specificFrenchPromptsCount} / 390 (${(specificFrenchPromptsCount/390*100).toFixed(1)}%)`);
  console.log(`   PHASE 5: Pure English Translations:    ${pureEnglishTranslationsCount} / 390 (${(pureEnglishTranslationsCount/390*100).toFixed(1)}%)`);
  console.log(`6. PHASE 6: Multi-Speaker Voice Tags:     ${multiVoiceSupportCount} / 390 (${(multiVoiceSupportCount/390*100).toFixed(1)}%)`);
  console.log("=========================================================================\n");
}

runFreshExhaustiveAudit().catch((err) => {
  console.error("❌ Audit Error:", err);
});
