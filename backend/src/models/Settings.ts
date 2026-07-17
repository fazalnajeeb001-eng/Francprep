import mongoose, { Schema, Document } from 'mongoose';

export interface ISettingsDocument extends Document {
  stripeSecretKey: string;
  stripePublishableKey: string;
  stripePremiumPriceId: string;
  stripeExamPrepPriceId: string;
  stripeWebhookSecret: string;
  anthropicApiKey: string;
  frontendUrl: string;
  updatedAt: Date;
}

const settingsSchema = new Schema<ISettingsDocument>(
  {
    stripeSecretKey: { type: String, default: "" },
    stripePublishableKey: { type: String, default: "" },
    stripePremiumPriceId: { type: String, default: "" },
    stripeExamPrepPriceId: { type: String, default: "" },
    stripeWebhookSecret: { type: String, default: "" },
    anthropicApiKey: { type: String, default: "" },
    frontendUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

settingsSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    // Mask sensitive fields
    if (ret.stripeSecretKey) ret.stripeSecretKey = ret.stripeSecretKey.slice(0, 8) + "..." + ret.stripeSecretKey.slice(-4);
    if (ret.anthropicApiKey) ret.anthropicApiKey = ret.anthropicApiKey.slice(0, 8) + "..." + ret.anthropicApiKey.slice(-4);
    if (ret.stripeWebhookSecret) ret.stripeWebhookSecret = ret.stripeWebhookSecret.slice(0, 8) + "..." + ret.stripeWebhookSecret.slice(-4);
    return ret;
  },
});

const Settings = mongoose.model<ISettingsDocument>('Settings', settingsSchema);
export default Settings;
