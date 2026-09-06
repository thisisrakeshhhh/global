export type EventCategory = 'flood' | 'wildfire' | 'cyclone' | 'heat' | 'drought' | 'cryosphere';

export interface MapFeatureMarker {
  lat: number;
  lng: number;
  label: string;
  type: 'city' | 'epicenter' | 'dam' | 'checkpoint' | 'sensor';
  description?: string;
}

export interface MapRiverCorridor {
  name: string;
  points: [number, number][]; // [lat, lng]
}

export interface MapDistrict {
  name: string;
  lat: number;
  lng: number;
  severity: 'critical' | 'severe' | 'monitored';
}

export interface EventMapConfig {
  centerLat: number;
  centerLng: number;
  defaultZoom: number;
  markers: MapFeatureMarker[];
  rivers?: MapRiverCorridor[];
  districts?: MapDistrict[];
  affectedPolygons?: [number, number][][];
}

export interface CausalChainStep {
  label: string;
  detail?: string;
  certainty: 'OBSERVED' | 'ASSESSED' | 'UNDER_INVESTIGATION';
}

export interface NewsReportItem {
  title: string;
  source: string;
  sourceType: 'news_agency' | 'official_government' | 'un_who' | 'scientific_consortium';
  publishedAt: string;
  url: string;
  snippet: string;
}

export interface HistoricalClimateContext {
  regionName: string;
  tempAnomaly1850toNow: string; // e.g. "+1.4°C since pre-industrial (higher in high-altitude zones)"
  rainfallTrend: string;        // e.g. "Monsoon rainfall totals have become more volatile with compressed high-intensity bursts"
  cryosphereTrend?: string;     // e.g. "Rapid Himalayan glacier retreat and moraine destabilization (ICIMOD 2023)"
  attributionGuardrail: string; // Explicit distinction: event is not automatic proof, but background risk has shifted
  citations: string[];
}

export interface EventStory {
  id: string;
  title: string;
  subtitle: string;
  countryName: string;
  countryCode: string;
  countryFlag: string;
  region: string;
  eventDate: string;
  statusBadge: string; // e.g. "Ongoing response", "Active monitoring"
  category: EventCategory;
  categoryIcon: string;
  
  // 1. What Happened?
  summary: string;
  keyFacts: { label: string; value: string }[];

  // 2. Where? (2D Map)
  mapConfig: EventMapConfig;

  // 3. Why Did It Happen? (Causal Chain + Uncertainty)
  causalChain: CausalChainStep[];
  uncertaintyNotes: string;

  // 4. What was affected?
  impactsSummary: {
    communities: string;
    infrastructure: string;
    hydropowerAndTransport: string;
  };

  // 5. What are sources reporting? (News & Official Situation Reports)
  newsReports: NewsReportItem[];

  // 6. Connect Today with History
  historicalContext: HistoricalClimateContext;

  // 7. Evidence & Citations
  evidenceSources: {
    satelliteSystems: string[];
    governmentAgencies: string[];
    scientificDatasets: string[];
  };

  // Technical drill-down (kept inside technical view)
  rawTelemetrySnippet?: {
    instrument: string;
    detectionCount?: number;
    frpMW?: number;
    sensorBand?: string;
  };
}
