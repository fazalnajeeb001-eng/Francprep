import Chapter from '../models/Chapter';
import Lesson from '../models/Lesson';
import Vocabulary from '../models/Vocabulary';
import Exercise from '../models/Exercise';

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
    const chapter = await Chapter.findById(chapterId)
      .populate({
        path: 'lessons',
        select: 'title order skill estimatedDuration isPublished sections',
      });
    if (!chapter) {
      throw { status: 404, message: 'Chapter not found' };
    }
    return chapter;
  }

  async getChapterLessons(chapterId: string) {
    const lessons = await Lesson.find({ chapterId, isPublished: true })
      .select('title order skill objectives grammarTopics estimatedDuration')
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
    // Also clean up related lessons
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
  async getPublishedChapters(filters: any) {
    // Get all published chapters with their module -> course -> level chain
    const chapters = await Chapter.find({ isPublished: true })
      .populate({
        path: 'lessons',
        select: 'title order level category skill estimatedDuration',
        match: { isPublished: true },
      })
      .populate({
        path: 'moduleId',
        select: 'courseId',
        populate: {
          path: 'courseId',
          model: 'Course',
          select: 'level name description',
        },
      })
      .sort({ order: 1 })
      .lean();

    // Group chapters by CEFR level
    const grouped: Record<string, any[]> = {};
    for (const ch of chapters as any[]) {
      const level = ch.moduleId?.courseId?.level || 'A1';
      if (!grouped[level]) grouped[level] = [];
      grouped[level].push({
        _id: ch._id,
        title: ch.title,
        order: ch.order,
        estimatedTime: ch.estimatedTime,
        objectives: ch.objectives,
        lessons: ch.lessons || [],
        lessonCount: (ch.lessons || []).filter((l: any) => l).length,
      });
    }

    // Build response for all 6 levels
    const data = CEFR_LEVELS.map((info) => ({
      level: info.level,
      title: info.title,
      description: info.description,
      chapters: grouped[info.level] || [],
    }));

    return { success: true, data };
  }
}

export const chapterService = new ChapterService();