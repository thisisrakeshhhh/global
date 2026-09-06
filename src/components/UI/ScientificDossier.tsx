import React, { useState } from 'react';
import { X, Globe2, BookOpen, AlertTriangle, ShieldCheck, Scale, Waves, ArrowRight, CheckCircle } from 'lucide-react';
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

  const handleClose = () => {
    audioController.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md pointer-events-auto animate-fadeIn font-sans text-slate-200">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/60 text-slate-200">
              {country ? <Globe2 className="w-5 h-5 text-cyan-400" /> : <AlertTriangle className="w-5 h-5 text-amber-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-50 tracking-tight">
                  {country ? country.name : tippingPoint?.name}
                </h2>
                {country && (
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-medium border border-slate-700">
                    {country.code}
                  </span>
                )}
                {country?.vulnerabilityCategory && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {country.vulnerabilityCategory} Vulnerability
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {country
                  ? `Climate Profile · Paris Agreement Tracker: ${country.parisStatus}`
                  : `Planetary Tipping Point · Status: ${tippingPoint?.currentStatus}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Two-Pillar Comparison Cards (Country Mode) */}
          {country && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pillar 1: Cumulative Historical Contribution */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <Scale className="w-3.5 h-3.5 text-slate-400" />
                    <span>Historical Contribution</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">1850–Present</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Cumulative CO₂</span>
                    <span className="text-2xl font-bold text-slate-50 font-mono">
                      {country.cumulativeEmissionsGt !== undefined ? `${country.cumulativeEmissionsGt} Gt` : `${country.totalEmissionsGt} Gt`}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {country.cumulativeSharePercent !== undefined ? `${country.cumulativeSharePercent}% of global emissions` : 'Annual emissions'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Per Capita (Annual)</span>
                    <span className="text-2xl font-bold text-slate-50 font-mono">
                      {country.emissionsPerCapitaTonnes} <span className="text-sm font-normal text-slate-400">t</span>
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      tonnes CO₂e / person / yr
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Current Annual: <strong className="text-slate-200">{country.totalEmissionsGt} Gt CO₂e</strong></span>
                  <span className="text-slate-500">{country.cumulativeSource || country.emissionsSource}</span>
                </div>
              </div>

              {/* Pillar 2: Climate Exposure & Vulnerability */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    <Waves className="w-3.5 h-3.5 text-slate-400" />
                    <span>Observed Vulnerability</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">ND-GAIN / IPCC</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Surface Anomaly</span>
                    <span className="text-2xl font-bold text-amber-400 font-mono">
                      +{country.tempAnomaly}°C
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {country.regionalWarmingRate || 'vs 1850-1900'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block mb-1">Vulnerability Index</span>
                    <span className="text-2xl font-bold text-slate-50 font-mono">
                      {country.ndGainRank || country.vulnerabilityCategory}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      ND-GAIN Global Index
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-[240px] text-slate-300">{country.keyObservation}</span>
                  <span className="text-slate-500 shrink-0">IPCC AR6 WGII</span>
                </div>
              </div>
            </div>
          )}

          {/* Attribution Guardrail Alert */}
          {country?.attributionGuardrail && (
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 font-semibold block mb-1">Scientific Attribution Guardrail:</strong>
                <span>{country.attributionGuardrail}</span>
              </div>
            </div>
          )}

          {/* Tipping Point Overview */}
          {tippingPoint && (
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-semibold text-xs uppercase tracking-wider">Estimated Tipping Threshold</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono font-semibold text-xs">
                  {tippingPoint.thresholdTemp}
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{tippingPoint.fullDesc}</p>
            </div>
          )}

          {/* Clean 3 Tabs Switcher */}
          {country && (
            <div className="flex border-b border-slate-800">
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('contribution');
                }}
                className={`flex-1 py-2.5 text-center font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                  tab === 'contribution'
                    ? 'border-slate-200 text-slate-100 font-bold bg-slate-900/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Emissions & Sectors
              </button>
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('vulnerability');
                }}
                className={`flex-1 py-2.5 text-center font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                  tab === 'vulnerability'
                    ? 'border-slate-200 text-slate-100 font-bold bg-slate-900/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Climate Impacts & Exposure
              </button>
              <button
                onClick={() => {
                  audioController.playClick();
                  setTab('guardrails');
                }}
                className={`flex-1 py-2.5 text-center font-medium text-xs sm:text-sm transition-colors border-b-2 ${
                  tab === 'guardrails'
                    ? 'border-slate-200 text-slate-100 font-bold bg-slate-900/50'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Evidence & Citations
              </button>
            </div>
          )}

          {/* Tab 1: Historical Emissions & Sectors */}
          {country && tab === 'contribution' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Sectoral greenhouse gas inventory (source-attributed):</span>
                <span className="text-slate-200 font-semibold font-mono">Total: {country.totalEmissionsGt} Gt CO₂e/yr</span>
              </div>

              {country.drivers.map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-100 text-sm">{d.sector}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-200 font-semibold text-xs">{d.annualGtCO2eq} Gt CO₂e</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-semibold">
                        {d.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full"
                      style={{ width: `${d.percentage}%` }}
                    />
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{d.primaryMechanism}</p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>Source: <strong className="text-slate-300 font-normal">{d.source} ({d.inventoryYear})</strong></span>
                    <span className="text-slate-500">{d.methodology}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Climate Exposure & Impacts */}
          {country && tab === 'vulnerability' && (
            <div className="space-y-4">
              <span className="text-xs text-slate-400 block">
                Peer-reviewed causal mechanisms & observed evidence:
              </span>

              {country.impacts.map((imp, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-100 text-sm sm:text-base">{imp.title}</h4>
                    <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                      {imp.severity} severity
                    </span>
                  </div>

                  {/* Causal Chain Steps */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs uppercase text-slate-400 font-semibold block">
                      Cause & Effect Flow:
                    </span>
                    <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 font-semibold shrink-0">1. DRIVER:</span>
                        <span className="text-slate-200">{imp.causalChain.driver}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 font-semibold shrink-0">2. MECHANISM:</span>
                        <span className="text-slate-200">{imp.causalChain.mechanism}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-slate-400 font-semibold shrink-0">3. DIRECT EFFECT:</span>
                        <span className="text-slate-200">{imp.causalChain.directEffect}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-rose-400 font-semibold shrink-0">4. HUMAN/ECO COST:</span>
                        <span className="text-slate-100 font-medium">{imp.causalChain.humanCost}</span>
                      </div>
                    </div>
                  </div>

                  {/* Observed Evidence */}
                  <div className="text-xs sm:text-sm text-slate-300">
                    <strong className="text-slate-400 font-medium block mb-1">Observed Real-World Evidence:</strong>
                    <p className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">{imp.observedEvidence}</p>
                  </div>

                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Scientific Citations: {imp.citations}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Evidence & Citations */}
          {country && tab === 'guardrails' && (
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                Scientific Attribution Standards & Peer-Reviewed Sources
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                EARTH // LIVE adheres to IPCC AR6 Working Group I (Physical Science Basis) and Working Group II (Impacts, Adaptation and Vulnerability) consensus standards.
              </p>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs sm:text-sm">
                <strong className="text-slate-200 block">Core Attribution Principles:</strong>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-300">
                  <li><strong className="text-slate-100">Separate Contribution from Vulnerability:</strong> High historical cumulative emitters (e.g. US, EU) often possess high adaptive infrastructure, whereas low-emitting territories (e.g. Tuvalu, Nigeria) experience extreme humanitarian vulnerability.</li>
                  <li><strong className="text-slate-100">Observational Radiance vs Ignition:</strong> Thermal sensors (VIIRS/MODIS) measure radiant heat (FRP), not ignition causes. Proximate causes (lightning, agricultural clearance, aridity) are distinguished based on verified agency reporting.</li>
                  <li><strong className="text-slate-100">Zero Fabricated Numbers:</strong> All metrics link directly to verified inventories (Global Carbon Project, EDGAR, ND-GAIN, NASA GISTEMP, NOAA MLO).</li>
                </ul>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                <strong className="text-slate-300 block mb-1">Academic & Primary Citations:</strong>
                <p className="text-slate-400 font-mono text-xs">{country.academicCitation}</p>
              </div>
            </div>
          )}

          {/* Tipping Point Global Ramifications */}
          {tippingPoint && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Cascading Planetary Consequences:
              </span>
              {tippingPoint.impactConsequences.map((cons, i) => (
                <div key={i} className="flex items-start gap-2 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">{cons}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 truncate max-w-[380px]">
            {country?.academicCitation || 'IPCC AR6 / Copernicus ERA5 Consensus Data'}
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
