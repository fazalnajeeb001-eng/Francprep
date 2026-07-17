import { useState, useRef } from "react";
import { Play, Pause, Volume2, PenTool, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useTheme } from "~/lib/ThemeContext";
import { apiFetch } from "~/lib/apiFetch";
import { QuizComponent } from "./QuizComponent";

interface AudioPlayerProps {
  src: string;
  label?: string;
  transcript?: string;
  showTranscript?: boolean;
}

export function AudioPlayer({ src, label, transcript }: AudioPlayerProps) {
  const { dark } = useTheme();
  const [playing, setPlaying] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div className={`rounded-2xl p-4 border ${dark ? "bg-purple-500/10 border-purple-500/30" : "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100"}`}>
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      <div className="flex items-center gap-3">
        <button onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0 shadow-sm">
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className={`text-sm font-medium ${dark ? "text-gray-200" : "text-gray-800"}`}>{label || "Listen"}</div>
          <div className="flex items-center gap-3 mt-1">
            <div className={`flex-1 h-1.5 ${dark ? "bg-gray-700" : "bg-white/60"} rounded-full overflow-hidden`}>
              <div className={`h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all ${playing ? "w-full animate-pulse" : "w-0"}`} />
            </div>
            {transcript && (
              <button onClick={() => setShowTrans(!showTrans)} className={`text-xs ${dark ? "text-purple-400" : "text-purple-600"} flex items-center gap-1 whitespace-nowrap`}>
                <Volume2 className="w-3 h-3" /> {showTrans ? "Hide" : "Transcript"}
              </button>
            )}
          </div>
        </div>
      </div>
      {showTrans && transcript && (
        <div className={`mt-3 p-3 rounded-xl border text-sm leading-relaxed ${dark ? "bg-[#0a0e1a] border-purple-500/20 text-gray-300" : "bg-white/60 border-purple-100 text-gray-700"}`}>
          {transcript}
        </div>
      )}
    </div>
  );
}

interface SpeakingFeedback {
  transcription: string;
  feedback: string;
  score: number;
  accuracy: number;
  fluency: number;
  corrections: string[];
  tips: string[];
}

export function SpeakingRecorder({ onSave, expectedText, lessonTitle }: {
  onSave?: (blob: Blob) => void;
  expectedText?: string;
  lessonTitle?: string;
}) {
  const { dark } = useTheme();
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [feedback, setFeedback] = useState<SpeakingFeedback | null>(null);
  const [error, setError] = useState("");
  const [mediaSupported, setMediaSupported] = useState(true);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const getSupportedMimeType = (): string => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/ogg;codecs=opus',
      'audio/wav',
    ];
    for (const type of types) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return '';
  };

  const toggleRecord = async () => {
    if (recording) {
      mediaRef.current?.stop();
      return;
    }
    setFeedback(null);
    setError("");

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setMediaSupported(false);
      setError("Recording is not supported on this device. Try Chrome or Firefox.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || recorder.mimeType || 'audio/webm' });
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setRecording(false);
        onSave?.(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      mediaRef.current = recorder;
      setRecording(true);
    } catch (e: any) {
      if (e?.name === 'NotAllowedError' || e?.name === 'PermissionDeniedError') {
        setError("Microphone permission denied. Please allow microphone access in your browser settings.");
      } else if (e?.name === 'NotFoundError') {
        setError("No microphone found. Please connect a microphone.");
      } else {
        setError("Could not access microphone. Please try again.");
      }
    }
  };

  const transcribeAndAnalyze = async () => {
    if (!audioUrl) return;
    setTranscribing(true);
    setError("");
    setFeedback(null);
    try {
      const res = await fetch(audioUrl);
      const blob = await res.blob();
      const { WhisperTranscriber } = await import("whisper-web-transcriber");
      const transcriber = new WhisperTranscriber({
        modelSize: "base-en-q5_1",
      });
      await transcriber.loadModel();
      const ext = blob.type.includes('mp4') ? 'm4a' : blob.type.includes('ogg') ? 'ogg' : 'webm';
      const audioFile = new File([blob], `recording.${ext}`, { type: blob.type });
      const result = await (transcriber as any).transcribe(audioFile);
      const transcription = result.text || "";
      if (expectedText && transcription) {
        const analyzeRes = await apiFetch("/writing/speaking-analysis", {
          method: "POST",
          body: JSON.stringify({ transcription, expectedText, lessonTitle }),
        });
        const json = await analyzeRes.json();
        if (json.success && json.data) {
          setFeedback(json.data);
        }
      }
    } catch (e) {
      console.error("Whisper failed:", e);
      setError("Transcription not available on this device. Try Chrome on desktop.");
    } finally {
      setTranscribing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <button onClick={toggleRecord} disabled={transcribing || !mediaSupported}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${recording ? "bg-red-500 animate-pulse" : transcribing ? "bg-gray-500" : "bg-gradient-to-br from-purple-500 to-indigo-500 hover:opacity-90"}`}>
        <div className={`w-6 h-6 ${recording ? "bg-white rounded-sm" : "bg-white rounded-full"}`} />
      </button>
      {recording && <p className={`text-xs ${dark ? "text-red-400" : "text-red-500"}`}>Recording... tap to stop</p>}
      {transcribing && <p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>Analyzing your speech...</p>}
      {error && <p className="text-xs text-red-400 text-center px-2">{error}</p>}
      {audioUrl && !recording && (
        <div className={`w-full p-3 rounded-xl border ${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
          <p className={`text-xs mb-2 ${dark ? "text-gray-400" : "text-gray-500"}`}>Your recording:</p>
          <audio src={audioUrl} controls preload="metadata" className="w-full h-10" />
          {expectedText && (
            <button onClick={transcribeAndAnalyze} disabled={transcribing}
              className="mt-3 w-full px-4 py-2.5 text-sm font-semibold bg-purple-500 text-white rounded-xl hover:opacity-80 disabled:opacity-30 transition-all active:scale-95">
              {transcribing ? "Analyzing..." : "Analyze My Speaking"}
            </button>
          )}
        </div>
      )}
      {feedback && (
        <div className={`w-full max-w-sm p-4 rounded-xl border space-y-3 ${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <p className={`text-sm font-semibold ${dark ? "text-white" : "text-gray-900"}`}>Speaking Score</p>
            <span className={`text-lg font-bold ${feedback.score >= 70 ? "text-emerald-400" : feedback.score >= 40 ? "text-amber-400" : "text-red-400"}`}>
              {feedback.score}/100
            </span>
          </div>
          <div className="flex gap-4 text-xs">
            <div><span className={dark ? "text-gray-400" : "text-gray-500"}>Accuracy:</span> <span className="font-semibold">{feedback.accuracy}%</span></div>
            <div><span className={dark ? "text-gray-400" : "text-gray-500"}>Fluency:</span> <span className="font-semibold">{feedback.fluency}%</span></div>
          </div>
          {feedback.transcription && (
            <div><p className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>You said:</p><p className={`text-sm italic ${dark ? "text-gray-300" : "text-gray-700"}`}>"{feedback.transcription}"</p></div>
          )}
          <p className={`text-xs ${dark ? "text-gray-300" : "text-gray-600"}`}>{feedback.feedback}</p>
          {feedback.corrections.length > 0 && (
            <div><p className={`text-xs font-semibold ${dark ? "text-purple-400" : "text-purple-600"}`}>Corrections:</p>
              {feedback.corrections.map((c, i) => <p key={i} className={`text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>• {c}</p>)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface WritingFeedback {
  feedback: string;
  score: number;
  corrections: string[];
  tips: string[];
}

export function WritingSubmission({ onSubmit, lessonTitle, expectedAnswer, checklist }: {
  onSubmit?: (text: string) => void;
  lessonTitle?: string;
  expectedAnswer?: string;
  checklist?: string[];
}) {
  const { dark } = useTheme();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setFeedback(null);
    try {
      const res = await apiFetch("/writing/feedback", {
        method: "POST",
        body: JSON.stringify({
          text: text.trim(),
          lessonTitle,
          expectedAnswer,
          checklist,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setFeedback(json.data);
        onSubmit?.(text);
      } else {
        setError(json.error || "Failed to get feedback. Please try again.");
      }
    } catch (e) {
      setError("Could not connect to AI service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea value={text} onChange={(e) => { setText(e.target.value); setFeedback(null); setError(""); }}
        className={`w-full h-32 p-4 rounded-xl border text-sm resize-none outline-none transition-all ${
          dark
            ? "bg-[#0a0e1a] border-[#1e2a4a] text-gray-200 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 placeholder-gray-500"
            : "border-gray-200 focus:border-purple-300 focus:ring-2 focus:ring-purple-100 placeholder-gray-400"
        }`}
        placeholder="Write your answer in French..." />
      <button onClick={handleSubmit}
        disabled={!text.trim() || loading}
        className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-purple-600 transition-all">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Evaluating...</> : <><PenTool className="w-4 h-4" /> Get AI Feedback</>}
      </button>

      {error && (
        <div className={`p-3 rounded-xl border text-sm ${dark ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-red-50 border-red-200 text-red-600"}`}>
          {error}
        </div>
      )}

      {feedback && (
        <div className={`rounded-xl border p-4 space-y-3 ${dark ? "bg-[#101828]/80 border-[#1e2a4a]" : "bg-white border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <div className={`text-2xl font-bold ${feedback.score >= 70 ? "text-emerald-400" : feedback.score >= 40 ? "text-amber-400" : "text-red-400"}`}>
              {feedback.score}/100
            </div>
            <p className={`text-sm flex-1 ${dark ? "text-gray-300" : "text-gray-700"}`}>{feedback.feedback}</p>
          </div>

          {feedback.corrections.length > 0 && (
            <div>
              <p className={`text-xs font-semibold mb-1 ${dark ? "text-red-400" : "text-red-600"}`}>Corrections:</p>
              {feedback.corrections.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1">
                  <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>{c}</span>
                </div>
              ))}
            </div>
          )}

          {feedback.tips.length > 0 && (
            <div>
              <p className={`text-xs font-semibold mb-1 ${dark ? "text-purple-400" : "text-purple-600"}`}>Tips:</p>
              {feedback.tips.map((t, i) => (
                <div key={i} className="flex items-start gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className={`text-xs ${dark ? "text-gray-400" : "text-gray-600"}`}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ReadingExercise({ passage, questions }: { passage: string; questions: any[] }) {
  const { dark } = useTheme();
  return (
    <div className="space-y-4">
      <div className={`p-5 rounded-2xl border text-sm leading-relaxed whitespace-pre-line ${
        dark ? "bg-[#101828]/80 border-[#1e2a4a] text-gray-300" : "bg-white border-gray-200 text-gray-800"
      }`}>
        {passage}
      </div>
      {questions.length > 0 && <QuizComponent questions={questions} type="multiple_choice" />}
    </div>
  );
}

export function ListeningExercise({ src, transcript, questions }: { src: string; transcript?: string; questions: any[] }) {
  return (
    <div className="space-y-4">
      <AudioPlayer src={src} label="Listen to the audio" transcript={transcript} />
      {questions.length > 0 && <QuizComponent questions={questions} type="multiple_choice" />}
    </div>
  );
}

export function ProgressTracker({ completed, total, label }: { completed: number; total: number; label?: string }) {
  const { dark } = useTheme();
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      {label && (
        <div className={`flex items-center justify-between text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>
          <span>{label}</span><span>{pct}%</span>
        </div>
      )}
      <div className={`h-2 ${dark ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}>
        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}