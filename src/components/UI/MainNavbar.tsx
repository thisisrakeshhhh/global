import React, { useState } from 'react';
import { Search, Globe, X, Activity } from 'lucide-react';
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
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-3.5 z-30 font-sans">
      {/* Left: Brand */}
      <div
        className="flex items-center gap-2.5 cursor-pointer group select-none"
        onClick={() => onSelectMode('explore')}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-sm">
          <Globe className="w-4 h-4" />
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
            EARTH
          </span>
          <span className="text-sm sm:text-base font-bold text-cyan-400">
            // LIVE
          </span>
        </div>
      </div>

      {/* Center: Calm, Editorial Navigation */}
      <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md p-1 rounded-full border border-slate-800/80 shadow-sm">
        <button
          onClick={() => onSelectMode('explore')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeMode === 'explore'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Explore
        </button>

        <button
          onClick={() => onSelectMode('history')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeMode === 'history'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          History
        </button>

        <button
          onClick={() => onSelectMode('countries')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeMode === 'countries'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Countries
        </button>

        <button
          onClick={() => onSelectMode('events')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeMode === 'events'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Events
        </button>

        <button
          onClick={() => onNavigatePage('wiki')}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeMode === 'evidence'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Evidence
        </button>
      </div>

      {/* Right: Vital Signs + Search */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={onOpenVitals}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-200 transition-colors"
          title="Open Earth's Vital Signs"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Vital Signs</span>
        </button>

        {/* Search */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Search country or climate tipping point"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {isSearchOpen && (
            <div className="absolute right-0 top-10 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl p-3 shadow-xl z-50 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-semibold text-slate-200">Search Planetary Targets</span>
                <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Nepal, Australia, Brazil..."
                autoFocus
                className="w-full mt-2 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-slate-600"
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
                    className="w-full text-left p-1.5 rounded hover:bg-slate-800 flex items-center justify-between text-xs group"
                  >
                    <div>
                      <div className="text-slate-200 group-hover:text-white font-medium">{item.name}</div>
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
