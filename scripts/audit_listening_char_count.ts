import { getExamRegistry } from "../src/lib/examSchema";

function countListeningCharacters() {
  console.log("==========================================================================");
  console.log("📊 AUDITING LISTENING CHARACTER COUNTS ACROSS ALL 10 PAPERS");
  console.log("==========================================================================");

  const registry = getExamRegistry();
  let totalCharsAllPapers = 0;
  let totalQuestionsAllPapers = 0;

  for (let pIdx = 0; pIdx < registry.length; pIdx++) {
    const paper = registry[pIdx];
    const listeningSec = paper.sections.find(s => s.type === "COMPREHENSION_ORALE");
    const questions = listeningSec?.questions || [];
    
    let paperChars = 0;
    for (const q of questions) {
      const text = (q.transcript || q.text || '').trim();
      paperChars += text.length;
    }

    totalCharsAllPapers += paperChars;
    totalQuestionsAllPapers += questions.length;

    console.log(`• Paper ${pIdx + 1} (${paper.code || paper.id}): ${questions.length} questions | ~${paperChars.toLocaleString()} characters`);
  }

  console.log("\n--------------------------------------------------------------------------");
  console.log(`TOTAL: ${totalQuestionsAllPapers} Listening Questions across 10 Papers`);
  console.log(`TOTAL CHARACTERS: ~${totalCharsAllPapers.toLocaleString()} characters`);
  console.log("==========================================================================");
}

countListeningCharacters();
