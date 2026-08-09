import { useRef, useState, useEffect, Suspense, lazy, Component, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSkinById } from "./avatarSkins";

const VRMAvatar = lazy(() =>
  import("./VRMAvatar").then((m) => ({ default: m.VRMAvatar }))
);

class AvatarErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

export function AvatarIcon({ features, size = 36 }: { features?: { gender?: string; skinTone?: string; hairColor?: string; outfitColor?: string } | null; size?: number }) {
  const gender = features?.gender || "female";
  const skin = features?.skinTone ? getSkinById(features.skinTone).color : "#D4A574";
  const hair = features?.hairColor || (gender === "male" ? "#2C1810" : "#3B2314");
  const outfit = features?.outfitColor || "#6A1B9A";

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${gender}`} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gender === "male" ? "#7C3AED" : "#EC4899"} />
          <stop offset="100%" stopColor={gender === "male" ? "#4338CA" : "#BE185D"} />
        </linearGradient>
        <clipPath id="circle-clip"><circle cx="40" cy="40" r="40" /></clipPath>
      </defs>
      <g clipPath="url(#circle-clip)">
        <rect width="80" height="80" fill={`url(#bg-${gender})`} />
        <ellipse cx="40" cy="78" rx="30" ry="22" fill={outfit} />
        <rect x="34" y="48" width="12" height="10" rx="4" fill={skin} />
        <ellipse cx="40" cy="36" rx="18" ry="20" fill={skin} />
        {gender === "male" ? (
          <path d="M22,32 Q22,14 40,14 Q58,14 58,32 Q58,24 50,20 Q40,16 30,20 Q22,24 22,32Z" fill={hair} />
        ) : (
          <>
            <path d="M22,34 Q22,12 40,12 Q58,12 58,34 Q58,26 50,22 Q40,18 30,22 Q22,26 22,34Z" fill={hair} />
            <path d="M22,34 Q18,40 18,52 Q20,48 22,40Z" fill={hair} />
            <path d="M58,34 Q62,40 62,52 Q60,48 58,40Z" fill={hair} />
          </>
        )}
        <ellipse cx="33" cy="36" rx="2.5" ry="3" fill="#1a1a2e" />
        <ellipse cx="47" cy="36" rx="2.5" ry="3" fill="#1a1a2e" />
        <circle cx="33.8" cy="35.2" r="0.8" fill="white" />
        <circle cx="47.8" cy="35.2" r="0.8" fill="white" />
        <path d="M35,44 Q40,48 45,44" stroke="#1a1a2e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function AvatarFallback({ size, gender }: { size: number; gender: string }) {
  const bg = gender === "male"
    ? "bg-gradient-to-br from-purple-600 via-indigo-700 to-slate-900"
    : "bg-gradient-to-br from-purple-500 via-pink-600 to-slate-900";
  const avatarImg = gender === "male" ? "/models/leo-avatar.png" : "/models/chloe-avatar.png";
  return (
    <div
      style={{ width: size, height: size }}
      className={`${bg} rounded-full overflow-hidden shadow-2xl border-2 border-purple-400/40 relative flex items-center justify-center`}
    >
      <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover object-top" style={{ objectPosition: "50% 15%" }} />
    </div>
  );
}

const COACH_THOUGHTS: Record<string, string[]> = {
  fr: [
    "Prêt pour la séance d'aujourd'hui ? 🇨🇦",
    "Chaque leçon vous rapproche de C2 ! ✨",
    "Pratiquez 10 min par jour pour réussir ! 🚀",
    "Excellents progrès ! Continuez ainsi 💪",
    "Le TCF Canada n'a plus de secrets pour vous ! 🎉",
  ],
  de: [
    "Bereit für das heutige Training? 🇩🇪",
    "Jede Lektion bringt dich näher ans Ziel! ✨",
    "Tolle Fortschritte! Weiter so 🚀",
    "10 Minuten am Tag reichen für den Erfolg! 💪",
  ],
  es: [
    "¡Listo para la sesión de hoy! 🇪🇸",
    "¡Cada lección te acerca a la fluidez! ✨",
    "¡Excelente progreso! Sigue así 🚀",
    "¡10 minutos al día marcan la diferencia! 💪",
  ],
  en: [
    "Ready for today's session? 🇨🇦",
    "Every lesson brings you closer to C2! ✨",
    "Practice 10 mins daily for top results! 🚀",
    "Great progress! Keep up the momentum 💪",
  ],
};

interface SmartAvatarProps {
  gender?: "male" | "female";
  features?: {
    gender?: string;
    skinTone?: string;
    hairStyle?: string;
    hairColor?: string;
    outfitStyle?: string;
    outfitColor?: string;
  } | null;
  size?: number;
  animate?: string;
  glowColor?: "purple" | "cyan" | "pink";
}

export function SmartAvatar({ gender: propGender, features, size = 80, animate = "idle" }: SmartAvatarProps) {
  const gender = propGender || features?.gender || "female";
  const isMale = gender === "male";
  const modelUrl = isMale ? "/models/leo-avatar.glb" : "/models/female-avatar.glb";
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeThought, setActiveThought] = useState<string | null>(null);
  const [currentAnim, setCurrentAnim] = useState<string>(animate);

  useEffect(() => {
    setCurrentAnim(animate);
  }, [animate]);

  useEffect(() => {
    const lang = (localStorage.getItem("fp_active_language") || "fr").toLowerCase();
    const thoughts = COACH_THOUGHTS[lang] || COACH_THOUGHTS.fr;

    const triggerThought = () => {
      const randomMsg = thoughts[Math.floor(Math.random() * thoughts.length)];
      setActiveThought(randomMsg);
      setTimeout(() => setActiveThought(null), 6000);
    };

    // First thought pops up after 3s
    const firstTimer = setTimeout(triggerThought, 3000);

    // Periodic thought pop up every 16s
    const interval = setInterval(triggerThought, 16000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const handleAvatarClick = () => {
    const lang = (localStorage.getItem("fp_active_language") || "fr").toLowerCase();
    const thoughts = COACH_THOUGHTS[lang] || COACH_THOUGHTS.fr;
    const randomMsg = thoughts[Math.floor(Math.random() * thoughts.length)];
    setActiveThought(randomMsg);
    setCurrentAnim("wave");
    setTimeout(() => {
      setCurrentAnim("idle");
    }, 4000);
    setTimeout(() => {
      setActiveThought(null);
    }, 6000);
  };

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: size, height: size }}
      className="relative shrink-0 flex items-center justify-center overflow-visible cursor-pointer select-none"
      onClick={handleAvatarClick}
    >
      {/* 💭 Coach Multi-Language Thought Cloud Bubble */}
      <AnimatePresence>
        {activeThought && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap"
            style={{ top: -size * 0.28 }}
          >
            <motion.div
              className="px-3.5 py-1.5 rounded-2xl text-xs font-semibold text-white bg-slate-900/90 border border-purple-400/40 backdrop-blur-md shadow-2xl relative flex items-center gap-1.5"
              style={{
                boxShadow: "0 8px 32px rgba(139,92,246,0.4), 0 0 15px rgba(168,85,247,0.3)",
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>💭</span>
              <span>{activeThought}</span>
              {/* Cloud Stem Tail */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderTop: "8px solid rgba(15, 23, 42, 0.9)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔮 Single Radiant Purple Glowing Circle Base (Centered Exactly Under Avatar Feet) */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none z-0"
        style={{
          bottom: -size * 0.05,
          width: size * 0.85,
          height: size * 0.22,
          background: "radial-gradient(ellipse at center, rgba(168,85,247,0.95) 0%, rgba(147,51,234,0.55) 45%, rgba(192,132,252,0.2) 70%, transparent 95%)",
          filter: "blur(6px)",
          boxShadow: "0 0 35px rgba(168,85,247,0.75), inset 0 0 15px rgba(147,51,234,0.4)",
        }}
        animate={{
          opacity: [0.35, 1.0, 0.35],
          scale: [0.93, 1.07, 0.93],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3D Animated VRM Avatar Model */}
      <div ref={containerRef} className="relative z-10 w-full h-full flex items-center justify-center">
        <AvatarErrorBoundary fallback={<AvatarFallback size={size} gender={gender} />}>
          <Suspense fallback={<AvatarFallback size={size} gender={gender} />}>
            <VRMAvatar
              modelUrl={modelUrl}
              size={size}
              animate={currentAnim}
              tint={{
                skinColor: features?.skinTone ? getSkinById(features.skinTone).color : undefined,
                hairColor: features?.hairColor,
                outfitColor: features?.outfitColor,
              }}
            />
          </Suspense>
        </AvatarErrorBoundary>
      </div>
    </motion.div>
  );
}
