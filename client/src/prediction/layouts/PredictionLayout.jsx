import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function PredictionLayout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f4ff]">

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/prediction" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm shadow-lg shadow-blue-200 group-hover:shadow-blue-300 transition-all">
              ✈️
            </div>
            <div className="leading-none">
              <div>
                <span className="text-sm sm:text-base font-black text-gray-900 tracking-tight">TMS</span>
                <span className="text-sm sm:text-base font-black text-blue-600 tracking-tight"> VISA AI</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium mt-0.5 hidden xs:block">
                Intelligent Prediction
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            <Link
              to="/prediction"
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                location.pathname === "/prediction"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Home
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-sm">
            <Link
              to="/prediction"
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === "/prediction"
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              🏠 Home
            </Link>
          </div>
        )}
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="mt-16 sm:mt-20 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs sm:text-sm">
              ✈️
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black text-gray-800">TMS VISA AI</p>
              <p className="text-[10px] sm:text-xs text-gray-400">AI-powered visa prediction platform</p>
            </div>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 text-center sm:text-right">
            © 2026 TMS VISA. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}