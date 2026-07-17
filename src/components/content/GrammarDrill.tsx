import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface DrillInputProps {
  correctAnswer: string;
  dark: boolean;
}

function DrillInput({ correctAnswer, dark }: DrillInputProps) {
  const [val, setVal] = useState("");
  const [result, setResult] = useState<boolean | null>(null);

  return (
    <span className="inline-flex items-center gap-1 mx-0.5">
      <input
        type="text"
        value={val}
        onChange={(e) => { setVal(e.target.value); setResult(null); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const correct = val.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
            setResult(correct);
          }
        }}
        className={`w-28 inline-block px-2 py-0.5 text-sm border-b-2 bg-transparent focus:outline-none text-center ${
          result === true ? "border-emerald-400 text-emerald-400" :
          result === false ? "border-red-400 text-red-400" :
          dark ? "border-purple-500/50 text-gray-200" : "border-purple-300 text-gray-800"
        }`}
        placeholder="______"
      />
      {result !== null && (
        <span className="text-xs">
          {result ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" /> : <XCircle className="w-3.5 h-3.5 text-red-400 inline" />}
        </span>
      )}
    </span>
  );
}

export function GrammarDrill({ body, dark, textBody }: { body: string; dark: boolean; textBody: string }) {
  const parts: { text: string; isBlank: boolean; key: string }[] = [];
  const answerMap: Record<string, string> = {};
  const regex = /____\[answer:(.*?)\]/g;
  let lastIndex = 0;
  let match;
  let idx = 0;
  while ((match = regex.exec(body)) !== null) {
    if (match.index > lastIndex) parts.push({ text: body.slice(lastIndex, match.index), isBlank: false, key: "" });
    const key = `blank-${idx}`;
    parts.push({ text: "", isBlank: true, key });
    answerMap[key] = match[1];
    idx++;
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < body.length) parts.push({ text: body.slice(lastIndex), isBlank: false, key: "" });

  return (
    <p className={`text-sm ${textBody} whitespace-pre-line leading-relaxed`}>
      {parts.map((part) =>
        part.isBlank ? (
          <DrillInput key={part.key} correctAnswer={answerMap[part.key]} dark={dark} />
        ) : (
          <span key={`t-${part.text.slice(0, 10)}-${Math.random()}`}>{part.text}</span>
        )
      )}
    </p>
  );
}
