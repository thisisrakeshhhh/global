import React from 'react';
import { Globe2, Scale, Waves, ChevronRight, Thermometer, Flame, CloudRain, Mountain, ShieldAlert } from 'lucide-react';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { ScientificCountryProfile } from '../../types/climateIntelligence';

interface CountrySelectorBarProps {
  selectedCountryId?: string;
  onSelectCountry: (country: ScientificCountryProfile) => void;
  onExploreHistory?: (country: ScientificCountryProfile) => void;
}

export const CountrySelectorBar: React.FC<CountrySelectorBarProps> = ({
  selectedCountryId,
  onSelectCountry,
  onExploreHistory
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] text-slate-100 font-sans pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
            <Globe2 className="w-3 h-3 text-cyan-400" />
            COUNTRIES
          </span>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            How is climate change affecting different countries?
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Click any country for the 2-pillar climate dossier
        </span>
      </div>

      {/* Horizontal Scrollable Country Scorecards */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-700">
        {SCIENTIFIC_COUNTRY_INTELLIGENCE.map((country) => {
          const isSelected = country.id === selectedCountryId;
          const warmingBarWidth = Math.min(100, Math.round((country.tempAnomaly / 3.0) * 100));

          return (
            <button
              key={country.id}
              onClick={() => onSelectCountry(country)}
              className={`flex-shrink-0 w-60 sm:w-64 p-3 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white group-hover:text-cyan-300">
                    {country.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {country.code}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                    country.vulnerabilityCategory === 'Extreme'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : country.vulnerabilityCategory === 'High'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  }`}
                >
                  {country.vulnerabilityCategory || 'Vulnerable'} Risk
                </span>
              </div>

              {/* Visual Warming Bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-amber-400" />
                    Warming Anomaly
                  </span>
                  <span className="font-mono font-bold text-amber-300">+{country.tempAnomaly}°C</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                    style={{ width: `${warmingBarWidth}%` }}
                  />
                </div>
              </div>

              {/* Exposure Ratings */}
              <div className="grid grid-cols-2 gap-1 text-[10px] mb-2 bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Extreme Heat:</span>
                  <span className="font-bold text-rose-400">HIGH</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Rainfall:</span>
                  <span className="font-bold text-sky-400">VARIABLE</span>
                </div>
              </div>

              {/* Historical Contribution */}
              <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span>Cumul. CO₂: <strong className="text-amber-400">{country.cumulativeSharePercent}%</strong></span>
                <span className="flex items-center gap-0.5 text-cyan-400 font-semibold">
                  <span>Dossier</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
