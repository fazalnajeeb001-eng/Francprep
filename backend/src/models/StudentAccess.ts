import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentAccess extends Document {
  scope: 'global' | 'cohort' | 'student';
  targetId: string; // e.g. 'A1', 'a1-ch1', or lessonId
  targetType: 'level' | 'chapter' | 'lesson';
  studentId?: string;
  cohortId?: string;
  state: 'unlocked' | 'locked' | 'hidden';
  createdAt: Date;
  updatedAt: Date;
}

const StudentAccessSchema: Schema = new Schema(
  {
    scope: { type: String, enum: ['global', 'cohort', 'student'], required: true },
    targetId: { type: String, required: true },
    targetType: { type: String, enum: ['level', 'chapter', 'lesson'], required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User' },
    cohortId: { type: String },
    state: { type: String, enum: ['unlocked', 'locked', 'hidden'], required: true },
  },
  { timestamps: true }
);

// Compound index to quickly fetch overrides
StudentAccessSchema.index({ targetId: 1, scope: 1, studentId: 1, cohortId: 1 });

export const StudentAccess = mongoose.model<IStudentAccess>('StudentAccess', StudentAccessSchema);
