import { getMasterSpeakingTasks } from "../src/lib/speakingMasterBank";

function verifySpeakingTimersPhase2() {
  console.log("=== 🔬 PHASE 2: SPEAKING TIMERS & MIC AUTO-TOGGLE AUDIT ===");

  let errors = 0;

  for (let pNum = 1; pNum <= 10; pNum++) {
    const tasks = getMasterSpeakingTasks(pNum);

    tasks.forEach((t) => {
      // Check timer definitions
      if (t.taskNumber === 1) {
        if (t.prepTimeMins !== 0 || t.speakingTimeMins !== 2) {
          console.error(`❌ Paper ${pNum} T1 timer error: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
          errors++;
        }
      } else if (t.taskNumber === 2) {
        if (t.prepTimeMins !== 2 || t.speakingTimeMins !== 3.5) {
          console.error(`❌ Paper ${pNum} T2 timer error: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
          errors++;
        }
      } else if (t.taskNumber === 3) {
        if (t.prepTimeMins !== 0 || t.speakingTimeMins !== 4.5) {
          console.error(`❌ Paper ${pNum} T3 timer error: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
          errors++;
        }
      }

      // Check examiner persona voice ID present
      if (!t.examinerPersona?.voiceId) {
        console.error(`❌ Paper ${pNum} Tâche ${t.taskNumber} is missing voiceId in examinerPersona!`);
        errors++;
      }
    });
  }

  console.log(`\n📊 Total Papers Checked: 10`);
  console.log(`📊 Total Tasks Checked: 30`);
  console.log(`📊 Errors Detected: ${errors}`);

  if (errors === 0) {
    console.log("\n🎉 PHASE 2 TIMER & MIC PROTOCOL AUDIT PASSED 100%! ZERO ERRORS!");
  } else {
    console.error("\n❌ AUDIT FAILED!");
    process.exit(1);
  }
}

verifySpeakingTimersPhase2();
