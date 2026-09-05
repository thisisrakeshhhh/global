import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Rewind, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { TIMELINE_DATA, TimelineMilestone } from '../../data/timelineData';
import { audioController } from '../../utils/audioController';

interface TimelineSliderProps {
  currentYear: number;
  onYearChange: (year: number) => void;
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({ currentYear, onYearChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const currentMilestone: TimelineMilestone =
    TIMELINE_DATA.slice().reverse().find((m) => m.year <= currentYear) || TIMELINE_DATA[0];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentYear >= 2050) {
          setIsPlaying(false);
        } else {
          onYearChange(Math.min(2050, currentYear + 2));
        }
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentYear, onYearChange]);

  const togglePlay = () => {
    audioController.playClick();
    if (currentYear >= 2050) {
      onYearChange(1980);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-2xl pointer-events-auto">
      <div className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-2 font-mono">
        {/* Top compact header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] uppercase text-slate-400 font-semibold">PLANETARY TIME-MACHINE</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
              {currentYear} {currentYear > 2026 ? '(PROJECTION)' : ''}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div>
              <span className="text-slate-500 mr-1">CO₂:</span>
              <span className="text-cyan-300 font-bold">{currentMilestone.co2Ppm.toFixed(1)} ppm</span>
            </div>
            <div>
              <span className="text-slate-500 mr-1">Anomaly:</span>
              <span className="text-amber-400 font-bold">+{currentMilestone.tempAnomaly.toFixed(2)}°C</span>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-white p-0.5"
              title={isCollapsed ? 'Expand Details' : 'Collapse Details'}
            >
              {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Milestone Headline (hidden if collapsed) */}
        {!isCollapsed && (
          <div className="text-[11px] text-slate-300 truncate">
            <span className="text-cyan-400 font-semibold">{currentMilestone.headline}: </span>
            <span className="text-slate-400">{currentMilestone.keyEvents}</span>
          </div>
        )}

        {/* Controls and Track */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              audioController.playClick();
              onYearChange(1980);
            }}
            title="Reset to 1980"
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <Rewind className="w-3 h-3" />
          </button>

          <button
            onClick={togglePlay}
            className={`flex items-center justify-center w-7 h-7 rounded-lg border transition-all ${
              isPlaying
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-cyan-500/20 border-cyan-500 text-cyan-300 hover:bg-cyan-500/30'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            onClick={() => {
              audioController.playClick();
              onYearChange(2050);
            }}
            title="Jump to 2050 Forecast"
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <FastForward className="w-3 h-3" />
          </button>

          {/* Range Slider */}
          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min="1980"
              max="2050"
              step="1"
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Milestone Tick Marks */}
        <div className="flex justify-between text-[9px] text-slate-500 px-1 font-mono">
          {TIMELINE_DATA.map((item) => (
            <button
              key={item.year}
              onClick={() => {
                audioController.playClick();
                onYearChange(item.year);
              }}
              className={`hover:text-cyan-300 transition-colors ${
                Math.abs(currentYear - item.year) <= 3 ? 'text-cyan-400 font-bold' : ''
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
