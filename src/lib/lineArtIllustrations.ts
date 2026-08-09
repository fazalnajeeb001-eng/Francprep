/**
 * Official FEI TCF Style Grayscale/Monochrome Line-Art SVG Generator
 * Recreates the simple instructional line-drawing visual style of France Éducation International (FEI) TCF Compréhension Orale Q1-Q4.
 */

export function getOfficialLineArtSvg(qNum: number, seed: number = 0): string {
  const type = ((qNum + seed) % 4) + 1;

  if (type === 1) {
    // FEI Example 1 Style: Kitchen / Dining room line drawing (Mother calling family to eat)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full bg-white">
      <rect width="600" height="400" fill="#ffffff" />
      <!-- Floor line -->
      <line x1="0" y1="320" x2="600" y2="320" stroke="#111111" stroke-width="3" />
      
      <!-- Back Wall Features -->
      <rect x="60" y="60" width="120" height="100" fill="#f5f5f5" stroke="#111111" stroke-width="2" /> <!-- Picture frame -->
      <circle cx="120" cy="110" r="25" fill="none" stroke="#444444" stroke-width="2" />
      
      <rect x="420" y="50" width="130" height="140" fill="#fafafa" stroke="#111111" stroke-width="2" /> <!-- Bookshelf -->
      <line x1="420" y1="95" x2="550" y2="95" stroke="#111111" stroke-width="2" />
      <line x1="420" y1="140" x2="550" y2="140" stroke="#111111" stroke-width="2" />
      <rect x="440" y="65" width="15" height="30" fill="#cccccc" stroke="#111111" stroke-width="1.5" />
      <rect x="460" y="60" width="20" height="35" fill="#888888" stroke="#111111" stroke-width="1.5" />
      <rect x="485" y="70" width="15" height="25" fill="#dddddd" stroke="#111111" stroke-width="1.5" />

      <!-- TV Set -->
      <rect x="250" y="160" width="120" height="90" fill="#e5e5e5" stroke="#111111" stroke-width="3" rx="4" />
      <rect x="260" y="170" width="85" height="70" fill="#ffffff" stroke="#111111" stroke-width="2" />
      <polyline points="290,140 310,160 330,135" fill="none" stroke="#111111" stroke-width="3" /> <!-- TV Antenna -->
      <line x1="250" y1="250" x2="370" y2="250" stroke="#111111" stroke-width="3" /> <!-- Stand -->
      <line x1="280" y1="250" x2="270" y2="320" stroke="#111111" stroke-width="3" />
      <line x1="340" y1="250" x2="350" y2="320" stroke="#111111" stroke-width="3" />

      <!-- Mother / Woman standing by Stove/Table on Left -->
      <circle cx="160" cy="180" r="22" fill="#eeeeee" stroke="#111111" stroke-width="2.5" /> <!-- Head -->
      <path d="M140 180 Q160 160 180 180" fill="#444444" /> <!-- Hair -->
      <path d="M135 205 L185 205 L195 315 L125 315 Z" fill="#e5e5e5" stroke="#111111" stroke-width="2.5" /> <!-- Body / Apron -->
      <path d="M140 220 L110 250" stroke="#111111" stroke-width="3" stroke-linecap="round" /> <!-- Arm gesturing -->

      <!-- Pot on Table -->
      <rect x="190" y="240" width="50" height="35" fill="#cccccc" stroke="#111111" stroke-width="2.5" rx="3" />
      <line x1="180" y1="250" x2="190" y2="250" stroke="#111111" stroke-width="3" />
      <line x1="240" y1="250" x2="250" y2="250" stroke="#111111" stroke-width="3" />
      <path d="M205 230 Q215 220 225 230" fill="none" stroke="#666666" stroke-width="2" stroke-dasharray="3,3" /> <!-- Steam -->

      <!-- Children Sitting on Sofa on Right -->
      <rect x="420" y="240" width="140" height="80" fill="#eeeeee" stroke="#111111" stroke-width="3" rx="8" />
      <circle cx="450" cy="220" r="16" fill="#ffffff" stroke="#111111" stroke-width="2" />
      <circle cx="500" cy="225" r="14" fill="#ffffff" stroke="#111111" stroke-width="2" />

      <text x="300" y="370" font-family="sans-serif" font-size="13" font-weight="bold" fill="#333333" text-anchor="middle">Dessin au trait — Style officiel FEI (Exemple 1)</text>
    </svg>`;
  } else if (type === 2) {
    // Train Station Platform Line Drawing
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full bg-white">
      <rect width="600" height="400" fill="#ffffff" />
      <line x1="0" y1="300" x2="600" y2="300" stroke="#111111" stroke-width="3" />
      
      <!-- Train Line -->
      <rect x="0" y="100" width="600" height="180" fill="#f0f0f0" stroke="#111111" stroke-width="3" />
      <rect x="50" y="130" width="100" height="70" fill="#ffffff" stroke="#111111" stroke-width="2" />
      <rect x="200" y="130" width="100" height="70" fill="#ffffff" stroke="#111111" stroke-width="2" />
      <rect x="350" y="130" width="100" height="70" fill="#ffffff" stroke="#111111" stroke-width="2" />

      <!-- Station Clock -->
      <circle cx="300" cy="50" r="30" fill="#ffffff" stroke="#111111" stroke-width="3" />
      <line x1="300" y1="50" x2="300" y2="30" stroke="#111111" stroke-width="3" />
      <line x1="300" y1="50" x2="315" y2="50" stroke="#111111" stroke-width="3" />

      <!-- Passenger with Suitcase -->
      <circle cx="480" cy="220" r="20" fill="#eeeeee" stroke="#111111" stroke-width="2.5" />
      <path d="M460 245 L500 245 L490 320 L470 320 Z" fill="#cccccc" stroke="#111111" stroke-width="2.5" />
      <rect x="520" y="270" width="40" height="50" fill="#999999" stroke="#111111" stroke-width="2.5" rx="3" />
      <line x1="490" y1="260" x2="520" y2="280" stroke="#111111" stroke-width="3" />

      <text x="300" y="370" font-family="sans-serif" font-size="13" font-weight="bold" fill="#333333" text-anchor="middle">Dessin au trait — À la gare ferroviaire (Style FEI)</text>
    </svg>`;
  } else if (type === 3) {
    // Bakery Store Counter Line Drawing
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full bg-white">
      <rect width="600" height="400" fill="#ffffff" />
      <line x1="0" y1="320" x2="600" y2="320" stroke="#111111" stroke-width="3" />

      <!-- Counter Desk -->
      <rect x="100" y="220" width="400" height="100" fill="#f0f0f0" stroke="#111111" stroke-width="3" />

      <!-- Baker Behind Counter -->
      <circle cx="300" cy="140" r="22" fill="#ffffff" stroke="#111111" stroke-width="2.5" />
      <path d="M280 120 C280 90 320 90 320 120 Z" fill="#ffffff" stroke="#111111" stroke-width="2" /> <!-- Baker Hat -->
      <path d="M275 165 L325 165 L335 220 L265 220 Z" fill="#e5e5e5" stroke="#111111" stroke-width="2.5" />

      <!-- Bread Loaves on Counter -->
      <ellipse cx="180" cy="205" rx="35" ry="15" fill="#cccccc" stroke="#111111" stroke-width="2" />
      <ellipse cx="260" cy="205" rx="30" ry="14" fill="#cccccc" stroke="#111111" stroke-width="2" />
      <ellipse cx="380" cy="205" rx="40" ry="16" fill="#cccccc" stroke="#111111" stroke-width="2" />

      <text x="300" y="370" font-family="sans-serif" font-size="13" font-weight="bold" fill="#333333" text-anchor="middle">Dessin au trait — À la boulangerie (Style FEI)</text>
    </svg>`;
  } else {
    // Airport Boarding Gate Line Drawing
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="w-full h-full bg-white">
      <rect width="600" height="400" fill="#ffffff" />
      <line x1="0" y1="320" x2="600" y2="320" stroke="#111111" stroke-width="3" />

      <!-- Window showing Airplane Silhouette -->
      <rect x="80" y="50" width="220" height="160" fill="#f5f5f5" stroke="#111111" stroke-width="2.5" rx="6" />
      <path d="M110 150 L250 110 L270 140 L180 160 Z" fill="#888888" stroke="#111111" stroke-width="2" /> <!-- Airplane wing/body -->

      <!-- Gate Counter -->
      <rect x="360" y="200" width="180" height="120" fill="#e5e5e5" stroke="#111111" stroke-width="3" />
      <rect x="380" y="140" width="80" height="60" fill="#ffffff" stroke="#111111" stroke-width="2" /> <!-- Computer Monitor -->

      <!-- Agent Behind Counter -->
      <circle cx="480" cy="160" r="18" fill="#ffffff" stroke="#111111" stroke-width="2" />
      <path d="M460 180 L500 180 L505 200 L455 200 Z" fill="#cccccc" stroke="#111111" stroke-width="2" />

      <text x="300" y="370" font-family="sans-serif" font-size="13" font-weight="bold" fill="#333333" text-anchor="middle">Dessin au trait — Porte d'embarquement à l'aéroport (Style FEI)</text>
    </svg>`;
  }
}
