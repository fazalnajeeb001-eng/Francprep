import mongoose, { Schema, Document } from 'mongoose';

export interface IChapterDocument extends Document {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  objectives: string[];
  cefrGoals: string[];
  estimatedTime: string;
  order: number;
  lessons: mongoose.Types.ObjectId[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const chapterSchema = new Schema<IChapterDocument>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'Module',
      required: [true, 'Module ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Chapter title is required'],
      trim: true,
    },
    objectives: {
      type: [String],
      default: [],
    },
    cefrGoals: {
      type: [String],
      default: [],
    },
    estimatedTime: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      required: [true, 'Order is required'],
      min: [1, 'Order must be a positive number'],
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

chapterSchema.index({ moduleId: 1, order: 1 });

chapterSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Chapter = mongoose.model<IChapterDocument>('Chapter', chapterSchema);
export default Chapter;