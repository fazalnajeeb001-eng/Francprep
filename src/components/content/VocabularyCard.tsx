import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { speak } from "~/lib/speech";

interface VocabItem {
  _id: string;
  french: string;
  english: string;
  pronunciation?: string;
  exampleSentence?: string;
  difficulty: string;
}

export function VocabularyCard({ word, onReviewLater }: { word: VocabItem; onReviewLater?: (id: string) => void }) {
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      layout
      className="relative cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        style={{ transformStyle: "preserve-3d" }}
      >
        {!flipped ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full">{word.difficulty}</span>
              <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); onReviewLater?.(word._id); }}
                className="text-gray-300 hover:text-purple-500 transition-colors">
                {saved ? <BookmarkCheck className="w-4 h-4 text-purple-500" /> : <Bookmark className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <button onClick={(e) => { e.stopPropagation(); speak(word.french); }}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:opacity-80 transition-all flex-shrink-0">
                <Volume2 className="w-4 h-4" />
              </button>
              <h4 className="text-lg font-bold">{word.french}</h4>
            </div>
            {word.pronunciation && <p className="text-xs text-gray-400 ml-10">{word.pronunciation}</p>}
            <p className="text-xs text-gray-400 mt-2">Tap to see meaning</p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-lg font-semibold text-gray-800 mb-2">{word.english}</p>
            {word.exampleSentence && (
              <p className="text-sm text-gray-500 italic mt-2" onClick={(e) => { e.stopPropagation(); speak(word.exampleSentence!); }}>
                "{word.exampleSentence}" <Volume2 className="w-3 h-3 inline text-purple-400" />
              </p>
            )}
            <p className="text-xs text-gray-400 mt-4">Tap to flip back</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function FlashcardComponent({ words }: { words: VocabItem[] }) {
  const [current, setCurrent] = useState(0);
  const word = words[current];

  if (!words.length) return <div className="text-gray-400 text-sm p-4">No vocabulary</div>;

  return (
    <div className="max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <span>{current + 1} / {words.length}</span>
        <button onClick={() => setCurrent(0)} className="flex items-center gap-1 text-xs hover:text-purple-500"><RotateCcw className="w-3 h-3" /> Restart</button>
      </div>
      <VocabularyCard word={word} />
      <div className="flex justify-between mt-4">
        <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
          className="px-4 py-2 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-50 transition-all">
          <ChevronLeft className="w-4 h-4 inline" /> Previous
        </button>
        <button onClick={() => setCurrent(Math.min(words.length - 1, current + 1))} disabled={current === words.length - 1}
          className="px-4 py-2 rounded-lg bg-purple-500 text-white text-sm disabled:opacity-30 hover:bg-purple-600 transition-all">
          Next <ChevronRight className="w-4 h-4 inline" />
        </button>
      </div>
    </div>
  );
}