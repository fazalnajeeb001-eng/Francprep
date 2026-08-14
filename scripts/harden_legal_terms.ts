import * as fs from "fs";

console.log("=== 🛡️ HARDENING LEGAL TERMS & TRADEMARK COMPLIANCE ===");

function replaceInFile(filePath: string, replacements: [string | RegExp, string][]) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf-8");
  replacements.forEach(([target, rep]) => {
    content = content.replace(target instanceof RegExp ? target : new RegExp(target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "g"), rep);
  });
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Updated ${filePath}`);
}

// 1. exam.$paperId.tsx
replaceInFile("src/routes/exam.$paperId.tsx", [
  ["Examen Officiel FEI", "Format Conforme TCF"],
  ["Illustration Officielle FEI (HD)", "Illustration Format TCF (HD)"],
  ["Official FEI Oral Evaluation", "Diagnostic Oral Evaluation (TCF Format)"],
  ["Official FEI Evaluation", "Diagnostic Evaluation (TCF Format)"],
  ["Official FEI CBT Writing Diagnostic & Grade", "TCF CBT Writing Diagnostic & AI Grade"],
  ["Official FEI CBT Oral Production Diagnostic & Grade", "TCF CBT Oral Diagnostic & AI Grade"],
  ["OFFICIAL FEI BENCHMARK", "TCF CANADA BENCHMARK"],
  ["Evaluating with FEI Neural AI...", "Evaluating with TCF Diagnostic AI..."],
  ["Complete Oral Task & Get Official FEI Grade", "Complete Oral Task & Get Diagnostic Score"],
  ["Senior FEI Certified Interlocutor", "Senior French Examiner Interlocutor (TCF Format)"],
  ["FEI / CCI Standards", "TCF / TEF Standards"],
  ["🔒 Navigation automatique FEI CBT", "🔒 Navigation Standard CBT"],
  ["Navigation désactivée en examen officiel (FEI CBT Rules)", "Navigation verrouillée en mode examen (Règles CBT)"],
  ["Navigation manuelle verrouillée en examen officiel FEI CBT (Avancement automatique par audio).", "Navigation manuelle verrouillée en mode examen CBT (Avancement automatique par audio)."],
  ["This test simulates the real France Éducation International (FEI) Computer-Based Testing environment:", "This test simulates the TCF Canada Computer-Based Testing environment:"],
  ["Official France Éducation International (FEI) AI Engine is scoring your Writing Tasks", "FrancPrep AI Diagnostic Engine is scoring your Writing Tasks"],
  ["FEI Official Examiner Interaction Persona", "Virtual Examiner Interaction Persona (TCF Format)"],
  ["FEI Certified Scoring Criteria", "Official TCF Scoring Criteria (CEFR Grid)"],
  ["Under official FEI CBT rules, copied sample responses receive 0 marks.", "Under standardized CBT exam rules, copied sample responses receive 0 marks."],
  ["mirror real FEI CBT regulations", "mirror standardized CBT test regulations"],
]);

// 2. exam.tsx
replaceInFile("src/routes/exam.tsx", [
  ["badge: 'FEI / France Éducation International'", "badge: 'Conforme Standard CEFR / TCF'"],
]);

// 3. exam.delf.index.tsx
replaceInFile("src/routes/exam.delf.index.tsx", [
  ["Authentic France Éducation International (FEI) style diploma diagnostic exams", "Comprehensive diploma diagnostic exams"],
  ["All papers strictly follow the 4 official FEI skill sections", "All papers strictly follow the 4 standard CEFR skill sections"],
]);

// 4. examSchema.ts
replaceInFile("src/lib/examSchema.ts", [
  ["Strict official FEI test-center exam paper", "Full-length standardized TCF test simulator paper"],
  ["Official 20-Point Scale Cutoffs for Writing & Speaking (FEI / Paris Standards)", "Standardized 20-Point Scale Cutoffs for Writing & Speaking (CEFR Rubric)"],
]);

console.log("🏆 All legal and trademark strings hardened successfully!");
