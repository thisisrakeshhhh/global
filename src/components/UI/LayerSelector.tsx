import React from 'react';
import { Flame, Thermometer, CloudRain, Waves, Snowflake, Layers } from 'lucide-react';
import { ClimateLayer } from '../Globe/ClimateGlobe';
import { audioController } from '../../utils/audioController';

interface LayerSelectorProps {
  activeLayer: ClimateLayer;
  onSelectLayer: (layer: ClimateLayer) => void;
}

interface LayerOption {
  id: ClimateLayer;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  activeColor: string;
}

const LAYERS: LayerOption[] = [
  {
    id: 'temperature',
    label: 'Surface Temp Anomaly',
    sublabel: 'Copernicus ERA5 Heatmap',
    icon: <Thermometer className="w-4 h-4" />,
    activeColor: 'from-amber-500/20 to-rose-500/20 border-rose-500 text-rose-300'
  },
  {
    id: 'emissions',
    label: 'Greenhouse Gas Plumes',
    sublabel: 'Atmospheric CO₂ & Methane',
    icon: <CloudRain className="w-4 h-4" />,
    activeColor: 'from-purple-500/20 to-indigo-500/20 border-purple-500 text-purple-300'
  },
  {
    id: 'oceans',
    label: 'Ocean Heat & Sea Level',
    sublabel: 'Marine Heatwaves & Inundation',
    icon: <Waves className="w-4 h-4" />,
    activeColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-400 text-cyan-300'
  },
  {
    id: 'ice',
    label: 'Polar Cryosphere & Ice',
    sublabel: 'NSIDC Sea Ice Extent Loss',
    icon: <Snowflake className="w-4 h-4" />,
    activeColor: 'from-sky-500/20 to-teal-500/20 border-sky-400 text-sky-200'
  },
  {
    id: 'forests',
    label: 'Wildfires & Deforestation',
    sublabel: 'NASA FIRMS Thermal Alerts',
    icon: <Flame className="w-4 h-4" />,
    activeColor: 'from-orange-500/20 to-red-500/20 border-orange-500 text-orange-300'
  }
];

export const LayerSelector: React.FC<LayerSelectorProps> = ({ activeLayer, onSelectLayer }) => {
  return (
    <div className="flex flex-col gap-1.5 max-w-[230px] pointer-events-auto">
      <div className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono tracking-wider text-cyan-400/80 uppercase font-bold">
        <Layers className="w-3 h-3" />
        <span>Climate Satellite Layers</span>
      </div>

      <div className="flex flex-col gap-1 bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 rounded-xl p-1.5 shadow-2xl">
        {LAYERS.map((layer) => {
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => {
                audioController.playSelect();
                onSelectLayer(layer.id);
              }}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-left transition-all border ${
                isActive
                  ? `bg-gradient-to-r ${layer.activeColor} shadow-[0_0_12px_rgba(6,182,212,0.25)] font-semibold`
                  : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <div className={`${isActive ? 'text-white scale-110' : 'text-slate-400'} transition-transform`}>
                {layer.icon}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-mono truncate">{layer.label}</span>
                <span className="text-[9px] text-slate-500 font-mono truncate">{layer.sublabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
