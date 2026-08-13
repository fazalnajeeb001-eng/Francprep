import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "~/lib/apiFetch";
import { triggerAcousticSoundForQuestion } from "./soundEffects";

let currentAudioPlayer: HTMLAudioElement | null = null;
let onPlaybackStateChange: ((playing: boolean) => void) | null = null;
let currentDialogueId = 0;
let isAudioPausedState = false;
let lineTimeoutId: ReturnType<typeof setTimeout> | null = null;

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

  // Stop any currently playing audio track
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer = null;
  }

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
  currentAudioPlayer = audio;
  if (onPlaybackStateChange) onPlaybackStateChange(true);

  audio.onended = () => {
    if (currentAudioPlayer === audio) currentAudioPlayer = null;
    if (onPlaybackStateChange) onPlaybackStateChange(false);
    if (onEnded) onEnded();
  };
  audio.onerror = () => {
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
          audio.playbackRate = rate;
          audio.play().then(() => {
            if (myDialogueId !== currentDialogueId) {
              audio.pause();
              audio.src = "";
              return;
            }
            audio.playbackRate = rate;
            audio.preservesPitch = true;
          }).catch(() => {
            if (myDialogueId === currentDialogueId) {
              playDirectHDFallback(cleanText, langCode, rate, audio, finalGender);
            }
          });
          return;
        }
      }
      if (myDialogueId === currentDialogueId) {
        playDirectHDFallback(cleanText, langCode, rate, audio, finalGender);
      }
    })
    .catch(() => {
      if (myDialogueId === currentDialogueId) {
        playDirectHDFallback(cleanText, langCode, rate, audio, finalGender);
      }
    });

  return true;
}

/**
 * Direct 24kHz HD MP3 Audio Stream Fallback (Zero Browser Web TTS / Zero Robotic OS Voice)
 */
function playDirectHDFallback(text: string, langCode: string, rate: number, audio: HTMLAudioElement, gender: "female" | "male" = "female") {
  try {
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text.slice(0, 200))}&tl=${langCode}&client=tw-ob`;
    audio.src = audioUrl;
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
    audio.playbackRate = rate;
    audio.play().then(() => {
      audio.playbackRate = rate;
      audio.preservesPitch = true;
    }).catch(() => {
      speakWebSpeech(text, langCode, rate, gender);
    });
  } catch {
    speakWebSpeech(text, langCode, rate, gender);
  }
}

function speakWebSpeech(text: string, langCode: string, rate: number, gender: "female" | "male" = "female") {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode === "fr" ? "fr-FR" : langCode;
      utterance.rate = rate;

      const voices = window.speechSynthesis.getVoices();
      const langVoices = voices.filter(v => v.lang.toLowerCase().startsWith(langCode));
      if (langVoices.length > 0) {
        const maleKeywords = ["male", "man", "thomas", "paul", "nicolas", "henri", "daniel", "george"];
        const femaleKeywords = ["female", "woman", "hortense", "julie", "denise", "celeste", "aurelie", "amélie", "alice"];
        const matchedVoice = langVoices.find(v => {
          const vName = v.name.toLowerCase();
          return gender === "male"
            ? maleKeywords.some(k => vName.includes(k))
            : femaleKeywords.some(k => vName.includes(k));
        });
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      utterance.onend = () => { if (onPlaybackStateChange) onPlaybackStateChange(false); };
      utterance.onerror = () => { if (onPlaybackStateChange) onPlaybackStateChange(false); };
      if (onPlaybackStateChange) onPlaybackStateChange(true);
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("[Speech] WebSpeech speak blocked:", err);
        if (onPlaybackStateChange) onPlaybackStateChange(false);
      }
      return;
    } catch (err) {
      console.warn("[Speech] WebSpeech error:", err);
    }
  }
  if (onPlaybackStateChange) onPlaybackStateChange(false);
}

export function stopAudio(): void {
  isAudioPausedState = false;
  if (lineTimeoutId) {
    clearTimeout(lineTimeoutId);
    lineTimeoutId = null;
  }
  currentDialogueId++;
  if (currentAudioPlayer) {
    currentAudioPlayer.pause();
    currentAudioPlayer.src = "";
    currentAudioPlayer.currentTime = 0;
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
 * Authentic TCF Dual-Voice Audio Synthesizer
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
  const cleanText = text.trim();

  // Check if text has Announcer prompt separation
  const announcerMatch = cleanText.match(/\b(Annonceur|Annonceuse)\s*:\s*/i);
  if (announcerMatch && announcerMatch.index !== undefined && announcerMatch.index > 0) {
    const passagePart = cleanText.slice(0, announcerMatch.index).trim();
    const announcerPart = cleanText.slice(announcerMatch.index).trim();

    // Determine passage speaker gender
    const isPassageFemale = /\b(Locutrice|Annonceuse)\b/i.test(passagePart);
    const passageGender: "female" | "male" = isPassageFemale ? "female" : (/\bLocuteur\b/i.test(passagePart) ? "male" : defaultGender);

    // Determine announcer speaker gender
    const isAnnouncerFemale = /\bAnnonceuse\b/i.test(announcerPart);
    const announcerGender: "female" | "male" = isAnnouncerFemale ? "female" : "male";

    // Clean speaker prefix tags
    const cleanPassage = passagePart.replace(/^(Locuteur|Locutrice)\s*:\s*/i, "").trim();
    const cleanAnnouncer = announcerPart.replace(/^(Annonceur|Annonceuse)\s*:\s*/i, "").trim();

    return speak(cleanPassage, lang, rate, passageGender, undefined, undefined, undefined, () => {
      speak(cleanAnnouncer, lang, rate, announcerGender, undefined, undefined, undefined, onEnded);
    });
  }

  // Single speaker fallback
  return speak(cleanText, lang, rate, defaultGender, undefined, undefined, undefined, onEnded);
}

export function pauseAudio(): void {
  isAudioPausedState = true;
  if (lineTimeoutId) {
    clearTimeout(lineTimeoutId);
    lineTimeoutId = null;
  }
  if (currentAudioPlayer && !currentAudioPlayer.paused) {
    currentAudioPlayer.pause();
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
  if (currentAudioPlayer && currentAudioPlayer.paused) {
    currentAudioPlayer.play().catch(() => {});
    if (onPlaybackStateChange) onPlaybackStateChange(true);
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.resume();
    } catch {}
  }
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

    parsedDialogue.push({ speaker: speakerName, text: speechText, gender });
  }

  if (parsedDialogue.length === 0) {
    speak(clean, lang, rate, "female", undefined, undefined, extraKeys, onEnded);
    return;
  }

  let currentIndex = 0;

  function playNextLine() {
    if (myDialogueId !== currentDialogueId) return; // Terminate if dialogue was stopped or replaced
    if (isAudioPausedState) return; // Abort immediately if audio engine is paused!

    if (currentIndex >= parsedDialogue.length) {
      if (onPlaybackStateChange) onPlaybackStateChange(false);
      if (onEnded) onEnded();
      return;
    }

    const current = parsedDialogue[currentIndex];
    currentIndex++;

    const audio = new Audio();
    currentAudioPlayer = audio;
    if (onPlaybackStateChange) onPlaybackStateChange(true);

    audio.onended = () => {
      if (myDialogueId === currentDialogueId && !isAudioPausedState) {
        // Real TCF CBT Sound Design Pacing rules:
        // 1. Passage -> Announcer ("Écoutez la question..."): 1500ms silent break
        // 2. Between Spoken Options A, B, C, D (Q1-Q8): 1000ms silent break
        // 3. Standard dialogue lines: 400ms break
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

    let langCode = lang ? lang.split("-")[0].toLowerCase() : "fr";

    apiFetch("/tts/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: current.text,
        gender: current.gender,
        lang: langCode,
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
            audio.playbackRate = rate;
            audio.play().then(() => {
              if (myDialogueId !== currentDialogueId) {
                audio.pause();
                audio.src = "";
                return;
              }
              audio.playbackRate = rate;
              audio.preservesPitch = true;
            }).catch(() => {
              if (myDialogueId === currentDialogueId) {
                playDirectHDFallback(current.text, langCode, rate, audio);
              }
            });
            return;
          }
        }
        if (myDialogueId === currentDialogueId) {
          playDirectHDFallback(current.text, langCode, rate, audio);
        }
      })
      .catch(() => {
        if (myDialogueId === currentDialogueId) {
          playDirectHDFallback(current.text, langCode, rate, audio);
        }
      });
  }

  playNextLine();
}

export async function speakListeningQuestion(
  text: string,
  questionNumber: number,
  lang = "fr-FR",
  rate = 0.85,
  extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string },
  onEnded?: () => void
): Promise<void> {
  stopAudio();
  if (questionNumber >= 1 && questionNumber <= 33) {
    try {
      await Promise.race([
        triggerAcousticSoundForQuestion(questionNumber),
        new Promise((resolve) => setTimeout(resolve, 400))
      ]);
    } catch {}
  }
  speakDialogue(text, lang, rate, extraKeys, onEnded);
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
    speakListening: (text: string, qNum: number, lang = "fr-FR", rate = 0.85, extraKeys?: any, onEnded?: () => void) =>
      speakListeningQuestion(text, qNum, lang, rate, extraKeys, onEnded),
    isSpeaking,
    stop: stopAudio,
    pause: pauseAudio,
    resume: resumeAudio,
    toggle: (text: string, lang = "fr-FR", rate = 0.85, gender: "female" | "male" = "female", voiceId?: string, provider?: string, extraKeys?: { elevenLabsApiKey?: string; openaiApiKey?: string; huggingFaceToken?: string }) =>
      toggleAudio(text, lang, rate, gender, voiceId, provider, extraKeys),
  };
}
