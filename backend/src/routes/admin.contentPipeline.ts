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

// ─── Schema validator (loaded once) ────────────────────────────────────────
const ajv = new Ajv({ allErrors: true, strict: false });

// 1. Standard Schema (Lessons 1-6)
const lessonSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'lessonId', 'chapterId', 'level', 'title', 'anchorSkill', 'durationMinutes',
    'objectives', 'grammarFocus', 'vocabularyFocus',
    'warmUp', 'explanation', 'vocabulary', 'grammar', 'grammarDrills',
    'reading', 'listening', 'speaking', 'writing', 'practiceExercises',
    'miniReview', 'selfAssessment',
  ],
  properties: {
    lessonId: { type: 'string' },
    chapterId: { type: 'string' },
    level: { type: 'string', enum: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    title: { type: 'string' },
    anchorSkill: { type: 'string', enum: ['reading', 'writing', 'listening', 'speaking', 'integrated', 'review'] },
    durationMinutes: { type: 'integer', minimum: 5, maximum: 90 },
    objectives: { type: 'array', items: { type: 'string' }, minItems: 1 },
    grammarFocus: { type: 'string' },
    vocabularyFocus: { type: 'string' },
    warmUp: { type: 'object', additionalProperties: false, required: ['content'], properties: { content: { type: 'string', minLength: 1 } } },
    explanation: { type: 'object', additionalProperties: false, required: ['content'], properties: { content: { type: 'string', minLength: 1 } } },
    vocabulary: { type: 'array' },
    grammar: { type: 'object', additionalProperties: false, required: ['explanation', 'formation', 'usage', 'examples', 'commonMistakes'], properties: {
      explanation: { type: 'string', minLength: 1 },
      formation: { type: 'string', minLength: 1 },
      usage: { type: 'string', minLength: 1 },
      examples: { type: 'array', items: { type: 'string' }, minItems: 1 },
      commonMistakes: { type: 'array', items: { type: 'object' } },
    }},
    grammarDrills: { type: 'object', additionalProperties: false, required: ['questions'], properties: { questions: { type: 'array', minItems: 1 } } },
    reading: { type: 'object', additionalProperties: false, required: ['title', 'text', 'questions'], properties: {
      title: { type: 'string' },
      text: { type: 'string', minLength: 1 },
      translation: { type: 'string' },
      questions: { type: 'array', minItems: 1 },
    }},
    listening: { type: 'object', additionalProperties: false, required: ['title', 'transcript', 'questions'], properties: {
      title: { type: 'string' },
      transcript: { type: 'string', minLength: 1 },
      translation: { type: 'string' },
      questions: { type: 'array', minItems: 1 },
    }},
    speaking: { type: 'object', additionalProperties: false, required: ['guidedActivity'], properties: {
      guidedActivity: { type: 'string', minLength: 1 },
      roleplay: { type: 'string' },
      pronunciationTip: { type: 'string' },
    }},
    writing: { type: 'object', additionalProperties: false, required: ['task', 'modelAnswer', 'checklist'], properties: {
      task: { type: 'string', minLength: 1 },
      modelAnswer: { type: 'string', minLength: 1 },
      checklist: { type: 'array', items: { type: 'string' }, minItems: 1 },
    }},
    practiceExercises: { type: 'object', additionalProperties: false, required: ['questions'], properties: { questions: { type: 'array', minItems: 1 } } },
    miniReview: { type: 'object', additionalProperties: false, required: ['content'], properties: { content: { type: 'string', minLength: 1 } } },
    selfAssessment: { type: 'array', items: { type: 'string' }, minItems: 1 },
  },
};

// 2. Integrated Schema (Lesson 7 - No vocabulary, grammar, or grammarDrills)
const lessonIntegratedSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'lessonId', 'chapterId', 'level', 'title', 'anchorSkill', 'durationMinutes',
    'objectives', 'grammarFocus', 'vocabularyFocus',
    'warmUp', 'explanation',
    'reading', 'listening', 'speaking', 'writing', 'practiceExercises',
    'miniReview', 'selfAssessment',
  ],
  properties: {
    ...lessonSchema.properties,
    vocabulary: { type: 'array', maxItems: 0 },
    grammar: { type: 'object', maxProperties: 0 },
    grammarDrills: { type: 'object', maxProperties: 0 },
  },
};

// 3. Review Schema (Lesson 8 - No reading, listening, speaking, writing)
const lessonReviewSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'lessonId', 'chapterId', 'level', 'title', 'anchorSkill', 'durationMinutes',
    'objectives', 'grammarFocus', 'vocabularyFocus',
    'warmUp', 'explanation', 'vocabulary', 'grammar',
    'practiceExercises', 'miniReview', 'selfAssessment',
  ],
  properties: {
    ...lessonSchema.properties,
    reading: { type: 'object', maxProperties: 0 },
    listening: { type: 'object', maxProperties: 0 },
    speaking: { type: 'object', maxProperties: 0 },
    writing: { type: 'object', maxProperties: 0 },
  },
};

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

  // 1. Rendering Checks (11 sections)
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
        parsedLessons = Array.isArray(rawJson) ? rawJson : [rawJson];
        
        // Apply manual overrides to properties if specified
        for (const lesson of parsedLessons) {
          if (manualOverrides?.level) lesson.level = manualOverrides.level;
          if (manualOverrides?.chapterNum) lesson.chapterId = `${manualOverrides.level.toLowerCase()}-ch${manualOverrides.chapterNum}`;
          if (manualOverrides?.lessonNum) {
            const finalLvl = (manualOverrides.level || lesson.level || 'a1').toLowerCase();
            lesson.lessonId = `${finalLvl}-ch${manualOverrides.chapterNum || 1}-l${manualOverrides.lessonNum}`;
          }
          if (manualOverrides?.title) lesson.title = manualOverrides.title;
          if (manualOverrides?.anchorSkill) lesson.anchorSkill = manualOverrides.anchorSkill;
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
        detectedChapterNum = chapterMatch ? parseInt(chapterMatch[1]) : 1;
      }

      try {
        parsedLessons = parseLessonFromMarkdown(
          markdown,
          detectedLevel,
          parseInt(detectedChapterNum),
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
    const { status, level, lessonId, origin, page = '1', limit = '20' } = req.query as any;
    const filter: any = {};
    
    if (status) {
      if (status.includes(',')) {
        filter.status = { $in: status.split(',') };
      } else {
        filter.status = status;
      }
    }
    
    if (level) filter.level = level;
    if (lessonId) filter.lessonId = lessonId;
    
    if (origin) {
      if (origin.startsWith('!')) {
        filter.origin = { $ne: origin.substring(1) };
      } else {
        filter.origin = origin;
      }
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const [drafts, total] = await Promise.all([
      Draft.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limitNum),
      Draft.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: drafts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
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

export default router;
