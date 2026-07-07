import { useState, useRef } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  src: string;
  label?: string;
  transcript?: string;
  showTranscript?: boolean;
}

export function AudioPlayer({ src, label, transcript, showTranscript }: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [showTrans, setShowTrans] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
      <audio ref={audioRef} src={src} onEnded={() => setPlaying(false)} />
      <div className="flex items-center gap-3">
        <button onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0 shadow-sm">
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{label || "Listen"}</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 h-1.5 bg-white/60 rounded-full overflow-hidden">
              <div className={`h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all ${playing ? "w-full animate-pulse" : "w-0"}`} />
            </div>
            {transcript && (
              <button onClick={() => setShowTrans(!showTrans)} className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1 whitespace-nowrap">
                <Volume2 className="w-3 h-3" /> {showTrans ? "Hide" : "Transcript"}
              </button>
            )}
          </div>
        </div>
      </div>
      {showTrans && transcript && (
        <div className="mt-3 p-3 bg-white/60 rounded-xl border border-purple-100 text-sm text-gray-700 leading-relaxed">
          {transcript}
        </div>
      )}
    </div>
  );
}

export function SpeakingRecorder({ onSave }: { onSave?: (blob: Blob) => void }) {
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const toggleRecord = async () => {
    if (recording) {
      mediaRef.current?.stop();
      setRecording(false);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        onSave?.(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      mediaRef.current = recorder;
      setRecording(true);
    }
  };

  return (
    <button onClick={toggleRecord}
      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${recording ? "bg-red-500 animate-pulse" : "bg-gradient-to-br from-purple-500 to-indigo-500 hover:opacity-90"}`}>
      <div className={`w-6 h-6 ${recording ? "bg-white rounded-sm" : "bg-white rounded-full"}`} />
    </button>
  );
}

export function WritingSubmission({ onSubmit }: { onSubmit?: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="space-y-3">
      <textarea value={text} onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-4 rounded-xl border border-gray-200 text-sm resize-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
        placeholder="Write your answer in French..." />
      <button onClick={() => { onSubmit?.(text); setText(""); }}
        disabled={!text.trim()}
        className="px-6 py-2 bg-purple-500 text-white text-sm rounded-lg disabled:opacity-30 hover:bg-purple-600 transition-all">
        Submit
      </button>
    </div>
  );
}

export function ReadingExercise({ passage, questions }: { passage: string; questions: any[] }) {
  return (
    <div className="space-y-4">
      <div className="p-5 bg-white rounded-2xl border border-gray-200 text-sm leading-relaxed text-gray-800 whitespace-pre-line">
        {passage}
      </div>
      {questions.length > 0 && <QuizComponent questions={questions} type="multiple_choice" />}
    </div>
  );
}

export function ListeningExercise({ src, transcript, questions }: { src: string; transcript?: string; questions: any[] }) {
  return (
    <div className="space-y-4">
      <AudioPlayer src={src} label="Listen to the audio" transcript={transcript} showTranscript />
      {questions.length > 0 && <QuizComponent questions={questions} type="multiple_choice" />}
    </div>
  );
}

export function ProgressTracker({ completed, total, label }: { completed: number; total: number; label?: string }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      {label && <div className="flex items-center justify-between text-xs text-gray-500"><span>{label}</span><span>{pct}%</span></div>}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}