import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Voice Selector Helper: Finds the highest-definition Neural/Natural voice available on the device,
 * matching both language and character gender (Female for Chloé/Sophie, Male for Léo/Lucas).
 */
export function getBestVoice(langPrefix: "fr" | "en", gender: "female" | "male" = "female"): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (!targetVoices.length) return null;

  if (langPrefix === "fr") {
    const frFRVoices = targetVoices.filter((v) => v.lang.toLowerCase().includes("fr-fr") || v.lang.toLowerCase() === "fr");
    const candidates = frFRVoices.length > 0 ? frFRVoices : targetVoices;

    if (gender === "male") {
      const maleVoice = candidates.find((v) => {
        const n = v.name.toLowerCase();
        const isMale = n.includes("henri") || n.includes("paul") || n.includes("claude") || n.includes("jean") || n.includes("nicolas") || n.includes("male") || n.includes("guy");
        const isNeural = n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("online");
        return isMale || (isNeural && !n.includes("female") && !n.includes("denise") && !n.includes("celeste"));
      });
      if (maleVoice) return maleVoice;
    } else {
      const femaleVoice = candidates.find((v) => {
        const n = v.name.toLowerCase();
        const isFemale = n.includes("denise") || n.includes("celeste") || n.includes("audrey") || n.includes("amélie") || n.includes("marie") || n.includes("lea") || n.includes("hortense") || n.includes("julie") || n.includes("female");
        const isNeural = n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online");
        return isFemale || isNeural;
      });
      if (femaleVoice) return femaleVoice;
    }

    const anyNeural = candidates.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online");
    });
    if (anyNeural) return anyNeural;

    return candidates[0];
  }

  // English Voice Selection
  const enVoices = targetVoices.filter((v) => v.lang.toLowerCase().includes("en-us") || v.lang.toLowerCase().includes("en-gb"));
  const candidates = enVoices.length > 0 ? enVoices : targetVoices;

  if (gender === "male") {
    const maleVoiceEn = candidates.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes("guy") || n.includes("christopher") || n.includes("daniel") || n.includes("male") || n.includes("david");
    });
    if (maleVoiceEn) return maleVoiceEn;
  } else {
    const femaleVoiceEn = candidates.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes("jenny") || n.includes("aria") || n.includes("samantha") || n.includes("karen") || n.includes("female");
    });
    if (femaleVoiceEn) return femaleVoiceEn;
  }

  const anyNeuralEn = candidates.find((v) => {
    const n = v.name.toLowerCase();
    return n.includes("natural") || n.includes("neural") || n.includes("google") || n.includes("premium") || n.includes("enhanced") || n.includes("online");
  });
  if (anyNeuralEn) return anyNeuralEn;

  return candidates[0];
}

import { apiFetch } from "~/lib/apiFetch";

let currentAudioPlayer: HTMLAudioElement | null = null;
let onPlaybackStateChange: ((playing: boolean) => void) | null = null;

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
 * Text-to-speech helper. Uses Neural AI Voices via /api/tts/speak.
 */
export function speak(text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female"): boolean {
  if (typeof window === "undefined") return false;
  const cleanText = text.trim();
  if (!cleanText) return false;

  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }

  const langCode = lang.toLowerCase().startsWith("en") ? "en" : "fr";

  // Pre-create audio element to retain browser autoplay permissions
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

  // Call neural TTS service
  apiFetch("/tts/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: cleanText, gender, lang: langCode }),
  })
    .then(async (res) => {
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.audioUrl) {
          let src = json.data.audioUrl;
          if (src.startsWith("data:audio/mp3;base64,")) {
            const rawBase64 = src.replace("data:audio/mp3;base64,", "");
            const blob = base64ToBlob(rawBase64, "audio/mp3");
            src = URL.createObjectURL(blob);
          }
          audio.src = src;
          audio.playbackRate = rate;
          audio.play().catch(() => {
            fallbackSpeech(cleanText, lang, rate, gender);
          });
          return;
        }
      }
      fallbackSpeech(cleanText, lang, rate, gender);
    })
    .catch(() => {
      fallbackSpeech(cleanText, lang, rate, gender);
    });

  return true;
}

function fallbackSpeech(text: string, lang: string, rate: number, gender: "female" | "male") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;

    const langPrefix = lang.toLowerCase().startsWith("en") ? "en" : "fr";
    const bestVoice = getBestVoice(langPrefix, gender);
    if (bestVoice) u.voice = bestVoice;

    u.onend = () => {
      if (onPlaybackStateChange) onPlaybackStateChange(false);
    };
    u.onerror = () => {
      if (onPlaybackStateChange) onPlaybackStateChange(false);
    };

    window.speechSynthesis.speak(u);
  } catch {}
}

/**
 * React hook that wraps `speak()` and exposes an `isSpeaking` state.
 */
export function useSpeak() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    onPlaybackStateChange = (playing) => setIsSpeaking(playing);
    return () => {
      onPlaybackStateChange = null;
    };
  }, []);

  const speakWithState = useCallback((text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female") => {
    speak(text, lang, rate, gender);
  }, []);

  return { speak: speakWithState, isSpeaking };
}
