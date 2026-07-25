import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Voice Selector Helper: Finds the highest-definition Neural/Natural voice available on the device.
 */
export function getBestVoice(langPrefix: "fr" | "en"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (!targetVoices.length) return null;

  // 1. Highest Priority: HD Neural & Natural Voices (Microsoft Natural, Google, Apple Enhanced/Premium)
  const neuralVoice = targetVoices.find((v) => {
    const n = v.name.toLowerCase();
    return (
      n.includes("natural") ||
      n.includes("neural") ||
      n.includes("google") ||
      n.includes("premium") ||
      n.includes("enhanced")
    );
  });
  if (neuralVoice) return neuralVoice;

  // 2. Second Priority: Specific native high-quality voice names
  const preferredNames =
    langPrefix === "fr"
      ? ["denise", "celeste", "audrey", "amélie", "julie", "marie", "thomas", "lea", "paul"]
      : ["jenny", "aria", "samantha", "karen", "daniel", "serena", "victoria"];

  const namedVoice = targetVoices.find((v) => {
    const n = v.name.toLowerCase();
    return preferredNames.some((name) => n.includes(name));
  });
  if (namedVoice) return namedVoice;

  // 3. Fallback: First voice matching language prefix
  return targetVoices[0];
}

/**
 * Text-to-speech helper. Prefers HD Neural French voices.
 */
export function speak(text: string, lang = "fr-FR", rate = 0.85): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;

    const langPrefix = lang.toLowerCase().startsWith("en") ? "en" : "fr";
    const bestVoice = getBestVoice(langPrefix);
    if (bestVoice) u.voice = bestVoice;

    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

/**
 * React hook that wraps `speak()` and exposes an `isSpeaking` state.
 */
export function useSpeak() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const checkInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const speakWithState = useCallback((text: string, lang = "fr-FR", rate = 0.85) => {
    speak(text, lang, rate);
    setIsSpeaking(true);
    if (checkInterval.current) clearInterval(checkInterval.current);
    checkInterval.current = setInterval(() => {
      if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
        setIsSpeaking(false);
        if (checkInterval.current) {
          clearInterval(checkInterval.current);
          checkInterval.current = null;
        }
      }
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (checkInterval.current) clearInterval(checkInterval.current);
    };
  }, []);

  return { speak: speakWithState, isSpeaking };
}
