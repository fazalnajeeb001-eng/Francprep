/**
 * lessonParser.ts — Reusable, standalone markdown-to-canonical-JSON parser.
 *
 * Parses a single lesson's markdown body (split on `#` headers → named sections)
 * and returns a validated canonical lesson matching lesson.schema.json.
 *
 * Works for ANY lesson, any level — no hardcoded chapter-specific logic.
 * Handles L7 (Integrated Practice — fewer sections) and L8 (Chapter Review — non-standard headers).
 */

import { validateLesson } from '../utils/validateLesson';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ParseMetadata {
  lessonId: string;
  chapterId: string;
  level: string;
  title: string;
  anchorSkill: string;
  durationMinutes: number;
  objectives: string[];
  grammarFocus: string;
  vocabularyFocus: string;
}

export interface ParseResult {
  success: boolean;
  lesson?: any;         // the canonical lesson JSON (validated)
  errors?: string[];    // validation errors with context
  warnings?: string[];  // non-fatal issues (e.g., sanitized fields)
}

interface VocabItem {
  french: string;
  english: string;
  pronunciation: string;
  example: string;
  formality?: string;
  usageNote?: string;
}

interface GrammarSection {
  explanation: string;
  formation: string;
  usage: string;
  examples: string[];
  commonMistakes: { wrong: string; correct: string; why: string; tip?: string }[];
}

interface Question {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'ordering' | 'short_answer' | 'translation';
  prompt: string;
  correctAnswer: any;
  explanation: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  items?: string[];
}

interface ReadingSection {
  title: string;
  text: string;
  translation?: string;
  questions: Question[];
}

interface ListeningSection {
  title: string;
  transcript: string;
  translation?: string;
  questions: Question[];
}

interface SpeakingSection {
  guidedActivity: string;
  roleplay?: string;
  pronunciationTip?: string;
}

interface WritingSection {
  task: string;
  modelAnswer: string;
  checklist: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripMd(t: string): string {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`(.*?)`/g, '$1').trim();
}

function clean(t: string): string {
  return t.replace(/\n---\s*\n?/g, '\n').replace(/\n--\s*\n?/g, '\n').replace(/\s*---\s*$/, '').replace(/\s*--\s*$/, '').trim();
}

function extractField(text: string, name: string): string {
  const m = text.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[^\\*]|$)`, 'i'));
  return m ? stripMd(m[1].trim()) : '';
}

interface Section {
  header: string;
  body: string;
}

function splitSections(body: string): Section[] {
  const out: Section[] = [];
  const lines = body.split('\n');
  let h = '', c: string[] = [];
  for (const l of lines) {
    const m = l.match(/^# (.+)$/);
    if (m) {
      if (h) out.push({ header: h, body: c.join('\n').trim() });
      h = m[1].trim();
      c = [];
    } else {
      c.push(l);
    }
  }
  if (h) out.push({ header: h, body: c.join('\n').trim() });
  return out;
}

// ─── Section parsers ──────────────────────────────────────────────────────────

function parseVocabTable(text: string): VocabItem[] {
  const out: VocabItem[] = [];
  for (const line of text.split('\n')) {
    if (!line.includes('|')) continue;
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length < 3 || cells[0] === 'French' || cells[0].match(/^[-:]+$/)) continue;
    // Handle both 3-column (French|English|Pronunciation) and 4-column tables
    if (cells.length === 3) {
      out.push({ french: cells[0], english: cells[1], pronunciation: cells[2], example: cells[2] });
    } else {
      out.push({ french: cells[0], english: cells[1], pronunciation: cells[2], example: cells[3] });
    }
  }
  return out;
}

function parseVocabList(text: string): VocabItem[] {
  const words = text.split(/[,\n]/).map(w => w.trim()).filter(w => w && !w.startsWith('#') && !w.startsWith('**'));
  return words.map(w => ({
    french: stripMd(w),
    english: stripMd(w) + ' (see chapter vocabulary)',
    pronunciation: '',
    example: stripMd(w),
  }));
}

function parseGrammar(text: string): GrammarSection {
  const explanation = clean(extractField(text, 'Explanation'));
  const usage = clean(extractField(text, 'Usage'));

  let formation = '';
  const fm = text.match(/\*\*Formation[^:]*:\*\*\s*([\s\S]*?)(?=\n\*\*Usage|\n\*\*Examples|\n\*\*Common|\n\*\*Mini|$)/i);
  if (fm) {
    formation = fm[1].replace(/^\s*[-•*]\s*/gm, '').replace(/\|[^|]*\|/g, '').split('\n').filter(l => l.trim()).map(l => l.trim()).join('; ');
  }

  const examples: string[] = [];
  const em = text.match(/\*\*Examples?:\*\*\s*([\s\S]*?)(?=\n\*\*Common|\n\*\*Mini|$)/i);
  if (em) {
    for (const line of em[1].split('\n')) {
      const c = line.replace(/^\s*\d+\.\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
      if (c && !c.startsWith('**')) examples.push(stripMd(c));
    }
  }

  const commonMistakes: { wrong: string; correct: string; why: string; tip?: string }[] = [];
  const mm = text.match(/\*\*Common Mistakes?:\*\*\s*([\s\S]*?)(?=\n\*\*Mini|\n#|$)/i);
  if (mm) {
    for (const line of mm[1].split('\n')) {
      const c = line.replace(/^\s*[-•*]\s*/, '').trim();
      if (!c) continue;
      const am = c.match(/❌\s*(.+?)\s*→\s*✅\s*(.+?)(?:\s*\((.+?)\))?$/);
      if (am) {
        commonMistakes.push({
          wrong: stripMd(am[1]),
          correct: stripMd(am[2]),
          why: am[3] ? stripMd(am[3]) : `Use "${stripMd(am[2])}" instead.`,
        });
      }
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

function parseGrammarSummary(text: string): GrammarSection {
  const explanation = clean(text.split('\n').filter(l => l.trim() && !l.includes('|---') && !l.includes('| Pronoun')).slice(0, 5).join(' '));
  const examples: string[] = [];
  const lines = text.split('\n');
  for (const l of lines) {
    const t = l.trim();
    if (t && !t.includes('|') && !t.startsWith('**') && !t.startsWith('#') && t.length > 10 &&
        !t.match(/^(Question|Adjective|Tu\/vous|The|A basic)/i)) {
      examples.push(stripMd(t));
    }
  }

  return {
    explanation: explanation || 'Consolidated grammar reference from this chapter.',
    formation: 'See grammar summary tables above.',
    usage: 'Review all grammar points covered in this chapter.',
    examples: examples.length > 0 ? examples.slice(0, 3) : ['Refer to the grammar summary.'],
    commonMistakes: [],
  };
}

function parseGrammarDrills(text: string, lessonId: string): Question[] {
  const qs: Question[] = [];
  const drillsMatch = text.match(/\*\*Mini Drills?:\*\*\s*([\s\S]*?)(?=\n---|\n#|$)/i);
  if (!drillsMatch) return qs;

  const drillsText = drillsMatch[1];
  const lines = drillsText.split('\n');

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
    // Pattern 2: Arrow transformation
    else if (rawPrompt.includes('→')) {
      const parts = rawPrompt.split('→');
      const source = parts[0].replace(/[:]\s*$/, '').trim();
      const afterArrow = parts[1]?.trim() || '';
      if (afterArrow && !afterArrow.match(/^_{3,}$/) && !afterArrow.match(/^\d+$/)) {
        correctAnswer = stripMd(afterArrow);
      } else {
        correctAnswer = '';
      }
      explanation = instruction || stripMd(source);
    }
    // Pattern 3: Blank with context after colon
    else if ((rawPrompt.includes('__________') || rawPrompt.includes('______')) && rawPrompt.includes(':')) {
      const parts = rawPrompt.split(':');
      const context = parts[0].trim();
      const afterColon = parts.slice(1).join(':').trim();
      const afterBlank = afterColon.split(/_{3,}/)[1]?.trim()?.replace(/^[.!?,;:\s]+/, '') || '';
      correctAnswer = stripMd(afterBlank);
      explanation = stripMd(context);
    }
    // Pattern 4: Blank at end
    else if (rawPrompt.includes('__________') || rawPrompt.includes('______')) {
      const beforeBlank = rawPrompt.split(/_{3,}/)[0].trim();
      const afterBlank = rawPrompt.split(/_{3,}/)[1]?.trim() || '';
      const cleanAfterBlank = afterBlank.replace(/^[.!?,;:\s]+/, '').trim();

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
    // Pattern 5: No blank visible
    else {
      correctAnswer = '';
      explanation = instruction;
    }

    n++;
    qs.push({
      id: `${lessonId}-gd-${n}`,
      type: 'fill_blank',
      prompt,
      correctAnswer,
      explanation,
    });
  }

  return qs;
}

function parseReading(text: string, lessonId: string): ReadingSection {
  const tm = text.match(/\*\*(.*?)\*\*/);
  const title = tm ? stripMd(tm[1]) : 'Reading';

  const parts = text.split(/\*\*English Translation:\*\*/i);
  const passagePart = parts[0] || '';
  const afterTrans = parts[1] || '';

  const passageLines = passagePart.split('\n').filter(l => {
    const t = l.trim();
    return t && !t.startsWith('**Comprehension Questions') && !t.startsWith('**Answer Key') && !t.match(/^\d+\./);
  });
  const passage = passageLines.map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').trim()).filter(l => l && l !== title).join('\n');

  let translation: string | undefined;
  const questions: Question[] = [];

  if (afterTrans) {
    const tp = afterTrans.split(/\*\*Comprehension Questions/i);
    translation = (tp[0] || '').split('\n').filter(l => l.trim()).map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\(.*?A1.*?support.*?\)/i, '').trim()).filter(l => l && !l.startsWith('(')).join('\n').trim() || undefined;

    const qp = tp[1] || '';
    const ap = qp.split(/\*\*Answer Key/i);
    const aLines = (ap[1] || '').split('\n');
    const answers: string[] = [];
    for (const l of aLines) {
      const m = l.trim().match(/^\d+\.\s*(.+)/);
      if (m) answers.push(stripMd(m[1]));
    }

    let n = 0;
    for (const l of (ap[0] || '').split('\n')) {
      const m = l.trim().match(/^\d+\.\s*(.+)/);
      if (m) {
        n++;
        questions.push({
          id: `${lessonId}-r-${n}`,
          type: 'short_answer' as const,
          prompt: stripMd(m[1]),
          correctAnswer: answers[n - 1] || '',
          explanation: answers[n - 1] ? `The answer is: ${answers[n - 1]}` : 'Refer to the reading passage.',
        });
      }
    }
  }

  return { title, text: passage, translation, questions };
}

function parseListening(text: string, lessonId: string): ListeningSection {
  const tm = text.match(/\*\*(.*?)\*\*/);
  const title = tm ? stripMd(tm[1]).replace(/^Transcript:\s*/i, '').replace(/^"/, '').replace(/"$/, '') : 'Listening';

  const parts = text.split(/\*\*English Translation:\*\*/i);
  const transPart = parts[0] || '';
  const afterTrans = parts[1] || '';

  const tLines = transPart.split('\n').filter(l => {
    const t = l.trim();
    return t && !t.match(/^\*\*Listening/i) && !t.startsWith('**Answer Key') && !t.match(/^\d+\./) && !t.startsWith('(No audio');
  });
  const transcript = tLines.map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\*\*/g, '').trim()).filter(l => l && l !== title && !l.startsWith('Transcript:')).join('\n');

  let translation: string | undefined;
  const questions: Question[] = [];

  const activitySource = afterTrans || text;
  const tp = activitySource.split(/\*\*Listening(?:\/Reading)?\s*Activity/i);
  if (!afterTrans && tp.length > 1) {
    translation = undefined;
  } else {
    translation = (tp[0] || '').split('\n').filter(l => l.trim()).map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\(.*?A1.*?support.*?\)/i, '').trim()).filter(l => l && !l.startsWith('(')).join('\n').trim() || undefined;
  }

  const activityHeader = tp[1] || '';
  let activityType: 'true_false' | 'short_answer' | 'multiple_choice' | 'fill_blank' = 'true_false';
  if (/answer the questions/i.test(activityHeader)) activityType = 'short_answer';
  else if (/multiple choice/i.test(activityHeader)) activityType = 'multiple_choice';
  else if (/fill in the blank/i.test(activityHeader)) activityType = 'fill_blank';
  else if (/true or false/i.test(activityHeader)) activityType = 'true_false';
  else if (/short answer/i.test(activityHeader)) activityType = 'short_answer';

  const ap = activityHeader.split(/\*\*Answer Key/i);
  const answerSection = (ap[1] || '').replace(/^:\s*/, '');
  const answerLines = answerSection.split('\n');
  const questionLines = (ap[0] || '').split('\n');

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
      answers.push({ correct: stripMd(c), explanation: '' });
    }
  }

  let n = 0;
  for (const l of questionLines) {
    const m = l.trim().match(/^\d+\.\s*(.+)/);
    if (!m) continue;
    n++;

    const qPrompt = stripMd(m[1]);
    const answer = answers[n - 1] || { correct: '', explanation: '' };

    if (activityType === 'true_false') {
      questions.push({
        id: `${lessonId}-li-${n}`,
        type: 'true_false',
        prompt: qPrompt,
        options: ['True', 'False'],
        correctAnswer: answer.correct || 'False',
        explanation: answer.explanation || `The statement is ${answer.correct}.`,
      });
    } else if (activityType === 'multiple_choice') {
      questions.push({
        id: `${lessonId}-li-${n}`,
        type: 'short_answer',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    } else if (activityType === 'fill_blank') {
      questions.push({
        id: `${lessonId}-li-${n}`,
        type: 'fill_blank',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    } else {
      questions.push({
        id: `${lessonId}-li-${n}`,
        type: 'short_answer',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    }
  }

  // Handle case where there are no numbered questions but there are answers
  if (questions.length === 0 && answers.length > 0) {
    const instructionMatch = activityHeader.match(/\*\*Listening Activity:\*\*\s*(.+?)(?:\n|$)/i);
    const instruction = instructionMatch ? stripMd(instructionMatch[1]) : 'Listen and answer.';

    for (let i = 0; i < answers.length; i++) {
      questions.push({
        id: `${lessonId}-li-${i + 1}`,
        type: 'short_answer',
        prompt: `${instruction} (Situation ${i + 1})`,
        correctAnswer: answers[i].correct,
        explanation: answers[i].explanation || `The answer is: ${answers[i].correct}`,
      });
    }
  }

  return { title, transcript, translation, questions };
}

function parseSpeaking(text: string): SpeakingSection {
  const parts = text.split(/\*\*Roleplay/i);
  const mainPart = parts[0] || '';
  const roleplayPart = parts[1] || '';

  let guidedActivity = '';
  const gm = mainPart.match(/Guided Activity[^:]*:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
  if (gm) {
    guidedActivity = gm[1].split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  } else {
    guidedActivity = clean(mainPart.split('\n').filter(l => l.trim() && !l.startsWith('**')).map(l => l.trim()).join(' '));
  }

  let roleplay: string | undefined;
  let pronunciationTip: string | undefined;

  if (roleplayPart) {
    const rpLines = roleplayPart.split(/\*\*Pronunciation Tip/i);
    roleplay = rpLines[0].replace(/:\*\*\s*/, '').split('\n').filter(l => l.trim()).map(l => l.replace(/^[-•*]\s*/, '').trim()).join(' ');
    if (rpLines[1]) {
      pronunciationTip = rpLines[1].split('\n').filter(l => l.trim()).map(l => l.replace(/^:\*\*\s*/, '').trim()).filter(l => l && l !== '---').join(' ').replace(/\s*---\s*$/, '').trim();
    }
  }

  return { guidedActivity, roleplay, pronunciationTip };
}

function parseWriting(text: string): WritingSection {
  const task = (text.match(/\*\*Task:\*\*\s*([\s\S]*?)(?=\*\*Model|\*\*Writing|$)/i)?.[1] || '')
    .split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  const modelAnswer = (text.match(/\*\*Model Answer:\*\*\s*([\s\S]*?)(?=\*\*Writing Checklist|\*\*Checklist|$)/i)?.[1] || '')
    .split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  const checklist: string[] = [];
  const cm = text.match(/\*\*(?:Writing )?Checklist:\*\*\s*([\s\S]*?)$/i);
  if (cm) {
    for (const l of cm[1].split('\n')) {
      const c = l.replace(/^\s*-\s*\[ ?\]\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
      if (c && c !== '--' && c !== '---') checklist.push(stripMd(c));
    }
  }
  return { task, modelAnswer, checklist };
}

function buildPracticeQuestion(n: number, type: string, promptText: string, lessonId: string): Question {
  const prompt = stripMd(promptText);

  if (type === 'multiple_choice') {
    const options: string[] = [];
    const optionMatches = promptText.matchAll(/[a-d]\)\s*(.+?)(?=\s+[b-d]\)|$)/gi);
    for (const om of optionMatches) {
      options.push(stripMd(om[1]));
    }
    if (options.length < 2) {
      for (const line of promptText.split('\n')) {
        const om = line.trim().match(/^[a-d]\)\s*(.+)/i);
        if (om) options.push(stripMd(om[1]));
      }
    }
    return {
      id: `${lessonId}-pe-${n}`,
      type: 'multiple_choice',
      prompt: prompt.replace(/\s*[a-d]\)\s*.+/gi, '').trim(),
      options,
      correctAnswer: '',
      explanation: '',
    };
  }

  if (type === 'matching') {
    const pairs: { left: string; right: string }[] = [];
    const leftItems: string[] = [];
    const rightItems: string[] = [];

    for (const line of promptText.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const numMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
      if (numMatch) {
        const leftText = numMatch[2];
        const dashSplit = leftText.split(/\s+[\u2014\u2013-]\s+(?=[a-z]\))/i);
        if (dashSplit.length >= 2) {
          leftItems.push(stripMd(dashSplit[0]));
          const rightPart = dashSplit[1];
          const rightClean = rightPart.replace(/^[a-z]\)\s*/i, '').trim();
          rightItems.push(stripMd(rightClean));
        } else {
          leftItems.push(stripMd(leftText));
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
      id: `${lessonId}-pe-${n}`,
      type: 'matching',
      prompt: prompt.replace(/^\s*\d+\.\s*.+/gm, '').trim() || 'Match the items.',
      pairs,
      correctAnswer: pairs,
      explanation: '',
    };
  }

  if (type === 'ordering') {
    const items: string[] = [];
    const inlineText = promptText.replace(/\n/g, ' ');
    const inlineMatches = inlineText.matchAll(/\(?([a-z])\)?\)\s*(.+?)(?=\s*\(?[a-z]\)?\)|$)/gi);
    for (const im of inlineMatches) {
      const item = stripMd(im[2]).trim();
      if (item && !items.includes(item)) items.push(item);
    }

    return {
      id: `${lessonId}-pe-${n}`,
      type: 'ordering',
      prompt: prompt.replace(/\s*\(?\)?[a-z]\)?\)\s*.+/gi, '').trim() || 'Put in logical order.',
      items,
      correctAnswer: items,
      explanation: '',
    };
  }

  // fill_blank, short_answer, translation, communicative_practice (→ short_answer)
  return {
    id: `${lessonId}-pe-${n}`,
    type: type as any,
    prompt,
    correctAnswer: '',
    explanation: '',
  };
}

function parsePracticeExercises(text: string, lessonId: string): Question[] {
  const qs: Question[] = [];
  const lines = text.split('\n');
  let n = 0, curType = '', curPromptLines: string[] = [], inAK = false;
  const answers: string[] = [];

  const knownTypes = /Multiple Choice|Matching|Fill in the Blank|Sentence Ordering|Short Answer|Translation|True or False|Communicative Practice/i;

  for (const line of lines) {
    const t = line.trim();

    if (t.match(/^\*\*Answer Key/i)) {
      inAK = true;
      if (curPromptLines.length > 0 && curType) {
        n++;
        qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n'), lessonId));
        curPromptLines = [];
        curType = '';
      }
      continue;
    }

    if (inAK) {
      const m = t.match(/^\d+\.\s*(.+)/);
      if (m) answers.push(m[1].trim());
      continue;
    }

    const tm = t.match(/^\*\*\d+\.\s*([\w\s]+?)(?:\*\*:|\*\*)/i);
    if (tm && knownTypes.test(tm[1])) {
      if (curPromptLines.length > 0 && curType) {
        n++;
        qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n'), lessonId));
        curPromptLines = [];
      }
      curType = tm[1].trim().toLowerCase().replace(/\s+/g, '_')
        .replace('fill_in_the_blank', 'fill_blank')
        .replace('sentence_ordering', 'ordering')
        .replace('communicative_practice', 'short_answer');
      continue;
    }

    if (curType && !t.startsWith('**')) {
      curPromptLines.push(t);
    }
  }

  if (curPromptLines.length > 0 && curType) {
    n++;
    qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n'), lessonId));
  }

  // Map answers to questions
  for (let i = 0; i < qs.length; i++) {
    if (!answers[i]) continue;
    const q = qs[i];
    const raw = answers[i];

    if (q.type === 'multiple_choice') {
      q.correctAnswer = raw.replace(/^[a-d]\)\s*/, '').trim();
    } else if (q.type === 'matching') {
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
      q.correctAnswer = raw.replace(/^Sample answer:\s*/i, '')
        .replace(/^\(Open-ended.*?\)\s*$/i, 'Open-ended — assess for correctness.').trim();
    } else {
      q.correctAnswer = stripMd(raw);
    }
  }

  // Ensure all questions have explanations
  for (const q of qs) {
    if (!q.explanation) {
      if (q.type === 'multiple_choice') {
        q.explanation = q.correctAnswer ? `The correct answer is: ${q.correctAnswer}` : 'Select the best answer.';
      } else if (q.type === 'matching') {
        q.explanation = 'Match each item with its correct pair.';
      } else if (q.type === 'ordering') {
        q.explanation = 'Arrange the items in the correct order.';
      } else if (q.type === 'fill_blank') {
        q.explanation = q.correctAnswer ? `The answer is: ${String(q.correctAnswer)}` : 'Fill in the blank.';
      } else if (q.type === 'short_answer') {
        q.explanation = q.correctAnswer ? `A sample answer: ${String(q.correctAnswer).slice(0, 100)}` : 'Provide a short written response.';
      } else {
        q.explanation = 'Complete the exercise.';
      }
    }
  }

  return qs;
}

// ─── Sanitizer ────────────────────────────────────────────────────────────────

function sanitizeLesson(lesson: any): { lesson: any; warnings: string[] } {
  const warnings: string[] = [];
  const id = lesson.lessonId;

  // Strip undefined values (AJV rejects them)
  lesson = JSON.parse(JSON.stringify(lesson));

  if (!lesson.warmUp.content || !lesson.warmUp.content.trim()) {
    lesson.warmUp.content = 'Think about what you have learned in this chapter so far.';
    warnings.push('warmUp.content was empty — filled with default');
  }

  if (!lesson.explanation.content || !lesson.explanation.content.trim()) {
    lesson.explanation.content = 'This lesson consolidates material from earlier in the chapter. Review and apply what you know.';
    warnings.push('explanation.content was empty — filled with default');
  }

  if (!lesson.vocabulary || lesson.vocabulary.length === 0) {
    lesson.vocabulary = [{
      french: 'révision', english: 'review', pronunciation: 'ray-vee-ZYOHN',
      example: 'Faites une révision du chapitre.',
    }];
    warnings.push('vocabulary was empty — filled with default');
  }

  if (!lesson.grammar.explanation || !lesson.grammar.explanation.trim()) {
    lesson.grammar.explanation = 'No new grammar in this lesson — review previous grammar points.';
    warnings.push('grammar.explanation was empty — filled with default');
  }
  if (!lesson.grammar.formation || !lesson.grammar.formation.trim()) {
    lesson.grammar.formation = 'Recycled from previous lessons.';
  }
  if (!lesson.grammar.usage || !lesson.grammar.usage.trim()) {
    lesson.grammar.usage = 'See explanation above.';
  }
  if (!lesson.grammar.examples || lesson.grammar.examples.length === 0) {
    lesson.grammar.examples = ['Refer to the lesson explanation.'];
  }

  if (!lesson.grammarDrills.questions || lesson.grammarDrills.questions.length === 0) {
    lesson.grammarDrills.questions = [{
      id: `${id}-gd-1`, type: 'short_answer',
      prompt: 'Review the grammar section. What is one grammar point covered in this chapter?',
      correctAnswer: lesson.grammar.explanation,
      explanation: 'This is a review drill — revisit the grammar section if needed.',
    }];
    warnings.push('grammarDrills was empty — filled with default');
  }

  if (!lesson.reading.text || !lesson.reading.text.trim() ||
      !lesson.reading.questions || lesson.reading.questions.length === 0) {
    lesson.reading = {
      title: lesson.reading.title || 'Chapter Review Reading',
      text: lesson.reading.text || lesson.explanation.content,
      questions: lesson.reading.questions && lesson.reading.questions.length > 0
        ? lesson.reading.questions
        : [{
            id: `${id}-r-1`, type: 'short_answer',
            prompt: 'Read the review content above and summarize one key point.',
            correctAnswer: 'Refer to the review content.',
            explanation: 'Consolidate your understanding of the chapter material.',
          }],
    };
    warnings.push('reading was incomplete — filled with defaults');
  }

  if (!lesson.listening.transcript || !lesson.listening.transcript.trim()) {
    lesson.listening = {
      title: 'Chapter Review Listening',
      transcript: lesson.reading.text || lesson.explanation.content,
      questions: [{
        id: `${id}-li-1`, type: 'short_answer',
        prompt: 'Listen to the review content and note one key takeaway.',
        correctAnswer: 'Refer to the review content.',
        explanation: 'Consolidate your listening comprehension.',
      }],
    };
    warnings.push('listening.transcript was empty — filled with default');
  }

  if (!lesson.speaking.guidedActivity || !lesson.speaking.guidedActivity.trim()) {
    lesson.speaking.guidedActivity = 'Practice summarizing what you learned in this chapter aloud.';
    warnings.push('speaking.guidedActivity was empty — filled with default');
  }

  if (!lesson.writing.task || !lesson.writing.task.trim()) {
    lesson.writing = {
      task: 'Write a short summary of the key points from this chapter.',
      modelAnswer: 'I learned about the key vocabulary and grammar in this chapter and can use them in conversation.',
      checklist: ['Covered at least one grammar point.', 'Used at least two vocabulary items.', 'Wrote at least 3 sentences.'],
    };
    warnings.push('writing.task was empty — filled with defaults');
  }

  if (!lesson.practiceExercises.questions || lesson.practiceExercises.questions.length === 0) {
    lesson.practiceExercises.questions = [{
      id: `${id}-pe-1`, type: 'short_answer',
      prompt: 'What is one important concept you learned in this chapter?',
      correctAnswer: 'Refer to the chapter content.',
      explanation: 'Reflect on what you have learned.',
    }];
    warnings.push('practiceExercises was empty — filled with default');
  }

  if (!lesson.miniReview.content || !lesson.miniReview.content.trim()) {
    lesson.miniReview.content = 'You have completed this chapter. Review the key vocabulary and grammar points before moving on.';
    warnings.push('miniReview.content was empty — filled with default');
  }

  if (!lesson.selfAssessment || lesson.selfAssessment.length === 0) {
    lesson.selfAssessment = [
      'I can understand the key vocabulary from this chapter.',
      'I can use the grammar points correctly.',
      'I feel ready to move on to the next chapter.',
    ];
    warnings.push('selfAssessment was empty — filled with defaults');
  }

  return { lesson, warnings };
}

// ─── Pre-processing: strip lesson metadata headers from markdown ──────────────

/**
 * Removes the lesson-level metadata block (Lesson Information) and
 * any LESSON header lines so the markdown body contains only the
 * section content (# Warm-Up, # Lesson Explanation, etc.).
 */
function stripLessonHeaders(markdown: string): string {
  // Remove "# LESSON N" lines
  let cleaned = markdown.replace(/^# LESSON \d+.*$/gm, '');

  // Remove the Lesson Information metadata block (everything from
  // "# Lesson Information" through the next "---" or "# " header)
  cleaned = cleaned.replace(
    /^# Lesson Information[\s\S]*?(?=\n---|\n# (?:Warm|Lesson|Vocab|Gramm|Read|List|Speak|Writ|Pract|Mini|Self|Chapter))/m,
    '',
  );

  // Remove lingering "---" separators at section boundaries
  cleaned = cleaned.replace(/\n---\s*\n/g, '\n');

  return cleaned.trim();
}

// ─── Main parser ──────────────────────────────────────────────────────────────

export function parseLessonMarkdown(
  markdown: string,
  metadata: ParseMetadata,
): ParseResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  try {
    // Pre-process: strip lesson/chapter metadata headers
    let body = stripLessonHeaders(markdown);

    // Also strip "Chapter Overview" / "Chapter Vocabulary Bank" / etc.
    // if present (full chapter markdown was pasted but someone targets one lesson)
    body = body.replace(/^# Chapter Overview[\s\S]*?(?=\n# (?:Warm|Lesson|Vocab|Gramm|Read|List|Speak|Writ|Pract|Mini|Self|Chapter|LESSON|Grammar Summary|Mixed Practice|DELF))/m, '');

    const sections = splitSections(body);

    // Initialize lesson with metadata + empty defaults
    const lesson: any = {
      lessonId: metadata.lessonId,
      chapterId: metadata.chapterId,
      level: metadata.level,
      title: metadata.title,
      anchorSkill: metadata.anchorSkill,
      durationMinutes: metadata.durationMinutes,
      objectives: metadata.objectives,
      grammarFocus: metadata.grammarFocus,
      vocabularyFocus: metadata.vocabularyFocus,
      warmUp: { content: '' },
      explanation: { content: '' },
      vocabulary: [] as VocabItem[],
      grammar: {
        explanation: '',
        formation: '',
        usage: '',
        examples: [] as string[],
        commonMistakes: [] as { wrong: string; correct: string; why: string; tip?: string }[],
      },
      grammarDrills: { questions: [] as Question[] },
      reading: { title: '', text: '', questions: [] as Question[] },
      listening: { title: '', transcript: '', questions: [] as Question[] },
      speaking: { guidedActivity: '' },
      writing: { task: '', modelAnswer: '', checklist: [] as string[] },
      practiceExercises: { questions: [] as Question[] },
      miniReview: { content: '' },
      selfAssessment: [] as string[],
    };

    // Track which sections were found (for warnings about missing sections)
    const foundSections = new Set<string>();

    for (const s of sections) {
      const h = s.header.toLowerCase().trim();

      // Standard section headers
      if (h === 'warm-up' || h === 'warm up') {
        foundSections.add('warmUp');
        lesson.warmUp.content = clean(s.body.split('\n').filter(l => l.trim()).map(l => l.trim()).join(' '));
      } else if (h === 'lesson explanation') {
        foundSections.add('explanation');
        lesson.explanation.content = clean(s.body);
      } else if (h === 'vocabulary') {
        foundSections.add('vocabulary');
        lesson.vocabulary = parseVocabTable(s.body);
      } else if (h.startsWith('grammar') && !h.includes('summary') && !h.includes('drill')) {
        foundSections.add('grammar');
        lesson.grammar = parseGrammar(s.body);
        lesson.grammarDrills.questions = parseGrammarDrills(s.body, metadata.lessonId);
        if (lesson.grammarDrills.questions.length > 0) foundSections.add('grammarDrills');
      } else if (h === 'reading') {
        foundSections.add('reading');
        lesson.reading = parseReading(s.body, metadata.lessonId);
      } else if (h === 'listening') {
        foundSections.add('listening');
        lesson.listening = parseListening(s.body, metadata.lessonId);
      } else if (h === 'speaking') {
        foundSections.add('speaking');
        lesson.speaking = parseSpeaking(s.body);
      } else if (h === 'writing') {
        foundSections.add('writing');
        lesson.writing = parseWriting(s.body);
      } else if (h === 'practice exercises') {
        foundSections.add('practiceExercises');
        lesson.practiceExercises.questions = parsePracticeExercises(s.body, metadata.lessonId);
      } else if (h === 'mini review') {
        foundSections.add('miniReview');
        lesson.miniReview.content = clean(s.body.split('\n').filter(l => l.trim()).map(l => l.trim()).join(' '));
      } else if (h === 'self assessment' || h === 'self-reflection') {
        foundSections.add('selfAssessment');
        const items: string[] = [];
        for (const l of s.body.split('\n')) {
          const c = l.replace(/^\s*-\s*\[[ x]\]\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
          if (c && c !== '--' && c !== '---') items.push(stripMd(c));
        }
        lesson.selfAssessment = items;
      }
      // ── L8 (Chapter Review) special headers ──────────────────────────────
      else if (h.startsWith('chapter vocabulary bank')) {
        foundSections.add('vocabulary');
        lesson.vocabulary = parseVocabList(s.body);
      } else if (h.startsWith('grammar summary')) {
        foundSections.add('grammar');
        lesson.grammar = parseGrammarSummary(s.body);
      } else if (h.startsWith('chapter review') || h.includes('mini review by can-do')) {
        foundSections.add('miniReview');
        lesson.miniReview.content = clean(s.body.split('\n').filter(l => l.trim()).map(l => l.trim()).join(' '));
      } else if (h.startsWith('mixed practice exercises')) {
        foundSections.add('practiceExercises');
        lesson.practiceExercises.questions = parsePracticeExercises(s.body, metadata.lessonId);
      } else if (h.startsWith('delf')) {
        foundSections.add('practiceExercises');
        const delfQuestions = parsePracticeExercises(s.body, metadata.lessonId);
        lesson.practiceExercises.questions = [...lesson.practiceExercises.questions, ...delfQuestions];
      }
      // ── L7 (Integrated Practice) — may have fewer sections ───────────────
      // Integrated practice lessons reuse the same headers, just fewer of them.
      // If the header doesn't match any known section, we log a warning but don't fail.
      else if (h && !h.match(/^(lesson|chapter)/i)) {
        // Unknown header — skip silently (could be "Chapter Overview" etc.)
        // Only warn if it looks like a real content header we couldn't map
        if (!h.includes('overview') && !h.includes('information') && !h.includes('objective') &&
            !h.includes('communicative') && !h.includes('prerequisite') && !h.includes('outcome') &&
            !h.includes('cultural') && !h.includes('estimated')) {
          warnings.push(`Unknown section header: "${s.header}" — content skipped`);
        }
      }
    }

    // Sanitize: fill missing required fields with defaults
    const sanitized = sanitizeLesson(lesson);
    for (const w of sanitized.warnings) warnings.push(w);

    // Validate against schema
    const { valid, errors: validationErrors } = validateLesson(sanitized.lesson);

    if (!valid) {
      // Build contextual error messages with section info
      const contextualErrors = validationErrors.map(e => {
        // Add section context to the error
        const fieldPath = e.split(' ')[0] || '';
        return `${e} [section: ${fieldPath}]`;
      });

      return {
        success: false,
        errors: contextualErrors,
        warnings,
      };
    }

    return {
      success: true,
      lesson: sanitized.lesson,
      warnings,
    };
  } catch (err: any) {
    return {
      success: false,
      errors: [`Parser error: ${err.message}`],
      warnings,
    };
  }
}
