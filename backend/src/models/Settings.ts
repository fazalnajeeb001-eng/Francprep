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
  huggingFaceApiKey: string;
  activeTTSProvider: 'auto' | 'elevenlabs' | 'openai' | 'huggingface' | 'google';
  selectedElevenLabsFemaleVoice: string;
  selectedElevenLabsMaleVoice: string;
  selectedOpenAIFemaleVoice: string;
  selectedOpenAIMaleVoice: string;
  selectedKokoroFemaleVoice: string;
  selectedKokoroMaleVoice: string;
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
    huggingFaceApiKey: { type: String, default: "" },
    activeTTSProvider: { type: String, enum: ['auto', 'elevenlabs', 'openai', 'huggingface', 'google'], default: 'elevenlabs' },
    selectedElevenLabsFemaleVoice: { type: String, default: "21m00Tcm4TlvDq8ikWAM" }, // Rachel (Studio French Female)
    selectedElevenLabsMaleVoice: { type: String, default: "ErXwobaYiN019PkySvjV" },   // Antoni (Studio French Male)
    selectedOpenAIFemaleVoice: { type: String, default: "nova" },                      // Nova HD
    selectedOpenAIMaleVoice: { type: String, default: "onyx" },                         // Onyx HD
    selectedKokoroFemaleVoice: { type: String, default: "ff_siwis" },                  // Siwis French Female
    selectedKokoroMaleVoice: { type: String, default: "bm_george" },                   // George French Male
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
