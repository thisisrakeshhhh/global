import React from 'react';
import { Radio, History, TrendingUp } from 'lucide-react';
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
    <div className="absolute top-20 sm:top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_0_25px_rgba(6,182,212,0.2)] font-mono text-xs">
        {/* LIVE MODE BUTTON */}
        <button
          onClick={() => {
            audioController.playSelect();
            onSelectDomain('live');
          }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all ${
            currentDomain === 'live'
              ? 'bg-rose-500/25 border border-rose-500 text-rose-300 font-bold shadow-[0_0_15px_rgba(244,63,94,0.4)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span>LIVE TELEMETRY</span>
        </button>

        {/* OBSERVED MODE BUTTON */}
        <button
          onClick={() => {
            audioController.playSelect();
            onSelectDomain('observed');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            currentDomain === 'observed'
              ? 'bg-sky-500/25 border border-sky-400 text-sky-200 font-bold shadow-[0_0_15px_rgba(14,165,233,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <History className="w-3.5 h-3.5 text-sky-400" />
          <span>OBSERVED (1880–2025)</span>
        </button>

        {/* PROJECTED MODE BUTTON */}
        <button
          onClick={() => {
            audioController.playSelect();
            onSelectDomain('projected');
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
            currentDomain === 'projected'
              ? 'bg-purple-500/25 border border-purple-400 text-purple-200 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          <span>IPCC SCENARIOS (2026–2100)</span>
        </button>
      </div>
    </div>
  );
};
