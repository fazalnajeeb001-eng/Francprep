import mongoose, { Schema, Document } from 'mongoose';

export interface IPodMessage {
  id: string;
  senderId: string;
  senderName: string;
  text?: string;
  audioSnippet?: string;
  createdAt: Date;
}

export interface IStudyPod extends Document {
  title: string;
  targetExam: string;
  targetLevel: string;
  type: '1on1' | 'group';
  capacity: number;
  members: Array<{
    userId: string;
    name: string;
    role: 'owner' | 'member';
    joinedAt: Date;
  }>;
  messages: IPodMessage[];
  isFulfilled: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PodMessageSchema = new Schema<IPodMessage>({
  id: { type: String, required: true },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  text: { type: String },
  audioSnippet: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const StudyPodSchema = new Schema<IStudyPod>(
  {
    title: { type: String, required: true, trim: true },
    targetExam: { type: String, default: 'TCF / TEF / DELF' },
    targetLevel: { type: String, default: 'CEFR Level' },
    type: { type: String, enum: ['1on1', 'group'], default: '1on1' },
    capacity: { type: Number, default: 2 },
    members: [
      {
        userId: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, enum: ['owner', 'member'], default: 'member' },
        joinedAt: { type: Date, default: Date.now }
      }
    ],
    messages: [PodMessageSchema],
    isFulfilled: { type: Boolean, default: false },
    // Auto-archive Pod after 30 days of inactivity using MongoDB TTL index
    expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), index: { expires: 0 } }
  },
  { timestamps: true }
);

export const StudyPod = mongoose.models.StudyPod || mongoose.model<IStudyPod>('StudyPod', StudyPodSchema);
