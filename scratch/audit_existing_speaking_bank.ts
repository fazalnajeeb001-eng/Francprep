import { MASTER_SPEAKING_BANK } from "../src/lib/speakingMasterBank";

function auditExistingSpeakingBank() {
  console.log("=== 🔬 AUDITING EXISTING MASTER SPEAKING BANK ===");

  const papers = Object.keys(MASTER_SPEAKING_BANK).map(Number);
  console.log(`Total Papers in Bank: ${papers.length}`);

  papers.forEach((pNum) => {
    const tasks = MASTER_SPEAKING_BANK[pNum];
    console.log(`\n📄 Paper ${pNum} (${tasks.length} tasks):`);
    tasks.forEach((t) => {
      console.log(`  - Tâche ${t.taskNumber}: "${t.title}" | Examiner: ${t.examinerPersona?.name} (${t.examinerPersona?.gender})`);
    });
  });
}

auditExistingSpeakingBank();
