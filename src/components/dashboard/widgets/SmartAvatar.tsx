import { motion } from "framer-motion";
import { getSkinById } from "./avatarSkins";

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
    ? "bg-gradient-to-br from-purple-600 to-indigo-700"
    : "bg-gradient-to-br from-pink-500 to-rose-600";
  const avatarImg = gender === "male" ? "/models/leo-avatar.png" : "/models/chloe-avatar.png";
  return (
    <div
      style={{ width: size, height: size }}
      className={`${bg} rounded-full overflow-hidden shadow-lg border-2 border-white/20 relative flex items-center justify-center`}
    >
      <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover object-top" style={{ objectPosition: "50% 15%" }} />
    </div>
  );
}

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
}

export function SmartAvatar({ gender: propGender, features, size = 80, animate = "idle" }: SmartAvatarProps) {
  const gender = propGender || features?.gender || "female";
  const isMale = gender === "male";
  const avatarImg = isMale ? "/models/leo-avatar.png" : "/models/chloe-avatar.png";

  const getAnimationVariants = () => {
    if (animate === "walk") {
      return { y: [0, -6, 0], transition: { repeat: Infinity, duration: 0.6 } };
    }
    if (animate === "celebrate") {
      return { y: [0, -12, 0], scale: [1, 1.08, 1], transition: { repeat: Infinity, duration: 0.8 } };
    }
    if (animate === "wave") {
      return { rotate: [0, 8, -8, 0], transition: { repeat: Infinity, duration: 1 } };
    }
    // Idle breathing
    return { y: [0, -3, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } };
  };

  return (
    <motion.div
      animate={getAnimationVariants()}
      style={{ width: size, height: size }}
      className="relative shrink-0 flex items-center justify-center"
    >
      <div className={`w-full h-full rounded-full overflow-hidden border-2 shadow-xl ${
        isMale ? "border-purple-500/40 bg-gradient-to-br from-purple-900/40 to-indigo-900/40" : "border-pink-500/40 bg-gradient-to-br from-pink-900/40 to-purple-900/40"
      }`}>
        <img
          src={avatarImg}
          alt="Avatar"
          loading="eager"
          className="w-full h-full object-cover object-top"
          style={{ objectPosition: "50% 15%" }}
        />
      </div>
    </motion.div>
  );
}
