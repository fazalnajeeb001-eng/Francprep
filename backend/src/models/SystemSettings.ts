import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  gatingMode: 'all_locked' | 'selective_locked' | 'all_unlocked';
  lockScope: 'module' | 'chapter' | 'lesson';
  passingScorePercentage: number;
  lockedChapterIds: string[];
  targetUserIds: string[];
  updatedAt: Date;
}

const SystemSettingsSchema: Schema = new Schema(
  {
    gatingMode: {
      type: String,
      enum: ['all_locked', 'selective_locked', 'all_unlocked'],
      default: 'all_locked',
    },
    lockScope: {
      type: String,
      enum: ['module', 'chapter', 'lesson'],
      default: 'module',
    },
    passingScorePercentage: {
      type: Number,
      default: 70,
      min: 50,
      max: 95,
    },
    lockedChapterIds: {
      type: [String],
      default: [],
    },
    targetUserIds: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const SystemSettings = mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);
