import mongoose, { Schema, Document } from 'mongoose';

export interface IVocabularyDocument extends Document {
  lessonId?: mongoose.Types.ObjectId;
  french: string;
  english: string;
  pronunciation?: string;
  exampleSentence?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Date;
  updatedAt: Date;
}

const vocabularySchema = new Schema<IVocabularyDocument>(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    french: {
      type: String,
      required: [true, 'French word is required'],
      trim: true,
    },
    english: {
      type: String,
      required: [true, 'English translation is required'],
      trim: true,
    },
    pronunciation: {
      type: String,
      trim: true,
    },
    exampleSentence: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

vocabularySchema.index({ lessonId: 1 });

vocabularySchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Vocabulary = mongoose.model<IVocabularyDocument>('Vocabulary', vocabularySchema);
export default Vocabulary;