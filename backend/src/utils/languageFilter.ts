/**
 * Build strict Mongoose filter for multi-language tracks.
 * Isolation rules:
 * - 'de': Only German items (language in ['de','german'] or lessonId starting with de-/german-)
 * - 'es': Only Spanish items (language in ['es','spanish'] or lessonId starting with es-/spanish-)
 * - 'it': Only Italian items (language in ['it','italian'] or lessonId starting with it-/italian-)
 * - 'fr': Only French items (language in ['fr','french'] or lessonId starting with fr-/french-, or legacy items without a language tag that are not de/es/it)
 */
export function buildLanguageFilter(language?: string): Record<string, any> {
  if (!language || language === 'all' || language === 'ALL') return {};
  const norm = String(language).toLowerCase().trim();

  if (norm === 'de' || norm === 'german') {
    return {
      $or: [
        { language: { $in: ['de', 'german', 'GER', 'ger'] } },
        { lessonId: { $regex: /^(de|german)[-_]/i } }
      ]
    };
  }

  if (norm === 'es' || norm === 'spanish') {
    return {
      $or: [
        { language: { $in: ['es', 'spanish', 'SPA', 'spa'] } },
        { lessonId: { $regex: /^(es|spanish)[-_]/i } }
      ]
    };
  }

  if (norm === 'it' || norm === 'italian') {
    return {
      $or: [
        { language: { $in: ['it', 'italian', 'ITA', 'ita'] } },
        { lessonId: { $regex: /^(it|italian)[-_]/i } }
      ]
    };
  }

  if (norm === 'fr' || norm === 'french') {
    return {
      $or: [
        { language: { $in: ['fr', 'french', 'FRE', 'fre'] } },
        { lessonId: { $regex: /^(fr|french)[-_]/i } },
        {
          $and: [
            {
              $or: [
                { language: { $in: [null, '', undefined] } },
                { language: { $exists: false } }
              ]
            },
            { lessonId: { $not: { $regex: /^(de|german|es|spanish|it|italian)[-_]/i } } }
          ]
        }
      ]
    };
  }

  return { language: norm };
}
