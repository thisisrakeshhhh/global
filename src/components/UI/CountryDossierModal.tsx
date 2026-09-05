import React, { useState } from 'react';
import { X, AlertTriangle, Factory, ShieldAlert, TrendingUp, Info, Activity, Globe2 } from 'lucide-react';
import { CountryClimateProfile } from '../../data/climateData';
import { TippingPoint } from '../../data/tippingPoints';
import { InteractiveEntity } from '../Globe/HotspotsPillars';
import { audioController } from '../../utils/audioController';

interface CountryDossierModalProps {
  entity: InteractiveEntity | null;
  onClose: () => void;
  activeAnalyticalMode: 'causes' | 'impacts';
}

export const CountryDossierModal: React.FC<CountryDossierModalProps> = ({
  entity,
  onClose,
  activeAnalyticalMode
}) => {
  const [activeTab, setActiveTab] = useState<'causes' | 'impacts'>(activeAnalyticalMode);

  if (!entity) return null;

  const isCountry = entity.type === 'country';
  const country = isCountry ? (entity.data as CountryClimateProfile) : null;
  const tippingPoint = !isCountry ? (entity.data as TippingPoint) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm pointer-events-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
              {isCountry ? <Globe2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold font-mono tracking-wider text-white">
                  {isCountry ? country?.name : tippingPoint?.name}
                </h2>
                {isCountry && (
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/40">
                    {country?.code}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {isCountry
                  ? `Vulnerability: ${country?.vulnerabilityRank} • Risk Index: ${country?.riskScore}/100`
                  : `Planetary Tipping Point • Status: ${tippingPoint?.currentStatus}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 font-mono text-xs">
          {/* Key Metrics Grid */}
          {isCountry && country && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Surface Anomaly</span>
                <div className="text-base sm:text-lg font-bold text-amber-400">+{country.tempAnomaly}°C</div>
                <div className="text-[10px] text-slate-500">Above baseline</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Annual Emissions</span>
                <div className="text-base sm:text-lg font-bold text-cyan-400">{country.emissionsGt} Gt</div>
                <div className="text-[10px] text-slate-500">CO₂ equivalent</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Per Capita</span>
                <div className="text-base sm:text-lg font-bold text-sky-400">{country.emissionsPerCapita} t</div>
                <div className="text-[10px] text-slate-500">per resident/yr</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Paris Status</span>
                <div className="text-xs sm:text-sm font-bold text-rose-400 truncate">{country.parisCompliance}</div>
                <div className="text-[10px] text-slate-500">IPCC target align</div>
              </div>
            </div>
          )}

          {/* Tipping Point Overview Card */}
          {!isCountry && tippingPoint && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Critical Trigger Threshold</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {tippingPoint.thresholdTemp}
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">{tippingPoint.fullDesc}</p>
            </div>
          )}

          {/* Tab Selector (Causes vs Impacts) */}
          {isCountry && (
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => {
                  audioController.playClick();
                  setActiveTab('causes');
                }}
                className={`flex-1 py-2 text-center font-bold tracking-wider transition-colors border-b-2 ${
                  activeTab === 'causes'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                WHAT DRIVES THE CRISIS (PRIMARY CAUSES)
              </button>
              <button
                onClick={() => {
                  audioController.playClick();
                  setActiveTab('impacts');
                }}
                className={`flex-1 py-2 text-center font-bold tracking-wider transition-colors border-b-2 ${
                  activeTab === 'impacts'
                    ? 'border-rose-400 text-rose-300 bg-rose-500/10'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                HOW IT HURTS (REAL-WORLD IMPACTS)
              </button>
            </div>
          )}

          {/* Causes Tab Content */}
          {isCountry && country && activeTab === 'causes' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Sectoral Greenhouse Gas Sources:
              </h3>
              {country.causes.map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{c.category}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      {c.percentage}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full"
                      style={{ width: `${c.percentage}%` }}
                    />
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{c.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Impacts Tab Content */}
          {isCountry && country && activeTab === 'impacts' && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Local Climate Disruptions & Projected Losses:
              </h3>
              {country.impacts.map((imp, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300">{imp.title}</span>
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                      {imp.severity}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{imp.description}</p>
                  <div className="text-[10px] text-amber-400/90 font-semibold pt-1">
                    Projected Consequence: {imp.projectedLoss}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tipping Point Consequences */}
          {!isCountry && tippingPoint && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                Cascading Global Ramifications:
              </h3>
              {tippingPoint.impactConsequences.map((cons, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs leading-relaxed">{cons}</span>
                </div>
              ))}
            </div>
          )}

          {/* Key Takeaway / Fact */}
          {isCountry && country && (
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-cyan-400 font-bold uppercase tracking-wider block mb-0.5">Critical Observation:</span>
                <p className="text-slate-300 text-xs leading-relaxed">{country.keyFact}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">DATA SOURCE: COPERNICUS ERA5 // IPCC AR6</span>
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-semibold transition-colors shadow-[0_0_10px_rgba(6,182,212,0.3)]"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
