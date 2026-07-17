import mongoose, { Schema, Document } from 'mongoose';

export interface IDraftDocument extends Document {
  lessonId?: string;
  chapterId?: string;
  content: string;
  parsedData?: any;
  status: 'draft' | 'review' | 'imported' | 'rejected';
  origin: 'structural' | 'ai_polish';
  createdBy: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const draftSchema = new Schema<IDraftDocument>(
  {
    lessonId: { type: String },
    chapterId: { type: String },
    content: { type: String, required: true },
    parsedData: { type: Schema.Types.Mixed },
    status: { type: String, enum: ['draft', 'review', 'imported', 'rejected'], default: 'draft' },
    origin: { type: String, enum: ['structural', 'ai_polish'], default: 'structural' },
    createdBy: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

draftSchema.index({ status: 1 });
draftSchema.index({ createdBy: 1 });

const Draft = mongoose.model<IDraftDocument>('Draft', draftSchema);
export default Draft;
