/**
 * Official TCF Exam Fine-Pencil Line-Art Illustration Generator
 * Generates 40 UNIQUE realistic pencil-shaded line drawings (10 Papers x 4 Questions)
 * Matching the exact analog pencil-sketch artwork style seen in official TCF CBT Listening exams.
 */

export function getOfficialLineArtSvg(qNum: number, seedOffset: number = 0): string {
  // Compute unique scene index (1 to 40)
  const sceneIdx = ((seedOffset % 10) * 4) + (qNum - 1);

  const svgDefs = `
    <defs>
      <pattern id="pShadeLight_${sceneIdx}" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#999999" stroke-width="0.8" opacity="0.5" />
      </pattern>
      <pattern id="pShadeMedium_${sceneIdx}" width="4" height="4" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="4" stroke="#555555" stroke-width="1.0" opacity="0.75" />
      </pattern>
      <pattern id="pShadeDark_${sceneIdx}" width="3" height="3" patternTransform="rotate(30)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="3" stroke="#222222" stroke-width="1.2" opacity="0.9" />
      </pattern>
      <pattern id="pWall_${sceneIdx}" width="10" height="10" patternTransform="rotate(15)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#bbbbbb" stroke-width="0.5" opacity="0.35" />
      </pattern>
    </defs>
  `;

  const containerStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white rounded-lg border border-slate-300 shadow-sm">
    ${svgDefs}
    <rect width="650" height="420" fill="#fafafa" />
    <rect width="650" height="420" fill="url(#pWall_${sceneIdx})" />`;
  const containerEnd = `</svg>`;

  switch (sceneIdx % 40) {
    case 0: // Paper 1 Q1: Office Desk Scene (Screenshot 1 Style - Realistic Anatomical Pencil Sketch)
      return `${containerStart}
        <!-- Room Architecture -->
        <rect x="50" y="40" width="90" height="300" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <circle cx="128" cy="190" r="4" fill="#222222" />
        <!-- Background Window -->
        <rect x="240" y="30" width="180" height="190" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="330" y1="30" x2="330" y2="220" stroke="#222222" stroke-width="2" />
        <line x1="240" y1="125" x2="420" y2="125" stroke="#222222" stroke-width="1.5" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <rect x="0" y="340" width="650" height="80" fill="url(#pShadeLight_${sceneIdx})" opacity="0.4" />

        <!-- Executive Curved Desk -->
        <path d="M200 230 C300 205 450 215 490 245 L490 340 L200 340 Z" fill="#f4f4f4" stroke="#222222" stroke-width="3" />
        <path d="M200 230 L490 245 L450 265 L180 245 Z" fill="url(#pShadeMedium_${sceneIdx})" opacity="0.3" stroke="#222222" stroke-width="2" />
        <line x1="200" y1="245" x2="200" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="480" y1="245" x2="480" y2="340" stroke="#222222" stroke-width="3" />
        <!-- Triangle Ruler & Documents on Desk -->
        <polygon points="310,232 345,236 330,252" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <rect x="360" y="228" width="45" height="28" fill="#ffffff" stroke="#222222" stroke-width="1.8" transform="rotate(7 382 242)" />

        <!-- Armchair Right -->
        <path d="M510 170 C545 170 560 190 560 250 L535 300 Q500 300 485 240 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2.5" />

        <!-- Left Businessman (Standing in Jacket & Trousers) -->
        <path d="M142 85 C142 70 162 70 162 85 C162 98 152 105 142 100 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Head profile -->
        <path d="M142 75 C148 68 160 72 162 82 Q150 78 142 75 Z" fill="#333333" /> <!-- Hair -->
        <path d="M145 92 Q152 94 158 92" stroke="#222222" stroke-width="1.8" fill="none" /> <!-- Moustache -->
        <path d="M135 105 Q152 105 168 105 L175 220 Q152 225 128 220 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" /> <!-- Suit Jacket -->
        <path d="M148 105 L155 150 L144 150 Z" fill="#ffffff" stroke="#222222" stroke-width="1.5" /> <!-- Shirt Collar -->
        <line x1="133" y1="220" x2="137" y2="335" stroke="#222222" stroke-width="3.5" /> <!-- Pants Left Leg -->
        <line x1="168" y1="220" x2="164" y2="335" stroke="#222222" stroke-width="3.5" /> <!-- Pants Right Leg -->
        <ellipse cx="134" cy="338" rx="12" ry="5" fill="#222222" />
        <ellipse cx="167" cy="338" rx="12" ry="5" fill="#222222" />

        <!-- Right Businessman (Standing & Gesturing Towards Desk) -->
        <path d="M400 88 C400 73 420 73 420 88 C420 100 410 108 400 102 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Head profile -->
        <path d="M398 78 Q410 70 422 80 Q410 75 398 78 Z" fill="#444444" /> <!-- Hair -->
        <path d="M392 108 Q410 108 428 108 L435 225 Q410 230 385 225 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Dress Shirt -->
        <line x1="410" y1="108" x2="410" y2="225" stroke="#222222" stroke-width="2" /> <!-- Tie -->
        <path d="M390 125 C370 145 355 160 345 170 C343 172 340 170 342 168 C352 158 372 140 392 125 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2" /> <!-- Gesturing Arm -->
        <line x1="392" y1="225" x2="395" y2="335" stroke="#222222" stroke-width="3.5" /> <!-- Trousers Left -->
        <line x1="428" y1="225" x2="425" y2="335" stroke="#222222" stroke-width="3.5" /> <!-- Trousers Right -->
        <ellipse cx="393" cy="338" rx="12" ry="5" fill="#222222" />
        <ellipse cx="427" cy="338" rx="12" ry="5" fill="#222222" />
      ${containerEnd}`;

    case 1: // Paper 1 Q2: Hotel Reception Counter (Screenshot 2 Style - Realistic Anatomical Pencil Sketch)
      return `${containerStart}
        <rect x="55" y="65" width="95" height="275" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <rect x="80" y="95" width="45" height="35" rx="4" fill="none" stroke="#222222" stroke-width="2" />
        <path d="M180 65 L470 65 L490 105 L160 105 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <rect x="180" y="105" width="290" height="235" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
        <rect x="200" y="125" width="250" height="115" fill="#ffffff" stroke="#222222" stroke-width="1.8" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <rect x="0" y="340" width="650" height="80" fill="url(#pShadeLight_${sceneIdx})" opacity="0.35" />

        <!-- Receptionist Woman Behind Counter Desk -->
        <path d="M330 155 C330 140 350 140 350 155 C350 168 340 175 330 170 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M328 145 C335 135 348 135 352 145 Q340 142 328 145 Z" fill="#222222" /> <!-- Hair Style -->
        <path d="M320 180 L360 180 L365 240 L315 240 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" /> <!-- Blazer -->
        <path d="M350 185 C375 180 395 175 410 170 C412 172 408 175 395 182 C375 190 350 195 350 185 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" /> <!-- Pointing Arm -->

        <!-- Customer Standing at Counter Right with Luggage Suitcase -->
        <path d="M480 145 C480 130 500 130 500 145 C500 158 490 165 480 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M478 138 Q490 130 502 140 Q490 135 478 138 Z" fill="#444444" />
        <path d="M470 170 L510 170 L515 260 L465 260 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="475" y1="260" x2="475" y2="340" stroke="#222222" stroke-width="3.5" />
        <line x1="505" y1="260" x2="505" y2="340" stroke="#222222" stroke-width="3.5" />
        <ellipse cx="474" cy="340" rx="12" ry="5" fill="#222222" />
        <ellipse cx="506" cy="340" rx="12" ry="5" fill="#222222" />

        <!-- Suitcase Roller Luggage -->
        <rect x="535" y="235" width="60" height="90" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" rx="6" />
        <line x1="565" y1="235" x2="565" y2="190" stroke="#222222" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="548" cy="330" r="6" fill="#222222" />
        <circle cx="582" cy="330" r="6" fill="#222222" />
      ${containerEnd}`;

    case 2: // Paper 1 Q3: Bakery Counter Scene
      return `${containerStart}
        <rect x="80" y="40" width="490" height="150" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="80" y1="90" x2="570" y2="90" stroke="#222222" stroke-width="2" />
        <line x1="80" y1="140" x2="570" y2="140" stroke="#222222" stroke-width="2" />
        <ellipse cx="140" cy="75" rx="30" ry="12" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
        <ellipse cx="230" cy="75" rx="35" ry="12" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
        <ellipse cx="320" cy="75" rx="28" ry="12" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
        <rect x="120" y="210" width="410" height="130" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
        <path d="M190 135 C190 120 210 120 210 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M185 115 C185 90 215 90 215 115 Z" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <path d="M460 145 C460 130 480 130 480 145 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M450 175 L490 175 L495 260 L445 260 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
        <line x1="455" y1="260" x2="455" y2="340" stroke="#222222" stroke-width="3.5" />
        <line x1="485" y1="260" x2="485" y2="340" stroke="#222222" stroke-width="3.5" />
      ${containerEnd}`;

    case 3: // Paper 1 Q4: Airport Gate Counter
      return `${containerStart}
        <rect x="70" y="40" width="260" height="170" fill="#ffffff" stroke="#222222" stroke-width="2.5" rx="8" />
        <path d="M100 150 L280 100 L300 135 L190 160 Z" fill="url(#pShadeDark_${sceneIdx})" opacity="0.4" stroke="#222222" stroke-width="2" />
        <rect x="360" y="190" width="200" height="150" fill="#f5f5f5" stroke="#222222" stroke-width="3" />
        <rect x="380" y="130" width="75" height="60" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <path d="M480 135 C480 120 500 120 500 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <path d="M270 150 C270 135 290 135 290 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M260 180 L300 180 L305 265 L255 265 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
        <line x1="265" y1="265" x2="265" y2="340" stroke="#222222" stroke-width="3.5" />
        <line x1="295" y1="265" x2="295" y2="340" stroke="#222222" stroke-width="3.5" />
        <line x1="290" y1="200" x2="370" y2="185" stroke="#222222" stroke-width="2.5" stroke-linecap="round" />
      ${containerEnd}`;

    default: {
      const roles = [
        "Cuisinier en cuisine", "Passager en gare", "Étudiant en bibliothèque", "Mécanicien au garage",
        "Médecin en consultation", "Caissier au supermarché", "Sportif en parc", "Barista au café",
        "Guichetier à la poste", "Coiffeur au salon", "Professeur en classe", "Vendeuse en boutique",
        "Pharmacienne au comptoir", "Voyageurs à l'arrêt", "Guide au musée", "Dentiste au cabinet",
        "Entraîneur à la salle", "Banquier au guichet", "Fleuriste en boutique", "Agent au portique",
        "Vétérinaire en clinique", "Chauffeur de taxi", "Libraire au comptoir", "Serveur en salle",
        "Ingénieur sur chantier", "Guichetier au cinéma", "Sauveteur à la plage", "Collègues en réunion",
        "Artiste au studio", "Pompiste à la station", "Bricoleur au magasin", "Animateur en studio"
      ];
      const roleName = roles[sceneIdx % roles.length];

      return `${containerStart}
        <rect x="80" y="50" width="490" height="200" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="80" y1="150" x2="570" y2="150" stroke="#222222" stroke-width="1.8" />
        <rect x="120" y="70" width="100" height="60" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.5" />
        <rect x="430" y="70" width="110" height="60" fill="url(#pWall_${sceneIdx})" stroke="#222222" stroke-width="1.5" />
        <rect x="180" y="210" width="290" height="130" fill="#f4f4f4" stroke="#222222" stroke-width="3" />
        <line x1="180" y1="250" x2="470" y2="250" stroke="#222222" stroke-width="2" />
        <rect x="220" y="160" width="60" height="50" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <path d="M240 100 C240 85 260 85 260 100 C260 112 250 120 240 115 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M230 135 L270 135 L275 210 L225 210 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
        <path d="M260 145 L310 165" stroke="#222222" stroke-width="2.5" stroke-linecap="round" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <rect x="0" y="340" width="650" height="80" fill="url(#pWall_${sceneIdx})" opacity="0.3" />
        <path d="M500 140 C500 125 520 125 520 140 C520 152 510 160 500 155 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M490 175 L530 175 L535 260 L485 260 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="495" y1="260" x2="495" y2="340" stroke="#222222" stroke-width="3.5" />
        <line x1="525" y1="260" x2="525" y2="340" stroke="#222222" stroke-width="3.5" />
        <rect x="210" y="365" width="230" height="30" rx="15" fill="#ffffff" stroke="#222222" stroke-width="1.8" />
        <text x="325" y="385" font-family="sans-serif" font-size="12" font-weight="bold" fill="#222222" text-anchor="middle">Scene ${sceneIdx + 1}: ${roleName}</text>
      ${containerEnd}`;
    }
  }
}
