import { parseLessonFromMarkdown } from '../services/markdownLessonParser';
import { validateChapterLessonsCount } from '../services/markdownImport.service';

console.log('=== MULTI-LEVEL SYNTHETIC PARSER TEST (A1 - C2) ===\n');

// 1. Synthetic B1 Chapter (7 lessons: L1-L5 skills, L6 Integrated, L7 Review)
const b1Markdown = `
# Lesson 1: B1 Reading Skills
**Anchor Skill:** Reading (R)
**Lesson Title:** Deep Reading

## Warm-Up
Warmup content.

## Lesson Explanation
Explanation.

## Practice Exercises
Q1: Multiple Choice
- A) Option 1
- B) Option 2
Answer: A

# Lesson 2: B1 Writing Skills
**Anchor Skill:** Writing (W)
**Lesson Title:** Opinion Essay

## Warm-Up
Warmup content.

# Lesson 3: B1 Listening Skills
**Anchor Skill:** Listening (L)
**Lesson Title:** Radio Interview

## Warm-Up
Warmup content.

# Lesson 4: B1 Speaking Skills
**Anchor Skill:** Speaking (S)
**Lesson Title:** Debate Practice

## Warm-Up
Warmup content.

# Lesson 5: B1 Advanced Reading
**Anchor Skill:** Reading (R)
**Lesson Title:** Editorial Analysis

## Warm-Up
Warmup content.

# Lesson 6: B1 Integrated Practice
**Anchor Skill:** Integrated (INT)
**Lesson Title:** Integrated Practice: Public Forum

## Warm-Up
Integrated warmup.

## Scene
Dialogue passage for public forum scene.

# Lesson 7: B1 Chapter Review & DELF B1 Assessment
**Anchor Skill:** Review (REV)
**Lesson Title:** Chapter Review & DELF B1 Assessment

## Chapter Vocabulary Bank
| Word | Meaning |
| Bonjour | Hello |

## Grammar Summary
Grammar summary for B1 Chapter 1.

## DELF Assessment
Section 1: Listening
Instructions: Listen to the passage.
`;

// 2. Synthetic C2 Capstone Chapter (6 lessons: L1-L4 skills, L5 Integrated, L6 Review Capstone with Arc Recap)
const c2CapstoneMarkdown = `
# Lesson 1: C2 Nuance
**Anchor Skill:** Reading (R)
**Lesson Title:** Literary Rhetoric

## Warm-Up
Warmup content.

# Lesson 2: C2 Stylistics
**Anchor Skill:** Writing (W)
**Lesson Title:** Academic Discourse

## Warm-Up
Warmup content.

# Lesson 3: C2 Listening
**Anchor Skill:** Listening (L)
**Lesson Title:** Philosophical Lecture

## Warm-Up
Warmup content.

# Lesson 4: C2 Speaking
**Anchor Skill:** Speaking (S)
**Lesson Title:** High-Level Debate

## Warm-Up
Warmup content.

# Lesson 5: C2 Integrated Practice
**Anchor Skill:** Integrated (INT)
**Lesson Title:** Integrated Practice: Philosophical Defense

## Scene
Philosophical discourse passage for C2 capstone.

# Lesson 6: C2 Final Level Review & DALF C2 Capstone
**Anchor Skill:** Review (REV)
**Lesson Title:** C2 Final Level Review & DALF C2 Capstone

## Chapter Vocabulary Bank
| Term | Definition |
| Epistémologie | Theory of knowledge |

## Grammar Summary
Grammar summary for C2.

## Grammar & Vocabulary Arc Recap
Comprehensive C1-C2 Master Arc Recap covering all advanced nuances across the curriculum.

## DELF Assessment
Section 1: Listening
Instructions: Listen to the passage.
`;

// Test 1: B1 Chapter 1 (7 lessons expected)
console.log('--- Testing B1 Chapter 1 (7 Lessons) ---');
const b1Lessons = parseLessonFromMarkdown(b1Markdown, 'B1', 1);
const b1Val = validateChapterLessonsCount('B1', b1Lessons.length);
console.log(`Parsed ${b1Lessons.length} lessons (Validation: ${b1Val.valid ? 'VALID (7 expected)' : b1Val.warning})`);

const b1Int = b1Lessons.find(l => l.anchorSkill === 'integrated');
const b1Rev = b1Lessons.find(l => l.anchorSkill === 'review');

console.log(`Integrated Lesson: ID=${b1Int?.lessonId}, Title="${b1Int?.title}", Skill=${b1Int?.anchorSkill}`);
console.log(`Review Lesson: ID=${b1Rev?.lessonId}, Title="${b1Rev?.title}", Skill=${b1Rev?.anchorSkill}`);

// Verify passage inheritance for B1 Review
const b1DelfSource = b1Rev?.assessment?.sections?.[0]?.sourceText;
console.log(`DELF Listening Source Text Inherited: "${b1DelfSource}"`);

// Test 2: C2 Chapter 6 (6 lessons expected, Capstone = true)
console.log('\n--- Testing C2 Chapter 6 Capstone (6 Lessons) ---');
const c2Lessons = parseLessonFromMarkdown(c2CapstoneMarkdown, 'C2', 6);
const c2Val = validateChapterLessonsCount('C2', c2Lessons.length);
console.log(`Parsed ${c2Lessons.length} lessons (Validation: ${c2Val.valid ? 'VALID (6 expected)' : c2Val.warning})`);

const c2Int = c2Lessons.find(l => l.anchorSkill === 'integrated');
const c2Rev = c2Lessons.find(l => l.anchorSkill === 'review');

console.log(`Integrated Lesson: ID=${c2Int?.lessonId}, Title="${c2Int?.title}", Skill=${c2Int?.anchorSkill}`);
console.log(`Review Lesson: ID=${c2Rev?.lessonId}, Title="${c2Rev?.title}", Skill=${c2Rev?.anchorSkill}, isLevelCapstone=${c2Rev?.isLevelCapstone}`);
console.log(`Arc Recap Content Detected: "${c2Rev?.arcRecap?.content?.slice(0, 70)}..."`);

// Verify passage inheritance for C2 Review
const c2DelfSource = c2Rev?.assessment?.sections?.[0]?.sourceText;
console.log(`DELF Listening Source Text Inherited: "${c2DelfSource}"`);

if (
  b1Lessons.length === 7 &&
  b1Int?.lessonId === 'b1-ch1-l6' &&
  b1Rev?.lessonId === 'b1-ch1-l7' &&
  b1DelfSource?.includes('public forum') &&
  c2Lessons.length === 6 &&
  c2Int?.lessonId === 'c2-ch6-l5' &&
  c2Rev?.lessonId === 'c2-ch6-l6' &&
  c2Rev?.isLevelCapstone === true &&
  c2Rev?.arcRecap?.content?.includes('Arc Recap') &&
  c2DelfSource?.includes('Philosophical discourse')
) {
  console.log('\n✅ ALL MULTI-LEVEL SYNTHETIC TESTS PASSED WITH 100% ACCURACY!');
} else {
  console.error('\n❌ SYNTHETIC TEST FAILED!');
  process.exit(1);
}
