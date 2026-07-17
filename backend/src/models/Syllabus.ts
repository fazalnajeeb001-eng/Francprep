import mongoose, { Schema, Document } from 'mongoose';

// ─── Sub-document interfaces ─────────────────────────────────────────────

export interface ISyllabusChapter {
  id: string;
  chapter_name: string;
  chapter_description: string;
  chapter_order: number;
  lessons: mongoose.Types.ObjectId[];
}

export interface ISyllabusUnit {
  id: string;
  unit_name: string;
  unit_description: string;
  unit_order: number;
  chapters: ISyllabusChapter[];
}

export interface ISyllabusDocument extends Document {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  title: string;
  description: string;
  objectives: string[];
  lessons: mongoose.Types.ObjectId[];
  /** Hierarchical unit → chapter → lessons structure (additive to the flat `lessons` field) */
  units?: ISyllabusUnit[];
  order: number;
  isPublished: boolean;
  examType: 'TCF' | 'TEF' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

// ─── Sub-document schemas ────────────────────────────────────────────────

const chapterSchema = new Schema<ISyllabusChapter>(
  {
    id: { type: String, required: true },
    chapter_name: { type: String, required: [true, 'Chapter name is required'], trim: true, maxlength: 200 },
    chapter_description: { type: String, required: [true, 'Chapter description is required'] },
    chapter_order: { type: Number, required: [true, 'Chapter order is required'], min: 1 },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  },
  { _id: false }
);

const unitSchema = new Schema<ISyllabusUnit>(
  {
    id: { type: String, required: true },
    unit_name: { type: String, required: [true, 'Unit name is required'], trim: true, maxlength: 200 },
    unit_description: { type: String, required: [true, 'Unit description is required'] },
    unit_order: { type: Number, required: [true, 'Unit order is required'], min: 1 },
    chapters: { type: [chapterSchema], default: [] },
  },
  { _id: false }
);

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
    units: {
      type: [unitSchema],
      default: undefined,
    },
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