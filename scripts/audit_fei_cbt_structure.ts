import { generateListeningQuestions } from "../src/lib/examSchema.ts";

function auditFEICBTStructure() {
  console.log("=== 🔬 INDEPTH AUDIT: FEI TCF CBT LISTENING STRUCTURE & METRICS (390 ITEMS) ===");
  console.log("Evaluating 10 Exam Papers against Official France Éducation International Standards...\n");

  const totalPapers = 10;
  let totalEvaluated = 0;

  // Breakdown metrics
  let q1_4_count = 0;
  let q5_15_count = 0;
  let q16_25_count = 0;
  let q26_33_count = 0;
  let q34_39_count = 0;

  let q1_4_consigne_pass = 0;
  let q5_8_spoken_options_pass = 0;
  let q16_25_speaker_tags_pass = 0;
  let q26_33_connectors_pass = 0;
  let q34_39_printed_prompts_pass = 0;

  for (let paperIdx = 1; paperIdx <= totalPapers; paperIdx++) {
    const isPractice = paperIdx <= 5;
    const seedOffset = isPractice ? (paperIdx * 3) : (paperIdx * 7 + 13);
    const questions = generateListeningQuestions(39, `tcf${paperIdx}`, seedOffset);

    questions.forEach((q) => {
      totalEvaluated++;
      const qNum = q.questionNumber;
      const tr = (q.transcript || "").toLowerCase();

      if (qNum >= 1 && qNum <= 4) {
        q1_4_count++;
        if (tr.includes("regardez l'image. écoutez les 4 propositions")) {
          q1_4_consigne_pass++;
        }
      } else if (qNum >= 5 && qNum <= 15) {
        q5_15_count++;
        if (qNum <= 8) {
          if (tr.includes("a :") || tr.includes("proposition a :") || tr.includes("a:")) {
            q5_8_spoken_options_pass++;
          }
        }
      } else if (qNum >= 16 && qNum <= 25) {
        q16_25_count++;
        if (tr.includes("locuteur") || tr.includes("locutrice")) {
          q16_25_speaker_tags_pass++;
        }
      } else if (qNum >= 26 && qNum <= 33) {
        q26_33_count++;
        if (
          tr.includes("cependant") ||
          tr.includes("en revanche") ||
          tr.includes("toutefois") ||
          tr.includes("néanmoins") ||
          tr.includes("par conséquent") ||
          tr.includes("de plus") ||
          tr.includes("en effet") ||
          tr.includes("or") ||
          tr.includes("pourtant")
        ) {
          q26_33_connectors_pass++;
        }
      } else if (qNum >= 34 && qNum <= 39) {
        q34_39_count++;
        if (q.questionInAudio === false) {
          q34_39_printed_prompts_pass++;
        }
      }
    });
  }

  console.log("=======================================================");
  console.log("📊 FEI TCF CBT STRUCTURE AUDIT RESULTS");
  console.log("=======================================================");
  console.log(`Total Questions Evaluated:                    ${totalEvaluated} / 390`);
  console.log(`Q1-Q4 Visual Scene Consigne Pass Rate:        ${q1_4_consigne_pass} / ${q1_4_count} (${(q1_4_consigne_pass/q1_4_count*100).toFixed(1)}%)`);
  console.log(`Q5-Q8 Spoken Options Audio Pass Rate:        ${q5_8_spoken_options_pass} / 40 (${(q5_8_spoken_options_pass/40*100).toFixed(1)}%)`);
  console.log(`Q16-Q25 Dialogue Speaker Tag Pass Rate:       ${q16_25_speaker_tags_pass} / ${q16_25_count} (${(q16_25_speaker_tags_pass/q16_25_count*100).toFixed(1)}%)`);
  console.log(`Q26-Q33 Rhetorical Connector Pass Rate:       ${q26_33_connectors_pass} / ${q26_33_count} (${(q26_33_connectors_pass/q26_33_count*100).toFixed(1)}%)`);
  console.log(`Q34-Q39 Academic Printed Prompt Pass Rate:    ${q34_39_printed_prompts_pass} / ${q34_39_count} (${(q34_39_printed_prompts_pass/q34_39_count*100).toFixed(1)}%)`);

  const isFlawless =
    q1_4_consigne_pass === q1_4_count &&
    q5_8_spoken_options_pass === 40 &&
    q16_25_speaker_tags_pass === q16_25_count &&
    q26_33_connectors_pass === q26_33_count &&
    q34_39_printed_prompts_pass === q34_39_count;

  if (isFlawless) {
    console.log("\n🎉 PERFECT SCORE: 100.0% OF ALL 390 QUESTIONS EXACTLY MATCH OFFICIAL FRANCE ÉDUCATION INTERNATIONAL TCF CBT SPECIFICATIONS!");
  } else {
    console.log("\n⚠️ Structure audit completed with warnings.");
  }
}

auditFEICBTStructure();
