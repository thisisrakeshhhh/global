import React from 'react';
import { Info } from 'lucide-react';
import { ClimateLayer } from '../Globe/ClimateGlobe';

interface LegendBarProps {
  activeLayer: ClimateLayer;
}

export const LegendBar: React.FC<LegendBarProps> = ({ activeLayer }) => {
  return (
    <div className="absolute bottom-28 left-3 sm:left-5 z-20 pointer-events-auto bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2.5 max-w-[220px] font-mono text-xs shadow-xl hidden sm:block">
      <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-bold uppercase tracking-wider mb-2">
        <Info className="w-3.5 h-3.5" />
        <span>Atlas Data Legend</span>
      </div>

      {activeLayer === 'temperature' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Surface Temp Anomaly (°C):</div>
          <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 via-orange-500 to-rose-600" />
          <div className="flex justify-between text-[9px] text-slate-400">
            <span>+0.0°</span>
            <span>+1.5°</span>
            <span>+2.5°</span>
            <span>+4.0°+</span>
          </div>
        </div>
      )}

      {activeLayer === 'emissions' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Kaspersky Carbon Arcs:</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span>Industrial CO₂ Flows</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>CH₄ Methane Leaks</span>
          </div>
        </div>
      )}

      {activeLayer === 'ice' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Polar Cryosphere Extent:</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-3 h-3 rounded bg-sky-200" />
            <span>Permanent Multi-Year Ice</span>
          </div>
          <div className="text-[9px] text-rose-400 font-semibold mt-1">
            -42% Arctic summer ice lost since 1980
          </div>
        </div>
      )}

      {activeLayer === 'oceans' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Marine & Coastal Threat:</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <span>Coral Bleaching Front</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Delta Subsidence</span>
          </div>
        </div>
      )}

      {activeLayer === 'forests' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Deforestation & Fires:</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Active Wildfire Front</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Threatened Canopy</span>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-slate-800 text-[9px] text-slate-500">
        Click any 3D pillar or beacon to open scientific dossiers.
      </div>
    </div>
  );
};
