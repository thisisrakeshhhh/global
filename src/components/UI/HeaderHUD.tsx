import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCw, Sparkles, Search, Flame, Wind, Radio, RefreshCw } from 'lucide-react';
import { audioController } from '../../utils/audioController';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { TIPPING_POINTS } from '../../data/tippingPoints';
import { TimeDomain } from '../../types/climateIntelligence';
import { TelemetrySyncStatus } from '../../services/liveTelemetryService';

interface HeaderHUDProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onStartTour: () => void;
  onSelectCountryOrHotspot: (lat: number, lng: number, distance?: number) => void;
  currentTimeDomain: TimeDomain;
  syncStatus: TelemetrySyncStatus;
  onRefreshTelemetry: () => void;
  isLoadingLive: boolean;
  onOpenMethodology?: () => void;
  onOpenDataSources?: () => void;
  onOpenAbout?: () => void;
  activeSensorFilter?: 'ALL' | 'VIIRS' | 'MODIS';
  onSelectSensorFilter?: (filter: 'ALL' | 'VIIRS' | 'MODIS') => void;
  clusterCount?: number;
  cycloneCount?: number;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  autoRotate,
  onToggleAutoRotate,
  onStartTour,
  onSelectCountryOrHotspot,
  syncStatus,
  onRefreshTelemetry,
  isLoadingLive,
  onOpenMethodology,
  onOpenDataSources,
  onOpenAbout,
  activeSensorFilter = 'ALL',
  onSelectSensorFilter,
  clusterCount = 0,
  cycloneCount = 0
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [utcTime, setUtcTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setUtcTime(d.toUTCString().slice(17, 25) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMute = () => {
    const muted = audioController.toggleMute();
    setIsMuted(muted);
  };

  const filteredItems = [
    ...SCIENTIFIC_COUNTRY_INTELLIGENCE.map((c) => ({
      name: `${c.name} (${c.code})`,
      category: 'Country Profile',
      lat: c.lat,
      lng: c.lng,
      anomaly: `+${c.tempAnomaly}°C`
    })),
    ...TIPPING_POINTS.map((tp) => ({
      name: tp.name,
      category: 'Planetary Tipping Point',
      lat: tp.lat,
      lng: tp.lng,
      anomaly: tp.currentStatus
    }))
  ].filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Status badge styling
  let statusBadgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  let statusDotColor = 'bg-emerald-500';
  let statusText = `🟢 LIVE SATELLITE (${syncStatus.lastSyncFormatted})`;

  if (syncStatus.status === 'recent') {
    statusBadgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    statusDotColor = 'bg-amber-400';
    const minAgo = Math.floor(syncStatus.lastUpdatedSecondsAgo / 60);
    statusText = `🟡 UPDATED ${minAgo} MIN AGO`;
  } else if (syncStatus.status === 'delayed' || syncStatus.status === 'offline') {
    statusBadgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    statusDotColor = 'bg-rose-400';
    statusText = '🔴 DELAYED CACHE — RECONNECTING';
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-2.5 sm:p-3 flex flex-col gap-2 font-mono">
      <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl px-3.5 py-2 shadow-2xl">
        {/* Brand & 5-Second Vital Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white tracking-wider flex items-center gap-1.5">
              <span>🌍</span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                EARTH // LIVE
              </span>
            </span>
          </div>

          {/* Trust Status Badge */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadgeColor}`}>
            <span className={`inline-block w-2 h-2 rounded-full ${statusDotColor} animate-pulse`} />
            <span>{statusText}</span>
          </div>
        </div>

        {/* 5-Second Planetary Summary Bar */}
        <div className="hidden md:flex items-center gap-4 text-[11px] border-l border-r border-slate-800 px-4">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Surface Anomaly:</span>
            <span className="font-bold text-amber-400">+1.48°C</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">CO₂:</span>
            <span className="font-bold text-cyan-400">426.9 ppm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-orange-400" />
            <span className="text-slate-500">Active Fires:</span>
            <span className="font-bold text-orange-400">{syncStatus.totalFiresCount} detections</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-500">Storms:</span>
            <span className="font-bold text-cyan-400">{syncStatus.totalStormsCount} tracked</span>
          </div>
        </div>

        {/* Navigation & Documentation Links */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          {onOpenMethodology && (
            <button
              onClick={onOpenMethodology}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            >
              Methodology
            </button>
          )}
          {onOpenDataSources && (
            <button
              onClick={onOpenDataSources}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            >
              Data Sources
            </button>
          )}
          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
            >
              About
            </button>
          )}

          {/* Sensor Filter */}
          {onSelectSensorFilter && (
            <div className="flex items-center gap-0.5 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800 text-[10px]">
              <span className="text-slate-500 px-1">SENSOR:</span>
              {(['ALL', 'VIIRS', 'MODIS'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => onSelectSensorFilter(f)}
                  className={`px-1.5 py-0.5 rounded ${activeSensorFilter === f ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Manual Refresh Button */}
          <button
            onClick={() => {
              audioController.playClick();
              onRefreshTelemetry();
            }}
            disabled={isLoadingLive}
            title="Refresh Live Satellite Feeds"
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isLoadingLive ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Sync</span>
          </button>

          {/* Quick Search */}
          <div className="relative">
            <button
              onClick={() => {
                audioController.playClick();
                setIsSearchOpen(!isSearchOpen);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              <Search className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Search Zone</span>
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-950 border border-slate-800 rounded-lg shadow-2xl p-2 z-50">
                <input
                  type="text"
                  placeholder="Search country or climate region..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                <div className="mt-2 max-h-52 overflow-y-auto divide-y divide-slate-800 text-xs">
                  {filteredItems.slice(0, 5).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioController.playSelect();
                        onSelectCountryOrHotspot(item.lat, item.lng, 3.5);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 hover:bg-slate-900 flex items-center justify-between"
                    >
                      <span className="text-slate-200">{item.name}</span>
                      <span className="text-[10px] text-amber-400 font-bold">{item.anomaly}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guided Tour */}
          <button
            onClick={() => {
              audioController.playSelect();
              onStartTour();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-semibold transition-colors"
          >
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Tipping Tour</span>
          </button>

          {/* Earth Auto-spin Toggle */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleAutoRotate();
            }}
            title="Toggle Earth Auto-Rotation"
            className={`p-1.5 rounded-lg border text-[11px] transition-colors ${
              autoRotate
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300"
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
