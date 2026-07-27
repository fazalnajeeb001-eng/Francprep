import mongoose, { Schema, Document } from 'mongoose';

export interface ITrashItem extends Document {
  title: string;
  lessonId: string;
  level: string;
  originalType: 'draft' | 'published';
  originalId: string;
  payload: any;
  deletedAt: Date;
  expiresAt: Date;
  deletedBy: string;
}

const TrashItemSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    lessonId: { type: String, required: true },
    level: { type: String, required: true, default: 'A1' },
    originalType: { type: String, enum: ['draft', 'published'], required: true },
    originalId: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    deletedAt: { type: Date, default: Date.now },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days TTL
    },
    deletedBy: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

// TTL index to automatically purge items after 60 days
TrashItemSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const TrashItem = mongoose.model<ITrashItem>('TrashItem', TrashItemSchema);
