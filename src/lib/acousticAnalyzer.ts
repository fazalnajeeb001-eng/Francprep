/**
 * 🇨🇦 FrancPrep Web Audio API Acoustic Signal Analyzer with Hardware Noise Suppression
 * Standardized Acoustic Signal Processing & Dynamic Noise Floor Calibration for TCF Canada Expression Orale.
 */

export interface AcousticAnalysisResult {
  speechRateWpm: number;
  hesitationPauseCount: number;
  totalSilenceDurationSec: number;
  totalSpeechDurationSec: number;
  fluencyIndexPct: number;
  averageDecibels: number;
  ambientNoiseFloorDb: number;
}

class AcousticSignalAnalyzer {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private animFrameId: number | null = null;

  private startTime: number = 0;
  private silenceStartTime: number = 0;
  private totalSilenceSec: number = 0;
  private totalSpeechSec: number = 0;
  private hesitationPauseCount: number = 0;
  private decibelSum: number = 0;
  private sampleCount: number = 0;

  // Dynamic Ambient Noise Floor Calibration (first 600ms)
  private noiseFloorSum: number = 0;
  private noiseFloorSamples: number = 0;
  private ambientNoiseFloorDb: number = -55;
  private speechThresholdDb: number = -42;
  private isCalibrated: boolean = false;

  private isCurrentlySilent: boolean = false;
  private isAnalyzing: boolean = false;

  public startAnalysis(stream: MediaStream): boolean {
    if (typeof window === "undefined" || !stream) return false;

    try {
      this.stopAnalysis();

      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return false;

      this.audioCtx = new AudioCtxClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;

      this.source = this.audioCtx.createMediaStreamSource(stream);
      this.source.connect(this.analyser);

      this.startTime = Date.now();
      this.silenceStartTime = 0;
      this.totalSilenceSec = 0;
      this.totalSpeechSec = 0;
      this.hesitationPauseCount = 0;
      this.decibelSum = 0;
      this.sampleCount = 0;
      this.noiseFloorSum = 0;
      this.noiseFloorSamples = 0;
      this.ambientNoiseFloorDb = -55;
      this.speechThresholdDb = -42;
      this.isCalibrated = false;
      this.isCurrentlySilent = false;
      this.isAnalyzing = true;

      this.processAudioFrame();
      return true;
    } catch (e) {
      console.error("Failed to initialize Web Audio API acoustic analyzer:", e);
      return false;
    }
  }

  private processAudioFrame = () => {
    if (!this.isAnalyzing || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const averageVolume = sum / dataArray.length;
    const decibels = 20 * Math.log10((averageVolume + 1) / 256);

    const now = Date.now();
    const elapsedMs = now - this.startTime;

    // Initial 600ms: Dynamic Noise Floor Baseline Calibration
    if (elapsedMs < 600) {
      this.noiseFloorSum += decibels;
      this.noiseFloorSamples += 1;
      this.animFrameId = requestAnimationFrame(this.processAudioFrame);
      return;
    }

    if (!this.isCalibrated) {
      this.isCalibrated = true;
      if (this.noiseFloorSamples > 0) {
        this.ambientNoiseFloorDb = Math.round((this.noiseFloorSum / this.noiseFloorSamples) * 10) / 10;
        // Speech threshold is dynamically set 10 dB above the calibrated ambient noise floor (min -42 dB)
        this.speechThresholdDb = Math.max(-42, Math.round(this.ambientNoiseFloorDb + 10));
      }
    }

    this.decibelSum += decibels;
    this.sampleCount += 1;

    // Filter background noise using dynamic threshold
    const isSilentFrame = decibels < this.speechThresholdDb;

    if (isSilentFrame) {
      if (!this.isCurrentlySilent) {
        this.isCurrentlySilent = true;
        this.silenceStartTime = now;
      } else {
        const currentPauseSec = (now - this.silenceStartTime) / 1000;
        // Detect long hesitation pause (> 1.5 seconds)
        if (currentPauseSec >= 1.5 && (now - this.silenceStartTime) % 1500 < 50) {
          this.hesitationPauseCount += 1;
        }
      }
    } else {
      if (this.isCurrentlySilent) {
        const pauseDurationSec = (now - this.silenceStartTime) / 1000;
        this.totalSilenceSec += pauseDurationSec;
        this.isCurrentlySilent = false;
      }
    }

    this.animFrameId = requestAnimationFrame(this.processAudioFrame);
  };

  public stopAnalysis(totalWordsSpoken: number = 0): AcousticAnalysisResult {
    this.isAnalyzing = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    const totalDurationSec = this.startTime > 0 ? (Date.now() - this.startTime) / 1000 : 1;
    if (this.isCurrentlySilent && this.silenceStartTime > 0) {
      this.totalSilenceSec += (Date.now() - this.silenceStartTime) / 1000;
    }

    const activeSpeechSec = Math.max(0.5, totalDurationSec - this.totalSilenceSec);
    const activeSpeechMins = activeSpeechSec / 60;
    
    // Words per Minute (WPM) calculation based on active speech time
    const speechRateWpm = Math.round(totalWordsSpoken > 0 && activeSpeechMins > 0 ? totalWordsSpoken / activeSpeechMins : 0);

    // Fluency Index (%) = ratio of active speech time vs. total recording time
    const fluencyIndexPct = Math.min(100, Math.max(10, Math.round((activeSpeechSec / totalDurationSec) * 100)));

    const averageDecibels = this.sampleCount > 0 ? Math.round((this.decibelSum / this.sampleCount) * 10) / 10 : -30;

    if (this.audioCtx && this.audioCtx.state !== "closed") {
      try {
        this.audioCtx.close();
      } catch {}
    }

    this.audioCtx = null;
    this.analyser = null;
    this.source = null;

    return {
      speechRateWpm,
      hesitationPauseCount: this.hesitationPauseCount,
      totalSilenceDurationSec: Math.round(this.totalSilenceSec * 10) / 10,
      totalSpeechDurationSec: Math.round(activeSpeechSec * 10) / 10,
      fluencyIndexPct,
      averageDecibels,
      ambientNoiseFloorDb: this.ambientNoiseFloorDb
    };
  }
}

export const acousticAnalyzer = new AcousticSignalAnalyzer();
