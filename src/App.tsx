import React, { useState } from 'react';
import { ClimateGlobe, ClimateLayer } from './components/Globe/ClimateGlobe';
import { HeaderHUD } from './components/UI/HeaderHUD';
import { TimeDomainSelector } from './components/UI/TimeDomainSelector';
import { LayerSelector } from './components/UI/LayerSelector';
import { CauseImpactToggle, AnalyticalMode } from './components/UI/CauseImpactToggle';
import { TimelineSlider } from './components/UI/TimelineSlider';
import { ScientificDossier } from './components/UI/ScientificDossier';
import { LiveEventsDrawer } from './components/UI/LiveEventsDrawer';
import { LiveEventModal } from './components/UI/LiveEventModal';
import { ScenarioComparisonModal } from './components/UI/ScenarioComparisonModal';
import { GuidedTourModal } from './components/UI/GuidedTourModal';
import { LegendBar } from './components/UI/LegendBar';
import { InteractiveEntity } from './components/Globe/HotspotsPillars';
import { TimeDomain, SSPScenario, LiveEvent, ScientificCountryProfile } from './types/climateIntelligence';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE, getCountryProfile } from './services/countryIntelligenceService';
import { TippingPoint } from './data/tippingPoints';

export function App() {
  const [timeDomain, setTimeDomain] = useState<TimeDomain>('live');
  const [selectedSSP, setSelectedSSP] = useState<SSPScenario>('SSP2-4.5');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeLayer, setActiveLayer] = useState<ClimateLayer>('temperature');
  const [analyticalMode, setAnalyticalMode] = useState<AnalyticalMode>('causes');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Camera & Selection states
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; distance?: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InteractiveEntity | null>(null);
  const [selectedLiveEvent, setSelectedLiveEvent] = useState<LiveEvent | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);

  const handleSelectCountryOrHotspot = (lat: number, lng: number, distance: number = 3.5) => {
    setAutoRotate(false);
    setFocusTarget({ lat, lng, distance });
  };

  const handleTimeDomainChange = (domain: TimeDomain) => {
    setTimeDomain(domain);
    setAutoRotate(false);
    if (domain === 'live') {
      setSelectedYear(2026);
    } else if (domain === 'observed') {
      setSelectedYear(2024);
    } else if (domain === 'projected') {
      setSelectedYear(2050);
    }
  };

  const handleSelectEntity = (entity: InteractiveEntity | null) => {
    setSelectedEntity(entity);
    if (entity) {
      setAutoRotate(false);
    }
  };

  // Convert legacy entity or retrieve full scientific country profile
  let activeCountryProfile: ScientificCountryProfile | null = null;
  let activeTippingPoint: TippingPoint | null = null;

  if (selectedEntity) {
    if (selectedEntity.type === 'country') {
      const legacy = selectedEntity.data as { id: string };
      activeCountryProfile = getCountryProfile(legacy.id) || SCIENTIFIC_COUNTRY_INTELLIGENCE[0];
    } else {
      activeTippingPoint = selectedEntity.data as TippingPoint;
    }
  }

  return (
    <div className="relative w-screen h-screen bg-[#020617] overflow-hidden select-none font-sans text-slate-100">
      {/* 3D WebGL Earth Visualizer */}
      <ClimateGlobe
        activeLayer={activeLayer}
        timeDomain={timeDomain}
        selectedYear={selectedYear}
        autoRotate={autoRotate}
        focusTarget={focusTarget}
        onSelectEntity={handleSelectEntity}
        onSelectLiveEvent={(ev) => {
          setAutoRotate(false);
          setSelectedLiveEvent(ev);
        }}
      />

      {/* Top Telemetry Header HUD */}
      <HeaderHUD
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onStartTour={() => {
          setAutoRotate(false);
          setIsTourOpen(true);
        }}
        onSelectCountryOrHotspot={handleSelectCountryOrHotspot}
        currentTimeDomain={timeDomain}
      />

      {/* Central Time Domain Switcher (Live vs Observed vs Projected) */}
      <TimeDomainSelector
        currentDomain={timeDomain}
        onSelectDomain={handleTimeDomainChange}
      />

      {/* Copernicus Climate Layer Switcher */}
      <LayerSelector
        activeLayer={activeLayer}
        onSelectLayer={(layer) => setActiveLayer(layer)}
      />

      {/* Cause vs Impact Dual Lens */}
      <CauseImpactToggle
        mode={analyticalMode}
        onToggleMode={(mode) => setAnalyticalMode(mode)}
      />

      {/* Live Events Drawer (Available in LIVE mode) */}
      {timeDomain === 'live' && (
        <LiveEventsDrawer
          onSelectEvent={(ev) => setSelectedLiveEvent(ev)}
          onLocateEvent={handleSelectCountryOrHotspot}
        />
      )}

      {/* Data Legend */}
      <LegendBar activeLayer={activeLayer} />

      {/* Domain-Aware Timeline Slider */}
      <TimelineSlider
        timeDomain={timeDomain}
        currentYear={selectedYear}
        onYearChange={(year) => setSelectedYear(year)}
        selectedSSP={selectedSSP}
        onOpenScenarioModal={() => setIsScenarioModalOpen(true)}
      />

      {/* Live Event Satellite Alert Modal */}
      <LiveEventModal
        event={selectedLiveEvent}
        onClose={() => setSelectedLiveEvent(null)}
      />

      {/* Scientific Country & Tipping Point Attribution Dossier */}
      <ScientificDossier
        country={activeCountryProfile}
        tippingPoint={activeTippingPoint}
        onClose={() => setSelectedEntity(null)}
        defaultTab={analyticalMode === 'causes' ? 'drivers' : 'impacts'}
      />

      {/* IPCC AR6 Scenario Modeler Modal */}
      <ScenarioComparisonModal
        selectedSSP={selectedSSP}
        onSelectSSP={(ssp) => {
          setSelectedSSP(ssp);
          setIsScenarioModalOpen(false);
        }}
        isOpen={isScenarioModalOpen}
        onClose={() => setIsScenarioModalOpen(false)}
      />

      {/* Guided Tipping Point Tour */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onFocusCoordinates={handleSelectCountryOrHotspot}
      />
    </div>
  );
}

export default App;
