import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  key: string;
  gatingMode: 'all_locked' | 'selective_locked' | 'all_unlocked';
  passingScorePercentage: number;
  lockedChapterIds: string[];
}

const SystemSettingsSchema = new Schema<ISystemSettings>(
  {
    key: { type: String, required: true, unique: true, default: 'global_settings' },
    gatingMode: {
      type: String,
      enum: ['all_locked', 'selective_locked', 'all_unlocked'],
      default: 'all_locked',
    },
    passingScorePercentage: { type: Number, default: 70 },
    lockedChapterIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const SystemSettings = mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);
