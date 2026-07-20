import { motion } from "framer-motion";

interface SceneProps {
  level: string;
  width?: number;
  height?: number;
}

function Cloud({ x, y, delay, scale = 1 }: { x: number; y: number; delay: number; scale?: number }) {
  return (
    <motion.g initial={{ x: x - 20 }} animate={{ x: [x - 5, x + 5, x - 5] }} transition={{ duration: 8 + delay * 2, repeat: Infinity, ease: "easeInOut" }}>
      <ellipse cx={x} cy={y} rx={18 * scale} ry={8 * scale} fill="white" opacity={0.15} />
      <ellipse cx={x - 10 * scale} cy={y + 2} rx={12 * scale} ry={6 * scale} fill="white" opacity={0.12} />
      <ellipse cx={x + 10 * scale} cy={y + 1} rx={14 * scale} ry={7 * scale} fill="white" opacity={0.12} />
    </motion.g>
  );
}

function Bird({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g initial={{ x, y }} animate={{ x: [x, x + 40, x + 80], y: [y, y - 10, y + 5] }} transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}>
      <path d={`M${0},${0} Q${3},${-4} ${6},${0} Q${9},${-4} ${12},${0}`} fill="none" stroke="white" strokeWidth={1.2} opacity={0.3} />
    </motion.g>
  );
}

function Tree({ x, y, scale = 1, color = "#2d5a27" }: { x: number; y: number; scale?: number; color?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x={-2} y={0} width={4} height={12} fill="#5D4037" rx={1} />
      <ellipse cx={0} cy={-4} rx={10} ry={12} fill={color} />
      <ellipse cx={-4} cy={-2} rx={7} ry={9} fill={color} opacity={0.8} />
    </g>
  );
}

function Lantern({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-1} y={0} width={2} height={8} fill="#5D4037" />
      <rect x={-3} y={8} width={6} height={6} fill="#FFB300" rx={2} />
      <motion.ellipse cx={0} cy={11} rx={5} ry={4} fill="#FFB300" opacity={0.3}
        animate={{ opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
    </g>
  );
}

function Flower({ x, y, color = "#E91E63" }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={0} r={2} fill={color} />
      <circle cx={-2} cy={-1} r={1.5} fill={color} opacity={0.7} />
      <circle cx={2} cy={-1} r={1.5} fill={color} opacity={0.7} />
      <circle cx={0} cy={-2.5} r={1.5} fill={color} opacity={0.7} />
      <rect x={-0.5} y={2} width={1} height={4} fill="#4CAF50" />
    </g>
  );
}

function Butterfly({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g initial={{ x, y }} animate={{ x: [x, x + 15, x - 5, x + 10], y: [y, y - 8, y + 3, y - 5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}>
      <motion.path d="M0,0 Q-4,-6 -2,-10 Q0,-6 0,0" fill="#E91E63" opacity={0.6}
        animate={{ d: ["M0,0 Q-4,-6 -2,-10 Q0,-6 0,0", "M0,0 Q-3,-4 -1,-7 Q0,-4 0,0", "M0,0 Q-4,-6 -2,-10 Q0,-6 0,0"] }}
        transition={{ duration: 0.3, repeat: Infinity }} />
      <motion.path d="M0,0 Q4,-6 2,-10 Q0,-6 0,0" fill="#E91E63" opacity={0.6}
        animate={{ d: ["M0,0 Q4,-6 2,-10 Q0,-6 0,0", "M0,0 Q3,-4 1,-7 Q0,-4 0,0", "M0,0 Q4,-6 2,-10 Q0,-6 0,0"] }}
        transition={{ duration: 0.3, repeat: Infinity }} />
    </motion.g>
  );
}

function Leaf({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.g initial={{ x, y, rotate: 0 }} animate={{ x: [x, x + 20, x + 40], y: [y, y + 30, y + 60], rotate: [0, 180, 360] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }} opacity={0.4}>
      <ellipse cx={0} cy={0} rx={3} ry={1.5} fill="#8BC34A" />
    </motion.g>
  );
}

function Water({ x, y, width }: { x: number; y: number; width: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={8} fill="#1565C0" opacity={0.3} rx={4} />
      <motion.path d={`M${x},${y + 4} Q${x + width / 4},${y + 2} ${x + width / 2},${y + 4} Q${x + width * 3 / 4},${y + 6} ${x + width},${y + 4}`}
        fill="none" stroke="#42A5F5" strokeWidth={1} opacity={0.4}
        animate={{ d: [`M${x},${y + 4} Q${x + width / 4},${y + 2} ${x + width / 2},${y + 4} Q${x + width * 3 / 4},${y + 6} ${x + width},${y + 4}`, `M${x},${y + 4} Q${x + width / 4},${y + 6} ${x + width / 2},${y + 4} Q${x + width * 3 / 4},${y + 2} ${x + width},${y + 4}`] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    </g>
  );
}

export function CefrScene({ level, width = 400, height = 160 }: SceneProps) {
  const scenes: Record<string, React.ReactNode> = {
    A1: (
      <g>
        {/* Sky */}
        <defs>
          <linearGradient id="sky-a1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E8F5E9" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-a1)" />
        {/* Hills */}
        <ellipse cx={width * 0.3} cy={height + 10} rx={120} ry={50} fill="#66BB6A" opacity={0.4} />
        <ellipse cx={width * 0.7} cy={height + 5} rx={100} ry={45} fill="#4CAF50" opacity={0.3} />
        {/* Ground */}
        <rect x={0} y={height - 30} width={width} height={30} fill="#8BC34A" opacity={0.5} />
        {/* Houses */}
        <rect x={40} y={height - 65} width={25} height={30} fill="#FFCC80" rx={2} />
        <polygon points="40,65 52.5,48 65,65" fill="#D84315" />
        <rect x={47} y={height - 52} width={8} height={12} fill="#5D4037" />
        <rect x={43} y={height - 60} width={5} height={5} fill="#90CAF9" opacity={0.7} />
        <rect x={55} y={height - 60} width={5} height={5} fill="#90CAF9" opacity={0.7} />
        <rect x={100} y={height - 55} width={20} height={25} fill="#FFAB91" rx={2} />
        <polygon points="100,55 110,42 120,55" fill="#BF360C" />
        <rect x={106} y={height - 45} width={7} height={10} fill="#5D4037" />
        <Tree x={160} y={height - 40} scale={0.8} />
        <Tree x={180} y={height - 35} scale={0.6} color="#388E3C" />
        <Flower x={70} y={height - 32} />
        <Flower x={85} y={height - 30} color="#FF9800" />
        <Flower x={140} y={height - 31} color="#9C27B0" />
        {/* Path */}
        <path d={`M0,${height - 15} Q${width * 0.25},${height - 25} ${width * 0.5},${height - 15} Q${width * 0.75},${height - 5} ${width},${height - 15}`} fill="none" stroke="#BCAAA4" strokeWidth={6} opacity={0.5} strokeLinecap="round" />
        <Cloud x={60} y={25} delay={0} />
        <Cloud x={200} y={18} delay={1} scale={0.7} />
        <Bird x={280} y={30} delay={0} />
        <Bird x={320} y={22} delay={1.5} />
        <Lantern x={130} y={height - 65} />
      </g>
    ),
    A2: (
      <g>
        <defs>
          <linearGradient id="sky-a2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB74D" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#FFF8E1" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-a2)" />
        <ellipse cx={width * 0.2} cy={height + 8} rx={90} ry={40} fill="#66BB6A" opacity={0.3} />
        <rect x={0} y={height - 28} width={width} height={28} fill="#A5D6A7" opacity={0.4} />
        {/* Market stalls */}
        <rect x={30} y={height - 60} width={30} height={28} fill="#FFF9C4" rx={2} />
        <rect x={28} y={height - 65} width={34} height={5} fill="#F44336" />
        <rect x={90} y={height - 55} width={25} height={25} fill="#FFECB3" rx={2} />
        <rect x={88} y={height - 59} width={29} height={4} fill="#4CAF50" />
        <rect x={150} y={height - 58} width={28} height={26} fill="#E1BEE7" rx={2} />
        <rect x={148} y={height - 62} width={32} height={4} fill="#FF9800" />
        {/* Fruits on stalls */}
        <circle cx={40} cy={height - 50} r={3} fill="#F44336" />
        <circle cx={48} cy={height - 48} r={2.5} fill="#FF9800" />
        <circle cx={55} cy={height - 50} r={2} fill="#FFEB3B" />
        <Tree x={210} y={height - 38} scale={0.9} />
        <Tree x={240} y={height - 33} scale={0.7} color="#2E7D32" />
        <Flower x={75} y={height - 30} color="#E91E63" />
        <Flower x={130} y={height - 29} />
        <Flower x={190} y={height - 31} color="#FF5722" />
        <path d={`M0,${height - 12} Q${width * 0.3},${height - 20} ${width * 0.5},${height - 12} Q${width * 0.7},${height - 4} ${width},${height - 12}`} fill="none" stroke="#D7CCC8" strokeWidth={7} opacity={0.5} strokeLinecap="round" />
        <Cloud x={100} y={20} delay={0.5} />
        <Cloud x={280} y={15} delay={1.5} scale={0.6} />
        <Butterfly x={180} y={50} delay={0} />
        <Butterfly x={260} y={40} delay={1} />
        <Lantern x={70} y={height - 62} />
        <Lantern x={170} y={height - 60} />
      </g>
    ),
    B1: (
      <g>
        <defs>
          <linearGradient id="sky-b1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5C6BC0" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#E8EAF6" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-b1)" />
        <rect x={0} y={height - 25} width={width} height={25} fill="#9E9E9E" opacity={0.3} />
        {/* Buildings */}
        <rect x={20} y={height - 80} width={35} height={55} fill="#ECEFF1" rx={2} />
        <rect x={25} y={height - 75} width={8} height={8} fill="#90CAF9" />
        <rect x={38} y={height - 75} width={8} height={8} fill="#90CAF9" />
        <rect x={25} y={height - 63} width={8} height={8} fill="#90CAF9" />
        <rect x={38} y={height - 63} width={8} height={8} fill="#90CAF9" />
        <rect x={65} y={height - 70} width={30} height={45} fill="#FFCCBC" rx={2} />
        <rect x={70} y={height - 65} width={7} height={7} fill="#FFAB91" />
        <rect x={82} y={height - 65} width={7} height={7} fill="#FFAB91" />
        {/* Café */}
        <rect x={110} y={height - 55} width={40} height={30} fill="#FFF3E0" rx={2} />
        <rect x={108} y={height - 60} width={44} height={5} fill="#5D4037" />
        <text x={130} y={height - 48} textAnchor="middle" fontSize={5} fill="#5D4037" fontWeight="bold">CAFÉ</text>
        <rect x={115} y={height - 42} width={10} height={12} fill="#4E342E" rx={1} />
        {/* Tables */}
        <rect x={160} y={height - 38} width={8} height={1} fill="#8D6E63" />
        <rect x={163} y={height - 37} width={2} height={8} fill="#8D6E63" />
        <circle cx={168} cy={height - 38} r={3} fill="#FFF9C4" opacity={0.5} />
        <Tree x={220} y={height - 35} scale={0.8} />
        <Tree x={250} y={height - 30} scale={0.6} />
        <path d={`M0,${height - 10} L${width},${height - 10}`} fill="none" stroke="#BDBDBD" strokeWidth={3} opacity={0.4} />
        <Water x={280} y={height - 20} width={80} />
        <Cloud x={80} y={18} delay={0} />
        <Cloud x={300} y={22} delay={1} scale={0.8} />
        <Bird x={160} y={25} delay={0.5} />
        <Lantern x={60} y={height - 75} />
        <Lantern x={155} y={height - 58} />
        <Lantern x={240} y={height - 40} />
        <Leaf x={180} y={40} delay={0} />
        <Leaf x={250} y={35} delay={1} />
      </g>
    ),
    B2: (
      <g>
        <defs>
          <linearGradient id="sky-b2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7E57C2" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#F3E5F5" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-b2)" />
        <rect x={0} y={height - 22} width={width} height={22} fill="#BCAAA4" opacity={0.3} />
        {/* Eiffel Tower */}
        <polygon points={`${width * 0.5},${height - 90} ${width * 0.5 - 12},${height - 25} ${width * 0.5 + 12},${height - 25}`} fill="#5D4037" opacity={0.6} />
        <rect x={width * 0.5 - 8} y={height - 55} width={16} height={3} fill="#5D4037" opacity={0.5} />
        <rect x={width * 0.5 - 5} y={height - 70} width={10} height={2} fill="#5D4037" opacity={0.5} />
        <line x1={width * 0.5} y1={height - 90} x2={width * 0.5} y2={height - 95} stroke="#FFB300" strokeWidth={2} />
        <motion.circle cx={width * 0.5} cy={height - 95} r={2} fill="#FFB300" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
        {/* Buildings */}
        <rect x={30} y={height - 60} width={25} height={35} fill="#E8EAF6" rx={2} />
        <rect x={60} y={height - 55} width={20} height={30} fill="#FCE4EC" rx={2} />
        <rect x={width - 60} y={height - 58} width={25} height={33} fill="#E8EAF6" rx={2} />
        <rect x={width - 30} y={height - 50} width={20} height={25} fill="#FFF3E0" rx={2} />
        <path d={`M0,${height - 8} Q${width * 0.25},${height - 15} ${width * 0.5},${height - 8} Q${width * 0.75},${height - 1} ${width},${height - 8}`} fill="none" stroke="#D7CCC8" strokeWidth={5} opacity={0.5} strokeLinecap="round" />
        <Water x={0} y={height - 18} width={width} />
        <Cloud x={70} y={15} delay={0} />
        <Cloud x={250} y={20} delay={1.5} scale={0.7} />
        <Bird x={120} y={20} delay={0} />
        <Bird x={300} y={28} delay={1} />
        <Lantern x={80} y={height - 62} />
        <Lantern x={width - 45} y={height - 55} />
        <Butterfly x={150} y={45} delay={0} />
        <Flower x={100} y={height - 24} color="#E91E63" />
        <Flower x={width - 80} y={height - 24} />
      </g>
    ),
    C1: (
      <g>
        <defs>
          <linearGradient id="sky-c1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF7043" stopOpacity={0.5} />
            <stop offset="40%" stopColor="#AB47BC" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#1A237E" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-c1)" />
        <rect x={0} y={height - 20} width={width} height={20} fill="#37474F" opacity={0.3} />
        {/* Skyline */}
        <rect x={20} y={height - 65} width={15} height={40} fill="#455A64" opacity={0.5} />
        <rect x={40} y={height - 75} width={12} height={50} fill="#546E7A" opacity={0.4} />
        <rect x={58} y={height - 55} width={18} height={30} fill="#455A64" opacity={0.5} />
        <rect x={width - 80} y={height - 70} width={14} height={45} fill="#546E7A" opacity={0.4} />
        <rect x={width - 60} y={height - 60} width={20} height={35} fill="#455A64" opacity={0.5} />
        <rect x={width - 35} y={height - 50} width={15} height={25} fill="#607D8B" opacity={0.4} />
        {/* Dome */}
        <ellipse cx={width * 0.5} cy={height - 50} rx={30} ry={15} fill="#78909C" opacity={0.4} />
        <rect x={width * 0.5 - 2} y={height - 65} width={4} height={15} fill="#FFB300" opacity={0.6} />
        {/* Sun */}
        <motion.circle cx={width - 40} cy={30} r={15} fill="#FF7043" opacity={0.6}
          animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity }} />
        <path d={`M0,${height - 8} Q${width * 0.3},${height - 14} ${width * 0.5},${height - 8} Q${width * 0.7},${height - 2} ${width},${height - 8}`} fill="none" stroke="#90A4AE" strokeWidth={4} opacity={0.4} strokeLinecap="round" />
        <Water x={0} y={height - 16} width={width} />
        <Cloud x={60} y={20} delay={0} />
        <Cloud x={200} y={15} delay={1} scale={0.6} />
        <Bird x={150} y={18} delay={0} />
        <Lantern x={100} y={height - 60} />
        <Lantern x={width - 50} y={height - 55} />
        <Leaf x={180} y={30} delay={0} />
        <Leaf x={300} y={25} delay={1.5} />
      </g>
    ),
    C2: (
      <g>
        <defs>
          <linearGradient id="sky-c2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A237E" stopOpacity={0.6} />
            <stop offset="50%" stopColor="#4A148C" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#FF6F00" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-c2)" />
        <rect x={0} y={height - 18} width={width} height={18} fill="#263238" opacity={0.4} />
        {/* Grand buildings */}
        <rect x={30} y={height - 70} width={40} height={45} fill="#37474F" opacity={0.5} rx={3} />
        <rect x={35} y={height - 65} width={8} height={8} fill="#FFD54F" opacity={0.4} />
        <rect x={50} y={height - 65} width={8} height={8} fill="#FFD54F" opacity={0.4} />
        <rect x={35} y={height - 53} width={8} height={8} fill="#FFD54F" opacity={0.4} />
        <rect x={50} y={height - 53} width={8} height={8} fill="#FFD54F" opacity={0.4} />
        <rect x={width - 80} y={height - 65} width={35} height={40} fill="#455A64" opacity={0.5} rx={3} />
        <rect x={width - 75} y={height - 60} width={7} height={7} fill="#FFD54F" opacity={0.4} />
        <rect x={width - 63} y={height - 60} width={7} height={7} fill="#FFD54F" opacity={0.4} />
        {/* Triumphal arch */}
        <rect x={width * 0.4} y={height - 55} width={40} height={30} fill="#546E7A" opacity={0.5} rx={2} />
        <ellipse cx={width * 0.5} cy={height - 30} rx={12} ry={15} fill="#37474F" opacity={0.4} />
        {/* Fireworks */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.6 }}>
            <circle cx={60 + i * 70} cy={20 + (i % 3) * 10} r={3} fill={["#FFD54F", "#FF7043", "#AB47BC", "#42A5F5", "#66BB6A"][i]} />
            <circle cx={60 + i * 70 - 5} cy={15 + (i % 3) * 10} r={1.5} fill={["#FF7043", "#AB47BC", "#FFD54F", "#66BB6A", "#42A5F5"][i]} />
            <circle cx={60 + i * 70 + 5} cy={25 + (i % 3) * 10} r={1.5} fill={["#AB47BC", "#FFD54F", "#66BB6A", "#FF7043", "#42A5F5"][i]} />
          </motion.g>
        ))}
        <path d={`M0,${height - 6} Q${width * 0.25},${height - 12} ${width * 0.5},${height - 6} Q${width * 0.75},${height} ${width},${height - 6}`} fill="none" stroke="#78909C" strokeWidth={4} opacity={0.4} strokeLinecap="round" />
        <Water x={0} y={height - 14} width={width} />
        <Cloud x={100} y={18} delay={0} />
        <Cloud x={300} y={12} delay={1} scale={0.5} />
        <Lantern x={80} y={height - 62} />
        <Lantern x={width - 50} y={height - 58} />
        <Lantern x={width * 0.5} y={height - 58} />
      </g>
    ),
  };

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      {scenes[level] || scenes.A1}
    </svg>
  );
}
