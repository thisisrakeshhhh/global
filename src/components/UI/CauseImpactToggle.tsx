import React from 'react';
import { AlertOctagon, Zap, ArrowRightLeft } from 'lucide-react';
import { audioController } from '../../utils/audioController';

export type AnalyticalMode = 'causes' | 'impacts';

interface CauseImpactToggleProps {
  mode: AnalyticalMode;
  onToggleMode: (mode: AnalyticalMode) => void;
}

export const CauseImpactToggle: React.FC<CauseImpactToggleProps> = ({ mode, onToggleMode }) => {
  return (
    <div className="absolute top-28 sm:top-24 right-3 sm:right-5 z-20 pointer-events-auto flex flex-col items-end gap-2">
      <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono tracking-wider text-cyan-400/80 uppercase">
        <ArrowRightLeft className="w-3.5 h-3.5" />
        <span>Analytical Perspective</span>
      </div>

      <div className="bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-xl p-1.5 flex gap-1 shadow-2xl">
        <button
          onClick={() => {
            audioController.playSelect();
            onToggleMode('causes');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
            mode === 'causes'
              ? 'bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>WHAT DRIVES IT (CAUSES)</span>
        </button>

        <button
          onClick={() => {
            audioController.playSelect();
            onToggleMode('impacts');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
            mode === 'impacts'
              ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold shadow-[0_0_15px_rgba(244,63,94,0.25)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
          <span>HOW IT HURTS (IMPACTS)</span>
        </button>
      </div>

      {/* Dynamic explanatory pill */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-lg px-3 py-1.5 text-[10px] font-mono text-slate-400 max-w-xs text-right">
        {mode === 'causes' ? (
          <span>
            Highlighting <strong className="text-amber-300">fossil fuels, coal power plants, peatland drainage, and industrial emissions</strong>.
          </span>
        ) : (
          <span>
            Highlighting <strong className="text-rose-300">deadly heatwaves, glacial loss, mega-droughts, and coastal drowning</strong>.
          </span>
        )}
      </div>
    </div>
  );
};
