/**
 * Web Audio API Acoustic Sound Effects Synthesizer for Authentic TCF Canada CBT Listening Exam
 * Generates zero-dependency, ultra-realistic acoustic chimes, phone beeps, and radio intro tones.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * 🔔 Airport / Train Station Announcement Chime ("Ding-Dong")
 * Played before A1/A2 station & airport announcements (Q1 to Q7).
 */
export function playAirportChime(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return resolve();

      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.6);

      // Note 2: C5 (523.25 Hz) - Played 0.35s later
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(523.25, now + 0.35);
      gain2.gain.setValueAtTime(0.30, now + 0.35);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.35);
      osc2.stop(now + 1.1);

      setTimeout(resolve, 1100);
    } catch {
      resolve();
    }
  });
}

/**
 * 📞 Voicemail / Phone Message Beep ("Bip")
 * Played before A2 phone messages & answering machine recordings (Q8 to Q15).
 */
export function playVoicemailBeep(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return resolve();

      const now = ctx.currentTime;

      // Single High Beep: 1000 Hz for 0.25s
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

      setTimeout(resolve, 300);
    } catch {
      resolve();
    }
  });
}

/**
 * 📻 Radio News Flash Intro Jingle
 * Played before B1/B2 radio news broadcasts & public debates (Q16 to Q33).
 */
export function playRadioNewsJingle(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return resolve();

      const now = ctx.currentTime;

      // 3-Note Upward Arpeggio: A4 (440Hz), C#5 (554.37Hz), E5 (659.25Hz)
      const freqs = [440, 554.37, 659.25];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.20, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.4);
      });

      setTimeout(resolve, 750);
    } catch {
      resolve();
    }
  });
}

/**
 * Automatically triggers the authentic acoustic sound effect matching the TCF Listening Question item number!
 */
export async function triggerAcousticSoundForQuestion(qNum: number): Promise<void> {
  if (qNum >= 1 && qNum <= 7) {
    // A1: Airport / Train station announcement chime
    await playAirportChime();
  } else if (qNum >= 8 && qNum <= 15) {
    // A2: Voicemail / Phone beep
    await playVoicemailBeep();
  } else if (qNum >= 16 && qNum <= 33) {
    // B1/B2: Radio news flash jingle
    await playRadioNewsJingle();
  }
}
