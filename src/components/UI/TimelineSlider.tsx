import React, { useState, useEffect } from 'react';
import { Play, Pause, FastForward, Rewind, Calendar, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { OBSERVED_HISTORICAL_RECORD, IPCC_PROJECTION_SCENARIOS } from '../../services/timeDomainService';
import { TimeDomain, SSPScenario } from '../../types/climateIntelligence';
import { audioController } from '../../utils/audioController';

interface TimelineSliderProps {
  timeDomain: TimeDomain;
  currentYear: number;
  onYearChange: (year: number) => void;
  selectedSSP: SSPScenario;
  onOpenScenarioModal: () => void;
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  timeDomain,
  currentYear,
  onYearChange,
  selectedSSP,
  onOpenScenarioModal
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const minYear = timeDomain === 'observed' ? 1880 : 2026;
  const maxYear = timeDomain === 'observed' ? 2024 : 2100;

  let activeHeadline = '';
  let activeDetails = '';
  let metricCO2 = '426.9 ppm';
  let metricAnomaly = '+1.48°C';
  let metricSource = '';

  if (timeDomain === 'observed') {
    const record =
      OBSERVED_HISTORICAL_RECORD.slice().reverse().find((r) => r.year <= currentYear) ||
      OBSERVED_HISTORICAL_RECORD[0];
    activeHeadline = `Year ${record.year} Empirical Instrument Record`;
    activeDetails = record.keyObservationalMilestone;
    metricCO2 = `${record.co2Ppm.toFixed(1)} ppm`;
    metricAnomaly = `${record.tempAnomaly >= 0 ? '+' : ''}${record.tempAnomaly.toFixed(2)}°C`;
    metricSource = record.dataSource;
  } else if (timeDomain === 'projected') {
    const scenario = IPCC_PROJECTION_SCENARIOS[selectedSSP];
    const trajPoint =
      scenario.decadalTrajectory.slice().reverse().find((p) => p.year <= currentYear) ||
      scenario.decadalTrajectory[0];
    activeHeadline = `IPCC Projection (${scenario.ssp}): Year ${trajPoint.year}`;
    activeDetails = scenario.summary;
    metricCO2 = `${trajPoint.co2Ppm.toFixed(1)} ppm`;
    metricAnomaly = `+${trajPoint.tempAnomaly.toFixed(2)}°C`;
    metricSource = 'IPCC AR6 WG I Projections';
  }

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentYear >= maxYear) {
          setIsPlaying(false);
        } else {
          onYearChange(Math.min(maxYear, currentYear + 5));
        }
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentYear, maxYear, onYearChange]);

  // In live mode, don't obstruct the bottom of the globe with giant banners
  if (timeDomain === 'live') {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl pointer-events-auto font-sans text-xs">
      <div className="bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-col gap-2.5">
        {/* Top Info Line */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-white">
              {timeDomain === 'observed' ? 'Empirical Record:' : 'IPCC Scenario:'}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 font-mono font-semibold">
              Year {currentYear}
            </span>
            {timeDomain === 'projected' && (
              <button
                onClick={() => {
                  audioController.playClick();
                  onOpenScenarioModal();
                }}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 transition font-medium flex items-center gap-1"
              >
                <Sliders className="w-3 h-3" />
                <span>{selectedSSP}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div>
              <span className="text-slate-400 mr-1">CO₂:</span>
              <span className="text-sky-400 font-mono font-semibold">{metricCO2}</span>
            </div>
            <div>
              <span className="text-slate-400 mr-1">Anomaly:</span>
              <span className="text-amber-400 font-mono font-semibold">{metricAnomaly}</span>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-white p-1"
            >
              {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Narrative */}
        {!isCollapsed && (
          <div className="text-xs text-slate-300 space-y-0.5 pt-1 border-t border-white/10">
            <div className="text-slate-200 font-medium">{activeHeadline}</div>
            <div className="text-slate-400 text-[11px] leading-relaxed truncate">{activeDetails}</div>
          </div>
        )}

        {/* Playback Controls & Slider */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              audioController.playClick();
              onYearChange(minYear);
            }}
            title={`Reset to ${minYear}`}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <Rewind className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              audioController.playClick();
              if (currentYear >= maxYear) onYearChange(minYear);
              setIsPlaying(!isPlaying);
            }}
            className={`flex items-center justify-center w-8 h-8 rounded-xl transition ${
              isPlaying
                ? 'bg-amber-500 text-black'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => {
              audioController.playClick();
              onYearChange(maxYear);
            }}
            title={`Jump to ${maxYear}`}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>

          {/* Slider */}
          <div className="flex-1 relative flex items-center mx-2">
            <input
              type="range"
              min={minYear}
              max={maxYear}
              step={1}
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="flex justify-between text-[10px] text-slate-500 px-1 font-mono">
          {timeDomain === 'observed' ? (
            <>
              <button onClick={() => onYearChange(1880)} className="hover:text-slate-300">1880</button>
              <button onClick={() => onYearChange(1958)} className="hover:text-slate-300">1958 MLO</button>
              <button onClick={() => onYearChange(1980)} className="hover:text-slate-300">1980 Satellites</button>
              <button onClick={() => onYearChange(2015)} className="hover:text-slate-300">2015 Paris</button>
              <button onClick={() => onYearChange(2024)} className="hover:text-slate-300">2024</button>
            </>
          ) : (
            <>
              <button onClick={() => onYearChange(2026)} className="hover:text-slate-300">2026</button>
              <button onClick={() => onYearChange(2035)} className="hover:text-slate-300">2035</button>
              <button onClick={() => onYearChange(2050)} className="hover:text-slate-300">2050 Net-Zero</button>
              <button onClick={() => onYearChange(2075)} className="hover:text-slate-300">2075</button>
              <button onClick={() => onYearChange(2100)} className="hover:text-slate-300">2100</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
