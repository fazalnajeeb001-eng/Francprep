export interface TrackBranding {
  code: string;
  brandName: string;
  shortBrand: string;
  journeyTitle: string;
  flag: string;
  examName: string;
  nativeName: string;
  languageName: string;
  speechLocale: string;
  proficiencyPathTitle: string;
  speakingPrompt: string;
  transcriptLabel: string;
  communityPracticeTitle: string;
  cardExpressionLabel: string;
}

export function getActiveLanguageCode(user?: { activeLanguage?: string } | null): string {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("fp_active_language");
    if (local && local.trim()) return local.toLowerCase().trim();
  }
  if (user?.activeLanguage && user.activeLanguage.trim()) {
    return user.activeLanguage.toLowerCase().trim();
  }
  if (typeof window !== "undefined") {
    try {
      const storedUser = localStorage.getItem("francprep_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed?.activeLanguage && parsed.activeLanguage.trim()) {
          return parsed.activeLanguage.toLowerCase().trim();
        }
      }
    } catch {}
  }
  return "fr";
}

export const PRESET_TRACKS: Record<string, TrackBranding> = {
  fr: {
    code: 'fr',
    brandName: 'FrancPrep 🇫🇷',
    shortBrand: 'FrancPrep',
    journeyTitle: 'French Journey',
    flag: '🇫🇷',
    examName: 'DELF / DALF / TCF / TEF',
    nativeName: 'Français',
    languageName: 'French',
    speechLocale: 'fr-FR',
    proficiencyPathTitle: 'French Proficiency Path',
    speakingPrompt: 'Say this in French:',
    transcriptLabel: 'French Audio Transcript:',
    communityPracticeTitle: 'French Speech & Audio Practice',
    cardExpressionLabel: '🇫🇷 FRENCH EXPRESSION',
  },
  de: {
    code: 'de',
    brandName: 'GermanPrep 🇩🇪',
    shortBrand: 'GermanPrep',
    journeyTitle: 'German Journey',
    flag: '🇩🇪',
    examName: 'Goethe / TestDaF / telc',
    nativeName: 'Deutsch',
    languageName: 'German',
    speechLocale: 'de-DE',
    proficiencyPathTitle: 'German Proficiency Path',
    speakingPrompt: 'Say this in German:',
    transcriptLabel: 'German Audio Transcript:',
    communityPracticeTitle: 'German Speech & Audio Practice',
    cardExpressionLabel: '🇩🇪 GERMAN EXPRESSION',
  },
  es: {
    code: 'es',
    brandName: 'SpanPrep 🇪🇸',
    shortBrand: 'SpanPrep',
    journeyTitle: 'Spanish Journey',
    flag: '🇪🇸',
    examName: 'DELE / SIELE',
    nativeName: 'Español',
    languageName: 'Spanish',
    speechLocale: 'es-ES',
    proficiencyPathTitle: 'Spanish Proficiency Path',
    speakingPrompt: 'Say this in Spanish:',
    transcriptLabel: 'Spanish Audio Transcript:',
    communityPracticeTitle: 'Spanish Speech & Audio Practice',
    cardExpressionLabel: '🇪🇸 SPANISH EXPRESSION',
  },
  it: {
    code: 'it',
    brandName: 'ItalPrep 🇮🇹',
    shortBrand: 'ItalPrep',
    journeyTitle: 'Italian Journey',
    flag: '🇮🇹',
    examName: 'CILS / CELI / PLIDA',
    nativeName: 'Italiano',
    languageName: 'Italian',
    speechLocale: 'it-IT',
    proficiencyPathTitle: 'Italian Proficiency Path',
    speakingPrompt: 'Say this in Italian:',
    transcriptLabel: 'Italian Audio Transcript:',
    communityPracticeTitle: 'Italian Speech & Audio Practice',
    cardExpressionLabel: '🇮🇹 ITALIAN EXPRESSION',
  },
};

export function getTrackBranding(langCode?: string, customMeta?: Partial<TrackBranding>): TrackBranding {
  const normCode = (langCode || 'fr').toLowerCase().trim();

  // Normalize aliases
  let code = normCode;
  if (normCode === 'french' || normCode === 'fre') code = 'fr';
  if (normCode === 'german' || normCode === 'ger') code = 'de';
  if (normCode === 'spanish' || normCode === 'spa') code = 'es';
  if (normCode === 'italian' || normCode === 'ita') code = 'it';

  if (PRESET_TRACKS[code]) {
    const preset = PRESET_TRACKS[code];
    return {
      ...preset,
      ...(customMeta || {}),
    };
  }

  // Generic fallback for any newly registered language
  const capitalized = code ? code.charAt(0).toUpperCase() + code.slice(1) : 'CEFR';
  const flag = customMeta?.flag || '🌐';
  const name = customMeta?.nativeName || customMeta?.shortBrand || capitalized;

  return {
    code,
    brandName: customMeta?.brandName || `${capitalized}Prep ${flag}`,
    shortBrand: customMeta?.shortBrand || `${capitalized}Prep`,
    journeyTitle: customMeta?.journeyTitle || `${name} Journey`,
    flag: flag,
    examName: customMeta?.examName || 'CEFR Certification',
    nativeName: name,
    languageName: capitalized,
    speechLocale: customMeta?.speechLocale || 'en-US',
    proficiencyPathTitle: `${capitalized} Proficiency Path`,
    speakingPrompt: `Say this in ${capitalized}:`,
    transcriptLabel: `${capitalized} Audio Transcript:`,
    communityPracticeTitle: `${capitalized} Speech & Audio Practice`,
    cardExpressionLabel: `${flag} ${capitalized.toUpperCase()} EXPRESSION`,
  };
}
