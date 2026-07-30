import mongoose, { Schema, Document } from 'mongoose';

export interface ITTSCacheDocument extends Document {
  textHash: string;
  text: string;
  voice: string;
  gender: string;
  audioBase64: string;
  contentType: string;
  createdAt: Date;
}

const ttsCacheSchema = new Schema<ITTSCacheDocument>(
  {
    textHash: { type: String, required: true, unique: true, index: true },
    text: { type: String, required: true },
    voice: { type: String, default: 'fr-FR-DeniseNeural' },
    gender: { type: String, enum: ['female', 'male'], default: 'female' },
    audioBase64: { type: String, required: true },
    contentType: { type: String, default: 'audio/mp3' },
  },
  { timestamps: true }
);

const TTSCache = mongoose.model<ITTSCacheDocument>('TTSCache', ttsCacheSchema);
export default TTSCache;
