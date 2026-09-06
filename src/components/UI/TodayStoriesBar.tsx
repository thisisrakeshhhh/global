import React, { useState } from 'react';
import { EventStory } from '../../types/eventStory';
import { ChevronRight, Wind, ArrowRight } from 'lucide-react';
import { NOAACycloneEvent } from '../../types/climateIntelligence';

interface TodayStoriesBarProps {
  stories: EventStory[];
  cyclones: NOAACycloneEvent[];
  onSelectStory: (story: EventStory) => void;
  onExploreAll: () => void;
  onOpenVitals: () => void;
}

export const TodayStoriesBar: React.FC<TodayStoriesBarProps> = ({
  stories,
  cyclones,
  onSelectStory,
  onExploreAll,
  onOpenVitals
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'flood', label: 'Flooding' },
    { id: 'wildfire', label: 'Wildfires' },
    { id: 'cyclone', label: 'Cyclones' },
    { id: 'heat', label: 'Extreme heat' }
  ];

  // Find Nepal flood story
  const nepalStory = stories.find(s => s.countryCode === 'NPL') || stories[0];
  // Find Australia / Wildfire story
  const wildfireStory = stories.find(s => s.category === 'wildfire') || stories[1];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl text-slate-100 font-sans pointer-events-auto">
      {/* Top Header & Categories */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Today
            </span>
            <span className="text-slate-600">•</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight">
              What is happening around the world?
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Real-time planetary events, verified disaster updates, and satellite observations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Visual Editorial Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* CARD 1: Nepal Flooding */}
        {nepalStory && (selectedCategory === 'all' || selectedCategory === 'flood') && (
          <button
            onClick={() => onSelectStory(nepalStory)}
            className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800/80 hover:border-slate-700 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Location Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <span>{nepalStory.countryFlag}</span>
                  <span>{nepalStory.countryName}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-medium">
                  {nepalStory.statusBadge}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-white leading-snug mb-1.5 line-clamp-2">
                Catastrophic flooding along the Bhote Koshi–Trishuli corridor
              </h4>

              {/* Subtitle / Context */}
              <p className="text-xs text-slate-400 line-clamp-1">
                Central Nepal · Aug 26 · Ongoing response
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-medium">
              <span>Read story</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        )}

        {/* CARD 2: Australia Wildfires */}
        {wildfireStory && (selectedCategory === 'all' || selectedCategory === 'wildfire') && (
          <button
            onClick={() => onSelectStory(wildfireStory)}
            className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800/80 hover:border-slate-700 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Location Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <span>{wildfireStory.countryFlag}</span>
                  <span>{wildfireStory.countryName}</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-amber-300 font-medium">
                  Active fires
                </span>
              </div>

              {/* Title */}
              <h4 className="text-sm font-bold text-slate-100 group-hover:text-white leading-snug mb-1.5 line-clamp-2">
                Wildfire activity detected across Eastern Australia
              </h4>

              {/* Subtitle */}
              <p className="text-xs text-slate-400 line-clamp-1">
                NASA VIIRS satellite observation · Recent
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-medium">
              <span>Explore event</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        )}

        {/* CARD 3: Tropical Cyclones (Honest status) */}
        {(selectedCategory === 'all' || selectedCategory === 'cyclone') && (
          cyclones.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 text-left flex flex-col justify-between">
              <div>
                {/* Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tropical cyclones</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 font-medium">
                    Basin quiet
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-slate-200 mb-1.5">
                  No active systems detected
                </h4>

                {/* Subtitle */}
                <p className="text-xs text-slate-400">
                  Atlantic, Eastern Pacific & Central Pacific monitored basins
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                <span>NOAA NHC Telemetry</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/70"></span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => onSelectStory(stories.find(s => s.category === 'cyclone') || stories[0])}
              className="p-4 rounded-xl bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800/80 hover:border-slate-700 transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">
                    🌀 {cyclones[0].basin} Basin
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                    {cyclones[0].category}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100 group-hover:text-white leading-snug mb-1.5">
                  {cyclones[0].stormName} Active Cyclone Advisory
                </h4>
                <p className="text-xs text-slate-400">
                  Wind: {cyclones[0].maxSustainedWindsMph} mph · NOAA NHC
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-medium">
                <span>View storm track</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          )
        )}
      </div>

      {/* Bottom Editorial Strip: Earth's changing signals */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-300 font-medium">Earth's changing signals:</span>
          <span>Temperature</span>
          <span className="text-slate-600">·</span>
          <span>CO₂</span>
          <span className="text-slate-600">·</span>
          <span>Ocean heat</span>
          <span className="text-slate-600">·</span>
          <span>Ice</span>
          <span className="text-slate-600">·</span>
          <span>Sea level</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenVitals}
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
          >
            <span>View Earth's Vital Signs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <button
            onClick={onExploreAll}
            className="text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
          >
            <span>Explore all events</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
