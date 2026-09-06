import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ClimateGlobe, ClimateGlobeHandle, ClimateLayer } from './components/Globe/ClimateGlobe';
import { MainNavbar, PresentationMode } from './components/UI/MainNavbar';
import { TodayStoriesBar } from './components/UI/TodayStoriesBar';
import { VitalsDrawer } from './components/UI/VitalsDrawer';
import { EventStoryModal } from './components/Story/EventStoryModal';
import { ClimateHistoryPanel } from './components/UI/ClimateHistoryPanel';
import { HistoryPage } from './components/History/HistoryPage';
import { CountrySelectorBar } from './components/UI/CountrySelectorBar';
import { ScientificDossier } from './components/UI/ScientificDossier';
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
import { EventStory } from './types/eventStory';
import { 
  NEPAL_FLOOD_STORY, 
  createStoryFromFireCluster, 
  createStoryFromCyclone, 
  getFeaturedStories 
} from './services/eventStoryService';
import { SCIENTIFIC_COUNTRY_INTELLIGENCE, getCountryProfile } from './services/countryIntelligenceService';
import { 
  getFireClusters, 
  getActiveCyclones, 
  getTelemetryFreshness, 
  getClusterPoints 
} from './services/apiClient';
import { TippingPoint } from './data/tippingPoints';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';

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
  
  // 5 Clean Product Modes: Explore | History | Countries | Events | Evidence
  const [presentationMode, setPresentationMode] = useState<PresentationMode>('explore');

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
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [activeLayer, setActiveLayer] = useState<ClimateLayer>('forests');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // Globe Handle Ref
  const globeRef = useRef<ClimateGlobeHandle>(null);

  // Live Telemetry Datasets
  const [fireClusters, setFireClusters] = useState<FireCluster[]>([]);
  const [cyclones, setCyclones] = useState<NOAACycloneEvent[]>([]);
  const [freshnessReports, setFreshnessReports] = useState<SourceFreshnessReport[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [expandedCluster, setExpandedCluster] = useState<FireCluster | null>(null);

  // Modal / Drawer States
  const [isVitalsOpen, setIsVitalsOpen] = useState<boolean>(false);
  const [activeStory, setActiveStory] = useState<EventStory | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Selection & Inspector States
  const [focusTarget, setFocusTarget] = useState<{ lat: number; lng: number; distance?: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InteractiveEntity | null>(null);
  const [selectedCountryProfile, setSelectedCountryProfile] = useState<ScientificCountryProfile | null>(null);

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

  // Handle Mode Switching
  const handleSelectPresentationMode = (mode: PresentationMode) => {
    setPresentationMode(mode);
    setAutoRotate(mode === 'explore');
    setIsDossierOpen(false);

    if (mode === 'history') {
      setTimeDomain('observed');
      setActiveLayer('temperature');
    } else if (mode === 'countries') {
      setTimeDomain('live');
    } else if (mode === 'events') {
      setTimeDomain('live');
      setActiveLayer('forests');
    } else if (mode === 'evidence') {
      // route to wiki or keep on globe
    } else {
      setTimeDomain('live');
      setActiveLayer('forests');
    }
  };

  // Open Event Story
  const handleOpenEventStory = (story: EventStory) => {
    setAutoRotate(false);
    setActiveStory(story);
    setFocusTarget({
      lat: story.mapConfig.centerLat,
      lng: story.mapConfig.centerLng,
      distance: 3.2
    });
  };

  const handleSelectCountryFromBar = (country: ScientificCountryProfile) => {
    setSelectedCountryProfile(country);
    setIsDossierOpen(true);
    setAutoRotate(false);
    setFocusTarget({ lat: country.lat, lng: country.lng, distance: 3.2 });
  };

  const handleSelectCountryOrHotspot = (lat: number, lng: number, distance: number = 3.5) => {
    setAutoRotate(false);
    setFocusTarget({ lat, lng, distance });
  };

  let activeCountryDossier: ScientificCountryProfile | null = isDossierOpen ? (selectedCountryProfile || (selectedEntity?.type === 'country' ? getCountryProfile((selectedEntity.data as { id: string }).id) || null : null)) : null;
  let activeTippingPoint: TippingPoint | null = isDossierOpen && selectedEntity?.type === 'tipping_point' ? (selectedEntity.data as TippingPoint) : null;

  // Get active featured stories
  const featuredStories = getFeaturedStories(fireClusters, cyclones);

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
      {/* 3D WebGL Earth Visualizer (Ambient Visualization Anchor) */}
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
            if (ent.type === 'country') {
              const legacy = ent.data as { id: string };
              const found = getCountryProfile(legacy.id);
              if (found) setSelectedCountryProfile(found);
            }
          }}
          onSelectCluster={(cluster) => {
            setAutoRotate(false);
            if (cluster) {
              const story = createStoryFromFireCluster(cluster);
              handleOpenEventStory(story);
            }
          }}
          onSelectCyclone={(cyclone) => {
            setAutoRotate(false);
            if (cyclone) {
              const story = createStoryFromCyclone(cyclone);
              handleOpenEventStory(story);
            }
          }}
          onSelectPoint={() => {}}
          onSelectLiveEvent={() => {}}
          fireClusters={fireClusters}
          cyclones={cyclones}
          expandedCluster={expandedCluster}
        />
      </div>

      {/* Foreground UI Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none">
        {/* Top Navbar */}
        <div className="w-full flex flex-col pointer-events-auto">
          <MainNavbar
            activeMode={presentationMode}
            onSelectMode={handleSelectPresentationMode}
            onNavigatePage={(page) => navigateTo(page)}
            onOpenVitals={() => setIsVitalsOpen(true)}
            onSelectCoordinates={handleSelectCountryOrHotspot}
          />
        </div>

        {/* Center Section: Hero Presentation Prompt (in 'explore' mode) */}
        {presentationMode === 'explore' && (
          <div className="w-full flex flex-col items-center justify-center px-4 pointer-events-none my-auto">
            <div className="flex flex-col items-center text-center max-w-xl mx-auto pointer-events-auto animate-fadeIn">
              <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-medium text-slate-300 mb-3 backdrop-blur-md shadow-sm">
                Climate intelligence
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-50 tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                How is our planet changing?
              </h1>
              <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-md drop-shadow-md leading-relaxed">
                See the places where Earth's climate is changing — and understand why.
              </p>
              <button
                onClick={() => handleSelectPresentationMode('events')}
                className="mt-6 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-white text-slate-950 text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore today's events</span>
                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-[11px] text-slate-400 mt-2.5 font-normal">
                Live satellite observations · Climate records · Verified sources
              </span>
            </div>
          </div>
        )}

        {/* Mode 2: Full History Experience */}
        {presentationMode === 'history' && (
          <div className="flex-1 overflow-y-auto pointer-events-auto custom-scrollbar">
            <HistoryPage
              selectedYear={selectedYear}
              onYearChange={(yr) => setSelectedYear(yr)}
            />
          </div>
        )}

        {/* Center Spacing for other modes */}
        {presentationMode !== 'explore' && presentationMode !== 'history' && <div className="flex-1" />}

        {/* Bottom Section: Mode-Specific Deck */}
        <div className="w-full pointer-events-auto px-3 sm:px-6 pb-4">
          {/* Mode 1 & 4: Explore & Events -> TODAY Stories Bar */}
          {(presentationMode === 'explore' || presentationMode === 'events') && (
            <div className="animate-fadeIn">
              <TodayStoriesBar
                stories={featuredStories}
                cyclones={cyclones}
                onSelectStory={handleOpenEventStory}
                onExploreAll={() => handleSelectPresentationMode('events')}
                onOpenVitals={() => setIsVitalsOpen(true)}
              />
            </div>
          )}

          {/* Mode 3: Countries -> Country Selector Scorecards */}
          {presentationMode === 'countries' && (
            <div className="animate-fadeIn">
              <CountrySelectorBar
                selectedCountryId={activeCountryDossier?.id}
                onSelectCountry={handleSelectCountryFromBar}
              />
            </div>
          )}
        </div>
      </div>

      {/* Earth's Vital Signs Slide-Out Drawer (Clean & On-Demand) */}
      <VitalsDrawer
        isOpen={isVitalsOpen}
        onClose={() => setIsVitalsOpen(false)}
        fireClusterCount={fireClusters.length}
        cyclonesCount={cyclones.length}
        freshnessReports={freshnessReports}
        onRefresh={loadTelemetry}
        isRefreshing={isLoadingLive}
      />

      {/* Deep-Dive Event Story Modal (What Happened -> Where -> Why -> Evidence -> History) */}
      <EventStoryModal
        story={activeStory}
        onClose={() => setActiveStory(null)}
      />

      {/* Scientific Country & Tipping Point 2-Pillar Dossier */}
      <ScientificDossier
        country={activeCountryDossier}
        tippingPoint={activeTippingPoint}
        onClose={() => {
          setSelectedEntity(null);
          setSelectedCountryProfile(null);
        }}
        defaultTab="contribution"
      />
    </div>
  );
}

export default App;
