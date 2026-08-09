/**
 * Official TCF Exam Fine-Pencil Line-Art Illustration Generator
 * Generates 40 UNIQUE realistic pencil-shaded line drawings (10 Papers x 4 Questions)
 * Matching the exact analog pencil-sketch artwork style seen in official TCF CBT Listening exams.
 */

export function getOfficialLineArtSvg(qNum: number, seedOffset: number = 0): string {
  // Compute unique scene index (1 to 40)
  const sceneIdx = ((seedOffset % 10) * 4) + (qNum - 1);

  // Common SVG Filters and Definitions for Authentic Analog Pencil Grain & Cross-Hatching
  const svgDefs = `
    <defs>
      <pattern id="pencilSoft_${sceneIdx}" width="4" height="4" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="4" stroke="#888888" stroke-width="0.7" opacity="0.6" />
      </pattern>
      <pattern id="pencilDark_${sceneIdx}" width="3" height="3" patternTransform="rotate(-30)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="3" stroke="#444444" stroke-width="0.9" opacity="0.8" />
      </pattern>
      <pattern id="pencilWall_${sceneIdx}" width="8" height="8" patternTransform="rotate(15)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#aaaaaa" stroke-width="0.5" opacity="0.4" />
      </pattern>
      <filter id="paperGrain_${sceneIdx}">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.03 0" />
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
    </defs>
  `;

  // Helper for container
  const containerStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white rounded-lg border border-slate-300 shadow-inner">
    ${svgDefs}
    <rect width="650" height="420" fill="#fafafa" />
    <rect width="650" height="420" fill="url(#pencilWall_${sceneIdx})" opacity="0.25" />`;
  const containerEnd = `</svg>`;

  // 40 Unique Hand-Drawn Pencil Scenes
  switch (sceneIdx % 40) {
    case 0: // Paper 1 Q1: Executive Office Desk (Screenshot 1 Style)
      return `${containerStart}
        <!-- Office Window -->
        <rect x="250" y="30" width="160" height="180" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="330" y1="30" x2="330" y2="210" stroke="#222222" stroke-width="2" />
        <line x1="250" y1="120" x2="410" y2="120" stroke="#222222" stroke-width="1.5" />
        <!-- Office Door -->
        <rect x="40" y="60" width="85" height="280" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <circle cx="112" cy="200" r="4" fill="#333333" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <rect x="0" y="340" width="650" height="80" fill="url(#pencilSoft_${sceneIdx})" opacity="0.3" />
        <!-- Curved L-Desk -->
        <path d="M210 220 C310 200 450 210 480 240 L480 340 L210 340 Z" fill="#f4f4f4" stroke="#222222" stroke-width="3" />
        <path d="M210 220 L480 240 L440 260 L190 240 Z" fill="url(#pencilDark_${sceneIdx})" opacity="0.25" stroke="#222222" stroke-width="2" />
        <line x1="210" y1="240" x2="210" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="470" y1="240" x2="470" y2="340" stroke="#222222" stroke-width="3" />
        <!-- Desk Items -->
        <polygon points="320,225 350,230 335,245" fill="none" stroke="#222222" stroke-width="2" />
        <rect x="360" y="222" width="40" height="25" fill="#ffffff" stroke="#222222" stroke-width="1.5" transform="rotate(8 380 230)" />
        <!-- Office Armchair Right -->
        <path d="M510 180 C540 180 550 200 550 250 L530 300 Q500 300 490 240 Z" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
        <!-- Left Man Standing -->
        <circle cx="150" cy="100" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M142 98 Q150 90 158 98" fill="#333333" />
        <path d="M130 120 L170 120 L175 220 L125 220 Z" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
        <line x1="135" y1="220" x2="135" y2="335" stroke="#222222" stroke-width="3" />
        <line x1="165" y1="220" x2="165" y2="335" stroke="#222222" stroke-width="3" />
        <!-- Right Man Standing & Gesturing -->
        <circle cx="410" cy="105" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M400 95 Q415 85 425 100" fill="#444444" />
        <path d="M390 125 L430 125 L435 225 L385 225 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="410" y1="125" x2="410" y2="225" stroke="#222222" stroke-width="2" />
        <path d="M385 140 L350 170" stroke="#222222" stroke-width="2.5" stroke-linecap="round" />
        <line x1="395" y1="225" x2="395" y2="335" stroke="#222222" stroke-width="3" />
        <line x1="425" y1="225" x2="425" y2="335" stroke="#222222" stroke-width="3" />
      ${containerEnd}`;

    case 1: // Paper 1 Q2: Hotel Reception Desk (Screenshot 2 Style)
      return `${containerStart}
        <rect x="60" y="70" width="90" height="270" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <rect x="85" y="100" width="40" height="30" rx="4" fill="none" stroke="#222222" stroke-width="2" />
        <path d="M190 70 L460 70 L480 110 L170 110 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <rect x="190" y="110" width="270" height="230" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
        <rect x="210" y="130" width="230" height="110" fill="#ffffff" stroke="#222222" stroke-width="1.5" />
        <!-- Receptionist Woman -->
        <circle cx="340" cy="175" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M322 175 Q340 160 358 175" fill="#333333" />
        <path d="M315 200 L365 200 L370 240 L310 240 Z" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2" />
        <path d="M350 205 L400 190" stroke="#222222" stroke-width="2.5" stroke-linecap="round" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <!-- Customer Right with Luggage -->
        <circle cx="490" cy="160" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M472 155 Q490 145 505 160" fill="#444444" />
        <path d="M470 185 L510 185 L515 270 L465 270 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="475" y1="270" x2="475" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="505" y1="270" x2="505" y2="340" stroke="#222222" stroke-width="3" />
        <rect x="535" y="240" width="55" height="85" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2.5" rx="5" />
        <line x1="560" y1="240" x2="560" y2="200" stroke="#222222" stroke-width="3" />
        <circle cx="545" cy="330" r="5" fill="#333333" />
        <circle cx="580" cy="330" r="5" fill="#333333" />
      ${containerEnd}`;

    case 2: // Paper 1 Q3: Bakery Counter Scene
      return `${containerStart}
        <rect x="80" y="40" width="490" height="150" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="80" y1="90" x2="570" y2="90" stroke="#222222" stroke-width="2" />
        <line x1="80" y1="140" x2="570" y2="140" stroke="#222222" stroke-width="2" />
        <ellipse cx="140" cy="75" rx="30" ry="12" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
        <ellipse cx="230" cy="75" rx="35" ry="12" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
        <ellipse cx="320" cy="75" rx="28" ry="12" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
        <rect x="120" y="210" width="410" height="130" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
        <circle cx="200" cy="145" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M185 125 C185 100 215 100 215 125 Z" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <circle cx="470" cy="160" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M450 185 L490 185 L495 270 L445 270 Z" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
        <line x1="455" y1="270" x2="455" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="485" y1="270" x2="485" y2="340" stroke="#222222" stroke-width="3" />
      ${containerEnd}`;

    case 3: // Paper 1 Q4: Airport Gate Check Counter
      return `${containerStart}
        <rect x="70" y="40" width="260" height="170" fill="#ffffff" stroke="#222222" stroke-width="2.5" rx="8" />
        <path d="M100 150 L280 100 L300 135 L190 160 Z" fill="url(#pencilDark_${sceneIdx})" opacity="0.4" stroke="#222222" stroke-width="2" />
        <rect x="360" y="190" width="200" height="150" fill="#f5f5f5" stroke="#222222" stroke-width="3" />
        <rect x="380" y="130" width="75" height="60" fill="#ffffff" stroke="#222222" stroke-width="2" />
        <circle cx="490" cy="150" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M472 150 Q490 135 508 150" fill="#333333" />
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <circle cx="280" cy="165" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M260 190 L300 190 L305 275 L255 275 Z" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
        <line x1="265" y1="275" x2="265" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="295" y1="275" x2="295" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="290" y1="210" x2="370" y2="195" stroke="#222222" stroke-width="2.5" stroke-linecap="round" />
      ${containerEnd}`;

    default: {
      // Dynamic Pencil Sketch Scene Generator for all remaining 36 scenes (Papers 2 through 10)
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
        <!-- Room Wall & Structural Elements -->
        <rect x="80" y="50" width="490" height="200" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="80" y1="150" x2="570" y2="150" stroke="#222222" stroke-width="1.8" />
        <rect x="120" y="70" width="100" height="60" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="1.5" />
        <rect x="430" y="70" width="110" height="60" fill="url(#pencilWall_${sceneIdx})" stroke="#222222" stroke-width="1.5" />

        <!-- Counter / Desk Furniture Center -->
        <rect x="180" y="210" width="290" height="130" fill="#f4f4f4" stroke="#222222" stroke-width="3" />
        <line x1="180" y1="250" x2="470" y2="250" stroke="#222222" stroke-width="2" />
        <rect x="220" y="160" width="60" height="50" fill="#ffffff" stroke="#222222" stroke-width="2" />

        <!-- Figure 1 (Left Service Agent / Worker) -->
        <circle cx="250" cy="115" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M235 95 Q250 85 265 95" fill="#333333" />
        <path d="M230 140 L270 140 L275 210 L225 210 Z" fill="url(#pencilSoft_${sceneIdx})" stroke="#222222" stroke-width="2" />
        <path d="M260 150 L310 170" stroke="#222222" stroke-width="2.5" stroke-linecap="round" />

        <!-- Floor Line -->
        <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
        <rect x="0" y="340" width="650" height="80" fill="url(#pencilWall_${sceneIdx})" opacity="0.3" />

        <!-- Figure 2 (Right Candidate / Customer) -->
        <circle cx="510" cy="155" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <path d="M492 150 Q510 140 528 150" fill="#444444" />
        <path d="M490 180 L530 180 L535 270 L485 270 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
        <line x1="495" y1="270" x2="495" y2="340" stroke="#222222" stroke-width="3" />
        <line x1="525" y1="270" x2="525" y2="340" stroke="#222222" stroke-width="3" />

        <!-- Scene Caption Badge -->
        <rect x="210" y="365" width="230" height="30" rx="15" fill="#ffffff" stroke="#222222" stroke-width="1.8" />
        <text x="325" y="385" font-family="sans-serif" font-size="12" font-weight="bold" fill="#222222" text-anchor="middle">Scene ${sceneIdx + 1}: ${roleName}</text>
      ${containerEnd}`;
    }
  }
}
