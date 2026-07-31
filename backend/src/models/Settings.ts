import mongoose, { Schema, Document } from 'mongoose';

export interface ISettingsDocument extends Document {
  stripeSecretKey: string;
  stripePublishableKey: string;
  stripePremiumPriceId: string;
  stripeExamPrepPriceId: string;
  stripeWebhookSecret: string;
  anthropicApiKey: string;
  openRouterApiKey: string;
  openaiApiKey: string;
  elevenLabsApiKey: string;
  huggingFaceToken: string;
  preferredVoiceEngine: 'auto' | 'elevenlabs' | 'openai' | 'kokoro';
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
    openRouterApiKey: { type: String, default: "" },
    openaiApiKey: { type: String, default: "" },
    elevenLabsApiKey: { type: String, default: "" },
    huggingFaceToken: { type: String, default: "" },
    preferredVoiceEngine: { type: String, enum: ['auto', 'elevenlabs', 'openai', 'kokoro'], default: 'auto' },
    frontendUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

settingsSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Settings = mongoose.model<ISettingsDocument>('Settings', settingsSchema);
export default Settings;
