import React, { useState, useEffect } from "react";
import {
  Volume2,
  CheckCircle2,
  Clock,
  Flag,
  Globe,
  FileText,
  Play,
  Pause,
  Sparkles,
  Search,
  X,
  AlertTriangle
} from "lucide-react";
import type { ExamQuestion, ExamMode } from "~/lib/examSchema";
import { TEF_PAPER_1_LISTENING_GUIDANCE } from "~/lib/tefListeningGuidanceBank";

export interface TefListeningDessinViewportProps {
  currentQ: ExamQuestion;
  currentQuestionIdx: number;
  totalQuestions: number;
  mode: ExamMode;
  cbtCard: string;
  cbtDark: boolean;
  isAudioFinished: boolean;
  isSpeaking: boolean;
  isAudioPaused: boolean;
  isTimerPaused: boolean;
  qTimeLeft: number | null;
  selectedOption: number | undefined;
  isFlagged: boolean;
  isChecked?: boolean;
  onSelectOption: (optionIndex: number) => void;
  onToggleFlag: () => void;
  onPlayAudio: () => void;
  onPauseResumeAudio: () => void;
  onCheckAnswer?: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isAdmin: boolean;
  showTranslation: boolean;
  onToggleTranslation: () => void;
}

export const TefListeningDessinViewport: React.FC<TefListeningDessinViewportProps> = ({
  currentQ,
  currentQuestionIdx,
  totalQuestions,
  mode,
  cbtCard,
  cbtDark,
  isAudioFinished,
  isSpeaking,
  isAudioPaused,
  isTimerPaused,
  qTimeLeft,
  selectedOption,
  isFlagged,
  isChecked = false,
  onSelectOption,
  onToggleFlag,
  onPlayAudio,
  onPauseResumeAudio,
  onCheckAnswer,
  onPrevious,
  onNext,
  isAdmin,
  showTranslation,
  onToggleTranslation
}) => {
  const [showTranscript, setShowTranscript] = useState(false);
  const [showCoaching, setShowCoaching] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // When answer is checked in practice mode, automatically expand coaching drawer
  useEffect(() => {
    if (isChecked) {
      setShowCoaching(true);
    }
  }, [isChecked]);

  const guidance = TEF_PAPER_1_LISTENING_GUIDANCE[currentQ.id];

  const optionDrawings = (currentQ as any).optionImages && (currentQ as any).optionImages.length === 4
    ? (currentQ as any).optionImages
    : [
        (currentQ as any).mainImage || `/illustrations/tef/tef_p1_q${currentQ.questionNumber}_a.png`,
        `/illustrations/tef/tef_p1_q${currentQ.questionNumber}_b.png`,
        `/illustrations/tef/tef_p1_q${currentQ.questionNumber}_c.png`,
        `/illustrations/tef/tef_p1_q${currentQ.questionNumber}_d.png`
      ];

  return (
    <div className="max-w-4xl mx-auto w-full space-y-4 px-2 sm:px-4 py-2">
      {/* ─── 1. TOP STATUS & SECTION BAR ─── */}
      <div className={`p-3 sm:p-4 rounded-xl border ${cbtCard} shadow-sm flex items-center justify-between`}>
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              TEF Canada — Compréhension Orale
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-500/30">
              Section A (Questions 1 à 4)
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-slate-100">
            Question N°{currentQ.questionNumber} / {totalQuestions} — Identification de dessin
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {qTimeLeft !== null && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>⏱️ {qTimeLeft}s</span>
            </div>
          )}

          <button
            type="button"
            onClick={onToggleFlag}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
              isFlagged
                ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-600 ring-2 ring-amber-400/40"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? "fill-white text-white" : "text-amber-500"}`} />
            <span className="hidden sm:inline">{isFlagged ? "Marqué" : "Marquer"}</span>
          </button>
        </div>
      </div>

      {/* ─── 2. OFFICIAL E-TEF CONSIGNE BOX ─── */}
      <div className={`p-3.5 sm:p-4 rounded-xl border ${cbtCard} shadow-sm space-y-1.5`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            Consigne de l'épreuve
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 font-mono font-bold">
            1 Écoute Unique
          </span>
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
          Vous allez entendre une conversation. Indiquez à quel dessin correspond cette conversation.
        </p>
        {showTranslation && (
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 italic pt-1 flex items-center gap-1">
            <Globe className="w-3 h-3 shrink-0" />
            <span>Question (EN): "Look at the 4 drawings. Which drawing corresponds to the conversation heard?"</span>
          </p>
        )}
      </div>

      {/* ─── 3. OFFICIAL CBT AUDIO BAR ─── */}
      {mode === "EXAM" ? (
        <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            {!isAudioFinished || isSpeaking ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-emerald-300">
                  🎧 [Document sonore en cours de diffusion...] (1 ÉCOUTE UNIQUE - NO PAUSE/SEEK)
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200">
                  ✅ Écoute terminée — Enregistrez votre réponse en cliquant sur le dessin choisi.
                </span>
              </>
            )}
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono font-bold">
            {qTimeLeft !== null ? `⏱️ ${qTimeLeft}s restantes` : "Temps de réponse"}
          </span>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-sm space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              {isSpeaking ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-300">🎧 Lecture audio en cours...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200">Prêt pour l'écoute ou sélection</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTranscript(!showTranscript)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 border cursor-pointer ${
                  showTranscript
                    ? "bg-purple-700 text-white border-purple-800"
                    : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showTranscript ? "Masquer" : "📄 Transcription"}</span>
              </button>

              <button
                type="button"
                onClick={onToggleTranslation}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all flex items-center gap-1 border cursor-pointer ${
                  showTranslation
                    ? "bg-indigo-700 text-white border-indigo-800"
                    : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{showTranslation ? "Masquer EN" : "🌐 Translation"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (isSpeaking || isAudioPaused || isTimerPaused) {
                    onPauseResumeAudio();
                  } else {
                    onPlayAudio();
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer active:scale-95 transition-all"
              >
                {isSpeaking && !isAudioPaused && !isTimerPaused ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Écouter ▶️</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {showTranscript && currentQ.transcript && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed">
              {currentQ.transcript}
            </div>
          )}
          {showTranslation && currentQ.transcriptEnglish && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-indigo-300 italic whitespace-pre-line leading-relaxed">
              "{currentQ.transcriptEnglish}"
            </div>
          )}
        </div>
      )}

      {/* ─── 4. THE 2x2 GRID OF FOUR DRAWING CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentQ.options.map((_, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          const isChosen = selectedOption === idx;
          const isCorrect = idx === currentQ.correctIndex;
          const imgUrl = optionDrawings[idx] || (currentQ as any).mainImage;

          // Compute dynamic card style based on verification state
          let cardStyle = "";
          let badgeElement = null;

          if (isChecked) {
            if (isCorrect) {
              cardStyle = "border-emerald-600 ring-4 ring-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/30 shadow-lg scale-[1.01]";
              badgeElement = (
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-0.5 rounded flex items-center gap-1 shadow">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>✓ Bonne réponse</span>
                </span>
              );
            } else if (isChosen) {
              cardStyle = "border-rose-600 ring-4 ring-rose-500/40 bg-rose-50/25 dark:bg-rose-950/30 shadow-md";
              badgeElement = (
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-rose-600 text-white px-2.5 py-0.5 rounded flex items-center gap-1 shadow">
                  <X className="w-3 h-3" />
                  <span>✕ Réponse incorrecte</span>
                </span>
              );
            } else {
              cardStyle = "border-slate-300 dark:border-slate-800 opacity-50 grayscale-[25%]";
            }
          } else {
            if (isChosen) {
              cardStyle = "border-emerald-600 ring-2 ring-emerald-500 bg-emerald-50/25 dark:bg-emerald-950/20 shadow-md scale-[1.01]";
              badgeElement = (
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-white/25 text-white px-2 py-0.5 rounded">
                  Choisi ✓
                </span>
              );
            } else {
              cardStyle = cbtDark
                ? "bg-slate-800/90 border-slate-700 hover:border-emerald-500/60"
                : "bg-white border-slate-200 hover:border-emerald-500/70 hover:shadow-md";
            }
          }

          return (
            <div
              key={idx}
              onClick={() => {
                if (!isChecked) onSelectOption(idx);
              }}
              className={`group relative rounded-2xl border-2 overflow-hidden transition-all duration-200 shadow-sm flex flex-col justify-between ${
                isChecked ? "cursor-default" : "cursor-pointer active:scale-[0.99]"
              } ${cardStyle}`}
            >
              {/* Card Image Viewport */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white flex items-center justify-center p-3">
                <img
                  src={imgUrl}
                  alt={`Dessin ${letter}`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImage(imgUrl);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 rounded-md bg-slate-900/70 hover:bg-slate-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Agrandir"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Bottom Label Bar with Radio Button */}
              <div
                className={`px-4 py-3 flex items-center justify-between font-bold text-sm border-t transition-colors ${
                  isChecked && isCorrect
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : isChecked && isChosen
                      ? "bg-rose-600 text-white border-rose-600"
                      : isChosen
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : cbtDark
                          ? "bg-slate-900 text-slate-200 border-slate-700 group-hover:bg-slate-800"
                          : "bg-slate-50 text-slate-800 border-slate-200 group-hover:bg-emerald-50/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      isChecked && isCorrect
                        ? "border-white bg-white text-emerald-600 font-bold"
                        : isChecked && isChosen
                          ? "border-white bg-white text-rose-600 font-bold"
                          : isChosen
                            ? "border-white bg-white text-emerald-600 font-bold"
                            : "border-slate-400 bg-white dark:bg-slate-800"
                    }`}
                  >
                    {isChosen && <div className={`w-2.5 h-2.5 rounded-full ${isChecked && !isCorrect ? "bg-rose-600" : "bg-emerald-600"}`} />}
                  </div>
                  <span className="font-sans font-bold text-sm tracking-wide">Dessin {letter}</span>
                </div>

                {badgeElement}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 5. PRACTICE MODE EXPANDED PEDAGOGICAL GUIDANCE (Strictly hidden in Exam Mode) ─── */}
      {mode === "PRACTICE" && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 overflow-hidden shadow-sm">
          <div className="p-3 sm:p-3.5 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-500/10 border-b border-amber-500/20">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>💡 Conseil Pédagogique TEF & Analyse Détaillée (Section A - Dessins)</span>
            </span>
            <button
              type="button"
              onClick={() => setShowCoaching(!showCoaching)}
              className="text-[11px] px-3 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-100 font-mono font-bold cursor-pointer transition-colors flex items-center gap-1"
            >
              <span>{showCoaching ? "Masquer l'analyse" : "Afficher l'analyse complète"}</span>
              <span>{showCoaching ? "▲" : "▼"}</span>
            </button>
          </div>

          {showCoaching && (
            <div className="p-4 space-y-3.5 text-xs">
              {/* Trap Alert */}
              {guidance?.trapAlert && (
                <div className="p-3 rounded-lg bg-amber-100/60 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Alerte Piège A1/A2 :</span>
                  </div>
                  <p className="leading-relaxed">{guidance.trapAlert}</p>
                  {showTranslation && guidance.trapAlertEn && (
                    <p className="italic text-amber-800 dark:text-amber-400 text-[11px] pt-1 border-t border-amber-200 dark:border-amber-800/60">
                      🇬🇧 {guidance.trapAlertEn}
                    </p>
                  )}
                </div>
              )}

              {/* Audio Coach */}
              {guidance?.audioCoach && (
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-blue-800 dark:text-blue-300">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Stratégie d'écoute & Mots-clés :</span>
                  </div>
                  <p className="leading-relaxed">{guidance.audioCoach}</p>
                  {showTranslation && guidance.audioCoachEn && (
                    <p className="italic text-blue-800 dark:text-blue-400 text-[11px] pt-1 border-t border-blue-200 dark:border-blue-800/60">
                      🇬🇧 {guidance.audioCoachEn}
                    </p>
                  )}
                </div>
              )}

              {/* Full Detailed Pedagogical Breakdown & Distractor Analysis */}
              {(guidance?.detailedExplanation || currentQ.explanation) && (
                <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>🎯 Justification textuelle & Analyse complète des 4 dessins :</span>
                  </div>
                  <div className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200 text-xs font-sans">
                    {guidance?.detailedExplanation || currentQ.explanation}
                  </div>
                  {showTranslation && (guidance?.detailedExplanationEn || (currentQ as any).detailedExplanationEn) && (
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 whitespace-pre-line leading-relaxed text-indigo-900 dark:text-indigo-300 italic text-[11px]">
                      <span className="font-bold text-indigo-800 dark:text-indigo-400 not-italic block mb-1">
                        🇬🇧 English Pedagogical Translation:
                      </span>
                      {guidance?.detailedExplanationEn || (currentQ as any).detailedExplanationEn}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ─── 6. BOTTOM NAVIGATION & VERIFICATION BAR ─── */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 gap-3">
        <button
          disabled={currentQuestionIdx === 0 || (!isAdmin && mode === "EXAM")}
          onClick={onPrevious}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
            currentQuestionIdx === 0 || (!isAdmin && mode === "EXAM")
              ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border-slate-300"
              : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-300 cursor-pointer"
          }`}
        >
          ← Question précédente
        </button>

        <div className="flex items-center gap-3">
          {/* Practice Mode Instant Check Button */}
          {mode === "PRACTICE" && (
            <button
              disabled={selectedOption === undefined || isChecked}
              onClick={onCheckAnswer}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                isChecked
                  ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-400 cursor-default"
                  : selectedOption === undefined
                    ? "opacity-40 cursor-not-allowed bg-slate-200 text-slate-500 border border-slate-300"
                    : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg ring-2 ring-purple-400/40 cursor-pointer active:scale-95 animate-pulse"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isChecked ? "✅ Réponse vérifiée" : "🔍 Vérifier la réponse"}</span>
            </button>
          )}

          <button
            onClick={onNext}
            className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
          >
            <span>Valider & Suivant →</span>
          </button>
        </div>
      </div>

      {/* Zoom Modal if candidate clicks search icon */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-3xl max-h-[85vh] bg-white rounded-2xl overflow-hidden p-2">
            <img src={zoomedImage} alt="Zoomed Drawing" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};
