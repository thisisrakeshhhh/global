import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ClimateGlobe, ClimateGlobeHandle, ClimateLayer } from './components/Globe/ClimateGlobe';
import { MainNavbar } from './components/UI/MainNavbar';
import { MetricsBanner } from './components/UI/MetricsBanner';
import { ClimateLayersPanel, LayerState } from './components/UI/ClimateLayersPanel';
import { LatestEventsPanel, DisplayEvent } from './components/UI/LatestEventsPanel';
import { GlobeFloatingControls } from './components/UI/GlobeFloatingControls';
import { BottomBanners } from './components/UI/BottomBanners';
import { ScientificDossier } from './components/UI/ScientificDossier';
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

function getInitialRoute(): PageRoute {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path === 'wiki' || path === 'encyclopedia') return 'wiki';
    if (path === 'methodology') return 'methodology';
    if (path === 'datasources') return 'datasources';
    if (['about', 'privacy', 'terms', 'contact'].includes(path)) return path as PageRoute;
  }
  return 'globe';
}

export function App() {
  // Navigation & Active View with deep URL support
  const [activeRoute, setActiveRoute] = useState<PageRoute>(getInitialRoute);

  const navigateTo = useCallback((route: PageRoute) => {
    setActiveRoute(route);
    if (typeof window !== 'undefined') {
      const newPath = route === 'globe' ? '/' : `/${route}`;
      window.history.pushState({ route }, '', newPath);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActiveRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Core Earth & Time States
  const [timeDomain, setTimeDomain] = useState<TimeDomain>('live');
  const [selectedSSP, setSelectedSSP] = useState<SSPScenario>('SSP2-4.5');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeLayer, setActiveLayer] = useState<ClimateLayer>('forests');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Globe Handle Ref for Floating Camera Controls
  const globeRef = useRef<ClimateGlobeHandle>(null);

  // Climate Layers Toggle State
  const [layerState, setLayerState] = useState<LayerState>({
    fires: true,
    cyclones: false,
    temperature: false,
    oceanHeat: false,
    polarIce: false,
    greenhouseGases: false
  });

  const handleToggleLayer = (key: keyof LayerState) => {
    setLayerState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (key === 'temperature') setActiveLayer('temperature');
      else if (key === 'oceanHeat') setActiveLayer('oceans');
      else if (key === 'polarIce') setActiveLayer('ice');
      else if (key === 'greenhouseGases') setActiveLayer('emissions');
      else if (key === 'fires') setActiveLayer('forests');
      return next;
    });
  };

  // Live Telemetry Datasets
  const [fireClusters, setFireClusters] = useState<FireCluster[]>([]);
  const [cyclones, setCyclones] = useState<NOAACycloneEvent[]>([]);
  const [freshnessReports, setFreshnessReports] = useState<SourceFreshnessReport[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [expandedCluster, setExpandedCluster] = useState<FireCluster | null>(null);

  // Freshness Modal State
  const [isFreshnessOpen, setIsFreshnessOpen] = useState<boolean>(false);

  // Selection & Inspector States
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; distance?: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InteractiveEntity | null>(null);
  const [selectedAttributionItem, setSelectedAttributionItem] = useState<FireCluster | FireDetectionPoint | NOAACycloneEvent | LiveEvent | null>(null);

  // Fetch telemetry from centralized server API client
  const loadTelemetry = useCallback(async () => {
    setIsLoadingLive(true);
    try {
      const [firesData, cyclonesData, freshnessData] = await Promise.all([
        getFireClusters('ALL'),
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
  }, []);

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

  const handleSelectDisplayEvent = (event: DisplayEvent) => {
    setAutoRotate(false);
    setFocusTarget({ lat: event.lat, lng: event.lng, distance: 3.2 });
    setSelectedAttributionItem(event.rawItem);
  };

  const handleOpenWiki = (chapterId?: string) => {
    navigateTo('wiki');
    if (chapterId && typeof window !== 'undefined') {
      sessionStorage.setItem('selectedChapterId', chapterId);
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

  // Substantive Pages Navigation Render
  if (activeRoute === 'wiki') {
    return <ClimateEncyclopediaPage onBackToGlobe={() => navigateTo('globe')} />;
  }
  if (activeRoute === 'methodology') {
    return <MethodologyPage onBackToGlobe={() => navigateTo('globe')} />;
  }
  if (activeRoute === 'datasources') {
    return <DataSourcesPage onBackToGlobe={() => navigateTo('globe')} />;
  }
  if (activeRoute === 'about' || activeRoute === 'privacy' || activeRoute === 'terms' || activeRoute === 'contact') {
    return (
      <LegalPages
        onBackToGlobe={() => navigateTo('globe')}
        initialTab={activeRoute as 'about' | 'privacy' | 'terms' | 'contact'}
      />
    );
  }

  return (
    <div className="relative w-screen h-screen bg-[#030712] overflow-hidden select-none font-sans text-slate-100">
      {/* 3D WebGL Earth Visualizer (Full Background) */}
      <div className="absolute inset-0 z-0">
        <ClimateGlobe
          ref={globeRef}
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
          fireClusters={layerState.fires ? fireClusters : []}
          cyclones={layerState.cyclones ? cyclones : []}
          expandedCluster={expandedCluster}
        />
      </div>

      {/* Foreground UI Layer with Dashboard Grid matching exact reference screenshot */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
        {/* Top Bar Section */}
        <div className="w-full flex flex-col pointer-events-auto">
          <MainNavbar
            activeRoute={activeRoute}
            onNavigate={(route) => navigateTo(route)}
            onSelectCoordinates={handleSelectCountryOrHotspot}
          />
          <MetricsBanner
            firesClusterCount={fireClusters.length}
            cyclonesCount={cyclones.length}
            sourcesOnlineCount={freshnessReports.filter(r => r.state !== 'NO_DATA' && r.state !== 'DELAYED').length || 4}
            lastUpdatedMinutesAgo={2}
            isLoading={isLoadingLive}
            onOpenFreshness={() => setIsFreshnessOpen(!isFreshnessOpen)}
          />
        </div>

        {/* Center Main Section: Climate Layers Panel (Left) & Latest Events Panel (Right) */}
        <div className="w-full flex-1 flex items-center justify-between px-4 min-h-0 pointer-events-none relative">
          {/* Left Panel: Climate Layers */}
          <div className="pointer-events-auto my-auto">
            <ClimateLayersPanel
              layers={layerState}
              onToggleLayer={handleToggleLayer}
              onOpenSourceModal={() => navigateTo('datasources')}
            />
          </div>

          {/* Center Floating Controls (Zoom +/-, Earth Alignment & Near-Real-Time Pill) */}
          <GlobeFloatingControls
            onZoomIn={() => globeRef.current?.zoomIn()}
            onZoomOut={() => globeRef.current?.zoomOut()}
            onResetView={() => globeRef.current?.resetView()}
            onRefresh={loadTelemetry}
            isRefreshing={isLoadingLive}
          />

          {/* Right Panel: Latest Events */}
          <div className="pointer-events-auto my-auto">
            <LatestEventsPanel
              onSelectEvent={handleSelectDisplayEvent}
              onViewAll={() => navigateTo('datasources')}
              fireClusters={fireClusters}
              cyclones={cyclones}
              isLoading={isLoadingLive}
            />
          </div>
        </div>

        {/* Bottom Section: Climate Encyclopedia Banner (~75%) & Sponsored Partner Banner (~25%) */}
        <div className="w-full pointer-events-auto">
          <BottomBanners onOpenWiki={handleOpenWiki} />
        </div>
      </div>

      {/* Data Freshness Indicator Modal */}
      <DataFreshnessPanel
        reports={freshnessReports}
        onManualRefresh={loadTelemetry}
        isRefreshing={isLoadingLive}
        isOpen={isFreshnessOpen}
        onClose={() => setIsFreshnessOpen(false)}
      />

      {/* 5-Stage Scientific Attribution Card */}
      <ScientificAttributionCard
        event={selectedAttributionItem}
        onClose={() => setSelectedAttributionItem(null)}
        onDrillDownCluster={handleDrillDownCluster}
      />

      {/* Scientific Country & Tipping Point Dossier */}
      <ScientificDossier
        country={activeCountryProfile}
        tippingPoint={activeTippingPoint}
        onClose={() => setSelectedEntity(null)}
        defaultTab="drivers"
      />
    </div>
  );
}

export default App;
