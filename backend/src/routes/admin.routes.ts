import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { lessonController } from '../controllers/lesson.controller';
import { exerciseController } from '../controllers/exercise.controller';
import { progressController } from '../controllers/progress.controller';
import { chapterController } from '../controllers/chapter.controller';
import {
  createLessonSchema,
  updateLessonSchema,
  createExerciseSchema,
  updateExerciseSchema,
  adminCreateUserSchema,
  resetPasswordSchema,
} from '../utils/validators';
import User from '../models/User';
import Lesson from '../models/Lesson';
import Exercise from '../models/Exercise';
import Syllabus from '../models/Syllabus';
import StudentProgress from '../models/StudentProgress';
import { AuthRequest } from '../types';
import { Response, NextFunction } from 'express';
import crypto from 'crypto';

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate, authorize('admin'));

// ============ Dashboard ============

/**
 * GET /api/admin/dashboard
 */
router.get('/dashboard', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [totalUsers, totalLessons, totalExercises, totalCompletedLessons] =
      await Promise.all([
        User.countDocuments(),
        Lesson.countDocuments(),
        Exercise.countDocuments(),
        StudentProgress.countDocuments({ status: 'completed' }),
      ]);

    const recentUsers = await User.find()
      .sort('-createdAt')
      .limit(5)
      .select('firstName lastName email role createdAt');

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalLessons,
          totalExercises,
          totalCompletedLessons,
        },
        recentUsers,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============ User Management ============

/**
 * GET /api/admin/users — list users with optional search & pagination
 * Supports ?search=, ?page=, ?limit=
 */
router.get('/users', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = (req.query.search as string) || '';
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (search) {
      const specialChars = /[.*+?^${}()|[\]\\]/g;
      const escaped = search.replace(specialChars, '\\$&');
      filter.$or = [
        { firstName: { $regex: escaped, $options: 'i' } },
        { lastName: { $regex: escaped, $options: 'i' } },
        { email: { $regex: escaped, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter).sort('-createdAt').skip(skip).limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/users/create — admin creates a user
 * If password not provided, generates a random one.
 */
router.post('/users/create', validate(adminCreateUserSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    // Auto-generate password if not provided
    if (!data.password) {
      data.password = crypto.randomBytes(12).toString('hex') + 'A1!';
    }

    // Check for duplicate email
    const existing = await User.findOne({ email: data.email });
    if (existing) {
      res.status(409).json({ success: false, error: 'A user with this email already exists' });
      return;
    }

    const user = await User.create(data);
    res.status(201).json({
      success: true,
      data: user.toJSON(),
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/users/:id/reset-password — admin-initiated password reset
 */
router.post('/users/:id/reset-password', validate(resetPasswordSchema), async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('+password');
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/users/:id
 */
router.get('/users/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/admin/users/:id
 */
router.put('/users/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const allowedUpdates = ['role', 'subscriptionTier', 'isActive'];
    const updates: any = {};

    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/admin/users/:id
 */
router.delete('/users/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    // Also clean up progress records
    await StudentProgress.deleteMany({ userId: req.params.id });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

// ============ Lesson Management ============

/**
 * GET /api/admin/lessons
 */
router.get('/lessons', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const level = req.query.level as string;
    const isPublished = req.query.isPublished as string;

    const filter: any = {};
    if (level) filter.level = level;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const skip = (page - 1) * limit;

    const [lessons, total] = await Promise.all([
      Lesson.find(filter).sort('level order').skip(skip).limit(limit),
      Lesson.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: lessons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/lessons
 */
router.post('/lessons', validate(createLessonSchema), (req, res, next) =>
  lessonController.create(req, res, next)
);

/**
 * PUT /api/admin/lessons/:id
 */
router.put('/lessons/:id', validate(updateLessonSchema), (req, res, next) =>
  lessonController.update(req, res, next)
);

/**
 * DELETE /api/admin/lessons/:id
 */
router.delete('/lessons/:id', (req, res, next) =>
  lessonController.delete(req, res, next)
);

/**
 * POST /api/admin/lessons/import-markdown
 * Import a chapter markdown file into the database.
 * Body: { filePath: string, level: string, chapterNum: number }
 */
router.post('/lessons/import-markdown', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { importChapterMarkdown } = await import('../services/markdownImport.service');
    const { filePath, level, chapterNum } = req.body;

    if (!filePath || !level || !chapterNum) {
      res.status(400).json({ error: 'filePath, level, and chapterNum are required' });
      return;
    }

    const result = await importChapterMarkdown(filePath, level, chapterNum);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
});

// ============ Exercise Management ============

/**
 * GET /api/admin/exercises
 */
router.get('/exercises', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const lessonId = req.query.lessonId as string;

    const filter: any = {};
    if (lessonId) filter.lessonId = lessonId;

    const skip = (page - 1) * limit;

    const [exercises, total] = await Promise.all([
      Exercise.find(filter)
        .populate('lessonId', 'title level')
        .sort('order')
        .skip(skip)
        .limit(limit),
      Exercise.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: exercises,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/exercises
 */
router.post('/exercises', validate(createExerciseSchema), (req, res, next) =>
  exerciseController.create(req, res, next)
);

/**
 * PUT /api/admin/exercises/:id
 */
router.put('/exercises/:id', validate(updateExerciseSchema), (req, res, next) =>
  exerciseController.update(req, res, next)
);

/**
 * DELETE /api/admin/exercises/:id
 */
router.delete('/exercises/:id', (req, res, next) =>
  exerciseController.delete(req, res, next)
);

// ============ Chapter Management ============

/**
 * GET /api/admin/chapters
 */
router.get('/chapters', (req, res, next) => chapterController.getAll(req, res, next));

/**
 * POST /api/admin/chapters
 */
router.post('/chapters', (req, res, next) => chapterController.create(req, res, next));

/**
 * PUT /api/admin/chapters/:id
 */
router.put('/chapters/:id', (req, res, next) => chapterController.update(req, res, next));

/**
 * DELETE /api/admin/chapters/:id
 */
router.delete('/chapters/:id', (req, res, next) => chapterController.delete(req, res, next));

// ============ Syllabus Management ============

/**
 * Recursively extracts all lesson ObjectIds from the nested units structure,
 * returning a flat deduplicated array. Used to sync `lessons` when `units` is provided.
 */
function extractLessonIdsFromUnits(units?: any[]): string[] {
  if (!units) return [];
  const ids = new Set<string>();
  for (const unit of units) {
    for (const chapter of unit.chapters || []) {
      for (const lessonId of chapter.lessons || []) {
        if (lessonId) ids.add(lessonId.toString());
      }
    }
  }
  return Array.from(ids);
}

/**
 * GET /api/admin/syllabi - List all syllabi
 */
router.get('/syllabi', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const level = req.query.level as string;
    const filter: any = {};
    if (level) filter.level = level;
    const skip = (page - 1) * limit;
    const [syllabi, total] = await Promise.all([
      Syllabus.find(filter)
        .populate('lessons', 'title order category')
        .populate({
          path: 'units.chapters.lessons',
          select: 'title order category level',
          model: 'Lesson',
        })
        .sort('order')
        .skip(skip)
        .limit(limit),
      Syllabus.countDocuments(filter),
    ]);
    res.status(200).json({
      success: true,
      data: syllabi,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/syllabi - Create a syllabus
 * If `units` is provided, auto-populates the flat `lessons` array from nested lesson IDs.
 */
router.post('/syllabi', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = { ...req.body };

    // If units are provided, sync the flat lessons field
    if (body.units) {
      body.lessons = extractLessonIdsFromUnits(body.units);
    }

    const syllabus = await Syllabus.create(body);
    res.status(201).json({
      success: true,
      data: syllabus.toJSON(),
      message: 'Syllabus created successfully',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/admin/syllabi/:id - Update a syllabus
 * If `units` is provided in the update, auto-syncs the flat `lessons` array.
 */
router.put('/syllabi/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = { ...req.body };

    // If units are provided, sync the flat lessons field
    if (body.units) {
      body.lessons = extractLessonIdsFromUnits(body.units);
    }

    const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!syllabus) {
      res.status(404).json({ success: false, error: 'Syllabus not found' });
      return;
    }
    res.status(200).json({ success: true, data: syllabus.toJSON(), message: 'Syllabus updated successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/admin/syllabi/:id - Delete a syllabus
 */
router.delete('/syllabi/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const syllabus = await Syllabus.findByIdAndDelete(req.params.id);
    if (!syllabus) {
      res.status(404).json({ success: false, error: 'Syllabus not found' });
      return;
    }
    res.status(200).json({ success: true, message: 'Syllabus deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// ============ Progress (Admin View) ============

/**
 * GET /api/admin/progress/users/:user_id
 */
router.get('/progress/users/:user_id', (req, res, next) =>
  progressController.getUserProgressAdmin(req, res, next)
);

// ============ Fix Exercise Categories ============

/**
 * POST /api/admin/fix-exercise-categories
 * Auto-sets category on exercises based on title/type
 */
router.post('/fix-exercise-categories', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const exercises = await Exercise.find({});
    let updated = 0;
    for (const ex of exercises) {
      if (ex.category) continue; // Already has category
      const title = (ex.title || '').toLowerCase();
      const type = ex.type || '';
      let category = 'other';
      if (type === 'listening') category = 'listening';
      else if (type === 'writing') category = 'writing';
      else if (title.includes('listening') || title.includes('audio')) category = 'listening';
      else if (title.includes('speaking') || title.includes('pronunciation') || title.includes('record')) category = 'speaking';
      else if (title.includes('reading') || title.includes('comprehension')) category = 'reading';
      
      await Exercise.findByIdAndUpdate(ex._id, { category });
      updated++;
    }
    res.status(200).json({ success: true, data: { total: exercises.length, updated } });
  } catch (error) {
    next(error);
  }
});

// ============ Access Control Management ============
import { StudentAccess } from '../models/StudentAccess';

/**
 * GET /api/admin/student-access - List all access overrides
 */
router.get('/student-access', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const overrides = await StudentAccess.find({}).populate('studentId', 'firstName lastName email');
    res.status(200).json({ success: true, data: overrides });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/admin/student-access - Save or update access override
 */
router.post('/student-access', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { scope, targetId, targetType, studentId, cohortId, state } = req.body;
    
    if (!scope || !targetId || !targetType || !state) {
      res.status(400).json({ success: false, error: 'Missing required override properties' });
      return;
    }

    const filter: any = { scope, targetId, targetType };
    if (scope === 'student') filter.studentId = studentId;
    if (scope === 'cohort') filter.cohortId = cohortId;

    const override = await StudentAccess.findOneAndUpdate(
      filter,
      { scope, targetId, targetType, studentId: studentId || undefined, cohortId: cohortId || undefined, state },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: override, message: 'Access override saved successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/admin/student-access/:id - Delete override (revert to defaults)
 */
router.delete('/student-access/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await StudentAccess.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Access override reverted to default' });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/admin/cohorts - Get distinct student cohorts list
 */
router.get('/cohorts', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cohorts = await User.distinct('cohort');
    res.status(200).json({ success: true, data: cohorts.filter(Boolean) });
  } catch (error) {
    next(error);
  }
});

// ============ Curriculum Audit Ledger ============
import { validateLesson } from '../utils/validateLesson';

/**
 * GET /api/admin/curriculum/audit - Audit whole curriculum structure & duplicates
 */
router.get('/curriculum/audit', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const lessons = await Lesson.find({ isPublished: true });
    const auditResults: Array<{ lessonId: string; title: string; level: string; errors: string[]; warnings: string[] }> = [];
    const vocabularyMap = new Map<string, string[]>();

    for (const lesson of lessons) {
      const errors: string[] = [];
      const warnings: string[] = [];
      
      const canonical = (lesson as any).canonical;
      if (!canonical) {
        errors.push('Missing canonical JSON document');
        auditResults.push({ lessonId: lesson.lessonId, title: lesson.title, level: lesson.level, errors, warnings });
        continue;
      }

      const isValid = validateLesson(canonical);
      if (!isValid && validateLesson.errors) {
        for (const err of validateLesson.errors) {
          errors.push(`${err.instancePath || '/'} ${err.message}`);
        }
      }

      const vocabList = canonical.vocabItems || canonical.vocabulary || [];
      for (const item of vocabList) {
        if (item.french && item.french !== '—') {
          const key = item.french.toLowerCase().trim();
          if (!vocabularyMap.has(key)) {
            vocabularyMap.set(key, []);
          }
          vocabularyMap.get(key)!.push(lesson.lessonId);
        }
      }

      auditResults.push({
        lessonId: lesson.lessonId,
        title: lesson.title,
        level: lesson.level,
        errors,
        warnings,
      });
    }

    const duplicates: Array<{ word: string; lessons: string[] }> = [];
    for (const [word, lessonIds] of vocabularyMap.entries()) {
      if (lessonIds.length > 1) {
        duplicates.push({ word, lessons: Array.from(new Set(lessonIds)) });
        for (const lessonId of lessonIds) {
          const audit = auditResults.find(a => a.lessonId === lessonId);
          if (audit) {
            audit.warnings.push(`Vocabulary word "${word}" is also taught in other lessons: ${lessonIds.filter(id => id !== lessonId).join(', ')}`);
          }
        }
      }
    }

    res.status(200).json({
      success: true,
      data: {
        totalLessonsChecked: lessons.length,
        lessons: auditResults,
        duplicates,
      }
    });
  } catch (error) {
    next(error);
  }
});

// ============ Content Pipeline ============
import contentPipelineRoutes from './admin.contentPipeline';
router.use(contentPipelineRoutes);

export default router;