import { MASTER_SPEAKING_SUITE } from "./speaking_master_dataset";

function testSpeakingMasterDataset() {
  console.log("=== 🔬 PHASE 1: MASTER SPEAKING DATASET AUDIT (30 TASKS / 10 PAPERS) ===");

  let totalPapers = MASTER_SPEAKING_SUITE.length;
  let totalTasks = 0;

  const taskIds = new Set<string>();
  const prompts = new Set<string>();
  let errors = 0;

  MASTER_SPEAKING_SUITE.forEach((paper) => {
    console.log(`\n📄 Paper ${paper.paperNum} | Examiner: ${paper.examinerName} | Voice: ${paper.examinerVoiceId} (${paper.examinerGender})`);

    if (paper.tasks.length !== 3) {
      console.error(`❌ Paper ${paper.paperNum} does NOT have exactly 3 tasks (found ${paper.tasks.length})`);
      errors++;
    }

    paper.tasks.forEach((t) => {
      totalTasks++;

      // Check ID uniqueness
      if (taskIds.has(t.id)) {
        console.error(`❌ Duplicate Task ID found: ${t.id}`);
        errors++;
      } else {
        taskIds.add(t.id);
      }

      // Check Prompt uniqueness
      if (prompts.has(t.prompt)) {
        console.error(`❌ Duplicate Prompt found in Paper ${paper.paperNum} Tâche ${t.taskNumber}`);
        errors++;
      } else {
        prompts.add(t.prompt);
      }

      // Verify voice persona matches paper examiner
      if (t.examinerPersona.voiceId !== paper.examinerVoiceId) {
        console.error(`❌ Voice mismatch in Paper ${paper.paperNum} Tâche ${t.taskNumber}: Task has ${t.examinerPersona.voiceId}, Paper has ${paper.examinerVoiceId}`);
        errors++;
      }

      // Verify timer bounds
      if (t.taskNumber === 1 && (t.prepTimeMins !== 0 || t.speakingTimeMins !== 2)) {
        console.error(`❌ Incorrect timers for Tâche 1: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
        errors++;
      } else if (t.taskNumber === 2 && (t.prepTimeMins !== 2 || t.speakingTimeMins !== 3.5)) {
        console.error(`❌ Incorrect timers for Tâche 2: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
        errors++;
      } else if (t.taskNumber === 3 && (t.prepTimeMins !== 0 || t.speakingTimeMins !== 4.5)) {
        console.error(`❌ Incorrect timers for Tâche 3: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
        errors++;
      }

      console.log(`  - Tâche ${t.taskNumber} (${t.level}): "${t.title}" | Voice: ${t.examinerPersona.voiceId} [OK]`);
    });
  });

  console.log(`\n📊 Total Papers Audited: ${totalPapers}`);
  console.log(`📊 Total Tasks Audited: ${totalTasks}`);
  console.log(`📊 Unique Task IDs: ${taskIds.size} / 30`);
  console.log(`📊 Unique Prompts: ${prompts.size} / 30`);
  console.log(`📊 Errors Detected: ${errors}`);

  if (errors === 0 && totalTasks === 30 && taskIds.size === 30 && prompts.size === 30) {
    console.log("\n🎉 PHASE 1 MASTER SPEAKING AUDIT PASSED 100%! ZERO ERRORS!");
  } else {
    console.error("\n❌ AUDIT FAILED! Please fix the reported errors.");
    process.exit(1);
  }
}

testSpeakingMasterDataset();
