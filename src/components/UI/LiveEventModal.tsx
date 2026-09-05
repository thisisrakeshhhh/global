import React from 'react';
import { X, Flame, Wind, Waves, ExternalLink, ShieldCheck, MapPin, Activity, HelpCircle, ArrowRight, Clock, AlertTriangle } from 'lucide-react';
import { LiveEvent } from '../../types/climateIntelligence';
import { audioController } from '../../utils/audioController';

interface LiveEventModalProps {
  event: LiveEvent | null;
  onClose: () => void;
}

export const LiveEventModal: React.FC<LiveEventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm pointer-events-auto animate-fadeIn font-mono">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_60px_rgba(244,63,94,0.25)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-950 border border-rose-500/50 text-rose-400">
              {event.type === 'wildfire' && <Flame className="w-5 h-5 text-orange-400" />}
              {event.type === 'cyclone' && <Wind className="w-5 h-5 text-cyan-400" />}
              {event.type === 'flood' && <Waves className="w-5 h-5 text-blue-400" />}
              {event.type === 'volcano' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold border ${
                  event.isLiveFetched
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {event.isLiveFetched ? 'LIVE SATELLITE TELEMETRY' : 'VERIFIED BASELINE OBSERVATION'}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {event.detectedAt}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-wide mt-0.5">
                {event.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              audioController.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Coordinates & Primary Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  GPS Coordinates:
                </span>
                <span className="font-bold text-slate-200">{event.lat.toFixed(3)}°, {event.lng.toFixed(3)}°</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">{event.location}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-[11px]">
                <span>Data Source & Sensor:</span>
                <span className="font-bold text-cyan-400">{event.source}</span>
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{event.confidence}</span>
              </div>
            </div>
          </div>

          {/* Multi-Stage Scientific Causal Attribution Chain */}
          <div className="bg-slate-950/80 rounded-xl p-4 border border-cyan-500/30 space-y-3">
            <span className="text-[11px] uppercase text-cyan-300 font-bold tracking-wider block border-b border-slate-800 pb-1.5">
              SCIENTIFIC CAUSAL ATTRIBUTION // WHY & WHAT IT AFFECTS
            </span>

            {/* 1. WHY */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                <span>1. WHY DID THIS OCCUR? (PHYSICAL DRIVERS)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pl-4 border-l-2 border-amber-500/40">
                {event.attributionChain.whyOccurred}
              </p>
            </div>

            {/* 2. CAUSES */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-orange-400 font-bold text-[11px]">
                <span>2. WHAT DOES IT CAUSE? (IMMEDIATE EMISSIONS & IMPACTS)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pl-4 border-l-2 border-orange-500/40">
                {event.attributionChain.whatItCauses}
              </p>
            </div>

            {/* 3. AFFECTS */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold text-[11px]">
                <span>3. WHAT DOES IT AFFECT? (BIOSPHERE & HUMAN POPULATIONS)</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pl-4 border-l-2 border-rose-500/40">
                {event.attributionChain.whatItAffects}
              </p>
            </div>

            {/* 4. EVIDENCE & SENSORS */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                <span>4. SATELLITE EVIDENCE & INSTRUMENTS</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed pl-4 border-l-2 border-sky-500/40">
                {event.attributionChain.evidenceSensors}
              </p>
            </div>

            {/* 5. CONFIDENCE & VALIDATION */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
              <div>
                <strong className="text-slate-300">Confidence: </strong>
                <span className="text-emerald-400 font-semibold">{event.attributionChain.confidenceLevel}</span>
              </div>
              <div>
                <strong className="text-slate-300">Satellite Timestamp: </strong>
                <span className="text-cyan-400">{event.exactUtcTimestamp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900 border-t border-cyan-500/30 flex items-center justify-between text-xs">
          {event.url ? (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 text-[11px] underline"
            >
              <span>View Official NASA / Agency Source Report</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span className="text-slate-500 text-[10px]">Verified Satellite Feed</span>
          )}

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
