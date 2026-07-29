import Chapter from '../models/Chapter';
import Lesson from '../models/Lesson';
import Vocabulary from '../models/Vocabulary';
import Exercise from '../models/Exercise';
import mongoose from 'mongoose';

const CEFR_LEVELS = [
  { level: 'A1', title: 'French A1 — Beginner', description: 'Can understand and use familiar everyday expressions and very basic phrases. Can introduce themselves and others, and can ask and answer simple questions about personal details.' },
  { level: 'A2', title: 'French A2 — Elementary', description: 'Can understand sentences and frequently used expressions related to areas of immediate relevance. Can communicate in simple and routine tasks requiring a direct exchange of information.' },
  { level: 'B1', title: 'French B1 — Intermediate', description: 'Can understand the main points of clear standard input on familiar matters. Can deal with most situations likely to arise while travelling in a French-speaking area.' },
  { level: 'B2', title: 'French B2 — Upper Intermediate', description: 'Can understand the main ideas of complex text on both concrete and abstract topics. Can interact with a degree of fluency and spontaneity that makes regular interaction possible.' },
  { level: 'C1', title: 'French C1 — Advanced', description: 'Can understand a wide range of demanding, longer texts and recognise implicit meaning. Can express ideas fluently and spontaneously without much obvious searching for expressions.' },
  { level: 'C2', title: 'French C2 — Mastery', description: 'Can understand with ease virtually everything heard or read. Can summarise information from different spoken and written sources, reconstructing arguments in a coherent presentation.' },
];

export class ChapterService {
  async getChapterById(chapterId: string) {
    let chapter: any = null;
    if (mongoose.Types.ObjectId.isValid(chapterId)) {
      chapter = await Chapter.findById(chapterId);
    }
    if (!chapter) {
      const numMatch = chapterId.match(/\d+/);
      const chNum = numMatch ? parseInt(numMatch[0], 10) : 1;
      const chLevel = (chapterId.match(/^(a0|a1|a2|b1|b2|c1|c2)/i) || [])[1]?.toUpperCase() || 'A1';

      const db = mongoose.connection.db;
      if (db) {
        const course = await db.collection('courses').findOne({ level: chLevel });
        if (course) {
          const modules = await db.collection('modules').find({ courseId: course._id }).toArray();
          const modIds = modules.map((m: any) => m._id);
          chapter = await Chapter.findOne({ moduleId: { $in: modIds }, order: chNum });
        }
      }
    }

    if (!chapter) {
      chapter = await Chapter.findOne({ order: parseInt((chapterId.match(/\d+/) || ['1'])[0], 10) });
    }

    if (!chapter) {
      throw { status: 404, message: 'Chapter not found' };
    }

    const chObjId = chapter._id;
    const chNum = chapter.order;

    // Build module level map to ensure strict CEFR level isolation
    const db = mongoose.connection.db;
    let chLevel = 'A1';
    if (db && chapter.moduleId) {
      const mod = await db.collection('modules').findOne({ _id: chapter.moduleId });
      if (mod && mod.courseId) {
        const course = await db.collection('courses').findOne({ _id: mod.courseId });
        if (course && course.level) chLevel = course.level.toUpperCase();
      }
    }

    // Find published lessons strictly belonging to this chapter and level
    const lessons = await Lesson.find({
      level: chLevel,
      $or: [
        { chapterId: chObjId },
        { chapterId: chObjId.toString() },
        { lessonId: { $regex: new RegExp(`^${chLevel.toLowerCase()}-ch${chNum}-l`, 'i') } }
      ],
      isPublished: true,
    })
      .select('title order level category skill estimatedDuration isPublished sections objectives grammarTopics lessonId')
      .sort({ order: 1 })
      .lean();

    const chapterObj = typeof chapter.toJSON === 'function' ? chapter.toJSON() : chapter;
    chapterObj.lessons = lessons as any;
    chapterObj.lessonCount = lessons.length;
    return chapterObj;
  }

  async getChapterLessons(chapterId: string) {
    let chapter: any = null;
    if (mongoose.Types.ObjectId.isValid(chapterId)) {
      chapter = await Chapter.findById(chapterId);
    }
    const chObjId = chapter ? chapter._id : chapterId;
    const chNum = chapter ? chapter.order : parseInt((chapterId.match(/\d+/) || ['1'])[0], 10);

    const db = mongoose.connection.db;
    let chLevel = 'A1';
    if (db && chapter?.moduleId) {
      const mod = await db.collection('modules').findOne({ _id: chapter.moduleId });
      if (mod && mod.courseId) {
        const course = await db.collection('courses').findOne({ _id: mod.courseId });
        if (course && course.level) chLevel = course.level.toUpperCase();
      }
    }

    const lessons = await Lesson.find({
      level: chLevel,
      $or: [
        { chapterId: chObjId },
        { chapterId: chObjId.toString() },
        { lessonId: { $regex: new RegExp(`^${chLevel.toLowerCase()}-ch${chNum}-l`, 'i') } }
      ],
      isPublished: true,
    })
      .select('title order skill objectives grammarTopics estimatedDuration lessonId')
      .sort({ order: 1 });
    return lessons;
  }

  async getChapterVocabulary(chapterId: string) {
    const lessons = await Lesson.find({ chapterId }).select('_id');
    const lessonIds = lessons.map((l) => l._id);
    const vocabulary = await Vocabulary.find({ lessonId: { $in: lessonIds } })
      .populate('lessonId', 'title order')
      .sort({ french: 1 });
    return vocabulary;
  }

  async getChapterExercises(chapterId: string) {
    const lessons = await Lesson.find({ chapterId }).select('_id');
    const lessonIds = lessons.map((l) => l._id);
    const exercises = await Exercise.find({ lessonId: { $in: lessonIds } })
      .select('-questions.correctAnswer')
      .populate('lessonId', 'title order')
      .sort({ order: 1 });
    return exercises;
  }

  // Admin
  async createChapter(data: any) {
    const chapter = new Chapter(data);
    await chapter.save();
    return chapter;
  }

  async updateChapter(id: string, data: any) {
    const chapter = await Chapter.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!chapter) throw { status: 404, message: 'Chapter not found' };
    return chapter;
  }

  async deleteChapter(id: string) {
    const chapter = await Chapter.findByIdAndDelete(id);
    if (!chapter) throw { status: 404, message: 'Chapter not found' };
    await Lesson.deleteMany({ chapterId: id });
    return { message: 'Chapter and related lessons deleted' };
  }

  async getAllChapters(filters: any) {
    const { moduleId, page = 1, limit = 20 } = filters;
    const query: any = {};
    if (moduleId) query.moduleId = moduleId;

    const [chapters, total] = await Promise.all([
      Chapter.find(query)
        .populate({ path: 'lessons', select: 'title order' })
        .sort({ order: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Chapter.countDocuments(query),
    ]);

    return {
      success: true,
      data: chapters,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  // Public - get published chapters grouped by CEFR level
  // Queries lessons directly by chapterId for reliable lesson counts
  async getPublishedChapters(filters: any) {
    try {
      const db = mongoose.connection.db;
      if (!db) throw new Error('No database connection');

      // Get all published chapters
      const chapters = await Chapter.find({ isPublished: true })
        .sort({ order: 1 })
        .lean();

      // Query published lessons for ALL chapters in one go (avoids N+1 queries)
      const chapterIds = chapters.map((ch: any) => ch._id);
      const publishedLessons = await Lesson.find({
        chapterId: { $in: chapterIds },
        isPublished: true,
      })
        .select('title order level category skill estimatedDuration chapterId lessonId')
        .sort({ order: 1 })
        .lean();

      // Group lessons by chapter for fast lookup (supports ObjectId, string slug, and lessonId prefix matching)
      const lessonsByChapter: Record<string, any[]> = {};
      for (const lesson of publishedLessons) {
        let chId = (lesson as any).chapterId?.toString();
        if (!chId || chId.includes('-ch')) {
          const m = (lesson as any).lessonId?.match(/^(a0|a1|a2|b1|b2|c1|c2)-ch(\d+)/i);
          if (m) {
            const chLevel = m[1].toUpperCase();
            const chOrder = parseInt(m[2], 10);
            const foundCh = (chapters as any[]).find((ch: any) => ch.order === chOrder && moduleLevelMap[ch.moduleId?.toString()] === chLevel);
            if (foundCh) chId = foundCh._id.toString();
          }
        }
        if (!chId) continue;
        if (!lessonsByChapter[chId]) lessonsByChapter[chId] = [];
        lessonsByChapter[chId].push(lesson);
      }

      // Build a map of moduleId -> course level by querying directly
      const moduleIds = [...new Set(chapters.map((ch: any) => ch.moduleId?.toString()).filter(Boolean))];
      const modules = await db.collection('modules').find({ _id: { $in: moduleIds.map((id: string) => new mongoose.Types.ObjectId(id)) } }).toArray();
      const courseIds = [...new Set(modules.map((m: any) => m.courseId?.toString()).filter(Boolean))];
      const courses = await db.collection('courses').find({ _id: { $in: courseIds.map((id: string) => new mongoose.Types.ObjectId(id)) } }).toArray();

      // Map: moduleId -> course level
      const moduleLevelMap: Record<string, string> = {};
      const courseMap: Record<string, any> = {};
      for (const c of courses) {
        courseMap[c._id.toString()] = c;
      }
      for (const m of modules) {
        const course = courseMap[m.courseId?.toString()];
        if (course) {
          moduleLevelMap[m._id.toString()] = course.level;
        }
      }

      // Group chapters by level
      const grouped: Record<string, any[]> = {};
      for (const ch of chapters as any[]) {
        const modId = ch.moduleId?.toString();
        const lvl = moduleLevelMap[modId];
        if (!lvl) continue;
        if (!grouped[lvl]) grouped[lvl] = [];
        const chLessons = lessonsByChapter[ch._id.toString()] || [];
        grouped[lvl].push({
          _id: ch._id,
          title: ch.title,
          order: ch.order,
          estimatedTime: ch.estimatedTime,
          objectives: ch.objectives || [],
          lessons: chLessons,
          lessonCount: chLessons.length,
        });
      }

      // Build response with all 6 levels
      const data = CEFR_LEVELS.map((info) => ({
        level: info.level,
        title: info.title,
        description: info.description,
        chapters: grouped[info.level] || [],
      }));

      return { success: true, data };
    } catch (err) {
      console.error('getPublishedChapters error:', err);
      return { success: true, data: CEFR_LEVELS.map((info) => ({ level: info.level, title: info.title, description: info.description, chapters: [] })) };
    }
  }
}

export const chapterService = new ChapterService();