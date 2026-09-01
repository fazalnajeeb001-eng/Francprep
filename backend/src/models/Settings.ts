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
  groqApiKey: string;
  elevenLabsApiKey: string;
  huggingFaceApiKey: string;
  huggingFaceToken: string;
  preferredVoiceEngine: string;
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
    groqApiKey: { type: String, default: "" },
    elevenLabsApiKey: { type: String, default: "" },
    huggingFaceApiKey: { type: String, default: "" },
    huggingFaceToken: { type: String, default: "" },
    preferredVoiceEngine: { type: String, default: "elevenlabs" },
    activeTTSProvider: { type: String, enum: ['auto', 'elevenlabs', 'openai', 'huggingface', 'google'], default: 'elevenlabs' },
    selectedElevenLabsFemaleVoice: { type: String, default: "XB0fDUnXU5powctDhC70" }, // Charlotte (Native French Female)
    selectedElevenLabsMaleVoice: { type: String, default: "ONwBz21w4p8b7X1s5kL0" },   // Henri (Native French Male)
    selectedOpenAIFemaleVoice: { type: String, default: "nova" },                      // Nova HD
    selectedOpenAIMaleVoice: { type: String, default: "onyx" },                         // Onyx HD
    selectedKokoroFemaleVoice: { type: String, default: "ff_siwis" },                  // Siwis French Female
    selectedKokoroMaleVoice: { type: String, default: "bm_george" },                   // George French Male
  },
  { timestamps: true, collection: 'settings' }
);

settingsSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Settings = mongoose.model<ISettingsDocument>('Settings', settingsSchema);
export default Settings;
