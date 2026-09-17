import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "public", "illustrations", "tef");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Q4: Atelier de réparation de vélos (Bicycle Repair Workshop)
const svgQ4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f4f5f7"/>
      <stop offset="100%" stop-color="#e2e6ea"/>
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#374151"/>
      <stop offset="100%" stop-color="#1f2937"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" fill="url(#wall)"/>
  <rect y="420" width="800" height="180" fill="url(#floor)"/>
  
  <!-- Tool Pegboard in Background -->
  <rect x="50" y="40" width="300" height="200" rx="8" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
  <text x="65" y="70" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#4b5563">ATELIER CYCLE • OUTILLAGE</text>
  <!-- Wrench, pliers, spanners on wall -->
  <path d="M80,90 L80,180 M95,90 L95,160 M110,90 L110,190 M140,110 L180,110" stroke="#6b7280" stroke-width="6" stroke-linecap="round"/>
  <!-- Spare bike wheels hanging -->
  <circle cx="280" cy="130" r="45" fill="none" stroke="#4b5563" stroke-width="5"/>
  <circle cx="280" cy="130" r="8" fill="#4b5563"/>
  <line x1="280" y1="85" x2="280" y2="175" stroke="#9ca3af" stroke-width="2"/>
  <line x1="235" y1="130" x2="325" y2="130" stroke="#9ca3af" stroke-width="2"/>

  <!-- Workshop Stand with Bicycle -->
  <rect x="420" y="200" width="20" height="250" fill="#1e293b"/>
  <rect x="380" y="430" width="100" height="20" rx="4" fill="#0f172a"/>
  
  <!-- Bicycle Frame Mounted on Stand -->
  <circle cx="360" cy="320" r="55" fill="none" stroke="#2563eb" stroke-width="6"/>
  <circle cx="560" cy="320" r="55" fill="none" stroke="#2563eb" stroke-width="6"/>
  <polyline points="360,320 440,320 520,250 440,250 360,320" fill="none" stroke="#1d4ed8" stroke-width="7" stroke-linejoin="round"/>
  <line x1="440" y1="250" x2="440" y2="320" stroke="#1d4ed8" stroke-width="7"/>
  <line x1="520" y1="250" x2="560" y2="320" stroke="#1d4ed8" stroke-width="7"/>
  <!-- Handlebars and Seat -->
  <line x1="520" y1="250" x2="510" y2="210" stroke="#111827" stroke-width="6"/>
  <line x1="490" y1="210" x2="530" y2="210" stroke="#111827" stroke-width="8" stroke-linecap="round"/>
  <path d="M425,230 L455,230" stroke="#111827" stroke-width="10" stroke-linecap="round"/>

  <!-- Mechanic (Right) pointing to rear brake -->
  <g transform="translate(480, 220)">
    <circle cx="70" cy="50" r="30" fill="#fbcfe8"/> <!-- Head -->
    <path d="M40,40 Q70,10 100,40" fill="#374151"/> <!-- Hair -->
    <rect x="35" y="80" width="70" height="150" rx="10" fill="#1e3a8a"/> <!-- Overalls -->
    <text x="70" y="140" font-family="system-ui, sans-serif" font-size="12" fill="#93c5fd" text-anchor="middle" font-weight="bold">SERVICE</text>
    <!-- Arm holding tool near rear brake -->
    <line x1="35" y1="100" x2="-80" y2="95" stroke="#fbcfe8" stroke-width="16" stroke-linecap="round"/>
    <rect x="-95" y="85" width="20" height="20" rx="2" fill="#e11d48"/> <!-- Tool -->
  </g>

  <!-- Cyclist Customer (Left) -->
  <g transform="translate(180, 220)">
    <circle cx="50" cy="50" r="30" fill="#fed7aa"/> <!-- Head -->
    <path d="M20,45 Q50,15 80,45" fill="#1f2937"/> <!-- Hair -->
    <rect x="20" y="80" width="60" height="140" rx="8" fill="#047857"/> <!-- Green commuter jacket -->
    <!-- Arm pointing toward brake -->
    <line x1="70" y1="100" x2="160" y2="100" stroke="#fed7aa" stroke-width="14" stroke-linecap="round"/>
  </g>

  <!-- Label Badge -->
  <rect x="250" y="520" width="300" height="50" rx="25" fill="rgba(15, 23, 42, 0.85)"/>
  <text x="400" y="552" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">ATELIER CYCLE : RÉPARATION DE FREIN</text>
</svg>`;

// 2. Q35: Graphique Télétravail (2019-2025)
const svgQ35 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <rect width="800" height="550" fill="#ffffff"/>
  <!-- Title Header -->
  <rect x="0" y="0" width="800" height="70" fill="#0f172a"/>
  <text x="400" y="42" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">BAROMÈTRE DE L'EMPLOI : PART DU TÉLÉTRAVAIL HYBRIDE</text>
  
  <!-- Graph Frame -->
  <g transform="translate(100, 110)">
    <!-- Y Axis Grid & Labels -->
    <line x1="0" y1="0" x2="620" y2="0" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="-20" y="5" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="end">70%</text>

    <line x1="0" y1="50" x2="620" y2="50" stroke="#fca5a5" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="-20" y="55" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#ef4444" text-anchor="end">65%</text>
    <text x="130" y="40" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ef4444">Pic d'urgence (2020) : 65%</text>

    <line x1="0" y1="165" x2="620" y2="165" stroke="#60a5fa" stroke-width="2.5"/>
    <text x="-20" y="170" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#2563eb" text-anchor="end">42%</text>
    <rect x="360" y="135" width="250" height="26" rx="6" fill="#dbeafe"/>
    <text x="485" y="153" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#1e40af" text-anchor="middle">🎯 PLATEAU STABILISÉ : 42%</text>

    <line x1="0" y1="270" x2="620" y2="270" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="-20" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="end">20%</text>

    <line x1="0" y1="310" x2="620" y2="310" stroke="#cbd5e1" stroke-width="2"/>
    <text x="-20" y="315" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#475569" text-anchor="end">8%</text>
    <text x="25" y="300" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#475569">2019 : 8%</text>

    <!-- Axes -->
    <line x1="0" y1="0" x2="0" y2="330" stroke="#334155" stroke-width="3"/>
    <line x1="0" y1="330" x2="620" y2="330" stroke="#334155" stroke-width="3"/>

    <!-- Data Line Curve -->
    <!-- 2019 (0, 310) -> 2020 (100, 50) -> 2021 (200, 115) -> 2022 (300, 150) -> 2023 (400, 165) -> 2024 (500, 165) -> 2025 (600, 165) -->
    <path d="M 0,310 L 100,50 L 200,115 L 300,150 L 400,165 L 500,165 L 600,165" fill="none" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Data Points -->
    <circle cx="0" cy="310" r="7" fill="#1e293b"/>
    <circle cx="100" cy="50" r="8" fill="#ef4444"/>
    <circle cx="200" cy="115" r="7" fill="#2563eb"/>
    <circle cx="300" cy="150" r="7" fill="#2563eb"/>
    <circle cx="400" cy="165" r="9" fill="#2563eb"/>
    <circle cx="500" cy="165" r="9" fill="#2563eb"/>
    <circle cx="600" cy="165" r="9" fill="#2563eb"/>

    <!-- X Axis Labels -->
    <text x="0" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">2019</text>
    <text x="100" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">2020</text>
    <text x="200" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">2021</text>
    <text x="300" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#334155" text-anchor="middle">2022</text>
    <text x="400" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">2023</text>
    <text x="500" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">2024</text>
    <text x="600" y="360" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#1d4ed8" text-anchor="middle">2025</text>
  </g>
</svg>`;

// 3. Q36: Diagramme Circulaire (Répartition Modale des Déplacements)
const svgQ36 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <rect width="800" height="550" fill="#ffffff"/>
  <!-- Header -->
  <rect x="0" y="0" width="800" height="70" fill="#0f172a"/>
  <text x="400" y="42" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">ENQUÊTE MOBILITÉ URBAINE : PARTS MODALES DES DÉPLACEMENTS</text>

  <!-- Donut / Pie Chart in Center -->
  <g transform="translate(300, 310)">
    <!-- Slice 1: Mobilités Actives (34%) -> 122.4 deg. From 0 to 122.4 -->
    <!-- Path from angle 0 to 122.4deg (r=180) -->
    <path d="M 0,0 L 0,-170 A 170,170 0 0,1 143.4,91.3 Z" fill="#10b981" stroke="#ffffff" stroke-width="4"/>
    <!-- Slice 2: Transports Collectifs (38%) -> 136.8 deg. From 122.4 to 259.2 -->
    <path d="M 0,0 L 143.4,91.3 A 170,170 0 0,1 -167.1,-31.8 Z" fill="#3b82f6" stroke="#ffffff" stroke-width="4"/>
    <!-- Slice 3: Voiture Solo (28%) -> 100.8 deg. From 259.2 to 360 -->
    <path d="M 0,0 L -167.1,-31.8 A 170,170 0 0,1 0,-170 Z" fill="#94a3b8" stroke="#ffffff" stroke-width="4"/>
    <!-- Donut Hole -->
    <circle cx="0" cy="0" r="80" fill="#ffffff"/>
    <text x="0" y="8" font-family="system-ui, sans-serif" font-size="22" font-weight="bold" fill="#0f172a" text-anchor="middle">100%</text>
  </g>

  <!-- Labels on Slices -->
  <text x="390" y="240" font-family="system-ui, sans-serif" font-size="20" font-weight="extrabold" fill="#ffffff">34%</text>
  <text x="260" y="410" font-family="system-ui, sans-serif" font-size="20" font-weight="extrabold" fill="#ffffff">38%</text>
  <text x="200" y="250" font-family="system-ui, sans-serif" font-size="20" font-weight="extrabold" fill="#ffffff">28%</text>

  <!-- Legend Box (Right) -->
  <g transform="translate(540, 170)">
    <!-- Legend 1 -->
    <rect x="0" y="0" width="220" height="70" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <rect x="15" y="15" width="25" height="25" rx="4" fill="#10b981"/>
    <text x="50" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#065f46">Mobilités Actives</text>
    <text x="50" y="52" font-family="system-ui, sans-serif" font-size="14" font-weight="extrabold" fill="#059669">34% (Vélo &amp; Marche)</text>

    <!-- Legend 2 -->
    <rect x="0" y="90" width="220" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
    <rect x="15" y="105" width="25" height="25" rx="4" fill="#3b82f6"/>
    <text x="50" y="122" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#1e40af">Transports Collectifs</text>
    <text x="50" y="142" font-family="system-ui, sans-serif" font-size="14" font-weight="extrabold" fill="#2563eb">38% (Métro, Bus, Train)</text>

    <!-- Legend 3 -->
    <rect x="0" y="180" width="220" height="70" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
    <rect x="15" y="195" width="25" height="25" rx="4" fill="#94a3b8"/>
    <text x="50" y="212" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#334155">Voiture Individuelle</text>
    <text x="50" y="232" font-family="system-ui, sans-serif" font-size="14" font-weight="extrabold" fill="#475569">28% (Conducteurs Solos)</text>
  </g>
</svg>`;

// 4. Q37: Histogramme Taux de Recyclage par Matériau
const svgQ37 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
  <rect width="800" height="550" fill="#ffffff"/>
  <!-- Header -->
  <rect x="0" y="0" width="800" height="70" fill="#0f172a"/>
  <text x="400" y="42" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">FILIÈRE CIRCULAIRE : TAUX COMPARATIF DE RECYCLAGE EFFECTIF</text>

  <g transform="translate(100, 110)">
    <!-- Y Axis Grid -->
    <line x1="0" y1="0" x2="600" y2="0" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="-20" y="5" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="end">100%</text>

    <line x1="0" y1="80" x2="600" y2="80" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="-20" y="85" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="end">75%</text>

    <line x1="0" y1="160" x2="600" y2="160" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="-20" y="165" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="end">50%</text>

    <line x1="0" y1="240" x2="600" y2="240" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="-20" y="245" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#64748b" text-anchor="end">25%</text>

    <!-- Axes -->
    <line x1="0" y1="0" x2="0" y2="320" stroke="#334155" stroke-width="3"/>
    <line x1="0" y1="320" x2="600" y2="320" stroke="#334155" stroke-width="3"/>

    <!-- Bar 1: VERRE (86%) -> Height = 0.86 * 320 = 275.2 -> Y = 320 - 275.2 = 44.8 -->
    <rect x="70" y="45" width="100" height="275" rx="6" fill="#10b981"/>
    <text x="120" y="30" font-family="system-ui, sans-serif" font-size="22" font-weight="extrabold" fill="#047857" text-anchor="middle">86%</text>
    <text x="120" y="350" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">VERRE</text>
    <text x="120" y="375" font-family="system-ui, sans-serif" font-size="13" font-weight="semibold" fill="#059669" text-anchor="middle">(Réemploi exemplaire)</text>

    <!-- Bar 2: CARTON & PAPIER (72%) -> Height = 0.72 * 320 = 230.4 -> Y = 320 - 230.4 = 89.6 -->
    <rect x="250" y="90" width="100" height="230" rx="6" fill="#3b82f6"/>
    <text x="300" y="75" font-family="system-ui, sans-serif" font-size="22" font-weight="extrabold" fill="#1d4ed8" text-anchor="middle">72%</text>
    <text x="300" y="350" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">CARTONS</text>
    <text x="300" y="375" font-family="system-ui, sans-serif" font-size="13" font-weight="semibold" fill="#2563eb" text-anchor="middle">(Filière structurée)</text>

    <!-- Bar 3: PLASTIQUE COMPOSITE (23%) -> Height = 0.23 * 320 = 73.6 -> Y = 320 - 73.6 = 246.4 -->
    <rect x="430" y="246" width="100" height="74" rx="6" fill="#ef4444"/>
    <text x="480" y="232" font-family="system-ui, sans-serif" font-size="22" font-weight="extrabold" fill="#b91c1c" text-anchor="middle">23%</text>
    <text x="480" y="350" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">PLASTIQUES</text>
    <text x="480" y="375" font-family="system-ui, sans-serif" font-size="13" font-weight="semibold" fill="#dc2626" text-anchor="middle">(Faible régénération)</text>
  </g>
</svg>`;

// Write the files to public/illustrations/tef/
fs.writeFileSync(path.join(outDir, "tef_p1_q4.svg"), svgQ4, "utf-8");
fs.writeFileSync(path.join(outDir, "tef_p1_q35.svg"), svgQ35, "utf-8");
fs.writeFileSync(path.join(outDir, "tef_p1_q36.svg"), svgQ36, "utf-8");
fs.writeFileSync(path.join(outDir, "tef_p1_q37.svg"), svgQ37, "utf-8");

// Also make a copy with .png name for universal resolution
fs.writeFileSync(path.join(outDir, "tef_p1_q4.png"), svgQ4, "utf-8");
fs.writeFileSync(path.join(outDir, "tef_p1_q35.png"), svgQ35, "utf-8");
fs.writeFileSync(path.join(outDir, "tef_p1_q36.png"), svgQ36, "utf-8");
fs.writeFileSync(path.join(outDir, "tef_p1_q37.png"), svgQ37, "utf-8");

console.log("Successfully generated all TEF visual illustration assets in public/illustrations/tef/");
