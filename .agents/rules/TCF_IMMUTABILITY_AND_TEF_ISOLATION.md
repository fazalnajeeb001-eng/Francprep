# 🔴 STRICT TCF CANADA IMMUTABILITY & TEF ISOLATION DIRECTIVE

## 🚨 PERMANENT LOCK MANDATE FOR ALL AI AGENTS
TCF Canada is **100% FINISHED, AUDITED, AND PRODUCTION-LOCKED**.
All 10 papers (390 Listening items, 390 Reading items, 30 Writing tasks, 30 Speaking tasks) are **PERMANENTLY FROZEN**.

### 1. FROZEN & IMMUTABLE TCF FILES
The following files are strictly read-only:
- `src/lib/authenticListeningAdvancedBank.ts`
- `src/lib/listeningGuidanceBank.ts`
- `src/lib/authenticReadingMasterBank.ts`
- `src/lib/readingGuidanceBank.ts`
- `src/lib/authenticWritingMasterBank.ts`
- `src/lib/speakingMasterBank.ts`
- `src/lib/practiceListeningTranslations.ts`
- `src/lib/masterOptionsDictionary.ts`
- `src/lib/50_50_visual_bank.ts`
- `scripts/build_comprehensive_reading_guidance.ts`
- `scripts/build_comprehensive_listening_guidance.ts`

### 2. STRICT TEF CANADA ISOLATION
- All TEF Canada code, questions, and audio must reside in dedicated TEF files (`tefReadingMasterBank.ts`, `tefListeningMasterBank.ts`, etc.).
- Any changes in shared routes (e.g. `src/routes/exam.$paperId.tsx`) must be strictly enclosed within `if (paper.type === "TEF_CANADA")`.
- Under NO circumstances may any edit, refactoring, or new feature alter TCF Canada timers, scores, state hooks, or guidance.

### 3. MANDATORY PRE-COMMIT TEST
Any agent modifying code in this repository MUST run:
```bash
npx tsx scripts/test_dual_mode_full_simulation.ts
```
If this test does not pass with 100% success, your code has caused a regression and CANNOT be committed.
