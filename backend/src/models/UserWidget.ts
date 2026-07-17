import mongoose, { Schema, Document } from 'mongoose';

export interface IUserWidget extends Document {
  userId: mongoose.Types.ObjectId;
  todayTasks: Array<{ id: string; text: string; done: boolean; createdAt: number }>;
  weeklyGoal: { text: string; current: number; target: number; completed: boolean } | null;
  weeklyGoalWeek: string;
  weeklyPlan: Array<{ day: string; minutes: number; completed: boolean; tasks: string[] }>;
  weeklyPlanWeek: string;
  dailyChallengeDate: string;
  dailyChallengeIndex: number;
  updatedAt: Date;
}

const UserWidgetSchema = new Schema<IUserWidget>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    todayTasks: { type: [{ id: String, text: String, done: Boolean, createdAt: Number }], default: [] },
    weeklyGoal: {
      type: { text: String, current: Number, target: Number, completed: Boolean },
      default: null,
    },
    weeklyGoalWeek: { type: String, default: '' },
    weeklyPlan: {
      type: [{ day: String, minutes: Number, completed: Boolean, tasks: [String] }],
      default: [],
    },
    weeklyPlanWeek: { type: String, default: '' },
    dailyChallengeDate: { type: String, default: '' },
    dailyChallengeIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

UserWidgetSchema.index({ userId: 1 });

export default mongoose.model<IUserWidget>('UserWidget', UserWidgetSchema);
