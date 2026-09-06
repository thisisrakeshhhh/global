import React, { useState } from 'react';
import { Activity, Satellite, CheckCircle, Clock, Database, ChevronDown, ChevronUp, AlertCircle, RefreshCw, X } from 'lucide-react';
import { SourceFreshnessReport } from '../../types/climateIntelligence';

interface DataFreshnessPanelProps {
  reports: SourceFreshnessReport[];
  onManualRefresh?: () => void;
  isRefreshing?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DataFreshnessPanel: React.FC<DataFreshnessPanelProps> = ({
  reports,
  onManualRefresh,
  isRefreshing = false,
  isOpen: controlledIsOpen,
  onClose
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = (val: boolean) => {
    if (controlledIsOpen !== undefined) {
      if (!val) onClose?.();
    } else {
      setInternalIsOpen(val);
    }
  };

  const isDegraded = reports.some(r => r.state === 'DELAYED' || r.state === 'NO_DATA');

  const getBadgeStyle = (category: string, state: string) => {
    if (state === 'DELAYED' || state === 'NO_DATA') return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    if (state === 'LIVE') return 'bg-red-500/20 text-red-400 border-red-500/40';
    if (state === 'NEAR-REAL-TIME') return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    if (state === 'UPDATED') return 'bg-sky-500/20 text-sky-400 border-sky-500/40';
    return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-6 z-40 flex flex-col items-end animate-fadeIn">
      <div className="mt-2 w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl p-4 font-sans text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white flex items-center gap-2">
              <Satellite className="w-4 h-4 text-emerald-400" />
              Planetary Telemetry Status
            </h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">Strict separation of NRT vs In-Situ vs Reanalysis</p>
          </div>
          <div className="flex items-center gap-1.5">
            {onManualRefresh && (
              <button
                onClick={onManualRefresh}
                disabled={isRefreshing}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition disabled:opacity-50"
                title="Force refresh upstream feeds"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              title="Close panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

          <div className="space-y-2.5">
            {reports.map(report => (
              <div
                key={report.sourceId}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">{report.sourceName}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{report.statusMessage}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border whitespace-nowrap ${getBadgeStyle(report.category, report.state)}`}>
                    {report.state}
                  </span>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/40 grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
                  <div>
                    <span className="text-slate-500 block">LATEST OBSERVATION</span>
                    <span className="text-slate-200">
                      {report.latestObservationUtc !== 'N/A' 
                        ? new Date(report.latestObservationUtc).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' }) + ' UTC'
                        : 'Checking...'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">SYSTEM INGESTION</span>
                    <span className="text-slate-200">
                      {new Date(report.lastIngestedUtc).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' })} UTC
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Zero Fabricated Fallbacks
            </span>
            <span className="font-mono text-slate-500">Auto-poll: 180s</span>
          </div>
        </div>
      </div>
  );
};
