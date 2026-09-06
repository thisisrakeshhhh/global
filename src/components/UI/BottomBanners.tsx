import React from 'react';
import { BookOpen, Atom, Leaf, Waves, AlertTriangle, Sprout, ArrowRight } from 'lucide-react';
import { audioController } from '../../utils/audioController';

interface BottomBannersProps {
  onOpenWiki: (chapterId?: string) => void;
}

export const BottomBanners: React.FC<BottomBannersProps> = ({ onOpenWiki }) => {
  const topics = [
    { id: 'ch1', name: 'Physical Science', icon: <Atom className="w-3.5 h-3.5 text-blue-600" /> },
    { id: 'ch2', name: 'Greenhouse Gases', icon: <Leaf className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: 'ch4', name: 'Oceans & Ice', icon: <Waves className="w-3.5 h-3.5 text-sky-600" /> },
    { id: 'ch6', name: 'Tipping Points', icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 'ch9', name: 'Solutions', icon: <Sprout className="w-3.5 h-3.5 text-emerald-600" /> }
  ];

  return (
    <div className="w-full px-4 pb-2 z-20 pointer-events-auto select-none">
      <div className="flex flex-col lg:flex-row items-stretch gap-2.5 w-full">
        {/* Left Card: Climate Encyclopedia (~75% width) */}
        <div className="flex-1 lg:flex-[3] bg-white text-slate-900 rounded-2xl py-2 px-3.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 border border-slate-100">
          {/* Left Title & Icon */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Climate Encyclopedia
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-normal leading-tight mt-0.5">
                10 in-depth scientific chapters on global warming
              </p>
            </div>
          </div>

          {/* Center Topic Pills */}
          <div className="hidden xl:flex items-center gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  audioController.playSelect();
                  onOpenWiki(t.id);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer"
              >
                {t.icon}
                <span>{t.name}</span>
              </button>
            ))}
          </div>

          {/* Right Action Button */}
          <button
            onClick={() => {
              audioController.playSelect();
              onOpenWiki();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Explore Wiki</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Card: Climate Partner / Ad (~25% width) */}
        <div className="flex-1 lg:flex-[1] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 p-2.5 flex flex-col justify-end min-h-[56px] group cursor-pointer">
          {/* Wind Turbines & Sky SVG Background */}
          <div className="absolute inset-0 z-0">
            <svg viewBox="0 0 400 150" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#e0f2fe" />
                </linearGradient>
                <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              {/* Sky */}
              <rect width="400" height="150" fill="url(#skyGrad)" />
              {/* Rolling green hills */}
              <path d="M0 110 Q100 85 200 100 T400 90 L400 150 L0 150 Z" fill="url(#hillGrad)" />
              <path d="M0 125 Q150 105 300 120 T400 115 L400 150 L0 150 Z" fill="#15803d" opacity="0.6" />
              
              {/* Wind Turbine 1 (Center) */}
              <line x1="200" y1="40" x2="200" y2="115" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="200" cy="40" r="2.5" fill="#ffffff" />
              <line x1="200" y1="40" x2="200" y2="15" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="200" y1="40" x2="222" y2="52" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="200" y1="40" x2="178" y2="52" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

              {/* Wind Turbine 2 (Left) */}
              <line x1="120" y1="55" x2="120" y2="120" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
              <circle cx="120" cy="55" r="2" fill="#ffffff" />
              <line x1="120" y1="55" x2="120" y2="35" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              <line x1="120" y1="55" x2="137" y2="65" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              <line x1="120" y1="55" x2="103" y2="65" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

              {/* Wind Turbine 3 (Right) */}
              <line x1="310" y1="48" x2="310" y2="110" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
              <circle cx="310" cy="48" r="2" fill="#ffffff" />
              <line x1="310" y1="48" x2="310" y2="28" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
              <line x1="310" y1="48" x2="327" y2="58" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
              <line x1="310" y1="48" x2="293" y2="58" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
            </svg>
          </div>

          {/* Subtle dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />

          {/* Ad badge */}
          <div className="absolute top-2.5 right-2.5 z-20">
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/40 text-white/90 border border-white/30 backdrop-blur-xs">
              Ad
            </span>
          </div>

          {/* Partner Tagline */}
          <div className="relative z-20">
            <div className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight group-hover:text-cyan-200 transition">
              A cleaner planet<br />is a brighter future.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
