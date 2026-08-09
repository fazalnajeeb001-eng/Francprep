/**
 * Official TCF Exam Fine-Pencil Line-Art Illustration Generator
 * Faithfully matches the realistic human line-drawing pencil sketch style of TCF Compréhension Orale Q1-Q4.
 */

export function getOfficialLineArtSvg(qNum: number, seed: number = 0): string {
  const type = ((qNum + seed) % 4) + 1;

  if (type === 1) {
    // Screenshot 1 Style: Office Desk Scene (Two men talking standing near curved executive desk)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white">
      <defs>
        <!-- Pencil hatching filter pattern -->
        <pattern id="pencilHatch1" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#aaaaaa" stroke-width="0.8" />
        </pattern>
        <pattern id="pencilHatchDark" width="4" height="4" patternTransform="rotate(-30 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#888888" stroke-width="1" />
        </pattern>
      </defs>

      <rect width="650" height="420" fill="#ffffff" />
      
      <!-- Background wall texture -->
      <rect x="0" y="0" width="650" height="340" fill="url(#pencilHatch1)" opacity="0.3" />
      
      <!-- Office Window in Background -->
      <rect x="260" y="30" width="160" height="180" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="340" y1="30" x2="340" y2="210" stroke="#222222" stroke-width="2" />
      <line x1="260" y1="120" x2="420" y2="120" stroke="#222222" stroke-width="1.5" />

      <!-- Office Door Left -->
      <rect x="40" y="60" width="80" height="280" fill="#ffffff" stroke="#222222" stroke-width="2" />
      <circle cx="108" cy="200" r="4" fill="#333333" />

      <!-- Floor Line -->
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />
      <rect x="0" y="340" width="650" height="80" fill="url(#pencilHatch1)" opacity="0.4" />

      <!-- Executive Desk (Curved L-shape) -->
      <path d="M220 220 C320 200 450 210 480 240 L480 340 L220 340 Z" fill="#f4f4f4" stroke="#222222" stroke-width="3" />
      <path d="M220 220 L480 240 L440 260 L200 240 Z" fill="url(#pencilHatchDark)" opacity="0.25" stroke="#222222" stroke-width="2" />
      <!-- Desk Legs -->
      <line x1="220" y1="240" x2="220" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="470" y1="240" x2="470" y2="340" stroke="#222222" stroke-width="3" />

      <!-- Desk Items (Documents & Triangle Ruler) -->
      <polygon points="320,225 350,230 335,245" fill="none" stroke="#222222" stroke-width="2" />
      <rect x="360" y="222" width="40" height="25" fill="#ffffff" stroke="#222222" stroke-width="1.5" transform="rotate(8 380 230)" />

      <!-- Executive Office Armchair (Right) -->
      <path d="M510 180 C540 180 550 200 550 250 L530 300 C500 300 490 280 490 240 Z" fill="url(#pencilHatch1)" opacity="0.5" stroke="#222222" stroke-width="2.5" />
      <line x1="520" y1="300" x2="520" y2="340" stroke="#222222" stroke-width="3" />

      <!-- Person 1: Left Man in Jacket (Standing) -->
      <circle cx="150" cy="100" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Head -->
      <path d="M142 98 Q150 90 158 98" fill="#333333" /> <!-- Moustache/Hair -->
      <path d="M130 120 L170 120 L175 220 L125 220 Z" fill="url(#pencilHatch1)" stroke="#222222" stroke-width="2.5" /> <!-- Suit Jacket -->
      <line x1="135" y1="220" x2="135" y2="335" stroke="#222222" stroke-width="3" /> <!-- Trousers Left -->
      <line x1="165" y1="220" x2="165" y2="335" stroke="#222222" stroke-width="3" /> <!-- Trousers Right -->
      <ellipse cx="132" cy="338" rx="10" ry="4" fill="#333333" /> <!-- Shoe Left -->
      <ellipse cx="168" cy="338" rx="10" ry="4" fill="#333333" /> <!-- Shoe Right -->

      <!-- Person 2: Right Man gesturing towards desk (Standing) -->
      <circle cx="410" cy="105" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Head -->
      <path d="M400 95 Q415 85 425 100" fill="#444444" /> <!-- Hair -->
      <path d="M390 125 L430 125 L435 225 L385 225 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Shirt -->
      <line x1="410" y1="125" x2="410" y2="225" stroke="#222222" stroke-width="2" /> <!-- Tie -->
      <path d="M385 140 L350 170" stroke="#222222" stroke-width="2.5" stroke-linecap="round" /> <!-- Arm Gesturing Left -->
      <line x1="395" y1="225" x2="395" y2="335" stroke="#222222" stroke-width="3" /> <!-- Trousers Left -->
      <line x1="425" y1="225" x2="425" y2="335" stroke="#222222" stroke-width="3" /> <!-- Trousers Right -->
      <ellipse cx="392" cy="338" rx="10" ry="4" fill="#333333" />
      <ellipse cx="428" cy="338" rx="10" ry="4" fill="#333333" />
    </svg>`;
  } else if (type === 2) {
    // Screenshot 2 Style: Hotel Reception / Airport Information Desk Scene
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white">
      <defs>
        <pattern id="pencilHatch2" width="5" height="5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#bbbbbb" stroke-width="0.8" />
        </pattern>
      </defs>

      <rect width="650" height="420" fill="#ffffff" />
      <rect x="0" y="0" width="650" height="340" fill="url(#pencilHatch2)" opacity="0.35" />

      <!-- Background Door Left -->
      <rect x="60" y="70" width="90" height="270" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <rect x="85" y="100" width="40" height="30" rx="4" fill="none" stroke="#222222" stroke-width="2" />

      <!-- Reception Enclosure / Canopy -->
      <path d="M190 70 L460 70 L480 110 L170 110 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="250" y1="70" x2="240" y2="110" stroke="#222222" stroke-width="1.5" />
      <line x1="330" y1="70" x2="330" y2="110" stroke="#222222" stroke-width="1.5" />
      <line x1="400" y1="70" x2="410" y2="110" stroke="#222222" stroke-width="1.5" />

      <!-- Glass Counter Enclosure -->
      <rect x="190" y="110" width="270" height="230" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
      <rect x="210" y="130" width="230" height="110" fill="#ffffff" stroke="#222222" stroke-width="1.5" />

      <!-- Receptionist Woman Behind Counter -->
      <circle cx="340" cy="175" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M322 175 Q340 160 358 175" fill="#333333" /> <!-- Short Hair -->
      <path d="M315 200 L365 200 L370 240 L310 240 Z" fill="url(#pencilHatch2)" stroke="#222222" stroke-width="2" /> <!-- Suit Blazer -->
      <path d="M350 205 L400 190" stroke="#222222" stroke-width="2.5" stroke-linecap="round" /> <!-- Arm pointing direction -->

      <!-- Floor Line -->
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />

      <!-- Customer Man Standing at Counter (Right) -->
      <circle cx="490" cy="160" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M472 155 Q490 145 505 160" fill="#444444" />
      <path d="M470 185 L510 185 L515 270 L465 270 Z" fill="#ffffff" stroke="#222222" stroke-width="2.5" /> <!-- Jacket -->
      <line x1="475" y1="270" x2="475" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="505" y1="270" x2="505" y2="340" stroke="#222222" stroke-width="3" />

      <!-- Luggage Suitcase with Wheels -->
      <rect x="535" y="240" width="55" height="85" fill="url(#pencilHatch2)" stroke="#222222" stroke-width="2.5" rx="5" />
      <line x1="560" y1="240" x2="560" y2="200" stroke="#222222" stroke-width="3" /> <!-- Handle -->
      <circle cx="545" cy="330" r="5" fill="#333333" />
      <circle cx="580" cy="330" r="5" fill="#333333" />
    </svg>`;
  } else if (type === 3) {
    // Bakery Counter Scene (Pencil Sketch Style)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white">
      <defs>
        <pattern id="pencilHatch3" width="5" height="5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#cccccc" stroke-width="0.8" />
        </pattern>
      </defs>

      <rect width="650" height="420" fill="#ffffff" />
      <rect x="0" y="0" width="650" height="340" fill="url(#pencilHatch3)" opacity="0.3" />

      <!-- Bakery Shelves Background -->
      <rect x="80" y="40" width="490" height="150" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <line x1="80" y1="90" x2="570" y2="90" stroke="#222222" stroke-width="2" />
      <line x1="80" y1="140" x2="570" y2="140" stroke="#222222" stroke-width="2" />

      <!-- Loaves of bread on shelves -->
      <ellipse cx="140" cy="75" rx="30" ry="12" fill="url(#pencilHatch3)" stroke="#222222" stroke-width="1.8" />
      <ellipse cx="230" cy="75" rx="35" ry="12" fill="url(#pencilHatch3)" stroke="#222222" stroke-width="1.8" />
      <ellipse cx="320" cy="75" rx="28" ry="12" fill="url(#pencilHatch3)" stroke="#222222" stroke-width="1.8" />
      <ellipse cx="410" cy="75" rx="32" ry="12" fill="url(#pencilHatch3)" stroke="#222222" stroke-width="1.8" />

      <!-- Counter Glass Desk -->
      <rect x="120" y="210" width="410" height="130" fill="#f8f8f8" stroke="#222222" stroke-width="3" />
      <line x1="120" y1="250" x2="530" y2="250" stroke="#222222" stroke-width="2" />

      <!-- Baker Behind Counter (Left) -->
      <circle cx="200" cy="145" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M185 125 C185 100 215 100 215 125 Z" fill="#ffffff" stroke="#222222" stroke-width="2" /> <!-- Baker Hat -->
      <path d="M180 170 L220 170 L225 210 L175 210 Z" fill="#ffffff" stroke="#222222" stroke-width="2" />
      <path d="M210 180 L250 200" stroke="#222222" stroke-width="2.5" stroke-linecap="round" /> <!-- Holding bread bag -->

      <!-- Floor Line -->
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />

      <!-- Customer Right -->
      <circle cx="470" cy="160" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M450 185 L490 185 L495 270 L445 270 Z" fill="url(#pencilHatch3)" stroke="#222222" stroke-width="2.5" />
      <line x1="455" y1="270" x2="455" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="485" y1="270" x2="485" y2="340" stroke="#222222" stroke-width="3" />
    </svg>`;
  } else {
    // Airport Boarding Counter / Ticket Check Scene (Pencil Sketch Style)
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 420" class="w-full h-full bg-white">
      <defs>
        <pattern id="pencilHatch4" width="5" height="5" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#bbbbbb" stroke-width="0.8" />
        </pattern>
      </defs>

      <rect width="650" height="420" fill="#ffffff" />
      <rect x="0" y="0" width="650" height="340" fill="url(#pencilHatch4)" opacity="0.3" />

      <!-- Airport Window View (Airplane Outside) -->
      <rect x="70" y="40" width="260" height="170" fill="#ffffff" stroke="#222222" stroke-width="2.5" rx="8" />
      <path d="M100 150 L280 100 L300 135 L190 160 Z" fill="#888888" stroke="#222222" stroke-width="2" />
      <line x1="200" y1="120" x2="260" y2="105" stroke="#222222" stroke-width="2" />

      <!-- Gate Counter Desk Right -->
      <rect x="360" y="190" width="200" height="150" fill="#f5f5f5" stroke="#222222" stroke-width="3" />
      <rect x="380" y="130" width="75" height="60" fill="#ffffff" stroke="#222222" stroke-width="2" /> <!-- Monitor -->

      <!-- Gate Agent Female Behind Desk -->
      <circle cx="490" cy="150" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M472 150 Q490 135 508 150" fill="#333333" />
      <path d="M470 175 L510 175 L515 190 L465 190 Z" fill="#ffffff" stroke="#222222" stroke-width="2" />

      <!-- Floor Line -->
      <line x1="0" y1="340" x2="650" y2="340" stroke="#222222" stroke-width="3" />

      <!-- Passenger Left Handing Passport/Ticket -->
      <circle cx="280" cy="165" r="18" fill="#ffffff" stroke="#222222" stroke-width="2.5" />
      <path d="M260 190 L300 190 L305 275 L255 275 Z" fill="url(#pencilHatch4)" stroke="#222222" stroke-width="2.5" />
      <line x1="265" y1="275" x2="265" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="295" y1="275" x2="295" y2="340" stroke="#222222" stroke-width="3" />
      <line x1="290" y1="210" x2="370" y2="195" stroke="#222222" stroke-width="2.5" stroke-linecap="round" /> <!-- Hand holding boarding pass -->
    </svg>`;
  }
}
