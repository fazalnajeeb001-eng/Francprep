import mongoose, { Schema, Document } from 'mongoose';

export interface ISectionContent {
  type: 'warmup' | 'explanation' | 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'practice' | 'review';
  title: string;
  body: string;
  translation?: string;
  media?: {
    audio?: string[];
    images?: string[];
  };
}

export interface ILessonDocument extends Document {
  chapterId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';
  skill: 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV';
  objectives: string[];
  grammarTopics: string[];
  vocabulary: mongoose.Types.ObjectId[];
  sections: ISectionContent[];
  activities: mongoose.Types.ObjectId[];
  content: string;
  order: number;
  isPublished: boolean;
  estimatedDuration: number;
  tags: string[];
  prerequisites: string[];
  createdAt: Date;
  updatedAt: Date;
}

const sectionContentSchema = new Schema<ISectionContent>(
  {
    type: {
      type: String,
      required: true,
      enum: ['warmup', 'explanation', 'vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'practice', 'review'],
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    translation: {
      type: String,
    },
    media: {
      audio: [String],
      images: [String],
    },
  },
  { _id: false }
);

const lessonSchema = new Schema<ILessonDocument>(
  {
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking'],
    },
    skill: {
      type: String,
      enum: ['R', 'W', 'L', 'S', 'INT', 'REV'],
    },
    objectives: {
      type: [String],
      default: [],
    },
    grammarTopics: {
      type: [String],
      default: [],
    },
    vocabulary: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vocabulary',
      },
    ],
    sections: {
      type: [sectionContentSchema],
      default: [],
    },
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
      },
    ],
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    order: {
      type: Number,
      required: [true, 'Order is required'],
      min: [1, 'Order must be a positive number'],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    estimatedDuration: {
      type: Number,
      required: [true, 'Estimated duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    tags: {
      type: [String],
      default: [],
    },
    prerequisites: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.index({ level: 1, order: 1 });
lessonSchema.index({ chapterId: 1, order: 1 });
lessonSchema.index({ category: 1, isPublished: 1 });

lessonSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Lesson = mongoose.model<ILessonDocument>('Lesson', lessonSchema);
export default Lesson;