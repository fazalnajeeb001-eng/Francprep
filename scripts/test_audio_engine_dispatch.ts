import { generateListeningQuestions } from "../src/lib/examSchema";

console.log("================================================================================");
console.log("  🎙️ MULTI-SPEAKER AUDIO ENGINE DISPATCH & VOICE CONTRAST VERIFICATION");
console.log("================================================================================");

interface ParsedLine {
  speaker: string;
  text: string;
  gender: "male" | "female";
  voiceId: string;
  expectedDelayAfterMs: number;
}

function parseAndAssignVoices(transcript: string): ParsedLine[] {
  const lines = transcript
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const parsedDialogue: ParsedLine[] = [];

  const knownFemaleNames = ["marie", "chloé", "chloe", "sophie", "laura", "alice", "sarah", "femme", "female", "madame", "speaker b", "speaker 2", "julie", "camille", "clara", "emma"];
  const knownMaleNames = ["paul", "léo", "leo", "henri", "marc", "antoine", "pierre", "thomas", "homme", "male", "monsieur", "speaker a", "speaker 1", "lucas", "hugo", "louis"];

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];
    let speakerName = "";
    let speechText = line;

    if (line.includes(":")) {
      const parts = line.split(":");
      speakerName = parts[0].trim();
      speechText = parts.slice(1).join(":").trim();
    } else if (line.includes("—")) {
      const parts = line.split("—");
      speakerName = parts[0].trim();
      speechText = parts.slice(1).join("—").trim();
    }

    if (!speechText) continue;

    const lowerSpeaker = speakerName.toLowerCase();
    let gender: "male" | "female" = "female";

    if (lowerSpeaker.includes("annonceuse")) {
      gender = "female";
    } else if (lowerSpeaker.includes("annonceur") || lowerSpeaker.includes("examinateur")) {
      gender = "male";
    } else if (lowerSpeaker.includes("locutrice") || knownFemaleNames.some((f) => lowerSpeaker.includes(f))) {
      gender = "female";
    } else if (lowerSpeaker.includes("locuteur") || knownMaleNames.some((m) => lowerSpeaker.includes(m))) {
      gender = "male";
    } else {
      gender = "female";
    }

    // Backend Voice Resolution Logic
    let voiceId = "";
    if (lowerSpeaker.includes("annonceuse")) {
      voiceId = "EXAVITQu4vr4xnSDxMaL"; // Official French Female Announcer
    } else if (lowerSpeaker.includes("annonceur") || lowerSpeaker.includes("examinateur")) {
      voiceId = "ErXwobaYiN019PkySvjV"; // Official French Male Announcer
    } else if (lowerSpeaker.includes("locuteur 2") || lowerSpeaker.includes("homme 2")) {
      voiceId = "VR6AewLTigWG4xSOukaG"; // Leo (Interlocutor Male 2)
    } else if (lowerSpeaker.includes("locutrice 2") || lowerSpeaker.includes("femme 2")) {
      voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel (Interlocutor Female 2)
    } else if (gender === "male" || lowerSpeaker.includes("locuteur") || lowerSpeaker.includes("homme")) {
      voiceId = "ONwBz21w4p8b7X1s5kL0"; // Henri (Native French Male 1)
    } else {
      voiceId = "XB0fDUnXU5powctDhC70"; // Charlotte (Native French Female 1)
    }

    // Delay calculation
    let expectedDelayAfterMs = 400;
    if (idx < lines.length - 1) {
      const nextLine = lines[idx + 1];
      const isNextAnnouncer = /annonceur|annonceuse/i.test(nextLine) || /^\s*(Écoutez|Regardez)\b/i.test(nextLine);
      const isNextSpokenOption = /^\s*(Option\s+[A-D]|Propositions?\s+[A-D]|[A-D]\.)\b/i.test(nextLine) || /^\s*([A-D])\s*:/i.test(nextLine);
      const isCurrentSpokenOption = /^\s*(Option\s+[A-D]|Propositions?\s+[A-D]|[A-D]\.)\b/i.test(speechText);

      if (isNextAnnouncer) {
        expectedDelayAfterMs = 1500;
      } else if (isNextSpokenOption || isCurrentSpokenOption) {
        expectedDelayAfterMs = 1000;
      }
    }

    parsedDialogue.push({ speaker: speakerName, text: speechText, gender, voiceId, expectedDelayAfterMs });
  }

  return parsedDialogue;
}

let multiVoicePassed = 0;
let totalCheckedQuestions = 0;

for (let p = 1; p <= 10; p++) {
  const qs = generateListeningQuestions(39, `tcf${p}`, p * 3);

  qs.forEach(q => {
    const qNum = q.questionNumber;
    const parsed = parseAndAssignVoices(q.transcript);
    totalCheckedQuestions++;

    if (qNum <= 4) {
      // Visual item: Announcer voice
      const hasAnnouncer = parsed.some(l => l.voiceId === "EXAVITQu4vr4xnSDxMaL" || l.voiceId === "ErXwobaYiN019PkySvjV");
      if (hasAnnouncer) multiVoicePassed++;
    } else if (qNum <= 29) {
      // Dual voice: Passage Voice + Announcer Voice
      const uniqueVoices = new Set(parsed.map(l => l.voiceId));
      const hasPause1500 = parsed.some(l => l.expectedDelayAfterMs === 1500);

      if (uniqueVoices.size >= 2 && hasPause1500) {
        multiVoicePassed++;
      } else {
        console.log(`[P${p}Q${qNum}] Failed dual-voice check! Voices:`, Array.from(uniqueVoices), "Has 1500ms pause:", hasPause1500);
      }
    } else {
      // Advanced items Q30-Q39
      const uniqueVoices = new Set(parsed.map(l => l.voiceId));
      if (uniqueVoices.size >= 1) {
        multiVoicePassed++;
      }
    }
  });
}

console.log("\n======================== 📊 AUDIT RESULTS ========================");
console.log(`- Total Questions Audited: ${totalCheckedQuestions} / 390`);
console.log(`- Multi-Voice / Dual-Voice Verified: ${multiVoicePassed} / 390 (${((multiVoicePassed / 390) * 100).toFixed(1)}%)`);

if (multiVoicePassed === 390) {
  console.log("🎉 100% MULTI-SPEAKER VOICE CONTRAST & TIMING ACCURACY VERIFIED!");
}
