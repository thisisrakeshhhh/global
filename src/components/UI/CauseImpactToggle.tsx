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
    <div className="flex flex-col gap-1 max-w-[230px] pointer-events-auto">
      <div className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono tracking-wider text-cyan-400/80 uppercase font-bold">
        <ArrowRightLeft className="w-3 h-3" />
        <span>Attribution Mode</span>
      </div>

      <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-1 flex flex-col gap-1 shadow-2xl font-mono">
        <button
          onClick={() => {
            audioController.playSelect();
            onToggleMode('causes');
          }}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
            mode === 'causes'
              ? 'bg-amber-500/25 border border-amber-500/60 text-amber-300 font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>WHAT DRIVES IT (CAUSES)</span>
        </button>

        <button
          onClick={() => {
            audioController.playSelect();
            onToggleMode('impacts');
          }}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
            mode === 'impacts'
              ? 'bg-rose-500/25 border border-rose-500/60 text-rose-300 font-bold shadow-[0_0_12px_rgba(244,63,94,0.25)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>HOW IT HURTS (IMPACTS)</span>
        </button>
      </div>

      {/* Concise explanatory badge */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-lg px-2.5 py-1 text-[9px] font-mono text-slate-400 leading-tight">
        {mode === 'causes' ? (
          <span>
            Examines <strong className="text-amber-300">coal power, fossil gas, transport, and deforestation</strong>.
          </span>
        ) : (
          <span>
            Examines <strong className="text-rose-300">lethal heatwaves, water collapse, and coastal flooding</strong>.
          </span>
        )}
      </div>
    </div>
  );
};
