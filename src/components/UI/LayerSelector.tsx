import React, { useState } from 'react';
import { Flame, Thermometer, CloudRain, Waves, Snowflake, Layers, ChevronDown, ChevronUp, Check } from 'lucide-react';
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
  indicatorColor: string;
}

const LAYERS: LayerOption[] = [
  {
    id: 'temperature',
    label: 'Surface Temp Anomaly',
    sublabel: 'Copernicus ERA5 Heatmap',
    icon: <Thermometer className="w-4 h-4 text-amber-400" />,
    indicatorColor: 'bg-amber-400'
  },
  {
    id: 'emissions',
    label: 'Greenhouse Gas Plumes',
    sublabel: 'Atmospheric CO₂ & Methane',
    icon: <CloudRain className="w-4 h-4 text-purple-400" />,
    indicatorColor: 'bg-purple-400'
  },
  {
    id: 'oceans',
    label: 'Ocean Heat & Sea Level',
    sublabel: 'Marine Heatwaves & Inundation',
    icon: <Waves className="w-4 h-4 text-sky-400" />,
    indicatorColor: 'bg-sky-400'
  },
  {
    id: 'ice',
    label: 'Polar Cryosphere & Ice',
    sublabel: 'NSIDC Sea Ice Extent Loss',
    icon: <Snowflake className="w-4 h-4 text-teal-300" />,
    indicatorColor: 'bg-teal-300'
  },
  {
    id: 'forests',
    label: 'Wildfires & Deforestation',
    sublabel: 'NASA FIRMS Thermal Alerts',
    icon: <Flame className="w-4 h-4 text-orange-400" />,
    indicatorColor: 'bg-orange-400'
  }
];

export const LayerSelector: React.FC<LayerSelectorProps> = ({ activeLayer, onSelectLayer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const current = LAYERS.find(l => l.id === activeLayer) || LAYERS[0];

  return (
    <div className="relative pointer-events-auto font-sans">
      {/* Sleek Google Earth Style Layers Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#1e1e1e]/90 hover:bg-[#282828]/95 border border-white/10 backdrop-blur-md shadow-xl text-xs text-white transition-all"
      >
        <div className="flex items-center gap-2">
          {current.icon}
          <span className="font-medium tracking-tight text-slate-100">{current.label}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 pl-1 border-l border-white/10">
          <span className="text-[10px] text-slate-400 uppercase font-mono">Layer</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#1e1e1e]/95 border border-white/10 shadow-2xl backdrop-blur-xl p-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 tracking-wide border-b border-white/10 mb-1">
            Climate Data Layers
          </div>
          <div className="space-y-1">
            {LAYERS.map((layer) => {
              const isActive = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    audioController.playSelect();
                    onSelectLayer(layer.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-white/10 text-white font-medium shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-black/40">
                      {layer.icon}
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{layer.label}</div>
                      <div className="text-[10px] text-slate-400">{layer.sublabel}</div>
                    </div>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
