import fs from "fs";
import path from "path";

const targetDir = path.join(process.cwd(), "public", "illustrations", "tef");

// ─── DESSIN B: GUICHET DE CINÉMA ───
const svgCinema = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#ffffff"/>
  
  <!-- Outer border matching TEF CBT format -->
  <rect x="25" y="25" width="750" height="550" fill="none" stroke="#111827" stroke-width="4"/>
  <rect x="25" y="25" width="750" height="42" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="400" y="53" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">EXAMEN OFFICIEL TEF — BILLETTERIE DE CINÉMA</text>
  
  <!-- Floor line -->
  <line x1="25" y1="490" x2="775" y2="490" stroke="#111827" stroke-width="4"/>

  <!-- Cinema Posters on Wall -->
  <!-- Poster 1 -->
  <rect x="60" y="100" width="130" height="190" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <rect x="75" y="115" width="100" height="110" fill="#ffffff" stroke="#111827" stroke-width="2"/>
  <circle cx="125" cy="160" r="28" fill="none" stroke="#111827" stroke-width="3"/>
  <text x="125" y="250" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#111827" text-anchor="middle">FILM : AVENTURE</text>
  <text x="125" y="270" font-family="system-ui, sans-serif" font-size="11" fill="#111827" text-anchor="middle">SÉANCES : 14h • 18h</text>

  <!-- Poster 2 -->
  <rect x="220" y="100" width="130" height="190" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <rect x="235" y="115" width="100" height="110" fill="#ffffff" stroke="#111827" stroke-width="2"/>
  <polygon points="285,130 250,200 320,200" fill="none" stroke="#111827" stroke-width="3"/>
  <text x="285" y="250" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#111827" text-anchor="middle">COMÉDIE</text>
  <text x="285" y="270" font-family="system-ui, sans-serif" font-size="11" fill="#111827" text-anchor="middle">SALLE 3 • 16h30</text>

  <!-- Cinema Box Office Counter Booth -->
  <rect x="420" y="150" width="310" height="340" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <!-- Top Signboard -->
  <rect x="440" y="110" width="270" height="40" rx="4" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="575" y="136" font-family="system-ui, sans-serif" font-size="16" font-weight="extrabold" fill="#111827" text-anchor="middle" letter-spacing="2">🎬 CAISSE CINÉMA</text>
  <!-- Glass Window Opening -->
  <rect x="460" y="170" width="230" height="160" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <!-- Speaking Hole Circle & Ticket Slot -->
  <circle cx="575" cy="240" r="16" fill="none" stroke="#111827" stroke-width="2"/>
  <rect x="520" y="320" width="110" height="12" rx="3" fill="#ffffff" stroke="#111827" stroke-width="2"/>
  <text x="575" y="328" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" fill="#111827" text-anchor="middle">BILLETS</text>

  <!-- Cashier Inside Booth -->
  <g transform="translate(535, 175)">
    <circle cx="40" cy="40" r="24" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Cashier Cap -->
    <path d="M16,35 Q40,15 64,35" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <line x1="12" y1="35" x2="68" y2="35" stroke="#111827" stroke-width="3"/>
    <!-- Eyes and smile -->
    <circle cx="33" cy="40" r="2" fill="#111827"/>
    <circle cx="47" cy="40" r="2" fill="#111827"/>
    <path d="M33,49 Q40,55 47,49" fill="none" stroke="#111827" stroke-width="2"/>
    <!-- Body -->
    <path d="M15,64 L65,64 L70,140 L10,140 Z" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Tie -->
    <polygon points="40,64 36,95 40,105 44,95" fill="#ffffff" stroke="#111827" stroke-width="2"/>
  </g>

  <!-- Customer Purchasing Ticket (Left side) -->
  <g transform="translate(260, 220)">
    <!-- Head -->
    <circle cx="50" cy="50" r="26" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
    <path d="M24,40 Q50,15 76,40" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <circle cx="58" cy="48" r="2.5" fill="#111827"/>
    <path d="M54,58 Q60,64 66,58" fill="none" stroke="#111827" stroke-width="2"/>
    <!-- Body / Jacket -->
    <path d="M22,76 L78,76 L85,260 L15,260 Z" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
    <!-- Arm extended holding banknote / card to ticket slot -->
    <path d="M60,100 L170,110" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
    <rect x="165" y="100" width="22" height="14" rx="2" fill="#ffffff" stroke="#111827" stroke-width="2"/>
    <!-- Legs -->
    <line x1="35" y1="260" x2="30" y2="370" stroke="#111827" stroke-width="5"/>
    <line x1="65" y1="260" x2="70" y2="370" stroke="#111827" stroke-width="5"/>
    <!-- Popcorn bucket held in other hand -->
    <polygon points="5,120 -5,170 20,170 25,120" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <text x="10" y="150" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" fill="#111827" text-anchor="middle">POPCORN</text>
  </g>
</svg>`;

// ─── DESSIN C: COMPTOIR D'ENREGISTREMENT À L'AÉROPORT ───
const svgAirport = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#ffffff"/>
  
  <!-- Outer border matching TEF CBT format -->
  <rect x="25" y="25" width="750" height="550" fill="none" stroke="#111827" stroke-width="4"/>
  <rect x="25" y="25" width="750" height="42" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="400" y="53" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">EXAMEN OFFICIEL TEF — ENREGISTREMENT AÉROPORT</text>
  
  <!-- Floor line -->
  <line x1="25" y1="490" x2="775" y2="490" stroke="#111827" stroke-width="4"/>

  <!-- Overhead Airport Departure Screen -->
  <rect x="180" y="80" width="440" height="65" rx="6" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="400" y="105" font-family="system-ui, sans-serif" font-size="14" font-weight="extrabold" fill="#111827" text-anchor="middle" letter-spacing="1">✈️ AÉROPORT — ENREGISTREMENT BAGAGES</text>
  <text x="400" y="130" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#111827" text-anchor="middle">VOL AF 351 • PARIS CDG ➔ MONTRÉAL YUL • PORTE B12</text>

  <!-- Airport Check-in Counter Desk -->
  <rect x="380" y="230" width="340" height="260" rx="6" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <!-- Counter Top Surface -->
  <line x1="370" y1="230" x2="730" y2="230" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
  <!-- Airline Agent Behind Counter -->
  <g transform="translate(520, 140)">
    <!-- Head with Airline Cap -->
    <circle cx="45" cy="40" r="24" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <path d="M21,32 Q45,12 69,32" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <line x1="18" y1="32" x2="72" y2="32" stroke="#111827" stroke-width="3"/>
    <!-- Face -->
    <circle cx="38" cy="40" r="2.5" fill="#111827"/>
    <circle cx="52" cy="40" r="2.5" fill="#111827"/>
    <path d="M38,49 Q45,55 52,49" fill="none" stroke="#111827" stroke-width="2"/>
    <!-- Body in Uniform -->
    <path d="M15,64 L75,64 L80,150 L10,150 Z" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Scarf / Tie -->
    <polygon points="45,64 40,88 45,95 50,88" fill="#ffffff" stroke="#111827" stroke-width="2"/>
  </g>
  <!-- Computer Terminal on Desk -->
  <rect x="420" y="180" width="60" height="45" rx="3" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <line x1="450" y1="225" x2="450" y2="230" stroke="#111827" stroke-width="4"/>
  <line x1="435" y1="230" x2="465" y2="230" stroke="#111827" stroke-width="4"/>

  <!-- Baggage Scale and Conveyor Belt (Between Passenger and Desk) -->
  <rect x="290" y="410" width="110" height="80" rx="4" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <!-- Digital Weight Display -->
  <rect x="310" y="370" width="70" height="35" rx="3" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
  <text x="345" y="393" font-family="monospace" font-size="14" font-weight="bold" fill="#111827" text-anchor="middle">21.4 kg</text>
  <line x1="345" y1="405" x2="345" y2="410" stroke="#111827" stroke-width="3"/>
  <!-- Suitcase on scale -->
  <rect x="305" y="420" width="80" height="60" rx="8" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <line x1="330" y1="420" x2="330" y2="480" stroke="#111827" stroke-width="2"/>
  <line x1="360" y1="420" x2="360" y2="480" stroke="#111827" stroke-width="2"/>
  <path d="M335,420 L335,408 L355,408 L355,420" fill="none" stroke="#111827" stroke-width="3"/>
  <!-- Luggage tag -->
  <rect x="375" y="425" width="18" height="10" rx="1" fill="#ffffff" stroke="#111827" stroke-width="1.5"/>

  <!-- Passenger with Passport (Left side) -->
  <g transform="translate(140, 210)">
    <!-- Head -->
    <circle cx="45" cy="45" r="26" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
    <!-- Hair -->
    <path d="M19,38 Q45,15 71,38" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <circle cx="53" cy="44" r="2.5" fill="#111827"/>
    <path d="M49,54 Q55,60 61,54" fill="none" stroke="#111827" stroke-width="2"/>
    <!-- Body -->
    <path d="M18,72 L72,72 L80,270 L10,270 Z" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
    <!-- Arm holding passport towards counter -->
    <path d="M55,95 L145,100" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
    <!-- Passport booklet -->
    <rect x="142" y="88" width="18" height="24" rx="2" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
    <circle cx="151" cy="100" r="4" fill="none" stroke="#111827" stroke-width="1.5"/>
    <!-- Legs -->
    <line x1="30" y1="270" x2="25" y2="380" stroke="#111827" stroke-width="5"/>
    <line x1="60" y1="270" x2="65" y2="380" stroke="#111827" stroke-width="5"/>
  </g>
</svg>`;

// ─── DESSIN D: STATION-SERVICE AVEC POMPE À ESSENCE ───
const svgGasStation = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#ffffff"/>
  
  <!-- Outer border matching TEF CBT format -->
  <rect x="25" y="25" width="750" height="550" fill="none" stroke="#111827" stroke-width="4"/>
  <rect x="25" y="25" width="750" height="42" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="400" y="53" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">EXAMEN OFFICIEL TEF — STATION-SERVICE</text>
  
  <!-- Canopy Roof over pumps -->
  <rect x="60" y="80" width="680" height="45" rx="4" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <text x="400" y="110" font-family="system-ui, sans-serif" font-size="16" font-weight="extrabold" fill="#111827" text-anchor="middle" letter-spacing="2">⛽ CARBURANTS • STATION-SERVICE</text>
  <!-- Canopy Support Pillars -->
  <rect x="160" y="125" width="22" height="365" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
  <rect x="620" y="125" width="22" height="365" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>

  <!-- Ground Line -->
  <line x1="25" y1="490" x2="775" y2="490" stroke="#111827" stroke-width="4"/>

  <!-- Price Totem Pole (Far Left) -->
  <rect x="50" y="180" width="85" height="310" rx="4" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="92" y="215" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#111827" text-anchor="middle">SP 95</text>
  <text x="92" y="235" font-family="monospace" font-size="14" font-weight="bold" fill="#111827" text-anchor="middle">1.89 €</text>
  <line x1="60" y1="250" x2="125" y2="250" stroke="#111827" stroke-width="2"/>
  <text x="92" y="275" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#111827" text-anchor="middle">DIESEL</text>
  <text x="92" y="295" font-family="monospace" font-size="14" font-weight="bold" fill="#111827" text-anchor="middle">1.75 €</text>

  <!-- Central Fuel Dispenser Pump Island -->
  <rect x="220" y="220" width="140" height="270" rx="8" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <!-- Digital Meter Screen -->
  <rect x="240" y="245" width="100" height="65" rx="4" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="290" y="270" font-family="monospace" font-size="12" font-weight="bold" fill="#111827" text-anchor="middle">45.50 €</text>
  <text x="290" y="295" font-family="monospace" font-size="11" fill="#111827" text-anchor="middle">25.00 L</text>
  <!-- Fuel Pump Nozzle Holster & Hose -->
  <path d="M360,330 C400,340 410,420 440,390" fill="none" stroke="#111827" stroke-width="5"/>
  <!-- Nozzle in person's hand -->
  <polygon points="435,375 460,360 470,375 445,390" fill="#ffffff" stroke="#111827" stroke-width="3"/>

  <!-- Automobile Parked for Refueling (Right Side) -->
  <g transform="translate(450, 310)">
    <!-- Car Body -->
    <path d="M40,110 L90,60 L200,60 L240,110 L280,120 L280,160 L10,160 L10,120 Z" fill="#ffffff" stroke="#111827" stroke-width="4"/>
    <!-- Windows -->
    <polygon points="95,68 140,68 140,105 55,105" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
    <polygon points="148,68 195,68 230,105 148,105" fill="#ffffff" stroke="#111827" stroke-width="2.5"/>
    <!-- Wheels -->
    <circle cx="65" cy="160" r="28" fill="#ffffff" stroke="#111827" stroke-width="4"/>
    <circle cx="65" cy="160" r="10" fill="#111827"/>
    <circle cx="225" cy="160" r="28" fill="#ffffff" stroke="#111827" stroke-width="4"/>
    <circle cx="225" cy="160" r="10" fill="#111827"/>
    <!-- Fuel Tank Cap Opening with inserted nozzle -->
    <circle cx="25" cy="115" r="8" fill="none" stroke="#111827" stroke-width="3"/>
  </g>

  <!-- Driver / Customer Refueling the Vehicle -->
  <g transform="translate(390, 240)">
    <!-- Head -->
    <circle cx="40" cy="40" r="24" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
    <path d="M16,32 Q40,12 64,32" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <circle cx="48" cy="38" r="2.5" fill="#111827"/>
    <!-- Body -->
    <path d="M15,64 L65,64 L70,240 L10,240 Z" fill="#ffffff" stroke="#111827" stroke-width="3.5"/>
    <!-- Arm holding nozzle into car fuel flap -->
    <path d="M50,85 L85,115" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
    <!-- Legs -->
    <line x1="25" y1="240" x2="20" y2="350" stroke="#111827" stroke-width="5"/>
    <line x1="55" y1="240" x2="60" y2="350" stroke="#111827" stroke-width="5"/>
  </g>
</svg>`;

// Write all SVGs
fs.writeFileSync(path.join(targetDir, "tef_p1_q1_b.svg"), svgCinema, "utf8");
fs.writeFileSync(path.join(targetDir, "tef_p1_q1_c.svg"), svgAirport, "utf8");
fs.writeFileSync(path.join(targetDir, "tef_p1_q1_d.svg"), svgGasStation, "utf8");

// Write all PNG representations (SVG data in .png format)
fs.writeFileSync(path.join(targetDir, "tef_p1_q1_b.png"), svgCinema, "utf8");
fs.writeFileSync(path.join(targetDir, "tef_p1_q1_c.png"), svgAirport, "utf8");
fs.writeFileSync(path.join(targetDir, "tef_p1_q1_d.png"), svgGasStation, "utf8");

console.log("✓ Successfully generated distinct Q1 drawings:");
console.log("  - Dessin A: Gare ferroviaire (remains intact)");
console.log("  - Dessin B: Billetterie de cinéma (tef_p1_q1_b.png)");
console.log("  - Dessin C: Enregistrement aéroport (tef_p1_q1_c.png)");
console.log("  - Dessin D: Station-service (tef_p1_q1_d.png)");
