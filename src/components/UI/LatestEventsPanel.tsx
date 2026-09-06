import React from 'react';
import { Flame, Disc, ChevronRight, AlertCircle, Radio } from 'lucide-react';
import { FireCluster, NOAACycloneEvent } from '../../types/climateIntelligence';
import { audioController } from '../../utils/audioController';

export interface DisplayEvent {
  id: string;
  type: 'wildfire' | 'cyclone';
  title: string;
  badge: string;
  badgeColor: string;
  location: string;
  stats: string;
  timestamp: string;
  lat: number;
  lng: number;
  rawItem: FireCluster | NOAACycloneEvent;
}

interface LatestEventsPanelProps {
  onSelectEvent: (event: DisplayEvent) => void;
  onViewAll?: () => void;
  fireClusters?: FireCluster[];
  cyclones?: NOAACycloneEvent[];
  isLoading?: boolean;
}

export const LatestEventsPanel: React.FC<LatestEventsPanelProps> = ({
  onSelectEvent,
  onViewAll,
  fireClusters = [],
  cyclones = [],
  isLoading = false
}) => {
  // 1. Convert real NOAA cyclones into display events
  const cycloneEvents: DisplayEvent[] = cyclones.map((cy) => ({
    id: cy.id,
    type: 'cyclone',
    title: cy.category || 'Tropical Cyclone',
    badge: 'ACTIVE TRACK',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    location: `${cy.stormName} • ${cy.basin} Basin`,
    stats: `Wind: ${cy.maxSustainedWindsMph} mph • ${cy.centralPressureMb} mb`,
    timestamp: cy.advisoryTimeUtc 
      ? new Date(cy.advisoryTimeUtc).toUTCString().slice(5, 22) + ' UTC'
      : 'Active NOAA Advisory',
    lat: cy.currentLat,
    lng: cy.currentLng,
    rawItem: cy
  }));

  // 2. Convert top real NASA FIRMS fire clusters into display events (sorted by totalFRP)
  const topFireClusters = [...fireClusters]
    .sort((a, b) => b.totalFRP - a.totalFRP)
    .slice(0, 5)
    .map((cl): DisplayEvent => {
      const isHigh = cl.totalFRP > 600 || cl.detectionCount > 40;
      const isMedium = cl.totalFRP > 150 || cl.detectionCount > 15;
      const badge = isHigh ? 'HIGH' : isMedium ? 'MODERATE' : 'MONITORING';
      const badgeColor = isHigh
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
        : isMedium
        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        : 'bg-slate-700/40 text-slate-300 border-slate-600/40';

      const timeFormatted = cl.latestObservation
        ? new Date(cl.latestObservation).toUTCString().slice(5, 22) + ' UTC'
        : 'Recent NASA Pass';

      return {
        id: cl.id,
        type: 'wildfire',
        title: 'Active Wildfire Cluster',
        badge,
        badgeColor,
        location: cl.regionName || `${cl.lat.toFixed(1)}°, ${cl.lng.toFixed(1)}°`,
        stats: `FRP: ${Math.round(cl.totalFRP)} MW • ${cl.detectionCount} detections`,
        timestamp: timeFormatted,
        lat: cl.lat,
        lng: cl.lng,
        rawItem: cl
      };
    });

  // Combine real events: cyclones first, then top fire clusters
  const allEvents = [...cycloneEvents, ...topFireClusters];

  // Render a clean miniature satellite thermal thumbnail
  const renderSatelliteThumbnail = (event: DisplayEvent) => {
    if (event.type === 'cyclone') {
      return (
        <div className="relative w-14 h-11 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 flex-shrink-0 group-hover:border-cyan-500/50 transition">
          <svg viewBox="0 0 100 80" className="w-full h-full object-cover">
            <rect width="100" height="80" fill="#082f49" />
            <path d="M50 40 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" stroke="#38bdf8" strokeWidth="5" strokeDasharray="12 6" fill="none" opacity="0.8" />
            <path d="M50 40 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" stroke="#e0f2fe" strokeWidth="3" strokeDasharray="8 5" fill="none" opacity="0.9" />
            <circle cx="50" cy="40" r="3" fill="#0f172a" />
          </svg>
          <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-white/70 group-hover:text-white transition" />
        </div>
      );
    }

    return (
      <div className="relative w-14 h-11 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-950 flex-shrink-0 group-hover:border-orange-500/50 transition">
        <svg viewBox="0 0 100 80" className="w-full h-full object-cover">
          <rect width="100" height="80" fill="#18181b" />
          <path d="M0 65 Q30 55 60 62 T100 58 L100 80 L0 80 Z" fill="#09090b" />
          <path d="M25 70 Q45 25 70 20 Q80 38 60 60 Z" fill="url(#smokeGradMini)" opacity="0.85" />
          <circle cx="42" cy="58" r="14" fill="#dc2626" opacity="0.85" filter="blur(2px)" />
          <circle cx="48" cy="56" r="8" fill="#f97316" opacity="0.95" />
          <circle cx="46" cy="55" r="4" fill="#fef08a" />
          <defs>
            <linearGradient id="smokeGradMini" x1="0" y1="1" x2="0.7" y2="0">
              <stop offset="0%" stopColor="#52525b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
        <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-white/70 group-hover:text-white transition" />
      </div>
    );
  };

  return (
    <div className="w-[320px] bg-[#0a1224]/90 backdrop-blur-md border border-slate-800/80 rounded-2xl p-3.5 flex flex-col gap-2.5 shadow-2xl pointer-events-auto select-none max-h-[calc(100vh-210px)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="text-xs font-bold text-white tracking-wide">
            Latest Real Events
          </span>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition cursor-pointer"
          >
            Data Sources
          </button>
        )}
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-2 overflow-y-auto pr-0.5 no-scrollbar">
        {/* If no active cyclones, display honest status */}
        {cyclones.length === 0 && (
          <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/60 flex items-center gap-2 text-[10px] text-slate-400">
            <div className="p-1 rounded bg-blue-950/40 text-blue-400 shrink-0">
              <Disc className="w-3 h-3" />
            </div>
            <div>
              <span className="font-semibold text-slate-300">NOAA NHC: Basin Quiet</span>
              <div className="text-[9px] text-slate-500">No active tropical cyclones detected globally</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && allEvents.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>Ingesting satellite observations...</span>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && allEvents.length === 0 && (
          <div className="p-4 text-center text-xs text-slate-500">
            No active thermal hotspots or cyclones detected in current pass.
          </div>
        )}

        {/* Real Detected Events */}
        {allEvents.map((ev) => (
          <div
            key={ev.id}
            onClick={() => {
              audioController.playSelect();
              onSelectEvent(ev);
            }}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 hover:bg-slate-900/95 border border-slate-800/80 hover:border-cyan-500/50 transition cursor-pointer group"
          >
            {/* Left Content */}
            <div className="flex items-start gap-2 flex-1 mr-2 min-w-0">
              {/* Type Icon */}
              <div
                className={`p-1 rounded-lg flex items-center justify-center mt-0.5 shrink-0 ${
                  ev.type === 'wildfire'
                    ? 'bg-rose-500/15 text-rose-400'
                    : 'bg-blue-500/15 text-blue-400'
                }`}
              >
                {ev.type === 'wildfire' ? (
                  <Flame className="w-3.5 h-3.5" />
                ) : (
                  <Disc className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col min-w-0 flex-1">
                {/* Title + Badge */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-white leading-none truncate">
                    {ev.title}
                  </span>
                  <span
                    className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full border leading-none ${ev.badgeColor}`}
                  >
                    {ev.badge}
                  </span>
                </div>

                {/* Location */}
                <span className="text-[10px] text-slate-300 font-medium truncate mt-1">
                  {ev.location}
                </span>

                {/* FRP / Wind stats */}
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                  {ev.stats}
                </span>

                {/* Timestamp */}
                <span className="text-[8px] text-slate-500 mt-0.5 truncate">
                  {ev.timestamp}
                </span>
              </div>
            </div>

            {/* Right Thumbnail */}
            {renderSatelliteThumbnail(ev)}
          </div>
        ))}
      </div>

      {/* Attribution Hint */}
      <div className="pt-1.5 border-t border-slate-800/60 text-[9px] text-slate-500 text-center">
        Click any event for scientific Cause & Impact Intelligence
      </div>
    </div>
  );
};
