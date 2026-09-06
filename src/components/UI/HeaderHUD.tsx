import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCw, Sparkles, Search, Flame, Wind, RefreshCw, X } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

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

  return (
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex flex-col gap-2 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Google Earth Style Search Bar & Brand */}
        <div className="flex items-center gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 shadow-xl">
            <span className="text-base">🌍</span>
            <span className="font-bold text-sm tracking-tight text-white">EARTH // LIVE</span>
          </div>

          {/* Search Box Pill (Google Earth Style) */}
          <div className="relative">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#1e1e1e]/90 hover:bg-[#262626] focus-within:bg-[#262626] backdrop-blur-md border border-white/10 shadow-xl transition-all w-56 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Earth (e.g. India, Arctic)..."
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown Results */}
            {isSearchFocused && searchQuery && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] uppercase font-semibold text-slate-400 px-2 py-1">Locations &amp; Hotspots</div>
                <div className="max-h-60 overflow-y-auto divide-y divide-white/5">
                  {filteredItems.slice(0, 6).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioController.playSelect();
                        onSelectCountryOrHotspot(item.lat, item.lng, 3.5);
                        setIsSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-xl flex items-center justify-between text-xs transition"
                    >
                      <div>
                        <div className="text-white font-medium">{item.name}</div>
                        <div className="text-[10px] text-slate-400">{item.category}</div>
                      </div>
                      <span className="text-[11px] text-amber-400 font-mono font-medium">{item.anomaly}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Planetary Vitals Bar */}
        <div className="hidden xl:flex items-center gap-4 px-4 py-2 rounded-2xl bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 shadow-xl text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Surface Anomaly:</span>
            <span className="font-semibold text-amber-400">+1.48°C</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Atmospheric CO₂:</span>
            <span className="font-semibold text-sky-400">426.9 ppm</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold text-white">{clusterCount || syncStatus.totalFiresCount} Fire Clusters</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-white">{cycloneCount} Storms Tracked</span>
          </div>
        </div>

        {/* Right: Clean Navigation & Tool Controls */}
        <div className="flex items-center gap-2">
          {/* Documentation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-[#1e1e1e]/90 p-1 rounded-2xl border border-white/10 shadow-xl text-xs">
            {onOpenMethodology && (
              <button
                onClick={onOpenMethodology}
                className="px-3 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                Methodology
              </button>
            )}
            {onOpenDataSources && (
              <button
                onClick={onOpenDataSources}
                className="px-3 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                Data Sources
              </button>
            )}
            {onOpenAbout && (
              <button
                onClick={onOpenAbout}
                className="px-3 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
              >
                About
              </button>
            )}
          </div>

          {/* Sensor Filter Toggle */}
          {onSelectSensorFilter && (
            <div className="hidden sm:flex items-center gap-0.5 bg-[#1e1e1e]/90 p-1 rounded-2xl border border-white/10 shadow-xl text-xs">
              <span className="text-[10px] text-slate-400 px-2 uppercase font-medium">Sensor</span>
              {(['ALL', 'VIIRS', 'MODIS'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => onSelectSensorFilter(f)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition ${
                    activeSensorFilter === f
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* Guided Tour */}
          <button
            onClick={() => {
              audioController.playSelect();
              onStartTour();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tour</span>
          </button>

          {/* Earth Auto-spin */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleAutoRotate();
            }}
            title="Toggle Earth Rotation"
            className={`p-2 rounded-2xl border transition ${
              autoRotate
                ? 'bg-blue-600/20 border-blue-400 text-blue-300'
                : 'bg-[#1e1e1e]/90 border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Sound Mute */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2 rounded-2xl bg-[#1e1e1e]/90 border border-white/10 text-slate-400 hover:text-white shadow-xl"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
          </button>
        </div>
      </div>
    </header>
  );
};
