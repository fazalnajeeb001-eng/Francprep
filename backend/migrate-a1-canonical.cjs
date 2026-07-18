/**
 * MIGRATION: Parse A1 markdown files → store as canonical field on existing lessons.
 * 
 * This script:
 * 1. Reads all 10 A1 chapter markdown files
 * 2. Parses them using the markdownLessonParser logic (ported to CommonJS)
 * 3. Matches each parsed lesson to existing MongoDB lessons by lessonId
 * 4. Saves the parsed data as the `canonical` field
 * 
 * Run: cd backend && node migrate-a1-canonical.cjs
 */

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { validateLesson } = require('./src/utils/validateLesson.cjs');

const MONGODB_URI = 'mongodb+srv://fazalnajeeb001_db_user:Allahisgreat1@francprep.qwpghaf.mongodb.net/?appName=Francprep';
const CONTENT_DIR = path.join(__dirname, '..', 'full a1 content including ledger and course skeleton');

const A1_CHAPTERS = [
  { level: 'A1', chapterNum: 1, filename: 'FrancPrep_A1_Chapter1_Greetings_First_Contact.md' },
  { level: 'A1', chapterNum: 2, filename: 'FrancPrep_A1_Chapter2_Personal_Information.md' },
  { level: 'A1', chapterNum: 3, filename: 'FrancPreP_A1_Chapter3_Describing_People_Family.md' },
  { level: 'A1', chapterNum: 4, filename: 'FrancPreP_A1_Chapter4_Daily_Routines.md' },
  { level: 'A1', chapterNum: 5, filename: 'FrancPreP_A1_Chapter5_Food_Dining.md' },
  { level: 'A1', chapterNum: 6, filename: 'FrancPreP_A1_Chapter6_Shopping_Money.md' },
  { level: 'A1', chapterNum: 7, filename: 'FrancPreP_A1_Chapter7_Numbers_Time_Dates.md' },
  { level: 'A1', chapterNum: 8, filename: 'FrancPreP_A1_Chapter8_Places_Directions.md' },
  { level: 'A1', chapterNum: 9, filename: 'FrancPreP_A1_Chapter9_Weather_Nature.md' },
  { level: 'A1', chapterNum: 10, filename: 'FrancPreP_A1_Chapter10_Health_Body_Leisure.md' },
];

// ─── Parser (ported from markdownLessonParser.ts) ──────────────────────────

function stripMd(t) {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`(.*?)`/g, '$1').trim();
}

function clean(t) {
  return t.replace(/\n---\s*\n?/g, '\n').replace(/\n--\s*\n?/g, '\n').replace(/\s*---\s*$/, '').replace(/\s*--\s*$/, '').trim();
}

function extractField(text, name) {
  const m = text.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[^\\*]|$)`, 'i'));
  return m ? stripMd(m[1].trim()) : '';
}

function splitSections(body) {
  const out = [];
  const lines = body.split('\n');
  let h = '', c = [];
  for (const l of lines) {
    const m = l.match(/^# (.+)$/);
    if (m) { if (h) out.push({ header: h, body: c.join('\n').trim() }); h = m[1].trim(); c = []; }
    else c.push(l);
  }
  if (h) out.push({ header: h, body: c.join('\n').trim() });
  return out;
}

function parseVocabTable(text) {
  const out = [];
  for (const line of text.split('\n')) {
    if (!line.includes('|')) continue;
    const cells = line.split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length < 4 || cells[0] === 'French' || cells[0].match(/^[-:]+$/)) continue;
    out.push({ french: cells[0], english: cells[1], pronunciation: cells[2], example: cells[3] });
  }
  return out;
}

function parseGrammar(text) {
  const explanation = clean(extractField(text, 'Explanation'));
  const usage = clean(extractField(text, 'Usage'));

  let formation = '';
  const fm = text.match(/\*\*Formation[^:]*:\*\*\s*([\s\S]*?)(?=\n\*\*Usage|\n\*\*Examples|\n\*\*Common|\n\*\*Mini|$)/i);
  if (fm) {
    formation = fm[1].replace(/^\s*[-•*]\s*/gm, '').replace(/\|[^|]*\|/g, '').split('\n').filter(l => l.trim()).map(l => l.trim()).join('; ');
  }

  const examples = [];
  const em = text.match(/\*\*Examples?:\*\*\s*([\s\S]*?)(?=\n\*\*Common|\n\*\*Mini|$)/i);
  if (em) {
    for (const line of em[1].split('\n')) {
      const c = line.replace(/^\s*\d+\.\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
      if (c && !c.startsWith('**')) examples.push(stripMd(c));
    }
  }

  const commonMistakes = [];
  const mm = text.match(/\*\*Common Mistakes?:\*\*\s*([\s\S]*?)(?=\n\*\*Mini|\n#|$)/i);
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

function parseGrammarDrills(text) {
  const qs = [];
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

    const hintMatch = rawPrompt.match(/_{3,}\s*\((.+?)\)/);
    if (hintMatch) {
      correctAnswer = stripMd(hintMatch[1]);
      explanation = `Fill in with: ${correctAnswer}`;
    } else if (rawPrompt.includes('→')) {
      const parts = rawPrompt.split('→');
      const source = parts[0].replace(/[:]\s*$/, '').trim();
      const afterArrow = parts[1]?.trim() || '';
      if (afterArrow && !afterArrow.match(/^_{3,}$/) && !afterArrow.match(/^\d+$/)) {
        correctAnswer = stripMd(afterArrow);
      } else {
        correctAnswer = '';
      }
      explanation = instruction || stripMd(source);
    } else if ((rawPrompt.includes('__________') || rawPrompt.includes('______')) && rawPrompt.includes(':')) {
      const parts = rawPrompt.split(':');
      const context = parts[0].trim();
      const afterColon = parts.slice(1).join(':').trim();
      const afterBlank = afterColon.split(/_{3,}/)[1]?.trim()?.replace(/^[.!?,;:\s]+/, '') || '';
      correctAnswer = stripMd(afterBlank);
      explanation = stripMd(context);
    } else if (rawPrompt.includes('__________') || rawPrompt.includes('______')) {
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
    } else {
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

function parseListening(text) {
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

  let translation;
  const questions = [];

  const activitySource = afterTrans || text;
  const tp = activitySource.split(/\*\*Listening(?:\/Reading)?\s*Activity/i);
  if (!afterTrans && tp.length > 1) {
    translation = undefined;
  } else {
    translation = (tp[0] || '').split('\n').filter(l => l.trim()).map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\(.*?A1.*?support.*?\)/i, '').trim()).filter(l => l && !l.startsWith('(')).join('\n').trim() || undefined;
  }

  const activityHeader = tp[1] || '';
  let activityType = 'true_false';
  if (/answer the questions/i.test(activityHeader)) activityType = 'short_answer';
  else if (/multiple choice/i.test(activityHeader)) activityType = 'multiple_choice';
  else if (/fill in the blank/i.test(activityHeader)) activityType = 'fill_blank';
  else if (/true or false/i.test(activityHeader)) activityType = 'true_false';
  else if (/short answer/i.test(activityHeader)) activityType = 'short_answer';

  const ap = activityHeader.split(/\*\*Answer Key/i);
  const answerSection = (ap[1] || '').replace(/^:\s*/, '');
  const answerLines = answerSection.split('\n');
  const questionLines = (ap[0] || '').split('\n');

  const answers = [];
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
        id: `li-${n}`,
        type: 'true_false',
        prompt: qPrompt,
        options: ['True', 'False'],
        correctAnswer: answer.correct || 'False',
        explanation: answer.explanation || `The statement is ${answer.correct}.`,
      });
    } else if (activityType === 'multiple_choice') {
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
      questions.push({
        id: `li-${n}`,
        type: 'short_answer',
        prompt: qPrompt,
        correctAnswer: answer.correct,
        explanation: answer.explanation || `The answer is: ${answer.correct}`,
      });
    }
  }

  if (questions.length === 0 && answers.length > 0) {
    const instructionMatch = activityHeader.match(/\*\*Listening Activity:\*\*\s*(.+?)(?:\n|$)/i);
    const instruction = instructionMatch ? stripMd(instructionMatch[1]) : 'Listen and answer.';

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

function parseSpeaking(text) {
  const parts = text.split(/\*\*Roleplay/i);
  const mainPart = parts[0] || '';
  const roleplayPart = parts[1] || '';

  let guidedActivity = '';
  const gm = mainPart.match(/Guided Activity[^:]*:\*\*\s*([\s\S]*?)(?=\*\*|$)/i);
  if (gm) guidedActivity = gm[1].split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  else guidedActivity = clean(mainPart.split('\n').filter(l => l.trim() && !l.startsWith('**')).map(l => l.trim()).join(' '));

  let roleplay;
  let pronunciationTip;

  if (roleplayPart) {
    const rpLines = roleplayPart.split(/\*\*Pronunciation Tip/i);
    roleplay = rpLines[0].replace(/:\*\*\s*/, '').split('\n').filter(l => l.trim()).map(l => l.replace(/^[-•*]\s*/, '').trim()).join(' ');
    if (rpLines[1]) {
      pronunciationTip = rpLines[1].split('\n').filter(l => l.trim()).map(l => l.replace(/:\*\*\s*/, '').trim()).filter(l => l && l !== '---').join(' ').replace(/\s*---\s*$/, '').trim();
    }
  }

  return { guidedActivity, roleplay, pronunciationTip };
}

function parseWriting(text) {
  const task = (text.match(/\*\*Task:\*\*\s*([\s\S]*?)(?=\*\*Model|\*\*Writing|$)/i)?.[1] || '').split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  const modelAnswer = (text.match(/\*\*Model Answer:\*\*\s*([\s\S]*?)(?=\*\*Writing Checklist|\*\*Checklist|$)/i)?.[1] || '').split('\n').filter(l => l.trim()).map(l => l.trim()).join(' ');
  const checklist = [];
  const cm = text.match(/\*\*(?:Writing )?Checklist:\*\*\s*([\s\S]*?)$/i);
  if (cm) {
    for (const l of cm[1].split('\n')) {
      const c = l.replace(/^\s*-\s*\[ ?\]\s*/, '').replace(/^\s*[-•*]\s*/, '').trim();
      if (c && c !== '--' && c !== '---') checklist.push(stripMd(c));
    }
  }
  return { task, modelAnswer, checklist };
}

function parsePracticeExercises(text) {
  const qs = [];
  const lines = text.split('\n');
  let n = 0, curType = '', curPromptLines = [], inAK = false;
  const answers = [];

  const knownTypes = /Multiple Choice|Matching|Fill in the Blank|Sentence Ordering|Short Answer|Translation|True or False|Communicative Practice/i;

  for (const line of lines) {
    const t = line.trim();

    if (t.match(/^\*\*Answer Key/i)) {
      inAK = true;
      if (curPromptLines.length > 0 && curType) {
        n++;
        qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n')));
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
        qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n')));
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
    qs.push(buildPracticeQuestion(n, curType, curPromptLines.join('\n')));
  }

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
          const remappedPairs = [];
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
        const items = [];
        for (const letter of letterOrder) {
          const idx = letter.charCodeAt(0) - 97;
          items.push(q.items[idx] || `Item ${idx + 1}`);
        }
        q.items = items;
        q.correctAnswer = items;
      }
    } else if (q.type === 'short_answer') {
      q.correctAnswer = raw.replace(/^Sample answer:\s*/i, '').replace(/^\(Open-ended.*?\)\s*$/i, 'Open-ended — assess for correctness.').trim();
    } else {
      q.correctAnswer = stripMd(raw);
    }
  }

  for (const q of qs) {
    if (!q.explanation) {
      if (q.type === 'multiple_choice') q.explanation = q.correctAnswer ? `The correct answer is: ${q.correctAnswer}` : 'Select the best answer.';
      else if (q.type === 'matching') q.explanation = 'Match each item with its correct pair.';
      else if (q.type === 'ordering') q.explanation = 'Arrange the items in the correct order.';
      else if (q.type === 'fill_blank') q.explanation = q.correctAnswer ? `The answer is: ${q.correctAnswer}` : 'Fill in the blank.';
      else if (q.type === 'short_answer') q.explanation = q.correctAnswer ? `A sample answer: ${String(q.correctAnswer).slice(0, 100)}` : 'Provide a short written response.';
      else q.explanation = 'Complete the exercise.';
    }
  }

  return qs;
}

function buildPracticeQuestion(n, type, promptText) {
  const prompt = stripMd(promptText);

  if (type === 'multiple_choice') {
    const options = [];
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
      id: `pe-${n}`,
      type: 'multiple_choice',
      prompt: prompt.replace(/\s*[a-d]\)\s*.+/gi, '').trim(),
      options,
      correctAnswer: '',
      explanation: '',
    };
  }

  if (type === 'matching') {
    const pairs = [];
    const leftItems = [];
    const rightItems = [];

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
      id: `pe-${n}`,
      type: 'matching',
      prompt: prompt.replace(/^\s*\d+\.\s*.+/gm, '').trim() || 'Match the items.',
      pairs,
      correctAnswer: pairs,
      explanation: '',
    };
  }

  if (type === 'ordering') {
    const items = [];
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

  return {
    id: `pe-${n}`,
    type: type,
    prompt,
    correctAnswer: '',
    explanation: '',
  };
}

function parseReading(text) {
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

  let translation;
  const questions = [];

  if (afterTrans) {
    const tp = afterTrans.split(/\*\*Comprehension Questions/i);
    translation = (tp[0] || '').split('\n').filter(l => l.trim()).map(l => l.replace(/^\*+/, '').replace(/\*+$/, '').replace(/\(.*?A1.*?support.*?\)/i, '').trim()).filter(l => l && !l.startsWith('(')).join('\n').trim() || undefined;

    const qp = tp[1] || '';
    const ap = qp.split(/\*\*Answer Key/i);
    const aLines = (ap[1] || '').split('\n');
    const answers = [];
    for (const l of aLines) { const m = l.trim().match(/^\d+\.\s*(.+)/); if (m) answers.push(stripMd(m[1])); }

    let n = 0;
    for (const l of (ap[0] || '').split('\n')) {
      const m = l.trim().match(/^\d+\.\s*(.+)/);
      if (m) { n++; questions.push({ id: `r-${n}`, type: 'short_answer', prompt: stripMd(m[1]), correctAnswer: answers[n - 1] || '', explanation: answers[n - 1] ? `The answer is: ${answers[n - 1]}` : 'Refer to the reading passage.' }); }
    }
  }

  return { title, text: passage, translation, questions };
}

// ─── Main parser ────────────────────────────────────────────────────────────

function parseLessonFromMarkdown(markdown, level, chapterNum) {
  const lessons = [];
  const blocks = markdown.split(/^# LESSON \d+.*$/m).slice(1);

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const lessonNum = i + 1;
    const sections = splitSections(block);
    const lessonId = `${level.toLowerCase()}-ch${chapterNum}-l${lessonNum}`;
    const chapterId = `${level.toLowerCase()}-ch${chapterNum}`;

    const lesson = {
      lessonId, chapterId, level,
      title: extractField(block, 'Lesson Title') || `Lesson ${lessonNum}`,
      anchorSkill: extractField(block, 'Anchor Skill').replace(/\(.*\)/, '').trim().toLowerCase(),
      durationMinutes: 22,
      objectives: [extractField(block, 'Lesson Objectives')],
      grammarFocus: extractField(block, 'Grammar Focus'),
      vocabularyFocus: extractField(block, 'Vocabulary Focus'),
      warmUp: { content: '' },
      explanation: { content: '' },
      vocabItems: [],
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

    for (const s of sections) {
      const h = s.header.toLowerCase();
      if (h === 'warm-up' || h === 'warm up') lesson.warmUp.content = clean(s.body.split('\n').filter(l => l.trim()).map(l => l.trim()).join(' '));
      else if (h === 'lesson explanation') lesson.explanation.content = clean(s.body);
      else if (h === 'vocabulary') lesson.vocabItems = parseVocabTable(s.body);
      else if (h.startsWith('grammar')) { lesson.grammar = parseGrammar(s.body); lesson.grammarDrills.questions = parseGrammarDrills(s.body); }
      else if (h === 'reading') lesson.reading = parseReading(s.body);
      else if (h === 'listening') lesson.listening = parseListening(s.body);
      else if (h === 'speaking') lesson.speaking = parseSpeaking(s.body);
      else if (h === 'writing') lesson.writing = parseWriting(s.body);
      else if (h === 'practice exercises') lesson.practiceExercises.questions = parsePracticeExercises(s.body);
      else if (h === 'mini review') lesson.miniReview.content = clean(s.body.split('\n').filter(l => l.trim()).map(l => l.trim()).join(' '));
      else if (h === 'self assessment' || h === 'self-reflection') {
        const items = [];
        for (const l of s.body.split('\n')) { const c = l.replace(/^\s*-\s*\[[ x]\]\s*/, '').replace(/^\s*[-•*]\s*/, '').trim(); if (c && c !== '--' && c !== '---') items.push(stripMd(c)); }
        lesson.selfAssessment = items;
      }
    }

    lessons.push(lesson);
  }
  return lessons;
}

// ─── Migration ──────────────────────────────────────────────────────────────

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  console.log('Connected.\n');

  let totalParsed = 0;
  let totalUpdated = 0;
  let totalNotFound = 0;
  const errors = [];

  for (const ch of A1_CHAPTERS) {
    const filePath = path.join(CONTENT_DIR, ch.filename);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠ File not found: ${ch.filename}`);
      continue;
    }

    console.log(`\n📄 Parsing Chapter ${ch.chapterNum}: ${ch.filename}`);
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const lessons = parseLessonFromMarkdown(markdown, ch.level, ch.chapterNum);
    console.log(`   Parsed ${lessons.length} lessons`);

    for (const lesson of lessons) {
      totalParsed++;
      
      // Find existing lesson in MongoDB by lessonId
      const existing = await db.collection('lessons').findOne({ lessonId: lesson.lessonId });
      
      if (!existing) {
        console.log(`   ⚠ Lesson ${lesson.lessonId} not found in MongoDB`);
        totalNotFound++;
        continue;
      }

      // Validate lesson against schema before inserting
      const { valid, errors } = validateLesson(lesson);
      if (!valid) {
        console.error(`❌ Lesson ${lesson.lessonId} failed validation:`, errors);
        continue; // skip this lesson, don't insert
      }

      // Store parsed data as canonical field
      await db.collection('lessons').updateOne(
        { _id: existing._id },
        { $set: { canonical: lesson } }
      );
      totalUpdated++;
      console.log(`   ✓ ${lesson.lessonId}: ${lesson.title}`);
    }
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`📊 Migration Complete`);
  console.log(`   Total parsed: ${totalParsed}`);
  console.log(`   Updated: ${totalUpdated}`);
  console.log(`   Not found in DB: ${totalNotFound}`);
  if (errors.length) {
    console.log(`   Errors: ${errors.length}`);
    errors.forEach(e => console.log(`     - ${e.id}: ${e.error}`));
  }
  console.log('═══════════════════════════════════════\n');

  await mongoose.disconnect();
}

main().catch(e => {
  console.error('Migration failed:', e);
  process.exit(1);
});
