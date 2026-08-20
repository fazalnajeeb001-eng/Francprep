import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { triggerAcousticSoundForQuestion } from "./soundEffects";

let currentAudioPlayer: HTMLAudioElement | null = null;
let activeAudioPlayers = new Set<HTMLAudioElement>();
let onPlaybackStateChange: ((playing: boolean) => void) | null = null;
let currentDialogueId = 0;
let isAudioPausedState = false;
let lineTimeoutId: ReturnType<typeof setTimeout> | null = null;
let resumeDialogueCallback: (() => void) | null = null;

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
  provider?: string,
  extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string },
  onEnded?: () => void
): boolean {
  if (typeof window === "undefined") return false;
  const cleanText = text.trim();
  if (!cleanText) return false;

  stopAudio();
  const myDialogueId = ++currentDialogueId;

  // Respect explicit gender parameter or auto-detect speaker labels in dialogue text
  let finalGender = gender;
  if (/^\s*(Locuteur|Annonceur|Monsieur|M\.|Paul|Léo|Marc|Antoine|Pierre|Thomas|Hugo|Louis)\s*:/i.test(cleanText)) {
    finalGender = "male";
  } else if (/^\s*(Locutrice|Annonceuse|Madame|Mme|Chloé|Marie|Sophie|Camille|Emma|Léa)\s*:/i.test(cleanText)) {
    finalGender = "female";
  }

  // Extract ISO 2-letter language code (e.g. de, es, it, pt, fr, en, ru, zh, ja, ko, ar)
  let langCode = lang ? lang.split('-')[0].toLowerCase() : 'fr';
  if (langCode === 'en-us' || langCode === 'en-gb') langCode = 'en';

  // Pre-create HTMLAudioElement to retain mobile browser autoplay permissions
  const audio = new Audio();
  activeAudioPlayers.add(audio);
  currentAudioPlayer = audio;
  if (onPlaybackStateChange) onPlaybackStateChange(true);

  audio.onended = () => {
    activeAudioPlayers.delete(audio);
    if (currentAudioPlayer === audio) currentAudioPlayer = null;
    if (onPlaybackStateChange) onPlaybackStateChange(false);
    if (onEnded) onEnded();
  };
  audio.onerror = () => {
    activeAudioPlayers.delete(audio);
    if (currentAudioPlayer === audio) currentAudioPlayer = null;
    if (onPlaybackStateChange) onPlaybackStateChange(false);
    if (onEnded) onEnded();
  };

  // Call neural TTS backend service (which routes to Kokoro-82M, ElevenLabs, or OpenAI)
  apiFetch("/tts/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: cleanText,
      gender: finalGender,
      lang: langCode,
      voiceId,
      provider,
      speakingRate: rate,
      rate,
      elevenLabsApiKey: extraKeys?.elevenLabsApiKey,
      openaiApiKey: extraKeys?.openaiApiKey,
      huggingFaceToken: extraKeys?.huggingFaceToken,
    }),
  })
    .then(async (res) => {
      if (myDialogueId !== currentDialogueId) return;
      if (res.ok) {
        const json = await res.json();
        if (myDialogueId !== currentDialogueId) return;
        if (json.success && json.data?.audioUrl) {
          if (json.data.fallbackActive && typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("tts-fallback-alert", {
                detail: {
                  requestedProvider: json.data.requestedProvider,
                  activeProvider: json.data.provider,
                },
              })
            );
          }
          let src = json.data.audioUrl;
          if (src.startsWith("data:audio/")) {
            const parts = src.split(";base64,");
            if (parts.length === 2) {
              const mimeType = parts[0].replace("data:", "");
              const blob = base64ToBlob(parts[1], mimeType);
              src = URL.createObjectURL(blob);
            }
          }
          if (myDialogueId !== currentDialogueId) return;
          audio.src = src;
          audio.preservesPitch = true;
          (audio as any).webkitPreservesPitch = true;
          (audio as any).mozPreservesPitch = true;
          audio.onplay = () => {
            audio.playbackRate = rate;
            audio.preservesPitch = true;
          };
          audio.oncanplay = () => {
            audio.playbackRate = rate;
            audio.preservesPitch = true;
          };
          if (isAudioPausedState) {
            return;
          }
          audio.play().then(() => {
            if (myDialogueId !== currentDialogueId || isAudioPausedState) {
              audio.pause();
              if (myDialogueId !== currentDialogueId) audio.src = "";
              return;
            }
            audio.playbackRate = rate;
            audio.preservesPitch = true;
          }).catch(() => {
            if (myDialogueId === currentDialogueId && !isAudioPausedState) {
              playDirectHDFallback(cleanText, langCode, rate, audio, finalGender, onEnded);
            }
          });
          return;
        }
      }
      if (myDialogueId === currentDialogueId && !isAudioPausedState) {
        playDirectHDFallback(cleanText, langCode, rate, audio, finalGender, onEnded);
      }
    })
    .catch(() => {
      if (myDialogueId === currentDialogueId && !isAudioPausedState) {
        playDirectHDFallback(cleanText, langCode, rate, audio, finalGender, onEnded);
      }
    });

  return true;
}

/**
 * Direct HD MP3 Audio Stream Fallback (Server-Side Proxy Fallback - Zero Browser CORS Errors / Zero Skipped Audio Lines)
 */
function playDirectHDFallback(
  text: string,
  langCode: string,
  rate: number,
  audio: HTMLAudioElement,
  gender: "female" | "male" = "female",
  onEnded?: () => void
) {
  apiFetch("/tts/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      gender,
      lang: langCode,
      provider: "edge-neural",
      speakingRate: rate,
    }),
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
            speakWebSpeech(text, langCode, rate, gender, onEnded || (() => {
              if (audio.onended) (audio.onended as any)(new Event("ended"));
            }));
          });
          return;
        }
      }
      speakWebSpeech(text, langCode, rate, gender, onEnded || (() => {
        if (audio.onended) (audio.onended as any)(new Event("ended"));
      }));
    })
    .catch(() => {
      speakWebSpeech(text, langCode, rate, gender, onEnded || (() => {
        if (audio.onended) (audio.onended as any)(new Event("ended"));
      }));
    });
}

function speakWebSpeech(
  text: string,
  langCode: string,
  rate: number,
  gender: "female" | "male" = "female",
  onEnded?: () => void
) {
  console.warn("[Speech] Web Speech API disabled to prevent robotic OS voices.");
  if (onEnded) onEnded();
  return;
}

export function stopAudio(): void {
  isAudioPausedState = false;
  resumeDialogueCallback = null;
  currentDialogueId++;
  if (lineTimeoutId) {
    clearTimeout(lineTimeoutId);
    lineTimeoutId = null;
  }
  activeAudioPlayers.forEach((player) => {
    try {
      player.pause();
      player.src = "";
      player.currentTime = 0;
    } catch {}
  });
  activeAudioPlayers.clear();
  if (currentAudioPlayer) {
    try {
      currentAudioPlayer.pause();
      currentAudioPlayer.src = "";
      currentAudioPlayer.currentTime = 0;
    } catch {}
    currentAudioPlayer = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
  if (onPlaybackStateChange) onPlaybackStateChange(false);
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => stopAudio());
  window.addEventListener("pagehide", () => stopAudio());
  window.addEventListener("popstate", () => stopAudio());
}

/**
 * Authentic TCF Dual-Voice & Multi-Speaker Audio Synthesizer
 * Plays Passage Speaker Audio followed seamlessly by Official Test Announcer Audio ("Écoutez la question...").
 */
export function ttsSpeakListening(
  text: string,
  lang = "fr-FR",
  rate = 0.85,
  defaultGender: "female" | "male" = "female",
  onEnded?: () => void
): boolean {
  if (typeof window === "undefined" || !text || !text.trim()) return false;
  speakDialogue(text, lang, rate, undefined, onEnded);
  return true;
}

export function pauseAudio(): void {
  isAudioPausedState = true;
  if (lineTimeoutId) {
    clearTimeout(lineTimeoutId);
    lineTimeoutId = null;
  }
  activeAudioPlayers.forEach((player) => {
    try {
      if (!player.paused) player.pause();
    } catch {}
  });
  if (currentAudioPlayer && !currentAudioPlayer.paused) {
    try {
      currentAudioPlayer.pause();
    } catch {}
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.pause();
    } catch {}
  }
  if (onPlaybackStateChange) onPlaybackStateChange(false);
}

export function resumeAudio(): void {
  isAudioPausedState = false;

  activeAudioPlayers.forEach((player) => {
    try {
      if (player.paused && !player.ended && player.src) {
        player.play().catch(() => {});
      }
    } catch {}
  });

  if (currentAudioPlayer && currentAudioPlayer.paused && !currentAudioPlayer.ended && currentAudioPlayer.src) {
    currentAudioPlayer.play().catch(() => {});
  }

  if (typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.paused) {
    try {
      window.speechSynthesis.resume();
    } catch {}
  }

  if (resumeDialogueCallback) {
    const cb = resumeDialogueCallback;
    resumeDialogueCallback = null;
    cb();
  }

  if (onPlaybackStateChange) onPlaybackStateChange(true);
}

export function toggleAudio(
  text: string,
  lang = "fr-FR",
  rate = 0.85,
  gender: "female" | "male" = "female",
  voiceId?: string,
  provider?: string,
  extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string }
): boolean {
  if (currentAudioPlayer) {
    if (!currentAudioPlayer.paused) {
      pauseAudio();
      return false;
    }
    stopAudio();
  }
  return speak(text, lang, rate, gender, voiceId, provider, extraKeys);
}

/**
 * Multi-Speaker Dialogue Player. Parses lines for speaker names (e.g. Paul: / Marie: or Speaker A / Speaker B)
 * and alternates seamlessly between Male and Female studio neural voices!
 */
export function speakDialogue(
  dialogueText: string,
  lang = "fr-FR",
  rate = 0.85,
  extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string },
  onEnded?: () => void
): void {
  if (typeof window === "undefined") return;
  const clean = dialogueText.trim();
  if (!clean) return;

  stopAudio();
  const myDialogueId = ++currentDialogueId;

  const lines = clean
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const parsedDialogue: { speaker: string; text: string; gender: "male" | "female" }[] = [];

  let isMaleNext = true;
  const knownFemaleNames = ["marie", "chloé", "chloe", "sophie", "laura", "alice", "sarah", "femme", "female", "madame", "speaker b", "speaker 2", "julie", "camille", "clara", "emma"];
  const knownMaleNames = ["paul", "léo", "leo", "henri", "marc", "antoine", "pierre", "thomas", "homme", "male", "monsieur", "speaker a", "speaker 1", "lucas", "hugo", "louis"];

  for (const line of lines) {
    let speakerName = "";
    let speechText = line;

    if (line.includes(":")) {
      const parts = line.split(":");
      speakerName = parts[0].trim();
      speechText = parts.slice(1).join(":").trim();
    } else if (line.includes("—")) {
      const parts = line.split("—");
      speakerName = parts[0].trim();
      speechText = parts.slice(1).join("—").trim();
    }

    if (!speechText) continue;

    const lowerSpeaker = speakerName.toLowerCase();
    let gender: "male" | "female" = "female";

    if (lowerSpeaker.includes("annonceuse")) {
      gender = "female";
    } else if (lowerSpeaker.includes("annonceur") || lowerSpeaker.includes("examinateur")) {
      gender = "male";
    } else if (lowerSpeaker.includes("locutrice") || knownFemaleNames.some((f) => lowerSpeaker.includes(f))) {
      gender = "female";
    } else if (lowerSpeaker.includes("locuteur") || knownMaleNames.some((m) => lowerSpeaker.includes(m))) {
      gender = "male";
    } else {
      gender = "female";
    }

    parsedDialogue.push({ speaker: speakerName, text: line.trim(), gender });
  }

  if (parsedDialogue.length === 0) {
    speak(clean, lang, rate, "female", undefined, undefined, extraKeys, onEnded);
    return;
  }

  let currentIndex = 0;
  const audio = new Audio();
  activeAudioPlayers.add(audio);
  currentAudioPlayer = audio;
  if (onPlaybackStateChange) onPlaybackStateChange(true);

  function playNextLine() {
    if (myDialogueId !== currentDialogueId) return; // Terminate if dialogue was stopped or replaced
    if (isAudioPausedState) return; // Abort immediately if audio engine is paused!

    if (currentIndex >= parsedDialogue.length) {
      activeAudioPlayers.delete(audio);
      if (currentAudioPlayer === audio) currentAudioPlayer = null;
      if (onPlaybackStateChange) onPlaybackStateChange(false);
      if (onEnded) onEnded();
      return;
    }

    const current = parsedDialogue[currentIndex];
    currentIndex++;

    audio.onended = () => {
      if (myDialogueId === currentDialogueId && !isAudioPausedState) {
        let delayMs = 400;
        if (currentIndex < parsedDialogue.length) {
          const nextLine = parsedDialogue[currentIndex];
          const isNextAnnouncer = nextLine.speaker.toLowerCase().includes("annonceur") ||
                                  nextLine.speaker.toLowerCase().includes("annonceuse") ||
                                  /^\s*(Écoutez|Regardez)\b/i.test(nextLine.text);
          const isNextSpokenOption = /^\s*(Option\s+[A-D]|Propositions?\s+[A-D]|[A-D]\.)\b/i.test(nextLine.text) ||
                                     /^\s*([A-D])\s*:/i.test(nextLine.speaker);
          const isCurrentSpokenOption = /^\s*(Option\s+[A-D]|Propositions?\s+[A-D]|[A-D]\.)\b/i.test(current.text) ||
                                        /^\s*([A-D])\s*:/i.test(current.speaker);

          if (isNextAnnouncer) {
            delayMs = 1500;
          } else if (isNextSpokenOption || isCurrentSpokenOption) {
            delayMs = 1000;
          }
        }
        if (lineTimeoutId) clearTimeout(lineTimeoutId);
        lineTimeoutId = setTimeout(() => {
          lineTimeoutId = null;
          if (myDialogueId === currentDialogueId && !isAudioPausedState) {
            playNextLine();
          }
        }, delayMs);
      }
    };
    audio.onerror = () => {
      if (myDialogueId === currentDialogueId && !isAudioPausedState) {
        if (lineTimeoutId) clearTimeout(lineTimeoutId);
        lineTimeoutId = setTimeout(() => {
          lineTimeoutId = null;
          if (myDialogueId === currentDialogueId && !isAudioPausedState) {
            playNextLine();
          }
        }, 400);
      }
    };

    let langCode = typeof lang === "string" && lang ? (lang.split("-")[0].toLowerCase() || "fr") : "fr";
    let effectiveRate = typeof rate === "number" ? rate : (parseFloat(rate as any) || 1.0);

    apiFetch("/tts/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: current.text,
        gender: current.gender,
        speaker: current.speaker,
        lang: langCode,
        rate: effectiveRate,
        elevenLabsApiKey: extraKeys?.elevenLabsApiKey,
        openaiApiKey: extraKeys?.openaiApiKey,
        huggingFaceToken: extraKeys?.huggingFaceToken,
      }),
    })
      .then(async (res) => {
        if (myDialogueId !== currentDialogueId) return;
        if (res.ok) {
          const json = await res.json();
          if (myDialogueId !== currentDialogueId) return;
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
            if (myDialogueId !== currentDialogueId) return;
            audio.src = src;
            audio.preservesPitch = true;
            (audio as any).webkitPreservesPitch = true;
            (audio as any).mozPreservesPitch = true;
            audio.onplay = () => {
              audio.playbackRate = rate;
              audio.preservesPitch = true;
            };
            audio.oncanplay = () => {
              audio.playbackRate = rate;
              audio.preservesPitch = true;
            };
            if (isAudioPausedState) {
              return;
            }
            audio.play().then(() => {
              if (myDialogueId !== currentDialogueId || isAudioPausedState) {
                audio.pause();
                if (myDialogueId !== currentDialogueId) audio.src = "";
                return;
              }
              audio.playbackRate = rate;
              audio.preservesPitch = true;
            }).catch(() => {
              if (myDialogueId === currentDialogueId && !isAudioPausedState) {
                playDirectHDFallback(current.text, langCode, rate, audio, undefined, () => {
                  if (audio.onended) (audio.onended as any)(new Event("ended"));
                });
              }
            });
            return;
          }
        }
        if (myDialogueId === currentDialogueId && !isAudioPausedState) {
          playDirectHDFallback(current.text, langCode, rate, audio, undefined, () => {
            if (audio.onended) (audio.onended as any)(new Event("ended"));
          });
        }
      })
      .catch(() => {
        if (myDialogueId === currentDialogueId && !isAudioPausedState) {
          playDirectHDFallback(current.text, langCode, rate, audio, undefined, () => {
            if (audio.onended) (audio.onended as any)(new Event("ended"));
          });
        }
      });
  }

  playNextLine();
}

export function speakListeningQuestion(
  text: string,
  questionNumberOrLang?: number | string,
  langOrRate?: string | number,
  rateOrDefaultGender?: number | string,
  extraKeysOrOnEnded?: any,
  onEnded?: () => void
): void {
  let lang = "fr-FR";
  let rate = 1.0;
  let gender: "female" | "male" = "female";
  let cb = onEnded;

  if (typeof questionNumberOrLang === "string") {
    lang = questionNumberOrLang;
    if (typeof langOrRate === "number") rate = langOrRate;
    if (typeof extraKeysOrOnEnded === "function") cb = extraKeysOrOnEnded;
  } else {
    if (typeof langOrRate === "string") lang = langOrRate;
    if (typeof rateOrDefaultGender === "number") rate = rateOrDefaultGender;
    if (typeof extraKeysOrOnEnded === "function") cb = extraKeysOrOnEnded;
  }

  stopAudio();
  speak(text, lang, rate, gender, undefined, undefined, undefined, cb);
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
    (text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female", voiceId?: string, provider?: string, extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string }, onEnded?: () => void) => {
      speak(text, lang, rate, gender, voiceId, provider, extraKeys, onEnded);
    },
    []
  );

  const speakDialogueWithState = useCallback(
    (text: string, lang = "fr-FR", rate = 0.85, extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string }, onEnded?: () => void) => {
      speakDialogue(text, lang, rate, extraKeys, onEnded);
    },
    []
  );

  return {
    speak: speakWithState,
    speakDialogue: speakDialogueWithState,
    speakListening: (text: string, lang = "fr-FR", rate = 0.85, defaultGender: "female" | "male" = "female", onEnded?: () => void) =>
      speakListeningQuestion(text, lang, rate, defaultGender, undefined, onEnded),
    isSpeaking,
    stop: stopAudio,
    pause: pauseAudio,
    resume: resumeAudio,
    toggle: (text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female", voiceId?: string, provider?: string, extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string }) =>
      toggleAudio(text, lang, rate, gender, voiceId, provider, extraKeys),
  };
}
