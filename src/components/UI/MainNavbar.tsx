import React, { useState } from 'react';
import { Search, Sun, Globe, X, BookOpen, Layers, History, MapPin, Radio, ChevronDown } from 'lucide-react';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { TIPPING_POINTS } from '../../data/tippingPoints';

export type PresentationMode = 'global' | 'history' | 'countries' | 'events' | 'evidence';

interface MainNavbarProps {
  activeMode: PresentationMode;
  onSelectMode: (mode: PresentationMode) => void;
  onNavigatePage: (page: 'wiki' | 'methodology' | 'datasources' | 'about') => void;
  onSelectCoordinates?: (lat: number, lng: number, distance?: number) => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  activeMode,
  onSelectMode,
  onNavigatePage,
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
    <nav className="w-full flex items-center justify-between px-3 sm:px-5 py-2.5 z-30 font-sans">
      {/* Left: Brand & Tagline */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onSelectMode('global')}
      >
        {/* Globe Logo Icon */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400 group-hover:scale-105 transition-transform">
          <Globe className="w-5 h-5 text-white animate-spin-slow" />
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

        {/* Tagline */}
        <span className="hidden lg:inline-block text-xs text-slate-400 font-normal ml-2 tracking-wide border-l border-slate-800 pl-3">
          Understand how the planet is changing.
        </span>
      </div>

      {/* Center/Right: 5 Product Mode Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Primary 5-Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md p-1 rounded-full border border-slate-800/90 shadow-lg">
          {/* 1. GLOBAL */}
          <button
            onClick={() => onSelectMode('global')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'global'
                ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GLOBAL</span>
          </button>

          {/* 2. HISTORY */}
          <button
            onClick={() => onSelectMode('history')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'history'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="01 — HOW HAS EARTH CHANGED? (1850-Present Time Machine)"
          >
            <History className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">HISTORY</span>
          </button>

          {/* 3. COUNTRIES */}
          <button
            onClick={() => onSelectMode('countries')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'countries'
                ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="02 — WHERE IS IT CHANGING? (Historical Contribution vs Climate Vulnerability)"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">COUNTRIES</span>
          </button>

          {/* 4. LIVE EVENTS */}
          <button
            onClick={() => onSelectMode('events')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeMode === 'events'
                ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="04 — WHAT IS HAPPENING NOW? (NASA FIRMS & NOAA Telemetry)"
          >
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">LIVE EVENTS</span>
          </button>

          {/* 5. EVIDENCE with Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                onSelectMode('evidence');
                setIsEvidenceDropdownOpen(!isEvidenceDropdownOpen);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeMode === 'evidence'
                  ? 'bg-indigo-600 text-white shadow-[0_0_12px_rgba(79,70,229,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
              title="05 — WHAT DOES IT MEAN & WHAT IS THE EVIDENCE?"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden sm:inline">EVIDENCE</span>
              <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
            </button>

            {/* Evidence Sub-Menu Dropdown */}
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
                  Methodology & Math
                </button>
                <button
                  onClick={() => {
                    setIsEvidenceDropdownOpen(false);
                    onNavigatePage('datasources');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-slate-200 hover:text-cyan-300"
                >
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  Primary Data Sources
                </button>
                <button
                  onClick={() => {
                    setIsEvidenceDropdownOpen(false);
                    onNavigatePage('about');
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 flex items-center gap-2 text-slate-400 hover:text-white border-t border-slate-800 mt-1 pt-1.5"
                >
                  About & Integrity Standards
                </button>
              </div>
            )}
          </div>
        </div>

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
                placeholder="Search India, Brazil, Amazon, Arctic..."
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

        {/* Theme / Sun Button */}
        <button
          onClick={() => {}}
          className="w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700/60 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-500/50 transition shadow-sm"
          title="Atmospheric Lighting Mode"
        >
          <Sun className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
