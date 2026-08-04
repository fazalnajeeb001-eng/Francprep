import mongoose, { Schema, Document } from 'mongoose';

export interface ILanguageDocument extends Document {
  code: string;               // e.g. 'fr', 'es', 'de', 'it', 'zh'
  name: string;               // e.g. 'French', 'Spanish', 'German'
  nativeName: string;         // e.g. 'Français', 'Español', 'Deutsch'
  flag: string;               // e.g. '🇫🇷', '🇪🇸', '🇩🇪'
  examName: string;           // e.g. 'DELF / TCF', 'DELE / SIELE', 'Goethe / TestDaF'
  brandName?: string;         // e.g. 'FrancPrep', 'GermanPrep', 'SpanPrep', 'ItalPrep'
  journeyTitle?: string;      // e.g. 'French Journey', 'German Journey', 'Spanish Journey'
  direction: 'ltr' | 'rtl';  // Left-to-Right or Right-to-Left
  isActive: boolean;
  isPublished: boolean;       // ONLY published languages will be shown in Student Onboarding
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const languageSchema = new Schema<ILanguageDocument>(
  {
    code: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    nativeName: { type: String, required: true, trim: true },
    flag: { type: String, required: true, trim: true },
    examName: { type: String, required: true, default: 'CEFR Assessment' },
    brandName: { type: String, trim: true },
    journeyTitle: { type: String, trim: true },
    direction: { type: String, enum: ['ltr', 'rtl'], default: 'ltr' },
    isActive: { type: Boolean, default: true },
    isPublished: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

languageSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Language = mongoose.model<ILanguageDocument>('Language', languageSchema);
export default Language;
