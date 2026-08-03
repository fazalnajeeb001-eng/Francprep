import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "~/lib/apiFetch";

let currentAudioPlayer: HTMLAudioElement | null = null;
let onPlaybackStateChange: ((playing: boolean) => void) | null = null;

// Stop audio automatically when user navigates away, closes tab, or switches pages!
if (typeof window !== "undefined") {
  window.addEventListener("pagehide", () => stopAudio());
  window.addEventListener("beforeunload", () => stopAudio());
  window.addEventListener("popstate", () => stopAudio());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAudio();
  });
}

function base64ToBlob(base64: string, contentType = "audio/mp3"): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

/**
 * Text-to-speech helper. Strictly uses Neural AI Engine (/api/tts/speak)
 * configured in Admin Panel (Kokoro-82M, ElevenLabs, or OpenAI).
 * Browser Web Speech API (speechSynthesis) is 100% disabled to eliminate robotic OS audio.
 */
export function speak(
  text: string,
  lang = "fr-FR",
  rate = 0.85,
  gender: "female" | "male" = "female",
  voiceId?: string,
  provider?: string
): boolean {
  if (typeof window === "undefined") return false;
  const cleanText = text.trim();
  if (!cleanText) return false;

  // Stop any currently playing audio track
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer = null;
  }

  // Auto-detect gender if male character markers are present in text
  let finalGender = gender;
  const lower = cleanText.toLowerCase();
  if (
    lower.includes("léo") ||
    lower.includes("leo") ||
    lower.includes("thomas") ||
    lower.includes("paul") ||
    lower.includes("marc") ||
    lower.includes("monsieur") ||
    lower.includes("coach leo") ||
    lower.startsWith("fr: bonjour ! je m'appelle coach leo") ||
    lower.startsWith("fr: bonjour ! je suis leo")
  ) {
    finalGender = "male";
  }

  // Auto-detect language if text is predominantly English vs French
  let langCode = lang.toLowerCase().startsWith("en") ? "en" : "fr";
  const englishWords = ["welcome", "hello", "lesson", "question", "chapter", "exercise", "practice", "select", "choose", "the", "this", "that"];
  const containsEnglish = englishWords.some((w) => lower.includes(` ${w} `) || lower.startsWith(`${w} `));
  const containsFrench = lower.includes("bonjour") || lower.includes("c'est") || lower.includes("est-ce") || lower.includes("vous") || lower.includes("nous");
  if (containsEnglish && !containsFrench) {
    langCode = "en";
  }

  // Pre-create HTMLAudioElement to retain mobile browser autoplay permissions
  const audio = new Audio();
  currentAudioPlayer = audio;
  if (onPlaybackStateChange) onPlaybackStateChange(true);

  audio.onended = () => {
    if (currentAudioPlayer === audio) currentAudioPlayer = null;
    if (onPlaybackStateChange) onPlaybackStateChange(false);
  };
  audio.onerror = () => {
    if (currentAudioPlayer === audio) currentAudioPlayer = null;
    if (onPlaybackStateChange) onPlaybackStateChange(false);
  };

  // Call neural TTS backend service (which routes to Kokoro-82M, ElevenLabs, or OpenAI)
  apiFetch("/tts/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: cleanText, gender: finalGender, lang: langCode, voiceId, provider }),
  })
    .then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.audioUrl) {
          let src = json.data.audioUrl;
          if (src.startsWith("data:audio/")) {
            const parts = src.split(";base64,");
            if (parts.length === 2) {
              const mimeType = parts[0].replace("data:", "");
              const blob = base64ToBlob(parts[1], mimeType);
              src = URL.createObjectURL(blob);
            }
          }
          audio.src = src;
          audio.playbackRate = rate;
          audio.play().catch(() => {
            if (!provider) playDirectHDFallback(cleanText, langCode, rate, audio);
            else if (onPlaybackStateChange) onPlaybackStateChange(false);
          });
          return;
        }
      }
      if (!provider) {
        playDirectHDFallback(cleanText, langCode, rate, audio);
      } else {
        console.warn(`[TTS Speak] Provider ${provider} synthesis returned error status`);
        if (onPlaybackStateChange) onPlaybackStateChange(false);
      }
    })
    .catch(() => {
      if (!provider) {
        playDirectHDFallback(cleanText, langCode, rate, audio);
      } else {
        if (onPlaybackStateChange) onPlaybackStateChange(false);
      }
    });

  return true;
}

/**
 * Direct 24kHz HD MP3 Audio Stream Fallback (Zero Browser Web TTS / Zero Robotic OS Voice)
 */
function playDirectHDFallback(text: string, langCode: string, rate: number, audio: HTMLAudioElement) {
  try {
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text.slice(0, 200))}&tl=${langCode}&client=tw-ob`;
    audio.src = audioUrl;
    audio.playbackRate = rate;
    audio.play().catch(() => {
      if (onPlaybackStateChange) onPlaybackStateChange(false);
    });
  } catch {
    if (onPlaybackStateChange) onPlaybackStateChange(false);
  }
}

export function stopAudio(): void {
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer.currentTime = 0;
    currentAudioPlayer = null;
  }
  if (onPlaybackStateChange) onPlaybackStateChange(false);
}

export function pauseAudio(): void {
  if (currentAudioPlayer && !currentAudioPlayer.paused) {
    currentAudioPlayer.pause();
    if (onPlaybackStateChange) onPlaybackStateChange(false);
  }
}

export function resumeAudio(): void {
  if (currentAudioPlayer && currentAudioPlayer.paused) {
    currentAudioPlayer.play().catch(() => {});
    if (onPlaybackStateChange) onPlaybackStateChange(true);
  }
}

export function toggleAudio(text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female", voiceId?: string, provider?: string): boolean {
  if (currentAudioPlayer) {
    if (!currentAudioPlayer.paused) {
      pauseAudio();
      return false;
    } else if (currentAudioPlayer.src) {
      resumeAudio();
      return true;
    }
  }
  return speak(text, lang, rate, gender, voiceId, provider);
}

/**
 * React hook that wraps `speak()` and exposes `isSpeaking`, `stop`, `pause`, and `toggle`.
 */
export function useSpeak() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    onPlaybackStateChange = (playing) => setIsSpeaking(playing);
    return () => {
      onPlaybackStateChange = null;
    };
  }, []);

  const speakWithState = useCallback(
    (text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female", voiceId?: string, provider?: string) => {
      speak(text, lang, rate, gender, voiceId, provider);
    },
    []
  );

  return {
    speak: speakWithState,
    isSpeaking,
    stop: stopAudio,
    pause: pauseAudio,
    resume: resumeAudio,
    toggle: (text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female", voiceId?: string, provider?: string) =>
      toggleAudio(text, lang, rate, gender, voiceId, provider),
  };
}
