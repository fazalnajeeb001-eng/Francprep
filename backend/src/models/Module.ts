import mongoose, { Schema, Document } from 'mongoose';

export interface IModuleUnit {
  id: string;
  unit_name: string;
  unit_order: number;
  chapters: mongoose.Types.ObjectId[];
}

export interface IModuleDocument extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  order: number;
  units: IModuleUnit[];
  chapters: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const unitSchema = new Schema<IModuleUnit>(
  {
    id: { type: String, required: true },
    unit_name: { type: String, required: true, trim: true },
    unit_order: { type: Number, required: true, min: 1 },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  },
  { _id: false }
);

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
    units: {
      type: [unitSchema],
      default: [],
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
