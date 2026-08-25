import { getMasterSpeakingTasks } from "../src/lib/speakingMasterBank";
import { buildDynamicSpeakingGuidance } from "../src/lib/examSchema";

function verifySpeakingStrategyPhase4() {
  console.log("=== 🔬 PHASE 4: BILINGUAL SPEAKING STRATEGY & TRAP ALERTS AUDIT ===");

  let errors = 0;

  for (let pNum = 1; pNum <= 10; pNum++) {
    const tasks = getMasterSpeakingTasks(pNum);

    tasks.forEach((t) => {
      const guidance = buildDynamicSpeakingGuidance(t);

      if (!guidance.trapAlert || !guidance.trapAlertEn) {
        console.error(`❌ Paper ${pNum} Task ${t.taskNumber} is missing trapAlert!`);
        errors++;
      }

      if (!guidance.speakingCoach || !guidance.speakingCoachEn) {
        console.error(`❌ Paper ${pNum} Task ${t.taskNumber} is missing speakingCoach!`);
        errors++;
      }

      if (!guidance.keyPhrases || guidance.keyPhrases.length === 0) {
        console.error(`❌ Paper ${pNum} Task ${t.taskNumber} is missing keyPhrases!`);
        errors++;
      }
    });
  }

  console.log(`\n📊 Total Papers Audited: 10`);
  console.log(`📊 Total Tasks Audited: 30`);
  console.log(`📊 Errors Detected: ${errors}`);

  if (errors === 0) {
    console.log("\n🎉 PHASE 4 SPEAKING STRATEGY & TRAP ALERTS PASSED 100%! ZERO ERRORS!");
  } else {
    console.error("\n❌ PHASE 4 AUDIT FAILED!");
    process.exit(1);
  }
}

verifySpeakingStrategyPhase4();
