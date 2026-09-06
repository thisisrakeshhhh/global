import React, { useState } from 'react';
import { IndicatorType, TimeRangeType, ClimateHistoryService, INDICATOR_METADATA } from '../../services/climateHistoryService';
import { IndicatorSelector } from './IndicatorSelector';
import { HistoricalChart } from './HistoricalChart';
import { ClimateTimeline } from './ClimateTimeline';
import { BookOpen, ShieldCheck, Database, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface HistoryPageProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  initialIndicator?: IndicatorType;
  onClose?: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  selectedYear,
  onYearChange,
  initialIndicator = 'temperature',
  onClose
}) => {
  const [activeIndicator, setActiveIndicator] = useState<IndicatorType>(initialIndicator);
  const [timeRange, setTimeRange] = useState<TimeRangeType>('all');

  // Sync if initialIndicator changes externally
  React.useEffect(() => {
    if (initialIndicator) {
      setActiveIndicator(initialIndicator);
    }
  }, [initialIndicator]);

  const milestones = ClimateHistoryService.getMilestones();
  const activeMilestone = ClimateHistoryService.getMilestoneByYear(selectedYear) || milestones[milestones.length - 1];
  const meta = INDICATOR_METADATA[activeIndicator];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 text-slate-100 font-sans space-y-6 animate-fadeIn pb-24">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Earth Climate History · 1850 → Present</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            How the planet has changed
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Over a century of verified observations from weather stations, ice core chemical archives,
            ocean research vessels, and continuous satellite constellations.
          </p>
        </div>

        {/* Global Summary Metric Callout */}
        <div className="flex items-center gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-3 px-4">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Observed Anomaly</div>
            <div className="text-xl font-bold text-orange-400">+1.33°C</div>
            <div className="text-[10px] text-slate-400">NASA GISTEMP (vs 1850–1900)</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Atmospheric CO₂</div>
            <div className="text-xl font-bold text-sky-400">429.1 ppm</div>
            <div className="text-[10px] text-slate-400">NOAA Mauna Loa in-situ</div>
          </div>
        </div>
      </div>

      {/* Indicator Selection Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <IndicatorSelector
          selectedIndicator={activeIndicator}
          onSelectIndicator={(ind) => setActiveIndicator(ind)}
        />
        <div className="text-xs text-slate-400 hidden sm:block">
          Click any chart point or milestone below to travel through time
        </div>
      </div>

      {/* Primary Historical Chart */}
      <HistoricalChart
        indicator={activeIndicator}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        selectedYear={selectedYear}
        onYearSelect={(yr) => onYearChange(yr)}
      />

      {/* Focused Milestone Deep-Dive: What Changed -> How We Know -> What Dataset Proves It */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
              {activeMilestone.year}
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                {activeMilestone.eraTitle}
              </h2>
              <span className="text-xs text-slate-400">
                Milestone: {activeMilestone.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">
              CO₂: <strong className="text-white">{activeMilestone.keyIndicators.co2Ppm.toFixed(1)} ppm</strong>
            </div>
            <div className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">
              Anomaly: <strong className={activeMilestone.keyIndicators.tempAnomalyC > 0 ? 'text-orange-400' : 'text-blue-400'}>
                {activeMilestone.keyIndicators.tempAnomalyC > 0 ? '+' : ''}{activeMilestone.keyIndicators.tempAnomalyC.toFixed(2)}°C
              </strong>
            </div>
          </div>
        </div>

        {/* 3 Scientific Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: What changed? */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>1. What changed on Earth?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeMilestone.whatHappened}
            </p>
          </div>

          {/* Column 2: How do we know scientifically? */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>2. How do we know scientifically?</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeMilestone.howWeKnow}
            </p>
          </div>

          {/* Column 3: What dataset records it? */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>3. Primary dataset & citation</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 space-y-1.5">
              <div className="text-xs font-semibold text-slate-200">
                {activeMilestone.datasetEvidence}
              </div>
              <div className="text-[11px] text-slate-400 italic">
                Citation: {activeMilestone.citation}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chronological Milestone Selector Carousel */}
      <ClimateTimeline
        milestones={milestones}
        selectedYear={selectedYear}
        onSelectMilestone={(yr) => onYearChange(yr)}
      />
    </div>
  );
};
