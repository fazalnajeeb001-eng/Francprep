import { Router, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest } from '../types';
import Draft from '../models/Draft';
import Lesson from '../models/Lesson';
import { parseLessonFromMarkdown } from '../services/markdownLessonParser';
import Ajv from 'ajv';

const router = Router();

// All content pipeline routes require admin auth
router.use(authenticate, authorize('admin'));

// ─── Schema validator (loaded once) ────────────────────────────────────────
const ajv = new Ajv({ allErrors: true, strict: false });

// Inline lesson schema (matches lesson.schema.json)
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

const validateLesson = ajv.compile(lessonSchema);

function validateParsedLesson(lesson: any): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];

  const valid = validateLesson(lesson);
  if (!valid && validateLesson.errors) {
    for (const err of validateLesson.errors) {
      errors.push(`${err.instancePath || '/'} ${err.message}`);
    }
  }

  // Warnings for non-critical issues
  if (!lesson.objectives || lesson.objectives.length === 0) warnings.push('No objectives defined');
  if (!lesson.grammarFocus) warnings.push('No grammar focus defined');
  if (!lesson.vocabularyFocus) warnings.push('No vocabulary focus defined');
  if (lesson.durationMinutes < 15) warnings.push('Duration seems short (< 15 min)');
  if (lesson.vocabItems && lesson.vocabItems.length < 3) warnings.push('Few vocabulary items (< 3)');
  if (lesson.practiceExercises?.questions?.length < 2) warnings.push('Few practice exercises (< 2)');

  return { errors, warnings };
}

// ─── POST /content-pipeline/import ─────────────────────────────────────────
// Import markdown content, parse it, validate, and save as draft(s)
router.post('/content-pipeline/import', async (req: AuthRequest, res: Response) => {
  try {
    const { markdown, level, chapterNum, lessonId: targetLessonId } = req.body;

    if (!markdown || !level || !chapterNum) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: markdown, level, chapterNum',
      });
      return;
    }

    // Parse markdown into lessons
    const parsedLessons = parseLessonFromMarkdown(markdown, level, parseInt(chapterNum));

    if (parsedLessons.length === 0) {
      res.status(400).json({ success: false, error: 'No lessons found in the provided markdown' });
      return;
    }

    // If targeting a specific lesson, filter to just that one
    const lessonsToProcess = targetLessonId
      ? parsedLessons.filter(l => l.lessonId === targetLessonId)
      : parsedLessons;

    const results = [];

    for (const parsedLesson of lessonsToProcess) {
      const { errors, warnings } = validateParsedLesson(parsedLesson);

      // Check if a draft already exists for this lesson
      const existingDraft = await Draft.findOne({
        lessonId: parsedLesson.lessonId,
        status: { $in: ['draft', 'review', 'validated'] },
      });

      let draft;
      if (existingDraft) {
        // Update existing draft with new parsed data
        existingDraft.content = markdown;
        existingDraft.parsedData = parsedLesson;
        existingDraft.validationErrors = errors;
        existingDraft.validationWarnings = warnings;
        existingDraft.status = errors.length === 0 ? 'validated' : 'draft';
        existingDraft.version = existingDraft.version + 1;
        draft = await existingDraft.save();
      } else {
        // Create new draft
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
    const { status, level, lessonId, page = '1', limit = '20' } = req.query as any;
    const filter: any = {};
    if (status) filter.status = status;
    if (level) filter.level = level;
    if (lessonId) filter.lessonId = lessonId;

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
      const { errors, warnings } = validateParsedLesson(parsedData);
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

    const { errors, warnings } = validateParsedLesson(draft.parsedData);
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
    const { errors } = validateParsedLesson(draft.parsedData);
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

    // Update draft status
    draft.status = 'published';
    draft.publishedAt = new Date();
    draft.publishedBy = req.user?.email || 'admin';
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
        const { errors, warnings } = validateParsedLesson(parsedLesson);

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

export default router;
