import { Router, Request, Response } from 'express';
import Language from '../models/Language';

const router = Router();

// GET /api/languages — Public route for retrieving active published languages
router.get('/', async (req: Request, res: Response) => {
  try {
    const includeUnpublished = req.query.includeUnpublished === 'true';
    const filter: any = { isActive: true };
    if (!includeUnpublished) {
      filter.isPublished = true;
    }

    let languages = await Language.find(filter).sort({ order: 1 });
    
    // Seed default published language tracks (French, German, Spanish, Italian) if not present
    const defaultTracks = [
      { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', examName: 'DELF / TCF Canada', brandName: 'FrancPrep', journeyTitle: 'French Journey', order: 1 },
      { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', examName: 'Goethe / TestDaF', brandName: 'GermanPrep', journeyTitle: 'German Journey', order: 2 },
      { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', examName: 'DELE / SIELE', brandName: 'SpanPrep', journeyTitle: 'Spanish Journey', order: 3 },
      { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', examName: 'CILS / CELI', brandName: 'ItalPrep', journeyTitle: 'Italian Journey', order: 4 },
    ];

    for (const track of defaultTracks) {
      const existing = await Language.findOne({ code: track.code });
      if (!existing) {
        await Language.create({ ...track, direction: 'ltr', isActive: true, isPublished: true });
      } else if (!existing.isPublished && track.code === 'de') {
        // Ensure German is published for testing
        existing.isPublished = true;
        await existing.save();
      }
    }

    languages = await Language.find(filter).sort({ order: 1 });

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
    const { code, name, nativeName, flag, examName, brandName, journeyTitle, direction, order, isPublished } = req.body;
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
        brandName: brandName || undefined,
        journeyTitle: journeyTitle || undefined,
        direction: direction || 'ltr',
        order: order || 1,
        isActive: true,
        ...(typeof isPublished === 'boolean' ? { isPublished } : {}),
      },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedLang });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to save language', message: err.message });
  }
});

// PATCH /api/languages/:code/publish — Admin route to toggle published state of a language track
router.patch('/:code/publish', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { isPublished } = req.body;
    const normCode = code.toLowerCase().trim();

    const lang = await Language.findOne({ code: normCode });
    if (!lang) {
      return res.status(404).json({ success: false, error: `Language '${normCode}' not found` });
    }

    lang.isPublished = typeof isPublished === 'boolean' ? isPublished : !lang.isPublished;
    await lang.save();

    res.json({ success: true, data: lang, message: `Language ${lang.name} published state set to ${lang.isPublished}` });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update language publish state', message: err.message });
  }
});

export default router;
