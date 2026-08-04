import { Router, Request, Response } from 'express';
import Language from '../models/Language';

const router = Router();

// GET /api/languages — Public route for retrieving active published languages
router.get('/', async (_req: Request, res: Response) => {
  try {
    let languages = await Language.find({ isActive: true }).sort({ order: 1 });
    
    // Seed default French language if collection is empty
    if (languages.length === 0) {
      const defaultFr = await Language.create({
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        flag: '🇫🇷',
        examName: 'DELF / TCF',
        direction: 'ltr',
        isActive: true,
        order: 1,
      });
      languages = [defaultFr];
    }

    // Deduplicate languages by normalized code (e.g. ger → de, fre → fr)
    const uniqueMap = new Map<string, any>();
    for (const lang of languages) {
      let normCode = (lang.code || '').toLowerCase().trim();
      if (normCode === 'ger') normCode = 'de';
      if (normCode === 'fre') normCode = 'fr';
      if (normCode === 'spa') normCode = 'es';
      if (!uniqueMap.has(normCode)) {
        uniqueMap.set(normCode, lang);
      }
    }
    const cleanLanguages = Array.from(uniqueMap.values());

    res.json({ success: true, data: cleanLanguages });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch languages', message: err.message });
  }
});

// POST /api/languages — Admin route to register or update a target language
router.post('/', async (req: Request, res: Response) => {
  try {
    const { code, name, nativeName, flag, examName, direction, order } = req.body;
    if (!code || !name || !nativeName) {
      return res.status(400).json({ success: false, error: 'code, name, and nativeName are required' });
    }

    const normCode = code.toLowerCase().trim();
    const updatedLang = await Language.findOneAndUpdate(
      { code: normCode },
      {
        code: normCode,
        name: name.trim(),
        nativeName: nativeName.trim(),
        flag: flag || '🌐',
        examName: examName || 'CEFR Assessment',
        direction: direction || 'ltr',
        order: order || 1,
        isActive: true,
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedLang });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to save language', message: err.message });
  }
});

export default router;
