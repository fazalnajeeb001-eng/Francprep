import mongoose, { Schema, Document } from 'mongoose';

export interface IActiveSession extends Document {
  userId: string;
  paperId: string;
  examType: string;
  sectionIndex: number;
  questionIndex: number;
  answers: Record<string, any>;
  sectionTimers: Record<string, number>;
  lastUpdated: Date;
}

const ActiveSessionSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    paperId: { type: String, required: true, index: true },
    examType: { type: String, default: 'TCF' },
    sectionIndex: { type: Number, default: 0 },
    questionIndex: { type: Number, default: 0 },
    answers: { type: Schema.Types.Mixed, default: {} },
    sectionTimers: { type: Schema.Types.Mixed, default: {} },
    lastUpdated: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);

// Compound unique index so each user has at most one active session per paper
ActiveSessionSchema.index({ userId: 1, paperId: 1 }, { unique: true });

// Auto-expire abandoned sessions after 48 hours (172800 seconds)
ActiveSessionSchema.index({ lastUpdated: 1 }, { expireAfterSeconds: 172800 });

export const ActiveSession = mongoose.model<IActiveSession>('ActiveSession', ActiveSessionSchema);
