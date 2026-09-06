import React, { useState } from 'react';
import { Search, Globe, X, BookOpen, Layers, History, MapPin, Radio, Activity, ChevronDown } from 'lucide-react';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { TIPPING_POINTS } from '../../data/tippingPoints';

export type PresentationMode = 'explore' | 'history' | 'countries' | 'events' | 'evidence';

interface MainNavbarProps {
  activeMode: PresentationMode;
  onSelectMode: (mode: PresentationMode) => void;
  onNavigatePage: (page: 'wiki' | 'methodology' | 'datasources' | 'about') => void;
  onOpenVitals: () => void;
  onSelectCoordinates?: (lat: number, lng: number, distance?: number) => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  activeMode,
  onSelectMode,
  onNavigatePage,
  onOpenVitals,
  onSelectCoordinates
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEvidenceDropdownOpen, setIsEvidenceDropdownOpen] = useState(false);

  const searchResults = searchQuery.trim() === '' ? [] : [
    ...SCIENTIFIC_COUNTRY_INTELLIGENCE.map(c => ({
      name: `${c.name} (${c.code})`,
      category: 'Country Profile',
      lat: c.lat,
      lng: c.lng,
      anomaly: `+${c.tempAnomaly}°C`
    })),
    ...TIPPING_POINTS.map(tp => ({
      name: tp.name,
      category: 'Tipping Point',
      lat: tp.lat,
      lng: tp.lng,
      anomaly: tp.currentStatus
    }))
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6);

  return (
    <nav className="w-full flex items-center justify-between px-3 sm:px-6 py-3 z-30 font-sans">
      {/* Left: Brand & Tagline */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onSelectMode('explore')}
      >
        {/* Globe Logo Icon */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400 group-hover:scale-105 transition-transform">
          <Globe className="w-4.5 h-4.5 text-white animate-spin-slow" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-1.5">
          <span className="text-base font-black text-white tracking-wider">
            EARTH
          </span>
          <span className="text-base font-black text-cyan-400 tracking-wider">
            // LIVE
          </span>
        </div>
      </div>

      {/* Center: Clean 5 Mode Navigation */}
      <div className="flex items-center gap-1 bg-slate-900/70 backdrop-blur-md p-1 rounded-full border border-slate-800 shadow-lg">
        {/* 1. Explore */}
        <button
          onClick={() => onSelectMode('explore')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeMode === 'explore'
              ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Explore
        </button>

        {/* 2. History */}
        <button
          onClick={() => onSelectMode('history')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeMode === 'history'
              ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          History
        </button>

        {/* 3. Countries */}
        <button
          onClick={() => onSelectMode('countries')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeMode === 'countries'
              ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Countries
        </button>

        {/* 4. Events */}
        <button
          onClick={() => onSelectMode('events')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
            activeMode === 'events'
              ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.4)]'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Events
        </button>

        {/* 5. Evidence with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              onSelectMode('evidence');
              setIsEvidenceDropdownOpen(!isEvidenceDropdownOpen);
            }}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'evidence'
                ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(79,70,229,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>Evidence</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Evidence Submenu */}
          {isEvidenceDropdownOpen && (
            <div className="absolute right-0 top-10 w-48 bg-slate-950/95 backdrop-blur-xl border border-slate-700 rounded-xl p-1.5 shadow-2xl z-50 animate-fadeIn text-xs">
              <button
                onClick={() => {
                  setIsEvidenceDropdownOpen(false);
                  onNavigatePage('wiki');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-slate-200 hover:text-cyan-300"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                Climate Encyclopedia
              </button>
              <button
                onClick={() => {
                  setIsEvidenceDropdownOpen(false);
                  onNavigatePage('methodology');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-slate-200 hover:text-cyan-300"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Methodology
              </button>
              <button
                onClick={() => {
                  setIsEvidenceDropdownOpen(false);
                  onNavigatePage('datasources');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-slate-200 hover:text-cyan-300"
              >
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                Data Sources
              </button>
              <button
                onClick={() => {
                  setIsEvidenceDropdownOpen(false);
                  onNavigatePage('about');
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-slate-400 hover:text-white border-t border-slate-800 mt-1 pt-1.5"
              >
                About
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right: Vitals Pill + Search Button */}
      <div className="flex items-center gap-2">
        {/* Vital Signs Drawer Trigger */}
        <button
          onClick={onOpenVitals}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-800 transition shadow-sm"
          title="Open Earth's Vital Signs Telemetry"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">Vital Signs</span>
        </button>

        {/* Search Target Button */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-500/50 transition shadow-sm"
            title="Search country or climate tipping point"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Search Dropdown Modal */}
          {isSearchOpen && (
            <div className="absolute right-0 top-10 w-72 bg-slate-950/95 backdrop-blur-xl border border-slate-700 rounded-xl p-3 shadow-2xl z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400">Search Planetary Targets</span>
                <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Nepal, India, Brazil, Arctic..."
                autoFocus
                className="w-full mt-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
              <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
                {searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectCoordinates?.(item.lat, item.lng, 3.2);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left p-1.5 rounded hover:bg-slate-900 flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="text-slate-200 group-hover:text-cyan-300 font-medium">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">{item.anomaly}</span>
                  </button>
                ))}
                {searchQuery.trim() !== '' && searchResults.length === 0 && (
                  <div className="text-[11px] text-slate-500 text-center py-2">No matching targets found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
