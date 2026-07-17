import { Request, Response } from 'express';

export async function getExistingVocabulary(_req: Request, res: Response) {
  try {
    const Vocabulary = (await import('../models/Vocabulary')).default;
    const vocab = await Vocabulary.find({}, 'french').lean();
    const frenchWords = new Set(vocab.map((v: any) => v.french.toLowerCase()));
    res.json({ success: true, data: Array.from(frenchWords) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
