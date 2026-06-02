import { useState } from "react";

const MIN_CHARS = 80;

const QUALITY_LEVELS = [
  { max: 0,   label: "",          color: "" },
  { max: 40,  label: "Too short", color: "text-red-400" },
  { max: 80,  label: "Getting there…", color: "text-amber-400" },
  { max: 160, label: "Good answer", color: "text-blue-500" },
  { max: 9999,label: "Strong answer ✓", color: "text-emerald-500" },
];

function getQuality(len) {
  return QUALITY_LEVELS.find((q) => len <= q.max) || QUALITY_LEVELS.at(-1);
}

function StrengthBar({ length }) {
  const pct = Math.min(100, Math.round((length / MIN_CHARS) * 100));
  const color =
    pct < 50 ? "bg-red-400" : pct < 100 ? "bg-amber-400" : "bg-emerald-500";
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3 overflow-hidden">
      <div
        className={`h-1.5 rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function QuestionCard({ question, index, answer, onChange, isActive, onFocus }) {
  const len = (answer || "").length;
  const quality = getQuality(len);
  const done = len >= MIN_CHARS;

  return (
    <div
      onClick={onFocus}
      className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
        isActive
          ? "border-blue-400 shadow-lg shadow-blue-100/60 bg-white"
          : done
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-gray-100 bg-gray-50/60 hover:border-gray-200 hover:bg-white"
      }`}
    >
      {/* Card header */}
      <div className="flex items-start gap-4 p-6 pb-4">
        {/* Number badge */}
        <div
          className={`min-w-[44px] h-[44px] rounded-xl flex items-center justify-center text-base font-black transition-all ${
            done
              ? "bg-emerald-500 text-white"
              : isActive
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {done ? "✓" : index + 1}
        </div>

        {/* Question text */}
        <div className="flex-1">
          <p
            className={`font-bold leading-snug transition-colors ${
              isActive ? "text-gray-800 text-base" : "text-gray-600 text-sm"
            }`}
          >
            {question}
          </p>
          {!isActive && done && (
            <p className="text-xs text-emerald-600 mt-1 font-medium">
              ✓ Answered · {len} characters
            </p>
          )}
          {!isActive && !done && len > 0 && (
            <p className="text-xs text-amber-500 mt-1">
              {len} chars — needs a bit more detail
            </p>
          )}
        </div>
      </div>

      {/* Expanded textarea — only when active */}
      {isActive && (
        <div className="px-6 pb-6">
          <textarea
            autoFocus
            rows={5}
            value={answer || ""}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder="Write a detailed, honest answer. The more context you provide, the better the AI can assess your profile…"
            className="w-full border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-2xl p-4 outline-none resize-none text-gray-700 text-sm leading-7 transition-all bg-white"
          />

          <StrengthBar length={len} />

          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs font-semibold ${quality.color}`}>
              {quality.label}
            </span>
            <span className="text-xs text-gray-400">
              {len} / {MIN_CHARS}+ chars recommended
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PredictionQuestions({ questions, answers, setAnswers }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const answeredCount = answers.filter((a) => (a || "").length >= MIN_CHARS).length;
  const allDone = answeredCount === questions.length;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
              🤖 AI Questions
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Detailed answers improve your prediction accuracy significantly.
          </p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-black ${allDone ? "text-emerald-500" : "text-gray-800"}`}>
            {answeredCount}/{questions.length}
          </p>
          <p className="text-xs text-gray-400">answered</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className={`h-1.5 rounded-full transition-all duration-500 ${allDone ? "bg-emerald-500" : "bg-blue-500"}`}
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      {/* Question cards */}
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          index={index}
          question={question}
          answer={answers[index] || ""}
          onChange={handleAnswer}
          isActive={activeIndex === index}
          onFocus={() => setActiveIndex(index)}
        />
      ))}

      {/* Completion banner */}
      {allDone && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mt-2">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-emerald-700 text-sm">All questions answered!</p>
            <p className="text-emerald-600 text-xs">You can now proceed to generate your prediction.</p>
          </div>
        </div>
      )}
    </div>
  );
}