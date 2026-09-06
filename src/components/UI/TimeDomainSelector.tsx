import React from 'react';
import { History, TrendingUp, Radio } from 'lucide-react';
import { TimeDomain } from '../../types/climateIntelligence';
import { audioController } from '../../utils/audioController';

interface TimeDomainSelectorProps {
  currentDomain: TimeDomain;
  onSelectDomain: (domain: TimeDomain) => void;
}

export const TimeDomainSelector: React.FC<TimeDomainSelectorProps> = ({
  currentDomain,
  onSelectDomain
}) => {
  return (
    <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto font-sans">
      <div className="bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex items-center gap-1 shadow-2xl text-xs">
        {/* LIVE TELEMETRY */}
        <button
          onClick={() => {
            audioController.playSelect();
            onSelectDomain('live');
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
            currentDomain === 'live'
              ? 'bg-rose-500/20 text-rose-300 font-medium shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span>Near-Real-Time</span>
        </button>

        {/* OBSERVED MODE */}
        <button
          onClick={() => {
            audioController.playSelect();
            onSelectDomain('observed');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
            currentDomain === 'observed'
              ? 'bg-blue-600/30 text-blue-200 font-medium shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <History className="w-3.5 h-3.5 text-blue-400" />
          <span>Observed (1880–2024)</span>
        </button>

        {/* PROJECTED MODE */}
        <button
          onClick={() => {
            audioController.playSelect();
            onSelectDomain('projected');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
            currentDomain === 'projected'
              ? 'bg-purple-600/30 text-purple-200 font-medium shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          <span>IPCC 2100 Pathways</span>
        </button>
      </div>
    </div>
  );
};
