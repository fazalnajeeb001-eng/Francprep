# 🛡️ FRANCPREP MULTI-AGENT ISOLATION & SYSTEM INTEGRITY PROTOCOL

To ensure 100% platform stability, zero downtime, and guarantee that work performed by different AI coding agents never breaks existing functionality, ALL agents operating on this repository MUST strictly follow these rules:

---

## 🛑 MANDATORY RULES FOR ALL AI AGENTS & DEVELOPERS

### Rule 1: STRICT ZERO-TOUCH SCOPE LOCK DIRECTIVE (LISTENING, READING, WRITING)
- **FROZEN & IMMUTABLE MODULES**:
  1. **Compréhension Orale (Listening)** — All audio files, transcripts, question prompts, timers, state hooks, schemas, API routes, and audio caching services are **100% LOCKED AND FROZEN**.
  2. **Compréhension Écrite (Reading)** — Passages, questions, navigation, timers, and scoring are **100% LOCKED AND FROZEN**.
  3. **Expression Écrite (Writing)** — Prompts, word counters, timers, and AI evaluation services are **100% LOCKED AND FROZEN**.
  4. **Core Shared Infrastructure** — `src/lib/speech.ts`, `src/lib/apiFetch.ts`, track branding, and global layout routes are **100% READ-ONLY**.
- **Scoped Changes Only**: Work on Expression Orale (Speaking) MUST ONLY touch Speaking code inside `src/routes/exam.$paperId.tsx` (enclosed in `if (currentSection.type === "EXPRESSION_ORALE")`) and `backend/src/routes/speaking.routes.ts`.

---

### Rule 2: Mandatory Pre-Commit Build & Test Verification
Before declaring any task complete or committing code to Git `main`, you MUST execute the following build verification commands:
1. `npm --prefix backend run build` (Must complete with 0 TypeScript compilation errors)
2. `npm run build` (Must complete with 0 Vite / Nitro SSR bundle errors)
3. Run test suites if modifying evaluation logic (`npx ts-node backend/src/scripts/test-all-10-tcf-papers.ts`).

If ANY build command fails, you MUST resolve the error locally. **NEVER push broken code to Git `main`.**

---

### Rule 3: Preservation of Core Platform Architecture
- **Multi-Language Branding (`trackBranding.ts`)**: Always resolve active branding using `getTrackBranding(getActiveLanguageCode(user))`. Never hardcode static brand strings or remove `fp_active_language` from `localStorage` on logout.
- **Admin Sovereignty**: Student settings MUST ONLY show active published languages (`isPublished: true`). If a student's active language is disabled by Admin, auto-fallback to `res.data[0].code` dynamically.
- **Evaluation Calibration**: Do NOT modify the 10-level CEFR/NCLC benchmark matrix in `writing.service.ts` or `exam.$paperId.tsx`.
- **TCF Listening Audio CBT Rules**: Questions 1 to 29 in Compréhension Orale MUST include the spoken question prompt (*"Écoutez la question. Question N°[X] : [Prompt]"*) appended to the audio transcript.

---

### Rule 4: Error Boundary & Graceful Degradation
- All main routes and critical widgets MUST remain wrapped in React `<ErrorBoundary>` containers.
- In case of network errors or missing third-party keys (e.g. Resend email API or ElevenLabs TTS), the system MUST gracefully fall back (e.g., auto-filling `devOtpCode` or using Web Speech / Kokoro TTS) so no page ever crashes or displays raw error screens to students.

---

### Rule 5: MANDATORY ISOLATION OF COMPLETED MODULES
- `authenticListeningAdvancedBank.ts`, `authenticReadingMasterBank.ts`, `authenticWritingMasterBank.ts`, and all Listening/Reading/Writing question handlers are 100% COMPLETED and MUST NEVER BE TOUCHED OR MODIFIED IN ANY WAY.

