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
  AlertTriangle,
  Radio
} from "lucide-react";
import type { ExamQuestion, ExamMode } from "~/lib/examSchema";
import { TEF_PAPER_1_LISTENING_GUIDANCE } from "~/lib/tefListeningGuidanceBank";

export interface TefListeningTextViewportProps {
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

export const TefListeningTextViewport: React.FC<TefListeningTextViewportProps> = ({
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
  const [showDrawerTranslation, setShowDrawerTranslation] = useState(true);

  // Automatically unroll coaching drawer upon answer verification in practice mode
  useEffect(() => {
    if (isChecked) {
      setShowCoaching(true);
    }
  }, [isChecked]);

  const guidance = TEF_PAPER_1_LISTENING_GUIDANCE[currentQ.id];

  // Derive official e-TEF section metadata
  const qNum = currentQ.questionNumber;
  let sectionLabel = "Section B (Questions 5 à 14)";
  let sectionTitle = "Messages téléphoniques et annonces publiques";
  let consigneText = "Vous allez entendre une annonce publique ou un message téléphonique. Lisez la question et choisissez la réponse exacte.";

  if (qNum >= 15 && qNum <= 20) {
    sectionLabel = "Section C (Questions 15 à 20)";
    sectionTitle = "Micro-trottoirs et sondages d'opinion";
    consigneText = "Vous allez entendre 6 personnes donner leur avis sur un sujet d'actualité. Identifiez l'opinion de chaque intervenant.";
  } else if (qNum >= 21 && qNum <= 37) {
    sectionLabel = "Section D (Questions 21 à 37)";
    sectionTitle = "Reportages d'actualité et débats radiophoniques";
    consigneText = "Vous allez entendre un extrait d'émission radiophonique. Lisez attentivement la question et cochez la bonne réponse.";
  } else if (qNum >= 38 && qNum <= 40) {
    sectionLabel = "Section E / Groupe 7 (Questions 38 à 40)";
    sectionTitle = "Actes de parole et intentions implicites (Niveau C1-C2)";
    consigneText = "Vous allez entendre une déclaration brève. Analysez le sous-entendu, la nuance modale ou l'acte de parole accompli par le locuteur.";
  }

  const isSelectedCorrect = selectedOption !== undefined && selectedOption === currentQ.correctIndex;

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
              {sectionLabel}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-extrabold text-slate-950 dark:text-slate-100">
            Question N°{currentQ.questionNumber} / {totalQuestions} — {sectionTitle}
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
          <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5" />
            <span>Consigne de l'épreuve</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border border-emerald-500/30 font-mono font-bold">
            1 Écoute Unique
          </span>
        </div>
        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {consigneText}
        </p>
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
                  ✅ Écoute terminée — Enregistrez votre réponse parmi les 4 propositions ci-dessous.
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

          {/* Active Audio Playhead & Equalizer in Practice Mode */}
          <div className="pt-1 space-y-1.5 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                {isSpeaking && !isAudioPaused && !isTimerPaused ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-3 bg-emerald-400 animate-pulse rounded-full" />
                    <span className="w-1.5 h-4 bg-emerald-500 animate-bounce rounded-full" />
                    <span className="w-1.5 h-2 bg-emerald-300 animate-pulse rounded-full" />
                    <span className="text-emerald-400 font-semibold ml-1">Diffusion audio active</span>
                  </span>
                ) : isAudioPaused || isTimerPaused ? (
                  <span className="text-amber-400 font-semibold">⏸ Lecture en pause</span>
                ) : (
                  <span className="text-slate-400">Prêt — Cliquez sur Écouter ▶️ pour lancer l'audio</span>
                )}
              </span>
              <span className="text-[10px] text-slate-500 font-sans">
                Mode Pratique (Guidé)
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isSpeaking && !isAudioPaused && !isTimerPaused
                    ? "w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 animate-pulse"
                    : isAudioPaused || isTimerPaused
                      ? "w-1/2 bg-amber-500"
                      : "w-0 bg-slate-700"
                }`}
              />
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

      {/* ─── 4. PROMINENT WRITTEN QUESTION STEM ─── */}
      <div className={`p-4 sm:p-5 rounded-xl border-2 ${cbtCard} shadow-sm space-y-1.5`}>
        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
          Question posée :
        </span>
        <h3 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-slate-50 leading-snug">
          {currentQ.text}
        </h3>
        {showTranslation && currentQ.questionEnglish && (
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 italic pt-1 flex items-center gap-1">
            <Globe className="w-3 h-3 shrink-0" />
            <span>Question (EN): "{currentQ.questionEnglish}"</span>
          </p>
        )}
      </div>

      {/* ─── 5. THE 4 VERTICALLY STACKED FULL-TEXT OPTION CARDS ─── */}
      <div className="space-y-3">
        {currentQ.options.map((optionText, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          const isChosen = selectedOption === idx;
          const isCorrect = idx === currentQ.correctIndex;

          let cardStyle = "";
          let badgeElement = null;

          if (isChecked) {
            if (isCorrect) {
              cardStyle = "border-emerald-600 ring-4 ring-emerald-500/40 bg-emerald-50/20 dark:bg-emerald-950/30 shadow-lg scale-[1.005]";
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
              cardStyle = "border-emerald-600 ring-2 ring-emerald-500 bg-emerald-50/25 dark:bg-emerald-950/20 shadow-md scale-[1.005]";
              badgeElement = (
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded">
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
              className={`group p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 ${
                isChecked ? "cursor-default" : "cursor-pointer active:scale-[0.99]"
              } ${cardStyle}`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                {/* Circular Letter Badge */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs sm:text-sm shrink-0 transition-all ${
                    isChecked && isCorrect
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : isChecked && isChosen
                        ? "border-rose-600 bg-rose-600 text-white"
                        : isChosen
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-400 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:border-emerald-500"
                  }`}
                >
                  {letter}
                </div>

                {/* Proposition Full Text */}
                <div className="space-y-0.5">
                  <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    {optionText}
                  </p>
                  {showTranslation && (currentQ as any).optionsEnglish && (currentQ as any).optionsEnglish[idx] && (
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 italic">
                      EN: {(currentQ as any).optionsEnglish[idx]}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              {badgeElement}
            </div>
          );
        })}
      </div>

      {/* ─── 6. POST-VALIDATION SUMMARY CARD (Practice Mode only: Strictly Mutually Exclusive) ─── */}
      {mode === "PRACTICE" && isChecked && (
        isSelectedCorrect ? (
          <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>✓ Excellente réponse ! (Option {String.fromCharCode(65 + currentQ.correctIndex)})</span>
            </div>
            <p className="text-xs mt-1 leading-relaxed text-emerald-900/90 dark:text-emerald-200">
              {currentQ.options[currentQ.correctIndex]}
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-sm transition-all">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                ⚠️ Attention : Vous avez sélectionné l'Option {selectedOption !== undefined ? String.fromCharCode(65 + selectedOption) : ""}. La bonne réponse était l'Option {String.fromCharCode(65 + currentQ.correctIndex)}.
              </span>
            </div>
            <p className="text-xs mt-1 leading-relaxed text-amber-900/90 dark:text-amber-200">
              <strong>Réponse exacte : </strong>{currentQ.options[currentQ.correctIndex]}
            </p>
          </div>
        )
      )}

      {/* ─── 7. INLINE BILINGUAL PEDAGOGICAL DRAWER (Practice Mode Only) ─── */}
      {mode === "PRACTICE" && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-50/40 dark:bg-amber-950/20 overflow-hidden shadow-sm">
          <div className="p-3 sm:p-3.5 flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-500/10 border-b border-amber-500/20">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>💡 Conseil Pédagogique TEF & Analyse Détaillée ({sectionTitle})</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDrawerTranslation(!showDrawerTranslation)}
                className="text-[11px] px-2.5 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 dark:text-amber-100 border border-amber-500/30 cursor-pointer font-mono transition-colors"
                title="Afficher/Masquer les traductions anglaises du dossier pédagogique"
              >
                {showDrawerTranslation ? "🌐 Traduction EN : Active" : "🌐 Traduction EN : Masquée"}
              </button>
              <button
                type="button"
                onClick={() => setShowCoaching(!showCoaching)}
                className="text-[11px] px-3 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-900 dark:text-amber-100 font-mono font-bold cursor-pointer transition-colors flex items-center gap-1"
              >
                <span>{showCoaching ? "Masquer l'analyse" : "Afficher l'analyse complète"}</span>
                <span>{showCoaching ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>

          {showCoaching && (
            <div className="p-4 space-y-4 text-xs">
              {/* ⚠️ Tier 1: Alerte Piège / Trap Alert (Inline Bilingual) */}
              {guidance?.trapAlert && (
                <div className="p-3.5 rounded-xl bg-amber-100/70 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 space-y-2">
                  <div className="font-extrabold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>⚠️ Alerte Piège Concours ({currentQ.level || "A2/B1"}) :</span>
                  </div>
                  <p className="leading-relaxed font-sans">{guidance.trapAlert}</p>

                  {showDrawerTranslation && guidance.trapAlertEn && (
                    <div className="mt-2 pt-2 border-t border-amber-300/70 dark:border-amber-700/60 text-amber-900 dark:text-amber-300 italic text-[11px] space-y-1">
                      <span className="font-bold not-italic block text-amber-950 dark:text-amber-200">
                        🇬🇧 Level {currentQ.level || "A2/B1"} Trap Alert:
                      </span>
                      <p>{guidance.trapAlertEn}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 🎯 Tier 2: Stratégie d'écoute & Mots-clés (Inline Bilingual) */}
              {guidance?.audioCoach && (
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200 space-y-2">
                  <div className="font-extrabold flex items-center gap-1.5 text-blue-800 dark:text-blue-300">
                    <Volume2 className="w-4 h-4" />
                    <span>🎯 Stratégie d'écoute & Mots-clés :</span>
                  </div>
                  <p className="leading-relaxed font-sans">{guidance.audioCoach}</p>

                  {showDrawerTranslation && guidance.audioCoachEn && (
                    <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 italic text-[11px] space-y-1">
                      <span className="font-bold not-italic block text-blue-950 dark:text-blue-200">
                        🇬🇧 Listening Coach & Target Vocabulary:
                      </span>
                      <p>{guidance.audioCoachEn}</p>
                    </div>
                  )}
                </div>
              )}

              {/* 📝 Tier 3: Analyse Détaillée des 4 Propositions (Inline Bilingual) */}
              {(guidance?.detailedExplanation || currentQ.explanation) && (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
                  <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>📝 Analyse Pédagogique Détaillée des 4 Propositions :</span>
                  </div>

                  {/* French Detailed Explanation */}
                  <div className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200 text-xs font-sans">
                    {guidance?.detailedExplanation || currentQ.explanation}
                  </div>

                  {/* English Pedagogical Translation Card (Inline) */}
                  {showDrawerTranslation && (guidance?.detailedExplanationEn || (currentQ as any).detailedExplanationEn) && (
                    <div className="mt-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/60 whitespace-pre-line leading-relaxed text-indigo-950 dark:text-indigo-200 text-[11px] space-y-1.5">
                      <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-xs">
                        🇬🇧 English Pedagogical Translation & Distractor Breakdown:
                      </span>
                      <div>
                        {guidance?.detailedExplanationEn || (currentQ as any).detailedExplanationEn}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ─── 8. BOTTOM NAVIGATION & VERIFICATION BAR ─── */}
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
    </div>
  );
};
