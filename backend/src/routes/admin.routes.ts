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
import { SystemSettings } from '../models/SystemSettings';
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

import { buildLanguageFilter } from '../utils/languageFilter';

/**
 * GET /api/admin/lessons
 */
router.get('/lessons', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const level = req.query.level as string;
    const language = req.query.language as string;
    const isPublished = req.query.isPublished as string;

    const filter: any = {};
    if (level) filter.level = level;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (language) {
      Object.assign(filter, buildLanguageFilter(language));
    }

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
 * POST /api/admin/lessons/bulk-delete
 * Body: { lessonIds: string[] }
 */
router.post('/lessons/bulk-delete', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { lessonIds } = req.body;
    if (!Array.isArray(lessonIds) || lessonIds.length === 0) {
      res.status(400).json({ success: false, error: 'lessonIds array is required' });
      return;
    }

    const lessonsToTrash = await Lesson.find({ _id: { $in: lessonIds } });
    const { TrashItem } = await import('../models/TrashItem');
    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

    for (const l of lessonsToTrash) {
      await TrashItem.create({
        title: l.title || l.lessonId || 'Untitled Lesson',
        lessonId: l.lessonId || 'A1-CH1-L1',
        level: l.level || 'A1',
        originalType: 'published',
        originalId: l._id.toString(),
        payload: l.toObject(),
        deletedBy: req.user?.email || 'admin',
        expiresAt,
      });
    }

    const deleteResult = await Lesson.deleteMany({ _id: { $in: lessonIds } });
    res.json({
      success: true,
      message: `Successfully moved ${deleteResult.deletedCount} lessons to the 60-Day Recycle Bin`,
      deletedCount: deleteResult.deletedCount,
    });
  } catch (err) {
    next(err);
  }
});

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
      
      const canonical = (lesson as any).canonical || lesson.toObject();
      if (!canonical || (!canonical.title && !canonical.lessonId)) {
        errors.push('Missing lesson document');
        auditResults.push({ lessonId: lesson.lessonId as string, title: lesson.title, level: lesson.level, errors, warnings });
        continue;
      }

      const lessonResult = validateLesson(canonical);
      if (!lessonResult.valid) {
        for (const err of lessonResult.errors) {
          errors.push(err);
        }
      }

      const vocabList = canonical.vocabItems || canonical.vocabulary || [];
      for (const item of vocabList) {
        if (item.french && item.french !== '—') {
          const key = item.french.toLowerCase().trim();
          if (!vocabularyMap.has(key)) {
            vocabularyMap.set(key, []);
          }
          vocabularyMap.get(key)!.push(lesson.lessonId as string);
        }
      }

      auditResults.push({
        lessonId: lesson.lessonId as string,
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

// ============ Module Gate Settings ============

// GET /api/admin/settings/gating
router.get('/settings/gating', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = await SystemSettings.create({
        gatingMode: 'all_locked',
        lockScope: 'module',
        passingScorePercentage: 70,
        lockedChapterIds: [],
        targetUserIds: [],
      });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/settings/gating
router.put('/settings/gating', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { gatingMode, lockScope, passingScorePercentage, lockedChapterIds, targetUserIds } = req.body;
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = new SystemSettings();
    }
    if (gatingMode) settings.gatingMode = gatingMode;
    if (lockScope) settings.lockScope = lockScope;
    if (passingScorePercentage !== undefined) settings.passingScorePercentage = passingScorePercentage;
    if (lockedChapterIds !== undefined) settings.lockedChapterIds = lockedChapterIds;
    if (targetUserIds !== undefined) settings.targetUserIds = targetUserIds;
    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id/gating-override
router.put('/users/:id/gating-override', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { unlockedChapters, isExemptFromGating } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    if (unlockedChapters !== undefined) user.unlockedChapters = unlockedChapters;
    if (isExemptFromGating !== undefined) user.isExemptFromGating = isExemptFromGating;
    await user.save();
    res.json({ success: true, message: 'Student module gate overrides updated', data: user });
  } catch (error) {
    next(error);
  }
});

// ============ Subscription & Custom Pricing Endpoints ============

// GET /api/admin/subscriptions/settings
router.get('/subscriptions/settings', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = await SystemSettings.create({});
    }
    res.json({
      success: true,
      data: {
        monthlyPrice: settings.monthlyPrice || 29,
        annualPrice: settings.annualPrice || 199,
        lifetimePrice: settings.lifetimePrice || 299,
        freePreviewScope: settings.freePreviewScope || 'first_chapter_a1',
        customFreeChapterIds: settings.customFreeChapterIds || [],
        customPricingPlans: settings.customPricingPlans || [],
        paywallEnforced: settings.paywallEnforced !== false,
      },
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/subscriptions/settings
router.put('/subscriptions/settings', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { monthlyPrice, annualPrice, lifetimePrice, freePreviewScope, customFreeChapterIds, customPricingPlans, paywallEnforced, isSocialHubEnabled } = req.body;
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = new SystemSettings();
    }
    if (monthlyPrice !== undefined) settings.monthlyPrice = monthlyPrice;
    if (annualPrice !== undefined) settings.annualPrice = annualPrice;
    if (lifetimePrice !== undefined) settings.lifetimePrice = lifetimePrice;
    if (freePreviewScope) settings.freePreviewScope = freePreviewScope;
    if (customFreeChapterIds !== undefined) settings.customFreeChapterIds = customFreeChapterIds;
    if (customPricingPlans !== undefined) settings.customPricingPlans = customPricingPlans;
    if (paywallEnforced !== undefined) settings.paywallEnforced = paywallEnforced;
    if (isSocialHubEnabled !== undefined) settings.isSocialHubEnabled = isSocialHubEnabled;
    await settings.save();
    res.json({ success: true, message: 'Subscription & Paywall settings updated', data: settings });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id/grant-free-access
router.put('/users/:id/grant-free-access', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { isVipFreeAccess, subscriptionTier } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    if (isVipFreeAccess !== undefined) user.isVipFreeAccess = isVipFreeAccess;
    if (subscriptionTier) user.subscriptionTier = subscriptionTier;
    if (isVipFreeAccess) {
      user.subscriptionTier = 'premium';
      user.isExemptFromGating = true;
    }
    await user.save();
    res.json({ success: true, message: '100% Free VIP Access Granted to Student', data: user });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/users/:id/custom-price
router.put('/users/:id/custom-price', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { customPriceOverride, specialDiscountRate } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    if (customPriceOverride !== undefined) user.customPriceOverride = customPriceOverride;
    if (specialDiscountRate !== undefined) user.specialDiscountRate = specialDiscountRate;
    await user.save();
    res.json({ success: true, message: 'Custom Student Price Override Applied', data: user });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/analytics/saas-overview
router.get('/analytics/saas-overview', async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const [allUsers, progressAgg] = await Promise.all([
      User.find({ role: { $ne: 'admin' } })
        .select('firstName lastName email subscriptionTier isVipFreeAccess customPriceOverride lastActiveAt isExplicitOffline currentPage updatedAt xp streak learningGoal targetExam createdAt')
        .lean(),
      StudentProgress.aggregate([
        {
          $group: {
            _id: '$userId',
            completedCount: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
            totalTimeSpentMinutes: { $sum: '$timeSpent' }
          }
        }
      ])
    ]);

    const totalStudents = allUsers.length;

    const progressMap: Record<string, { completedCount: number; totalTimeSpentMinutes: number }> = {};
    progressAgg.forEach(p => {
      progressMap[String(p._id)] = {
        completedCount: p.completedCount || 0,
        totalTimeSpentMinutes: p.totalTimeSpentMinutes || 0,
      };
    });

    const fortyFiveSecsAgo = new Date(Date.now() - 45 * 1000);
    const isUserOnline = (u: any) => {
      if (u.isExplicitOffline) return false;
      const activeTime = u.lastActiveAt ? new Date(u.lastActiveAt).getTime() : (u.updatedAt ? new Date(u.updatedAt).getTime() : 0);
      return activeTime >= fortyFiveSecsAgo.getTime();
    };

    const onlineUsers = allUsers.filter(isUserOnline);
    const onlineCount = onlineUsers.length;

    const freeUsers = allUsers.filter(u => u.subscriptionTier === 'free' && !u.isVipFreeAccess);
    const payingUsers = allUsers.filter(u => u.subscriptionTier === 'premium' || u.subscriptionTier === 'exam_prep' || (u.subscriptionTier as string) === 'lifetime');
    const vipFreeUsers = allUsers.filter(u => u.isVipFreeAccess);

    const planCounts = {
      monthly: allUsers.filter(u => u.subscriptionTier === 'premium' && !u.isVipFreeAccess).length,
      annual: allUsers.filter(u => u.subscriptionTier === 'exam_prep' && !u.isVipFreeAccess).length,
      lifetime: allUsers.filter(u => (u.subscriptionTier as string) === 'lifetime' && !u.isVipFreeAccess).length,
      vipFree: vipFreeUsers.length,
      free: freeUsers.length,
    };

    const monthlyPrice = 29;
    const annualMonthlyEq = Math.round(199 / 12);
    const mrr = (planCounts.monthly * monthlyPrice) + (planCounts.annual * annualMonthlyEq);
    const arr = mrr * 12;
    const arpu = payingUsers.length > 0 ? Math.round(mrr / payingUsers.length) : 0;
    const ltv = arpu * 18;
    const conversionRate = totalStudents > 0 ? Math.round((payingUsers.length / totalStudents) * 100) : 0;
    const activeRetentionRate = totalStudents > 0 ? Math.round((onlineCount / totalStudents) * 100) : 0;

    // Tally real exam goals
    const examCounts: Record<string, number> = {};
    allUsers.forEach(u => {
      const goal = u.learningGoal || (u as any).targetExam || 'Not Specified';
      examCounts[goal] = (examCounts[goal] || 0) + 1;
    });

    let topExamGoal = 'No goal set';
    let topExamCount = 0;
    Object.entries(examCounts).forEach(([goal, count]) => {
      if (count > topExamCount) {
        topExamGoal = goal;
        topExamCount = count;
      }
    });
    const topExamPercentage = totalStudents > 0 ? Math.round((topExamCount / totalStudents) * 100) : 0;

    // Calculate total study time across all students
    const totalMinutesFromProgress = progressAgg.reduce((sum, p) => sum + (p.totalTimeSpentMinutes || 0), 0);
    const totalXP = allUsers.reduce((sum, u) => sum + (u.xp || 0), 0);
    const minutesFromXP = totalXP;
    const effectiveTotalMinutes = Math.max(totalMinutesFromProgress, minutesFromXP);

    const totalStudyHours = Math.round((effectiveTotalMinutes / 60) * 10) / 10;
    const avgSessionMinutes = totalStudents > 0 ? Math.round(effectiveTotalMinutes / totalStudents) : 0;

    const studentRoster = allUsers.map(u => {
      const prog = progressMap[String(u._id)] || { completedCount: 0, totalTimeSpentMinutes: 0 };
      const hoursFromXP = (u.xp || 0) / 60;
      const hoursFromProgress = (prog.totalTimeSpentMinutes || 0) / 60;
      const computedStudyHours = Math.round(Math.max(hoursFromXP, hoursFromProgress) * 10) / 10;

      return {
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        subscriptionTier: u.subscriptionTier,
        isVipFreeAccess: u.isVipFreeAccess,
        customPriceOverride: u.customPriceOverride,
        isOnline: isUserOnline(u),
        lastActive: u.lastActiveAt || u.updatedAt,
        currentPage: (u as any).currentPage || '',
        studyHours: computedStudyHours,
        completedLessons: prog.completedCount,
        streakDays: u.streak || 0,
        xp: u.xp || 0,
        joinedAt: (u as any).createdAt,
        targetExam: u.learningGoal || (u as any).targetExam || 'Not Specified',
      };
    });

    res.json({
      success: true,
      data: {
        totalStudents,
        onlineCount,
        freeCount: freeUsers.length,
        payingCount: payingUsers.length,
        vipFreeCount: vipFreeUsers.length,
        mrr,
        arr,
        arpu,
        ltv,
        conversionRate,
        activeRetentionRate,
        planCounts,
        telemetry: {
          topExamGoal: topExamCount > 0 ? `${topExamGoal} (${topExamPercentage}%)` : 'No goal set yet',
          examBreakdown: examCounts,
          totalStudyHours,
          avgSessionMinutes: `${avgSessionMinutes} Minutes`,
          activeStudentsCount: totalStudents,
        },
        students: studentRoster,
      },
    });
  } catch (error) {
    next(error);
  }
});

// ============ Content Pipeline ============
import contentPipelineRoutes from './admin.contentPipeline';
router.use(contentPipelineRoutes);

export default router;