import React, { useState, useEffect } from 'react';
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
import { CauseEventImpactCard } from './components/UI/CauseEventImpactCard';
import { AdSenseSlot } from './components/UI/AdSenseSlot';
import { InteractiveEntity } from './components/Globe/HotspotsPillars';
import { TimeDomain, SSPScenario, LiveEvent, ScientificCountryProfile } from './types/climateIntelligence';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE, getCountryProfile } from './services/countryIntelligenceService';
import { fetchLiveDisasterEvents, clearLiveTelemetryCache, getTelemetrySyncStatus, TelemetrySyncStatus } from './services/liveTelemetryService';
import { TippingPoint } from './data/tippingPoints';
import { Sparkles, Layers, ArrowRight } from 'lucide-react';

export function App() {
  const [timeDomain, setTimeDomain] = useState<TimeDomain>('live');
  const [selectedSSP, setSelectedSSP] = useState<SSPScenario>('SSP2-4.5');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeLayer, setActiveLayer] = useState<ClimateLayer>('temperature');
  const [analyticalMode, setAnalyticalMode] = useState<AnalyticalMode>('causes');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Live Telemetry state
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [syncStatus, setSyncStatus] = useState<TelemetrySyncStatus>(getTelemetrySyncStatus());
  const [showAnalysisDrawer, setShowAnalysisDrawer] = useState<boolean>(false);

  // Camera & Selection states
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; distance?: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InteractiveEntity | null>(null);
  const [selectedLiveEvent, setSelectedLiveEvent] = useState<LiveEvent | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);

  const loadTelemetry = async (force: boolean = false) => {
    setIsLoadingLive(true);
    const events = await fetchLiveDisasterEvents(force);
    setLiveEvents(events);
    setSyncStatus(getTelemetrySyncStatus());
    setIsLoadingLive(false);
  };

  // Initial load
  useEffect(() => {
    loadTelemetry();
  }, []);

  // Background Auto-Refresh every 3 minutes (180 seconds)
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      loadTelemetry(true);
    }, 180000);

    // Also update elapsed seconds counter every 10 seconds
    const statusInterval = setInterval(() => {
      setSyncStatus(getTelemetrySyncStatus());
    }, 10000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const handleManualRefresh = async () => {
    clearLiveTelemetryCache();
    await loadTelemetry(true);
  };

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
        liveEvents={liveEvents}
      />

      {/* Clean Top Header HUD with 5-Second Vital Telemetry */}
      <HeaderHUD
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        onStartTour={() => {
          setAutoRotate(false);
          setIsTourOpen(true);
        }}
        onSelectCountryOrHotspot={handleSelectCountryOrHotspot}
        currentTimeDomain={timeDomain}
        syncStatus={syncStatus}
        onRefreshTelemetry={handleManualRefresh}
        isLoadingLive={isLoadingLive}
      />

      {/* Central Time Domain Switcher (Live vs Observed vs Projected) */}
      <TimeDomainSelector
        currentDomain={timeDomain}
        onSelectDomain={handleTimeDomainChange}
      />

      {/* Clean Left-Side Controls Column */}
      <div className="absolute left-3 sm:left-4 top-16 sm:top-16 z-20 flex flex-col gap-2 pointer-events-none max-h-[85vh] overflow-y-auto no-scrollbar">
        <LayerSelector
          activeLayer={activeLayer}
          onSelectLayer={(layer) => setActiveLayer(layer)}
        />

        <CauseImpactToggle
          mode={analyticalMode}
          onToggleMode={(mode) => setAnalyticalMode(mode)}
        />

        <LegendBar activeLayer={activeLayer} />

        {/* Button to open Cause ➔ Event ➔ Impact & AdSense Panel */}
        <button
          onClick={() => setShowAnalysisDrawer(!showAnalysisDrawer)}
          className="pointer-events-auto flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 hover:text-white hover:bg-slate-900 transition-colors shadow-xl"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cause ➔ Impact Analysis</span>
          </span>
          <ArrowRight className={`w-3 h-3 transition-transform ${showAnalysisDrawer ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Live Events Drawer (On Right Side in LIVE mode) */}
      {timeDomain === 'live' && (
        <LiveEventsDrawer
          events={liveEvents}
          isLoading={isLoadingLive}
          onRefresh={handleManualRefresh}
          onSelectEvent={(ev) => setSelectedLiveEvent(ev)}
          onLocateEvent={handleSelectCountryOrHotspot}
        />
      )}

      {/* Domain-Aware Timeline Slider */}
      <TimelineSlider
        timeDomain={timeDomain}
        currentYear={selectedYear}
        onYearChange={(year) => setSelectedYear(year)}
        selectedSSP={selectedSSP}
        onOpenScenarioModal={() => setIsScenarioModalOpen(true)}
      />

      {/* Expandable Cause ➔ Event ➔ Impact & AdSense Drawer */}
      {showAnalysisDrawer && (
        <div className="fixed inset-x-0 bottom-16 sm:bottom-20 z-30 max-h-[70vh] overflow-y-auto p-3 flex flex-col items-center pointer-events-none animate-fadeIn">
          <div className="w-full max-w-4xl pointer-events-auto space-y-2">
            <CauseEventImpactCard />
            <AdSenseSlot />
          </div>
        </div>
      )}

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
