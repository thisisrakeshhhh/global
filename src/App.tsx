import React, { useState } from 'react';
import { ClimateGlobe, ClimateLayer } from './components/Globe/ClimateGlobe';
import { HeaderHUD } from './components/UI/HeaderHUD';
import { LayerSelector } from './components/UI/LayerSelector';
import { CauseImpactToggle, AnalyticalMode } from './components/UI/CauseImpactToggle';
import { TimelineSlider } from './components/UI/TimelineSlider';
import { CountryDossierModal } from './components/UI/CountryDossierModal';
import { GuidedTourModal } from './components/UI/GuidedTourModal';
import { LegendBar } from './components/UI/LegendBar';
import { InteractiveEntity } from './components/Globe/HotspotsPillars';

export function App() {
  const [activeLayer, setActiveLayer] = useState<ClimateLayer>('temperature');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [analyticalMode, setAnalyticalMode] = useState<AnalyticalMode>('impacts');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; distance?: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InteractiveEntity | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  const handleSelectCountryOrHotspot = (lat: number, lng: number, distance: number = 3.5) => {
    setAutoRotate(false);
    setFocusTarget({ lat, lng, distance });
  };

  const handleStartTour = () => {
    setAutoRotate(false);
    setIsTourOpen(true);
    setSelectedEntity(null);
  };

  const handleSelectEntity = (entity: InteractiveEntity | null) => {
    setSelectedEntity(entity);
    if (entity) {
      setAutoRotate(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#030712] overflow-hidden select-none font-sans">
      {/* 3D WebGL Earth Canvas */}
      <ClimateGlobe
        activeLayer={activeLayer}
        selectedYear={selectedYear}
        autoRotate={autoRotate}
        focusTarget={focusTarget}
        onSelectEntity={handleSelectEntity}
      />

      {/* Futuristic Header HUD & Live Tickers */}
      <HeaderHUD
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onStartTour={handleStartTour}
        onSelectCountryOrHotspot={handleSelectCountryOrHotspot}
        currentYear={selectedYear}
      />

      {/* Copernicus Climate Layer Selector */}
      <LayerSelector
        activeLayer={activeLayer}
        onSelectLayer={(layer) => setActiveLayer(layer)}
      />

      {/* Causes vs Impacts Dual Lens Switch */}
      <CauseImpactToggle
        mode={analyticalMode}
        onToggleMode={(mode) => setAnalyticalMode(mode)}
      />

      {/* Data Legend Ramp */}
      <LegendBar activeLayer={activeLayer} />

      {/* Planetary Time Machine Scrubber (1980 - 2050) */}
      <TimelineSlider
        currentYear={selectedYear}
        onYearChange={(year) => setSelectedYear(year)}
      />

      {/* Guided Tour Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onFocusCoordinates={handleSelectCountryOrHotspot}
      />

      {/* Country & Hotspot Inspection Dossier */}
      <CountryDossierModal
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
        activeAnalyticalMode={analyticalMode}
      />
    </div>
  );
}

export default App;
