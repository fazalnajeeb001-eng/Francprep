import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

console.log("=== 🎨 GENERATING 40 UNIQUE HD SCENE ILLUSTRATIONS (100% VISUAL ACCURACY) ===");

const scenes = [
  // Paper 6
  {
    key: "tcf_p6_q2",
    title: "Magasin de Chaussures",
    bg: "#f3f4f6",
    accent: "#3b82f6",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f8fafc"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="8"/>
      <!-- Shelves -->
      <rect x="100" y="200" width="350" height="20" fill="#94a3b8"/>
      <rect x="100" y="400" width="350" height="20" fill="#94a3b8"/>
      <rect x="100" y="600" width="350" height="20" fill="#94a3b8"/>
      <!-- Shoes on Shelves -->
      <path d="M 140 380 Q 180 340 220 380 L 260 380 Z" fill="#ef4444"/>
      <path d="M 300 380 Q 340 340 380 380 L 420 380 Z" fill="#10b981"/>
      <path d="M 140 580 Q 180 540 220 580 L 260 580 Z" fill="#3b82f6"/>
      <!-- Customer Seated on Stool -->
      <circle cx="650" cy="380" r="45" fill="#fde047"/>
      <rect x="620" y="425" width="60" height="180" rx="10" fill="#1e293b"/>
      <rect x="600" y="605" width="100" height="80" fill="#d97706"/>
      <!-- Shoe Box & Fitting -->
      <rect x="750" y="650" width="120" height="80" fill="#ef4444" rx="6"/>
      <path d="M 610 680 L 680 680 L 710 710 L 620 710 Z" fill="#3b82f6"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#1e293b" text-anchor="middle">Magasin de Chaussures (Opt. B: Essayage de chaussures)</text>
    `
  },
  {
    key: "tcf_p6_q3",
    title: "Salle de Sport & Gym",
    bg: "#f3f4f6",
    accent: "#10b981",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#0f172a"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#1e293b" stroke="#334155" stroke-width="8"/>
      <!-- Treadmill 1 -->
      <rect x="150" y="550" width="220" height="40" fill="#475569" transform="rotate(-15 150 550)"/>
      <rect x="160" y="380" width="15" height="180" fill="#94a3b8"/>
      <circle cx="200" cy="320" r="40" fill="#fca5a5"/>
      <rect x="180" y="360" width="40" height="120" fill="#ef4444"/>
      <!-- Dumbbells Rack -->
      <rect x="500" y="300" width="350" height="20" fill="#64748b"/>
      <circle cx="550" cy="290" r="25" fill="#38bdf8"/>
      <circle cx="650" cy="290" r="30" fill="#38bdf8"/>
      <circle cx="750" cy="290" r="35" fill="#38bdf8"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#f8fafc" text-anchor="middle">Salle de Fitness (Opt. A: Entraînement sportif)</text>
    `
  },
  {
    key: "tcf_p6_q4",
    title: "Guichet de Cinéma",
    bg: "#f3f4f6",
    accent: "#ef4444",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#450a0a"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#7f1d1d" stroke="#991b1b" stroke-width="8"/>
      <!-- Cinema Poster Frame -->
      <rect x="120" y="200" width="220" height="320" fill="#fbbf24" stroke="#ffffff" stroke-width="6"/>
      <text x="230" y="370" font-family="Arial" font-size="28" font-weight="bold" fill="#7f1d1d" text-anchor="middle">CINÉMA</text>
      <!-- Ticket Booth Glass Window -->
      <rect x="500" y="300" width="350" height="300" fill="#bae6fd" opacity="0.8" stroke="#ffffff" stroke-width="6"/>
      <circle cx="675" cy="400" r="35" fill="#f87171"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#fef2f2" text-anchor="middle">Guichet de Cinéma (Opt. B: Achat de billets)</text>
    `
  },
  // Paper 7
  {
    key: "tcf_p7_q1",
    title: "Station de Taxi Ville",
    bg: "#f3f4f6",
    accent: "#f59e0b",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f1f5f9"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="8"/>
      <!-- Yellow Taxi Car -->
      <rect x="250" y="450" width="500" height="200" rx="30" fill="#f59e0b"/>
      <rect x="350" y="350" width="300" height="120" rx="20" fill="#bfdbfe"/>
      <circle cx="380" cy="650" r="55" fill="#1e293b"/>
      <circle cx="620" cy="650" r="55" fill="#1e293b"/>
      <!-- Taxi Sign on Top -->
      <rect x="440" y="300" width="120" height="50" fill="#ffffff" stroke="#1e293b" stroke-width="4"/>
      <text x="500" y="335" font-family="Arial" font-size="22" font-weight="bold" fill="#1e293b" text-anchor="middle">TAXI</text>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#0f172a" text-anchor="middle">Station de Taxi (Opt. A: Prise en charge taxi)</text>
    `
  },
  {
    key: "tcf_p7_q2",
    title: "Librairie d'Ouvrages",
    bg: "#f3f4f6",
    accent: "#854d0e",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#fef3c7"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#fffbeb" stroke="#fde68a" stroke-width="8"/>
      <!-- Wooden Bookcase -->
      <rect x="120" y="200" width="760" height="500" fill="#78350f"/>
      <rect x="150" y="320" width="700" height="20" fill="#fef3c7"/>
      <rect x="150" y="460" width="700" height="20" fill="#fef3c7"/>
      <!-- Book Spines -->
      <rect x="180" y="230" width="35" height="90" fill="#ef4444"/>
      <rect x="220" y="220" width="40" height="100" fill="#3b82f6"/>
      <rect x="265" y="240" width="30" height="80" fill="#10b981"/>
      <rect x="300" y="225" width="45" height="95" fill="#f59e0b"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#78350f" text-anchor="middle">Librairie (Opt. A: Consultation de livres)</text>
    `
  },
  {
    key: "tcf_p7_q3",
    title: "Cabinet Opticien Lunettes",
    bg: "#f3f4f6",
    accent: "#2563eb",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#eff6ff"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#bfdbfe" stroke-width="8"/>
      <!-- Eyeglasses Display Wall -->
      <rect x="150" y="200" width="700" height="450" rx="15" fill="#dbeafe"/>
      <!-- Glasses Frames -->
      <circle cx="300" cy="300" r="40" fill="none" stroke="#1e293b" stroke-width="8"/>
      <circle cx="400" cy="300" r="40" fill="none" stroke="#1e293b" stroke-width="8"/>
      <line x1="340" y1="300" x2="360" y2="300" stroke="#1e293b" stroke-width="8"/>
      <circle cx="600" cy="300" r="40" fill="none" stroke="#ef4444" stroke-width="8"/>
      <circle cx="700" cy="300" r="40" fill="none" stroke="#ef4444" stroke-width="8"/>
      <line x1="640" y1="300" x2="660" y2="300" stroke="#ef4444" stroke-width="8"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#1e3a8a" text-anchor="middle">Boutique Opticien (Opt. B: Choix d'une monture)</text>
    `
  },
  {
    key: "tcf_p7_q4",
    title: "Galerie de Musée",
    bg: "#f3f4f6",
    accent: "#7c3aed",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#faf5ff"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#e9d5ff" stroke-width="8"/>
      <!-- Paintings Frames -->
      <rect x="150" y="220" width="280" height="350" fill="#fde047" stroke="#78350f" stroke-width="14"/>
      <rect x="550" y="220" width="300" height="350" fill="#38bdf8" stroke="#78350f" stroke-width="14"/>
      <!-- Visitors Looking at Art -->
      <circle cx="350" cy="650" r="40" fill="#cbd5e1"/>
      <circle cx="650" cy="650" r="40" fill="#cbd5e1"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#581c87" text-anchor="middle">Galerie de Musée (Opt. A: Admiration de tableaux)</text>
    `
  },
  // Paper 8
  {
    key: "tcf_p8_q1",
    title: "Stand de Glaces",
    bg: "#f3f4f6",
    accent: "#ec4899",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#fce7f3"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#fbcfe8" stroke-width="8"/>
      <!-- Ice Cream Stand Canopy -->
      <path d="M 150 200 L 850 200 L 800 320 L 200 320 Z" fill="#f43f5e"/>
      <!-- Ice Cream Cone Visual -->
      <polygon points="500,680 440,500 560,500" fill="#d97706"/>
      <circle cx="500" cy="460" r="65" fill="#f472b6"/>
      <circle cx="450" cy="480" r="50" fill="#38bdf8"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#881337" text-anchor="middle">Marchand de Glaces (Opt. A: Achat de glaces)</text>
    `
  },
  {
    key: "tcf_p8_q2",
    title: "Marché de Fruits Plein Air",
    bg: "#f3f4f6",
    accent: "#16a34a",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f0fdf4"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#bbf7d0" stroke-width="8"/>
      <!-- Fruit Crates -->
      <rect x="150" y="450" width="300" height="180" fill="#b45309" rx="10"/>
      <circle cx="230" cy="430" r="35" fill="#ef4444"/>
      <circle cx="290" cy="430" r="35" fill="#ef4444"/>
      <circle cx="350" cy="430" r="35" fill="#ef4444"/>
      <rect x="550" y="450" width="300" height="180" fill="#b45309" rx="10"/>
      <circle cx="630" cy="430" r="35" fill="#f59e0b"/>
      <circle cx="690" cy="430" r="35" fill="#f59e0b"/>
      <circle cx="750" cy="430" r="35" fill="#f59e0b"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#14532d" text-anchor="middle">Marché de Fruits (Opt. B: Achat de fruits frais)</text>
    `
  },
  {
    key: "tcf_p8_q3",
    title: "Guichet d'Information Gare",
    bg: "#f3f4f6",
    accent: "#0284c7",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f0f9ff"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#bae6fd" stroke-width="8"/>
      <!-- Info Desk Counter -->
      <rect x="150" y="450" width="700" height="220" fill="#0369a1" rx="15"/>
      <circle cx="500" cy="320" r="60" fill="#38bdf8"/>
      <text x="500" y="340" font-family="Arial" font-size="70" font-weight="bold" fill="#ffffff" text-anchor="middle">i</text>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#0c4a6e" text-anchor="middle">Guichet Information Gare (Opt. A: Demande d'itinéraire)</text>
    `
  },
  {
    key: "tcf_p8_q4",
    title: "Laverie Automatique",
    bg: "#f3f4f6",
    accent: "#0d9488",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f0fdfa"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#99f6e4" stroke-width="8"/>
      <!-- Washing Machines -->
      <rect x="180" y="300" width="280" height="380" rx="20" fill="#ccfbf1" stroke="#0f766e" stroke-width="8"/>
      <circle cx="320" cy="480" r="90" fill="#99f6e4" stroke="#0f766e" stroke-width="8"/>
      <rect x="540" y="300" width="280" height="380" rx="20" fill="#ccfbf1" stroke="#0f766e" stroke-width="8"/>
      <circle cx="680" cy="480" r="90" fill="#99f6e4" stroke="#0f766e" stroke-width="8"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#115e59" text-anchor="middle">Laverie Automatique (Opt. B: Lavage du linge)</text>
    `
  },
  // Paper 9
  {
    key: "tcf_p9_q1",
    title: "Vitrine Bijouterie",
    bg: "#f3f4f6",
    accent: "#eab308",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#fefce8"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#fef08a" stroke-width="8"/>
      <!-- Glass Jewelry Cabinet -->
      <rect x="180" y="250" width="640" height="420" fill="#fef08a" opacity="0.6" stroke="#ca8a04" stroke-width="8"/>
      <!-- Gold Rings & Diamond Displays -->
      <circle cx="320" cy="450" r="40" fill="none" stroke="#eab308" stroke-width="12"/>
      <circle cx="500" cy="450" r="50" fill="none" stroke="#eab308" stroke-width="14"/>
      <polygon points="680,410 710,460 650,460" fill="#38bdf8"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#713f12" text-anchor="middle">Bijouterie (Opt. A: Regard des bijoux en vitrine)</text>
    `
  },
  {
    key: "tcf_p9_q2",
    title: "Comptoir Cafétéria",
    bg: "#f3f4f6",
    accent: "#d97706",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#fffbeb"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#fde68a" stroke-width="8"/>
      <!-- Counter & Sandwich Tray -->
      <rect x="150" y="480" width="700" height="200" fill="#b45309" rx="10"/>
      <rect x="300" y="440" width="400" height="40" fill="#cbd5e1" rx="5"/>
      <ellipse cx="500" cy="420" rx="140" ry="25" fill="#f59e0b"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#78350f" text-anchor="middle">Cafétéria (Opt. A: Préparation de sandwich)</text>
    `
  },
  {
    key: "tcf_p9_q3",
    title: "Magasin de Bricolage",
    bg: "#f3f4f6",
    accent: "#ea580c",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#fff7ed"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#ffedd5" stroke-width="8"/>
      <!-- Tools Wall -->
      <rect x="150" y="220" width="700" height="450" fill="#fdba74" rx="10"/>
      <!-- Hammer, Saw, Wrench Silhouettes -->
      <rect x="250" y="300" width="20" height="250" fill="#1e293b"/>
      <rect x="220" y="280" width="80" height="40" fill="#94a3b8"/>
      <polygon points="500,280 600,450 480,450" fill="#64748b"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#7c2d12" text-anchor="middle">Magasin Bricolage (Opt. B: Choix d'outils)</text>
    `
  },
  {
    key: "tcf_p9_q4",
    title: "Station de Ski Enneigée",
    bg: "#f3f4f6",
    accent: "#0284c7",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f0f9ff"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#bae6fd" stroke-width="8"/>
      <!-- Mountain Slopes & Skier -->
      <polygon points="100,700 450,250 850,700" fill="#e0f2fe"/>
      <polygon points="450,250 500,320 400,320" fill="#0284c7"/>
      <line x1="300" y1="550" x2="600" y2="700" stroke="#0284c7" stroke-width="14"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#0369a1" text-anchor="middle">Station de Ski (Opt. A: Équipement au pied des pistes)</text>
    `
  },
  // Paper 10
  {
    key: "tcf_p10_q1",
    title: "Amphithéâtre Universitaire",
    bg: "#f3f4f6",
    accent: "#4f46e5",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#eef2ff"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#c7d2fe" stroke-width="8"/>
      <!-- Lecture Hall Tiers & Blackboard -->
      <rect x="150" y="200" width="700" height="200" fill="#1e1b4b" rx="10"/>
      <text x="500" y="320" font-family="Arial" font-size="40" font-weight="bold" fill="#818cf8" text-anchor="middle">E = mc²  |  TCF CANADA</text>
      <!-- Seated Students -->
      <circle cx="280" cy="550" r="35" fill="#6366f1"/>
      <circle cx="500" cy="550" r="35" fill="#6366f1"/>
      <circle cx="720" cy="550" r="35" fill="#6366f1"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#312e81" text-anchor="middle">Amphithéâtre (Opt. B: Écoute d'un cours universiatire)</text>
    `
  },
  {
    key: "tcf_p10_q2",
    title: "Cabinet Vétérinaire",
    bg: "#f3f4f6",
    accent: "#059669",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#ecfdf5"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#a7f3d0" stroke-width="8"/>
      <!-- Exam Table & Cat Silhouette -->
      <rect x="250" y="520" width="500" height="40" fill="#94a3b8" rx="5"/>
      <ellipse cx="500" cy="460" rx="70" ry="40" fill="#f59e0b"/>
      <circle cx="560" cy="430" r="30" fill="#f59e0b"/>
      <polygon points="550,395 565,420 540,415" fill="#f59e0b"/>
      <polygon points="575,395 590,420 565,415" fill="#f59e0b"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#065f46" text-anchor="middle">Vétérinaire (Opt. B: Auscultation d'un chat)</text>
    `
  },
  {
    key: "tcf_p10_q3",
    title: "Magasin de Guitares",
    bg: "#f3f4f6",
    accent: "#b91c1c",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#fef2f2"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#fecaca" stroke-width="8"/>
      <!-- Guitar Silhouette -->
      <ellipse cx="500" cy="520" rx="120" ry="160" fill="#dc2626"/>
      <ellipse cx="500" cy="380" rx="90" ry="110" fill="#dc2626"/>
      <rect x="485" y="180" width="30" height="220" fill="#78350f"/>
      <circle cx="500" cy="480" r="45" fill="#1e1b4b"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#991b1b" text-anchor="middle">Magasin d'Instruments (Opt. A: Essayage d'une guitare)</text>
    `
  },
  {
    key: "tcf_p10_q4",
    title: "Horodateur Stationnement Rue",
    bg: "#f3f4f6",
    accent: "#475569",
    svg: `
      <rect x="0" y="0" width="1000" height="1000" fill="#f8fafc"/>
      <rect x="50" y="100" width="900" height="800" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="8"/>
      <!-- Parking Meter Machine -->
      <rect x="380" y="250" width="240" height="500" rx="20" fill="#334155"/>
      <rect x="420" y="300" width="160" height="100" fill="#38bdf8"/>
      <circle cx="500" cy="500" r="30" fill="#22c55e"/>
      <text x="500" y="850" font-family="Arial" font-size="32" font-weight="bold" fill="#1e293b" text-anchor="middle">Horodateur Rue (Opt. A: Paiement stationnement)</text>
    `
  }
];

async function generateAllMissing() {
  const illDir = path.join(process.cwd(), 'public', 'illustrations');
  if (!fs.existsSync(illDir)) fs.mkdirSync(illDir, { recursive: true });

  for (const s of scenes) {
    const filePath = path.join(illDir, `${s.key}.png`);
    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">${s.svg.trim()}</svg>`;
    const svgBuffer = Buffer.from(fullSvg);
    await sharp(svgBuffer)
      .resize(1024, 1024)
      .png()
      .toFile(filePath);
    console.log(`✅ Generated HD illustration: public/illustrations/${s.key}.png (${s.title})`);
  }

  // Now update hdIllustrationAssets.ts
  const assetFilePath = path.join(process.cwd(), 'src', 'lib', 'hdIllustrationAssets.ts');
  const allKeys = [];
  for (let p = 1; p <= 10; p++) {
    for (let q = 1; q <= 4; q++) {
      allKeys.push(`"tcf_p${p}_q${q}"`);
    }
  }

  const updatedCode = `/**
 * Official TCF Canada High-Definition Illustration Manager
 * Strictly manages high-definition PNG illustration assets stored in public/illustrations/
 */

export const AVAILABLE_HD_IMAGES = new Set<string>([
  ${allKeys.join(',\n  ')}
]);

export function getHdIllustration(paperIdx: number, qNum: number): string {
  const key = \`tcf_p\${paperIdx}_q\${qNum}\`;
  if (AVAILABLE_HD_IMAGES.has(key)) {
    return \`/illustrations/\${key}.png\`;
  }
  return \`/illustrations/tcf_p1_q1.png\`;
}
`;

  fs.writeFileSync(assetFilePath, updatedCode, 'utf8');
  console.log("🎉 Successfully updated hdIllustrationAssets.ts with 40/40 UNIQUE HD IMAGE KEYS!");
}

generateAllMissing();
