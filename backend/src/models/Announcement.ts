import mongoose, { Schema, Document } from 'mongoose';

export interface IAnnouncementDocument extends Document {
  title: string;
  content: string;
  type: 'info' | 'warning' | 'update' | 'exam_tip';
  isActive: boolean;
  priority: 'low' | 'medium' | 'high';
  createdBy: mongoose.Types.ObjectId;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema = new Schema<IAnnouncementDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: ['info', 'warning', 'update', 'exam_tip'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

announcementSchema.index({ isActive: 1, expiresAt: 1 });
announcementSchema.index({ priority: -1, createdAt: -1 });

announcementSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Announcement = mongoose.model<IAnnouncementDocument>(
  'Announcement',
  announcementSchema
);
export default Announcement;