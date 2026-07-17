# FrancPrep Lesson Parser & Renderer Spec
### Hand this file + `lesson.schema.json` + `example-lesson.json` to the engineering agent together. Do not summarize this — implement it exactly as written.

---

## 0. The core problem being fixed

The current parser flattens every question in a lesson document into one undifferentiated list, with no memory of which section (Reading vs. Listening vs. Practice Exercises) each question belongs to. That's why the UI scrolls endlessly and grades one question at a time instead of batching by section.

**The fix is a data modeling fix, not a rendering fix.** Every lesson must be stored as one JSON document with section fields that are never merged — see `lesson.schema.json` for the enforced shape. Once the data is shaped correctly, the rendering logic becomes trivial and identical everywhere.

---

## 1. A lesson is a sequence of pages — never one scrollable document

Render exactly these pages, in this exact order, for every lesson, every chapter, every level:

| # | Page | Source field | Has a graded exercise block? |
|---|---|---|---|
| 1 | Warm-Up | `warmUp` | No |
| 2 | Lesson Explanation | `explanation` | No |
| 3 | Vocabulary | `vocabulary[]` | No |
| 4 | Grammar | `grammar` | No |
| 5 | Grammar Drill | `grammarDrills.questions[]` | **Yes** |
| 6 | Reading | `reading` (text + translation, then `reading.questions[]`) | **Yes** |
| 7 | Listening | `listening` (transcript + translation, then `listening.questions[]`) | **Yes** |
| 8 | Speaking | `speaking` | No (self-practice, not auto-graded) |
| 9 | Writing | `writing` | No (self-check against model answer + checklist, not auto-graded) |
| 10 | Practice Exercises | `practiceExercises.questions[]` | **Yes** |
| 11 | Mini Review & Self-Assessment | `miniReview`, `selfAssessment[]` | No |

No page ever borrows content from another page's field. If the parser can't confidently assign a chunk of text to one of these eleven fields, it must fail the import and report the exact line range it couldn't place — **never silently drop it into the nearest array.**

---

## 2. The one universal exercise-block interaction pattern

Every field marked "Yes" above (`grammarDrills.questions`, `reading.questions`, `listening.questions`, `practiceExercises.questions`) is rendered by **the same single generic component**. There is no per-section custom exercise UI anywhere in the app. That component's behavior, exactly:

1. Show **one question at a time**. Never a scrolling list of questions.
2. **Next / Previous** buttons move between questions within the current block. Answers already given are held in local state — moving forward or back never submits anything.
3. A **Submit** button appears only once the user is on the last question of the block. Submitting grades **every question in that block at once** — never one at a time, never on a per-question basis.
4. After submit, show, per question: correct/incorrect, the correct answer, and the `explanation` field. Also show a block-level score (e.g., "3/4 correct").
5. Two actions are then available: **"Try Again"** (clears this block's answers only, returns to question 1 of this same block) and **"Continue"** (advances to the next page in the sequence above).
6. This exact five-step behavior is identical whether the block is a Grammar Drill with 2 questions or a Practice Exercises block with 7 — the component doesn't know or care which section it's rendering. It only reads `type`, `prompt`, `options`, `correctAnswer`, and `explanation` off each question object (see schema).

---

## 3. Question type rendering (all types share the same block behavior above; only the input widget differs)

| `type` value | Input widget shown |
|---|---|
| `multiple_choice` | Radio buttons from `options[]` |
| `true_false` | Two buttons: True / False |
| `fill_blank` | A single text input |
| `matching` | Two columns built from `pairs[]`, connect left↔right |
| `ordering` | Draggable/reorderable list built from `items[]` |
| `short_answer` | A textarea (graded as self-check against `correctAnswer`, shown after submit as a model answer, not string-matched) |
| `translation` | A textarea (same self-check treatment as `short_answer`) |

---

## 4. Parsing rule (source markdown → JSON)

The source lesson documents use fixed `#` headers, always in this order: `# Warm-Up`, `# Lesson Explanation`, `# Vocabulary`, `# Grammar` (its `Mini Drills` sub-section is pulled OUT into `grammarDrills.questions`, not left inside `grammar`), `# Reading` (its `Comprehension Questions` + `Answer Key` merge into `reading.questions`), `# Listening` (same pattern into `listening.questions`), `# Speaking`, `# Writing`, `# Practice Exercises` (its own `Answer Key` merges in the same way), `# Mini Review`, `# Self Assessment`.

Parsing algorithm:
1. Split the source document on `#`-level headers into named sections.
2. Map each named section to exactly one schema field per the table in §1. Reject anything unmapped.
3. Within `# Grammar`, `# Reading`, `# Listening`, and `# Practice Exercises`, further split out any embedded question list + its answer key into that field's `questions[]` array, converting each Q/A pair into the shape in §3.
4. Validate the resulting JSON document against `lesson.schema.json` **before** insert. Reject and log (don't silently coerce) any document that fails validation.
5. Only a document that passes schema validation gets written to MongoDB.

---

## 5. This structure is universal

Every one of the 436 lessons across all six levels (A1–C2) follows this exact template, in this exact section order. There is no per-chapter or per-level variation in structure — only content differs. The schema and this parsing rule apply unchanged to every lesson you seed, now and going forward.

---

## 7. Explicit anti-patterns — the exact bugs you're currently seeing

These two failure modes are common enough, and specific enough to what's currently broken, that they need to be named directly rather than left as an implied consequence of the rules above.

**Bug: the answer key shows before the student submits.**
Hard rule: `correctAnswer` and `explanation` must **never** be sent to the frontend, or rendered anywhere on screen, until *after* that question block's Submit has been pressed. Practically, this means either (a) the API response for an in-progress lesson strips `correctAnswer`/`explanation` from every question until a submit event is received for that block, or (b) the frontend receives the full data but is contractually forbidden from rendering those fields pre-submit — option (a) is safer, since it can't be defeated by a frontend bug or by inspecting the network tab. **Tell the agent to implement (a).**

**Bug: multiple-choice/true-false questions render with no selectable options — just text.**
This means the parser produced a question object with `type: "multiple_choice"` or `"true_false"` but an empty or missing `options` array — which `lesson.schema.json` already rejects at validation time (see the `allOf` conditional requirements in the schema), **but only if validation is actually being run before insert.** If this bug is showing up in the live app, it almost certainly means documents are reaching MongoDB *without* passing through schema validation first — i.e., Step 4 of the parsing algorithm in §4 above is being skipped or bypassed somewhere in the current pipeline. Tell the agent this specifically: find where lessons are currently being written to MongoDB and confirm schema validation is actually wired into that write path, not just written as a file that nothing calls.

---

## 8. What "done" looks like

- Every lesson document in MongoDB validates cleanly against `lesson.schema.json`.
- Opening any lesson in the app shows exactly the 11 pages above, in order, with a page-navigation control (not a single long scroll).
- Every exercise block (Grammar Drill, Reading, Listening, Practice Exercises) behaves identically: one question at a time → Next/Previous → Submit-all-at-once on the last question → per-question feedback + score → Try Again / Continue.
- No exercise question ever appears grade-as-you-go, and no two sections' questions are ever mixed into one list.
- **No answer key or explanation is ever visible before that block's Submit is pressed — confirmed by checking the actual API response payload during an in-progress attempt, not just the UI.**
- **Every multiple_choice and true_false question renders visible, selectable options — confirmed by opening several lessons already seeded in MongoDB, not just the one re-parsed sample from step 7 above.**
