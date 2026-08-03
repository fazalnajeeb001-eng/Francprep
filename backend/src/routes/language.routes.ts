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

    res.json({ success: true, data: languages });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch languages', message: err.message });
  }
});

// POST /api/languages — Admin route to register a new language
router.post('/', async (req: Request, res: Response) => {
  try {
    const { code, name, nativeName, flag, examName, direction, order } = req.body;
    if (!code || !name || !nativeName || !flag) {
      return res.status(400).json({ success: false, error: 'code, name, nativeName, and flag are required' });
    }

    const existing = await Language.findOne({ code: code.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, error: `Language with code '${code}' already exists` });
    }

    const newLang = await Language.create({
      code: code.toLowerCase(),
      name,
      nativeName,
      flag,
      examName: examName || 'CEFR Assessment',
      direction: direction || 'ltr',
      order: order || 1,
      isActive: true,
    });

    res.status(201).json({ success: true, data: newLang });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to create language', message: err.message });
  }
});

export default router;
