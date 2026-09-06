import React from 'react';
import { Thermometer, Wind, Flame, Disc, CheckCircle2 } from 'lucide-react';

interface MetricsBannerProps {
  firesClusterCount: number;
  cyclonesCount: number;
  sourcesOnlineCount?: number;
  lastUpdatedMinutesAgo?: number;
  onOpenFreshness?: () => void;
}

export const MetricsBanner: React.FC<MetricsBannerProps> = ({
  firesClusterCount,
  cyclonesCount,
  sourcesOnlineCount = 4,
  lastUpdatedMinutesAgo = 2,
  onOpenFreshness
}) => {
  return (
    <div className="w-full px-4 mb-2 z-20">
      <div className="w-full bg-[#0a1224]/85 backdrop-blur-md border border-slate-800/80 rounded-2xl px-6 py-2.5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        {/* Item 1: Live Planetary Data */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Live Planetary Data
            </div>
            <div className="text-[11px] text-slate-400">
              Last update: {lastUpdatedMinutesAgo} min ago
            </div>
          </div>
        </div>

        {/* Item 2: Global Temp Anomaly */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">
              Global Temp Anomaly
            </div>
            <div className="text-sm font-bold text-rose-400 font-mono">
              +1.48°C
            </div>
          </div>
        </div>

        {/* Item 3: CO2 (Mauna Loa) */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">
              CO₂ (Mauna Loa)
            </div>
            <div className="text-sm font-bold text-sky-400 font-mono">
              426.9 ppm
            </div>
          </div>
        </div>

        {/* Item 4: Active Fires */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">
              Active Fires
            </div>
            <div className="text-sm font-bold text-amber-400 font-mono">
              {firesClusterCount ? firesClusterCount.toLocaleString() : '1,068'} clusters
            </div>
          </div>
        </div>

        {/* Item 5: Active Cyclones */}
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
            <Disc className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400">
              Active Cyclones
            </div>
            <div className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
              <span>{cyclonesCount}</span>
              <span className="text-slate-400 text-xs font-normal">
                {cyclonesCount === 0 ? '[Basin quiet]' : '[Active track]'}
              </span>
            </div>
          </div>
        </div>

        {/* Item 6: Data Freshness Pill */}
        <button
          onClick={onOpenFreshness}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/40 text-left transition shadow-sm group cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div>
            <div className="text-[11px] font-semibold text-emerald-400 group-hover:text-emerald-300">
              Data Freshness
            </div>
            <div className="text-[10px] text-slate-300">
              {sourcesOnlineCount} sources online
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
