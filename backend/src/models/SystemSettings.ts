import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingPlan {
  id: string;
  title: string;
  description: string;
  price: number;
  interval: 'monthly' | 'annual' | 'one_time';
  badge?: string;
  features: string[];
  accessScope: 'all_access' | 'simulator_only' | 'delf_only' | 'lessons_only';
  isPopular?: boolean;
  isActive: boolean;
}

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
  freePreviewScope: 'first_chapter_a1' | 'first_two_chapters_a1' | 'entire_module_a1' | 'first_chapter_all_levels' | 'cbt_demo_free' | 'custom';
  customFreeChapterIds: string[];
  customPricingPlans: IPricingPlan[];
  paywallEnforced: boolean;
  isSocialHubEnabled: boolean;
  updatedAt: Date;
}

const PricingPlanSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, default: 29 },
    interval: { type: String, enum: ['monthly', 'annual', 'one_time'], default: 'monthly' },
    badge: { type: String, default: '' },
    features: { type: [String], default: [] },
    accessScope: { type: String, enum: ['all_access', 'simulator_only', 'delf_only', 'lessons_only'], default: 'all_access' },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

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
      default: 50,
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
      enum: ['first_chapter_a1', 'first_two_chapters_a1', 'entire_module_a1', 'first_chapter_all_levels', 'cbt_demo_free', 'custom'],
      default: 'first_chapter_a1',
    },
    customFreeChapterIds: {
      type: [String],
      default: [],
    },
    customPricingPlans: {
      type: [PricingPlanSchema],
      default: [
        {
          id: 'monthly_pass',
          title: 'Monthly All-Access Pass',
          description: 'Full access to all modules, AI examiners, and exam simulators.',
          price: 29,
          interval: 'monthly',
          badge: 'Most Popular',
          features: ['All Modules A1–C2', 'Unlimited AI Speaking/Writing Feedback', 'TCF/TEF/DELF Exam Simulators'],
          accessScope: 'all_access',
          isPopular: true,
          isActive: true,
        },
        {
          id: 'annual_pass',
          title: 'Annual VIP Pass',
          description: '12 months full access for dedicated candidates (Save 43%).',
          price: 199,
          interval: 'annual',
          badge: 'Best Value',
          features: ['12 Months Full Access', 'Priority Support', 'Personal Progress Overrides'],
          accessScope: 'all_access',
          isPopular: false,
          isActive: true,
        },
        {
          id: 'simulator_only',
          title: 'Exam Simulator Pass',
          description: 'Access exclusively to CBT exam simulators (TCF/TEF/DELF).',
          price: 19,
          interval: 'monthly',
          badge: 'Exams Only',
          features: ['Unlimited TCF/TEF/DELF CBT Simulators', 'Official FEI & CCI Scoring Rubrics'],
          accessScope: 'simulator_only',
          isPopular: false,
          isActive: true,
        },
      ],
    },
    paywallEnforced: {
      type: Boolean,
      default: true,
    },
    isSocialHubEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const SystemSettings = mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);
