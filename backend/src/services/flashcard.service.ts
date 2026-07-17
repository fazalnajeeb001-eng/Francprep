import FlashcardProgress from '../models/FlashcardProgress';

/**
 * SM-2 Spaced Repetition Algorithm
 * quality: 0-5 (0=complete blackout, 5=perfect response)
 * - 0-1: fail, reset repetitions
 * - 2-3: hard, keep repetitions but no interval increase
 * - 4: good, increase interval
 * - 5: easy, increase interval more
 */
function sm2(quality: number, repetitions: number, easeFactor: number, interval: number) {
  let newEF = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEF < 1.3) newEF = 1.3;

  if (quality < 3) {
    return { easeFactor: newEF, interval: 0, repetitions: 0 };
  }

  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 3;
  } else {
    newInterval = Math.round(interval * newEF);
  }

  return { easeFactor: newEF, interval: newInterval, repetitions: repetitions + 1 };
}

export interface ReviewInput {
  cardId: string;
  lessonId: string;
  french: string;
  english: string;
  pronunciation?: string;
  quality: number; // 0-5
}

export async function reviewCards(userId: string, reviews: ReviewInput[]) {
  const ops = reviews.map((r) => {
    const quality = Math.max(0, Math.min(5, Math.round(r.quality)));
    return FlashcardProgress.findOne({ userId, cardId: r.cardId }).then((existing) => {
      if (existing) {
        const result = sm2(quality, existing.repetitions, existing.easeFactor, existing.interval);
        existing.easeFactor = result.easeFactor;
        existing.interval = result.interval;
        existing.repetitions = result.repetitions;
        existing.nextReview = new Date(Date.now() + result.interval * 24 * 60 * 60 * 1000);
        existing.lastReview = new Date();
        return existing.save();
      } else {
        const result = sm2(quality, 0, 2.5, 0);
        return FlashcardProgress.create({
          userId,
          cardId: r.cardId,
          lessonId: r.lessonId,
          french: r.french,
          english: r.english,
          pronunciation: r.pronunciation,
          easeFactor: result.easeFactor,
          interval: result.interval,
          repetitions: result.repetitions,
          nextReview: new Date(Date.now() + result.interval * 24 * 60 * 60 * 1000),
          lastReview: new Date(),
        });
      }
    });
  });

  await Promise.all(ops);
  return { success: true };
}

export async function getDueCards(userId: string, lessonId?: string) {
  const query: any = { userId, nextReview: { $lte: new Date() } };
  if (lessonId) query.lessonId = lessonId;
  return FlashcardProgress.find(query).sort({ nextReview: 1 });
}

export async function getAllCardProgress(userId: string, lessonId?: string) {
  const query: any = { userId };
  if (lessonId) query.lessonId = lessonId;
  return FlashcardProgress.find(query);
}

export async function getCardStats(userId: string) {
  const total = await FlashcardProgress.countDocuments({ userId });
  const due = await FlashcardProgress.countDocuments({ userId, nextReview: { $lte: new Date() } });
  const mastered = await FlashcardProgress.countDocuments({ userId, interval: { $gte: 21 } });
  return { total, due, mastered };
}
