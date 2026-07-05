import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { lessonController } from '../controllers/lesson.controller';
import { exerciseController } from '../controllers/exercise.controller';
import { progressController } from '../controllers/progress.controller';
import {
  createLessonSchema,
  updateLessonSchema,
  createExerciseSchema,
  updateExerciseSchema,
} from '../utils/validators';
import User from '../models/User';
import Lesson from '../models/Lesson';
import Exercise from '../models/Exercise';
import Syllabus from '../models/Syllabus';
import StudentProgress from '../models/StudentProgress';
import { AuthRequest } from '../types';
import { Response, NextFunction } from 'express';

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
 * GET /api/admin/users
 */
router.get('/users', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find().sort('-createdAt').skip(skip).limit(limit),
      User.countDocuments(),
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

export default router;