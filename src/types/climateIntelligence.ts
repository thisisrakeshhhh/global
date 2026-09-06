export type TimeDomain = 'live' | 'observed' | 'projected';

export type SSPScenario = 'SSP1-2.6' | 'SSP2-4.5' | 'SSP5-8.5';

export type FreshnessCategory = 'NEAR-REAL-TIME SATELLITE' | 'UPDATED OBSERVATION' | 'REANALYSIS / HISTORICAL';
export type FreshnessState = 'LIVE' | 'NEAR-REAL-TIME' | 'UPDATED' | 'REANALYSIS' | 'DELAYED' | 'NO_DATA';

export interface DataProvenance {
  source: 'NASA FIRMS' | 'NOAA NHC' | 'NASA EONET' | 'NOAA MLO' | 'Copernicus ERA5' | 'NASA GISTEMP';
  dataset: string;           // e.g. "VIIRS NOAA-21 NRT", "NOAA NHC Tropical Cyclone Advisory"
  observationTime: string;   // UTC ISO string
  ingestionTime: string;     // UTC ISO string
  processingVersion: string; // e.g. "v1.0-grid1.5"
  sourceUrl: string;
}

export interface NormalizedConfidence {
  value: number | null; // 0 - 100% or null
  level: 'low' | 'nominal' | 'high' | 'unknown';
  sourceField: string;  // Raw source representation (e.g. "h", "nominal", "94%")
}

export interface FireDetectionPoint {
  id: string;
  lat: number;
  lng: number;
  brightness: number; // Kelvin
  frp: number;        // MW
  confidence: NormalizedConfidence;
  satellite: string;  // e.g. "NOAA-20 VIIRS", "Terra MODIS"
  acqDate: string;
  acqTime: string;
  daynight: 'D' | 'N';
}

export interface FireCluster {
  id: string;
  lat: number;
  lng: number;
  gridKey: string;           // e.g. "lat_-12.0_lng_-55.5" (1.5° bin)
  detectionCount: number;
  totalFRP: number;          // Sum of FRP in MW
  maxFRP: number;            // Highest single FRP in MW
  averageConfidence: number; // Mean confidence %
  latestObservation: string; // Latest UTC ISO
  satellites: string[];      // Unique satellite instruments
  regionName: string;
  points?: FireDetectionPoint[]; // Populated when inspected/zoomed
  provenance: DataProvenance;
}

export interface NOAACycloneForecastPoint {
  forecastHour: number; // 12, 24, 36, 48, 72
  validTimeUtc: string;
  lat: number;
  lng: number;
  maxWindsKts: number;
  category: string;
}

export interface NOAACycloneEvent {
  id: string;
  stormName: string;
  basin: string;              // "Atlantic", "Eastern Pacific", "Central Pacific"
  category: string;           // "Tropical Depression", "Tropical Storm", "Category 1-5 Hurricane"
  currentLat: number;
  currentLng: number;
  maxSustainedWindsKts: number;
  maxSustainedWindsMph: number;
  centralPressureMb: number;
  advisoryNumber: string;
  advisoryTimeUtc: string;
  forecastTrack: NOAACycloneForecastPoint[];
  provenance: DataProvenance;
}

export interface ScientificAttribution {
  observation: {
    description: string;
    instrument: string;
    timestampUtc: string;
    confidenceTag: 'OBSERVED';
  };
  event: {
    classification: string;
    intensityMetric: string;
    confidenceTag: 'HIGH CONFIDENCE' | 'ESTIMATED';
  };
  possibleDrivers: {
    factors: string[];
    caveat: string;
    confidenceTag: 'POSSIBLE DRIVER';
  };
  potentialImpacts: {
    consequences: string[];
    confidenceTag: 'HIGH CONFIDENCE' | 'ESTIMATED';
  };
  evidenceAndCitations: {
    datasets: string[];
    doiOrUrl?: string;
  };
}

export interface SourceFreshnessReport {
  sourceId: string;
  sourceName: string;
  category: FreshnessCategory;
  state: FreshnessState;
  latestObservationUtc: string;
  lastIngestedUtc: string;
  latencyMinutes: number;
  statusMessage: string;
}

export interface LiveEvent {
  id: string;
  type: 'wildfire' | 'cyclone' | 'flood' | 'extreme_heat' | 'drought' | 'volcano';
  title: string;
  location: string;
  lat: number;
  lng: number;
  detectedAt: string;
  exactUtcTimestamp: string;
  source: string;
  confidence?: string;
  metricLabel: string;
  metricValue: string;
  severity: 'critical' | 'extreme' | 'moderate';
  details: string;
  url?: string;
  isLiveFetched: boolean;
  provenance?: DataProvenance;
  attribution?: ScientificAttribution;
  attributionChain?: {
    whyOccurred: string;
    whatItCauses: string;
    whatItAffects: string;
    evidenceSensors: string;
    confidenceLevel: string;
  };
  // Cluster reference if part of one
  clusterId?: string;
  detectionCount?: number;
}

export interface HistoricalObservation {
  year: number;
  tempAnomaly: number; // °C vs 1850-1900 pre-industrial
  co2Ppm: number;
  seaIceExtentMkm2: number;
  seaLevelRiseMm: number;
  dataSource: string; // "NASA GISTEMP v4 & NOAA MLO"
  keyObservationalMilestone: string;
}

export interface ProjectionScenarioData {
  ssp: SSPScenario;
  name: string;
  tempBy2100: string;
  co2By2100: string;
  summary: string;
  assumptions: string;
  policyRelevance: string;
  decadalTrajectory: {
    year: number;
    tempAnomaly: number;
    co2Ppm: number;
    seaIceExtentMkm2: number;
    seaLevelRiseCm: number;
  }[];
}

export interface AttributedDriver {
  sector: string;
  percentage: number;
  annualGtCO2eq: number;
  primaryMechanism: string;
  source: string;
  inventoryYear: string;
  methodology: string;
}

export interface AttributedImpact {
  title: string;
  severity: 'critical' | 'high' | 'moderate';
  causalChain: {
    driver: string;
    mechanism: string;
    directEffect: string;
    humanCost: string;
  };
  observedEvidence: string;
  citations: string;
}

export interface ScientificCountryProfile {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  tempAnomaly: number;
  tempAnomalySource: string;
  totalEmissionsGt: number;
  emissionsSource: string;
  emissionsPerCapitaTonnes: number;
  // Pillar 1: Cumulative Historical Contribution
  cumulativeEmissionsGt?: number;
  cumulativeSharePercent?: number;
  cumulativeSource?: string;
  // Pillar 2: Observed Climate Exposure & Vulnerability
  ndGainVulnerabilityScore?: number; // Lower score = lower vulnerability or ND-GAIN index (0-100)
  ndGainRank?: string;              // e.g. "128 of 185 countries"
  regionalWarmingRate?: string;     // e.g. "1.5x global rate"
  vulnerabilityCategory?: 'Extreme' | 'High' | 'Moderate' | 'Low';
  attributionGuardrail?: string;
  parisStatus: string;
  parisAssessmentSource: string;
  drivers: AttributedDriver[];
  impacts: AttributedImpact[];
  keyObservation: string;
  academicCitation: string;
}

