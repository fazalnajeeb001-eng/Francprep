import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProgressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  lessonId: mongoose.Types.ObjectId;
  status: 'not_started' | 'in_progress' | 'completed';
  score?: number;
  totalPoints?: number;
  exercisesCompleted: number;
  totalExercises: number;
  timeSpent: number;
  startedAt?: Date;
  completedAt?: Date;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const studentProgressSchema = new Schema<IStudentProgressDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
      required: [true, 'Lesson ID is required'],
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    score: {
      type: Number,
      min: [0, 'Score cannot be negative'],
    },
    totalPoints: {
      type: Number,
      min: [0, 'Total points cannot be negative'],
    },
    exercisesCompleted: {
      type: Number,
      default: 0,
      min: [0, 'Exercises completed cannot be negative'],
    },
    totalExercises: {
      type: Number,
      default: 0,
      min: [0, 'Total exercises cannot be negative'],
    },
    timeSpent: {
      type: Number,
      default: 0,
      min: [0, 'Time spent cannot be negative'],
    },
    startedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index: one progress record per user per lesson
studentProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
studentProgressSchema.index({ userId: 1, status: 1 });

studentProgressSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const StudentProgress = mongoose.model<IStudentProgressDocument>(
  'StudentProgress',
  studentProgressSchema
);
export default StudentProgress;