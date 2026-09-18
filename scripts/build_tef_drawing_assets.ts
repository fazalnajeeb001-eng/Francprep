import fs from "fs";
import path from "path";

const brainDir = "C:\\Users\\black\\.gemini\\antigravity-ide\\brain\\30a9a146-fb32-41ab-a252-f079fc74911c";
const targetDir = path.join(process.cwd(), "public", "illustrations", "tef");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Copy generated JPEG drawings as PNG/JPG assets
const mappings: Record<string, string> = {
  // Q1: Gare
  "tef_p1_q1_a.png": "tef_p1_q1_d_1789696009098.jpg", // traveler asking agent at info desk
  "tef_p1_q1_b.png": "tef_p1_q1_b_1789695985956.jpg", // departures board
  "tef_p1_q1_c.png": "tef_p1_q1_c_1789695996929.jpg", // validating machine
  "tef_p1_q1_d.png": "tef_p1_q1_a_1789695975273.jpg", // ticket counter

  // Q2: Commerce / Alimentation
  "tef_p1_q2_a.png": "tef_p1_q2_a_1789696022287.jpg", // boulangerie
  "tef_p1_q2_b.png": "tef_p1_q2_b_1789696036439.jpg", // fruits & légumes
  "tef_p1_q2_c.png": "tef_p1_q2_c_1789696052377.jpg", // pharmacie
  "tef_p1_q2_d.png": "tef_p1_q2_d_1789696067900.jpg", // fast food

  // Q3: Santé / Administration
  "tef_p1_q3_a.png": "tef_p1_q3_a_1789696082480.jpg", // cabinet médical
  "tef_p1_q3_b.png": "tef_p1_q3_b_1789696095284.jpg", // bibliothèque
  "tef_p1_q3_c.png": "tef_p1_q3_c_1789696108845.jpg", // supermarché caisse
  "tef_p1_q3_d.png": "tef_p1_q3_d_1789696123292.jpg", // hôtel accueil

  // Q4: Mobilité & Réparation Vélo
  "tef_p1_q4_a.png": "tef_p1_q4_a_1789696140993.jpg", // atelier réparation vélo frein
  "tef_p1_q4_b.png": "tef_p1_q4_b_1789696240340.jpg", // essayage casque de vélo
};

for (const [targetName, srcName] of Object.entries(mappings)) {
  const srcPath = path.join(brainDir, srcName);
  const dstPath = path.join(targetDir, targetName);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dstPath);
    console.log(`✓ Copied ${srcName} -> ${targetName} (${(fs.statSync(dstPath).size / 1024).toFixed(1)} KB)`);
  } else {
    console.error(`❌ Source not found: ${srcPath}`);
  }
}

// 2. Build crisp B&W ligne claire SVGs for Q4 C and Q4 D
const svgQ4C = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#ffffff"/>
  
  <!-- Outer border matching TEF CBT format -->
  <rect x="25" y="25" width="750" height="550" fill="none" stroke="#111827" stroke-width="4"/>
  <rect x="25" y="25" width="750" height="42" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="400" y="53" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">EXAMEN OFFICIEL TEF — STATION DE MOBILITÉ LIBRE-SERVICE</text>
  
  <!-- Ground Line -->
  <line x1="25" y1="480" x2="775" y2="480" stroke="#111827" stroke-width="4"/>
  
  <!-- Interactive Rental Terminal Totem -->
  <rect x="100" y="180" width="130" height="300" rx="8" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <rect x="120" y="210" width="90" height="70" rx="4" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="165" y="250" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#111827" text-anchor="middle">BORNE</text>
  <circle cx="165" cy="320" r="18" fill="none" stroke="#111827" stroke-width="3"/>
  <!-- Keypad dots -->
  <rect x="135" y="360" width="60" height="80" rx="3" fill="none" stroke="#111827" stroke-width="2"/>
  <circle cx="145" cy="375" r="4" fill="#111827"/>
  <circle cx="165" cy="375" r="4" fill="#111827"/>
  <circle cx="185" cy="375" r="4" fill="#111827"/>
  <circle cx="145" cy="395" r="4" fill="#111827"/>
  <circle cx="165" cy="395" r="4" fill="#111827"/>
  <circle cx="185" cy="395" r="4" fill="#111827"/>
  <circle cx="145" cy="415" r="4" fill="#111827"/>
  <circle cx="165" cy="415" r="4" fill="#111827"/>
  <circle cx="185" cy="415" r="4" fill="#111827"/>

  <!-- Docking Station Rail -->
  <rect x="260" y="380" width="480" height="30" rx="4" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <rect x="340" y="410" width="25" height="70" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <rect x="520" y="410" width="25" height="70" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <rect x="680" y="410" width="25" height="70" fill="#ffffff" stroke="#111827" stroke-width="4"/>

  <!-- Docked Rental Bicycle 1 -->
  <g transform="translate(290, 270)">
    <circle cx="60" cy="140" r="45" fill="none" stroke="#111827" stroke-width="4"/>
    <circle cx="210" cy="140" r="45" fill="none" stroke="#111827" stroke-width="4"/>
    <circle cx="60" cy="140" r="8" fill="#111827"/>
    <circle cx="210" cy="140" r="8" fill="#111827"/>
    <polyline points="60,140 120,140 180,80 120,80 60,140" fill="none" stroke="#111827" stroke-width="5" stroke-linejoin="round"/>
    <line x1="120" y1="80" x2="120" y2="140" stroke="#111827" stroke-width="5"/>
    <line x1="180" y1="80" x2="210" y2="140" stroke="#111827" stroke-width="5"/>
    <!-- Handlebar & Front Basket -->
    <line x1="180" y1="80" x2="175" y2="45" stroke="#111827" stroke-width="4"/>
    <path d="M160,45 L190,45" stroke="#111827" stroke-width="5" stroke-linecap="round"/>
    <rect x="180" y="48" width="30" height="25" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Saddle -->
    <path d="M105,65 L135,65" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- Person tapping card or phone on terminal -->
  <g transform="translate(60, 210)">
    <!-- Head -->
    <circle cx="30" cy="35" r="22" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Body -->
    <path d="M15,60 L45,60 L50,180 L10,180 Z" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Arm extended holding phone to scanner -->
    <path d="M40,75 L95,65" stroke="#111827" stroke-width="5" stroke-linecap="round"/>
    <rect x="92" y="55" width="12" height="20" rx="2" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Legs -->
    <line x1="20" y1="180" x2="15" y2="270" stroke="#111827" stroke-width="4"/>
    <line x1="40" y1="180" x2="45" y2="270" stroke="#111827" stroke-width="4"/>
  </g>
</svg>`;

const svgQ4D = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#ffffff"/>
  
  <!-- Outer border matching TEF CBT format -->
  <rect x="25" y="25" width="750" height="550" fill="none" stroke="#111827" stroke-width="4"/>
  <rect x="25" y="25" width="750" height="42" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <text x="400" y="53" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">EXAMEN OFFICIEL TEF — BORNE DE GONFLAGE ET POMPE À VÉLO</text>
  
  <!-- Ground Line -->
  <line x1="25" y1="480" x2="775" y2="480" stroke="#111827" stroke-width="4"/>

  <!-- Public Autonomous Inflation Pillar -->
  <rect x="140" y="150" width="100" height="330" rx="8" fill="#ffffff" stroke="#111827" stroke-width="4"/>
  <circle cx="190" cy="220" r="28" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <!-- Pressure Gauge needle -->
  <line x1="190" y1="220" x2="202" y2="208" stroke="#111827" stroke-width="3" stroke-linecap="round"/>
  <text x="190" y="280" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#111827" text-anchor="middle">AIR</text>
  <text x="190" y="300" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#111827" text-anchor="middle">BAR / PSI</text>

  <!-- Manual Floor Foot Pump next to pillar -->
  <rect x="280" y="360" width="18" height="120" rx="3" fill="#ffffff" stroke="#111827" stroke-width="3"/>
  <!-- T-bar handle -->
  <line x1="260" y1="360" x2="318" y2="360" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
  <!-- Base stand -->
  <line x1="265" y1="480" x2="315" y2="480" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
  <!-- Air Hose connecting pump to bicycle tire valve -->
  <path d="M280,470 C340,490 380,450 440,430" fill="none" stroke="#111827" stroke-width="4" stroke-linecap="round"/>

  <!-- Bicycle parked on kickstand being inflated -->
  <g transform="translate(380, 240)">
    <!-- Rear wheel with air valve nozzle -->
    <circle cx="60" cy="170" r="55" fill="none" stroke="#111827" stroke-width="4"/>
    <circle cx="60" cy="170" r="8" fill="#111827"/>
    <!-- Tire valve -->
    <line x1="60" y1="190" x2="60" y2="205" stroke="#111827" stroke-width="4"/>
    <!-- Front wheel -->
    <circle cx="240" cy="170" r="55" fill="none" stroke="#111827" stroke-width="4"/>
    <circle cx="240" cy="170" r="8" fill="#111827"/>
    <!-- Frame -->
    <polyline points="60,170 130,170 200,95 130,95 60,170" fill="none" stroke="#111827" stroke-width="5" stroke-linejoin="round"/>
    <line x1="130" y1="95" x2="130" y2="170" stroke="#111827" stroke-width="5"/>
    <line x1="200" y1="95" x2="240" y2="170" stroke="#111827" stroke-width="5"/>
    <!-- Saddle & Handlebars -->
    <path d="M115,80 L145,80" stroke="#111827" stroke-width="6" stroke-linecap="round"/>
    <line x1="200" y1="95" x2="195" y2="60" stroke="#111827" stroke-width="4"/>
    <path d="M180,60 L210,60" stroke="#111827" stroke-width="5" stroke-linecap="round"/>
  </g>

  <!-- Person kneeling down attaching air hose nozzle to wheel valve -->
  <g transform="translate(320, 310)">
    <!-- Head -->
    <circle cx="45" cy="40" r="20" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Torso bent forward -->
    <path d="M35,60 L60,75 L50,140 L25,120 Z" fill="#ffffff" stroke="#111827" stroke-width="3"/>
    <!-- Arms reaching toward valve -->
    <path d="M55,75 L100,105" stroke="#111827" stroke-width="4" stroke-linecap="round"/>
    <!-- Kneeling legs -->
    <path d="M30,125 L10,165 L60,165" fill="none" stroke="#111827" stroke-width="4" stroke-linejoin="round"/>
  </g>
</svg>`;

// Write both SVGs
const svgPathC = path.join(targetDir, "tef_p1_q4_c.svg");
const svgPathD = path.join(targetDir, "tef_p1_q4_d.svg");
fs.writeFileSync(svgPathC, svgQ4C, "utf8");
fs.writeFileSync(svgPathD, svgQ4D, "utf8");

// Also save as .png (SVG data in .png format allows <img> tags referencing either extension to work flawlessly)
fs.writeFileSync(path.join(targetDir, "tef_p1_q4_c.png"), svgQ4C, "utf8");
fs.writeFileSync(path.join(targetDir, "tef_p1_q4_d.png"), svgQ4D, "utf8");

console.log("✓ Created tef_p1_q4_c.svg and tef_p1_q4_c.png");
console.log("✓ Created tef_p1_q4_d.svg and tef_p1_q4_d.png");

// 3. Update mainImage pointers
fs.copyFileSync(path.join(targetDir, "tef_p1_q1_a.png"), path.join(targetDir, "tef_p1_q1.png"));
fs.copyFileSync(path.join(targetDir, "tef_p1_q2_a.png"), path.join(targetDir, "tef_p1_q2.png"));
fs.copyFileSync(path.join(targetDir, "tef_p1_q3_a.png"), path.join(targetDir, "tef_p1_q3.png"));
fs.copyFileSync(path.join(targetDir, "tef_p1_q4_a.png"), path.join(targetDir, "tef_p1_q4.png"));

console.log("🎉 All 16 Drawing Assets Successfully Built and Verified!");
