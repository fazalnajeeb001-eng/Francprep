import { generateListeningQuestions } from "../src/lib/examSchema";
import * as fs from "fs";

console.log("=== 🔍 360° AUDIT: VERBATIM TRANSCRIPT-OPTION OVERLAP IN ALL 390 QUESTIONS (10 PAPERS) ===");

interface VerbatimIssue {
  paper: number;
  qNum: number;
  id: string;
  level: string;
  correctIndex: number;
  correctOption: string;
  transcriptSnippet: string;
  overlapPercentage: number;
  isVerbatim: boolean;
}

const issues: VerbatimIssue[] = [];
let totalAudited = 0;

for (let p = 1; p <= 10; p++) {
  const seedOffset = p * 3;
  const questions = generateListeningQuestions(39, `tcf${p}`, seedOffset);

  questions.forEach((q) => {
    totalAudited++;
    const correctOpt = q.options[q.correctIndex]?.trim() || "";
    const transcript = (q.transcript || "").toLowerCase();
    const optLower = correctOpt.toLowerCase();

    // Check if correct option is a verbatim substring of transcript (or > 70% matching words in order)
    const isExactSubstring = transcript.includes(optLower);

    // Also check token overlap
    const optWords = optLower.replace(/[^\w\sàâäéèêëîïôöùûüç]/gi, "").split(/\s+/).filter(w => w.length > 3);
    const matchedWords = optWords.filter(w => transcript.includes(w));
    const overlapRatio = optWords.length > 0 ? (matchedWords.length / optWords.length) : 0;

    // In B2, C1, C2 (Q26-Q39), verbatim or >80% word overlap is an academic defect
    if ((isExactSubstring || overlapRatio >= 0.85) && q.questionNumber >= 16) {
      issues.push({
        paper: p,
        qNum: q.questionNumber,
        id: q.id,
        level: (q as any).level || "Unknown",
        correctIndex: q.correctIndex,
        correctOption: correctOpt,
        transcriptSnippet: q.transcript?.slice(0, 150) || "",
        overlapPercentage: Math.round(overlapRatio * 100),
        isVerbatim: isExactSubstring
      });
    }
  });
}

console.log(`Audited ${totalAudited} questions across 10 papers.`);
console.log(`Found ${issues.length} questions with verbatim/high-overlap correct options in intermediate & advanced levels (Q16-Q39).`);

fs.writeFileSync("scratch/verbatim_issues_390.json", JSON.stringify(issues, null, 2));

console.log("\nSample high-overlap items detected:");
issues.slice(0, 15).forEach((iss, idx) => {
  console.log(`${idx + 1}. [Paper ${iss.paper} Q${iss.qNum} (${iss.level})] Correct Option: "${iss.correctOption}" | Exact Substring: ${iss.isVerbatim}`);
});
