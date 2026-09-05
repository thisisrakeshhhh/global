import React from 'react';
import { X, TrendingUp, AlertTriangle, ShieldCheck, Thermometer, Waves } from 'lucide-react';
import { SSPScenario } from '../../types/climateIntelligence';
import { IPCC_PROJECTION_SCENARIOS } from '../../services/timeDomainService';
import { audioController } from '../../utils/audioController';

interface ScenarioComparisonModalProps {
  selectedSSP: SSPScenario;
  onSelectSSP: (ssp: SSPScenario) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ScenarioComparisonModal: React.FC<ScenarioComparisonModalProps> = ({
  selectedSSP,
  onSelectSSP,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const scenarios: SSPScenario[] = ['SSP1-2.6', 'SSP2-4.5', 'SSP5-8.5'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm pointer-events-auto animate-fadeIn font-mono">
      <div className="relative w-full max-w-3xl bg-slate-950 border border-purple-500/50 rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wider">
                  IPCC AR6 SHARED SOCIOECONOMIC PATHWAYS (2026–2100)
                </h2>
              </div>
              <p className="text-[11px] text-purple-400/80">
                Peer-Reviewed Climate Model Projections (IPCC Working Group I)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Scenario Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scenarios.map((sspKey) => {
              const ssp = IPCC_PROJECTION_SCENARIOS[sspKey];
              const isSelected = selectedSSP === sspKey;
              return (
                <button
                  key={sspKey}
                  onClick={() => {
                    audioController.playSelect();
                    onSelectSSP(sspKey);
                  }}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-purple-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-purple-300">{ssp.ssp}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
                      {isSelected ? 'ACTIVE' : 'SELECT'}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-300 font-semibold line-clamp-2">
                    {ssp.name}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">2100 Anomaly:</span>
                      <span className="font-bold text-amber-400">{ssp.tempBy2100}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">2100 CO₂:</span>
                      <span className="font-bold text-cyan-400">{ssp.co2By2100}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Scenario Breakdown */}
          {(() => {
            const current = IPCC_PROJECTION_SCENARIOS[selectedSSP];
            return (
              <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">
                    {current.ssp}: {current.name}
                  </h3>
                  <span className="text-amber-400 font-bold">2100 Warming: {current.tempBy2100}</span>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed">{current.summary}</p>

                <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 space-y-1">
                  <strong className="text-purple-300 block text-[11px]">Socioeconomic Assumptions:</strong>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{current.assumptions}</p>
                </div>

                {/* Decadal Projection Table */}
                <div className="space-y-1.5 pt-1">
                  <strong className="text-slate-400 block text-[11px]">Decadal Trajectory Milestones:</strong>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[11px]">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-500">
                          <th className="pb-1.5">Year</th>
                          <th className="pb-1.5">Surface Temp (°C)</th>
                          <th className="pb-1.5">Atmospheric CO₂</th>
                          <th className="pb-1.5">Arctic Ice (M km²)</th>
                          <th className="pb-1.5">Sea Level Rise (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {current.decadalTrajectory.map((pt) => (
                          <tr key={pt.year} className="hover:bg-slate-800/40">
                            <td className="py-1.5 font-bold text-slate-300">{pt.year}</td>
                            <td className="py-1.5 text-amber-400 font-bold">+{pt.tempAnomaly.toFixed(2)}°C</td>
                            <td className="py-1.5 text-cyan-400">{pt.co2Ppm.toFixed(1)} ppm</td>
                            <td className="py-1.5 text-sky-300">{pt.seaIceExtentMkm2.toFixed(2)} M km²</td>
                            <td className="py-1.5 text-rose-400">+{pt.seaLevelRiseCm} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900 border-t border-purple-500/30 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-500">Source: IPCC Sixth Assessment Report (AR6 WG I, 2021)</span>
          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
          >
            Apply Scenario
          </button>
        </div>
      </div>
    </div>
  );
};
