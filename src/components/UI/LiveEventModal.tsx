import React from 'react';
import { X, Flame, Wind, Waves, ExternalLink, ShieldCheck, MapPin, Activity } from 'lucide-react';
import { LiveEvent } from '../../types/climateIntelligence';
import { audioController } from '../../utils/audioController';

interface LiveEventModalProps {
  event: LiveEvent | null;
  onClose: () => void;
}

export const LiveEventModal: React.FC<LiveEventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm pointer-events-auto animate-fadeIn font-mono">
      <div className="relative w-full max-w-lg bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(244,63,94,0.25)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-950 border border-rose-500/40 text-rose-400">
              {event.type === 'wildfire' && <Flame className="w-5 h-5 text-orange-400" />}
              {event.type === 'cyclone' && <Wind className="w-5 h-5 text-cyan-400" />}
              {event.type === 'flood' && <Waves className="w-5 h-5 text-blue-400" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                  LIVE SATELLITE ALERT
                </span>
                <span className="text-xs text-slate-400">{event.detectedAt}</span>
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
        <div className="p-5 space-y-4 text-xs">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block mb-1">Observed Telemetry</span>
              <span className="text-sm font-bold text-amber-400">{event.metricValue}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{event.metricLabel}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block mb-1">Sensor Verification</span>
              <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {event.confidence || 'Satellite Confirmed'}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{event.source}</span>
            </div>
          </div>

          {/* Location & Details */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Location Coordinates: {event.lat.toFixed(2)}°, {event.lng.toFixed(2)}° ({event.location})</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-slate-800">
              {event.details}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900/80 border-t border-cyan-500/30 flex items-center justify-between text-xs">
          {event.url ? (
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] underline"
            >
              <span>View Source Telemetry Feed</span>
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
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
