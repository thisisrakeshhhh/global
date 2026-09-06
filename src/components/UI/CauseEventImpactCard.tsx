import React, { useState } from 'react';
import { ArrowRight, Flame, Thermometer, Wind, ShieldAlert, BookOpen, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { audioController } from '../../utils/audioController';

export const CauseEventImpactCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="w-full max-w-4xl mx-auto my-2 pointer-events-auto font-mono text-xs">
      <div className="bg-slate-950/90 backdrop-blur-md border border-cyan-500/35 rounded-xl p-3 shadow-2xl space-y-2.5">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs uppercase text-slate-200 font-bold tracking-wider">
              EARTH DYNAMICS // CAUSE ➔ EVENT ➔ IMPACT ATTRIBUTION ENGINE
            </span>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              setIsExpanded(!isExpanded);
            }}
            className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
          >
            <span>{isExpanded ? 'Collapse Analysis' : 'Expand Analysis'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Chain Pipeline */}
        {isExpanded && (
          <div className="space-y-3 pt-1">
            {/* 3-Step Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              {/* Step 1: DRIVER / WHY */}
              <div className="p-3 rounded-lg bg-slate-900/70 border border-amber-500/30 space-y-1">
                <div className="flex items-center justify-between text-amber-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5" />
                    1. CLIMATE DRIVER
                  </span>
                  <span className="text-[9px] uppercase px-1 rounded bg-amber-500/20">WHY</span>
                </div>
                <p className="text-slate-300 text-[10px] leading-relaxed">
                  Greenhouse radiative forcing drives prolonged heatwaves, elevated vapor pressure deficit, and severe soil/vegetation moisture exhaustion.
                </p>
              </div>

              {/* Step 2: SATELLITE EVENT */}
              <div className="p-3 rounded-lg bg-slate-900/70 border border-orange-500/30 space-y-1">
                <div className="flex items-center justify-between text-orange-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    2. ACTIVE DETECTIONS
                  </span>
                  <span className="text-[9px] uppercase px-1 rounded bg-orange-500/20">EVENT</span>
                </div>
                <p className="text-slate-300 text-[10px] leading-relaxed">
                  NASA FIRMS & NOAA satellites detect high Fire Radiative Power (FRP), expanding burn perimeters, and category 3–5 tropical cyclone intensification.
                </p>
              </div>

              {/* Step 3: IMPACT */}
              <div className="p-3 rounded-lg bg-slate-900/70 border border-rose-500/30 space-y-1">
                <div className="flex items-center justify-between text-rose-400 font-bold">
                  <span className="flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    3. BIOSPHERE IMPACT
                  </span>
                  <span className="text-[9px] uppercase px-1 rounded bg-rose-500/20">IMPACT</span>
                </div>
                <p className="text-slate-300 text-[10px] leading-relaxed">
                  Dense particulate smoke (PM2.5) hazards, massive gigaton carbon venting, permanent canopy deforestation, and coastal storm surges.
                </p>
              </div>
            </div>

            {/* Bottom Sources Bar */}
            <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
              <div className="flex items-center gap-3">
                <span>Verified Sources: <strong>NASA FIRMS</strong> (Active Fires)</span>
                <span>•</span>
                <span><strong>NOAA NHC</strong> (Tropical Cyclones)</span>
                <span>•</span>
                <span><strong>Copernicus ERA5</strong> (Reanalysis)</span>
              </div>
              <div className="text-cyan-400">
                Click any active pin on the 3D globe to view event-specific scientific dossiers.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
