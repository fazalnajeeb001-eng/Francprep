import mongoose, { Schema, Document } from 'mongoose';

export interface IFlashcardProgress extends Document {
  userId: mongoose.Types.ObjectId;
  cardId: string;
  lessonId: string;
  french: string;
  english: string;
  pronunciation?: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
  lastReview: Date;
  updatedAt: Date;
}

const FlashcardProgressSchema = new Schema<IFlashcardProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardId: { type: String, required: true },
    lessonId: { type: String, required: true },
    french: { type: String, required: true },
    english: { type: String, required: true },
    pronunciation: { type: String },
    easeFactor: { type: Number, default: 2.5, min: 1.3 },
    interval: { type: Number, default: 0 },
    repetitions: { type: Number, default: 0 },
    nextReview: { type: Date, default: Date.now },
    lastReview: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

FlashcardProgressSchema.index({ userId: 1, cardId: 1 }, { unique: true });
FlashcardProgressSchema.index({ userId: 1, nextReview: 1 });
FlashcardProgressSchema.index({ userId: 1, lessonId: 1 });

export default mongoose.model<IFlashcardProgress>('FlashcardProgress', FlashcardProgressSchema);
