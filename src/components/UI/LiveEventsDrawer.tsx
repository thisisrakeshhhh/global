import React, { useState } from 'react';
import { Flame, Wind, Waves, AlertTriangle, ChevronRight, ChevronLeft, ExternalLink, MapPin } from 'lucide-react';
import { LiveEvent } from '../../types/climateIntelligence';
import { VERIFIED_LIVE_EVENTS } from '../../services/liveTelemetryService';
import { audioController } from '../../utils/audioController';

interface LiveEventsDrawerProps {
  onSelectEvent: (event: LiveEvent) => void;
  onLocateEvent: (lat: number, lng: number, distance?: number) => void;
}

export const LiveEventsDrawer: React.FC<LiveEventsDrawerProps> = ({
  onSelectEvent,
  onLocateEvent
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'wildfire' | 'cyclone' | 'flood'>('all');

  const filteredEvents = VERIFIED_LIVE_EVENTS.filter((ev) => {
    if (filter === 'all') return true;
    return ev.type === filter;
  });

  return (
    <div className="absolute right-3 sm:right-5 top-28 sm:top-28 z-20 pointer-events-auto flex items-start font-mono">
      {/* Toggle button */}
      <button
        onClick={() => {
          audioController.playClick();
          setIsOpen(!isOpen);
        }}
        className="bg-slate-950/90 border border-cyan-500/30 p-2 rounded-l-xl text-cyan-400 hover:text-white shadow-xl flex items-center justify-center -mr-px"
        title={isOpen ? 'Collapse Live Feed' : 'Open Live Telemetry Feed'}
      >
        {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Drawer Body */}
      {isOpen && (
        <div className="w-72 sm:w-80 max-h-[70vh] bg-slate-950/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl rounded-tl-none p-3 shadow-2xl flex flex-col gap-2.5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>LIVE PLANETARY CRISES</span>
            </div>
            <span className="text-[10px] text-slate-500">NASA & GDACS</span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1 text-[10px]">
            {(['all', 'wildfire', 'cyclone', 'flood'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1 rounded text-center uppercase font-semibold transition-colors ${
                  filter === f
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Event Items List */}
          <div className="overflow-y-auto space-y-2 pr-1 divide-y divide-slate-800/60 text-xs">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="pt-2 first:pt-0 group flex flex-col gap-1.5 cursor-pointer hover:bg-slate-900/40 p-1.5 rounded-lg transition-colors"
                onClick={() => {
                  audioController.playAlarm();
                  onSelectEvent(ev);
                  onLocateEvent(ev.lat, ev.lng, 3.4);
                }}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    {ev.type === 'wildfire' && <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                    {ev.type === 'cyclone' && <Wind className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                    {ev.type === 'flood' && <Waves className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                    <span className="font-bold text-slate-200 text-xs line-clamp-1">{ev.title}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>{ev.location}</span>
                  <span className="text-amber-400 font-bold">{ev.metricValue}</span>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-500 pt-0.5">
                  <span className="text-slate-500">{ev.detectedAt}</span>
                  <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    Locate on 3D Globe
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
