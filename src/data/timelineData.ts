export interface TimelineMilestone {
  year: number;
  co2Ppm: number;
  tempAnomaly: number; // in °C
  seaIceExtentMkm2: number; // million km²
  seaLevelRiseCm: number; // cm above 1980
  annualEmissionsGt: number;
  headline: string;
  keyEvents: string;
  isProjected: boolean;
}

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: 1980,
    co2Ppm: 338.7,
    tempAnomaly: 0.28,
    seaIceExtentMkm2: 7.85,
    seaLevelRiseCm: 0.0,
    annualEmissionsGt: 19.4,
    headline: 'Pre-Modern Industrial Baseline',
    keyEvents: 'First satellite measurements of Arctic ice caps; early climate modeling confirms greenhouse hypothesis.',
    isProjected: false
  },
  {
    year: 1992,
    co2Ppm: 356.4,
    tempAnomaly: 0.42,
    seaIceExtentMkm2: 7.50,
    seaLevelRiseCm: 3.2,
    annualEmissionsGt: 22.8,
    headline: 'Rio Earth Summit & UNFCCC Genesis',
    keyEvents: 'World leaders establish UNFCCC framework; Mount Pinatubo eruption temporarily masks underlying thermal warming.',
    isProjected: false
  },
  {
    year: 2005,
    co2Ppm: 379.8,
    tempAnomaly: 0.69,
    seaIceExtentMkm2: 5.57,
    seaLevelRiseCm: 7.4,
    annualEmissionsGt: 29.8,
    headline: 'Rapid Industrial Acceleration',
    keyEvents: 'Kyoto Protocol enters into force; massive coal-powered industrial expansion across emerging Asian economies.',
    isProjected: false
  },
  {
    year: 2015,
    co2Ppm: 400.8,
    tempAnomaly: 0.98,
    seaIceExtentMkm2: 4.63,
    seaLevelRiseCm: 10.9,
    annualEmissionsGt: 35.5,
    headline: 'The Paris Climate Accord',
    keyEvents: '196 nations agree to pursue efforts to limit temperature increases to 1.5°C above pre-industrial levels; 400 ppm threshold permanently crossed.',
    isProjected: false
  },
  {
    year: 2026,
    co2Ppm: 426.5,
    tempAnomaly: 1.48,
    seaIceExtentMkm2: 4.05,
    seaLevelRiseCm: 15.2,
    annualEmissionsGt: 37.4,
    headline: 'Consecutive Record-Breaking Heat Anomaly',
    keyEvents: 'Copernicus records world first 12-month period exceeding 1.5°C; simultaneous ocean and atmospheric heat domes.',
    isProjected: false
  },
  {
    year: 2035,
    co2Ppm: 448.0,
    tempAnomaly: 1.82,
    seaIceExtentMkm2: 2.80,
    seaLevelRiseCm: 21.0,
    annualEmissionsGt: 33.1,
    headline: 'Ice-Free Arctic Summers & Water Crisis',
    keyEvents: 'Projected: Near-total seasonal loss of Arctic sea ice; extreme heat stress regularly surpasses human wet-bulb tolerance across the tropics.',
    isProjected: true
  },
  {
    year: 2050,
    co2Ppm: 482.0,
    tempAnomaly: 2.35,
    seaIceExtentMkm2: 1.10,
    seaLevelRiseCm: 32.5,
    annualEmissionsGt: 24.5,
    headline: 'Critical Tipping Point Cascade',
    keyEvents: 'Projected: Amazon savannization self-propagates; permanent coastal retreat in low-lying deltas displacing 200M+ environmental refugees.',
    isProjected: true
  }
];
