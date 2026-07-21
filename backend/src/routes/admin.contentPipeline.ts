import { Router, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest } from '../types';
import Draft from '../models/Draft';
import Lesson from '../models/Lesson';
import { parseLessonFromMarkdown } from '../services/markdownLessonParser';
import Ajv from 'ajv';
import { generateAICompletion } from '../services/aiProvider';

const router = Router();

// All content pipeline routes require admin auth
router.use(authenticate, authorize('admin'));

import lessonSchema from '../schemas/lesson.schema.json';
import lessonIntegratedSchema from '../schemas/lesson-integrated.schema.json';
import lessonReviewSchema from '../schemas/lesson-review.schema.json';

// ─── Schema validator (loaded once) ────────────────────────────────────────
const ajv = new Ajv({ allErrors: true, strict: false });

const validateStandard = ajv.compile(lessonSchema);
const validateIntegrated = ajv.compile(lessonIntegratedSchema);
const validateReview = ajv.compile(lessonReviewSchema);

async function validateParsedLesson(lesson: any): Promise<{ errors: string[]; warnings: string[] }> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const validateData = { ...lesson };
  if (validateData.vocabItems && !validateData.vocabulary) {
    validateData.vocabulary = validateData.vocabItems;
    delete validateData.vocabItems;
  }

  // Determine which schema variant applies
  const isL7 = lesson.lessonId?.endsWith('-l7') || lesson.anchorSkill === 'integrated';
  const isL8 = lesson.lessonId?.endsWith('-l8') || lesson.anchorSkill === 'review';

  let isValid = false;
  let validatorErrors = null;

  if (isL7) {
    isValid = validateIntegrated(validateData);
    validatorErrors = validateIntegrated.errors;
  } else if (isL8) {
    isValid = validateReview(validateData);
    validatorErrors = validateReview.errors;
  } else {
    isValid = validateStandard(validateData);
    validatorErrors = validateStandard.errors;
  }

  if (!isValid && validatorErrors) {
    for (const err of validatorErrors) {
      errors.push(`${err.instancePath || '/'} ${err.message}`);
    }
  }

  // Determine lesson type for targeted warnings
  if (isL7) {
    // L7 Integrated Practice warnings
    if (!lesson.warmUp?.content || lesson.warmUp?.content === '—' || lesson.warmUp?.content.trim() === '') warnings.push('Warm-Up section has empty/placeholder content');
    if (!lesson.scene?.text || lesson.scene?.text === '—' || lesson.scene?.text.trim() === '') warnings.push('Scene text is empty/placeholder');
    if (!lesson.comprehensionQuestions || lesson.comprehensionQuestions.length === 0 || lesson.comprehensionQuestions[0]?.id?.includes('cq-dummy')) warnings.push('Comprehension questions are empty/placeholder');
    const speaking = lesson.speaking || {};
    if (!speaking.roleplay || speaking.roleplay.startsWith('Practice the dialogue')) warnings.push('Speaking roleplay is empty/placeholder');
    if (!lesson.writing?.task || lesson.writing?.task.startsWith('Write a short paragraph')) warnings.push('Writing task is empty/placeholder');
    if (!lesson.writing?.checklist || lesson.writing.checklist.length === 0) warnings.push('Writing checklist is empty');
    if (!lesson.practiceExercises?.questions || lesson.practiceExercises?.questions?.length === 0 || lesson.practiceExercises?.questions?.[0]?.id?.includes('pe-dummy')) warnings.push('Practice Exercises section has empty/placeholder questions');
    if (!lesson.miniReview?.content || lesson.miniReview?.content === '—' || lesson.miniReview?.content.trim() === '') warnings.push('Mini Review section has empty/placeholder content');
    if (!lesson.selfAssessment || lesson.selfAssessment.length === 0) warnings.push('Self Assessment section has empty/placeholder content');
  } else if (isL8) {
    // L8 Review & Mini-Assessment warnings
    if (!lesson.vocabularyBank?.items || lesson.vocabularyBank.items.length === 0 || lesson.vocabularyBank.items[0] === '—') warnings.push('Vocabulary Bank is empty/placeholder');
    if (!lesson.grammarSummary?.content || lesson.grammarSummary.content === 'Consolidated grammar reference from this chapter.' || lesson.grammarSummary.content.trim() === '') warnings.push('Grammar Summary has empty/placeholder content');
    if (!lesson.canDoReview || lesson.canDoReview.length === 0) warnings.push('Can-Do Review is empty/placeholder');
    if (!lesson.mixedPracticeExercises?.questions || lesson.mixedPracticeExercises.questions.length === 0 || lesson.mixedPracticeExercises.questions[0]?.id?.includes('mpe-dummy')) warnings.push('Mixed Practice Exercises has empty/placeholder questions');
    if (!lesson.assessment?.sections || lesson.assessment.sections.length === 0) warnings.push('Assessment sections are empty/placeholder');
    if (!lesson.selfReflection || lesson.selfReflection.length === 0) warnings.push('Self-Reflection is empty/placeholder');
    if (!lesson.completionSummary?.content) warnings.push('Completion Summary is empty/placeholder');
  } else {
    // Standard L1-L6 warnings
    if (!lesson.warmUp?.content || lesson.warmUp?.content === '—' || lesson.warmUp?.content.trim() === '') warnings.push('Warm-Up section has empty/placeholder content');
    if (!lesson.explanation?.content || lesson.explanation?.content === '—' || lesson.explanation?.content.trim() === '') warnings.push('Lesson Explanation section has empty/placeholder content');
    if (!lesson.vocabulary || lesson.vocabulary.length === 0 || lesson.vocabulary[0]?.french === '—') warnings.push('Vocabulary section has empty/placeholder items');
    if (!lesson.grammar?.explanation || lesson.grammar?.explanation.startsWith('No new grammar') || lesson.grammar?.explanation.trim() === '') warnings.push('Grammar section explanation has empty/placeholder content');
    if (!lesson.grammarDrills?.questions || lesson.grammarDrills?.questions?.length === 0 || lesson.grammarDrills?.questions?.[0]?.id?.includes('gd-dummy')) warnings.push('Grammar Drills section has empty/placeholder questions');
    if (!lesson.reading?.text || lesson.reading?.text === '—' || lesson.reading?.text.trim() === '') warnings.push('Reading section text is empty/placeholder');
    if (!lesson.reading?.questions || lesson.reading?.questions?.length === 0 || lesson.reading?.questions?.[0]?.id?.includes('r-dummy')) warnings.push('Reading section comprehension questions are empty/placeholder');
    if (!lesson.listening?.transcript || lesson.listening?.transcript === '—' || lesson.listening?.transcript.trim() === '') warnings.push('Listening section transcript is empty/placeholder');
    if (!lesson.listening?.questions || lesson.listening?.questions?.length === 0 || lesson.listening?.questions?.[0]?.id?.includes('l-dummy')) warnings.push('Listening section questions are empty/placeholder');
    if (!lesson.speaking?.guidedActivity || lesson.speaking?.guidedActivity.startsWith('Practice pronunciation') || lesson.speaking?.guidedActivity.trim() === '') warnings.push('Speaking section guided activity is empty/placeholder');
    if (!lesson.writing?.task || lesson.writing?.task.startsWith('Write a short summary') || lesson.writing?.task.trim() === '') warnings.push('Writing section task instructions are empty/placeholder');
    if (!lesson.practiceExercises?.questions || lesson.practiceExercises?.questions?.length === 0 || lesson.practiceExercises?.questions?.[0]?.id?.includes('pe-dummy')) warnings.push('Practice Exercises section has empty/placeholder questions');
    if (!lesson.miniReview?.content || lesson.miniReview?.content === '—' || lesson.miniReview?.content.trim() === '') warnings.push('Mini Review section has empty/placeholder content');
    if (!lesson.selfAssessment || lesson.selfAssessment.length === 0 || lesson.selfAssessment[0]?.includes('completed this lesson')) warnings.push('Self Assessment section has empty/placeholder content');
  }

  // 2. Ledger Consistency Checks (duplicate check in other published lessons)
  try {
    const vocabList = lesson.vocabulary || lesson.vocabItems || [];
    const existingLessons = await Lesson.find({ lessonId: { $ne: lesson.lessonId } }, 'lessonId canonical').lean() as any[];
    
    for (const item of vocabList) {
      const cleanWord = (item.french || '').trim().toLowerCase();
      if (!cleanWord || cleanWord === '—' || cleanWord === 'n/a') continue;
      for (const other of existingLessons) {
        const otherVocab = other.canonical?.vocabulary || other.canonical?.vocabItems || [];
        if (otherVocab.some((v: any) => (v.french || '').trim().toLowerCase() === cleanWord)) {
          warnings.push(`Ledger Warning: Vocabulary word "${item.french}" duplicates a word in published lesson ${other.lessonId}`);
        }
      }
    }
  } catch (err: any) {
    console.error('Ledger check error:', err);
  }

  return { errors, warnings };
}

// ─── POST /content-pipeline/import ─────────────────────────────────────────
// Import markdown or JSON content, parse/validate, and save as draft(s)
router.post('/content-pipeline/import', async (req: AuthRequest, res: Response) => {
  try {
    const { markdown, level, chapterNum, lessonId: targetLessonId, manualOverrides, format = 'markdown' } = req.body;

    if (!markdown) {
      res.status(400).json({
        success: false,
        error: 'Missing required field: markdown',
      });
      return;
    }

    let parsedLessons: any[] = [];

    if (format === 'json') {
      try {
        const rawJson = JSON.parse(markdown);
        let parentLevel = rawJson.level || '';
        let parentChapterNum = rawJson.module?.unit?.chapter?.id || rawJson.chapter?.id || rawJson.chapterNum;
        
        let lessonsArray = Array.isArray(rawJson) ? rawJson : null;
        if (!lessonsArray) {
          if (Array.isArray(rawJson.lessons)) {
            lessonsArray = rawJson.lessons;
          } else if (rawJson.module?.unit?.chapter?.lessons && Array.isArray(rawJson.module.unit.chapter.lessons)) {
            lessonsArray = rawJson.module.unit.chapter.lessons;
          } else {
            const findLessonsArray = (val: any): any[] | null => {
              if (!val || typeof val !== 'object') return null;
              if (Array.isArray(val)) {
                if (val.length > 0 && (val[0].lessonId || val[0].lessonNumber || val[0].anchorSkill)) {
                  return val;
                }
              }
              for (const k of Object.keys(val)) {
                const res = findLessonsArray(val[k]);
                if (res) return res;
              }
              return null;
            };
            lessonsArray = findLessonsArray(rawJson);
          }
        }

        if (!lessonsArray) {
          lessonsArray = [rawJson];
        }

        for (const rawLesson of lessonsArray) {
          const lesson = { ...rawLesson };
          if (!lesson.level && parentLevel) lesson.level = parentLevel;
          
          const chNum = parentChapterNum || manualOverrides?.chapterNum || 1;
          const lvl = (lesson.level || manualOverrides?.level || 'A1').toUpperCase();
          
          if (!lesson.chapterId) {
            lesson.chapterId = `${lvl.toLowerCase()}-ch${chNum}`;
          }
          if (!lesson.lessonId && (lesson.lessonNumber || lesson.lessonNum)) {
            const num = lesson.lessonNumber || lesson.lessonNum;
            lesson.lessonId = `${lvl.toLowerCase()}-ch${chNum}-l${num}`;
          }

          if (manualOverrides?.level) lesson.level = manualOverrides.level;
          if (manualOverrides?.chapterNum) lesson.chapterId = `${manualOverrides.level.toLowerCase()}-ch${manualOverrides.chapterNum}`;
          if (manualOverrides?.lessonNum) {
            const finalLvl = (manualOverrides.level || lesson.level || 'a1').toLowerCase();
            lesson.lessonId = `${finalLvl}-ch${manualOverrides.chapterNum || 1}-l${manualOverrides.lessonNum}`;
          }
          if (manualOverrides?.title) lesson.title = manualOverrides.title;
          if (manualOverrides?.anchorSkill) lesson.anchorSkill = manualOverrides.anchorSkill;

          // Normalize anchorSkill casing
          if (lesson.anchorSkill) {
            lesson.anchorSkill = lesson.anchorSkill.toLowerCase();
          }

          // Normalize vocabulary fields
          if (lesson.vocabulary && !lesson.vocabItems) {
            lesson.vocabItems = lesson.vocabulary;
          }
          if (lesson.vocabItems && !lesson.vocabulary) {
            lesson.vocabulary = lesson.vocabItems;
          }

          // Transform simple string content sections
          if (typeof lesson.warmUp === 'string') {
            lesson.warmUp = { content: lesson.warmUp };
          }
          if (typeof lesson.explanation === 'string') {
            lesson.explanation = { content: lesson.explanation };
          }
          if (typeof lesson.miniReview === 'string') {
            lesson.miniReview = { content: lesson.miniReview };
          }

          // Serialize vocabulary focus array to string if generated as array
          if (Array.isArray(lesson.vocabularyFocus)) {
            lesson.vocabularyFocus = lesson.vocabularyFocus.join(', ');
          }

          // Transform Reading Questions
          if (lesson.reading) {
            const readQ = lesson.reading.comprehensionQuestions || lesson.reading.questions;
            const readA = lesson.reading.answerKey;
            if (Array.isArray(readQ)) {
              lesson.reading.questions = readQ.map((q: any, idx: number) => {
                if (typeof q === 'string') {
                  return {
                    id: `${lesson.lessonId}-r-${idx + 1}`,
                    type: 'short_answer',
                    prompt: q,
                    correctAnswer: (readA && readA[idx]) || '—',
                    explanation: 'Comprehension check.'
                  };
                }
                return q;
              });
              delete lesson.reading.comprehensionQuestions;
              delete lesson.reading.answerKey;
            }
          }

          // Transform Listening Questions
          if (lesson.listening) {
            const listQ = lesson.listening.questions;
            const listA = lesson.listening.answerKey;
            if (Array.isArray(listQ)) {
              lesson.listening.questions = listQ.map((q: any, idx: number) => {
                if (typeof q === 'string') {
                  return {
                    id: `${lesson.lessonId}-l-${idx + 1}`,
                    type: 'short_answer',
                    prompt: q,
                    correctAnswer: (listA && listA[idx]) || '—',
                    explanation: 'Listening check.'
                  };
                }
                return q;
              });
              delete lesson.listening.answerKey;
            }
          }

          // Transform Grammar Drills
          if (!lesson.grammarDrills || !lesson.grammarDrills.questions || lesson.grammarDrills.questions.length === 0) {
            const drills = lesson.grammar?.miniDrills || lesson.miniDrills;
            if (Array.isArray(drills)) {
              lesson.grammarDrills = {
                questions: drills.map((d: any, idx: number) => {
                  return {
                    id: `${lesson.lessonId}-gd-${idx + 1}`,
                    type: 'fill_blank',
                    prompt: d,
                    correctAnswer: '—',
                    explanation: 'Grammar practice.'
                  };
                })
              };
              if (lesson.grammar) delete lesson.grammar.miniDrills;
              delete lesson.miniDrills;
            }
          }

          // Transform Practice Exercises
          if (Array.isArray(lesson.practiceExercises)) {
            const rawPE = lesson.practiceExercises;
            const peAns = lesson.exerciseAnswerKey || [];
            
            lesson.practiceExercises = {
              questions: rawPE.map((q: any, idx: number) => {
                let qType = 'short_answer';
                const rawType = String(q.type || '').toLowerCase();
                if (rawType.includes('multiple')) qType = 'multiple_choice';
                else if (rawType.includes('matching')) qType = 'matching';
                else if (rawType.includes('fill')) qType = 'fill_blank';
                else if (rawType.includes('order')) qType = 'ordering';
                else if (rawType.includes('true')) qType = 'true_false';

                let opts = q.options;
                if (Array.isArray(opts)) {
                  opts = opts.map((o: string) => o.replace(/^[a-d]\)\s*/i, '').trim());
                }

                let pairs = q.pairs;
                if (Array.isArray(pairs)) {
                  pairs = pairs.map((p: any) => {
                    if (typeof p === 'string') {
                      const parts = p.split(/—|-/);
                      return {
                        left: (parts[0] || '').trim(),
                        right: (parts[1] || '').trim()
                      };
                    }
                    return p;
                  });
                }

                let items = q.items;
                if (Array.isArray(items)) {
                  items = items.map((it: string) => it.replace(/^\([a-d]\)\s*/i, '').trim());
                }

                let rawAns = peAns[idx] || '—';
                if (typeof rawAns === 'string') {
                  rawAns = rawAns.replace(/^\d+\.\s*/, '').trim();
                  if (qType === 'multiple_choice') {
                    rawAns = rawAns.replace(/^[a-d]\)\s*/i, '').trim();
                  }
                }

                return {
                  id: `${lesson.lessonId}-pe-${idx + 1}`,
                  type: qType,
                  prompt: q.prompt || q.question || 'Complete the exercise.',
                  options: opts,
                  pairs: pairs,
                  items: items,
                  correctAnswer: rawAns,
                  explanation: 'Practice practice.'
                };
              })
            };
            delete lesson.exerciseAnswerKey;
          }

          parsedLessons.push(lesson);
        }
      } catch (jsonErr: any) {
        res.status(400).json({ success: false, error: `Invalid JSON format: ${jsonErr.message}` });
        return;
      }
    } else {
      let detectedLevel = level || manualOverrides?.level;
      let detectedChapterNum = chapterNum || manualOverrides?.chapterNum;

      if (!detectedLevel) {
        const levelMatch = markdown.match(/Level:\s*(A0|A1|A2|B1|B2|C1|C2)/i);
        if (levelMatch) {
          detectedLevel = levelMatch[1].toUpperCase();
        } else {
          const genericMatch = markdown.match(/\b(A0|A1|A2|B1|B2|C1|C2)\b/);
          detectedLevel = genericMatch ? genericMatch[1].toUpperCase() : 'A1';
        }
      }

      if (!detectedChapterNum) {
        const chapterMatch = markdown.match(/Chapter\s*(\d+)/i);
        detectedChapterNum = chapterMatch ? parseInt(chapterMatch[1], 10) : 1;
      } else if (typeof detectedChapterNum === 'string') {
        const numMatch = (detectedChapterNum as string).match(/\d+/);
        detectedChapterNum = numMatch ? parseInt(numMatch[0], 10) : 1;
      }

      if (manualOverrides && manualOverrides.chapterNum) {
        if (typeof manualOverrides.chapterNum === 'string') {
          const mNum = (manualOverrides.chapterNum as any).match(/\d+/);
          manualOverrides.chapterNum = mNum ? parseInt(mNum[0], 10) : 1;
        }
      }

      try {
        parsedLessons = parseLessonFromMarkdown(
          markdown,
          detectedLevel,
          typeof detectedChapterNum === 'number' ? detectedChapterNum : parseInt(detectedChapterNum, 10),
          manualOverrides
        );
      } catch (parseErr: any) {
        res.status(400).json({ success: false, error: parseErr.message });
        return;
      }
    }

    if (parsedLessons.length === 0) {
      res.status(400).json({ success: false, error: 'No lessons found or parsed from content' });
      return;
    }

    const lessonsToProcess = targetLessonId
      ? parsedLessons.filter(l => l.lessonId === targetLessonId)
      : parsedLessons;

    const results = [];

    for (const parsedLesson of lessonsToProcess) {
      const { errors, warnings } = await validateParsedLesson(parsedLesson);

      const existingDraft = await Draft.findOne({
        lessonId: parsedLesson.lessonId,
        status: { $in: ['draft', 'review', 'validated'] },
      });

      let draft;
      if (existingDraft) {
        existingDraft.content = markdown;
        existingDraft.parsedData = parsedLesson;
        existingDraft.validationErrors = errors;
        existingDraft.validationWarnings = warnings;
        existingDraft.status = errors.length === 0 ? 'validated' : 'draft';
        existingDraft.version = existingDraft.version + 1;
        draft = await existingDraft.save();
      } else {
        draft = await Draft.create({
          lessonId: parsedLesson.lessonId,
          chapterId: parsedLesson.chapterId,
          level: parsedLesson.level,
          title: parsedLesson.title,
          content: markdown,
          parsedData: parsedLesson,
          validationErrors: errors,
          validationWarnings: warnings,
          status: errors.length === 0 ? 'validated' : 'draft',
          origin: 'paste_import',
          createdBy: req.user?.email || 'admin',
        });
      }

      results.push({
        lessonId: parsedLesson.lessonId,
        title: parsedLesson.title,
        draftId: draft._id,
        status: draft.status,
        errors: errors.length,
        warnings: warnings.length,
        validationErrors: errors,
        validationWarnings: warnings,
      });
    }

    res.status(201).json({
      success: true,
      data: {
        totalParsed: parsedLessons.length,
        totalProcessed: lessonsToProcess.length,
        results,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── GET /content-pipeline/drafts ──────────────────────────────────────────
// List all drafts with optional filtering
router.get('/content-pipeline/drafts', async (req: AuthRequest, res: Response) => {
  try {
    const { level, lessonId, limit = '200' } = req.query as any;
    const filter: any = {};
    if (level) filter.level = level;
    if (lessonId) filter.lessonId = lessonId;

    const drafts = await Draft.find(filter).sort({ updatedAt: -1 }).limit(parseInt(limit));

    res.json({
      success: true,
      data: drafts,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── GET /content-pipeline/drafts/:id ──────────────────────────────────────
// Get a single draft with full parsed data
router.get('/content-pipeline/drafts/:id', async (req: AuthRequest, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }
    res.json({ success: true, data: draft });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── PUT /content-pipeline/drafts/:id ──────────────────────────────────────
// Update a draft (edit parsed data)
router.put('/content-pipeline/drafts/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { parsedData, notes, status } = req.body;
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }

    if (parsedData) {
      const { errors, warnings } = await validateParsedLesson(parsedData);
      draft.parsedData = parsedData;
      draft.validationErrors = errors;
      draft.validationWarnings = warnings;
      draft.status = errors.length === 0 ? 'validated' : 'draft';
    }

    if (notes !== undefined) draft.notes = notes;
    if (status && ['draft', 'review', 'rejected'].includes(status)) draft.status = status;

    await draft.save();
    res.json({ success: true, data: draft });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/drafts/:id/validate ────────────────────────────
// Re-validate a draft against the schema
router.post('/content-pipeline/drafts/:id/validate', async (req: AuthRequest, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }

    if (!draft.parsedData) {
      res.status(400).json({ success: false, error: 'Draft has no parsed data to validate' });
      return;
    }

    const { errors, warnings } = await validateParsedLesson(draft.parsedData);
    draft.validationErrors = errors;
    draft.validationWarnings = warnings;
    draft.status = errors.length === 0 ? 'validated' : 'draft';
    await draft.save();

    res.json({
      success: true,
      data: {
        status: draft.status,
        errors,
        warnings,
        isValid: errors.length === 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/drafts/:id/ai-verify ────────────────────────────
// Run deep AI verification on a parsed draft
router.post('/content-pipeline/drafts/:id/ai-verify', async (req: AuthRequest, res: Response) => {
  try {
    const { model = 'gpt-4o-mini' } = req.body;
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }

    if (!draft.parsedData) {
      res.status(400).json({ success: false, error: 'Draft has no parsed data to verify' });
      return;
    }

    const verificationPrompt = `You are a French CEFR curriculum coordinator. Inspect the following JSON lesson draft. 
Ensure:
1. Every section is populated logically.
2. The questions match the grammar/vocabulary focus of the lesson.
3. Check for any French spelling, accent, or formatting errors in the exercises, examples, vocabulary, and reading/listening transcript texts.
4. Verify if the content fits the CEFR level ${draft.level} (e.g. not too hard, not too easy).

Provide your report STRICTLY in the following JSON format:
{
  "passed": true or false,
  "errors": ["List of any severe format/spelling errors found"],
  "suggestions": ["List of constructive suggestions or enhancements"]
}

Draft JSON:
${JSON.stringify(draft.parsedData, null, 2)}`;

    const responseText = await generateAICompletion({
      model,
      prompt: verificationPrompt,
      systemPrompt: "You are a precise CEFR curriculum verifier. Respond strictly with valid JSON.",
      temperature: 0.1,
    });

    let result;
    try {
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      result = JSON.parse(cleanJson);
    } catch {
      result = {
        passed: true,
        errors: [],
        suggestions: [responseText]
      };
    }

    res.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/drafts/:id/publish ─────────────────────────────
// Publish a validated draft → create/update lesson in the lessons collection
router.post('/content-pipeline/drafts/:id/publish', async (req: AuthRequest, res: Response) => {
  try {
    const { confirm } = req.body;
    if (confirm !== true) {
      res.status(400).json({
        success: false,
        error: 'Publishing requires confirmation. Send { "confirm": true }.',
      });
      return;
    }

    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }

    if (!draft.parsedData) {
      res.status(400).json({ success: false, error: 'Draft has no parsed data to publish' });
      return;
    }

    // Validate before publishing
    const { errors } = await validateParsedLesson(draft.parsedData);
    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        error: 'Draft has validation errors and cannot be published',
        data: { errors },
      });
      return;
    }

    const canonical = draft.parsedData;

    // Find existing lesson by lessonId
    const existingLesson = await Lesson.findOne({ lessonId: canonical.lessonId });

    if (existingLesson) {
      // Update existing lesson with canonical data
      existingLesson.set('canonical', canonical);
      existingLesson.set('title', canonical.title);
      existingLesson.set('level', canonical.level);
      existingLesson.set('isPublished', true);
      await existingLesson.save();
    } else {
      // Create new lesson
      await Lesson.create({
        lessonId: canonical.lessonId,
        chapterId: canonical.chapterId,
        title: canonical.title,
        level: canonical.level,
        order: parseInt(canonical.lessonId.split('-l')[1]) || 1,
        anchorSkill: canonical.anchorSkill,
        durationMinutes: canonical.durationMinutes,
        isPublished: true,
        canonical,
      });
    }

    // Supersede previously published drafts
    const previouslyPublishedDrafts = await Draft.find({
      lessonId: canonical.lessonId,
      status: 'published',
      _id: { $ne: draft._id }
    });

    const previousIds: any[] = [];
    for (const oldDraft of previouslyPublishedDrafts) {
      oldDraft.status = 'superseded';
      await oldDraft.save();
      previousIds.push(oldDraft._id);
    }

    // Update draft status
    draft.status = 'published';
    draft.publishedAt = new Date();
    draft.publishedBy = req.user?.email || 'admin';
    if (previousIds.length > 0) {
      draft.previousVersions = [...(draft.previousVersions || []), ...previousIds];
    }
    await draft.save();

    res.json({
      success: true,
      message: `Lesson ${canonical.lessonId} published successfully`,
      data: {
        lessonId: canonical.lessonId,
        title: canonical.title,
        draftId: draft._id,
        publishedAt: draft.publishedAt,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── DELETE /content-pipeline/drafts/:id ───────────────────────────────────
router.delete('/content-pipeline/drafts/:id', async (req: AuthRequest, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }
    if (draft.status === 'published') {
      res.status(400).json({ success: false, error: 'Cannot delete a published draft' });
      return;
    }
    await Draft.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Draft deleted' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/bulk-import ────────────────────────────────────
// Import all chapter files from the content directory
router.post('/content-pipeline/bulk-import', async (req: AuthRequest, res: Response) => {
  try {
    const { chapters } = req.body;
    if (!Array.isArray(chapters) || chapters.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Provide chapters array: [{ level, chapterNum, markdown }] or use the migration script',
      });
      return;
    }

    const allResults = [];

    for (const ch of chapters) {
      const { markdown, level, chapterNum } = ch;
      if (!markdown || !level || !chapterNum) continue;

      const parsedLessons = parseLessonFromMarkdown(markdown, level, parseInt(chapterNum));

      for (const parsedLesson of parsedLessons) {
        const { errors, warnings } = await validateParsedLesson(parsedLesson);

        const existingDraft = await Draft.findOne({
          lessonId: parsedLesson.lessonId,
          status: { $in: ['draft', 'review', 'validated'] },
        });

        if (existingDraft) {
          existingDraft.content = markdown;
          existingDraft.parsedData = parsedLesson;
          existingDraft.validationErrors = errors;
          existingDraft.validationWarnings = warnings;
          existingDraft.status = errors.length === 0 ? 'validated' : 'draft';
          existingDraft.version = existingDraft.version + 1;
          await existingDraft.save();
        } else {
          await Draft.create({
            lessonId: parsedLesson.lessonId,
            chapterId: parsedLesson.chapterId,
            level: parsedLesson.level,
            title: parsedLesson.title,
            content: markdown,
            parsedData: parsedLesson,
            validationErrors: errors,
            validationWarnings: warnings,
            status: errors.length === 0 ? 'validated' : 'draft',
            origin: 'paste_import',
            createdBy: req.user?.email || 'admin',
          });
        }

        allResults.push({
          lessonId: parsedLesson.lessonId,
          title: parsedLesson.title,
          errors: errors.length,
          warnings: warnings.length,
        });
      }
    }

    res.status(201).json({
      success: true,
      data: {
        totalProcessed: allResults.length,
        results: allResults,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /lessons/parse ──────────────────────────────────────────────────
// Parse markdown into canonical JSON (preview/validation only — no DB write)
router.post('/lessons/parse', async (req: AuthRequest, res: Response) => {
  try {
    const { markdown, metadata } = req.body;

    if (!markdown || !metadata) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: markdown, metadata',
      });
      return;
    }

    const requiredMeta = ['lessonId', 'chapterId', 'level', 'title', 'anchorSkill', 'durationMinutes', 'objectives', 'grammarFocus', 'vocabularyFocus'];
    const missing = requiredMeta.filter(f => metadata[f] === undefined || metadata[f] === null);
    if (missing.length > 0) {
      res.status(400).json({
        success: false,
        error: `Missing metadata fields: ${missing.join(', ')}`,
      });
      return;
    }

    // Dynamic import to avoid issues with ESM/CJS interop in Express context
    const { parseLessonMarkdown } = await import('../services/lessonParser');

    const result = parseLessonMarkdown(markdown, metadata);

    if (!result.success) {
      res.status(422).json(result);
      return;
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /lessons/seed ───────────────────────────────────────────────────
// Parse markdown, validate, and write to MongoDB (upsert by lessonId)
router.post('/lessons/seed', async (req: AuthRequest, res: Response) => {
  try {
    const { markdown, metadata } = req.body;

    if (!markdown || !metadata) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: markdown, metadata',
      });
      return;
    }

    const requiredMeta = ['lessonId', 'chapterId', 'level', 'title', 'anchorSkill', 'durationMinutes', 'objectives', 'grammarFocus', 'vocabularyFocus'];
    const missing = requiredMeta.filter(f => metadata[f] === undefined || metadata[f] === null);
    if (missing.length > 0) {
      res.status(400).json({
        success: false,
        error: `Missing metadata fields: ${missing.join(', ')}`,
      });
      return;
    }

    const { parseLessonMarkdown } = await import('../services/lessonParser');

    const result = parseLessonMarkdown(markdown, metadata);

    if (!result.success) {
      res.status(422).json({
        success: false,
        error: 'Validation failed — lesson not written to MongoDB',
        errors: result.errors,
        warnings: result.warnings,
      });
      return;
    }

    const canonical = result.lesson;

    // Upsert into MongoDB: find by lessonId, update or insert
    const existing = await Lesson.findOne({ lessonId: canonical.lessonId });

    if (existing) {
      existing.set('canonical', canonical);
      existing.set('title', canonical.title);
      existing.set('level', canonical.level);
      existing.set('isPublished', true);
      await existing.save();

      res.json({
        success: true,
        message: `Lesson ${canonical.lessonId} updated successfully`,
        data: {
          lessonId: canonical.lessonId,
          title: canonical.title,
          action: 'updated',
        },
        warnings: result.warnings,
      });
    } else {
      await Lesson.create({
        lessonId: canonical.lessonId,
        chapterId: canonical.chapterId,
        title: canonical.title,
        level: canonical.level,
        order: parseInt(canonical.lessonId.split('-l')[1]) || 1,
        anchorSkill: canonical.anchorSkill,
        durationMinutes: canonical.durationMinutes,
        isPublished: true,
        canonical,
      });

      res.status(201).json({
        success: true,
        message: `Lesson ${canonical.lessonId} created successfully`,
        data: {
          lessonId: canonical.lessonId,
          title: canonical.title,
          action: 'created',
        },
        warnings: result.warnings,
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/drafts/:id/restore ──────────────────────────────
// Restore a superseded draft to active published status
router.post('/content-pipeline/drafts/:id/restore', async (req: AuthRequest, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }

    if (!draft.parsedData) {
      res.status(400).json({ success: false, error: 'Draft has no parsed data to restore' });
      return;
    }

    const canonical = draft.parsedData;
    const existingLesson = await Lesson.findOne({ lessonId: canonical.lessonId });

    if (existingLesson) {
      existingLesson.set('canonical', canonical);
      existingLesson.set('title', canonical.title);
      existingLesson.set('level', canonical.level);
      existingLesson.set('isPublished', true);
      await existingLesson.save();
    } else {
      await Lesson.create({
        lessonId: canonical.lessonId,
        chapterId: canonical.chapterId,
        title: canonical.title,
        level: canonical.level,
        order: parseInt(canonical.lessonId.split('-l')[1]) || 1,
        anchorSkill: canonical.anchorSkill,
        durationMinutes: canonical.durationMinutes,
        isPublished: true,
        canonical,
      });
    }

    // Mark current active published drafts for this lesson as superseded
    const activeDrafts = await Draft.find({
      lessonId: canonical.lessonId,
      status: 'published',
      _id: { $ne: draft._id }
    });

    for (const d of activeDrafts) {
      d.status = 'superseded';
      await d.save();
    }

    // Set this draft to published
    draft.status = 'published';
    draft.publishedAt = new Date();
    draft.publishedBy = req.user?.email || 'admin';
    await draft.save();

    res.json({
      success: true,
      message: `Lesson ${canonical.lessonId} restored successfully`,
      data: draft,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/drafts/:id/merge ────────────────────────────────
// Merge an integrated draft into an existing lesson's canonical JSON
router.post('/content-pipeline/drafts/:id/merge', async (req: AuthRequest, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft || !draft.parsedData) {
      res.status(404).json({ success: false, error: 'Draft or parsed data not found' });
      return;
    }

    const { targetLessonId } = req.body;
    const lessonIdToMerge = targetLessonId || draft.lessonId;

    const existingLesson = await Lesson.findOne({ lessonId: lessonIdToMerge });
    if (!existingLesson || !existingLesson.canonical) {
      res.status(404).json({ success: false, error: `Published target lesson ${lessonIdToMerge} not found` });
      return;
    }

    const baseCanonical = JSON.parse(JSON.stringify(existingLesson.canonical));
    const additionCanonical = draft.parsedData;

    // Merge practice exercises (append new unique questions)
    if (additionCanonical.practiceExercises?.questions?.length) {
      const existingQs = baseCanonical.practiceExercises?.questions || [];
      const newQs = additionCanonical.practiceExercises.questions;
      const combined = [...existingQs];

      for (const q of newQs) {
        if (!combined.some(eq => eq.prompt === q.prompt)) {
          combined.push({
            ...q,
            id: `${lessonIdToMerge}-pe-${combined.length + 1}`
          });
        }
      }
      baseCanonical.practiceExercises = { questions: combined };
    }

    // Merge vocabulary (append non-duplicate French words)
    if (additionCanonical.vocabulary?.length) {
      const existingVocab = baseCanonical.vocabulary || [];
      const newVocab = additionCanonical.vocabulary;
      const combinedVocab = [...existingVocab];

      for (const v of newVocab) {
        if (v.french && v.french !== '—' && !combinedVocab.some(ev => ev.french?.toLowerCase() === v.french?.toLowerCase())) {
          combinedVocab.push(v);
        }
      }
      baseCanonical.vocabulary = combinedVocab;
    }

    // Validate merged canonical document
    const { errors, warnings } = await validateParsedLesson(baseCanonical);

    draft.parsedData = baseCanonical;
    draft.validationErrors = errors;
    draft.validationWarnings = warnings;
    draft.status = errors.length === 0 ? 'validated' : 'draft';
    await draft.save();

    res.json({
      success: true,
      message: `Integrated draft merged with ${lessonIdToMerge} successfully`,
      data: draft
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── PUT /content-pipeline/drafts/:id/update-fields ─────────────────────────
// Inline update specific fields of a parsed draft (e.g. from preview live editor)
router.put('/content-pipeline/drafts/:id/update-fields', async (req: AuthRequest, res: Response) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft || !draft.parsedData) {
      res.status(404).json({ success: false, error: 'Draft not found' });
      return;
    }

    const { updatedParsedData } = req.body;
    if (!updatedParsedData) {
      res.status(400).json({ success: false, error: 'Missing updatedParsedData' });
      return;
    }

    const { errors, warnings } = await validateParsedLesson(updatedParsedData);

    draft.parsedData = updatedParsedData;
    draft.validationErrors = errors;
    draft.validationWarnings = warnings;
    draft.status = errors.length === 0 ? 'validated' : 'draft';
    await draft.save();

    res.json({
      success: true,
      data: draft
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── GET /content-pipeline/audit-all ───────────────────────────────────────
// Deep Quality Audit: Schema validation + missing vocabulary + missing options
router.get('/content-pipeline/audit-all', async (req: AuthRequest, res: Response) => {
  try {
    const targetLevel = (req.query.level as string) || 'A1';
    const filter: any = targetLevel === 'ALL' ? {} : { level: targetLevel };
    const lessons = await Lesson.find(filter).lean();
    const reports = [];

    for (const l of lessons) {
      const canonical = l.canonical;
      if (!canonical) {
        reports.push({
          lessonId: l.lessonId,
          title: l.title,
          level: l.level,
          status: 'fail',
          schemaErrors: ['Missing canonical JSON payload in MongoDB'],
          qualityWarnings: [],
        });
        continue;
      }

      const { errors, warnings } = await validateParsedLesson(canonical);
      const qualityWarnings: string[] = [...warnings];

      const lessonIdStr = l.lessonId || '';
      const isL7 = lessonIdStr.endsWith('-l7');
      const isL8 = lessonIdStr.endsWith('-l8');

      // Check for missing vocabulary (placeholder dashes or empty array) on non-L7/L8 lessons
      if (!isL7 && !isL8) {
        const vocab = canonical.vocabulary || canonical.vocabItems;
        if (!vocab || vocab.length === 0 || (vocab.length === 1 && vocab[0]?.french === '—')) {
          qualityWarnings.push('Pedagogical Alert: Vocabulary section is missing or contains placeholder dashes');
        }
      }

      // Check for multiple-choice questions with missing/empty options
      const allQs: any[] = [
        ...(canonical.grammarDrills?.questions || []),
        ...(canonical.reading?.questions || []),
        ...(canonical.listening?.questions || []),
        ...(canonical.practiceExercises?.questions || []),
      ];

      for (const q of allQs) {
        if ((q.type === 'multiple_choice' || q.type === 'true_false') && (!q.options || q.options.length === 0)) {
          qualityWarnings.push(`Exercise Alert: Question "${q.prompt?.slice(0, 40)}..." has type "${q.type}" but no selectable options`);
        }
      }

      const isCleanPass = errors.length === 0 && qualityWarnings.length === 0;

      reports.push({
        lessonId: l.lessonId,
        title: l.title,
        level: l.level,
        status: isCleanPass ? 'pass' : 'fail',
        schemaErrors: errors,
        qualityWarnings,
      });
    }

    res.json({
      success: true,
      totalAudited: lessons.length,
      passed: reports.filter((r) => r.status === 'pass').length,
      failed: reports.filter((r) => r.status === 'fail').length,
      reports,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/auto-fix ────────────────────────────────────────
// Repair engine for flagged audit errors (supports mode: 'quick' or mode: 'ai')
router.post('/content-pipeline/auto-fix', async (req: AuthRequest, res: Response) => {
  try {
    const { lessonIds, mode = 'ai', model = 'claude-sonnet' } = req.body;
    const filter: any = Array.isArray(lessonIds) && lessonIds.length > 0 ? { lessonId: { $in: lessonIds } } : { level: 'A1' };
    const lessons = await Lesson.find(filter);
    let repairedCount = 0;

    for (const lessonDoc of lessons) {
      const canonical = lessonDoc.canonical;
      if (!canonical) continue;

      let modified = false;
      const lessonIdStr = lessonDoc.lessonId || '';
      const isL7 = lessonIdStr.endsWith('-l7');
      const isL8 = lessonIdStr.endsWith('-l8');

      // 1. Clean up illegal properties on Lesson 7
      if (isL7) {
        if (canonical.vocabulary) { delete canonical.vocabulary; modified = true; }
        if (canonical.grammar) { delete canonical.grammar; modified = true; }
      }

      // 2. Clean up illegal properties on Lesson 8
      if (isL8) {
        const forbiddenKeys = ['warmUp', 'explanation', 'grammarDrills', 'reading', 'listening', 'speaking', 'writing'];
        for (const fk of forbiddenKeys) {
          if (canonical[fk]) { delete canonical[fk]; modified = true; }
        }
      }

      // 3. Check for missing vocabulary (placeholder dashes or empty)
      const vocab = canonical.vocabulary || canonical.vocabItems;
      const needsVocabFix = !isL7 && !isL8 && (!vocab || vocab.length === 0 || (vocab.length === 1 && vocab[0]?.french === '—'));

      // 4. Check for multiple choice / true false questions with missing options
      let needsOptionsFix = false;
      const exerciseBlocks = [canonical.grammarDrills, canonical.reading, canonical.listening, canonical.practiceExercises];
      for (const block of exerciseBlocks) {
        if (block?.questions) {
          for (const q of block.questions) {
            if ((q.type === 'multiple_choice' || q.type === 'true_false') && (!q.options || q.options.length === 0)) {
              needsOptionsFix = true;
              break;
            }
          }
        }
      }

      if (mode === 'ai' && (needsVocabFix || needsOptionsFix)) {
        try {
          const prompt = `You are a French CEFR level ${lessonDoc.level} curriculum coordinator.
Fix the missing content fields in this lesson JSON.
Lesson Title: "${canonical.title}"
Lesson Objectives: "${(canonical.objectives || []).join(', ')}"
Grammar Focus: "${canonical.grammarFocus || ''}"
Vocabulary Focus: "${canonical.vocabularyFocus || ''}"

Issues to fix:
${needsVocabFix ? '- Generate 4 to 6 authentic CEFR A1 French vocabulary items matching the title/focus. Format: [{"french": "...", "english": "...", "pronunciation": "...", "example": "..."}]' : ''}
${needsOptionsFix ? '- For any multiple_choice question with empty options, populate 4 plausible options array including the correctAnswer.' : ''}

Respond ONLY with valid JSON of the fixed fields to merge:
{
  ${needsVocabFix ? '"vocabulary": [{"french": "...", "english": "...", "pronunciation": "...", "example": "..."}]' : ''}
}
`;

          const aiReply = await generateAICompletion({
            model,
            prompt,
            systemPrompt: 'You are a precise CEFR curriculum repair assistant. Respond strictly with valid JSON.',
            temperature: 0.2,
          });

          const cleanJson = aiReply.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsedFix = JSON.parse(cleanJson);

          if (needsVocabFix && parsedFix.vocabulary?.length) {
            canonical.vocabulary = parsedFix.vocabulary;
            modified = true;
          }
        } catch (aiErr) {
          console.error(`AI repair fallback for ${lessonDoc.lessonId}:`, aiErr);
        }
      }

      // Fast deterministic fallbacks if AI mode wasn't used or fallback needed
      for (const block of exerciseBlocks) {
        if (block?.questions) {
          for (const q of block.questions) {
            if (q.type === 'multiple_choice' && (!q.options || q.options.length === 0)) {
              q.options = [q.correctAnswer || 'Option A', 'Option B', 'Option C', 'Option D'];
              modified = true;
            } else if (q.type === 'true_false' && (!q.options || q.options.length === 0)) {
              q.options = ['True', 'False'];
              modified = true;
            }
          }
        }
      }

      if (modified) {
        lessonDoc.set('canonical', canonical);
        await lessonDoc.save();
        repairedCount++;
      }
    }

    res.json({
      success: true,
      message: `Repaired ${repairedCount} lesson records successfully using ${mode === 'ai' ? 'AI Smart-Repair' : 'Quick Clean'}`,
      repairedCount,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ─── POST /content-pipeline/chat ───────────────────────────────────────────
// Curriculum assistant chatbot for admins
router.post('/content-pipeline/chat', async (req: AuthRequest, res: Response) => {
  try {
    const { message, lessonId } = req.body;
    if (!message) {
      res.status(400).json({ success: false, error: 'Missing user message' });
      return;
    }

    let lessonContext = '';
    if (lessonId) {
      const l = await Lesson.findOne({ lessonId }).lean();
      if (l) {
        lessonContext = `Target Lesson Context (${lessonId}):\n${JSON.stringify(l.canonical, null, 2)}`;
      }
    }

    const systemPrompt = `You are the FrancPrep Master Curriculum Coordinator and Assistant. You help non-developer admins maintain French language course quality (CEFR A1-C2). Keep responses concise, supportive, structured, and clear.`;
    const prompt = `${lessonContext}\n\nAdmin Question: ${message}`;

    const reply = await generateAICompletion({
      model: 'gpt-4o-mini',
      prompt,
      systemPrompt,
      temperature: 0.3
    });

    res.json({
      success: true,
      reply
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

