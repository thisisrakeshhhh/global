import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { ClimateLayer } from '../Globe/ClimateGlobe';

interface LegendBarProps {
  activeLayer: ClimateLayer;
}

export const LegendBar: React.FC<LegendBarProps> = ({ activeLayer }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="pointer-events-auto bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-xl p-2.5 max-w-[240px] font-sans text-xs shadow-xl text-slate-200">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <span className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400" />
          <span>Scale &amp; Reference</span>
        </span>
        {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </div>

      {isExpanded && (
        <div className="mt-2 pt-2 border-t border-white/10 space-y-2">
          {activeLayer === 'temperature' && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400">Surface Temp Anomaly (°C):</div>
              <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-amber-400 via-orange-500 to-rose-600" />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>+0.0°</span>
                <span>+1.5°</span>
                <span>+2.5°</span>
                <span>+4.0°+</span>
              </div>
            </div>
          )}

          {activeLayer === 'emissions' && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400">Greenhouse Gas Concentrations:</div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>CO₂ Plumes &amp; Sinks</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Methane (CH₄) Alerts</span>
              </div>
            </div>
          )}

          {activeLayer === 'ice' && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400">Polar Cryosphere:</div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded bg-sky-200" />
                <span>Multi-Year Sea Ice</span>
              </div>
              <div className="text-[10px] text-rose-400 font-medium">
                -42% Arctic summer ice decline
              </div>
            </div>
          )}

          {activeLayer === 'oceans' && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400">Marine Ecosystems:</div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>Coral Bleaching Threat</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Coastal Risk Zones</span>
              </div>
            </div>
          )}

          {activeLayer === 'forests' && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400">NASA FIRMS 24h Alerts:</div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Active Wildfire Cluster</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
