import mongoose, { Schema, Document } from 'mongoose';

export interface IDraftDocument extends Document {
  lessonId?: string;
  chapterId?: string;
  level?: string;
  title?: string;
  content: string;
  parsedData?: any;
  validationErrors?: string[];
  validationWarnings?: string[];
  status: 'draft' | 'review' | 'validated' | 'imported' | 'published' | 'rejected' | 'superseded';
  origin: 'structural' | 'ai_polish' | 'paste_import' | 'ai_generator';
  version: number;
  previousVersions: mongoose.Types.ObjectId[];
  createdBy: string;
  publishedAt?: Date;
  publishedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const draftSchema = new Schema<IDraftDocument>(
  {
    lessonId: { type: String, sparse: true },
    chapterId: { type: String },
    level: { type: String },
    title: { type: String },
    content: { type: String, required: true },
    parsedData: { type: Schema.Types.Mixed },
    validationErrors: { type: [String], default: [] },
    validationWarnings: { type: [String], default: [] },
    status: {
      type: String,
      enum: ['draft', 'review', 'validated', 'imported', 'published', 'rejected', 'superseded'],
      default: 'draft',
    },
    origin: {
      type: String,
      enum: ['structural', 'ai_polish', 'paste_import', 'ai_generator'],
      default: 'structural',
    },
    version: { type: Number, default: 1 },
    previousVersions: [{ type: Schema.Types.ObjectId, ref: 'Draft' }],
    createdBy: { type: String, required: true },
    publishedAt: { type: Date },
    publishedBy: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

draftSchema.index({ status: 1 });
draftSchema.index({ createdBy: 1 });
draftSchema.index({ lessonId: 1 });
draftSchema.index({ level: 1, status: 1 });

const Draft = mongoose.model<IDraftDocument>('Draft', draftSchema);
export default Draft;
