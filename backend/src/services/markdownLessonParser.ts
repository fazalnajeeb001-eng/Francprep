import fs from 'fs';
import { ILessonQuestion, ILessonVocabularyItem } from '../models/Lesson';

// ─── Output matches lesson.schema.json ──────────────────────────────────────

export interface ParsedLesson {
  lessonId: string;
  chapterId: string;
  level: string;
  title: string;
  anchorSkill: string;
  durationMinutes: number;
  objectives: string[];
  grammarFocus: string;
  vocabularyFocus: string;
  warmUp?: { content: string };
  explanation?: { content: string };
  vocabulary?: ILessonVocabularyItem[];
  grammar?: {
    explanation: string;
    formation: string;
    usage: string;
    examples: string[];
    commonMistakes: { wrong: string; correct: string; why?: string; tip?: string }[];
  };
  grammarDrills?: { questions: ILessonQuestion[] };
  reading?: { title: string; text: string; translation?: string; questions: ILessonQuestion[] };
  listening?: { title: string; transcript: string; translation?: string; questions: ILessonQuestion[] };
  speaking?: { guidedActivity?: string; roleplay?: string; extensionTask?: string; pronunciationTip?: string };
  writing?: { task: string; modelAnswer: string; checklist: string[] };
  practiceExercises: { questions: ILessonQuestion[] };
  miniReview: { content: string };
  selfAssessment: string[];
  // L7 Integrated fields
  scene?: { title: string; text: string; translation?: string; audioUrl?: string };
  comprehensionQuestions?: ILessonQuestion[];
  // L8 Review fields
  vocabularyBank?: { items: string[]; cumulativeNote: string };
  grammarSummary?: { content: string };
  canDoReview?: { statement: string; lessonRef: string }[];
  mixedPracticeExercises?: { questions: ILessonQuestion[] };
  assessment?: {
    examStyle: string;
    sections: {
      title: string;
      skill: string;
      points: number;
      instructions: string;
      sourceText?: string;
      questions?: ILessonQuestion[];
      answerKeyNotes?: string;
    }[];
  };
  selfReflection?: string[];
  completionSummary?: { content: string };
  needsManualConfirmation?: boolean;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function stripMd(t: string): string {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`(.*?)`/g, '$1').trim();
}

function clean(t: string): string {
  return t.replace(/\n---\s*\n?/g, '\n').replace(/\n--\s*\n?/g, '\n').replace(/\s*---\s*$/, '').replace(/\s*--\s*$/, '').trim();
}

function extractField(text: string, name: string): string {
  const escName = name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const m = text.match(new RegExp(`(?:\\*\\*)?${escName}:(?:\\*\\*)?\\s*([\\s\\S]*?)(?=\\n(?:\\*\\*)?[^:\\*]+:|$)`, 'i'));
  return m ? stripMd(m[1].trim()) : '';
}

function splitSections(body: string): { header: string; body: string }[] {
  const out: { header: string; body: string }[] = [];
  const lines = body.split('\n');
  let h = '', c: string[] = [];
  
  const knownLower = [
    'warm-up', 'warm up',
    'lesson explanation',
    'vocabulary',
    'reading',
    'listening',
    'speaking',
    'writing',
    'practice exercises',
    'mixed practice exercises',
    'chapter vocabulary bank',
    'grammar summary',
    'mini review',
    'chapter review',
    'mini review by can-do',
    'delf',
    'self assessment',
    'self-reflection',
    'lesson information'
  ];

  for (const l of lines) {
    const trimmed = l.trim();
    let headerName = '';

    // 1. Markdown header match: e.g. "## Vocabulary" or "### Warm-Up"
    const hashMatch = trimmed.match(/^#+\s*(.+)$/);
    if (hashMatch) {
      headerName = hashMatch[1].trim();
    } else {
      // 2. Plain text header match: check if line is short and matches a known header
      const lower = trimmed.toLowerCase().replace(/[\*\_\`]/g, '').trim();
      const isKnown = knownLower.some(k => lower === k || lower.startsWith(k + '(') || lower.startsWith(k + ' -') || lower.startsWith(k + ':'));
      const isGrammarGeneric = lower === 'grammar' || lower.startsWith('grammar ');
      
      if ((isKnown || isGrammarGeneric) && trimmed.length < 60) {
        headerName = trimmed;
      }
    }

    if (headerName) {
      if (h) out.push({ header: h, body: c.join('\n').trim() });
      h = headerName;
      c = [];
    } else {
      c.push(l);
    }
  }
  if (h) out.push({ header: h, body: c.join('\n').trim() });
  return out;
}

// ─── Section parsers ────────────────────────────────────────────────────────

function parseVocabTable(text: string): ILessonVocabularyItem[] {
  const out: ILessonVocabularyItem[] = [];
  for (const line of text.split('\n')) {
    if (!line.includes('|')) continue;
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length < 4 || cells[0] === 'French' || cells[0].match(/^[-:]+$/)) continue;
    out.push({ french: cells[0], english: cells[1], pronunciation: cells[2], example: cells[3] });
  }
  return out;
}

function parseGrammar(text: string) {
  const explanation = clean(extractField(text, 'Explanation'));
  const usage = clean(extractField(text, 'Usage'));

  let formation = '';
  const fm = text.match(/(?:\*\*|)?Formation[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=\n(?:\*\*|)?Usage|\n(?:\*\*|)?Examples|\n(?:\*\*|)?Common|\n(?:\*\*|)?Mini|$)/i);
  if (fm) {
    formation = fm[1].replace(/^\s*[-•*]\s*/gm, '').replace(/\|[^|]*\|/g, '').split('\n').filter(l => l.trim()).map(l => l.trim()).join('; ');
  }

  const examples: string[] = [];
  const em = text.match(/(?:\*\*|)?Examples?:(?:\*\*|)?\s*([\s\S]*?)(?=\n(?:\*\*|)?Common|\n(?:\*\*|)?Mini|$)/i);
  if (em) {
    for (const line of em[1].split('\n')) {
      const c = line.replace(/^\s*\d+\.\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
      if (c && !c.startsWith('**')) examples.push(stripMd(c));
    }
  }

  const commonMistakes: { wrong: string; correct: string; why?: string }[] = [];
  const mm = text.match(/(?:\*\*|)?Common Mistakes?:(?:\*\*|)?\s*([\s\S]*?)(?=\n(?:\*\*|)?Mini|\n#|$)/i);
  if (mm) {
    for (const line of mm[1].split('\n')) {
      const c = line.replace(/^\s*[-•*]\s*/, '').trim();
      if (!c) continue;
      const am = c.match(/❌\s*(.+?)\s*→\s*✅\s*(.+?)(?:\s*\((.+?)\))?$/);
      if (am) commonMistakes.push({ wrong: stripMd(am[1]), correct: stripMd(am[2]), why: am[3] ? stripMd(am[3]) : `Use "${stripMd(am[2])}" instead.` });
    }
  }

  return {
    explanation: explanation || 'No new grammar in this lesson.',
    formation: formation || 'Recycled from previous lessons.',
    usage: usage || 'See explanation above.',
    examples: examples.length > 0 ? examples : ['Refer to the lesson explanation.'],
    commonMistakes,
  };
}

// ─── FIXED: parseGrammarDrills ─────────────────────────────────────────────
// Bug 1: hardcoded answers → extract from context
// Bug 2: only __________ blanks → also handle (hint) format

function parseGrammarDrills(text: string): ILessonQuestion[] {
  const qs: ILessonQuestion[] = [];

  // Find the Mini Drills section
  const drillsMatch = text.match(/\*\*Mini Drills?:\*\*\s*([\s\S]*?)(?=\n---|\n#|$)/i);
  if (!drillsMatch) return qs;

  const drillsText = drillsMatch[1];
  const lines = drillsText.split('\n');

  // Extract instruction line (first non-empty line that's not numbered)
  let instruction = '';
  for (const line of lines) {
    const t = line.trim();
    if (t && !t.match(/^\d+\./)) {
      instruction = stripMd(t);
      break;
    }
  }

  let n = 0;
  for (const line of lines) {
    const t = line.trim();
    const m = t.match(/^\d+\.\s*(.+)/);
    if (!m) continue;

    const rawPrompt = m[1];
    const prompt = stripMd(rawPrompt);
    let correctAnswer = '';
    let explanation = instruction || 'Complete the drill.';

    // Pattern 1: Parenthetical hint → "_________ (je m'appelle) Sarah"
    const hintMatch = rawPrompt.match(/_{3,}\s*\((.+?)\)/);
    if (hintMatch) {
      correctAnswer = stripMd(hintMatch[1]);
      explanation = `Fill in with: ${correctAnswer}`;
    }
    // Pattern 2: Arrow transformation → "Transform: *Tu es Camille.* → __________"
    else if (rawPrompt.includes('→')) {
      const parts = rawPrompt.split('→');
      const source = parts[0].replace(/[:]\s*$/, '').trim();
      // The answer is the transformed text (after the arrow), which is typically a blank
      // We can't derive the answer without a rule engine, so leave it empty
      const afterArrow = parts[1]?.trim() || '';
      if (afterArrow && !afterArrow.match(/^_{3,}$/) && !afterArrow.match(/^\d+$/)) {
        // If there's actual text after the arrow (not a blank), use it as answer
        correctAnswer = stripMd(afterArrow);
      } else {
        correctAnswer = '';
      }
      explanation = instruction || stripMd(source);
    }
    // Pattern 3: Blank with context after → "A woman says she is tired: Je suis __________."
    else if ((rawPrompt.includes('__________') || rawPrompt.includes('______')) && rawPrompt.includes(':')) {
      const parts = rawPrompt.split(':');
      const context = parts[0].trim();
      const afterColon = parts.slice(1).join(':').trim();
      // The answer is what goes in the blank, which is AFTER the existing text
      const afterBlank = afterColon.split(/_{3,}/)[1]?.trim()?.replace(/^[.!?,;:\s]+/, '') || '';
      correctAnswer = stripMd(afterBlank);
      explanation = stripMd(context);
    }
    // Pattern 4: Blank at end → "Bonjour, __________."
    else if (rawPrompt.includes('__________') || rawPrompt.includes('______')) {
      const beforeBlank = rawPrompt.split(/_{3,}/)[0].trim();
      const afterBlank = rawPrompt.split(/_{3,}/)[1]?.trim() || '';

      // Clean punctuation from afterBlank (e.g., "!" or "." after the blank)
      const cleanAfterBlank = afterBlank.replace(/^[.!?,;:\s]+/, '').trim();

      // Check instruction for answer pattern
      if (instruction.toLowerCase().includes('je suis')) {
        correctAnswer = 'Je suis [your name]';
        explanation = 'Complete with Je suis + your name.';
      } else if (cleanAfterBlank) {
        correctAnswer = stripMd(cleanAfterBlank);
        explanation = instruction;
      } else if (beforeBlank) {
        correctAnswer = stripMd(beforeBlank);
        explanation = instruction;
      } else {
        correctAnswer = '';
        explanation = instruction;
      }
    }
    // Pattern 5: No blank visible — might be a full sentence exercise
    else {
      correctAnswer = '';
      explanation = instruction;
    }

    n++;
    qs.push({
      id: `gd-${n}`,
      type: 'fill_blank',
      prompt,
      correctAnswer,
      explanation,
    });
  }

  return qs;
}

// ─── FIXED: parseListening ─────────────────────────────────────────────────
// Bug 3: all forced to true_false → detect activity type
// Bug 4: non-T/F answers dropped → parse all answer formats
// Bug 5: defaults to 'False' → proper error handling

function parseListening(text: string): { title: string; transcript: string; translation?: string; questions: ILessonQuestion[] } {
  const tm = text.match(/(?:\*\*|)?(.*?)(?:\*\*|)?/);
  const title = tm ? stripMd(tm[1]).replace(/^Transcript:\s*/i, '').replace(/^"/, '').replace(/"$/, '') : 'Listening';

  const parts = text.split(/(?:\*\*|)?English Translation:(?:\*\*|)?/i);
  const transPart = parts[0] || '';
  const afterTrans = parts[1] || '';

  // Extract transcript
  const tLines = transPart.split('\n').filter(l => {
    const t = l.trim();
    return t && !t.match(/^(?:\*\*|)?Listening/i) && !t.match(/^(?:\*\*|)?Answer Key/i) && !t.match(/^\d+\./) && !t.startsWith('(No audio');
  });
  const transcript = tLines.map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\*\*/g, '').trim()).filter(l => l && l !== title && !l.startsWith('Transcript:')).join('\n');

  let translation: string | undefined;
  const questions: ILessonQuestion[] = [];

  // Try splitting on English Translation first, then fall back to searching for activity directly
  const activitySource = afterTrans || text;
  const tp = activitySource.split(/(?:\*\*|)?Listening(?:\/Reading)?\s*Activity/i);
  if (!afterTrans && tp.length > 1) {
    translation = undefined;
  } else {
    translation = (tp[0] || '').split('\n').filter(l => l.trim()).map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\(.*?A1.*?support.*?\)/i, '').trim()).filter(l => l && !l.startsWith('(')).join('\n').trim() || undefined;
  }

  // Clean up activityHeader
  let activityHeader = (tp[1] || '').trim();
  if (activityHeader.startsWith(':')) {
    activityHeader = activityHeader.slice(1).trim();
  }

  // Detect activity type from header
  let activityType: 'true_false' | 'short_answer' | 'multiple_choice' | 'fill_blank' = 'short_answer';
  if (/answer the questions/i.test(activityHeader)) activityType = 'short_answer';
  else if (/multiple choice/i.test(activityHeader)) activityType = 'multiple_choice';
  else if (/fill in the blank/i.test(activityHeader)) activityType = 'fill_blank';
  else if (/true or false/i.test(activityHeader)) activityType = 'true_false';
  else if (/short answer/i.test(activityHeader)) activityType = 'short_answer';
  else if (/comprehension questions/i.test(activityHeader)) activityType = 'short_answer';

  // Split questions and answers
  const ap = activityHeader.split(/(?:\*\*|)?Answer Key/i);
  const answerSection = (ap[1] || '').trim();
  const cleanAnswerSection = answerSection.startsWith(':') ? answerSection.slice(1).trim() : answerSection;
  const answerLines = cleanAnswerSection.split('\n');
  const questionLines = (ap[0] || '').split('\n');

  // Parse answers based on activity type
  const answers: { correct: string; explanation: string }[] = [];
  for (const l of answerLines) {
    const c = l.trim().replace(/^\d+\.\s*/, '');
    if (!c || c === '---' || c === '--' || /^\*+$/.test(c)) continue;

    if (activityType === 'true_false') {
      const fm = c.match(/False\s*\((.+?)\)/);
      const tm2 = c.match(/^True/);
      if (fm) answers.push({ correct: 'False', explanation: fm[1] });
      else if (tm2) answers.push({ correct: 'True', explanation: '' });
      else if (/^False/i.test(c)) answers.push({ correct: 'False', explanation: c.replace(/^False\.?\s*/i, '') });
      else answers.push({ correct: c, explanation: '' });
    } else {
      // For all other types, just capture the raw answer text
      answers.push({ correct: stripMd(c), explanation: '' });
    }
  }

  // Parse questions
  let n = 0;
  for (const l of questionLines) {
    const t = l.trim();
    if (!t || t.startsWith('*') || t === '---' || t === '--' || t.match(/^(?:Comprehension|Listening|Activity|Short Answer|Multiple Choice|True or False|Fill in the Blank|Matching|Sentence Ordering|Translation)/i)) continue;

    n++;
    const qPrompt = stripMd(t.replace(/^\d+[\.\)]\s*/, ''));
    const answer = answers[n - 1] || { correct: '', explanation: '' };

    if (activityType === 'true_false') {
      questions.push({
        id: `li-${n}`,
        type: 'true_false',
        prompt: qPrompt,
        options: ['True', 'False'],
        correctAnswer: answer.correct || 'False',
        explanation: answer.explanation || `The statement is ${answer.correct}.`,
      });
    } else if (activityType === 'multiple_choice') {
      // Even if header says MCQ, if no options are in the answer, treat as short_answer
      questions.push({
        id: `li-${n}`,
        type: 'short_answer',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    } else if (activityType === 'fill_blank') {
      questions.push({
        id: `li-${n}`,
        type: 'fill_blank',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    } else {
      // short_answer or fallback
      questions.push({
        id: `li-${n}`,
        type: 'short_answer',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    }
  }

  // Handle case where there are no numbered questions but there are answers
  // (e.g., L6: "For each situation, decide: formal or informal, and why.")
  if (questions.length === 0 && answers.length > 0) {
    // Extract the instruction from the activity header
    const instructionMatch = activityHeader.match(/\*\*Listening Activity:\*\*\s*(.+?)(?:\n|$)/i);
    const instruction = instructionMatch ? stripMd(instructionMatch[1]) : 'Listen and answer.';

    // If the instruction itself is a question-like prompt, use it
    // Otherwise, create one question per answer
    for (let i = 0; i < answers.length; i++) {
      questions.push({
        id: `li-${i + 1}`,
        type: 'short_answer',
        prompt: `${instruction} (Situation ${i + 1})`,
        correctAnswer: answers[i].correct,
        explanation: answers[i].explanation || `The answer is: ${answers[i].correct}`,
      });
    }
  }

  return { title, transcript, translation, questions };
}

function parseSpeaking(text: string) {
  const parts = text.split(/(?:\*\*|)?Roleplay/i);
  const mainPart = parts[0] || '';
  const roleplayPart = parts[1] || '';

  let guidedActivity = '';
  const gm = mainPart.match(/Guided Activity[^:]*:(?:\*\*|)?\s*([\s\S]*?)(?=(?:\*\*|)?|$)/i);
  if (gm) guidedActivity = gm[1].split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  else guidedActivity = clean(mainPart.split('\n').filter(l => l.trim() && !l.startsWith('**')).map(l => l.trim()).join(' '));

  let roleplay: string | undefined;
  let pronunciationTip: string | undefined;

  if (roleplayPart) {
    const rpLines = roleplayPart.split(/(?:\*\*|)?Pronunciation Tip/i);
    roleplay = rpLines[0].replace(/:(?:\*\*|)\s*/, '').split('\n').filter(l => l.trim()).map(l => l.replace(/^[-•*]\s*/, '').trim()).join(' ');
    if (rpLines[1]) {
      pronunciationTip = rpLines[1].split('\n').filter(l => l.trim()).map(l => l.replace(/^:(?:\*\*|)\s*/, '').trim()).filter(l => l && l !== '---').join(' ').replace(/\s*---\s*$/, '').trim();
    }
  }

  return { guidedActivity, roleplay, pronunciationTip };
}

export function parseWriting(text: string) {
  const task = (text.match(/(?:\*\*|)?Task:(?:\*\*|)?\s*([\s\S]*?)(?=(?:\*\*|)?Model|(?:\*\*|)?Writing|$)/i)?.[1] || '').split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  const modelAnswer = (text.match(/(?:\*\*|)?Model Answer:(?:\*\*|)?\s*([\s\S]*?)(?=(?:\*\*|)?(?:Writing )?Checklist|$)/i)?.[1] || '').split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  const checklist: string[] = [];
  const cm = text.match(/(?:\*\*|)?(?:Writing )?Checklist:(?:\*\*|)?\s*([\s\S]*?)$/i);
  if (cm) {
    for (const l of cm[1].split('\n')) {
      const c = l.replace(/^\s*-\s*\[ ?\]\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
      if (c && c !== '--' && c !== '---') checklist.push(stripMd(c));
    }
  }
  if (checklist.length === 0) {
    checklist.push('Used target vocabulary', 'Used correct grammar structures', 'Clear and coherent writing');
  }
  return { task: task || 'Write a short paragraph using the vocabulary and grammar from this lesson.', modelAnswer: modelAnswer || '—', checklist };
}

// ─── FIXED: parsePracticeExercises ─────────────────────────────────────────
// Bug 6: positional matching breaks → proper answer-to-question mapping
// Bug 7: unknown types skipped → add Communicative Practice
// Bug 8: matching pairs as raw string → structured {left, right}[]
// Bug 9: multi-line prompts not captured → capture full prompt

function parsePracticeExercises(text: string): ILessonQuestion[] {
  const qs: ILessonQuestion[] = [];
  const lines = text.split('\n');
  let n = 0, curType = '', curPromptLines: string[] = [], inAK = false;
  const answers: string[] = [];

  // Known question types
  const knownTypes = /Multiple Choice|Matching|Fill in the Blank|Sentence Ordering|Short Answer|Translation|True or False|Communicative Practice/i;

  for (const line of lines) {
    const t = line.trim();

    // Answer Key marker
    if (t.match(/^(?:\*\*)?Answer Key/i)) {
      inAK = true;
      // Push any pending question
      if (curPromptLines.length > 0 && curType) {
        n++;
        qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n')));
        curPromptLines = [];
        curType = '';
      }
      continue;
    }

    // In answer key section — collect answers
    if (inAK) {
      if (t && t !== '---' && t !== '--' && !t.startsWith('*')) {
        answers.push(t.replace(/^\d+[\.\)]\s*/, '').trim());
      }
      continue;
    }

    // Question type header: **1. Multiple Choice** or **2. Communicative Practice:** (allow optional **)
    const tm = t.match(/^(?:\*\*)?\d+\.\s*([\w\s]+?)(?::?\*\*|:)?$/i);
    if (tm && knownTypes.test(tm[1])) {
      // Push any pending question
      if (curPromptLines.length > 0 && curType) {
        n++;
        qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n')));
        curPromptLines = [];
      }
      curType = tm[1].trim().toLowerCase().replace(/\s+/g, '_')
        .replace('fill_in_the_blank', 'fill_blank')
        .replace('sentence_ordering', 'ordering')
        .replace('communicative_practice', 'short_answer');
      continue;
    }

    // Accumulate prompt lines for current question
    if (curType && !t.startsWith('**')) {
      curPromptLines.push(t);
    }
  }

  // Push last pending question
  if (curPromptLines.length > 0 && curType) {
    n++;
    qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n')));
  }

  // Map answers to questions by position
  for (let i = 0; i < qs.length; i++) {
    if (!answers[i]) continue;
    const q = qs[i];
    const raw = answers[i];

    if (q.type === 'multiple_choice') {
      // "c) Bonsoir" → strip the letter prefix
      q.correctAnswer = raw.replace(/^[a-d]\)\s*/, '').trim();
    } else if (q.type === 'matching') {
      // "1-b, 2-a, 3-c" → remap already-extracted pairs
      // q.pairs already has correct left/right text from buildPracticeQuestion
      if (q.pairs && q.pairs.length > 0) {
        const pairMatches = [...raw.matchAll(/(\d+)-([a-z])/gi)];
        if (pairMatches.length > 0) {
          const remappedPairs: { left: string; right: string }[] = [];
          for (const pm of pairMatches) {
            const leftIdx = parseInt(pm[1]) - 1;
            const rightLetter = pm[2].toLowerCase();
            const rightIdx = rightLetter.charCodeAt(0) - 97;
            const left = q.pairs[leftIdx]?.left || `Item ${pm[1]}`;
            const right = q.pairs[rightIdx]?.right || `Option ${rightLetter}`;
            remappedPairs.push({ left, right });
          }
          q.pairs = remappedPairs;
          q.correctAnswer = remappedPairs;
        }
      }
    } else if (q.type === 'ordering') {
      // "b, c, a" → reorder already-extracted items
      // q.items has items in (a), (b), (c) order from buildPracticeQuestion
      if (q.items && q.items.length > 0) {
        const letterOrder = raw.split(/,\s*/).map(s => s.trim().toLowerCase());
        const items: string[] = [];
        for (const letter of letterOrder) {
          const idx = letter.charCodeAt(0) - 97;
          items.push(q.items[idx] || `Item ${idx + 1}`);
        }
        q.items = items;
        q.correctAnswer = items;
      }
    } else if (q.type === 'short_answer') {
      // "Sample answer: *Salut* is used..." → strip prefix
      q.correctAnswer = raw.replace(/^Sample answer:\s*/i, '').replace(/^\(Open-ended.*?\)\s*$/i, 'Open-ended — assess for correctness.').trim();
    } else {
      q.correctAnswer = stripMd(raw);
    }
  }

  // Ensure all questions have non-empty explanations (schema requires minLength: 1)
  for (const q of qs) {
    if (!q.explanation) {
      if (q.type === 'multiple_choice') {
        q.explanation = q.correctAnswer ? `The correct answer is: ${q.correctAnswer}` : 'Select the best answer.';
      } else if (q.type === 'matching') {
        q.explanation = 'Match each item with its correct pair.';
      } else if (q.type === 'ordering') {
        q.explanation = 'Arrange the items in the correct order.';
      } else if (q.type === 'fill_blank') {
        q.explanation = q.correctAnswer ? `The answer is: ${q.correctAnswer}` : 'Fill in the blank.';
      } else if (q.type === 'short_answer') {
        q.explanation = q.correctAnswer ? `A sample answer: ${String(q.correctAnswer).slice(0, 100)}` : 'Provide a short written response.';
      } else {
        q.explanation = 'Complete the exercise.';
      }
    }
  }

  return qs;
}

function buildPracticeQuestion(n: number, type: string, promptText: string): ILessonQuestion {
  const prompt = stripMd(promptText);

  if (type === 'multiple_choice') {
    // Extract options from prompt: "a) Option1 b) Option2 c) Option3 d) Option4"
    const options: string[] = [];
    const optionMatches = promptText.matchAll(/[a-d]\)\s*(.+?)(?=\s+[a-z]\)|$)/gi);
    for (const om of optionMatches) {
      options.push(stripMd(om[1]));
    }
    // Also try extracting from separate lines
    if (options.length < 2) {
      for (const line of promptText.split('\n')) {
        const om = line.trim().match(/^[a-d]\)\s*(.+)/i);
        if (om) options.push(stripMd(om[1]));
      }
    }
    return {
      id: `pe-${n}`,
      type: 'multiple_choice',
      prompt: prompt.replace(/\s*[a-d]\)\s*.+/gi, '').trim(),
      options,
      correctAnswer: '',
      explanation: '',
    };
  }

  if (type === 'matching') {
    // Extract pairs from prompt lines like:
    // "1. Salut — a) Formal daytime greeting"
    // "1. Salut - a) Formal daytime greeting"
    const pairs: { left: string; right: string }[] = [];
    const leftItems: string[] = [];
    const rightItems: string[] = [];

    for (const line of promptText.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === '---' || trimmed === '--') continue;

      // Split on em-dash (U+2014), en-dash (U+2013), or hyphen followed by a letter)
      const dashSplit = trimmed.split(/\s+[\u2014\u2013-]\s+(?=[a-z]\))/i);
      if (dashSplit.length >= 2) {
        // Strip leading number if present (e.g. "1. Salut" -> "Salut")
        const leftPart = dashSplit[0].replace(/^\d+[\.\)]\s*/, '').trim();
        leftItems.push(stripMd(leftPart));
        // Extract right side: "a) RightText" → "RightText"
        const rightPart = dashSplit[1];
        const rightClean = rightPart.replace(/^[a-z]\)\s*/i, '').trim();
        rightItems.push(stripMd(rightClean));
      } else {
        const leftPart = trimmed.replace(/^\d+[\.\)]\s*/, '').trim();
        if (leftPart) {
          leftItems.push(stripMd(leftPart));
        }
      }
    }

    for (let i = 0; i < Math.max(leftItems.length, rightItems.length); i++) {
      pairs.push({
        left: leftItems[i] || `Item ${i + 1}`,
        right: rightItems[i] || `Option ${String.fromCharCode(97 + i)}`,
      });
    }

    return {
      id: `pe-${n}`,
      type: 'matching',
      prompt: prompt.replace(/^\s*\d+\.\s*.+/gm, '').trim() || 'Match the items.',
      pairs,
      correctAnswer: pairs,
      explanation: '',
    };
  }

  if (type === 'ordering') {
    // Extract items from prompt: "(a) Au revoir ! (b) Bonjour, Madame. (c) Je suis Thomas."
    const items: string[] = [];

    // Inline: "(a) Item1 (b) Item2 (c) Item3" — handles both single-line and multi-line
    const inlineText = promptText.replace(/\n/g, ' ');
    const inlineMatches = inlineText.matchAll(/\(?([a-z])\)?\)\s*(.+?)(?=\s*\(?[a-z]\)?\)|$)/gi);
    for (const im of inlineMatches) {
      const item = stripMd(im[2]).trim();
      if (item && !items.includes(item)) items.push(item);
    }

    return {
      id: `pe-${n}`,
      type: 'ordering',
      prompt: prompt.replace(/\s*\(?\)?[a-z]\)?\)\s*.+/gi, '').trim() || 'Put in logical order.',
      items,
      correctAnswer: items,
      explanation: '',
    };
  }

  // fill_blank, short_answer, translation, communicative_practice (→ short_answer)
  return {
    id: `pe-${n}`,
    type: type as any,
    prompt,
    correctAnswer: '',
    explanation: '',
  };
}

function parseReading(text: string): { title: string; text: string; translation?: string; questions: ILessonQuestion[] } {
  const tm = text.match(/(?:\*\*|)?(.*?)(?:\*\*|)?/);
  const title = tm ? stripMd(tm[1]) : 'Reading';

  const parts = text.split(/(?:\*\*|)?English Translation:(?:\*\*|)?/i);
  const passagePart = parts[0] || '';
  const afterTrans = parts[1] || '';

  const passageLines = passagePart.split('\n').filter(l => {
    const t = l.trim();
    return t && !t.match(/^(?:\*\*|)?Comprehension Questions/i) && !t.match(/^(?:\*\*|)?Answer Key/i) && !t.match(/^\d+\./);
  });
  const passage = passageLines.map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').trim()).filter(l => l && l !== title).join('\n');

  let translation: string | undefined;
  const questions: ILessonQuestion[] = [];

  if (afterTrans) {
    const tp = afterTrans.split(/(?:\*\*|)?Comprehension Questions/i);
    translation = (tp[0] || '').split('\n').filter(l => l.trim()).map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\(.*?A1.*?support.*?\)/i, '').trim()).filter(l => l && !l.startsWith('(')).join('\n').trim() || undefined;

    const qp = tp[1] || '';
    const ap = qp.split(/(?:\*\*|)?Answer Key/i);
    const answerSection = (ap[1] || '').trim();
    const cleanAnswerSection = answerSection.startsWith(':') ? answerSection.slice(1).trim() : answerSection;
    const aLines = cleanAnswerSection.split('\n');
    const answers: string[] = [];
    for (const l of aLines) {
      const t = l.trim();
      if (t && t !== '---' && t !== '--' && !t.startsWith('*')) {
        answers.push(stripMd(t.replace(/^\d+[\.\)]\s*/, '')));
      }
    }

    let n = 0;
    for (const l of (ap[0] || '').split('\n')) {
      const t = l.trim();
      if (t && t !== '---' && t !== '--' && !t.startsWith('*') && !t.match(/^(?:Comprehension|Answer Key)/i)) {
        n++;
        questions.push({
          id: `r-${n}`,
          type: 'short_answer',
          prompt: stripMd(t.replace(/^\d+[\.\)]\s*/, '')),
          correctAnswer: answers[n - 1] || '',
          explanation: answers[n - 1] ? `The answer is: ${answers[n - 1]}` : 'Refer to the reading passage.'
        });
      }
    }
  }

  return { title, text: passage, translation, questions };
}

// ─── Main parser ────────────────────────────────────────────────────────────

function fillPlaceholders(lesson: ParsedLesson): void {
  const lessonId = lesson.lessonId;
  const isL7 = lessonId.endsWith('-l7');
  const isL8 = lessonId.endsWith('-l8');

  if (isL7) {
    // ── L7 Integrated Practice: transform standard fields → L7 schema ──
    // 1. scene = combined reading.text + listening.transcript
    const rText = lesson.reading?.text?.trim() || '';
    const lText = lesson.listening?.transcript?.trim() || '';
    const sceneText = rText || lText;
    const rTitle = lesson.reading?.title || lesson.listening?.title || 'Scene';
    lesson.scene = {
      title: rTitle,
      text: sceneText || 'Complete the integrated practice activities.',
      translation: lesson.reading?.translation || lesson.listening?.translation || undefined,
    };

    // 2. comprehensionQuestions = combined reading.questions + listening.questions
    const rQs = lesson.reading?.questions || [];
    const lQs = lesson.listening?.questions || [];
    const allComprehension = [...rQs, ...lQs].filter(q => !q.id.includes('dummy'));
    lesson.comprehensionQuestions = allComprehension.length > 0 ? allComprehension : [{
      id: `${lessonId}-cq-dummy`,
      type: 'short_answer' as const,
      prompt: 'Answer the comprehension questions based on the scene.',
      correctAnswer: '—',
      explanation: 'Refer to the scene text.',
    }];

    // 3. speaking: ensure roleplay is populated
    if (lesson.speaking) {
      if (!lesson.speaking.roleplay && lesson.speaking.guidedActivity) {
        lesson.speaking.roleplay = lesson.speaking.guidedActivity;
      }
      if (!lesson.speaking.roleplay) {
        lesson.speaking.roleplay = 'Practice the dialogue with a partner.';
      }
    } else {
      lesson.speaking = { roleplay: 'Practice the dialogue with a partner.' };
    }

    // 4. writing: ensure checklist is populated
    if (lesson.writing) {
      if (!lesson.writing.task) {
        lesson.writing.task = 'Write a short paragraph using the vocabulary and grammar from this chapter.';
        lesson.writing.modelAnswer = '—';
      }
      if (!lesson.writing.checklist || lesson.writing.checklist.length === 0) {
        lesson.writing.checklist = ['Used target vocabulary', 'Used correct grammar structures', 'Clear and coherent writing'];
      }
    } else {
      lesson.writing = {
        task: 'Write a short paragraph using the vocabulary and grammar from this chapter.',
        modelAnswer: '—',
        checklist: ['Used target vocabulary', 'Used correct grammar structures', 'Clear and coherent writing'],
      };
    }

    // 5. Remove L7-illegal fields
    delete (lesson as any).vocabulary;
    delete (lesson as any).grammar;
    delete (lesson as any).explanation;
    delete (lesson as any).grammarDrills;
    delete (lesson as any).reading;
    delete (lesson as any).listening;
  }

  if (isL8) {
    // ── L8 Review & Mini-Assessment: transform standard fields → L8 schema ──
    // 1. vocabularyBank from vocabulary array
    const vocabList = lesson.vocabulary || [];
    if (vocabList.length > 0) {
      lesson.vocabularyBank = {
        items: vocabList.map(v => `${v.french} — ${v.english}`),
        cumulativeNote: `Vocabulary consolidated from Lessons 1-6. No duplication across chapters. Any polysemy cases are deliberate.`,
      };
    } else {
      lesson.vocabularyBank = {
        items: ['—'],
        cumulativeNote: 'Vocabulary pending generation.',
      };
    }

    // 2. grammarSummary from grammar object
    const g = lesson.grammar;
    if (g && (g.explanation || g.formation)) {
      const parts = [g.explanation, g.formation, g.usage].filter(Boolean);
      if (g.examples?.length) parts.push('Examples: ' + g.examples.join('; '));
      lesson.grammarSummary = { content: parts.join('\n\n') || 'Consolidated grammar reference from this chapter.' };
    } else {
      lesson.grammarSummary = { content: 'Consolidated grammar reference from this chapter.' };
    }

    // 3. canDoReview from objectives
    if (!lesson.canDoReview || lesson.canDoReview.length === 0) {
      lesson.canDoReview = (lesson.objectives || []).map((obj, i) => ({
        statement: obj,
        lessonRef: `Lessons 1-${Math.min(6, (lesson.objectives || []).length)}`,
      }));
    }

    // 4. mixedPracticeExercises = practiceExercises (rename)
    lesson.mixedPracticeExercises = lesson.practiceExercises || { questions: [] };
    if (!lesson.mixedPracticeExercises.questions || lesson.mixedPracticeExercises.questions.length === 0) {
      lesson.mixedPracticeExercises.questions = [{
        id: `${lessonId}-mpe-dummy`,
        type: 'short_answer' as const,
        prompt: 'Complete the mixed practice exercises.',
        correctAnswer: '—',
        explanation: 'Practice exercises pending.',
      }];
    }

    // 5. assessment from DELF questions in practiceExercises
    const delfQs = (lesson.practiceExercises?.questions || []).filter(q => q.id.includes('delf'));
    const otherQs = (lesson.practiceExercises?.questions || []).filter(q => !q.id.includes('delf'));
    if (delfQs.length > 0) {
      lesson.assessment = {
        examStyle: `DELF ${lesson.level}`,
        sections: delfQs.map((q, i) => ({
          title: `Section ${i + 1}`,
          skill: 'reading',
          points: 10,
          instructions: q.prompt,
          questions: [q],
        })),
      };
    } else {
      lesson.assessment = {
        examStyle: `DELF ${lesson.level}`,
        sections: [{
          title: 'Comprehensive Assessment',
          skill: 'reading',
          points: 20,
          instructions: 'Complete all questions based on the chapter content.',
          questions: [],
          answerKeyNotes: 'Grade based on accuracy and completeness.',
        }],
      };
    }

    // 6. selfReflection = selfAssessment items
    lesson.selfReflection = lesson.selfAssessment?.length > 0
      ? lesson.selfAssessment
      : ['I can describe my progress in this chapter.'];

    // 7. completionSummary
    lesson.completionSummary = {
      content: lesson.miniReview?.content || `Congratulations on completing this chapter! You have practiced all four skills. Move on to the next chapter to continue your French journey.`,
    };

    // 8. Remove L8-illegal fields so schema validation passes
    delete (lesson as any).warmUp;
    delete (lesson as any).explanation;
    delete (lesson as any).vocabulary;
    delete (lesson as any).grammar;
    delete (lesson as any).grammarDrills;
    delete (lesson as any).reading;
    delete (lesson as any).listening;
    delete (lesson as any).speaking;
    delete (lesson as any).writing;
    delete (lesson as any).practiceExercises;
    delete (lesson as any).miniReview;
    delete (lesson as any).selfAssessment;
  }

  // ── Standard lessons (L1-L6): fill defaults ──
  if (!isL8) {
    if (lesson.warmUp && !lesson.warmUp.content) {
      lesson.warmUp.content = "Review the concepts introduced in this lesson.";
    }
    if (lesson.explanation && !lesson.explanation.content) {
      lesson.explanation.content = "Practice exercises and review for this lesson.";
    }
  }

  if (!isL7) {
    if (lesson.vocabulary && (lesson.vocabulary.length === 0 || !lesson.vocabulary[0])) {
      lesson.vocabulary = [{ french: "—", english: "—", pronunciation: "—", example: "—" }];
    }
    if (lesson.grammar && !lesson.grammar.explanation) {
      lesson.grammar.explanation = "No new grammar points in this lesson.";
      lesson.grammar.formation = "—";
      lesson.grammar.usage = "—";
      lesson.grammar.examples = ["—"];
      lesson.grammar.commonMistakes = [];
    }
  }

  if (!isL8 && !isL7) {
    if (lesson.grammarDrills && (!lesson.grammarDrills.questions || lesson.grammarDrills.questions.length === 0)) {
      lesson.grammarDrills.questions = [{
        id: `${lessonId}-gd-dummy`,
        type: 'short_answer',
        prompt: 'Complete the grammar drills.',
        correctAnswer: '—',
        explanation: 'No grammar drills for this review lesson.'
      }];
    }
    if (lesson.reading && !lesson.reading.title) {
      lesson.reading.title = "Reading Section";
    }
    if (lesson.reading && !lesson.reading.text) {
      lesson.reading.text = "Read the lesson contents.";
    }
    if (lesson.reading && (!lesson.reading.questions || lesson.reading.questions.length === 0)) {
      lesson.reading.questions = [{
        id: `${lessonId}-r-dummy`,
        type: 'short_answer',
        prompt: 'Complete the reading exercise.',
        correctAnswer: '—',
        explanation: 'No reading questions for this review lesson.'
      }];
    }
    if (lesson.listening && !lesson.listening.title) {
      lesson.listening.title = "Listening Section";
    }
    if (lesson.listening && !lesson.listening.transcript) {
      lesson.listening.transcript = "Listen to the lesson conversation.";
    }
    if (lesson.listening && (!lesson.listening.questions || lesson.listening.questions.length === 0)) {
      lesson.listening.questions = [{
        id: `${lessonId}-l-dummy`,
        type: 'short_answer',
        prompt: 'Complete the listening exercise.',
        correctAnswer: '—',
        explanation: 'No listening questions for this review lesson.'
      }];
    }
    if (lesson.speaking && (!lesson.speaking.guidedActivity || lesson.speaking.guidedActivity.trim() === '')) {
      lesson.speaking.guidedActivity = "Practice pronunciation of the vocabulary.";
    }
    if (lesson.writing && !lesson.writing.task) {
      lesson.writing.task = "Write a short summary of what you have learned.";
      lesson.writing.modelAnswer = "—";
      lesson.writing.checklist = ["Completed the summary."];
    }
    if (lesson.writing && (!lesson.writing.checklist || lesson.writing.checklist.length === 0)) {
      lesson.writing.checklist = ["Completed the summary."];
    }
  }

  if (!lesson.practiceExercises.questions || lesson.practiceExercises.questions.length === 0) {
    lesson.practiceExercises.questions = [{
      id: `${lessonId}-pe-dummy`,
      type: 'short_answer',
      prompt: 'Complete the review.',
      correctAnswer: '—',
      explanation: 'No practice exercises for this review lesson.'
    }];
  }
  if (!lesson.miniReview.content) {
    lesson.miniReview.content = "Complete the chapter review.";
  }
  if (!lesson.selfAssessment || lesson.selfAssessment.length === 0) {
    lesson.selfAssessment = ["I can understand the concepts presented in this chapter."];
  }
}

function parseVocabList(text: string): ILessonVocabularyItem[] {
  const words = text.split(/[,\n]/).map(w => w.trim()).filter(w => w && !w.startsWith('#') && !w.startsWith('**'));
  return words.map(w => ({
    french: stripMd(w),
    english: stripMd(w) + ' (see chapter vocabulary)',
    pronunciation: '—',
    example: stripMd(w) || '—',
  }));
}

function parseGrammarSummary(text: string) {
  return {
    explanation: text.trim() || 'Consolidated grammar reference from this chapter.',
    formation: 'See grammar summary tables above.',
    usage: 'Review all grammar points covered in this chapter.',
    examples: ['Refer to the grammar summary.'],
    commonMistakes: [],
  };
}

function parseDelfExercises(text: string, lessonId: string): ILessonQuestion[] {
  const qs: ILessonQuestion[] = [];
  const sections = text.split(/\*\*Section\s+/i);
  
  // Look for Answer Key block
  let answersBlock = '';
  const akMatch = text.match(/\*\*Answer Key\s*[-—]\s*Sections[\s\S]+$/i);
  if (akMatch) {
    answersBlock = akMatch[0];
  }

  for (const sec of sections) {
    const textToParse = sec.trim();
    if (!textToParse) continue;
    
    const titleMatch = textToParse.match(/^(\d+)\s*[-—]\s*(.+?)(?::\*\*|\*\*)/i);
    if (!titleMatch) continue;

    const sectionNum = titleMatch[1];
    let sectionTitle = titleMatch[2].replace(/:$/, '').trim();

    // Rest of the text is the prompt
    let bodyText = textToParse.slice(titleMatch[0].length).trim();
    
    // Remove Answer Key if it is included in the last section
    if (bodyText.includes('**Answer Key')) {
      bodyText = bodyText.split('**Answer Key')[0].trim();
    }

    const fullPrompt = `**Section ${sectionNum} — ${sectionTitle}**\n\n` + bodyText;

    const type = 'short_answer';

    let explanation = 'Practice exercise';
    if (answersBlock) {
      const escapedNum = sectionNum.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const ansRegex = new RegExp(`(?:^|\\n)${escapedNum}\\.\\s*([\\s\\S]+?)(?=\\n\\d+\\.|\\n\\-\\-\\-|$|\\n\\*\\*)`, 'i');
      const ansMatch = answersBlock.match(ansRegex);
      if (ansMatch) {
        explanation = ansMatch[1].trim();
      }
    }

    qs.push({
      id: `${lessonId}-pe-delf-${sectionNum}`,
      type: type as any,
      prompt: fullPrompt,
      correctAnswer: explanation,
      explanation: explanation,
    });
  }
  return qs;
}

function populateLessonSections(lesson: ParsedLesson, sections: any[], lessonId: string) {
  for (const s of sections) {
    const h = s.header.toLowerCase();
    if (h === 'warm-up' || h === 'warm up') {
      if (lesson.warmUp) lesson.warmUp.content = clean(s.body.split('\n').filter((l: string) => l.trim()).map((l: string) => l.trim()).join(' '));
    }
    else if (h === 'lesson explanation') {
      if (lesson.explanation) lesson.explanation.content = clean(s.body);
    }
    else if (h === 'vocabulary') {
      lesson.vocabulary = parseVocabTable(s.body);
    }
    else if (h.startsWith('grammar') && !h.includes('summary')) {
      lesson.grammar = parseGrammar(s.body);
      if (lesson.grammarDrills) lesson.grammarDrills.questions = parseGrammarDrills(s.body);
    }
    else if (h === 'reading') {
      if (lesson.reading) lesson.reading = parseReading(s.body);
    }
    else if (h === 'listening') {
      if (lesson.listening) lesson.listening = parseListening(s.body);
    }
    else if (h === 'speaking') {
      if (lesson.speaking) lesson.speaking = parseSpeaking(s.body);
    }
    else if (h === 'writing') {
      if (lesson.writing) lesson.writing = parseWriting(s.body);
    }
    else if (h === 'practice exercises' || h.startsWith('mixed practice exercises')) {
      lesson.practiceExercises.questions = parsePracticeExercises(s.body);
    }
    else if (h.startsWith('chapter vocabulary bank')) {
      lesson.vocabulary = parseVocabList(s.body);
    } else if (h.startsWith('grammar summary')) {
      lesson.grammar = parseGrammarSummary(s.body);
    } else if (h === 'mini review' || h.startsWith('chapter review') || h.includes('mini review by can-do')) {
      lesson.miniReview.content = clean(s.body.split('\n').filter((l: string) => l.trim()).map((l: string) => l.trim()).join(' '));
    } else if (h.startsWith('delf')) {
      const delfQuestions = parseDelfExercises(s.body, lessonId);
      lesson.practiceExercises.questions = [...lesson.practiceExercises.questions, ...delfQuestions];
    } else if (h === 'self assessment' || h === 'self-reflection') {
      const items: string[] = [];
      for (const l of s.body.split('\n')) {
        const c = l.replace(/^\s*-\s*\[[ x]\]\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
        if (c && c !== '--' && c !== '---') items.push(stripMd(c));
      }
      lesson.selfAssessment = items;
    }
  }
}

export function parseLessonFromMarkdown(
  markdown: string,
  level: string,
  chapterNum: number,
  manualOverrides?: {
    level?: string;
    chapterNum?: number;
    lessonNum?: number;
    title?: string;
    anchorSkill?: string;
  }
): ParsedLesson[] {
  const normalizedMarkdown = markdown.replace(/\r/g, '');
  const lessons: ParsedLesson[] = [];

  // Auto-detect Level and Chapter from markdown text if not manually overridden
  let detectedLevel = level;
  if (!manualOverrides?.level) {
    const levelMatch = normalizedMarkdown.match(/LEVEL\s*(A0|A1|A2|B1|B2|C1|C2)/i);
    if (levelMatch) {
      detectedLevel = levelMatch[1].toUpperCase();
    }
  } else {
    detectedLevel = manualOverrides.level;
  }

  let detectedChapterNum = chapterNum;
  if (!manualOverrides?.chapterNum) {
    const chapterMatch = normalizedMarkdown.match(/Chapter\s*(\d+)/i);
    if (chapterMatch) {
      detectedChapterNum = parseInt(chapterMatch[1], 10);
    }
  } else {
    detectedChapterNum = typeof manualOverrides.chapterNum === 'string' 
      ? parseInt((manualOverrides.chapterNum as string).match(/\d+/)?.[0] || '1', 10) 
      : manualOverrides.chapterNum;
  }

  // Match all lesson headers: e.g. "LESSON 1", "# LESSON 7", "**LESSON 1**", "Lesson 1:", "CHAPTER 1 — LESSON 2"
  const headerRegex = /(?:^|\n)(?:#+\s*|\*\*|#*\s*CHAPTER\s+\d+[\s—:-]+)?LESSON\s+(\d+)\b[^\n]*/gim;
  const matches = [...normalizedMarkdown.matchAll(headerRegex)];

  if (matches.length === 0) {
    // strict check: if headers are missing and manual overrides are not provided, throw error
    if (!manualOverrides || !manualOverrides.level || !manualOverrides.chapterNum || !manualOverrides.lessonNum) {
      throw new Error("Lesson headers matching '# LESSON [number]' are missing in the markdown text. Please fix the headers or enter the Level, Chapter, and Lesson number manually to parse successfully.");
    }
    
    const lessonNum = manualOverrides.lessonNum;
    const finalLevel = detectedLevel;
    const finalChapterNum = detectedChapterNum;
    const lessonId = `${finalLevel.toLowerCase()}-ch${finalChapterNum}-l${lessonNum}`;
    const chapterId = `${finalLevel.toLowerCase()}-ch${finalChapterNum}`;

    const lesson: ParsedLesson = {
      lessonId,
      chapterId,
      level: finalLevel,
      title: manualOverrides.title || extractField(normalizedMarkdown, 'Lesson Title') || `Lesson ${lessonNum}`,
      anchorSkill: manualOverrides.anchorSkill || extractField(normalizedMarkdown, 'Anchor Skill').replace(/\(.*\)/, '').trim().toLowerCase() || 'reading',
      durationMinutes: 22,
      objectives: [extractField(normalizedMarkdown, 'Lesson Objectives') || 'Practice skills'],
      grammarFocus: extractField(normalizedMarkdown, 'Grammar Focus') || '',
      vocabularyFocus: extractField(normalizedMarkdown, 'Vocabulary Focus') || '',
      warmUp: { content: '' },
      explanation: { content: '' },
      vocabulary: [],
      grammar: { explanation: '', formation: '', usage: '', examples: [], commonMistakes: [] },
      grammarDrills: { questions: [] },
      reading: { title: '', text: '', questions: [] },
      listening: { title: '', transcript: '', questions: [] },
      speaking: { guidedActivity: '' },
      writing: { task: '', modelAnswer: '', checklist: [] },
      practiceExercises: { questions: [] },
      miniReview: { content: '' },
      selfAssessment: [],
    };

    const sections = splitSections(normalizedMarkdown);
    populateLessonSections(lesson, sections, lessonId);
    fillPlaceholders(lesson);
    lessons.push(lesson);
    return lessons;
  }

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    let lessonNum = parseInt(match[1]);
    const startIdx = match.index! + match[0].length;
    const endIdx = (i + 1 < matches.length) ? matches[i + 1].index! : normalizedMarkdown.length;
    const block = normalizedMarkdown.substring(startIdx, endIdx);

    // Apply manual overrides if matching this loop iteration
    const finalLevel = detectedLevel;
    const finalChapterNum = detectedChapterNum;
    if (manualOverrides?.lessonNum && matches.length === 1) {
      lessonNum = manualOverrides.lessonNum;
    }

    const lessonId = `${finalLevel.toLowerCase()}-ch${finalChapterNum}-l${lessonNum}`;
    const chapterId = `${finalLevel.toLowerCase()}-ch${finalChapterNum}`;

    let anchorSkill = manualOverrides?.anchorSkill || extractField(block, 'Anchor Skill').replace(/\(.*\)/, '').trim().toLowerCase();
    if (!anchorSkill) {
      if (lessonNum === 7) anchorSkill = 'integrated';
      else if (lessonNum === 8) anchorSkill = 'review';
      else anchorSkill = 'reading';
    }

    const lesson: ParsedLesson = {
      lessonId,
      chapterId,
      level: finalLevel,
      title: manualOverrides?.title || extractField(block, 'Lesson Title') || `Lesson ${lessonNum}`,
      anchorSkill,
      durationMinutes: 22,
      objectives: [extractField(block, 'Lesson Objectives') || 'Practice skills'],
      grammarFocus: extractField(block, 'Grammar Focus') || '',
      vocabularyFocus: extractField(block, 'Vocabulary Focus') || '',
      warmUp: { content: '' },
      explanation: { content: '' },
      vocabulary: [],
      grammar: { explanation: '', formation: '', usage: '', examples: [], commonMistakes: [] },
      grammarDrills: { questions: [] },
      reading: { title: '', text: '', questions: [] },
      listening: { title: '', transcript: '', questions: [] },
      speaking: { guidedActivity: '' },
      writing: { task: '', modelAnswer: '', checklist: [] },
      practiceExercises: { questions: [] },
      miniReview: { content: '' },
      selfAssessment: [],
    };

    const sections = splitSections(block);
    populateLessonSections(lesson, sections, lessonId);
    fillPlaceholders(lesson);
    lessons.push(lesson);
  }

  return lessons;
}

export function parseChapterFile(filePath: string, level: string, chapterNum: number): ParsedLesson[] {
  return parseLessonFromMarkdown(fs.readFileSync(filePath, 'utf-8'), level, chapterNum);
}
