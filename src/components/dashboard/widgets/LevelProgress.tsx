import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SmartAvatar } from "./SmartAvatar";
import type { DashboardData } from "../types";
import { CEFR_ORDER } from "../utils/userPrefs";

function getTimeOfDay(): "morning" | "afternoon" | "evening" | "night" {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

const TIME_BG: Record<string, string> = {
  morning: "/background/morning.png",
  afternoon: "/background/afternoon.png",
  evening: "/background/evening.png",
  night: "/background/night.png",
};

function getLevelStatus(levels: DashboardData["levelProgress"]) {
  const statuses: Record<string, string> = {};
  for (const l of levels) statuses[l.level] = l.status;
  return statuses;
}

function getActiveLevel(levels: DashboardData["levelProgress"]): string {
  const active = levels.find((l) => l.status === "active");
  if (active) return active.level;
  const last = [...levels].reverse().find((l) => l.status === "completed");
  return last ? last.level : "A1";
}

function getActiveData(levels: DashboardData["levelProgress"], level: string) {
  return levels.find((l) => l.level === level);
}

interface LevelProgressProps {
  levels: DashboardData["levelProgress"];
  dark: boolean;
  overall: number;
  avatarUrl?: string;
  avatarFeatures?: DashboardData["user"]["avatarFeatures"];
}

export function LevelProgress({ levels, dark, overall, avatarUrl, avatarFeatures }: LevelProgressProps) {
  const [avatarAnim, setAvatarAnim] = useState<"idle" | "walk" | "celebrate" | "wave" | "chapterComplete" | "moduleComplete">("idle");
  const [timeOfDay] = useState(getTimeOfDay);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [avatarSize, setAvatarSize] = useState(160);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLevel = getActiveLevel(levels);
  const activeData = getActiveData(levels, activeLevel);
  const levelStatuses = useMemo(() => getLevelStatus(levels), [levels]);
  const activeIndex = CEFR_ORDER.indexOf(activeLevel as typeof CEFR_ORDER[number]);

  const calcAvatarSize = useCallback(() => {
    const h = containerRef.current?.offsetHeight || 520;
    const size = Math.round(Math.min(Math.max(h * 0.44, 170), 380));
    setAvatarSize(size);
  }, []);

  useEffect(() => {
    calcAvatarSize();
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(calcAvatarSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [calcAvatarSize]);

  useEffect(() => {
    setAvatarAnim("wave");
    const t = setTimeout(() => setAvatarAnim("idle"), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const completedLevels = levels.filter((l) => l.status === "completed").length;
    if (completedLevels > 0) {
      setAvatarAnim("celebrate");
      const t = setTimeout(() => setAvatarAnim("idle"), 3500);
      return () => clearTimeout(t);
    }
  }, [levels]);

  useEffect(() => {
    const onChapterComplete = () => {
      setAvatarAnim("chapterComplete");
      setShowSparkles(true);
      const t = setTimeout(() => { setAvatarAnim("idle"); setShowSparkles(false); }, 4500);
      return () => clearTimeout(t);
    };
    const onModuleComplete = () => {
      setAvatarAnim("moduleComplete");
      setShowBurst(true);
      const t = setTimeout(() => { setAvatarAnim("idle"); setShowBurst(false); }, 5500);
      return () => clearTimeout(t);
    };
    window.addEventListener("chapter-completed", onChapterComplete);
    window.addEventListener("module-completed", onModuleComplete);
    return () => {
      window.removeEventListener("chapter-completed", onChapterComplete);
      window.removeEventListener("module-completed", onModuleComplete);
    };
  }, []);

  const milestonePositions = useMemo(() => {
    return CEFR_ORDER.map((_, i) => 10 + (i / (CEFR_ORDER.length - 1)) * 80);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[24px] border border-gray-200 dark:border-[#1e2a4a] select-none min-h-[420px] sm:min-h-[520px]"
    >
      {/* === BACKGROUND IMAGE === */}
      <img
        src={TIME_BG[timeOfDay]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
        draggable={false}
      />

      {/* Subtle dark overlay for readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: dark
            ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 70%, rgba(0,0,0,0.3) 100%)"
            : "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* === FLOATING PARTICLES === */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {Array.from({ length: 16 }).map((_, i) => {
          const colors = [
            "rgba(139,92,246,0.5)", "rgba(236,72,153,0.35)", "rgba(56,189,248,0.3)",
            "rgba(34,197,94,0.3)", "rgba(168,85,247,0.4)", "rgba(251,191,36,0.25)",
          ];
          const size = 2 + (i % 4) * 1.5;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size,
                height: size,
                left: `${5 + (i * 7.3) % 90}%`,
                top: `${8 + (i * 5.7) % 75}%`,
                background: colors[i % colors.length],
                boxShadow: `0 0 ${size * 3}px ${colors[i % colors.length]}`,
              }}
              animate={{
                y: [0, -(15 + (i % 5) * 8), 0],
                x: [0, (i % 2 === 0 ? 8 : -8), 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 4 + (i % 4) * 1.5,
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* === HEADER === */}
      <div className="absolute top-0 left-0 right-0 z-[10] p-5 pb-0">
        <div className="flex items-center gap-2">
          <motion.span
            className="text-lg"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            ✦
          </motion.span>
          <h2
            className="text-base md:text-lg font-bold tracking-wide drop-shadow-lg"
            style={{ color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
          >
            Your French Level Progress
          </h2>
        </div>
      </div>

      {/* === CEFR MILESTONE PATH === */}
      <div className="absolute z-[8] left-0 right-0" style={{ top: "18%", height: "35%" }}>
        <svg
          viewBox="0 0 1000 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ overflow: "visible" }}
        >
          {CEFR_ORDER.map((level, i) => {
            if (i === CEFR_ORDER.length - 1) return null;
            const x1 = (milestonePositions[i] / 100) * 1000;
            const x2 = (milestonePositions[i + 1] / 100) * 1000;
            const y = 70;
            const isCompleted = levelStatuses[level] === "completed";
            const nextCompleted = levelStatuses[CEFR_ORDER[i + 1]] === "completed";
            const isActive = levelStatuses[level] === "active";
            const isFuture = !isCompleted && !isActive && !nextCompleted;

            let strokeColor = "rgba(255,255,255,0.15)";
            let glowColor = "transparent";
            if (isCompleted && nextCompleted) {
              strokeColor = "rgba(34,197,94,0.7)";
              glowColor = "rgba(34,197,94,0.4)";
            } else if (isCompleted || isActive) {
              strokeColor = "rgba(139,92,246,0.7)";
              glowColor = "rgba(139,92,246,0.4)";
            }

            const dotCount = 5;
            return (
              <g key={`line-${i}`}>
                {!isFuture && (
                  <motion.line
                    x1={x1} y1={y} x2={x2} y2={y}
                    stroke={glowColor}
                    strokeWidth={10}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    style={{ filter: "blur(4px)" }}
                  />
                )}
                <motion.line
                  x1={x1} y1={y} x2={x2} y2={y}
                  stroke={strokeColor}
                  strokeWidth={isFuture ? 2 : 4}
                  strokeLinecap="round"
                  strokeDasharray={isFuture ? "6 10" : "none"}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                />
                {Array.from({ length: dotCount }).map((_, d) => {
                  const dotX = x1 + ((x2 - x1) * (d + 1)) / (dotCount + 1);
                  const dotOpacity = isFuture ? 0.15 : 0.5;
                  const dotColor = isCompleted ? "rgba(34,197,94,0.6)" : isFuture ? "rgba(255,255,255,0.15)" : "rgba(139,92,246,0.5)";
                  return (
                    <motion.circle
                      key={`dot-${i}-${d}`}
                      cx={dotX} cy={y} r={3.5}
                      fill={dotColor}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: dotOpacity, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.15 + d * 0.08 }}
                    />
                  );
                })}
              </g>
            );
          })}

          {CEFR_ORDER.map((level, i) => {
            const x = (milestonePositions[i] / 100) * 1000;
            const y = 70;
            const status = levelStatuses[level] || "locked";
            const isCurrent = level === activeLevel;
            const isCompleted = status === "completed";
            const isLocked = status === "locked" || (!isCompleted && !isCurrent);

            let nodeSize = 55;
            let borderColor = "rgba(255,255,255,0.15)";
            let textColor = "rgba(255,255,255,0.5)";
            let glowFilter = "none";

            if (isCurrent) {
              nodeSize = 75;
              borderColor = "rgba(168,85,247,0.8)";
              textColor = "#ffffff";
              glowFilter = "drop-shadow(0 0 20px rgba(139,92,246,0.6)) drop-shadow(0 0 40px rgba(139,92,246,0.3))";
            } else if (isCompleted) {
              nodeSize = 60;
              borderColor = "rgba(34,197,94,0.7)";
              textColor = "#ffffff";
              glowFilter = "drop-shadow(0 0 12px rgba(34,197,94,0.4))";
            } else {
              borderColor = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
              textColor = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)";
            }

            const half = nodeSize / 2;

            return (
              <g key={`milestone-${level}`} transform={`translate(${x - half}, ${y - half})`}>
                {isCurrent && (
                  <motion.rect
                    x={-6} y={-6}
                    width={nodeSize + 12} height={nodeSize + 12}
                    rx={18}
                    fill="none"
                    stroke="rgba(168,85,247,0.4)"
                    strokeWidth={2}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {isCurrent && (
                  <motion.ellipse
                    cx={half} cy={half + 8}
                    rx={half * 1.8} ry={12}
                    fill="rgba(139,92,246,0.25)"
                    style={{ filter: "blur(8px)" }}
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                <defs>
                  <linearGradient id={`grad-${level}-${isCurrent ? "current" : isCompleted ? "done" : "locked"}`} x1="0" y1="0" x2="1" y2="1">
                    {isCurrent ? (
                      <>
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </>
                    ) : isCompleted ? (
                      <>
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="100%" stopColor="#10B981" />
                      </>
                    ) : (
                      <>
                        <stop offset="0%" stopColor={dark ? "rgba(15,20,51,0.9)" : "rgba(240,240,245,0.9)"} />
                        <stop offset="100%" stopColor={dark ? "rgba(20,28,60,0.9)" : "rgba(230,230,240,0.9)"} />
                      </>
                    )}
                  </linearGradient>
                </defs>

                <motion.rect
                  width={nodeSize} height={nodeSize}
                  rx={isCurrent ? 12 : 10}
                  fill={`url(#grad-${level}-${isCurrent ? "current" : isCompleted ? "done" : "locked"})`}
                  stroke={borderColor}
                  strokeWidth={isCurrent ? 2.5 : isCompleted ? 2 : 1.5}
                  style={{ filter: glowFilter }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, type: "spring", stiffness: 200 }}
                />

                <text
                  x={half} y={half + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={textColor}
                  fontSize={isCurrent ? 26 : 22}
                  fontWeight={isCurrent ? 800 : 700}
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  {level}
                </text>

                {isCompleted && (
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 300 }}
                  >
                    <circle cx={half} cy={nodeSize + 18} r={12} fill="#059669" />
                    <motion.path
                      d={`M${half - 5},${nodeSize + 18} L${half - 1},${nodeSize + 22} L${half + 5},${nodeSize + 14}`}
                      fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
                    />
                  </motion.g>
                )}

                {isLocked && !isCurrent && (
                  <g opacity={dark ? 0.3 : 0.25}>
                    <text
                      x={half} y={nodeSize + 22}
                      textAnchor="middle"
                      fontSize={18}
                      fill={dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)"}
                    >
                      🔒
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* === CURRENT LEVEL BADGE === */}
      <motion.div
        className="absolute z-[11]"
        style={{
          left: "5%",
          top: "13%",
          transform: "translateX(-50%)",
        }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="px-4 py-1.5 rounded-full text-xs font-bold text-white whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #7C3AED, #A855F7)",
            boxShadow: "0 4px 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)",
          }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Current Level
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-1.5"
            style={{
              width: 0, height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #A855F7",
            }}
          />
        </motion.div>
      </motion.div>

      {/* === AVATAR with glow === */}
      <motion.div
        className="absolute z-[12]"
        style={{
          left: "-3%",
          bottom: "0%",
          width: avatarSize,
          height: avatarSize,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      >
        {/* Avatar */}
        <SmartAvatar
          features={avatarFeatures as any}
          size={avatarSize}
          animate={avatarAnim}
        />

        {/* Ground glow circle — centered under avatar */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: -avatarSize * 0.06,
            width: avatarSize * 0.85,
            height: avatarSize * 0.18,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.7) 0%, rgba(139,92,246,0.3) 40%, rgba(168,85,247,0.1) 65%, transparent 80%)",
            filter: "blur(6px)",
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glowing ring on ground */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: -avatarSize * 0.04,
            width: avatarSize * 0.65,
            height: avatarSize * 0.1,
            borderRadius: "50%",
            border: "1.5px solid rgba(168,85,247,0.5)",
            boxShadow: "0 0 15px rgba(139,92,246,0.3), inset 0 0 10px rgba(139,92,246,0.15)",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sparkle effect (chapter complete) */}
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const dist = 40 + (i % 3) * 20;
              const colors = ["#8B5CF6", "#EC4899", "#38BDF8", "#22C55E", "#F8FAFC"];
              return (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: 4 + (i % 3),
                    height: 4 + (i % 3),
                    left: "50%",
                    top: "40%",
                    background: colors[i % colors.length],
                    boxShadow: `0 0 8px ${colors[i % colors.length]}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist - 20,
                    opacity: [1, 1, 0],
                    scale: [1, 1.5, 0],
                  }}
                  transition={{ duration: 1.2, delay: 0.8 + i * 0.05, ease: "easeOut" }}
                />
              );
            })}
          </div>
        )}

        {/* Burst effect (module complete) */}
        {showBurst && (
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const dist = 50 + (i % 4) * 25;
              const colors = ["#8B5CF6", "#EC4899", "#38BDF8", "#22C55E", "#F8FAFC", "#A78BFA"];
              const size = 3 + (i % 4) * 2;
              return (
                <motion.div
                  key={`burst-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: size,
                    height: size,
                    left: "50%",
                    top: "40%",
                    background: colors[i % colors.length],
                    boxShadow: `0 0 ${6 + (i % 3) * 4}px ${colors[i % colors.length]}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist - 30,
                    opacity: [0, 1, 1, 0],
                    scale: [0, 2, 1.5, 0],
                  }}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              );
            })}
            <motion.div
              className="absolute rounded-full"
              style={{
                left: "50%", top: "40%", width: 60, height: 60,
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(236,72,153,0.4) 50%, transparent 70%)",
                filter: "blur(8px)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
            />
          </div>
        )}
      </motion.div>

    </div>
  );
}
