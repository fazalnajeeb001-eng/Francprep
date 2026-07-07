import Chapter from '../models/Chapter';
import Lesson from '../models/Lesson';
import Vocabulary from '../models/Vocabulary';
import Exercise from '../models/Exercise';

export class ChapterService {
  async getChapterById(chapterId: string) {
    const chapter = await Chapter.findById(chapterId)
      .populate({
        path: 'lessons',
        select: 'title order skill estimatedDuration isPublished sections',
      })
      .populate({ path: 'moduleId', select: 'title' });
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
}

export const chapterService = new ChapterService();