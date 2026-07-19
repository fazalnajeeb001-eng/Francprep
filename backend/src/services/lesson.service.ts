import Lesson from '../models/Lesson';
import Chapter from '../models/Chapter';
import { createLessonSchema, updateLessonSchema } from '../utils/validators';
import { validateLesson } from '../utils/validateLesson';
import { z } from 'zod';

/**
 * Recursively walk a lesson object and remove `correctAnswer` and `explanation`
 * from every item inside any `questions[]` array anywhere in the tree.
 * This mutates the passed object in place.
 */
function stripAnswers(obj: any): void {
  if (obj == null || typeof obj !== 'object') return;

  // Skip recursion for Mongoose ObjectIds and Dates
  if (obj.constructor && (obj.constructor.name === 'ObjectID' || obj.constructor.name === 'ObjectId' || obj instanceof Date)) {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) stripAnswers(item);
    return;
  }

  // If this object has a `questions` array, strip each question in it
  if (Array.isArray(obj.questions)) {
    for (const q of obj.questions) {
      if (q && typeof q === 'object') {
        delete q.correctAnswer;
        delete q.explanation;
      }
    }
  }

  // Recurse into all values
  for (const value of Object.values(obj)) {
    stripAnswers(value);
  }
}

export class LessonService {
  /**
   * Get all published lessons with optional filtering
   */
  async getAllLessons(query: {
    level?: string;
    category?: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const { level, category, page = 1, limit = 20, sort = 'order' } = query;

    const filter: any = { isPublished: true };
    if (level) filter.level = level;
    if (category) filter.category = category;

    const skip = (page - 1) * limit;

    const [lessons, total] = await Promise.all([
      Lesson.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select('-content'), // Don't return full content in list
      Lesson.countDocuments(filter),
    ]);

    return {
      data: lessons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get lesson by ID with full content
   * Returns canonical format matching lesson.schema.json for the frontend.
   */
  async getLessonById(id: string) {
    // Try lessonId string first (e.g. "a1-ch1-l1"), then ObjectId
    let lesson = await Lesson.findOne({ lessonId: id });
    if (!lesson) lesson = await Lesson.findById(id);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }
    const obj: any = lesson.toJSON();

    // If lesson has canonical data, return it with metadata + frontend field names
    if (obj.canonical) {
      const canonical = { ...obj.canonical };
      canonical._id = obj._id;
      canonical.order = obj.order || 1;
      canonical.isPublished = obj.isPublished;
      canonical.chapterId = obj.chapterId?.toString?.() || obj.chapterId || canonical.chapterId;
      stripAnswers(canonical);

      // Remap schema field names → frontend field names (see LessonPage.tsx LessonData interface)
      // canonical.vocabulary (lesson.schema.json) → vocabItems (frontend)
      if (canonical.vocabulary && !canonical.vocabItems) {
        canonical.vocabItems = canonical.vocabulary;
        delete canonical.vocabulary;
      }
      // canonical.anchorSkill → skill (frontend reads `skill` for display)
      if (canonical.anchorSkill && !canonical.skill) {
        canonical.skill = canonical.anchorSkill;
      }

      return canonical;
    }

    // No canonical field — return the document directly.
    // Structured fields (warmUp, vocabItems, grammar, etc.) already match what the frontend expects.
    stripAnswers(obj);
    return obj;
  }

  /**
   * Create a new lesson (admin)
   */
  async createLesson(data: z.infer<typeof createLessonSchema>) {
    // Validate canonical lesson data against lesson.schema.json if present
    if (data.warmUp) {
      const validateData = {
        ...data,
        vocabulary: data.vocabItems,
      };
      delete (validateData as any).vocabItems;
      const { valid, errors } = validateLesson(validateData);
      if (!valid) {
        throw { statusCode: 400, message: `Lesson validation failed: ${errors.join('; ')}` };
      }
    }

    const lesson = await Lesson.create(data);
    
    // Sync to chapter if chapterId is provided
    if (data.chapterId) {
      await Chapter.findByIdAndUpdate(data.chapterId, {
        $addToSet: { lessons: lesson._id },
      });
    }
    
    return lesson.toJSON();
  }

  /**
   * Update a lesson (admin)
   */
  async updateLesson(id: string, data: z.infer<typeof updateLessonSchema>) {
    const oldLesson = await Lesson.findById(id);
    if (!oldLesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }

    // Validate canonical lesson data against lesson.schema.json if present
    if (data.warmUp) {
      const validateData = {
        ...data,
        vocabulary: data.vocabItems,
      };
      delete (validateData as any).vocabItems;
      const { valid, errors } = validateLesson(validateData);
      if (!valid) {
        throw { statusCode: 400, message: `Lesson validation failed: ${errors.join('; ')}` };
      }
    }

    const lesson = await Lesson.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }

    // If chapterId changed, update both old and new chapter's lessons arrays
    if (oldLesson && lesson.chapterId && oldLesson.chapterId?.toString() !== lesson.chapterId.toString()) {
      // Remove from old chapter
      if (oldLesson.chapterId) {
        await Chapter.findByIdAndUpdate(
          oldLesson.chapterId,
          { $pull: { lessons: lesson._id } }
        );
      }
      // Add to new chapter
      await Chapter.findByIdAndUpdate(
        lesson.chapterId,
        { $addToSet: { lessons: lesson._id } }
      );
    }

    return lesson.toJSON();
  }

  /**
   * Delete a lesson (admin)
   * Also removes the lesson from its chapter's lessons array
   */
  async deleteLesson(id: string) {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }

    // Remove from chapter's lessons array
    if (lesson.chapterId) {
      await Chapter.findByIdAndUpdate(
        lesson.chapterId,
        { $pull: { lessons: lesson._id } }
      );
    }

    await Lesson.findByIdAndDelete(id);
    return { message: 'Lesson deleted successfully' };
  }

  /**
   * Get all lessons for admin (including unpublished)
   */
  async getAllLessonsAdmin(query: {
    page?: number;
    limit?: number;
    level?: string;
    isPublished?: string;
  }) {
    const { page = 1, limit = 20, level, isPublished } = query;

    const filter: any = {};
    if (level) filter.level = level;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const skip = (page - 1) * limit;

    const [lessons, total] = await Promise.all([
      Lesson.find(filter).sort('level order').skip(skip).limit(limit),
      Lesson.countDocuments(filter),
    ]);

    return {
      data: lessons,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Securely grade a section of questions on the backend
   */
  async submitBlock(id: string, blockType: string, answers: Record<string, any>) {
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }

    const canonical = lesson.get('canonical');
    if (!canonical) {
      throw { statusCode: 400, message: 'Lesson has no canonical content to grade' };
    }

    // Identify which questions list we are grading
    let questions: any[] = [];
    if (blockType === 'grammarDrill') {
      questions = canonical.grammarDrills?.questions || [];
    } else if (blockType === 'reading') {
      questions = canonical.reading?.questions || [];
    } else if (blockType === 'listening') {
      questions = canonical.listening?.questions || [];
    } else if (blockType === 'practice' || blockType === 'delf') {
      questions = canonical.practiceExercises?.questions || [];
    } else {
      throw { statusCode: 400, message: `Invalid block type: ${blockType}` };
    }

    const results = questions.map((q: any) => {
      const qId = q.id;
      const userAns = answers[qId];
      const correct = q.correctAnswer;
      
      let isCorrect = false;
      if (q.type === 'short_answer' || q.type === 'translation') {
        // Self-graded, always marked true for validation progress
        isCorrect = true;
      } else if (correct !== undefined && userAns !== undefined) {
        const normalize = (s: string) => String(s).trim().toLowerCase();
        if (Array.isArray(correct)) {
          isCorrect = correct.some(c => normalize(c as string) === normalize(userAns as string));
        } else {
          isCorrect = normalize(correct as string) === normalize(userAns as string);
        }
      }

      return {
        questionId: qId,
        correct: isCorrect,
        points: isCorrect ? (q.points || 1) : 0,
        maxPoints: q.points || 1,
        explanation: q.explanation || `The correct answer is: ${Array.isArray(correct) ? correct.join(' or ') : correct}`,
        text: q.prompt,
      };
    });

    const totalScore = results.reduce((sum, r) => sum + r.points, 0);
    const maxPoints = results.reduce((sum, r) => sum + r.maxPoints, 0);
    const percentage = maxPoints > 0 ? (totalScore / maxPoints) * 100 : 0;
    const passed = percentage >= 60;

    return {
      results,
      totalScore,
      maxPoints,
      percentage,
      passed
    };
  }
}

export const lessonService = new LessonService();