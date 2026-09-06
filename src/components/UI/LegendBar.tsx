import React from 'react';
import { Info } from 'lucide-react';
import { ClimateLayer } from '../Globe/ClimateGlobe';

interface LegendBarProps {
  activeLayer: ClimateLayer;
}

export const LegendBar: React.FC<LegendBarProps> = ({ activeLayer }) => {
  return (
    <div className="pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-2.5 max-w-[230px] font-mono text-xs shadow-xl hidden sm:block">
      <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-2">
        <Info className="w-3 h-3" />
        <span>Scientific Color Scale</span>
      </div>

      {activeLayer === 'temperature' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Surface Temp Anomaly (°C):</div>
          <div className="h-2 w-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 via-orange-500 to-rose-600" />
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
          <div className="text-[10px] text-slate-400">Atmospheric GHG Sinks:</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>High Carbon Accumulation</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Methane (CH₄) Plumes</span>
          </div>
        </div>
      )}

      {activeLayer === 'ice' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Polar Cryosphere Extent:</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2.5 h-2.5 rounded bg-sky-200" />
            <span>Multi-Year Polar Sea Ice</span>
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
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>Coral Bleaching Zone</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Delta Subsidence Risk</span>
          </div>
        </div>
      )}

      {activeLayer === 'forests' && (
        <div className="space-y-1.5">
          <div className="text-[10px] text-slate-400">Forests & Fires (NASA FIRMS):</div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Active Wildfire Thermal Alert</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Threatened Canopy Frontier</span>
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-slate-800 text-[9px] text-slate-500">
        Click any 3D monitoring station for scientific attribution dossiers.
      </div>
    </div>
  );
};
