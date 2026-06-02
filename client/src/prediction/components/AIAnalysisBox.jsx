import { useEffect, useState } from "react";

export default function AIAnalysisBox({ text }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const clean = (text || "").trim();

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < clean.length) {
        setDisplayed(clean.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [clean]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 p-6 shadow-xl">
      {/* Glow blobs */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center text-lg">
          🤖
        </div>
        <div>
          <p className="text-sm font-black text-white">AI Analysis</p>
          <p className="text-[10px] text-indigo-300">Intelligent profile evaluation</p>
        </div>
        {/* Live dot */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${done ? "bg-emerald-400" : "bg-blue-400 animate-pulse"}`} />
          <span className="text-[10px] text-gray-400">{done ? "Complete" : "Analyzing…"}</span>
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10">
        <p className="text-sm text-gray-200 leading-7 whitespace-pre-line">
          {displayed}
          {!done && <span className="inline-block w-0.5 h-4 bg-blue-400 animate-pulse ml-0.5 align-middle" />}
        </p>
      </div>
    </div>
  );
}