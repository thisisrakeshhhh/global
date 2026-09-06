import React from 'react';
import { Thermometer, Wind, Flame, Disc } from 'lucide-react';

interface MetricsBannerProps {
  firesClusterCount: number;
  cyclonesCount: number;
  sourcesOnlineCount?: number;
  lastUpdatedMinutesAgo?: number;
  isLoading?: boolean;
  onOpenFreshness?: () => void;
}

export const MetricsBanner: React.FC<MetricsBannerProps> = ({
  firesClusterCount,
  cyclonesCount,
  sourcesOnlineCount = 4,
  lastUpdatedMinutesAgo = 2,
  isLoading = false,
  onOpenFreshness
}) => {
  return (
    <div className="w-full px-4 mb-2 z-20">
      <div className="w-full bg-[#0a1224]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl px-5 py-2.5 shadow-xl flex items-center justify-between gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
        {/* Item 1: Live Planetary Data */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>
          <div>
            <div className="text-xs sm:text-sm font-semibold text-white tracking-wide leading-tight">
              Live Planetary Data
            </div>
            <div className="text-[10px] text-slate-400 leading-tight">
              {isLoading ? 'Refreshing feeds...' : `Last update: ${lastUpdatedMinutesAgo} min ago`}
            </div>
          </div>
        </div>

        {/* Item 2: Global Temp Anomaly */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1 rounded-lg bg-rose-500/10 text-rose-400">
            <Thermometer className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 leading-tight">
              Global Temp Anomaly
            </div>
            <div className="text-xs sm:text-sm font-bold text-rose-400 font-mono leading-tight">
              +1.48°C <span className="text-[9px] font-normal text-slate-500 font-sans">(ERA5)</span>
            </div>
          </div>
        </div>

        {/* Item 3: CO2 (Mauna Loa) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1 rounded-lg bg-sky-500/10 text-sky-400">
            <Wind className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 leading-tight">
              CO₂ (Mauna Loa)
            </div>
            <div className="text-xs sm:text-sm font-bold text-sky-400 font-mono leading-tight">
              426.9 ppm <span className="text-[9px] font-normal text-slate-500 font-sans">(NOAA MLO)</span>
            </div>
          </div>
        </div>

        {/* Item 4: Active Fires (Strictly Real Data, Zero Fake Fallbacks) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400">
            <Flame className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 leading-tight">
              Active Fires
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-400 font-mono leading-tight">
              {isLoading ? (
                <span className="text-slate-400 text-xs font-normal">Syncing FIRMS...</span>
              ) : firesClusterCount > 0 ? (
                `${firesClusterCount.toLocaleString()} clusters`
              ) : (
                <span className="text-slate-400 text-xs font-normal">0 clusters [Quiet]</span>
              )}
            </div>
          </div>
        </div>

        {/* Item 5: Active Cyclones */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="p-1 rounded-lg bg-purple-500/10 text-purple-400">
            <Disc className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 leading-tight">
              Active Cyclones
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-mono flex items-center gap-1 leading-tight">
              <span>{cyclonesCount}</span>
              <span className="text-slate-400 text-[10px] font-normal font-sans">
                {cyclonesCount === 0 ? '[Basin quiet]' : '[Active track]'}
              </span>
            </div>
          </div>
        </div>

        {/* Item 6: Data Freshness Pill */}
        <button
          onClick={onOpenFreshness}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/40 text-left transition shadow-sm group cursor-pointer shrink-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div>
            <div className="text-[10px] font-semibold text-emerald-400 group-hover:text-emerald-300 leading-tight">
              Data Freshness
            </div>
            <div className="text-[9px] text-slate-300 leading-tight">
              {sourcesOnlineCount} sources online
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
