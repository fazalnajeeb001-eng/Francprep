import mongoose, { Schema, Document } from 'mongoose';

export interface ISyllabusDocument extends Document {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  objectives: string[];
  lessons: mongoose.Types.ObjectId[];
  order: number;
  isPublished: boolean;
  examType: 'TCF' | 'TEF' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

const syllabusSchema = new Schema<ISyllabusDocument>(
  {
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    objectives: {
      type: [String],
      required: [true, 'At least one objective is required'],
      validate: {
        validator: function (v: string[]) {
          return v.length > 0;
        },
        message: 'At least one objective is required',
      },
    },
    lessons: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    order: {
      type: Number,
      required: [true, 'Order is required'],
      min: [1, 'Order must be a positive number'],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    examType: {
      type: String,
      required: [true, 'Exam type is required'],
      enum: ['TCF', 'TEF', 'both'],
    },
  },
  {
    timestamps: true,
  }
);

syllabusSchema.index({ level: 1, order: 1 });
syllabusSchema.index({ examType: 1, isPublished: 1 });

syllabusSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Syllabus = mongoose.model<ISyllabusDocument>('Syllabus', syllabusSchema);
export default Syllabus;