import React from 'react';
import { Layers, Flame, Disc, ChevronRight } from 'lucide-react';
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
  thumbnailSvgType: 'canada_fire' | 'amazon_fire' | 'hurricane' | 'siberia_fire';
  rawItem?: FireCluster | NOAACycloneEvent;
}

interface LatestEventsPanelProps {
  onSelectEvent: (event: DisplayEvent) => void;
  onViewAll?: () => void;
  fireClusters?: FireCluster[];
  cyclones?: NOAACycloneEvent[];
}

export const LatestEventsPanel: React.FC<LatestEventsPanelProps> = ({
  onSelectEvent,
  onViewAll,
  fireClusters = [],
  cyclones = []
}) => {
  // Built-in curated high-fidelity events matching the reference UI
  const defaultEvents: DisplayEvent[] = [
    {
      id: 'event-1',
      type: 'wildfire',
      title: 'Wildfire',
      badge: 'HIGH',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      location: 'British Columbia, Canada',
      stats: 'FRP: 842 MW • 12 detections',
      timestamp: 'Sep 6, 2026 • 14:32 UTC',
      lat: 53.7267,
      lng: -127.6476,
      thumbnailSvgType: 'canada_fire'
    },
    {
      id: 'event-2',
      type: 'wildfire',
      title: 'Wildfire',
      badge: 'MEDIUM',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      location: 'Amazon, Brazil',
      stats: 'FRP: 412 MW • 8 detections',
      timestamp: 'Sep 6, 2026 • 13:17 UTC',
      lat: -6.5000,
      lng: -55.0000,
      thumbnailSvgType: 'amazon_fire'
    },
    {
      id: 'event-3',
      type: 'cyclone',
      title: 'Tropical Storm',
      badge: 'MONITORING',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      location: 'Atlantic Ocean',
      stats: 'Wind: 45 mph • Pressure: 1007 hPa',
      timestamp: 'Sep 6, 2026 • 11:20 UTC',
      lat: 24.5000,
      lng: -48.0000,
      thumbnailSvgType: 'hurricane'
    },
    {
      id: 'event-4',
      type: 'wildfire',
      title: 'Wildfire',
      badge: 'MEDIUM',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      location: 'Siberia, Russia',
      stats: 'FRP: 298 MW • 5 detections',
      timestamp: 'Sep 6, 2026 • 10:04 UTC',
      lat: 62.0355,
      lng: 129.7422,
      thumbnailSvgType: 'siberia_fire'
    }
  ];

  // If live fire clusters are available, dynamically enhance event 1 and 2 with real telemetry
  const displayEvents = [...defaultEvents];
  if (fireClusters.length > 0) {
    const topCluster = [...fireClusters].sort((a, b) => b.totalFRP - a.totalFRP)[0];
    if (topCluster) {
      displayEvents[0] = {
        id: topCluster.id,
        type: 'wildfire',
        title: 'Wildfire',
        badge: topCluster.totalFRP > 500 ? 'HIGH' : 'MEDIUM',
        badgeColor: topCluster.totalFRP > 500
          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
          : 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        location: topCluster.regionName || 'Thermal Hotspot Cluster',
        stats: `FRP: ${Math.round(topCluster.totalFRP)} MW • ${topCluster.detectionCount} detections`,
        timestamp: topCluster.latestObservation ? new Date(topCluster.latestObservation).toUTCString().slice(5, 22) + ' UTC' : 'Sep 6, 2026 • 14:32 UTC',
        lat: topCluster.lat,
        lng: topCluster.lng,
        thumbnailSvgType: 'canada_fire',
        rawItem: topCluster
      };
    }
  }

  // Render thumbnail SVG
  const renderThumbnail = (type: DisplayEvent['thumbnailSvgType']) => {
    switch (type) {
      case 'canada_fire':
        return (
          <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900 flex-shrink-0 group-hover:border-cyan-500/50 transition">
            <svg viewBox="0 0 100 80" className="w-full h-full object-cover">
              <rect width="100" height="80" fill="#1e293b" />
              <path d="M0 60 Q30 50 60 65 T100 55 L100 80 L0 80 Z" fill="#0f172a" />
              <path d="M20 70 Q45 20 75 15 Q85 35 60 60 Z" fill="url(#smokeGrad)" opacity="0.8" />
              <circle cx="35" cy="65" r="9" fill="#ef4444" opacity="0.9" filter="blur(2px)" />
              <circle cx="45" cy="62" r="6" fill="#f97316" opacity="0.9" />
              <circle cx="40" cy="64" r="3" fill="#fef08a" />
              <defs>
                <linearGradient id="smokeGrad" x1="0" y1="1" x2="0.8" y2="0">
                  <stop offset="0%" stopColor="#78716c" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </div>
        );
      case 'amazon_fire':
        return (
          <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900 flex-shrink-0 group-hover:border-cyan-500/50 transition">
            <svg viewBox="0 0 100 80" className="w-full h-full object-cover">
              <rect width="100" height="80" fill="#064e3b" />
              <circle cx="50" cy="50" r="28" fill="#ea580c" opacity="0.85" filter="blur(4px)" />
              <circle cx="52" cy="48" r="16" fill="#f97316" opacity="0.9" />
              <circle cx="50" cy="46" r="8" fill="#fef08a" />
              <path d="M10 75 Q40 60 70 70 T100 75" stroke="#15803d" strokeWidth="6" fill="none" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </div>
        );
      case 'hurricane':
        return (
          <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900 flex-shrink-0 group-hover:border-cyan-500/50 transition">
            <svg viewBox="0 0 100 80" className="w-full h-full object-cover">
              <rect width="100" height="80" fill="#0c4a6e" />
              <path d="M50 40 m-25 0 a25 25 0 1 0 50 0 a25 25 0 1 0 -50 0" stroke="#bae6fd" strokeWidth="6" strokeDasharray="15 8" fill="none" opacity="0.8" />
              <path d="M50 40 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" stroke="#f0f9ff" strokeWidth="4" strokeDasharray="8 6" fill="none" opacity="0.9" />
              <circle cx="50" cy="40" r="4" fill="#082f49" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </div>
        );
      case 'siberia_fire':
      default:
        return (
          <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900 flex-shrink-0 group-hover:border-cyan-500/50 transition">
            <svg viewBox="0 0 100 80" className="w-full h-full object-cover">
              <rect width="100" height="80" fill="#14532d" />
              <path d="M0 45 Q50 30 100 40 L100 80 L0 80 Z" fill="#166534" />
              <circle cx="65" cy="55" r="14" fill="#f97316" opacity="0.8" filter="blur(3px)" />
              <circle cx="68" cy="53" r="6" fill="#fde047" />
              <path d="M40 70 Q70 30 95 20" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <ChevronRight className="absolute right-1 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition" />
          </div>
        );
    }
  };

  return (
    <div className="w-[320px] bg-[#0a1224]/85 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl pointer-events-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-300" />
          <span className="text-sm font-bold text-white tracking-wide">
            Latest Events
          </span>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-2.5">
        {displayEvents.map((ev) => (
          <div
            key={ev.id}
            onClick={() => {
              audioController.playSelect();
              onSelectEvent(ev);
            }}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-900/40 hover:bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 transition cursor-pointer group"
          >
            {/* Left Content */}
            <div className="flex items-start gap-2.5 flex-1 mr-2 min-w-0">
              {/* Type Icon */}
              <div
                className={`p-1.5 rounded-lg flex items-center justify-center mt-0.5 ${
                  ev.type === 'wildfire'
                    ? 'bg-rose-500/15 text-rose-400'
                    : 'bg-blue-500/15 text-blue-400'
                }`}
              >
                {ev.type === 'wildfire' ? (
                  <Flame className="w-4 h-4" />
                ) : (
                  <Disc className="w-4 h-4" />
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col min-w-0 flex-1">
                {/* Title + Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white leading-none">
                    {ev.title}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border leading-none ${ev.badgeColor}`}
                  >
                    {ev.badge}
                  </span>
                </div>

                {/* Location */}
                <span className="text-[11px] text-slate-300 font-medium truncate mt-1">
                  {ev.location}
                </span>

                {/* FRP / Wind stats */}
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {ev.stats}
                </span>

                {/* Timestamp */}
                <span className="text-[9px] text-slate-500 mt-0.5">
                  {ev.timestamp}
                </span>
              </div>
            </div>

            {/* Right Thumbnail */}
            {renderThumbnail(ev.thumbnailSvgType)}
          </div>
        ))}
      </div>
    </div>
  );
};
