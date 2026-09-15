# 🛡️ FRANCPREP MULTI-AGENT ISOLATION & TCF CANADA IMMUTABILITY PROTOCOL

> [!IMPORTANT]
> **MANDATORY INSTRUCTION FOR ALL AI AGENTS & DEVELOPERS:**
> TCF Canada is **100% COMPLETE, CALIBRATED, AND PRODUCTION-LOCKED**.
> All 10 papers $\times$ 4 skill modules (Compréhension Orale, Compréhension Écrite, Expression Écrite, Expression Orale) are **FROZEN AND IMMUTABLE**.
> Under NO circumstances may any agent modify, regenerate, or tamper with TCF Canada files without the user's explicit, direct command for a targeted edit.

---

## 🔒 1. TCF CANADA IMMUTABLE ASSET VAULT (STRICTLY READ-ONLY)

The following files and banks are **PERMANENTLY FROZEN**. Agents are strictly forbidden from modifying, refactoring, or overwriting them:

| Skill Module | Frozen Source Files & Guidance Banks |
|---|---|
| **Compréhension Orale** | `src/lib/authenticListeningAdvancedBank.ts`<br>`src/lib/listeningGuidanceBank.ts`<br>`src/lib/practiceListeningTranslations.ts`<br>`src/lib/masterOptionsDictionary.ts`<br>`src/lib/50_50_visual_bank.ts`<br>`scripts/build_comprehensive_listening_guidance.ts` |
| **Compréhension Écrite** | `src/lib/authenticReadingMasterBank.ts`<br>`src/lib/readingGuidanceBank.ts`<br>`scripts/build_comprehensive_reading_guidance.ts`<br>`scripts/audit_reading_guidance_zero_leaks.ts` |
| **Expression Écrite** | `src/lib/authenticWritingMasterBank.ts`<br>`backend/src/services/writing.service.ts`<br>`backend/src/scripts/calibrate-writing-evaluation.ts` |
| **Expression Orale** | `src/lib/speakingMasterBank.ts`<br>`src/lib/acousticAnalyzer.ts`<br>`backend/src/routes/speaking.routes.ts` |
| **Simulators & CBT Timers** | TCF-specific execution paths in `src/routes/exam.$paperId.tsx`<br>TCF durations (CO 35m, CE 65m, EE 60m, EO 12m) in `src/lib/examSchema.ts` |

---

## 🚀 2. TEF CANADA & PLATFORM DEVELOPMENT RULES (STRICT ISOLATION)

All future work on **TEF Canada**, platform features, lessons, community, or billing MUST strictly adhere to the **Namespaced Isolation Architecture**:

1. **Dedicated TEF Data Banks**:
   - All TEF question data, transcripts, reading passages, and writing/speaking prompts MUST reside in dedicated files (e.g. `src/lib/tefReadingMasterBank.ts`, `src/lib/tefListeningMasterBank.ts`, `src/lib/tefWritingMasterBank.ts`, `src/lib/tefSpeakingMasterBank.ts`).
   - TEF code must NEVER import or re-use TCF master banks.
2. **Conditional Gateways in the Simulator**:
   - In shared routes (such as `src/routes/exam.$paperId.tsx`), any TEF-specific logic (e.g. *Fait Divers*, 2-task writing format, 15-minute speaking format, 0–699 scoring scale) MUST be placed inside an explicit branch:
     ```typescript
     if (paper.type === "TEF_CANADA") {
       // TEF Canada specific logic
     } else {
       // TCF Canada - STRICTLY UNTOUCHED & PRESERVED
     }
     ```
3. **No Cross-Contamination**:
   - Modifying TEF logic, CSS, or backend endpoints must NEVER alter the state hooks, persistence keys, or calculation flows of TCF Canada.

---

## 🚦 3. MANDATORY PRE-COMMIT VERIFICATION GATEWAYS

Before committing any code or declaring any task finished, the agent MUST run and verify the following 3 commands:

1. **TCF Regression & Scorecard Guardian Test**:
   ```bash
   npx tsx scripts/test_dual_mode_full_simulation.ts
   ```
   *Must pass with 100% success (0 leaks, all 4 sections evaluated, +127 CRS points in Exam Mode, +136 CRS cap in Practice Mode).*
2. **Backend Compilation**:
   ```bash
   npm --prefix backend run build
   ```
   *Must complete with Exit code 0 (zero TypeScript errors).*
3. **Frontend Production Build**:
   ```bash
   npm run build
   ```
   *Must complete with Exit code 0 (zero Vite/SSR/Nitro bundle errors).*

If ANY of these 3 checks fail, the change is invalid and must be fixed immediately. **NEVER push broken code to Git `main`.**

---

## 🔑 4. USER OVERRIDE PROTOCOL

If the user explicitly requests an edit to TCF Canada (e.g., *"I want to fix a typo in TCF Paper 3 Question 5"*):
1. The agent is authorized to make **only** that specific, requested edit.
2. The agent must immediately run `npx tsx scripts/test_dual_mode_full_simulation.ts` to confirm 0 regression.
3. Once verified, the TCF module is **immediately re-locked**.
