import React from 'react';
import { ClimateStoryMilestone } from '../../data/history/timeline';
import { BookOpen, ShieldCheck, Database, Calendar } from 'lucide-react';

interface ClimateTimelineProps {
  milestones: ClimateStoryMilestone[];
  selectedYear: number;
  onSelectMilestone: (year: number) => void;
}

export const ClimateTimeline: React.FC<ClimateTimelineProps> = ({
  milestones,
  selectedYear,
  onSelectMilestone
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
            Chronological Climate Milestones (1850–2026)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key physical inflection points in Earth's modern climate history.
          </p>
        </div>
      </div>

      {/* Horizontal Milestone Cards Carousel/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {milestones.map((m) => {
          const isSelected = m.year === selectedYear;
          return (
            <div
              key={m.year}
              onClick={() => onSelectMilestone(m.year)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-500/40'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Badge and Year */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {m.year}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {m.theme}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 line-clamp-1 mb-1">
                  {m.label}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {m.whatHappened}
                </p>
              </div>

              {/* Key Indicators Snippet */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>CO₂: <strong className="text-slate-200">{m.keyIndicators.co2Ppm.toFixed(1)} ppm</strong></span>
                <span>Temp: <strong className={m.keyIndicators.tempAnomalyC > 0 ? 'text-orange-400' : 'text-blue-400'}>
                  {m.keyIndicators.tempAnomalyC > 0 ? '+' : ''}{m.keyIndicators.tempAnomalyC.toFixed(2)}°C
                </strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
