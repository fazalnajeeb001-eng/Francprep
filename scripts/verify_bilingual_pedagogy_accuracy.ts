import { getExamRegistry } from "../src/lib/examSchema";

function verifyBilingualPedagogy() {
  console.log("=== 🔬 VERIFYING 100% PURE ENGLISH PEDAGOGICAL BREAKDOWN ===");
  const registry = getExamRegistry();
  const paper1 = registry[0];

  const listeningSection = paper1.sections.find(s => s.type === "COMPREHENSION_ORALE");
  const readingSection = paper1.sections.find(s => s.type === "COMPREHENSION_ECRITE");

  const sampleQuestions = [
    { name: "Listening Q1 (Visual A1)", q: listeningSection?.questions?.[0] },
    { name: "Listening Q5 (Announcement A1)", q: listeningSection?.questions?.[4] },
    { name: "Listening Q16 (Radio Report B1)", q: listeningSection?.questions?.[15] },
    { name: "Listening Q39 (Academic C2)", q: listeningSection?.questions?.[38] },
    { name: "Reading Q1 (Public Document A1)", q: readingSection?.questions?.[0] },
    { name: "Reading Q26 (Opinion Essay B2)", q: readingSection?.questions?.[25] }
  ];

  for (const sample of sampleQuestions) {
    console.log(`\n======================================================`);
    console.log(`📌 ${sample.name}`);
    console.log(`======================================================`);
    const q = sample.q as any;
    if (!q) {
      console.error("Missing question!");
      continue;
    }

    console.log(`[🇫🇷 French Pedagogical Explanation]:`);
    console.log(q.explanation?.slice(0, 180) + "...");
    console.log(`\n[🇬🇧 English Pedagogical Breakdown]:`);
    console.log(q.detailedExplanationEn?.slice(0, 240) + "...");
    console.log(`\n[🇬🇧 Correct Option English]: "${q.optionsEnglish?.[q.correctIndex]}"`);
  }
}

verifyBilingualPedagogy();
