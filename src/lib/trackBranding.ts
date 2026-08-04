export interface TrackBranding {
  code: string;
  brandName: string;
  shortBrand: string;
  journeyTitle: string;
  flag: string;
  examName: string;
  nativeName: string;
  speechLocale: string;
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
    speechLocale: 'fr-FR',
  },
  de: {
    code: 'de',
    brandName: 'GermanPrep 🇩🇪',
    shortBrand: 'GermanPrep',
    journeyTitle: 'German Journey',
    flag: '🇩🇪',
    examName: 'Goethe / TestDaF / telc',
    nativeName: 'Deutsch',
    speechLocale: 'de-DE',
  },
  es: {
    code: 'es',
    brandName: 'SpanPrep 🇪🇸',
    shortBrand: 'SpanPrep',
    journeyTitle: 'Spanish Journey',
    flag: '🇪🇸',
    examName: 'DELE / SIELE',
    nativeName: 'Español',
    speechLocale: 'es-ES',
  },
  it: {
    code: 'it',
    brandName: 'ItalPrep 🇮🇹',
    shortBrand: 'ItalPrep',
    journeyTitle: 'Italian Journey',
    flag: '🇮🇹',
    examName: 'CILS / CELI / PLIDA',
    nativeName: 'Italiano',
    speechLocale: 'it-IT',
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
    speechLocale: customMeta?.speechLocale || 'en-US',
  };
}
