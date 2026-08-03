import { parseLessonFromMarkdown } from '../services/markdownLessonParser';
import { validateChapterLessonsCount } from '../services/markdownImport.service';

console.log('=== MULTI-LANGUAGE SYNTHETIC TEST (SpanishPrep / GermanPrep) ===\n');

// Synthetic SpanishPrep A1 Chapter 1 Markdown
const spanishMarkdown = `
# Lesson 1: Spanish Greetings (¡Hola! / Buenos días)
**Anchor Skill:** Reading (R)
**Lesson Title:** Basic Spanish Greetings

## Warm-Up
Think of common greetings in Spanish.

## Lesson Explanation
Spanish greetings change by time of day: ¡Buenos días!, ¡Buenas tardes!, ¡Buenas noches!

## Vocabulary
| Spanish | English | Pronunciation | Example |
| ¡Hola! | Hello | oh-lah | ¡Hola! ¿Cómo estás? |
| Buenos días | Good morning | bweh-nos dee-as | Buenos días, señora. |

## Practice Exercises
Q1: Multiple Choice
What is the formal morning greeting in Spanish?
a) ¡Hola! b) Buenos días c) Buenas noches d) Hasta luego
Answer: b) Buenos días

# Lesson 2: Introducing Yourself in Spanish
**Anchor Skill:** Speaking (S)
**Lesson Title:** Me llamo...

## Warm-Up
Practice saying your name in Spanish.

# Lesson 3: Asking Names in Spanish
**Anchor Skill:** Listening (L)
**Lesson Title:** ¿Cómo te llamas?

## Warm-Up
Listening warmup.

# Lesson 4: How Are You in Spanish
**Anchor Skill:** Writing (W)
**Lesson Title:** ¿Cómo estás?

## Warm-Up
Writing warmup.

# Lesson 5: Courtesy Expressions in Spanish
**Anchor Skill:** Reading (R)
**Lesson Title:** Por favor y Gracias

## Warm-Up
Courtesy warmup.

# Lesson 6: Tú vs Usted in Spanish
**Anchor Skill:** Listening (L)
**Lesson Title:** Formal vs Informal Spanish

## Warm-Up
Register warmup.

# Lesson 7: Integrated Practice: First Encounter in Madrid
**Anchor Skill:** Integrated (INT)
**Lesson Title:** Integrated Practice: First Encounter in Madrid

## Warm-Up
Integrated warmup.

## Scene
Dialogue passage in Madrid café between Carlos and Elena.

# Lesson 8: Spanish Chapter Review & DELE A1 Assessment
**Anchor Skill:** Review (REV)
**Lesson Title:** Spanish Chapter Review & DELE A1 Assessment

## Chapter Vocabulary Bank
| Word | Translation |
| ¡Hola! | Hello |

## Grammar Summary
Consolidated Spanish grammar reference for A1 Chapter 1.

## DELF Assessment
Section 1: Listening
Instructions: Listen to the Madrid dialogue passage.
`;

const lessons = parseLessonFromMarkdown(spanishMarkdown, 'A1', 1);
const validation = validateChapterLessonsCount('A1', lessons.length);

console.log(`Parsed ${lessons.length} lessons for SpanishPrep A1 Chapter 1`);
console.log(`Curriculum Validation: ${validation.valid ? 'VALID (8 expected for A1)' : validation.warning}`);

const intLesson = lessons.find(l => l.anchorSkill === 'integrated');
const revLesson = lessons.find(l => l.anchorSkill === 'review');

console.log(`Integrated Lesson: ID=${intLesson?.lessonId}, Skill=${intLesson?.anchorSkill}`);
console.log(`Review Lesson: ID=${revLesson?.lessonId}, Skill=${revLesson?.anchorSkill}`);

const inheritedListeningText = revLesson?.assessment?.sections?.[0]?.sourceText;
console.log(`DELE Listening Source Text Inherited: "${inheritedListeningText}"`);

if (
  lessons.length === 8 &&
  validation.valid &&
  intLesson?.anchorSkill === 'integrated' &&
  revLesson?.anchorSkill === 'review' &&
  inheritedListeningText?.includes('Madrid café')
) {
  console.log('\n✅ SECOND LANGUAGE SYNTHETIC PARSER TEST PASSED 100%!');
} else {
  console.error('\n❌ SECOND LANGUAGE SYNTHETIC PARSER TEST FAILED!');
  process.exit(1);
}
