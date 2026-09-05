export type TimeDomain = 'live' | 'observed' | 'projected';

export type SSPScenario = 'SSP1-2.6' | 'SSP2-4.5' | 'SSP5-8.5';

export interface LiveEvent {
  id: string;
  type: 'wildfire' | 'cyclone' | 'flood' | 'extreme_heat' | 'drought';
  title: string;
  location: string;
  lat: number;
  lng: number;
  detectedAt: string; // ISO or human string
  source: string; // e.g. "NASA FIRMS / VIIRS (S-NPP)", "GDACS / NOAA"
  confidence?: string; // "High (92%)", "Confirmed"
  metricLabel: string; // "Brightness Temp", "Sustained Winds", "Affected Population"
  metricValue: string; // "385 K", "215 km/h", "1.2M people"
  severity: 'critical' | 'extreme' | 'moderate';
  details: string;
  url?: string;
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
  tempBy2100: string; // "+1.8°C", "+2.7°C", "+4.4°C"
  co2By2100: string; // "440 ppm", "600 ppm", "1135 ppm"
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
  source: string; // e.g. "IEA World Energy Balances 2023"
  inventoryYear: string; // "2023"
  methodology: string; // "IPCC 2006 Guidelines, Tier 1/2 fuel combustion"
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
  citations: string; // e.g. "IPCC AR6 WGII Ch. 10; Copernicus ERA5"
}

export interface ScientificCountryProfile {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  tempAnomaly: number; // °C
  tempAnomalySource: string; // "Copernicus ERA5 (2024)"
  totalEmissionsGt: number; // Gt CO2e
  emissionsSource: string; // "EDGAR v8.0 / WRI Climate Watch (2023)"
  emissionsPerCapitaTonnes: number;
  parisStatus: string;
  parisAssessmentSource: string; // "Climate Action Tracker (2024)"
  drivers: AttributedDriver[];
  impacts: AttributedImpact[];
  keyObservation: string;
  academicCitation: string;
}
