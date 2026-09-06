import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Clock, ShieldCheck, Database, BookOpen, AlertCircle } from 'lucide-react';
import { TIMELINE_DATA, TimelineMilestone } from '../../data/timelineData';

interface ClimateHistoryPanelProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  onClose?: () => void;
}

export const ClimateHistoryPanel: React.FC<ClimateHistoryPanelProps> = ({
  selectedYear,
  onYearChange,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Find active milestone
  const currentIndex = TIMELINE_DATA.findIndex(m => m.year === selectedYear);
  const activeMilestone: TimelineMilestone = TIMELINE_DATA[currentIndex !== -1 ? currentIndex : 6]; // Default to 2026

  // Auto-play / scrubbing animation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      const nextIdx = (currentIndex + 1) % TIMELINE_DATA.length;
      onYearChange(TIMELINE_DATA[nextIdx].year);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, onYearChange]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onYearChange(TIMELINE_DATA[currentIndex - 1].year);
    }
  };

  const handleNext = () => {
    if (currentIndex < TIMELINE_DATA.length - 1) {
      onYearChange(TIMELINE_DATA[currentIndex + 1].year);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] text-slate-100 font-sans pointer-events-auto">
      {/* Top Header: Step 01 indicator + Era Title + Close */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            01 — HOW HAS EARTH CHANGED?
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            {activeMilestone.eraTitle}
          </span>
          {activeMilestone.isProjected && (
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              IPCC CMIP6 Projection
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title={isPlaying ? 'Pause Auto-Play' : 'Play Timeline Progression'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />}
            <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play Time Machine'}</span>
          </button>
        </div>
      </div>

      {/* Timeline Interactive Scrubber / Milestones Bar */}
      <div className="relative mb-3">
        {/* Connecting track line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
        
        {/* Step buttons */}
        <div className="relative z-10 flex items-center justify-between">
          {TIMELINE_DATA.map((milestone, idx) => {
            const isSelected = milestone.year === selectedYear;
            return (
              <button
                key={milestone.year}
                onClick={() => {
                  setIsPlaying(false);
                  onYearChange(milestone.year);
                }}
                className={`group flex flex-col items-center transition-all ${
                  isSelected ? 'scale-110' : 'hover:scale-105'
                }`}
              >
                {/* Micro circle indicator */}
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    isSelected
                      ? 'bg-cyan-400 border-white shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                      : milestone.isProjected
                      ? 'bg-slate-900 border-amber-500/60 group-hover:border-amber-400'
                      : 'bg-slate-900 border-slate-700 group-hover:border-cyan-400'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                </div>

                {/* Year Label */}
                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-tight transition-colors ${
                    isSelected
                      ? 'text-cyan-300'
                      : milestone.isProjected
                      ? 'text-amber-400/80 group-hover:text-amber-300'
                      : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {milestone.year}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Core Indicator Cards: Temp Anomaly, CO2, Sea Ice */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
        {/* Surface Temperature Anomaly */}
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Surface Temp Anomaly</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
              vs 1850–1900
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl sm:text-2xl font-black font-mono ${
              activeMilestone.tempAnomaly >= 1.5 ? 'text-rose-400' : activeMilestone.tempAnomaly >= 1.0 ? 'text-amber-400' : 'text-cyan-400'
            }`}>
              {activeMilestone.tempAnomaly >= 0 ? `+${activeMilestone.tempAnomaly.toFixed(2)}` : activeMilestone.tempAnomaly.toFixed(2)}°C
            </span>
            <span className="text-[10px] text-slate-400">global mean</span>
          </div>
          <div className="text-[9px] text-slate-500 truncate mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{activeMilestone.tempSource}</span>
          </div>
        </div>

        {/* Atmospheric CO2 */}
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Atmospheric CO₂</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Concentration
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black font-mono text-cyan-300">
              {activeMilestone.co2Ppm.toFixed(1)} <span className="text-xs font-normal text-slate-400">ppm</span>
            </span>
          </div>
          <div className="text-[9px] text-slate-500 truncate mt-1 flex items-center gap-1">
            <Database className="w-3 h-3 text-cyan-400 shrink-0" />
            <span className="truncate">{activeMilestone.co2Source}</span>
          </div>
        </div>

        {/* Arctic Sea Ice Extent (Honest Provenance: Null prior to 1979) */}
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Arctic Sea Ice Extent</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
              Summer Min (Sept)
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            {activeMilestone.seaIceExtentMkm2 !== null ? (
              <span className="text-xl sm:text-2xl font-black font-mono text-sky-300">
                {activeMilestone.seaIceExtentMkm2.toFixed(2)} <span className="text-xs font-normal text-slate-400">M km²</span>
              </span>
            ) : (
              <div className="flex items-center gap-1.5 text-slate-400">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-medium text-amber-200/90 leading-tight">
                  No continuous satellite record
                </span>
              </div>
            )}
          </div>
          <div className="text-[9px] text-slate-500 truncate mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />
            <span className="truncate">{activeMilestone.seaIceProvenance}</span>
          </div>
        </div>
      </div>

      {/* Scientific Narrative & Evidence Citation */}
      <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 mb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-slate-200">
            {activeMilestone.headline}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
              title="Previous Milestone"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= TIMELINE_DATA.length - 1}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
              title="Next Milestone"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed mb-2">
          {activeMilestone.scientificNarrative}
        </p>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 border-t border-slate-800/60 pt-1.5">
          <BookOpen className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="font-semibold text-slate-300">Primary Citation:</span>
          <span className="truncate text-slate-400">{activeMilestone.citation}</span>
        </div>
      </div>
    </div>
  );
};
