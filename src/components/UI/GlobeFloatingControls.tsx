import React from 'react';
import { Plus, Minus, Crosshair, RefreshCw, Radio } from 'lucide-react';
import { audioController } from '../../utils/audioController';

interface GlobeFloatingControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export const GlobeFloatingControls: React.FC<GlobeFloatingControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetView,
  onRefresh,
  isRefreshing = false
}) => {
  return (
    <>
      {/* Floating Camera Controls (Right side of Globe) */}
      <div className="absolute right-[336px] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={() => {
            audioController.playClick();
            onZoomIn();
          }}
          className="w-8 h-8 rounded-xl bg-[#0a1224]/85 backdrop-blur-md border border-slate-700/60 hover:border-cyan-500/60 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition active:scale-95 cursor-pointer"
          title="Zoom In (+)"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            audioController.playClick();
            onZoomOut();
          }}
          className="w-8 h-8 rounded-xl bg-[#0a1224]/85 backdrop-blur-md border border-slate-700/60 hover:border-cyan-500/60 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition active:scale-95 cursor-pointer"
          title="Zoom Out (-)"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            audioController.playClick();
            onResetView();
          }}
          className="w-8 h-8 rounded-xl bg-[#0a1224]/85 backdrop-blur-md border border-slate-700/60 hover:border-cyan-500/60 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition active:scale-95 cursor-pointer"
          title="Reset Earth Alignment"
        >
          <Crosshair className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Satellite Mode Pill (Bottom Center of Globe) */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto select-none">
        <div className="bg-[#0a1224]/90 backdrop-blur-md border border-slate-700/60 rounded-full px-4 py-2 shadow-2xl flex items-center gap-3 text-xs max-w-2xl">
          {/* Pulsing indicator */}
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          {/* Title */}
          <span className="font-bold text-white tracking-wider whitespace-nowrap">
            NEAR-REAL-TIME SATELLITE MODE
          </span>

          {/* Badge */}
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold whitespace-nowrap">
            Live Stream
          </span>

          {/* Description */}
          <span className="hidden lg:inline text-[11px] text-slate-400 truncate">
            Displaying active NASA FIRMS wildfires, tropical cyclone tracks, and Copernicus flood maps.
          </span>

          {/* Refresh Action */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700/60 ml-auto flex-shrink-0">
            <span className="text-[11px] text-slate-400 whitespace-nowrap">
              Auto-refresh: 3 min
            </span>
            <button
              onClick={() => {
                audioController.playClick();
                onRefresh();
              }}
              title="Refresh Near-Real-Time Feeds"
              className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
