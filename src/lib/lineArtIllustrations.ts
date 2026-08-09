/**
 * Official TCF Exam Fine-Pencil Line-Art Illustration Generator
 * Generates 40 100% UNIQUE realistic pencil-shaded line drawings (10 Papers x 4 Questions)
 * Matching the exact analog pencil-sketch artwork style seen in official TCF CBT Listening exams.
 */

export function getOfficialLineArtSvg(qNum: number, seedOffset: number = 0): string {
  // Compute unique scene index (0 to 39)
  const sceneIdx = ((seedOffset % 10) * 4) + (qNum - 1);

  const svgDefs = `
    <defs>
      <pattern id="pShadeLight_${sceneIdx}" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#888888" stroke-width="0.8" opacity="0.5" />
      </pattern>
      <pattern id="pShadeMedium_${sceneIdx}" width="4" height="4" patternTransform="rotate(-45)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="4" stroke="#444444" stroke-width="1.0" opacity="0.75" />
      </pattern>
      <pattern id="pShadeDark_${sceneIdx}" width="3" height="3" patternTransform="rotate(30)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="3" stroke="#111111" stroke-width="1.2" opacity="0.9" />
      </pattern>
      <pattern id="pWall_${sceneIdx}" width="10" height="10" patternTransform="rotate(15)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#aaaaaa" stroke-width="0.5" opacity="0.35" />
      </pattern>
    </defs>
  `;

  const containerStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white rounded-lg border border-slate-300 shadow-sm">
    ${svgDefs}
    <rect width="650" height="420" fill="#fafafa" />
    <rect width="650" height="420" fill="url(#pWall_${sceneIdx})" />`;
  const containerEnd = `</svg>`;

  const idx = sceneIdx % 40;

  // Scene Renderers for 40 Unique Visual Scenes
  const sceneRenderers: Array<() => string> = [
    // 0: Office Desk Interaction
    () => `
      <rect x="50" y="40" width="90" height="300" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <circle cx="128" cy="190" r="4" fill="#222222" />
      <rect x="240" y="30" width="180" height="190" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="330" y1="30" x2="330" y2="220" stroke="#222222" stroke-width="2" />
      <line x1="240" y1="125" x2="420" y2="125" stroke="#222222" stroke-width="1.5" />
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="0" y="340" width="650" height="80" fill="url(#pShadeLight_${sceneIdx})" opacity="0.4" />
      <path d="M200 230 C300 205 450 215 490 245 L490 340 L200 340 Z" fill="#f4f4f4" stroke="#222222" stroke-width="3" />
      <path d="M200 230 L490 245 L450 265 L180 245 Z" fill="url(#pShadeMedium_${sceneIdx})" opacity="0.3" stroke="#222222" stroke-width="2" />
      <line x1="200" y1="245" x2="200" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="480" y1="245" x2="480" y2="340" stroke="#222222" stroke-width="3" />
      <polygon points="310,232 345,236 330,252" fill="#ffffff" stroke="#222222" stroke-width="2" />
      <path d="M142 85 C142 70 162 70 162 85 C162 98 152 105 142 100 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M142 75 C148 68 160 72 162 82 Q150 78 142 75 Z" fill="#333333" />
      <path d="M135 105 Q152 105 168 105 L175 220 Q152 225 128 220 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
      <path d="M400 88 C400 73 420 73 420 88 C420 100 410 108 400 102 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M392 108 Q410 108 428 108 L435 225 Q410 230 385 225 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 1: Hotel Reception Desk (Glass Counter & Passenger with Suitcase)
    () => `
      <rect x="55" y="65" width="95" height="275" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <rect x="80" y="95" width="45" height="35" rx="4" fill="none" stroke="#222222" stroke-width="2" />
      <path d="M180 65 L470 65 L490 105 L160 105 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <rect x="180" y="105" width="290" height="235" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
      <rect x="200" y="125" width="250" height="115" fill="#ffffff" stroke="#222222" stroke-width="1.8" />
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="0" y="340" width="650" height="80" fill="url(#pShadeLight_${sceneIdx})" opacity="0.35" />
      <path d="M330 155 C330 140 350 140 350 155 C350 168 340 175 330 170 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M328 145 C335 135 348 135 352 145 Q340 142 328 145 Z" fill="#222222" />
      <path d="M320 180 L360 180 L365 240 L315 240 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M350 185 C375 180 395 175 410 170 C412 172 408 175 395 182 C375 190 350 195 350 185 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
      <path d="M480 145 C480 130 500 130 500 145 C500 158 490 165 480 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M470 170 L510 170 L515 260 L465 260 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="475" y1="260" x2="475" y2="340" stroke="#222222" stroke-width="3.5" />
      <line x1="505" y1="260" x2="505" y2="340" stroke="#222222" stroke-width="3.5" />
      <rect x="535" y="235" width="60" height="90" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" rx="6" />
      <line x1="565" y1="235" x2="565" y2="190" stroke="#222222" stroke-width="3.5" stroke-linecap="round" />
    `,
    // 2: Bakery Storefront
    () => `
      <rect x="80" y="40" width="490" height="150" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="80" y1="90" x2="570" y2="90" stroke="#222222" stroke-width="2" />
      <line x1="80" y1="140" x2="570" y2="140" stroke="#222222" stroke-width="2" />
      <ellipse cx="140" cy="75" rx="30" ry="12" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
      <ellipse cx="230" cy="75" rx="35" ry="12" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
      <rect x="120" y="210" width="410" height="130" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
      <path d="M190 135 C190 120 210 120 210 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M460 145 C460 130 480 130 480 145 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M450 175 L490 175 L495 260 L445 260 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
    `,
    // 3: Airport Boarding Counter
    () => `
      <rect x="70" y="40" width="260" height="170" fill="#ffffff" stroke="#222222" stroke-width="2.5" rx="8" />
      <path d="M100 150 L280 100 L300 135 L190 160 Z" fill="url(#pShadeDark_${sceneIdx})" opacity="0.4" stroke="#222222" stroke-width="2" />
      <rect x="360" y="190" width="200" height="150" fill="#f5f5f5" stroke="#222222" stroke-width="3" />
      <rect x="380" y="130" width="75" height="60" fill="#ffffff" stroke="#222222" stroke-width="2" />
      <path d="M480 135 C480 120 500 120 500 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
    `,
    // 4: Train Platform & Clock
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="0" y1="355" x2="650" y2="355" stroke="#222222" stroke-width="2" />
      <circle cx="150" cy="100" r="35" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <line x1="150" y1="100" x2="150" y2="80" stroke="#222222" stroke-width="3" />
      <line x1="150" y1="100" x2="165" y2="100" stroke="#222222" stroke-width="3" />
      <line x1="150" y1="135" x2="150" y2="340" stroke="#222222" stroke-width="4" />
      <rect x="340" y="180" width="80" height="130" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" rx="6" />
      <path d="M460 160 C460 145 480 145 480 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M450 190 L490 190 L495 280 L445 280 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 5: Auto Mechanical Garage
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M120 220 Q220 180 340 220 L360 340 L80 340 Z" fill="#f0f0f0" stroke="#222222" stroke-width="3" />
      <path d="M150 220 L260 150 L320 220 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <circle cx="140" cy="340" r="30" fill="#222222" />
      <circle cx="300" cy="340" r="30" fill="#222222" />
      <path d="M420 170 C420 155 440 155 440 170 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M410 200 L450 200 L455 290 L405 290 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
    `,
    // 6: Doctor Clinic Examination
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="80" y="240" width="280" height="80" fill="#ffffff" stroke="#222222" stroke-width="3" rx="4" />
      <line x1="120" y1="320" x2="120" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="320" y1="320" x2="320" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M150 180 C150 165 170 165 170 180 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M140 210 L180 210 L185 280 L135 280 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M440 150 C440 135 460 135 460 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M430 180 L470 180 L475 280 L425 280 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 7: Library Study Counter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="40" y="40" width="160" height="290" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="40" y1="100" x2="200" y2="100" stroke="#222222" stroke-width="2" />
      <line x1="40" y1="160" x2="200" y2="160" stroke="#222222" stroke-width="2" />
      <rect x="260" y="220" width="280" height="120" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
      <path d="M350 160 C350 145 370 145 370 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M340 190 L380 190 L385 260 L335 260 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
    `,
    // 8: Post Office Parcel Counter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="190" width="300" height="150" fill="#f5f5f5" stroke="#222222" stroke-width="3" />
      <rect x="360" y="140" width="70" height="50" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M250 130 C250 115 270 115 270 130 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M240 160 L280 160 L285 240 L235 240 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M500 140 C500 125 520 125 520 140 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M490 170 L530 170 L535 260 L485 260 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
    `,
    // 9: Supermarket Conveyor Checkout
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="140" y="210" width="360" height="130" fill="#f0f0f0" stroke="#222222" stroke-width="3" />
      <rect x="180" y="150" width="60" height="60" fill="#ffffff" stroke="#222222" stroke-width="2" />
      <path d="M290 185 L310 185 L310 210 L290 210 Z" fill="url(#pShadeDark_${sceneIdx})" stroke="#222222" stroke-width="1.5" />
      <path d="M380 140 C380 125 400 125 400 140 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M370 170 L410 170 L415 260 L365 260 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
    `,
    // 10: Bus Stop Shelter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M120 60 L420 60 L450 110 L90 110 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <rect x="120" y="110" width="300" height="230" fill="url(#pShadeLight_${sceneIdx})" opacity="0.3" stroke="#222222" stroke-width="2" />
      <path d="M220 180 C220 165 240 165 240 180 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M210 210 L250 210 L255 290 L205 290 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M320 180 C320 165 340 165 340 180 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M310 210 L350 210 L355 290 L305 290 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
    `,
    // 11: Restaurant Dining Table
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="200" y="220" width="240" height="120" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <ellipse cx="320" cy="220" rx="110" ry="25" fill="#f8f8f8" stroke="#222222" stroke-width="2" />
      <path d="M150 190 C150 175 170 175 170 190 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M140 220 L180 220 L185 290 L135 290 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M470 160 C470 145 490 145 490 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M460 190 L500 190 L505 280 L455 280 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 12: Bank Teller Counter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="150" y="60" width="340" height="280" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <rect x="180" y="90" width="280" height="120" fill="url(#pShadeLight_${sceneIdx})" opacity="0.3" stroke="#222222" stroke-width="2" />
      <path d="M260 135 C260 120 280 120 280 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M380 135 C380 120 400 120 400 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 13: Clothing Store Boutique
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="80" y1="120" x2="320" y2="120" stroke="#222222" stroke-width="3" />
      <line x1="100" y1="120" x2="100" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="300" y1="120" x2="300" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M140 120 L180 180 L140 280 L120 280 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M440 150 C440 135 460 135 460 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M430 180 L470 180 L475 280 L425 280 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 14: Pharmacy Service Counter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="210" width="300" height="130" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <rect x="250" y="165" width="40" height="45" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="1.8" />
      <path d="M230 125 C230 110 250 110 250 125 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M220 155 L260 155 L265 240 L215 240 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M420 125 C420 110 440 110 440 125 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M410 155 L450 155 L455 240 L405 240 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
    `,
    // 15: Coffee Shop Counter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="160" y="200" width="320" height="140" fill="#f5f5f5" stroke="#222222" stroke-width="3" />
      <rect x="200" y="140" width="80" height="60" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M230 100 C230 85 250 85 250 100 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M400 130 C400 115 420 115 420 130 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 16: City Park Bench
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="240" width="280" height="20" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <line x1="200" y1="260" x2="200" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="440" y1="260" x2="440" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M240 180 C240 165 260 165 260 180 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M380 180 C380 165 400 165 400 180 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 17: Apartment Building Lobby
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="60" y="40" width="140" height="260" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <rect x="260" y="60" width="160" height="280" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="3" />
      <path d="M470 160 C470 145 490 145 490 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 18: Hardware Store Tools
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="60" y="40" width="300" height="240" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="60" y1="120" x2="360" y2="120" stroke="#222222" stroke-width="2" />
      <path d="M440 160 C440 145 460 145 460 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 19: Art Museum Gallery
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="60" width="160" height="120" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="3" />
      <path d="M420 160 C420 145 440 145 440 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 20: School Classroom Desk
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="60" y="40" width="240" height="140" fill="url(#pShadeDark_${sceneIdx})" opacity="0.8" stroke="#222222" stroke-width="3" />
      <path d="M380 160 C380 145 400 145 400 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 21: Shoe Repair Cobbler
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="160" y="220" width="200" height="120" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M240 160 C240 145 260 145 260 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 22: Hair Salon Styling Chair
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="80" y="40" width="140" height="200" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M320 160 C320 145 340 145 340 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M440 150 C440 135 460 135 460 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 23: Car Rental Desk
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="200" width="300" height="140" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M240 140 C240 125 260 125 260 140 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M420 140 C420 125 440 125 440 140 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 24: Taxi Stand Station
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M120 200 Q240 160 360 200 L380 340 L80 340 Z" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M440 160 C440 145 460 145 460 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 25: Electronics Repair Bench
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="140" y="220" width="280" height="120" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="3" />
      <path d="M240 160 C240 145 260 145 260 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 26: Gym Fitness Front Desk
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="210" width="300" height="130" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M240 150 C240 135 260 135 260 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M420 150 C420 135 440 135 440 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 27: Tourist Info Kiosk
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="60" y="40" width="200" height="180" fill="url(#pShadeMedium_${sceneIdx})" opacity="0.5" stroke="#222222" stroke-width="2.5" />
      <path d="M340 150 C340 135 360 135 360 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M460 150 C460 135 480 135 480 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 28: Laundromat Washing Machines
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="80" y="80" width="120" height="260" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <circle cx="140" cy="180" r="35" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="2" />
      <path d="M340 160 C340 145 360 145 360 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 29: Florist Flower Counter
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="160" y="210" width="260" height="130" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M220 160 C220 145 240 145 240 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M440 160 C440 145 460 145 460 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 30: Cinema Box Office Window
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="180" y="60" width="280" height="280" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <rect x="220" y="100" width="200" height="120" fill="url(#pShadeMedium_${sceneIdx})" opacity="0.4" stroke="#222222" stroke-width="2" />
      <path d="M300 135 C300 120 320 120 320 135 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 31: Bicycle Rental Stand
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <circle cx="160" cy="280" r="40" fill="none" stroke="#222222" stroke-width="3" />
      <circle cx="320" cy="280" r="40" fill="none" stroke="#222222" stroke-width="3" />
      <path d="M440 160 C440 145 460 145 460 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 32: Optician Eyewear Shop
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="60" y="40" width="240" height="180" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M360 150 C360 135 380 135 380 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M480 150 C480 135 500 135 500 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 33: Newspaper Kiosk Stand
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M120 40 L440 40 L460 90 L100 90 Z" fill="url(#pShadeDark_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
      <rect x="120" y="90" width="320" height="250" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M260 140 C260 125 280 125 280 140 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 34: Tailor Jacket Fitting
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="120" y="60" width="160" height="240" stroke="#222222" stroke-width="2.5" fill="none" />
      <path d="M340 160 C340 145 360 145 360 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M460 160 C460 145 480 145 480 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 35: Dental Examination Room
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M120 260 L280 200 L340 280 Z" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="3" />
      <path d="M180 170 C180 155 200 155 200 170 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M400 140 C400 125 420 125 420 140 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 36: Pet Grooming Desk
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="140" y="210" width="280" height="130" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M280 160 C280 145 300 145 300 160 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 37: Farmers Market Stall
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M100 60 L460 60 L480 110 L80 110 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
      <rect x="100" y="210" width="360" height="130" fill="#ffffff" stroke="#222222" stroke-width="3" />
      <path d="M220 150 C220 135 240 135 240 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M420 150 C420 135 440 135 440 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 38: Train Ticket Automated Machine
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="140" y="60" width="160" height="280" fill="url(#pShadeLight_${sceneIdx})" stroke="#222222" stroke-width="3" rx="8" />
      <rect x="170" y="100" width="100" height="80" fill="#ffffff" stroke="#222222" stroke-width="2" />
      <path d="M380 150 C380 135 400 135 400 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `,
    // 39: Music Instrument Store
    () => `
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <path d="M120 120 C100 140 100 200 140 240 C180 280 220 280 220 220 Z" fill="url(#pShadeMedium_${sceneIdx})" stroke="#222222" stroke-width="2.5" />
      <line x1="160" y1="120" x2="160" y2="30" stroke="#222222" stroke-width="4" />
      <path d="M380 150 C380 135 400 135 400 150 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
    `
  ];

  const renderScene = sceneRenderers[idx] || sceneRenderers[0];

  return `${containerStart}${renderScene()}${containerEnd}`;
}

export function getOfficialOptionImageSvgs(qNum: number, seedOffset: number = 0): string[] {
  return [0, 1, 2, 3].map((optIdx) =>
    getOfficialLineArtSvg(qNum, seedOffset + optIdx * 7 + 1)
  );
}

