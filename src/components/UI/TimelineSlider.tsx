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

  // Find active milestone based on time domain
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
    metricSource = 'IPCC AR6 WG I Working Group Projections';
  }

  // Playback timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentYear >= maxYear) {
          setIsPlaying(false);
        } else {
          const step = timeDomain === 'observed' ? 5 : 5;
          onYearChange(Math.min(maxYear, currentYear + step));
        }
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentYear, maxYear, onYearChange, timeDomain]);

  if (timeDomain === 'live') {
    return (
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-xl pointer-events-auto font-mono text-xs">
        <div className="bg-slate-950/85 backdrop-blur-md border border-rose-500/40 rounded-xl p-3 shadow-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <div>
              <div className="text-white font-bold text-xs flex items-center gap-2">
                <span>NEAR-REAL-TIME SATELLITE MODE</span>
                <span className="text-[10px] text-rose-400 font-bold bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/30">
                  LIVE STREAM
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Displaying active NASA FIRMS wildfires, tropical cyclone tracks, and Copernicus flood maps.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-2xl pointer-events-auto font-mono text-xs">
      <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-500/35 rounded-xl p-2.5 sm:p-3 shadow-2xl flex flex-col gap-2">
        {/* Top Info Line */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-bold text-white">
              {timeDomain === 'observed' ? 'OBSERVED RECORD:' : 'IPCC PROJECTION:'}
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
              YEAR {currentYear}
            </span>
            {timeDomain === 'projected' && (
              <button
                onClick={() => {
                  audioController.playClick();
                  onOpenScenarioModal();
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold hover:bg-purple-500/30 flex items-center gap-1"
              >
                <Sliders className="w-2.5 h-2.5" />
                <span>{selectedSSP}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div>
              <span className="text-slate-500 mr-1">CO₂:</span>
              <span className="text-cyan-400 font-bold">{metricCO2}</span>
            </div>
            <div>
              <span className="text-slate-500 mr-1">Anomaly:</span>
              <span className="text-amber-400 font-bold">{metricAnomaly}</span>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Milestone Narrative */}
        {!isCollapsed && (
          <div className="text-[11px] text-slate-300 space-y-0.5">
            <div className="text-cyan-300 font-semibold">{activeHeadline}</div>
            <div className="text-slate-400 text-[10px] truncate">{activeDetails}</div>
            <div className="text-slate-500 text-[9px] truncate">Citation: {metricSource}</div>
          </div>
        )}

        {/* Playback Controls & Slider */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioController.playClick();
              onYearChange(minYear);
            }}
            title={`Reset to ${minYear}`}
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <Rewind className="w-3 h-3" />
          </button>

          <button
            onClick={() => {
              audioController.playClick();
              if (currentYear >= maxYear) onYearChange(minYear);
              setIsPlaying(!isPlaying);
            }}
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
              onYearChange(maxYear);
            }}
            title={`Jump to ${maxYear}`}
            className="p-1 rounded bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
          >
            <FastForward className="w-3 h-3" />
          </button>

          {/* Range Slider */}
          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min={minYear}
              max={maxYear}
              step={timeDomain === 'observed' ? 1 : 1}
              value={currentYear}
              onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        {/* Tick Milestones */}
        <div className="flex justify-between text-[9px] text-slate-500 px-1">
          {timeDomain === 'observed' ? (
            <>
              <button onClick={() => onYearChange(1880)}>1880 Baseline</button>
              <button onClick={() => onYearChange(1958)}>1958 Keeling MLO</button>
              <button onClick={() => onYearChange(1980)}>1980 Satellite</button>
              <button onClick={() => onYearChange(2015)}>2015 Paris</button>
              <button onClick={() => onYearChange(2024)}>2024 Record</button>
            </>
          ) : (
            <>
              <button onClick={() => onYearChange(2026)}>2026 Present</button>
              <button onClick={() => onYearChange(2035)}>2035</button>
              <button onClick={() => onYearChange(2050)}>2050 Net-Zero Target</button>
              <button onClick={() => onYearChange(2075)}>2075</button>
              <button onClick={() => onYearChange(2100)}>2100 End-Century</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
