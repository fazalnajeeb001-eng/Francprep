# 🇨🇦 FRANC PREP — MASTER SESSION MIGRATION & CONTINUATION PROMPT

> **Instructions for AI Assistant**: Copy and consume this entire prompt at the start of any new session or workspace migration. This document contains the full architecture, official France Éducation International (FEI) TCF Canada CBT exam rules, completed technical phases, code standards, and the upcoming project roadmap.

---

## 📌 1. PLATFORM & REPOSITORY OVERVIEW

- **Project Name**: FRANC PREP (Premier TCF Canada & TEF Canada Exam Preparation Platform)
- **Live Platform URL**: `https://francprep.vercel.app`
- **Core Technology Stack**:
  - **Frontend**: React 18, Vite 7, TanStack Router (SSR / Start), Tailwind CSS, Framer Motion, Lucide Icons.
  - **Backend**: Node.js, Express, TypeScript, ElevenLabs API, OpenAI API, Web Audio API.
- **Repository Structure**:
  - `Francprep-main/src/routes/exam.$paperId.tsx` — Master Exam & Practice Mode Interface (Timers, Audio Player, Prompt Reveal, CBT Grid Navigator).
  - `Francprep-main/src/lib/speech.ts` — Multi-Speaker Sound Engine, Acoustic Chimes, Promise Cancellation Machine (`myDialogueId`).
  - `Francprep-main/src/lib/soundEffects.ts` — Web Audio API acoustic chime generators (Airport Ding-Dong, Voicemail Beeps, Radio News Jingle).
  - `Francprep-main/src/lib/examSchema.ts` — 10 Full Official TCF Canada Practice Papers (390 Listening Items, 390 Reading Items, 30 Writing Tasks, 30 Speaking Tasks).
  - `Francprep-main/scripts/` — Automated verification & audit test suites (`verify_elevenlabs_multi_voice.ts`, `verify_phase1_audio_pauses.ts`, `verify_phase2_cbt_timers.ts`, etc.).

---

## 🏛️ 2. OFFICIAL FEI TCF CANADA CBT RULES & SPECIFICATIONS

### 🎧 A. Exam Mode (`mode === "EXAM"`)
1. **Strict 100% Automated Navigation**:
   - Candidate **CANNOT** manually navigate forward or backward during Listening (`COMPREHENSION_ORALE`).
   - Prev / Next buttons and **ALL 39 Grid Index Buttons are 100% DISABLED & LOCKED** (`disabled={isExamListening}`).
   - The test software automatically plays audio -> waits 15s/20s/25s -> locks choice -> automatically advances to the next question.
2. **Hidden Audio Player Controls**:
   - Interactive Play/Pause/Replay/Stop buttons are hidden (replicates test-center headphone audio streaming).
   - Replaced by official audio status card (`🎧 Document Sonore TCF N°X — Lecture unique en cours...`).
3. **Deferred Per-Question Timer Start**:
   - The per-question countdown timer (15s Q1–Q10, 20s Q11–Q26, 25s Q27–Q39) stays frozen while audio plays and starts ONLY after `audio.onended` fires (`isAudioFinished === true`).
4. **Question Prompt Display Rules**:
   - **Q1–Q4**: HD visual illustrations printed on screen. Question prompt text hidden.
   - **Q5–Q29**: Question prompt text hidden by default. Choices A, B, C, D visible. Selecting an option choice reveals prompt text.
   - **Q30–Q39**: Question prompt text automatically printed on screen per official FEI C1/C2 rules.

---

### 📘 B. Practice Mode (`mode === "PRACTICE"`)
1. **Full Interactive Controls**:
   - `Play Audio ▶️`, `Pause Audio ⏸️`, `Stop Audio ⏹️`, `Replay Audio 🔄`, `📄 French Transcript`, `🌐 English Translation`, and `💡 Pedagogical Hints`.
2. **Synchronized Audio & Timer Freeze**:
   - Clicking **Pause Audio ⏸️** instantly freezes BOTH headphone audio and the per-question timer (`qTimeLeft`).
3. **Total Audio Leakage Prevention**:
   - Navigating away from the page, changing routes, reloading, or closing the tab instantly aborts all audio fetches and drops playback promises via `myDialogueId` cancellation checks.
4. **100% Unlocked Navigation Grid**:
   - Candidate can jump freely across all 39 questions to study.

---

## 📊 3. COMPLETED PHASES & AUDIT STATUS

- [x] **Phase 1: TCF Sound Design & Audio Pauses**
  - Evaluated 390 Listening questions across 10 papers.
  - Enforced 1.5-second silent break before announcer lines ("Écoutez la question...").
  - Enforced 1.0-second silent break between spoken options (Option A, B, C, D) for Q1–Q8.
  - Configured ElevenLabs multi-speaker voice contrast engine (Henri, Charlotte, Official Announcer).
  - Verified with `npx tsx scripts/verify_phase1_audio_pauses.ts` (100% PASS).

- [x] **Phase 2: CBT Timers & Trigger Logic**
  - Defer timer start until audio ends in Exam Mode.
  - Enforced per-question CBT timers: 15s (Q1–Q10), 20s (Q11–Q26), 25s (Q27–Q39).
  - Enforced 0s auto-advance and answer locking.
  - Enforced 100% total grid lock during Exam Mode Listening (`disabled={isExamListening}`).
  - Verified with `npx tsx scripts/verify_phase2_cbt_timers.ts` (100% PASS).

- [x] **Practice Mode Pause & Audio Leakage Engine Fixes**
  - Session token cancellation (`playAudioSessionRef`).
  - Module-level pause lock (`isAudioPausedState`) and line timeout cancellation (`clearTimeout(lineTimeoutId)`).
  - Component unmount cleanup and window event listeners (`beforeunload`, `pagehide`, `popstate`).
  - Fixed `useRef` React import in `exam.$paperId.tsx`.

---

## 🎯 4. UPCOMING ROADMAP & NEXT PHASES

- [ ] **Phase 3: Question Display & Prompt Reveal Rules Deep Audit**
  - 360° verification of Q1–Q4 HD visual images rendering across all 10 papers.
  - Verification of Q5–Q29 prompt reveal on choice click.
  - Verification of Q30–Q39 auto-printed prompt.
- [ ] **Phase 4: Reading Section (Compréhension Écrite) Audit**
  - Audit all 390 Reading questions (35 items per paper, 60 mins total).
  - Verify document text display, question formatting, and section timer.
- [ ] **Phase 5: Writing Section (Expression Écrite) Audit**
  - Audit 30 Writing tasks (Task 1: 60-120 words, Task 2: 120-150 words, Task 3: 120-180 words).
  - Verify AI evaluation scoring engine (CLB level calculation, grammar/vocabulary feedback).
- [ ] **Phase 6: Speaking Section (Expression Orale) Audit**
  - Audit 30 Speaking tasks (Task 1: 2 mins intro, Task 2: 3.5 mins interaction, Task 3: 4.5 mins debate).
  - Verify audio recording, Speech-to-Text transcription, and AI Examiner feedback.

---

## 🛠️ 5. VERIFICATION COMMANDS

```bash
# 1. Verify ElevenLabs Multi-Voice Contrast
npx tsx scripts/verify_elevenlabs_multi_voice.ts

# 2. Verify Audio Pauses & Sound Design
npx tsx scripts/verify_phase1_audio_pauses.ts

# 3. Verify CBT Timers & Allocations
npx tsx scripts/verify_phase2_cbt_timers.ts

# 4. Verify Full Production Build
npm --prefix backend run build
npm run build
```
