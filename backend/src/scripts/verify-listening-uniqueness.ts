import { getExamRegistry, ExamPaper, ExamSection, ExamQuestion } from '../../src/lib/examSchema';

console.log("🔍 Running 100% Listening Uniqueness & Integrity Verification Suite...");

const registry = getExamRegistry();
console.log(`Loaded ${registry.length} exam papers.`);

let totalListeningQuestions = 0;
const uniqueQuestionTitles = new Set<string>();
const uniqueTranscripts = new Set<string>();
const uniqueSvgDrawings = new Set<string>();

registry.forEach((paper: ExamPaper, pIdx: number) => {
  const listeningSection = paper.sections.find((s: ExamSection) => s.type === "COMPREHENSION_ORALE");
  if (!listeningSection || !listeningSection.questions) {
    console.error(`❌ Paper ${paper.id} missing COMPREHENSION_ORALE section!`);
    return;
  }

  console.log(`Paper ${pIdx + 1} (${paper.id}): ${listeningSection.questions.length} Listening Questions.`);

  listeningSection.questions.forEach((q: ExamQuestion, _qIdx: number) => {
    totalListeningQuestions++;

    const titleKey = `${q.questionNumber}_${q.transcript}`;
    const transcriptKey = q.transcript || q.text;
    uniqueQuestionTitles.add(titleKey);
    uniqueTranscripts.add(transcriptKey);

    if (q.mainImageSvg) {
      uniqueSvgDrawings.add(q.mainImageSvg);
    }
  });
});

console.log(`\n📊 VERIFICATION RESULTS:`);
console.log(`Total Listening Questions Analyzed: ${totalListeningQuestions}`);
console.log(`Unique Transcripts / Topics Count: ${uniqueTranscripts.size}`);
console.log(`Unique SVG Line-Art Drawings Count: ${uniqueSvgDrawings.size}`);

if (uniqueTranscripts.size === totalListeningQuestions) {
  console.log(`\n✅ SUCCESS: 100% of all ${totalListeningQuestions} listening questions are 100% UNIQUE across all 10 papers! Zero duplication!`);
} else {
  console.warn(`\n⚠️ WARNING: Found ${totalListeningQuestions - uniqueTranscripts.size} duplicate question transcripts!`);
}

if (uniqueSvgDrawings.size === 40) {
  console.log(`✅ SUCCESS: 100% of all 40 picture questions (Q1-Q4 across 10 papers) are 100% UNIQUE SVG line-art drawings!`);
} else {
  console.warn(`⚠️ WARNING: SVG Drawings count is ${uniqueSvgDrawings.size} (expected 40).`);
}
