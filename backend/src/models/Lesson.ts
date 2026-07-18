import mongoose, { Schema, Document } from 'mongoose';

// ─── Sub-document types for the new schema fields ───────────────────────────

export interface ILessonQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'ordering' | 'short_answer' | 'translation';
  prompt: string;
  correctAnswer: string | string[] | { left: string; right: string }[];
  explanation: string;
  options?: string[];
  pairs?: { left: string; right: string }[];
  items?: string[];
}

export interface ILessonVocabularyItem {
  french: string;
  english: string;
  pronunciation: string;
  example: string;
  formality?: string;
  usageNote?: string;
}

// ─── Old section type (kept for backward compatibility) ─────────────────────

export interface ISectionContent {
  type: 'warmup' | 'explanation' | 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing' | 'practice' | 'review';
  title: string;
  body: string;
  translation?: string;
  media?: {
    audio?: string[];
    images?: string[];
  };
}

// ─── Document interface ─────────────────────────────────────────────────────

export interface ILessonDocument extends Document {
  // Old fields (backward compatible)
  chapterId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'grammar' | 'vocabulary' | 'listening' | 'reading' | 'writing' | 'speaking';
  skill: 'R' | 'W' | 'L' | 'S' | 'INT' | 'REV';
  objectives: string[];
  grammarTopics: string[];
  vocabulary: mongoose.Types.ObjectId[];
  sections: ISectionContent[];
  activities: mongoose.Types.ObjectId[];
  content: string;
  order: number;
  isPublished: boolean;
  estimatedDuration: number;
  tags: string[];
  prerequisites: string[];

  // New schema fields (matching lesson.schema.json)
  lessonId?: string;
  anchorSkill?: string;
  durationMinutes?: number;
  grammarFocus?: string;
  vocabularyFocus?: string;
  warmUp?: { content: string };
  explanation?: { content: string };
  vocabItems?: ILessonVocabularyItem[];
  grammar?: {
    explanation: string;
    formation: string;
    usage: string;
    examples: string[];
    commonMistakes: { wrong: string; correct: string; why?: string; tip?: string }[];
  };
  grammarDrills?: { questions: ILessonQuestion[] };
  reading?: { title: string; text: string; translation?: string; questions: ILessonQuestion[] };
  listening?: { title: string; transcript: string; translation?: string; audioUrl?: string; questions: ILessonQuestion[] };
  speaking?: { guidedActivity: string; roleplay?: string; pronunciationTip?: string };
  writing?: { task: string; modelAnswer: string; checklist: string[] };
  practiceExercises?: { questions: ILessonQuestion[] };
  miniReview?: { content: string };
  selfAssessment?: string[];

  // Raw canonical blob (migration/pipeline writes this; service reads it)
  canonical?: any;

  createdAt: Date;
  updatedAt: Date;
}

// ─── Sub-schemas ────────────────────────────────────────────────────────────

const sectionContentSchema = new Schema<ISectionContent>(
  {
    type: {
      type: String,
      required: true,
      enum: ['warmup', 'explanation', 'vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'practice', 'review'],
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    translation: { type: String },
    media: { audio: [String], images: [String] },
  },
  { _id: false }
);

const questionSchema = new Schema<ILessonQuestion>({
  id: { type: String, required: true },
  type: { type: String, required: true, enum: ['multiple_choice', 'true_false', 'fill_blank', 'matching', 'ordering', 'short_answer', 'translation'] },
  prompt: { type: String, required: true },
  correctAnswer: { type: Schema.Types.Mixed, required: true },
  explanation: { type: String, default: '' },
  options: [String],
  pairs: [{ left: String, right: String }],
  items: [String],
}, { _id: false });

const vocabItemSchema = new Schema<ILessonVocabularyItem>({
  french: { type: String, required: true },
  english: { type: String, required: true },
  pronunciation: { type: String, required: true },
  example: { type: String, required: true },
  formality: String,
  usageNote: String,
}, { _id: false });

// ─── Main schema ────────────────────────────────────────────────────────────

const lessonSchema = new Schema<ILessonDocument>(
  {
    // Old fields
    chapterId: { type: Schema.Types.ObjectId, ref: 'Chapter' },
    title: { type: String, required: [true, 'Title is required'], trim: true, maxlength: 200 },
    description: { type: String, default: '', maxlength: 1000 },
    level: { type: String, required: [true, 'Level is required'], enum: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
    category: { type: String, default: 'grammar' },
    skill: { type: String, enum: ['R', 'W', 'L', 'S', 'INT', 'REV'] },
    objectives: { type: [String], default: [] },
    grammarTopics: { type: [String], default: [] },
    vocabulary: [{ type: Schema.Types.ObjectId, ref: 'Vocabulary' }],
    sections: { type: [sectionContentSchema], default: [] },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    content: { type: String, default: '' },
    order: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: false },
    estimatedDuration: { type: Number, default: 22 },
    tags: { type: [String], default: [] },
    prerequisites: { type: [String], default: [] },

    // New schema fields
    lessonId: { type: String, sparse: true },
    anchorSkill: { type: String, enum: ['reading', 'writing', 'listening', 'speaking', 'integrated', 'review'] },
    durationMinutes: { type: Number },
    grammarFocus: { type: String, default: '' },
    vocabularyFocus: { type: String, default: '' },
    warmUp: {
      type: new Schema({ content: { type: String } }, { _id: false }),
      default: undefined,
    },
    explanation: {
      type: new Schema({ content: { type: String } }, { _id: false }),
      default: undefined,
    },
    vocabItems: { type: [vocabItemSchema], default: undefined },
    grammar: {
      type: new Schema({
        explanation: { type: String, default: '' },
        formation: { type: String, default: '' },
        usage: { type: String, default: '' },
        examples: { type: [String], default: [] },
        commonMistakes: { type: [new Schema({ wrong: String, correct: String, why: String, tip: String }, { _id: false })], default: [] },
      }, { _id: false }),
      default: undefined,
    },
    grammarDrills: {
      type: new Schema({ questions: { type: [questionSchema], default: [] } }, { _id: false }),
      default: undefined,
    },
    reading: {
      type: new Schema({
        title: { type: String, default: '' },
        text: { type: String, default: '' },
        translation: String,
        questions: { type: [questionSchema], default: [] },
      }, { _id: false }),
      default: undefined,
    },
    listening: {
      type: new Schema({
        title: { type: String, default: '' },
        transcript: { type: String, default: '' },
        translation: String,
        audioUrl: String,
        questions: { type: [questionSchema], default: [] },
      }, { _id: false }),
      default: undefined,
    },
    speaking: {
      type: new Schema({
        guidedActivity: { type: String, default: '' },
        roleplay: String,
        pronunciationTip: String,
      }, { _id: false }),
      default: undefined,
    },
    writing: {
      type: new Schema({
        task: { type: String, default: '' },
        modelAnswer: { type: String, default: '' },
        checklist: { type: [String], default: [] },
      }, { _id: false }),
      default: undefined,
    },
    practiceExercises: {
      type: new Schema({ questions: { type: [questionSchema], default: [] } }, { _id: false }),
      default: undefined,
    },
    miniReview: {
      type: new Schema({ content: { type: String } }, { _id: false }),
      default: undefined,
    },
    selfAssessment: { type: [String], default: undefined },

    // Raw canonical blob stored by migration scripts / admin pipeline
    canonical: { type: Schema.Types.Mixed, default: undefined },
  },
  { timestamps: true }
);

lessonSchema.index({ lessonId: 1 }, { sparse: true });
lessonSchema.index({ level: 1, order: 1 });
lessonSchema.index({ chapterId: 1, order: 1 });
lessonSchema.index({ category: 1, isPublished: 1 });

lessonSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Lesson = mongoose.model<ILessonDocument>('Lesson', lessonSchema);
export default Lesson;
