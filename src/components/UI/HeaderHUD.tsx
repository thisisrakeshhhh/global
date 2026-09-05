import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCw, ShieldAlert, Sparkles, Search, Flame, Wind, Info, Radio } from 'lucide-react';
import { audioController } from '../../utils/audioController';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { TIPPING_POINTS } from '../../data/tippingPoints';
import { PLANETARY_VITAL_SIGNS } from '../../services/planetaryIndicators';
import { TimeDomain } from '../../types/climateIntelligence';

interface HeaderHUDProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onStartTour: () => void;
  onSelectCountryOrHotspot: (lat: number, lng: number, distance?: number) => void;
  currentTimeDomain: TimeDomain;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  autoRotate,
  onToggleAutoRotate,
  onStartTour,
  onSelectCountryOrHotspot,
  currentTimeDomain
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [utcTime, setUtcTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showVitalSigns, setShowVitalSigns] = useState<boolean>(false);

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
      category: 'Scientific Country Dossier',
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
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex flex-col gap-2 font-mono">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto bg-slate-950/85 backdrop-blur-md border border-cyan-500/35 rounded-xl px-4 py-2.5 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        {/* Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/50">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 opacity-75"></span>
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-400 bg-clip-text text-transparent">
                EARTH // LIVE // CLIMATE INTELLIGENCE
              </h1>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40 font-bold flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>ACTIVE TELEMETRY</span>
              </span>
            </div>
            <p className="text-[10px] text-cyan-400/70">
              NASA FIRMS • COPERNICUS ERA5 • NOAA MLO • GDACS // {utcTime}
            </p>
          </div>
        </div>

        {/* Live Tickers with Exact Sources */}
        <div className="hidden lg:flex items-center gap-5 text-xs border-l border-r border-cyan-500/20 px-5">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase text-slate-400">Atmospheric CO₂</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-cyan-400">426.9</span>
              <span className="text-[9px] text-slate-400">ppm (NOAA MLO)</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase text-slate-400">Surface Temp Anomaly</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-amber-400">+1.48°C</span>
              <span className="text-[9px] text-rose-400">(ERA5 Baseline)</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase text-slate-400">Active Wildfires</span>
            <div className="flex items-baseline gap-1">
              <Flame className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">4 Alert Zones</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] uppercase text-slate-400">Tracked Cyclones</span>
            <div className="flex items-baseline gap-1">
              <Wind className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-bold text-cyan-400">3 Active</span>
            </div>
          </div>

          <button
            onClick={() => setShowVitalSigns(!showVitalSigns)}
            className="text-[10px] text-cyan-400 hover:text-white underline flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            <span>Vital Signs</span>
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative">
            <button
              onClick={() => {
                audioController.playClick();
                setIsSearchOpen(!isSearchOpen);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-xs text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Search Zone</span>
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-950 border border-cyan-500/40 rounded-lg shadow-2xl p-2 z-50">
                <input
                  type="text"
                  placeholder="Type country or tipping point..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-cyan-500/30 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                <div className="mt-2 max-h-56 overflow-y-auto divide-y divide-slate-800/60 text-xs">
                  {filteredItems.slice(0, 6).map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioController.playSelect();
                        onSelectCountryOrHotspot(item.lat, item.lng, 3.5);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-2 py-2 hover:bg-cyan-950/40 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <div className="text-slate-200 text-xs">{item.name}</div>
                        <div className="text-[9px] text-cyan-400/70">{item.category}</div>
                      </div>
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tipping Tour</span>
          </button>

          {/* Auto-rotation Toggle */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleAutoRotate();
            }}
            title="Toggle Earth Auto-Rotation"
            className={`p-1.5 rounded-lg border transition-colors ${
              autoRotate
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-300"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Planetary Vital Signs Flyout Modal */}
      {showVitalSigns && (
        <div className="pointer-events-auto bg-slate-950/95 border border-cyan-500/40 rounded-xl p-4 shadow-2xl max-w-2xl self-center text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-bold text-white uppercase tracking-wider text-xs">
              OFFICIAL PLANETARY VITAL SIGNS // CITATION AUDIT
            </h3>
            <button
              onClick={() => setShowVitalSigns(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PLANETARY_VITAL_SIGNS.map((vs) => (
              <div key={vs.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold">{vs.label}</span>
                  <span className="text-amber-400 font-bold">{vs.value} {vs.unit}</span>
                </div>
                <div className="text-[10px] text-cyan-400 font-semibold">{vs.sourceInstitution}</div>
                <p className="text-[10px] text-slate-400 leading-tight">{vs.significance}</p>
                <div className="text-[9px] text-slate-500 pt-1 border-t border-slate-800/60 truncate">
                  Citation: {vs.citation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
