import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'admin';
  subscriptionTier: 'free' | 'premium' | 'exam_prep';
  isActive: boolean;
  lastLoginAt?: Date;
  streak: number;
  xp: number;
  lastStudyDate?: Date;
  learningGoal: string;
  avatarUrl: string;
  avatarFeatures: { gender: string; skinTone: string; faceShape: string; hairStyle: string; hairColor: string; eyeColor: string; eyeSize: string; eyebrowStyle: string; noseSize: string; lipFullness: string; facialHair: string; outfitStyle: string; outfitColor: string; accessory: string; earring: string; necklace: string };
  onboardingComplete: boolean;
  rpmGlbUrl: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'] },
    password: { type: String, required: [true, 'Password is required'], minlength: [8, 'Password must be at least 8 characters'], select: false },
    firstName: { type: String, required: [true, 'First name is required'], trim: true, maxlength: [50, 'First name cannot exceed 50 characters'] },
    lastName: { type: String, required: [true, 'Last name is required'], trim: true, maxlength: [50, 'Last name cannot exceed 50 characters'] },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    subscriptionTier: { type: String, enum: ['free', 'premium', 'exam_prep'], default: 'free' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    streak: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    lastStudyDate: { type: Date },
    learningGoal: { type: String, enum: ['A2', 'B1', 'B2', 'C1', 'C2', 'TCF_B2', 'TEF_B2', 'none'], default: 'none' },
    avatarUrl: { type: String, default: '' },
    avatarFeatures: {
      gender: { type: String, enum: ['male', 'female'], default: 'female' },
      skinTone: { type: String, default: '#F5C8A0' },
      faceShape: { type: String, enum: ['oval', 'round', 'square', 'heart'], default: 'oval' },
      hairStyle: { type: String, default: 'long' },
      hairColor: { type: String, default: '#3D2B1F' },
      eyeColor: { type: String, default: '#3D2B1F' },
      eyeSize: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
      eyebrowStyle: { type: String, enum: ['thin', 'natural', 'thick', 'arched'], default: 'natural' },
      noseSize: { type: String, enum: ['small', 'medium', 'wide'], default: 'medium' },
      lipFullness: { type: String, enum: ['thin', 'medium', 'full'], default: 'medium' },
      facialHair: { type: String, enum: ['none', 'stubble', 'goatee', 'beard', 'mustache'], default: 'none' },
      outfitStyle: { type: String, default: 'blazer' },
      outfitColor: { type: String, default: '#1A237E' },
      accessory: { type: String, default: 'none' },
      earring: { type: String, enum: ['none', 'stud', 'hoop', 'dangle'], default: 'none' },
      necklace: { type: String, enum: ['none', 'chain', 'pendant', 'choker'], default: 'none' },
    },
    onboardingComplete: { type: Boolean, default: false },
    rpmGlbUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try { const salt = await bcrypt.genSalt(12); this.password = await bcrypt.hash(this.password, salt); next(); }
  catch (error: any) { next(error); }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => { delete ret.password; delete ret.__v; return ret; },
});

const User = mongoose.model<IUserDocument>('User', userSchema);
export default User;
