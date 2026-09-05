import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, RotateCw, Compass, AlertTriangle, ShieldAlert, Sparkles, Search } from 'lucide-react';
import { audioController } from '../../utils/audioController';
import { COUNTRY_CLIMATE_DATA } from '../../data/climateData';
import { TIPPING_POINTS } from '../../data/tippingPoints';

interface HeaderHUDProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onStartTour: () => void;
  onSelectCountryOrHotspot: (lat: number, lng: number, distance?: number) => void;
  currentYear: number;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  autoRotate,
  onToggleAutoRotate,
  onStartTour,
  onSelectCountryOrHotspot,
  currentYear
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
    ...COUNTRY_CLIMATE_DATA.map((c) => ({
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
    <header className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-5 flex flex-col gap-3">
      {/* Top Banner with Cyber/Scientific Border */}
      <div className="flex flex-wrap items-center justify-between gap-4 pointer-events-auto bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 rounded-xl px-4 py-3 shadow-[0_0_25px_rgba(6,182,212,0.15)]">
        {/* Logo & System Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/50">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-cyan-400 opacity-75"></span>
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-sky-200 to-indigo-400 bg-clip-text text-transparent font-mono">
                CLIMATE PULSE // DESTINATION EARTH
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-mono animate-pulse">
                CRITICAL ANOMALY
              </span>
            </div>
            <p className="text-[11px] text-cyan-400/70 font-mono">
              GLOBAL WARMING CAUSE & IMPACT SATELLITE ATLAS • {utcTime}
            </p>
          </div>
        </div>

        {/* Global Live Tickers (Copernicus / IPCC Metrics) */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-xs border-l border-r border-cyan-500/20 px-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Global Temp Rise</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-amber-400">+1.48°C</span>
              <span className="text-[10px] text-red-400 font-semibold">(Limit: 1.50°C)</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Atmospheric CO₂</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-cyan-400">426.5</span>
              <span className="text-[10px] text-slate-400">PPM</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Sea Ice Loss</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-rose-400">-13.1%</span>
              <span className="text-[10px] text-slate-400">/decade</span>
            </div>
          </div>
        </div>

        {/* Action Buttons & Search */}
        <div className="flex items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            <button
              onClick={() => {
                audioController.playClick();
                setIsSearchOpen(!isSearchOpen);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-xs font-mono text-cyan-300 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Inspect Zone</span>
            </button>

            {isSearchOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-950 border border-cyan-500/40 rounded-lg shadow-2xl p-2 z-50">
                <input
                  type="text"
                  placeholder="Type country or tipping point..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-cyan-500/30 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                  autoFocus
                />
                <div className="mt-2 max-h-56 overflow-y-auto divide-y divide-slate-800/60 font-mono text-xs">
                  {filteredItems.slice(0, 7).map((item, idx) => (
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
                        <div className="text-[10px] text-cyan-400/60">{item.category}</div>
                      </div>
                      <span className="text-[10px] text-amber-400 font-bold">{item.anomaly}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guided Tour Mode */}
          <button
            onClick={() => {
              audioController.playSelect();
              onStartTour();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-mono font-semibold shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span className="hidden sm:inline">Guided Tour</span>
          </button>

          {/* Auto-spin Toggle */}
          <button
            onClick={() => {
              audioController.playClick();
              onToggleAutoRotate();
            }}
            title="Toggle Earth Auto-Rotation"
            className={`p-2 rounded-lg border text-xs transition-colors ${
              autoRotate
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio'}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </div>
    </header>
  );
};
