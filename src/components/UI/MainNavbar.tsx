import React, { useState } from 'react';
import { Search, Sun, Globe, X } from 'lucide-react';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE } from '../../services/countryIntelligenceService';
import { TIPPING_POINTS } from '../../data/tippingPoints';

interface MainNavbarProps {
  activeRoute: string;
  onNavigate: (route: 'globe' | 'wiki' | 'methodology' | 'datasources' | 'about') => void;
  onSelectCoordinates?: (lat: number, lng: number, distance?: number) => void;
}

export const MainNavbar: React.FC<MainNavbarProps> = ({
  activeRoute,
  onNavigate,
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
    <nav className="w-full flex items-center justify-between px-4 py-2.5 z-30">
      {/* Left: Brand & Tagline */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('globe')}>
        {/* Globe Logo Icon */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-400">
          <Globe className="w-5 h-5 text-white animate-spin-slow" />
        </div>

        {/* Title */}
        <div className="flex items-center gap-1.5">
          <span className="text-base font-extrabold text-white tracking-wide">
            EARTH
          </span>
          <span className="text-base font-extrabold text-cyan-400 tracking-wide">
            // LIVE
          </span>
        </div>

        {/* Tagline */}
        <span className="hidden md:inline-block text-xs text-slate-400 font-normal ml-3 tracking-wide">
          Real Data • Real Events • A Healthier Planet
        </span>
      </div>

      {/* Right: Nav Pills & Actions */}
      <div className="flex items-center gap-2">
        {/* Nav Links */}
        <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md p-1 rounded-full border border-slate-800/80">
          <button
            onClick={() => onNavigate('globe')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeRoute === 'globe'
                ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onNavigate('wiki')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRoute === 'wiki'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Climate Wiki
          </button>

          <button
            onClick={() => onNavigate('methodology')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRoute === 'methodology'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Methodology
          </button>

          <button
            onClick={() => onNavigate('datasources')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRoute === 'datasources'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Data Sources
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeRoute === 'about'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            About
          </button>
        </div>

        {/* Search Button */}
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
                placeholder="Search Brazil, Amazon, Arctic..."
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

        {/* Sun / Theme Button */}
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
