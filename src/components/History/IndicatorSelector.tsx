import React from 'react';
import { IndicatorType, INDICATOR_METADATA } from '../../services/climateHistoryService';
import { Thermometer, Cloud, Waves, Flame, Snowflake, TrendingUp } from 'lucide-react';

interface IndicatorSelectorProps {
  selectedIndicator: IndicatorType;
  onSelectIndicator: (indicator: IndicatorType) => void;
}

export const IndicatorSelector: React.FC<IndicatorSelectorProps> = ({
  selectedIndicator,
  onSelectIndicator
}) => {
  const indicators: { id: IndicatorType; label: string; icon: React.ReactNode }[] = [
    { id: 'temperature', label: 'Surface Temp', icon: <Thermometer className="w-3.5 h-3.5" /> },
    { id: 'co2', label: 'Atmospheric CO₂', icon: <Cloud className="w-3.5 h-3.5" /> },
    { id: 'ocean', label: 'Sea Surface Temp', icon: <Waves className="w-3.5 h-3.5" /> },
    { id: 'oceanHeat', label: 'Ocean Heat (0–2000m)', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'seaIce', label: 'Arctic Sea Ice', icon: <Snowflake className="w-3.5 h-3.5" /> },
    { id: 'seaLevel', label: 'Sea Level Rise', icon: <TrendingUp className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
      {indicators.map(({ id, label, icon }) => {
        const isSelected = selectedIndicator === id;
        const meta = INDICATOR_METADATA[id];
        return (
          <button
            key={id}
            onClick={() => onSelectIndicator(id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isSelected
                ? 'bg-slate-800 text-slate-100 shadow-sm border border-slate-700/80 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <span style={{ color: isSelected ? meta.colorHex : undefined }}>{icon}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
