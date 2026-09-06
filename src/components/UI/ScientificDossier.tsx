import React, { useState } from 'react';
import { X, Globe2, BookOpen, AlertTriangle, ShieldCheck, Scale, Flame, Waves, ExternalLink, CheckCircle } from 'lucide-react';
import { ScientificCountryProfile } from '../../types/climateIntelligence';
import { TippingPoint } from '../../data/tippingPoints';
import { audioController } from '../../utils/audioController';

interface ScientificDossierProps {
  country: ScientificCountryProfile | null;
  tippingPoint: TippingPoint | null;
  onClose: () => void;
  defaultTab?: 'contribution' | 'vulnerability' | 'guardrails';
}

export const ScientificDossier: React.FC<ScientificDossierProps> = ({
  country,
  tippingPoint,
  onClose,
  defaultTab = 'contribution'
}) => {
  const [tab, setTab] = useState<'contribution' | 'vulnerability' | 'guardrails'>(defaultTab);

  if (!country && !tippingPoint) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md pointer-events-auto animate-fadeIn font-sans text-slate-100">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
              {country ? <Globe2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white tracking-wider">
                  {country ? country.name : tippingPoint?.name}
                </h2>
                {country && (
                  <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold border border-cyan-500/40">
                    {country.code}
                  </span>
                )}
                {country?.vulnerabilityCategory && (
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    country.vulnerabilityCategory === 'Extreme'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : country.vulnerabilityCategory === 'High'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {country.vulnerabilityCategory} Vulnerability
                  </span>
                )}
              </div>
              <p className="text-[11px] text-cyan-400/80 mt-0.5">
                {country
                  ? `02 — WHERE IS IT CHANGING? • Paris Agreement Assessment: ${country.parisStatus}`
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
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Strict Two-Pillar Comparison Cards (Country Mode) */}
          {country && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Pillar 1: Cumulative Historical Contribution */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-amber-500/20 mb-2.5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Scale className="w-3.5 h-3.5" />
                    Pillar 1: Historical Contribution
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">1850–Present</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Cumulative CO₂</span>
                    <span className="text-base sm:text-lg font-black font-mono text-amber-300">
                      {country.cumulativeEmissionsGt !== undefined ? `${country.cumulativeEmissionsGt} Gt` : `${country.totalEmissionsGt} Gt/yr`}
                    </span>
                    <span className="text-[9px] text-amber-400/80 block font-medium">
                      {country.cumulativeSharePercent !== undefined ? `${country.cumulativeSharePercent}% of global total` : 'Annual metric'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Per Capita (Annual)</span>
                    <span className="text-base sm:text-lg font-black font-mono text-cyan-300">
                      {country.emissionsPerCapitaTonnes} <span className="text-xs font-normal text-slate-400">t</span>
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate">
                      t CO₂e / person / yr
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Current Annual: <strong className="text-slate-200">{country.totalEmissionsGt} Gt CO₂e</strong></span>
                  <span className="text-slate-500 truncate max-w-[180px]">{country.cumulativeSource || country.emissionsSource}</span>
                </div>
              </div>

              {/* Pillar 2: Climate Exposure & Vulnerability */}
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900/90 to-rose-950/20 border border-rose-500/30 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-rose-500/20 mb-2.5">
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <Waves className="w-3.5 h-3.5" />
                    Pillar 2: Exposure & Vulnerability
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">ND-GAIN / IPCC</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Surface Anomaly</span>
                    <span className="text-base sm:text-lg font-black font-mono text-rose-400">
                      +{country.tempAnomaly}°C
                    </span>
                    <span className="text-[9px] text-slate-400 block truncate">
                      {country.regionalWarmingRate || 'vs 1850-1900'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Vulnerability Rank</span>
                    <span className="text-base sm:text-lg font-black font-mono text-amber-300">
                      {country.ndGainRank || country.vulnerabilityCategory}
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      ND-GAIN Index
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-[200px] text-slate-300">{country.keyObservation}</span>
                  <span className="text-rose-400/80 font-semibold shrink-0">IPCC AR6 WGII</span>
                </div>
              </div>
            </div>
          )}

          {/* Attribution Guardrail Alert */}
          {country?.attributionGuardrail && (
            <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5 text-[11px] text-cyan-200/90 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Scientific Attribution Guardrail:</strong>
                <span>{country.attributionGuardrail}</span>
              </div>
            </div>
          )}

          {/* Tipping Point Overview */}
          {tippingPoint && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Estimated Tipping Threshold</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                  {tippingPoint.thresholdTemp}
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">{tippingPoint.fullDesc}</p>
            </div>
          )}

          {/* 3 Tabs Switcher */}
          {country && (
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('contribution');
                }}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors border-b-2 text-xs ${
                  tab === 'contribution'
                    ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                1. HISTORICAL EMISSIONS & SECTORS
              </button>
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('vulnerability');
                }}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors border-b-2 text-xs ${
                  tab === 'vulnerability'
                    ? 'border-rose-400 text-rose-300 bg-rose-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                2. OBSERVED IMPACTS & EXPOSURE
              </button>
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('guardrails');
                }}
                className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors border-b-2 text-xs ${
                  tab === 'guardrails'
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                3. EVIDENCE & CITATIONS
              </button>
            </div>
          )}

          {/* Tab 1: Historical Emissions & Sectors */}
          {country && tab === 'contribution' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Sectoral Greenhouse Gas Inventory (Source-Attributed):</span>
                <span className="text-amber-400 font-bold font-mono">Total: {country.totalEmissionsGt} Gt CO₂e/yr</span>
              </div>

              {country.drivers.map((d, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200 text-xs">{d.sector}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-cyan-400 font-bold">{d.annualGtCO2eq} Gt CO₂e</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px]">
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

                  {/* Institutional Attribution */}
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

          {/* Tab 2: Climate Exposure & Impacts */}
          {country && tab === 'vulnerability' && (
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

          {/* Tab 3: Evidence & Citations */}
          {country && tab === 'guardrails' && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                Scientific Attribution Standards & Peer-Reviewed Sources
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                EARTH // LIVE adheres to IPCC AR6 Working Group I (Physical Science Basis) and Working Group II (Impacts, Adaptation and Vulnerability) standards.
              </p>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
                <strong className="text-slate-200 block">Core Attribution Principles:</strong>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  <li><strong className="text-slate-300">Separate Contribution from Vulnerability:</strong> High historical cumulative emitters (e.g. US, EU) often possess high adaptive infrastructure, whereas low-emitting territories (e.g. Tuvalu, Nigeria) experience extreme humanitarian vulnerability.</li>
                  <li><strong className="text-slate-300">Observational Radiance vs Ignition:</strong> Thermal sensors (VIIRS/MODIS) measure radiant heat (FRP), not ignition causes. Proximate causes (lightning, agricultural clearance, aridity) are distinguished based on verified agency reporting.</li>
                  <li><strong className="text-slate-300">Zero Fabricated Numbers:</strong> All metrics link directly to verified inventories (Global Carbon Project, EDGAR, ND-GAIN, NASA GISTEMP, NOAA MLO).</li>
                </ul>
              </div>

              <div className="pt-2 text-[11px] text-slate-400">
                <strong className="text-slate-300 block mb-1">Academic & Primary Citations:</strong>
                <p className="text-slate-400 font-mono text-[10px]">{country.academicCitation}</p>
              </div>
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
        <div className="px-5 py-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-500 truncate max-w-[350px]">
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
