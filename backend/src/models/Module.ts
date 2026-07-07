import mongoose, { Schema, Document } from 'mongoose';

export interface IModuleDocument extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  order: number;
  chapters: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const moduleSchema = new Schema<IModuleDocument>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Module title is required'],
      trim: true,
    },
    order: {
      type: Number,
      required: [true, 'Order is required'],
      min: [1, 'Order must be a positive number'],
    },
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chapter',
      },
    ],
  },
  {
    timestamps: true,
  }
);

moduleSchema.index({ courseId: 1, order: 1 });

moduleSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Module = mongoose.model<IModuleDocument>('Module', moduleSchema);
export default Module;