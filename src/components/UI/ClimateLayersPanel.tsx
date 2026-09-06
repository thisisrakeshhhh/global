import React from 'react';
import { Layers, Flame, Disc, Thermometer, Waves, Snowflake, Leaf, ChevronRight, Crosshair } from 'lucide-react';
import { ClimateLayer } from '../Globe/ClimateGlobe';
import { audioController } from '../../utils/audioController';

export interface LayerState {
  fires: boolean;
  cyclones: boolean;
  temperature: boolean;
  oceanHeat: boolean;
  polarIce: boolean;
  greenhouseGases: boolean;
}

interface ClimateLayersPanelProps {
  layers: LayerState;
  onToggleLayer: (layerKey: keyof LayerState) => void;
  onOpenSourceModal?: () => void;
}

export const ClimateLayersPanel: React.FC<ClimateLayersPanelProps> = ({
  layers,
  onToggleLayer,
  onOpenSourceModal
}) => {
  const layerItems = [
    {
      key: 'fires' as keyof LayerState,
      label: 'Active Fires (NASA FIRMS)',
      sublabel: 'Real-time thermal hotspots',
      icon: <Flame className="w-4 h-4 text-orange-400" />,
      color: 'bg-orange-500/10'
    },
    {
      key: 'cyclones' as keyof LayerState,
      label: 'Cyclones (NOAA NHC)',
      sublabel: 'Storms & forecast tracks',
      icon: <Disc className="w-4 h-4 text-purple-400" />,
      color: 'bg-purple-500/10'
    },
    {
      key: 'temperature' as keyof LayerState,
      label: 'Temperature Anomaly',
      sublabel: 'Global surface temperature',
      icon: <Thermometer className="w-4 h-4 text-rose-400" />,
      color: 'bg-rose-500/10'
    },
    {
      key: 'oceanHeat' as keyof LayerState,
      label: 'Ocean Heat',
      sublabel: 'Sea surface temperature',
      icon: <Waves className="w-4 h-4 text-sky-400" />,
      color: 'bg-sky-500/10'
    },
    {
      key: 'polarIce' as keyof LayerState,
      label: 'Polar Ice',
      sublabel: 'Ice extent & mass loss',
      icon: <Snowflake className="w-4 h-4 text-cyan-400" />,
      color: 'bg-cyan-500/10'
    },
    {
      key: 'greenhouseGases' as keyof LayerState,
      label: 'CO₂ & Greenhouse Gases',
      sublabel: 'Atmospheric concentration',
      icon: <Leaf className="w-4 h-4 text-emerald-400" />,
      color: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="w-[270px] bg-[#0a1224]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3 flex flex-col gap-2 shadow-2xl pointer-events-auto select-none max-h-[calc(100vh-210px)] overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-2 pb-1 border-b border-slate-800/60">
        <Layers className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-xs font-bold text-white tracking-wide">
          Climate Layers
        </span>
      </div>

      {/* Layer Toggles */}
      <div className="flex flex-col gap-1.5">
        {layerItems.map((item) => {
          const isChecked = layers[item.key];
          return (
            <div
              key={item.key}
              onClick={() => {
                audioController.playSelect();
                onToggleLayer(item.key);
              }}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-800/40 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg ${item.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight">
                    {item.sublabel}
                  </span>
                </div>
              </div>

              {/* iOS Toggle Switch */}
              <div
                className={`relative w-10 h-5 rounded-full transition-colors duration-200 ease-in-out cursor-pointer flex items-center p-0.5 ${
                  isChecked ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    isChecked ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Fire Intensity Scale */}
      <div className="mt-1 pt-2 border-t border-slate-800/60 flex flex-col gap-1.5">
        <span className="text-[11px] font-medium text-slate-400">
          Fire Intensity Scale
        </span>
        <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#facc15] via-[#f97316] via-[#e11d48] to-[#9333ea] shadow-inner" />
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Extreme</span>
        </div>
      </div>

      {/* Bottom NASA FIRMS Info Card */}
      <div
        onClick={onOpenSourceModal}
        className="mt-1 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 flex items-center justify-between cursor-pointer transition group"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
            <Crosshair className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
              NASA FIRMS
            </div>
            <div className="text-[10px] text-slate-400">
              VIIRS + MODIS • 1.5° Clustering
            </div>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition" />
      </div>
    </div>
  );
};
