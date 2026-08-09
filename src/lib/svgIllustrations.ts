/**
 * 🎨 Authentic High-Contrast Vector Line-Art SVG Illustration Library for TCF Canada CBT (Q1 - Q4)
 * Real FEI TCF Canada exams use clean, minimalist line-art drawings—never complex photorealistic photos.
 */

export interface VectorSvgIllustration {
  id: string;
  category: "boulangerie" | "gare" | "cafe" | "aeroport" | "meteo" | "bureau" | "famille" | "parc";
  title: string;
  svgContent: string;
}

/**
 * 🥖 Boulangerie / Bakery Line-Art Illustration (Baker selling fresh bread)
 */
export const SVG_BOULANGERIE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full bg-slate-950 text-slate-100 font-sans">
  <rect width="800" height="500" fill="#0F172A"/>
  <!-- Counter -->
  <rect x="50" y="320" width="700" height="140" fill="#1E293B" rx="12" stroke="#38BDF8" stroke-width="3"/>
  <rect x="70" y="340" width="660" height="20" fill="#334155" rx="6"/>
  
  <!-- Breads on display -->
  <path d="M120 310 Q160 270 200 310 Z" fill="#F59E0B" stroke="#FDE047" stroke-width="3"/>
  <path d="M220 310 Q260 260 300 310 Z" fill="#F59E0B" stroke="#FDE047" stroke-width="3"/>
  <ellipse cx="380" cy="300" rx="45" ry="25" fill="#D97706" stroke="#FDE047" stroke-width="3"/>
  <ellipse cx="490" cy="300" rx="40" ry="22" fill="#D97706" stroke="#FDE047" stroke-width="3"/>
  
  <!-- Shelves in background -->
  <line x1="80" y1="160" x2="720" y2="160" stroke="#475569" stroke-width="6"/>
  <line x1="80" y1="240" x2="720" y2="240" stroke="#475569" stroke-width="6"/>

  <!-- Baker Character Line Art -->
  <circle cx="620" cy="180" r="45" fill="#38BDF8" stroke="#E0F2FE" stroke-width="4"/>
  <!-- Chef Hat -->
  <path d="M580 160 C580 100 660 100 660 160 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
  <rect x="590" y="150" width="60" height="20" fill="#F8FAFC" rx="4"/>
  <!-- Baker Apron & Body -->
  <path d="M560 230 Q620 220 680 230 L670 320 L570 320 Z" fill="#F1F5F9" stroke="#0EA5E9" stroke-width="4"/>
  <!-- Hands holding bread baguette -->
  <path d="M530 270 Q580 240 630 270" stroke="#FDE047" stroke-width="12" stroke-linecap="round" fill="none"/>

  <!-- Signboard -->
  <rect x="260" y="30" width="280" height="70" fill="#0284C7" rx="10" stroke="#38BDF8" stroke-width="3"/>
  <text x="400" y="75" text-anchor="middle" fill="#FFFFFF" font-size="28" font-weight="900" letter-spacing="2">BOULANGERIE</text>
</svg>`;

/**
 * 🚉 Gare SNCF / Railway Station Platform Line-Art
 */
export const SVG_GARE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full bg-slate-950 text-slate-100 font-sans">
  <rect width="800" height="500" fill="#0F172A"/>
  
  <!-- Platform line -->
  <polygon points="0,360 800,360 800,500 0,500" fill="#1E293B"/>
  <line x1="0" y1="360" x2="800" y2="360" stroke="#F59E0B" stroke-width="8" stroke-dasharray="25,15"/>
  
  <!-- TGV Train outline -->
  <path d="M-50 180 L550 180 Q680 180 720 260 L750 360 L-50 360 Z" fill="#0284C7" stroke="#38BDF8" stroke-width="4"/>
  <!-- Train windows -->
  <rect x="80" y="210" width="90" height="50" fill="#E0F2FE" rx="6"/>
  <rect x="200" y="210" width="90" height="50" fill="#E0F2FE" rx="6"/>
  <rect x="320" y="210" width="90" height="50" fill="#E0F2FE" rx="6"/>
  <rect x="440" y="210" width="90" height="50" fill="#E0F2FE" rx="6"/>
  <!-- Train nose light -->
  <circle cx="710" cy="300" r="16" fill="#FDE047"/>

  <!-- Passenger Line Art -->
  <circle cx="150" cy="300" r="22" fill="#F8FAFC"/>
  <path d="M130 325 Q150 320 170 325 L165 410 L135 410 Z" fill="#38BDF8"/>
  <!-- Suitcase -->
  <rect x="180" y="350" width="40" height="50" fill="#F59E0B" rx="6" stroke="#FFFFFF" stroke-width="2"/>
  <path d="M190 350 L190 335 L210 335 L210 350" stroke="#FFFFFF" stroke-width="3" fill="none"/>

  <!-- Platform Sign -->
  <rect x="520" y="40" width="220" height="75" fill="#1E293B" rx="8" stroke="#F59E0B" stroke-width="3"/>
  <text x="630" y="75" text-anchor="middle" fill="#FDE047" font-size="22" font-weight="900">VOIE / QUAI 4</text>
  <text x="630" y="100" text-anchor="middle" fill="#94A3B8" font-size="14" font-weight="700">TGV 7842 - PARIS</text>
</svg>`;

/**
 * ☕ Café / Restaurant Terrace Line-Art
 */
export const SVG_CAFE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full bg-slate-950 text-slate-100 font-sans">
  <rect width="800" height="500" fill="#0F172A"/>
  
  <!-- Awning roof -->
  <polygon points="50,40 750,40 710,120 90,120" fill="#DC2626"/>
  <polygon points="120,40 180,40 160,120 110,120" fill="#FFFFFF"/>
  <polygon points="260,40 320,40 300,120 250,120" fill="#FFFFFF"/>
  <polygon points="400,40 460,40 440,120 390,120" fill="#FFFFFF"/>
  <polygon points="540,40 600,40 580,120 530,120" fill="#FFFFFF"/>
  <polygon points="680,40 740,40 710,120 670,120" fill="#FFFFFF"/>

  <!-- Table 1 -->
  <ellipse cx="250" cy="360" rx="90" ry="25" fill="#334155" stroke="#38BDF8" stroke-width="3"/>
  <line x1="250" y1="385" x2="250" y2="470" stroke="#64748B" stroke-width="10"/>
  <!-- Coffee Cups -->
  <ellipse cx="220" cy="355" rx="16" ry="8" fill="#F8FAFC"/>
  <path d="M204 355 C204 370 236 370 236 355 Z" fill="#F8FAFC"/>
  <ellipse cx="280" cy="355" rx="16" ry="8" fill="#F8FAFC"/>
  <path d="M264 355 C264 370 296 370 296 355 Z" fill="#F8FAFC"/>

  <!-- Table 2 -->
  <ellipse cx="550" cy="360" rx="90" ry="25" fill="#334155" stroke="#38BDF8" stroke-width="3"/>
  <line x1="550" y1="385" x2="550" y2="470" stroke="#64748B" stroke-width="10"/>

  <!-- People Line Art Sitting -->
  <circle cx="160" cy="300" r="22" fill="#FDE047"/>
  <path d="M140 325 L180 325 L175 410 L145 410 Z" fill="#0EA5E9"/>
  <circle cx="340" cy="300" r="22" fill="#F8FAFC"/>
  <path d="M320 325 L360 325 L355 410 L325 410 Z" fill="#E11D48"/>
</svg>`;

/**
 * ✈️ Aéroport / Airport Boarding Counter Line-Art
 */
export const SVG_AEROPORT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="w-full h-full bg-slate-950 text-slate-100 font-sans">
  <rect width="800" height="500" fill="#0F172A"/>
  
  <!-- Counter -->
  <rect x="100" y="280" width="600" height="180" fill="#1E293B" rx="16" stroke="#38BDF8" stroke-width="4"/>
  <rect x="140" y="310" width="520" height="30" fill="#0284C7" rx="6"/>

  <!-- Flight Screen -->
  <rect x="250" y="40" width="300" height="140" fill="#090D16" rx="10" stroke="#F59E0B" stroke-width="4"/>
  <text x="400" y="85" text-anchor="middle" fill="#38BDF8" font-size="20" font-weight="900">AIR CANADA AC870</text>
  <text x="400" y="120" text-anchor="middle" fill="#FDE047" font-size="24" font-weight="900">MONTRÉAL - PORTE B12</text>
  <text x="400" y="155" text-anchor="middle" fill="#22C55E" font-size="16" font-weight="800">EMBARQUEMENT IMMÉDIAT</text>

  <!-- Agent Line Art -->
  <circle cx="400" cy="230" r="30" fill="#F8FAFC"/>
  <path d="M350 270 Q400 250 450 270 L440 310 L360 310 Z" fill="#0284C7"/>
</svg>`;

/**
 * 4 Visual Action Option Cards (A, B, C, D) Line-Art Grid Generator
 */
export function getVectorOptionCardsSvg(): string[] {
  return [
    // Card A: Person sleeping / sleeping in bed
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full bg-slate-900">
      <rect width="400" height="300" fill="#0F172A"/>
      <rect x="50" y="140" width="300" height="110" fill="#1E293B" rx="10" stroke="#38BDF8" stroke-width="3"/>
      <ellipse cx="110" cy="130" rx="30" ry="20" fill="#F8FAFC"/>
      <circle cx="110" cy="110" r="22" fill="#FDE047"/>
      <path d="M140 140 L330 140 L330 230 L140 230 Z" fill="#0284C7"/>
      <text x="320" y="70" font-size="32" font-weight="900" fill="#F59E0B">Z z z...</text>
    </svg>`,
    // Card B: Person running / exercising
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full bg-slate-900">
      <rect width="400" height="300" fill="#0F172A"/>
      <circle cx="180" cy="70" r="24" fill="#FDE047"/>
      <path d="M170 100 L210 140 L160 190 L220 260" stroke="#38BDF8" stroke-width="12" stroke-linecap="round" fill="none"/>
      <path d="M140 120 L190 130 L230 110" stroke="#0284C7" stroke-width="10" stroke-linecap="round" fill="none"/>
      <line x1="30" y1="270" x2="370" y2="270" stroke="#475569" stroke-width="6"/>
    </svg>`,
    // Card C: Person reading a book / studying
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full bg-slate-900">
      <rect width="400" height="300" fill="#0F172A"/>
      <circle cx="200" cy="90" r="24" fill="#F8FAFC"/>
      <path d="M160 120 Q200 110 240 120 L230 200 L170 200 Z" fill="#0284C7"/>
      <!-- Open Book -->
      <polygon points="120,180 200,200 280,180 270,250 200,265 130,250" fill="#FDE047" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="200" y1="200" x2="200" y2="265" stroke="#0F172A" stroke-width="3"/>
    </svg>`,
    // Card D: Person cooking / preparing food in kitchen
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="w-full h-full bg-slate-900">
      <rect width="400" height="300" fill="#0F172A"/>
      <!-- Stove -->
      <rect x="80" y="170" width="240" height="100" fill="#1E293B" rx="8" stroke="#38BDF8" stroke-width="3"/>
      <!-- Cooking pot -->
      <rect x="130" y="120" width="140" height="60" fill="#64748B" rx="8" stroke="#F8FAFC" stroke-width="3"/>
      <line x1="110" y1="140" x2="130" y2="140" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round"/>
      <line x1="270" y1="140" x2="290" y2="140" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round"/>
      <!-- Steam -->
      <path d="M160 110 Q170 80 160 60" stroke="#FDE047" stroke-width="4" fill="none"/>
      <path d="M200 110 Q210 80 200 60" stroke="#FDE047" stroke-width="4" fill="none"/>
      <path d="M240 110 Q250 80 240 60" stroke="#FDE047" stroke-width="4" fill="none"/>
    </svg>`
  ];
}

/**
 * Returns authentic SVG illustration for given question item number & paper seed
 */
export function getVectorIllustrationSvg(qNum: number, seed: number = 1): string {
  const options = [SVG_BOULANGERIE, SVG_GARE, SVG_CAFE, SVG_AEROPORT];
  return options[(qNum + seed - 1) % options.length];
}
