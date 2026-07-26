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

  if (langPrefix === "fr") {
    // Filter for native France (fr-FR) voices first
    const frFRVoices = targetVoices.filter((v) => v.lang.toLowerCase().includes("fr-fr") || v.lang.toLowerCase() === "fr");
    const candidates = frFRVoices.length > 0 ? frFRVoices : targetVoices;

    // 1. Preferred Female HD Neural/Natural French Voice for Madame Sophie
    const femaleNeural = candidates.find((v) => {
      const n = v.name.toLowerCase();
      const isNeural = n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online");
      const isFemale = n.includes("denise") || n.includes("celeste") || n.includes("audrey") || n.includes("amélie") || n.includes("marie") || n.includes("lea") || n.includes("hortense") || n.includes("julie") || n.includes("female");
      return isNeural || isFemale;
    });
    if (femaleNeural) return femaleNeural;

    // 2. Any Neural/Natural French Voice
    const anyNeural = candidates.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online");
    });
    if (anyNeural) return anyNeural;

    return candidates[0];
  }

  // English Voice selection
  const enVoices = targetVoices.filter((v) => v.lang.toLowerCase().includes("en-us") || v.lang.toLowerCase().includes("en-gb"));
  const candidates = enVoices.length > 0 ? enVoices : targetVoices;

  const femaleNeuralEn = candidates.find((v) => {
    const n = v.name.toLowerCase();
    return (n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online")) &&
      (n.includes("jenny") || n.includes("aria") || n.includes("samantha") || n.includes("karen") || n.includes("female"));
  });
  if (femaleNeuralEn) return femaleNeuralEn;

  const anyNeuralEn = candidates.find((v) => {
    const n = v.name.toLowerCase();
    return n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online");
  });
  if (anyNeuralEn) return anyNeuralEn;

  return candidates[0];
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
