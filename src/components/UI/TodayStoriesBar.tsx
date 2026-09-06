import React from 'react';
import { EventStory } from '../../types/eventStory';
import { ChevronRight, Radio, Waves, Flame, Wind, AlertCircle } from 'lucide-react';
import { NOAACycloneEvent } from '../../types/climateIntelligence';

interface TodayStoriesBarProps {
  stories: EventStory[];
  cyclones: NOAACycloneEvent[];
  onSelectStory: (story: EventStory) => void;
  onExploreAll: () => void;
}

export const TodayStoriesBar: React.FC<TodayStoriesBarProps> = ({
  stories,
  cyclones,
  onSelectStory,
  onExploreAll
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.12)] text-slate-100 font-sans pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            TODAY
          </span>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            What is happening around the world?
          </span>
        </div>

        <button
          onClick={onExploreAll}
          className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 transition"
        >
          <span>Explore All Events</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Actual Event Story Cards (Honest & Dynamic) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* 1. Feature Story: Nepal Flood (or primary active event) */}
        {stories.slice(0, 2).map((story) => (
          <button
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{story.countryFlag}</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                    {story.countryName}
                  </span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  {story.statusBadge}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-200 line-clamp-2 mb-1 group-hover:text-white">
                {story.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-1">
                {story.subtitle}
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-medium">
              <span>View full story & map</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}

        {/* 2. Honest Cyclone Status Card (Honest if 0 cyclones) */}
        {cyclones.length === 0 ? (
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/70 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-300">Tropical Cyclones</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                  Basin Quiet
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-300 mb-1">
                No active tropical cyclones detected
              </h4>
              <p className="text-[11px] text-slate-500">
                Atlantic, Eastern Pacific & Central Pacific basins currently clear of active cyclone warnings.
              </p>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
              <span>NOAA NHC Telemetry Feed</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
            </div>
          </div>
        ) : (
          stories.slice(2, 3).map((story) => (
            <button
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{story.countryFlag}</span>
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                      {story.countryName}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                    {story.statusBadge}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-200 line-clamp-2 mb-1 group-hover:text-white">
                  {story.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {story.subtitle}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-cyan-400 font-medium">
                <span>View full story & map</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};
