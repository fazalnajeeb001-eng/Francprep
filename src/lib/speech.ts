import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Text-to-speech helper. Prefers female French voices.
 * Returns true if speech was started successfully.
 */
export function speak(text: string, lang = "fr-FR"): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.lang.startsWith("fr") &&
        (v.name.toLowerCase().includes("female") ||
          v.name.includes("Samantha") ||
          v.name.includes("Audrey") ||
          v.name.includes("Amélie") ||
          v.name.includes("Julie") ||
          v.name.includes("Marie") ||
          v.name.includes("Thomas"))
    );
    if (femaleVoice) u.voice = femaleVoice;
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

/**
 * React hook that wraps `speak()` and exposes an `isSpeaking` state.
 * Cleans up interval on unmount.
 */
export function useSpeak() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const checkInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const speakWithState = useCallback((text: string, lang = "fr-FR") => {
    speak(text, lang);
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
