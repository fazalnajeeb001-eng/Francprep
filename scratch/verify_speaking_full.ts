import { MASTER_SPEAKING_BANK, getMasterSpeakingTasks } from "../src/lib/speakingMasterBank";
import { buildDynamicSpeakingGuidance } from "../src/lib/examSchema";
import { writingService } from "../backend/src/services/writing.service";

async function runMasterAudit() {
  console.log("=== 🔬 360° MASTER SPEAKING AUDIT — ALL 10 PAPERS & 30 TASKS ===");

  let errors = 0;
  let totalTasksChecked = 0;
  const uniqueVoicePersonas = new Set<string>();
  const uniqueStimulusTitles = new Set<string>();

  for (let pNum = 1; pNum <= 10; pNum++) {
    const tasks = getMasterSpeakingTasks(pNum);

    if (!tasks || tasks.length !== 3) {
      console.error(`❌ Paper ${pNum} does not have exactly 3 tasks! Found: ${tasks?.length}`);
      errors++;
      continue;
    }

    const paperVoiceId = tasks[0].examinerPersona?.voiceId;
    const paperExaminerName = tasks[0].examinerPersona?.name;

    uniqueVoicePersonas.add(paperVoiceId);

    tasks.forEach((t) => {
      totalTasksChecked++;

      // 1. Voice Continuity Check within Paper
      if (t.examinerPersona?.voiceId !== paperVoiceId) {
        console.error(`❌ Paper ${pNum} Task ${t.taskNumber} voice mismatch! Expected ${paperVoiceId}, got ${t.examinerPersona?.voiceId}`);
        errors++;
      }

      // 2. Timer & CEFR Checks
      if (t.taskNumber === 1 && (t.prepTimeMins !== 0 || t.speakingTimeMins !== 2)) {
        console.error(`❌ Paper ${pNum} T1 timer error: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
        errors++;
      } else if (t.taskNumber === 2 && (t.prepTimeMins !== 2 || t.speakingTimeMins !== 3.5)) {
        console.error(`❌ Paper ${pNum} T2 timer error: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
        errors++;
      } else if (t.taskNumber === 3 && (t.prepTimeMins !== 0 || t.speakingTimeMins !== 4.5)) {
        console.error(`❌ Paper ${pNum} T3 timer error: prep=${t.prepTimeMins}, speaking=${t.speakingTimeMins}`);
        errors++;
      }

      // 3. Tâche 2 Stimulus Card Check
      if (t.taskNumber === 2) {
        if (!t.stimulusDocument || !t.stimulusDocument.title || !t.stimulusDocument.details) {
          console.error(`❌ Paper ${pNum} Tâche 2 is missing stimulusDocument!`);
          errors++;
        } else {
          uniqueStimulusTitles.add(t.stimulusDocument.title);
        }
      }

      // 4. Bilingual Guidance & Trap Alerts Check
      const guidance = buildDynamicSpeakingGuidance(t);
      if (!guidance.trapAlert || !guidance.trapAlertEn || !guidance.speakingCoach || !guidance.speakingCoachEn) {
        console.error(`❌ Paper ${pNum} Task ${t.taskNumber} is missing bilingual strategy guidance!`);
        errors++;
      }
    });

    console.log(`✅ Paper ${pNum}: 3 Tasks Verified | Voice = "${paperExaminerName}" (${paperVoiceId})`);
  }

  console.log(`\n📊 Total Papers Audited: 10 / 10`);
  console.log(`📊 Total Tasks Audited: ${totalTasksChecked} / 30`);
  console.log(`📊 Unique Examiner Personas: ${uniqueVoicePersonas.size}`);
  console.log(`📊 Unique Tâche 2 Stimulus Cards: ${uniqueStimulusTitles.size} / 10`);
  console.log(`📊 Total Errors: ${errors}`);

  if (errors === 0) {
    console.log("\n🎉 360° MASTER SPEAKING AUDIT PASSED 100%! READY FOR FINAL DEPLOYMENT!");
  } else {
    console.error("\n❌ MASTER AUDIT FAILED!");
    process.exit(1);
  }
}

runMasterAudit();
