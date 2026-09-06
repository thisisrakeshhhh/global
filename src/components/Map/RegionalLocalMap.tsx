import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { EventMapConfig } from '../../types/eventStory';
import { Layers, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface RegionalLocalMapProps {
  config: EventMapConfig;
  title: string;
}

export const RegionalLocalMap: React.FC<RegionalLocalMapProps> = ({ config, title }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [config.centerLat, config.centerLng],
      zoom: config.defaultZoom,
      zoomControl: false,
      attributionControl: false
    });

    mapInstanceRef.current = map;

    // CartoDB Dark Matter Basemap Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    // Render River Corridors
    if (config.rivers && config.rivers.length > 0) {
      config.rivers.forEach(river => {
        const polyline = L.polyline(river.points, {
          color: '#38bdf8', // Sky 400
          weight: 3.5,
          opacity: 0.85,
          dashArray: '1, 1'
        }).addTo(map);

        polyline.bindTooltip(river.name, {
          permanent: false,
          direction: 'top',
          className: 'leaflet-custom-tooltip'
        });
      });
    }

    // Render Affected Districts
    if (config.districts && config.districts.length > 0) {
      config.districts.forEach(dist => {
        const radiusMeters = dist.severity === 'critical' ? 14000 : 9000;
        const color = dist.severity === 'critical' ? '#f43f5e' : '#fbbf24';

        const circle = L.circle([dist.lat, dist.lng], {
          color: color,
          fillColor: color,
          fillOpacity: 0.15,
          weight: 1.5,
          radius: radiusMeters
        }).addTo(map);

        circle.bindTooltip(`District: ${dist.name} (${dist.severity.toUpperCase()})`, {
          direction: 'center',
          className: 'leaflet-custom-tooltip'
        });
      });
    }

    // Render Feature Markers (Cities, Dams, Epicenters)
    config.markers.forEach(marker => {
      const isEpicenter = marker.type === 'epicenter';

      // Custom HTML Marker icon
      const iconHtml = isEpicenter
        ? `<div class="relative flex items-center justify-center">
             <div class="absolute w-8 h-8 rounded-full bg-rose-500/30 animate-ping"></div>
             <div class="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-[0_0_12px_rgba(244,63,94,0.9)] flex items-center justify-center">
               <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
             </div>
           </div>`
        : `<div class="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-700 text-[10px] font-bold text-slate-200 shadow-md whitespace-nowrap">
             <span class="w-1.5 h-1.5 rounded-full ${marker.type === 'dam' ? 'bg-cyan-400' : 'bg-slate-400'}"></span>
             <span>${marker.label}</span>
           </div>`;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-marker',
        iconSize: isEpicenter ? [24, 24] : [80, 20],
        iconAnchor: isEpicenter ? [12, 12] : [40, 10]
      });

      const leafMarker = L.marker([marker.lat, marker.lng], { icon: customIcon }).addTo(map);
      if (marker.description) {
        leafMarker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 11px; color: #1e293b;">
            <strong style="display:block; margin-bottom: 2px;">${marker.label}</strong>
            <span>${marker.description}</span>
          </div>
        `);
      }
    });

    // Clean up
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [config]);

  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleReset = () => {
    mapInstanceRef.current?.setView([config.centerLat, config.centerLng], config.defaultZoom);
  };

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs text-slate-200 shadow-lg">
        <Layers className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-bold">{title}</span>
        <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2">
          Local 2D Geography
        </span>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1 bg-slate-950/90 backdrop-blur-md p-1 rounded-xl border border-slate-700/80 shadow-lg">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition border-t border-slate-800"
          title="Reset View"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/70 text-[10px] text-slate-300 shadow-md">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>Surge Zone</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2.5 h-0.5 bg-sky-400"></span>
          <span>River Corridor</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full border border-amber-400 bg-amber-400/20"></span>
          <span>Affected District</span>
        </div>
      </div>
    </div>
  );
};
