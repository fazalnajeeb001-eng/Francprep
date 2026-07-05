import Exercise from '../models/Exercise';
import StudentProgress from '../models/StudentProgress';
import { createExerciseSchema, updateExerciseSchema } from '../utils/validators';
import { z } from 'zod';

export class ExerciseService {
  /**
   * Get exercises for a lesson (without correct answers for students)
   */
  async getExercisesByLesson(lessonId: string, isAdmin: boolean = false) {
    const exercises = await Exercise.find({ lessonId }).sort('order');

    if (exercises.length === 0) {
      return [];
    }

    // For students, remove correct answers from the response
    if (!isAdmin) {
      return exercises.map((exercise) => {
        const exerciseObj = exercise.toObject();
        // Mask correct answers
        exerciseObj.questions = exerciseObj.questions.map((q) => {
          const { correctAnswer, ...rest } = q;
          return rest;
        }) as any;
        return exerciseObj;
      });
    }

    return exercises;
  }

  /**
   * Get a single exercise by ID
   */
  async getExerciseById(id: string, isAdmin: boolean = false) {
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      throw { statusCode: 404, message: 'Exercise not found' };
    }

    // For students, remove correct answers
    if (!isAdmin) {
      const exerciseObj = exercise.toObject();
      exerciseObj.questions = exerciseObj.questions.map((q) => {
        const { correctAnswer, ...rest } = q;
        return rest;
      }) as any;
      return exerciseObj;
    }

    return exercise.toJSON();
  }

  /**
   * Submit exercise answers and calculate score
   */
  async submitExercise(
    exerciseId: string,
    userId: string,
    answers: { questionId: string; answer: string | string[] }[]
  ) {
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      throw { statusCode: 404, message: 'Exercise not found' };
    }

    let totalScore = 0;
    const results = [];

    for (const question of exercise.questions) {
      const userAnswer = answers.find((a) => a.questionId === question.id);

      if (!userAnswer) {
        results.push({
          questionId: question.id,
          text: question.text,
          correct: false,
          points: 0,
          maxPoints: question.points,
          explanation: question.explanation,
        });
        continue;
      }

      const isCorrect = this.checkAnswer(userAnswer.answer, question.correctAnswer);

      if (isCorrect) {
        totalScore += question.points;
      }

      results.push({
        questionId: question.id,
        text: question.text,
        correct: isCorrect,
        points: isCorrect ? question.points : 0,
        maxPoints: question.points,
        explanation: question.explanation,
      });
    }

    const percentage = Math.round((totalScore / exercise.points) * 100);

    // Update or create progress record
    const lessonId = exercise.lessonId.toString();
    const lessonExercises = await Exercise.countDocuments({ lessonId });

    await StudentProgress.findOneAndUpdate(
      { userId, lessonId },
      {
        $set: {
          status: percentage >= 60 ? 'completed' : 'in_progress',
          score: percentage,
          totalPoints: exercise.points,
          totalExercises: lessonExercises,
          lastAccessedAt: new Date(),
          ...(percentage >= 60 ? { completedAt: new Date() } : {}),
        },
        $inc: { exercisesCompleted: 1 },
        $setOnInsert: { startedAt: new Date() },
      },
      { upsert: true, new: true }
    );

    return {
      exerciseId,
      exerciseTitle: exercise.title,
      totalScore,
      maxPoints: exercise.points,
      percentage,
      passed: percentage >= 60,
      results,
    };
  }

  /**
   * Check if user's answer matches the correct answer
   */
  private checkAnswer(userAnswer: string | string[], correctAnswer: string | string[]): boolean {
    if (Array.isArray(correctAnswer)) {
      // For array answers (e.g., matching), compare sorted arrays
      if (!Array.isArray(userAnswer)) return false;
      const sortedCorrect = [...correctAnswer].sort();
      const sortedUser = [...userAnswer].sort();
      return JSON.stringify(sortedCorrect) === JSON.stringify(sortedUser);
    }

    // String comparison (case-insensitive for text, exact for others)
    if (Array.isArray(userAnswer)) return false;
    return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  }

  /**
   * Create a new exercise (admin)
   */
  async createExercise(data: z.infer<typeof createExerciseSchema>) {
    const exercise = await Exercise.create(data);
    return exercise.toJSON();
  }

  /**
   * Update an exercise (admin)
   */
  async updateExercise(id: string, data: z.infer<typeof updateExerciseSchema>) {
    const exercise = await Exercise.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!exercise) {
      throw { statusCode: 404, message: 'Exercise not found' };
    }
    return exercise.toJSON();
  }

  /**
   * Delete an exercise (admin)
   */
  async deleteExercise(id: string) {
    const exercise = await Exercise.findByIdAndDelete(id);
    if (!exercise) {
      throw { statusCode: 404, message: 'Exercise not found' };
    }
    return { message: 'Exercise deleted successfully' };
  }
}

export const exerciseService = new ExerciseService();