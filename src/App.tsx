import React, { useState, useEffect, useCallback } from 'react';
import { ClimateGlobe, ClimateLayer } from './components/Globe/ClimateGlobe';
import { HeaderHUD } from './components/UI/HeaderHUD';
import { TimeDomainSelector } from './components/UI/TimeDomainSelector';
import { LayerSelector } from './components/UI/LayerSelector';
import { TimelineSlider } from './components/UI/TimelineSlider';
import { ScientificDossier } from './components/UI/ScientificDossier';
import { LiveEventsDrawer } from './components/UI/LiveEventsDrawer';
import { ScenarioComparisonModal } from './components/UI/ScenarioComparisonModal';
import { GuidedTourModal } from './components/UI/GuidedTourModal';
import { LegendBar } from './components/UI/LegendBar';
import { DataFreshnessPanel } from './components/UI/DataFreshnessPanel';
import { ScientificAttributionCard } from './components/UI/ScientificAttributionCard';
import { MethodologyPage } from './components/Pages/MethodologyPage';
import { DataSourcesPage } from './components/Pages/DataSourcesPage';
import { LegalPages } from './components/Pages/LegalPages';
import { ClimateEncyclopediaPage } from './components/Pages/ClimateEncyclopediaPage';
import { InteractiveEntity } from './components/Globe/HotspotsPillars';
import { 
  TimeDomain, 
  SSPScenario, 
  LiveEvent, 
  ScientificCountryProfile,
  FireCluster,
  FireDetectionPoint,
  NOAACycloneEvent,
  SourceFreshnessReport
} from './types/climateIntelligence';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE, getCountryProfile } from './services/countryIntelligenceService';
import { 
  getFireClusters, 
  getActiveCyclones, 
  getTelemetryFreshness, 
  getClusterPoints 
} from './services/apiClient';
import { TippingPoint } from './data/tippingPoints';

type PageRoute = 'globe' | 'methodology' | 'datasources' | 'about' | 'privacy' | 'terms' | 'contact' | 'wiki';

export function App() {
  // Navigation & Active View
  const [activeRoute, setActiveRoute] = useState<PageRoute>('globe');

  // Core Earth & Time States
  const [timeDomain, setTimeDomain] = useState<TimeDomain>('live');
  const [selectedSSP, setSelectedSSP] = useState<SSPScenario>('SSP2-4.5');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeLayer, setActiveLayer] = useState<ClimateLayer>('temperature');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Live Telemetry Datasets
  const [fireClusters, setFireClusters] = useState<FireCluster[]>([]);
  const [cyclones, setCyclones] = useState<NOAACycloneEvent[]>([]);
  const [freshnessReports, setFreshnessReports] = useState<SourceFreshnessReport[]>([]);
  const [sensorFilter, setSensorFilter] = useState<'ALL' | 'VIIRS' | 'MODIS'>('ALL');
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [expandedCluster, setExpandedCluster] = useState<FireCluster | null>(null);

  // Selection & Inspector States
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; distance?: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InteractiveEntity | null>(null);
  const [selectedAttributionItem, setSelectedAttributionItem] = useState<FireCluster | FireDetectionPoint | NOAACycloneEvent | LiveEvent | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);

  // Fetch telemetry from centralized server API client
  const loadTelemetry = useCallback(async () => {
    setIsLoadingLive(true);
    try {
      const [firesData, cyclonesData, freshnessData] = await Promise.all([
        getFireClusters(sensorFilter),
        getActiveCyclones(),
        getTelemetryFreshness()
      ]);

      setFireClusters(firesData.clusters);
      setCyclones(cyclonesData.cyclones);
      setFreshnessReports(freshnessData);
    } catch (err) {
      console.warn('[Earth Live] Telemetry fetch notice:', err);
    } finally {
      setIsLoadingLive(false);
    }
  }, [sensorFilter]);

  // Initial load
  useEffect(() => {
    loadTelemetry();
  }, [loadTelemetry]);

  // Background Auto-Refresh every 3 minutes (180,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      loadTelemetry();
    }, 180000);
    return () => clearInterval(interval);
  }, [loadTelemetry]);

  // Expand a cluster on-demand
  const handleDrillDownCluster = async (clusterId: string) => {
    const clusterWithPoints = await getClusterPoints(clusterId);
    if (clusterWithPoints) {
      setExpandedCluster(clusterWithPoints);
      setAutoRotate(false);
      setFocusTarget({ lat: clusterWithPoints.lat, lng: clusterWithPoints.lng, distance: 3.0 });
    }
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

  // Aggregate total detections across clusters
  const totalFires = fireClusters.reduce((acc, c) => acc + c.detectionCount, 0);

  // Substantive Pages Navigation Render
  if (activeRoute === 'wiki') {
    return <ClimateEncyclopediaPage onBackToGlobe={() => setActiveRoute('globe')} />;
  }
  if (activeRoute === 'methodology') {
    return <MethodologyPage onBackToGlobe={() => setActiveRoute('globe')} />;
  }
  if (activeRoute === 'datasources') {
    return <DataSourcesPage onBackToGlobe={() => setActiveRoute('globe')} />;
  }
  if (activeRoute === 'about' || activeRoute === 'privacy' || activeRoute === 'terms' || activeRoute === 'contact') {
    return (
      <LegalPages
        onBackToGlobe={() => setActiveRoute('globe')}
        initialTab={activeRoute as 'about' | 'privacy' | 'terms' | 'contact'}
      />
    );
  }

  return (
    <div className="relative w-screen h-screen bg-[#020617] overflow-hidden select-none font-sans text-slate-100">
      {/* 3D WebGL Earth Visualizer (The Hero Interface) */}
      <ClimateGlobe
        activeLayer={activeLayer}
        timeDomain={timeDomain}
        selectedYear={selectedYear}
        autoRotate={autoRotate}
        focusTarget={focusTarget}
        onSelectEntity={(ent) => {
          setAutoRotate(false);
          setSelectedEntity(ent);
        }}
        onSelectCluster={(cluster) => {
          setAutoRotate(false);
          if (cluster) {
            setSelectedAttributionItem(cluster);
            setFocusTarget({ lat: cluster.lat, lng: cluster.lng, distance: 3.4 });
          } else {
            setSelectedAttributionItem(null);
          }
        }}
        onSelectCyclone={(cyclone) => {
          setAutoRotate(false);
          if (cyclone) {
            setSelectedAttributionItem(cyclone);
            setFocusTarget({ lat: cyclone.currentLat, lng: cyclone.currentLng, distance: 3.4 });
          } else {
            setSelectedAttributionItem(null);
          }
        }}
        onSelectPoint={(point) => {
          setAutoRotate(false);
          if (point) {
            setSelectedAttributionItem(point);
          }
        }}
        onSelectLiveEvent={(ev) => {
          setAutoRotate(false);
          setSelectedAttributionItem(ev);
        }}
        fireClusters={fireClusters}
        cyclones={cyclones}
        expandedCluster={expandedCluster}
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
        syncStatus={{
          status: 'live',
          sourceLabel: 'NASA FIRMS & NOAA NHC',
          lastSyncFormatted: '3m cycle',
          lastUpdatedSecondsAgo: 0,
          totalFiresCount: totalFires,
          totalStormsCount: cyclones.length,
          totalEvents: totalFires + cyclones.length
        }}
        onRefreshTelemetry={loadTelemetry}
        isLoadingLive={isLoadingLive}
        onOpenWiki={() => setActiveRoute('wiki')}
        onOpenMethodology={() => setActiveRoute('methodology')}
        onOpenDataSources={() => setActiveRoute('datasources')}
        onOpenAbout={() => setActiveRoute('about')}
        activeSensorFilter={sensorFilter}
        onSelectSensorFilter={(sf) => setSensorFilter(sf)}
        clusterCount={fireClusters.length}
        cycloneCount={cyclones.length}
      />

      {/* Data Freshness Indicator & Drawer (Top Right) */}
      <DataFreshnessPanel
        reports={freshnessReports}
        onManualRefresh={loadTelemetry}
        isRefreshing={isLoadingLive}
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
        <LegendBar activeLayer={activeLayer} />
      </div>

      {/* Domain-Aware Timeline Slider */}
      <TimelineSlider
        timeDomain={timeDomain}
        currentYear={selectedYear}
        onYearChange={(year) => setSelectedYear(year)}
        selectedSSP={selectedSSP}
        onOpenScenarioModal={() => setIsScenarioModalOpen(true)}
      />

      {/* 5-Stage Scientific Attribution Card (Observation ➔ Event ➔ Drivers ➔ Impacts ➔ Evidence) */}
      <ScientificAttributionCard
        event={selectedAttributionItem}
        onClose={() => setSelectedAttributionItem(null)}
        onDrillDownCluster={handleDrillDownCluster}
      />

      {/* Scientific Country & Tipping Point Attribution Dossier */}
      <ScientificDossier
        country={activeCountryProfile}
        tippingPoint={activeTippingPoint}
        onClose={() => setSelectedEntity(null)}
        defaultTab="drivers"
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

      {/* Footer Navigation Bar */}
      <footer className="absolute bottom-2 left-0 right-0 z-20 pointer-events-none flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-[11px] font-mono text-slate-400">
          <button onClick={() => setActiveRoute('methodology')} className="hover:text-emerald-400 transition">Methodology</button>
          <span>•</span>
          <button onClick={() => setActiveRoute('datasources')} className="hover:text-emerald-400 transition">Data Sources</button>
          <span>•</span>
          <button onClick={() => setActiveRoute('about')} className="hover:text-emerald-400 transition">About</button>
          <span>•</span>
          <button onClick={() => setActiveRoute('privacy')} className="hover:text-emerald-400 transition">Privacy</button>
          <span>•</span>
          <button onClick={() => setActiveRoute('terms')} className="hover:text-emerald-400 transition">Terms</button>
          <span>•</span>
          <button onClick={() => setActiveRoute('contact')} className="hover:text-emerald-400 transition">Contact</button>
        </div>
      </footer>
    </div>
  );
}

export default App;
