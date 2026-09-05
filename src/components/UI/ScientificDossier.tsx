import React, { useState } from 'react';
import { X, Globe2, BookOpen, AlertTriangle, ArrowRight, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { ScientificCountryProfile } from '../../types/climateIntelligence';
import { TippingPoint } from '../../data/tippingPoints';
import { audioController } from '../../utils/audioController';

interface ScientificDossierProps {
  country: ScientificCountryProfile | null;
  tippingPoint: TippingPoint | null;
  onClose: () => void;
  defaultTab?: 'drivers' | 'impacts';
}

export const ScientificDossier: React.FC<ScientificDossierProps> = ({
  country,
  tippingPoint,
  onClose,
  defaultTab = 'drivers'
}) => {
  const [tab, setTab] = useState<'drivers' | 'impacts'>(defaultTab);

  if (!country && !tippingPoint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm pointer-events-auto animate-fadeIn font-mono">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
              {country ? <Globe2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wider">
                  {country ? country.name : tippingPoint?.name}
                </h2>
                {country && (
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                    {country.code}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-cyan-400/70">
                {country
                  ? `Scientific Attribution Dossier • Paris Status: ${country.parisStatus}`
                  : `Planetary Tipping Point • Status: ${tippingPoint?.currentStatus}`}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Country Verified Key Metrics */}
          {country && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Surface Anomaly</span>
                <span className="text-base font-bold text-amber-400">+{country.tempAnomaly}°C</span>
                <span className="text-[9px] text-slate-500 block truncate mt-0.5">{country.tempAnomalySource}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Total Annual GHG</span>
                <span className="text-base font-bold text-cyan-400">{country.totalEmissionsGt} Gt</span>
                <span className="text-[9px] text-slate-500 block truncate mt-0.5">{country.emissionsSource}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Per Capita</span>
                <span className="text-base font-bold text-sky-400">{country.emissionsPerCapitaTonnes} t</span>
                <span className="text-[9px] text-slate-500 block truncate mt-0.5">t CO₂e / person / yr</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase block">Paris Target Track</span>
                <span className="text-xs font-bold text-rose-400 block truncate">{country.parisStatus}</span>
                <span className="text-[9px] text-slate-500 block truncate mt-0.5">{country.parisAssessmentSource}</span>
              </div>
            </div>
          )}

          {/* Tipping Point Overview */}
          {tippingPoint && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Estimated Tipping Threshold</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {tippingPoint.thresholdTemp}
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">{tippingPoint.fullDesc}</p>
            </div>
          )}

          {/* Tab Switcher */}
          {country && (
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('drivers');
                }}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors border-b-2 ${
                  tab === 'drivers'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                1. WHY IS IT WARMING? (ATTRIBUTED CAUSES)
              </button>
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('impacts');
                }}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors border-b-2 ${
                  tab === 'impacts'
                    ? 'border-rose-400 text-rose-300 bg-rose-500/10'
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                2. WHAT IS HAPPENING? (CAUSAL IMPACT CHAIN)
              </button>
            </div>
          )}

          {/* Drivers Tab with Verified Citations */}
          {country && tab === 'drivers' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Sectoral Greenhouse Gas Inventory (Source-Attributed):</span>
                <span className="text-amber-400 font-bold">Total: {country.totalEmissionsGt} Gt CO₂e</span>
              </div>

              {country.drivers.map((d, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 text-xs">{d.sector}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{d.annualGtCO2eq} Gt CO₂e</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                        {d.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full"
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>

                  <p className="text-slate-300 text-[11px] leading-relaxed">{d.primaryMechanism}</p>

                  {/* Academic / Institutional Attribution Badge */}
                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-500">
                    <div>
                      <strong className="text-slate-400">Source: </strong>
                      <span>{d.source} ({d.inventoryYear})</span>
                    </div>
                    <div>
                      <strong className="text-slate-400">Methodology: </strong>
                      <span>{d.methodology}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Impacts Tab: Cause ➔ Effect Chain */}
          {country && tab === 'impacts' && (
            <div className="space-y-4">
              <span className="text-[11px] text-slate-400 block">
                Peer-Reviewed Causal Mechanism & Observed Evidence:
              </span>

              {country.impacts.map((imp, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-rose-300 text-xs sm:text-sm">{imp.title}</h4>
                    <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                      {imp.severity}
                    </span>
                  </div>

                  {/* Causal Chain Steps */}
                  <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2">
                    <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider block">
                      Cause ➔ Effect Flow:
                    </span>
                    <div className="flex flex-col gap-1.5 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">1. DRIVER:</span>
                        <span className="text-slate-300">{imp.causalChain.driver}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-sky-400 font-bold shrink-0">2. MECHANISM:</span>
                        <span className="text-slate-300">{imp.causalChain.mechanism}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-orange-400 font-bold shrink-0">3. DIRECT EFFECT:</span>
                        <span className="text-slate-300">{imp.causalChain.directEffect}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold shrink-0">4. HUMAN/ECO COST:</span>
                        <span className="text-rose-300 font-semibold">{imp.causalChain.humanCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Observed Evidence */}
                  <div className="text-[11px] text-slate-300">
                    <strong className="text-slate-400 block mb-0.5">Observed Real-World Evidence:</strong>
                    <p className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">{imp.observedEvidence}</p>
                  </div>

                  {/* Citations */}
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-cyan-400" />
                    <span>Scientific Citations: {imp.citations}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tipping Point Global Ramifications */}
          {tippingPoint && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Cascading Planetary Consequences:
              </span>
              {tippingPoint.impactConsequences.map((cons, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs leading-relaxed">{cons}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900 border-t border-cyan-500/30 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-500">
            {country?.academicCitation || 'IPCC AR6 / Copernicus ERA5 Consensus Data'}
          </span>
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
