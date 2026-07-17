import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  id: string;
  type: string;
  prompt: string;
  text?: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  items?: string[];
  correctAnswer: string | string[] | { left: string; right: string }[];
  explanation: string;
  points?: number;
  origin?: string;
}

export interface IExerciseDocument extends Document {
  lessonId?: mongoose.Types.ObjectId;
  title: string;
  type: 'multiple_choice' | 'fill_blank' | 'matching' | 'listening' | 'writing';
  category?: string;
  instructions?: string;
  questions: IQuestion[];
  timeLimit?: number;
  points: number;
  isExamStyle: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'multiple_choice',
    },
    prompt: {
      type: String,
      required: [true, 'Question prompt is required'],
    },
    text: {
      type: String,
    },
    options: {
      type: [String],
      default: undefined,
    },
    pairs: {
      type: [{ left: String, right: String }],
      default: undefined,
    },
    items: {
      type: [String],
      default: undefined,
    },
    correctAnswer: {
      type: Schema.Types.Mixed,
      required: [true, 'Correct answer is required'],
    },
    explanation: {
      type: String,
      required: [true, 'Explanation is required'],
    },
    points: {
      type: Number,
      default: 10,
    },
    origin: {
      type: String,
    },
  },
  { _id: false }
);

const exerciseSchema = new Schema<IExerciseDocument>(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    type: {
      type: String,
      required: [true, 'Exercise type is required'],
      enum: ['multiple_choice', 'true_false', 'fill_blank', 'matching', 'ordering', 'short_answer', 'translation', 'listening', 'writing'],
    },
    category: {
      type: String,
      trim: true,
    },
    instructions: {
      type: String,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (v: IQuestion[]) {
          return v.length > 0;
        },
        message: 'At least one question is required',
      },
    },
    timeLimit: {
      type: Number,
      min: [1, 'Time limit must be at least 1 minute'],
    },
    points: {
      type: Number,
      default: 0,
    },
    isExamStyle: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

exerciseSchema.index({ lessonId: 1, order: 1 });

exerciseSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

// When returning exercises for students, hide correct answers
exerciseSchema.set('toObject', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Exercise = mongoose.model<IExerciseDocument>('Exercise', exerciseSchema);
export default Exercise;