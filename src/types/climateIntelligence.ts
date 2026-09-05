export type TimeDomain = 'live' | 'observed' | 'projected';

export type SSPScenario = 'SSP1-2.6' | 'SSP2-4.5' | 'SSP5-8.5';

export interface LiveEvent {
  id: string;
  type: 'wildfire' | 'cyclone' | 'flood' | 'extreme_heat' | 'drought' | 'volcano';
  title: string;
  location: string;
  lat: number;
  lng: number;
  detectedAt: string; // Human relative or exact date
  exactUtcTimestamp: string; // Real ISO 8601 string from satellite: e.g. "2026-09-04T13:03:00Z"
  source: string; // e.g. "NASA EONET v3 / Suomi NPP VIIRS"
  confidence?: string; // "High (Confirmed)", "Satellite Tracked"
  metricLabel: string; // "Localized Temp / Wind", "Sustained Winds", "Fire Radiative Power"
  metricValue: string; // "28°C • 45 km/h", "230 km/h", etc.
  severity: 'critical' | 'extreme' | 'moderate';
  details: string;
  url?: string;
  isLiveFetched: boolean; // true if fetched from NASA live API runtime

  // Scientific Attribution Chain requested:
  attributionChain: {
    whyOccurred: string;
    whatItCauses: string;
    whatItAffects: string;
    evidenceSensors: string;
    confidenceLevel: string;
  };
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
  parisStatus: string;
  parisAssessmentSource: string;
  drivers: AttributedDriver[];
  impacts: AttributedImpact[];
  keyObservation: string;
  academicCitation: string;
}
