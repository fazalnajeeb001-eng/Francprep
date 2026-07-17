import Lesson from '../models/Lesson';
import Chapter from '../models/Chapter';
import { createLessonSchema, updateLessonSchema } from '../utils/validators';
import { transformLesson } from './lessonTransform';
import { z } from 'zod';

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
   */
  async getLessonById(id: string) {
    // Try lessonId string first (e.g. "a1-ch1-l1"), then ObjectId
    let lesson = await Lesson.findOne({ lessonId: id });
    if (!lesson) lesson = await Lesson.findById(id);
    if (!lesson) {
      throw { statusCode: 404, message: 'Lesson not found' };
    }
    const obj: any = lesson.toJSON();
    if (obj.canonical) {
      return transformLesson(obj);
    }
    // Old-format lessons with sections[] but no canonical fields — transform to canonical shape
    if (!obj.warmUp && obj.sections && obj.sections.length > 0) {
      return this.sectionsToCanonical(obj);
    }
    return obj;
  }

  /**
   * Convert old-format sections[] into the canonical shape the frontend reads
   */
  private sectionsToCanonical(obj: any) {
    const sections = obj.sections || [];
    const findSection = (type: string) => sections.find((s: any) => s.type === type);

    const warmup = findSection('warmup');
    const explanation = findSection('explanation');
    const vocabulary = findSection('vocabulary');
    const grammar = findSection('grammar');
    const reading = findSection('reading');
    const listening = findSection('listening');
    const speaking = findSection('speaking');
    const writing = findSection('writing');
    const practice = findSection('practice');
    const review = findSection('review');

    // Parse vocabulary from pipe-delimited markdown table
    const vocabItems: any[] = [];
    if (vocabulary?.body) {
      const lines = vocabulary.body.split('\n').filter((l: string) => l.includes('|'));
      for (const line of lines) {
        const cells = line.split('|').map((c: string) => c.trim()).filter(Boolean);
        if (cells.length >= 2 && !cells[0].includes('---') && cells[0].toLowerCase() !== 'french') {
          vocabItems.push({
            french: cells[0],
            english: cells[1],
            pronunciation: cells[2] || '',
            example: cells[3] || '',
          });
        }
      }
    }

    // Parse questions from reading/listening body text
    const parseQuestions = (body: string): any[] => {
      if (!body) return [];
      const questions: any[] = [];
      const qMatches = body.match(/\d+\.\s+.+/g) || [];
      const answerKeyMatch = body.match(/Answer Key:\s*\n([\s\S]*?)(?:\n\n|$)/i);
      const answers = answerKeyMatch ? answerKeyMatch[1].match(/\d+\.\s+.+/g) || [] : [];
      for (let i = 0; i < qMatches.length && i < 10; i++) {
        const prompt = qMatches[i].replace(/^\d+\.\s+/, '').trim();
        if (prompt.length < 5 || prompt.startsWith('Answer')) continue;
        const answerLine = answers[i]?.replace(/^\d+\.\s+/, '').trim() || '';
        questions.push({
          id: `q-${obj.lessonId || obj._id}-${i}`,
          type: 'short_answer',
          prompt,
          correctAnswer: answerLine,
          explanation: '',
        });
      }
      return questions;
    };

    // Build reading text (without Q&A)
    let readingText = reading?.body || '';
    const readingQIdx = readingText.indexOf('Comprehension Questions:');
    if (readingQIdx > 0) readingText = readingText.slice(0, readingQIdx).trim();
    const readingTranslationIdx = readingText.indexOf('English Translation:');
    let readingTranslation: string | undefined;
    if (readingTranslationIdx > 0) {
      readingTranslation = readingText.slice(readingTranslationIdx + 'English Translation:'.length).trim();
      readingText = readingText.slice(0, readingTranslationIdx).trim();
    }

    // Build listening text
    let listeningText = listening?.body || '';
    const listeningQIdx = listeningText.indexOf('Listening Activity:');
    if (listeningQIdx > 0) listeningText = listeningText.slice(0, listeningQIdx).trim();
    const listeningTranslationIdx = listeningText.indexOf('English Translation:');
    let listeningTranslation: string | undefined;
    if (listeningTranslationIdx > 0) {
      listeningTranslation = listeningText.slice(listeningTranslationIdx + 'English Translation:'.length).trim();
      listeningText = listeningText.slice(0, listeningTranslationIdx).trim();
    }

    // Parse writing from body
    const writingBody = writing?.body || '';
    const writingTaskMatch = writingBody.match(/Task:\s*\n([\s\S]*?)(?=\nModel Answer:|$)/i);
    const writingModelMatch = writingBody.match(/Model Answer:\s*\n([\s\S]*?)(?=\nChecklist:|$)/i);
    const writingChecklistMatch = writingBody.match(/Checklist:\s*\n([\s\S]*?)$/i);

    return {
      ...obj,
      warmUp: { content: warmup?.body || '' },
      explanation: { content: explanation?.body || '' },
      vocabItems,
      grammar: {
        explanation: grammar?.body || '',
        formation: '',
        usage: '',
        examples: [],
        commonMistakes: [],
      },
      grammarDrills: { questions: [] },
      reading: reading ? {
        title: reading.title || 'Reading',
        text: readingText,
        translation: readingTranslation,
        questions: parseQuestions(reading.body || ''),
      } : undefined,
      listening: listening ? {
        title: listening.title || 'Listening',
        transcript: listeningText,
        translation: listeningTranslation,
        questions: parseQuestions(listening.body || ''),
      } : undefined,
      speaking: speaking ? {
        guidedActivity: speaking.body || '',
      } : undefined,
      writing: writing ? {
        task: writingTaskMatch?.[1]?.trim() || writing.body || '',
        modelAnswer: writingModelMatch?.[1]?.trim() || '',
        checklist: writingChecklistMatch?.[1]?.trim().split('\n').map((l: string) => l.replace(/^-\s*/, '').trim()).filter(Boolean) || [],
      } : undefined,
      practiceExercises: { questions: parseQuestions(practice?.body || '') },
      miniReview: { content: review?.body || '' },
      selfAssessment: [],
      // Ensure old fields still present
      sections: obj.sections,
      content: obj.content,
    };
  }

  /**
   * Create a new lesson (admin)
   */
  async createLesson(data: z.infer<typeof createLessonSchema>) {
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
}

export const lessonService = new LessonService();