import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemSettings extends Document {
  gatingMode: 'all_locked' | 'selective_locked' | 'all_unlocked';
  lockScope: 'module' | 'chapter' | 'lesson';
  passingScorePercentage: number;
  lockedChapterIds: string[];
  targetUserIds: string[];
  // Subscription & Monetization Settings
  monthlyPrice: number;
  annualPrice: number;
  lifetimePrice: number;
  freePreviewScope: 'first_chapter_a1' | 'first_two_chapters_a1' | 'entire_module_a1' | 'custom';
  paywallEnforced: boolean;
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
    monthlyPrice: {
      type: Number,
      default: 29,
    },
    annualPrice: {
      type: Number,
      default: 199,
    },
    lifetimePrice: {
      type: Number,
      default: 299,
    },
    freePreviewScope: {
      type: String,
      enum: ['first_chapter_a1', 'first_two_chapters_a1', 'entire_module_a1', 'custom'],
      default: 'first_chapter_a1',
    },
    paywallEnforced: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const SystemSettings = mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);
