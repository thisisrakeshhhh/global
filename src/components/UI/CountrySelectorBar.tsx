import React from 'react';
import { Globe2, Scale, Waves, ChevronRight } from 'lucide-react';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { ScientificCountryProfile } from '../../types/climateIntelligence';

interface CountrySelectorBarProps {
  selectedCountryId?: string;
  onSelectCountry: (country: ScientificCountryProfile) => void;
}

export const CountrySelectorBar: React.FC<CountrySelectorBarProps> = ({
  selectedCountryId,
  onSelectCountry
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.15)] text-slate-100 font-sans pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
            02 — WHERE IS IT CHANGING?
          </div>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            Global Country Intelligence: Historical Contribution vs Climate Vulnerability
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Select country to inspect 2-pillar dossier
        </span>
      </div>

      {/* Horizontal Scrollable Country Cards */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-700">
        {SCIENTIFIC_COUNTRY_INTELLIGENCE.map((country) => {
          const isSelected = country.id === selectedCountryId;
          return (
            <button
              key={country.id}
              onClick={() => onSelectCountry(country)}
              className={`flex-shrink-0 w-52 sm:w-56 p-2.5 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-white group-hover:text-cyan-300">{country.name}</span>
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
                  {country.vulnerabilityCategory || 'Vulnerable'}
                </span>
              </div>

              {/* Two-Pillar Micro Stats */}
              <div className="grid grid-cols-2 gap-1 text-[10px] mb-1.5">
                <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold mb-0.5">
                    <Scale className="w-2.5 h-2.5" />
                    <span>Cumul. CO₂</span>
                  </div>
                  <div className="font-mono font-bold text-slate-200">
                    {country.cumulativeSharePercent !== undefined ? `${country.cumulativeSharePercent}%` : `${country.totalEmissionsGt} Gt`}
                  </div>
                </div>

                <div className="bg-slate-950/60 p-1.5 rounded border border-slate-800/80">
                  <div className="flex items-center gap-1 text-rose-400 font-semibold mb-0.5">
                    <Waves className="w-2.5 h-2.5" />
                    <span>Anomaly</span>
                  </div>
                  <div className="font-mono font-bold text-slate-200">
                    +{country.tempAnomaly}°C
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400">
                <span className="truncate max-w-[150px]">{country.ndGainRank ? `ND-GAIN: ${country.ndGainRank}` : country.parisStatus}</span>
                <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
