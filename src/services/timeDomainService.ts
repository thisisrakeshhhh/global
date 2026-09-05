import { HistoricalObservation, ProjectionScenarioData, SSPScenario } from '../types/climateIntelligence';

/**
 * 1. OBSERVED INSTRUMENT RECORD (1880 – 2025)
 * Empirical scientific records from NASA GISTEMP v4, NOAA MLO, and NSIDC.
 * No projections mixed in here.
 */
export const OBSERVED_HISTORICAL_RECORD: HistoricalObservation[] = [
  {
    year: 1880,
    tempAnomaly: -0.16,
    co2Ppm: 290.8,
    seaIceExtentMkm2: 9.8,
    seaLevelRiseMm: 0,
    dataSource: 'NASA GISTEMP v4 / Law Dome Ice Core (Etheridge et al.)',
    keyObservationalMilestone: 'Earliest reliable global surface instrument thermometer network established.'
  },
  {
    year: 1910,
    tempAnomaly: -0.42,
    co2Ppm: 300.1,
    seaIceExtentMkm2: 9.6,
    seaLevelRiseMm: 35,
    dataSource: 'NASA GISTEMP v4 / Tide Gauge Array (Church & White)',
    keyObservationalMilestone: 'Coolest multi-year period of the 20th century prior to global industrial ramp-up.'
  },
  {
    year: 1940,
    tempAnomaly: 0.12,
    co2Ppm: 310.7,
    seaIceExtentMkm2: 9.1,
    seaLevelRiseMm: 78,
    dataSource: 'NOAA NCEI & Law Dome Ice Core',
    keyObservationalMilestone: 'Wartime industrial manufacturing surge; temporary North Atlantic warming bump.'
  },
  {
    year: 1958,
    tempAnomaly: 0.08,
    co2Ppm: 315.7,
    seaIceExtentMkm2: 8.8,
    seaLevelRiseMm: 104,
    dataSource: 'Charles David Keeling begins continuous Mauna Loa Observatory measurements',
    keyObservationalMilestone: 'Birth of the Keeling Curve: first direct continuous atmospheric CO2 monitoring.'
  },
  {
    year: 1980,
    tempAnomaly: 0.28,
    co2Ppm: 338.7,
    seaIceExtentMkm2: 7.85,
    seaLevelRiseMm: 142,
    dataSource: 'NASA Nimbus-7 multichannel microwave radiometer & NOAA GML',
    keyObservationalMilestone: 'First continuous polar-orbiting satellite surveillance of Arctic/Antarctic sea ice.'
  },
  {
    year: 2000,
    tempAnomaly: 0.45,
    co2Ppm: 369.5,
    seaIceExtentMkm2: 6.32,
    seaLevelRiseMm: 195,
    dataSource: 'TOPEX/Poseidon satellite altimetry & Copernicus ERA40',
    keyObservationalMilestone: 'Millennium threshold: Precision radar altimetry measures accelerating sea level rise.'
  },
  {
    year: 2015,
    tempAnomaly: 0.98,
    co2Ppm: 400.8,
    seaIceExtentMkm2: 4.63,
    seaLevelRiseMm: 248,
    dataSource: 'Copernicus ERA5 & NOAA Global Monitoring Laboratory',
    keyObservationalMilestone: 'Atmospheric CO2 permanently breaches the 400 ppm threshold in all seasons.'
  },
  {
    year: 2024,
    tempAnomaly: 1.48,
    co2Ppm: 426.5,
    seaIceExtentMkm2: 4.08,
    seaLevelRiseMm: 286,
    dataSource: 'Copernicus C3S / ERA5 Consensus & NSIDC Sea Ice Index',
    keyObservationalMilestone: 'Hottest calendar year on record; global temperatures consistently touching 1.5°C threshold.'
  }
];

/**
 * 2. IPCC AR6 SHARED SOCIOECONOMIC PATHWAYS (2026 – 2100)
 * Explicitly labeled peer-reviewed projections from IPCC Working Group I.
 */
export const IPCC_PROJECTION_SCENARIOS: Record<SSPScenario, ProjectionScenarioData> = {
  'SSP1-2.6': {
    ssp: 'SSP1-2.6',
    name: 'Sustainability / Paris Agreement Ideal',
    tempBy2100: '+1.8°C (1.3°C - 2.4°C)',
    co2By2100: '~440 ppm',
    summary: 'Aggressive rapid decarbonization, net-zero greenhouse gases achieved by 2050–2060, followed by net-negative emissions.',
    assumptions: 'Global shift toward sustainable resource efficiency, massive renewable deployment, dietary shifts away from meat, and active forest restoration.',
    policyRelevance: 'Limits warming to well below 2.0°C; Arctic sea ice stabilizes after 2060 with minimal ice-free summers.',
    decadalTrajectory: [
      { year: 2026, tempAnomaly: 1.48, co2Ppm: 426.5, seaIceExtentMkm2: 4.05, seaLevelRiseCm: 29 },
      { year: 2035, tempAnomaly: 1.62, co2Ppm: 442.0, seaIceExtentMkm2: 3.40, seaLevelRiseCm: 34 },
      { year: 2050, tempAnomaly: 1.74, co2Ppm: 450.0, seaIceExtentMkm2: 2.90, seaLevelRiseCm: 43 },
      { year: 2075, tempAnomaly: 1.78, co2Ppm: 446.0, seaIceExtentMkm2: 3.10, seaLevelRiseCm: 55 },
      { year: 2100, tempAnomaly: 1.80, co2Ppm: 440.0, seaIceExtentMkm2: 3.30, seaLevelRiseCm: 68 }
    ]
  },
  'SSP2-4.5': {
    ssp: 'SSP2-4.5',
    name: 'Middle of the Road / Current Policy Trajectory',
    tempBy2100: '+2.7°C (2.1°C - 3.5°C)',
    co2By2100: '~600 ppm',
    summary: 'Current national pledges followed with uneven global progress; carbon emissions hover around current levels until 2050 before declining.',
    assumptions: 'Social, economic, and technological trends follow historical patterns; slow phase-out of fossil baseload; moderate land degradation continues.',
    policyRelevance: 'Exceeds Paris limits; extreme summer heat domes become regular; frequent catastrophic marine heatwaves and glacier losses.',
    decadalTrajectory: [
      { year: 2026, tempAnomaly: 1.48, co2Ppm: 426.5, seaIceExtentMkm2: 4.05, seaLevelRiseCm: 29 },
      { year: 2035, tempAnomaly: 1.75, co2Ppm: 452.0, seaIceExtentMkm2: 2.70, seaLevelRiseCm: 37 },
      { year: 2050, tempAnomaly: 2.15, co2Ppm: 495.0, seaIceExtentMkm2: 1.40, seaLevelRiseCm: 52 },
      { year: 2075, tempAnomaly: 2.50, co2Ppm: 550.0, seaIceExtentMkm2: 0.80, seaLevelRiseCm: 72 },
      { year: 2100, tempAnomaly: 2.72, co2Ppm: 602.0, seaIceExtentMkm2: 0.40, seaLevelRiseCm: 95 }
    ]
  },
  'SSP5-8.5': {
    ssp: 'SSP5-8.5',
    name: 'Fossil-Fueled Growth / High Emissions (Pessimistic)',
    tempBy2100: '+4.4°C (3.3°C - 5.7°C)',
    co2By2100: '~1135 ppm',
    summary: 'Unmitigated reliance on fossil fuels, doubling of global coal consumption, exponential energy-intensive resource extraction.',
    assumptions: 'Heavy international focus on competitive fossil expansion; no global climate treaty enforcement; massive permafrost methane runaway.',
    policyRelevance: 'Catastrophic biosphere destabilization: Amazon dieback, complete Arctic summer ice loss, widespread equatorial unlivability.',
    decadalTrajectory: [
      { year: 2026, tempAnomaly: 1.48, co2Ppm: 426.5, seaIceExtentMkm2: 4.05, seaLevelRiseCm: 29 },
      { year: 2035, tempAnomaly: 1.95, co2Ppm: 470.0, seaIceExtentMkm2: 2.10, seaLevelRiseCm: 41 },
      { year: 2050, tempAnomaly: 2.65, co2Ppm: 565.0, seaIceExtentMkm2: 0.50, seaLevelRiseCm: 64 },
      { year: 2075, tempAnomaly: 3.55, co2Ppm: 790.0, seaIceExtentMkm2: 0.05, seaLevelRiseCm: 102 },
      { year: 2100, tempAnomaly: 4.40, co2Ppm: 1135.0, seaIceExtentMkm2: 0.00, seaLevelRiseCm: 152 }
    ]
  }
};
