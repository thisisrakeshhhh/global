export interface TimelineMilestone {
  year: number;
  label: string;
  eraTitle: string;
  co2Ppm: number;
  co2Source: string;
  tempAnomaly: number; // in °C vs 1850-1900 baseline
  tempSource: string;
  seaIceExtentMkm2: number | null; // null if prior to continuous satellite era (1979)
  seaIceProvenance: string;
  seaLevelRiseCm: number;
  annualEmissionsGt: number;
  headline: string;
  scientificNarrative: string;
  keyEvents: string;
  isProjected: boolean;
  observationalProvenance: {
    hasInstrumentalTemp: boolean;
    hasInSituCO2: boolean;
    hasSatelliteSeaIce: boolean;
  };
  citation: string;
}

export const TIMELINE_DATA: TimelineMilestone[] = [
  {
    year: 1850,
    label: '1850 Baseline',
    eraTitle: 'Pre-Industrial Reference Era (1850–1900)',
    co2Ppm: 285.5,
    co2Source: 'Law Dome & EPICA Ice Core Proxies (Antarctica)',
    tempAnomaly: 0.00,
    tempSource: 'IPCC AR6 Pre-Industrial Baseline Reference (1850–1900)',
    seaIceExtentMkm2: null,
    seaIceProvenance: 'No continuous satellite record before Nov 1979',
    seaLevelRiseCm: 0.0,
    annualEmissionsGt: 0.2,
    headline: 'Pre-Industrial Equilibrium',
    scientificNarrative: 'Before the large-scale expansion of coal-fired steam engines and mechanized industry, atmospheric carbon dioxide remained balanced around 280–285 ppm. Global mean surface temperature was in approximate equilibrium with solar and volcanic radiative forcings.',
    keyEvents: 'Atmospheric CO₂ ~285 ppm; early Industrial Revolution localized in Western Europe; global energy systems almost entirely biomass-based.',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: false,
      hasInSituCO2: false,
      hasSatelliteSeaIce: false
    },
    citation: 'IPCC AR6 WG1 Chapter 2; Etheridge et al. (Law Dome ice core record)'
  },
  {
    year: 1880,
    label: '1880 Record Begins',
    eraTitle: 'Instrumental Temperature Record Genesis',
    co2Ppm: 290.8,
    co2Source: 'Law Dome Ice Core (CSIRO / NOAA Paleoclimatology)',
    tempAnomaly: -0.16,
    tempSource: 'NASA GISTEMP v4 & Hadley Centre HadCRUT5 (Instrumental)',
    seaIceExtentMkm2: null,
    seaIceProvenance: 'No continuous satellite record before Nov 1979',
    seaLevelRiseCm: 0.8,
    annualEmissionsGt: 0.9,
    headline: 'Standardized Weather Station Networks Emerge',
    scientificNarrative: 'The year 1880 marks the start of the continuous global instrumental surface temperature record maintained by NASA GISS and NOAA NCEI. Thermometer coverage reached sufficient geographic density across land and merchant shipping routes to compute reliable hemispheric anomalies.',
    keyEvents: 'NASA GISTEMP instrumental surface temperature record begins; rapid expansion of coal-powered global rail and ocean shipping networks.',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: true,
      hasInSituCO2: false,
      hasSatelliteSeaIce: false
    },
    citation: 'NASA Goddard Institute for Space Studies (GISTEMP v4); Lenssen et al. (2019)'
  },
  {
    year: 1958,
    label: '1958 Keeling Curve',
    eraTitle: 'Direct In-Situ Atmospheric Monitoring Genesis',
    co2Ppm: 315.7,
    co2Source: 'NOAA Global Monitoring Laboratory & Scripps (Mauna Loa Observatory)',
    tempAnomaly: 0.07,
    tempSource: 'NASA GISTEMP v4 & Copernicus ERA5 Reanalysis',
    seaIceExtentMkm2: null,
    seaIceProvenance: 'No continuous satellite record before Nov 1979',
    seaLevelRiseCm: 3.5,
    annualEmissionsGt: 8.5,
    headline: 'Charles David Keeling Begins In-Situ CO₂ Record',
    scientificNarrative: 'In March 1958, Charles David Keeling began continuous, high-precision in-situ spectroscopic measurements of atmospheric CO₂ atop Hawaii’s Mauna Loa volcano (3,397 m). For the first time, humanity observed the annual photosynthetic respiration cycle of the biosphere alongside relentless fossil-fuel accumulation.',
    keyEvents: 'International Geophysical Year (IGY 1957–1958); Keeling Curve begins at 315.7 ppm; post-WWII fossil fuel combustion accelerates exponentially.',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: true,
      hasInSituCO2: true,
      hasSatelliteSeaIce: false
    },
    citation: 'Keeling et al., Scripps Institution of Oceanography; NOAA Global Monitoring Laboratory'
  },
  {
    year: 1979,
    label: '1979 Satellite Era',
    eraTitle: 'Continuous Polar Satellite Cryosphere Monitoring',
    co2Ppm: 336.8,
    co2Source: 'NOAA Mauna Loa Observatory In-Situ Infrared Spectrometer',
    tempAnomaly: 0.22,
    tempSource: 'NASA GISTEMP v4 & ERA5 Reanalysis',
    seaIceExtentMkm2: 7.05,
    seaIceProvenance: 'NSIDC Sea Ice Index v3 (Nimbus-7 SMMR satellite microwave radiometer)',
    seaLevelRiseCm: 6.2,
    annualEmissionsGt: 19.4,
    headline: 'Spaceborne Cryosphere Surveillance Begins',
    scientificNarrative: 'With the launch of NASA’s Nimbus-7 satellite carrying the Scanning Multichannel Microwave Radiometer (SMMR), continuous, all-weather daily satellite observation of polar sea ice extent commenced. September 1979 Arctic ice extent averaged 7.05 million km², establishing the modern satellite baseline.',
    keyEvents: 'First World Climate Conference in Geneva; continuous polar satellite passive microwave monitoring begins (NSIDC); Charney Report calculates climate sensitivity.',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: true,
      hasInSituCO2: true,
      hasSatelliteSeaIce: true
    },
    citation: 'National Snow and Ice Data Center (NSIDC Sea Ice Index v3); Fetterer et al. (2017)'
  },
  {
    year: 2000,
    label: '2000 Millennial Turn',
    eraTitle: 'Accelerating Global Warming & Oceanic Heat Uptake',
    co2Ppm: 369.7,
    co2Source: 'NOAA Mauna Loa Observatory',
    tempAnomaly: 0.45,
    tempSource: 'NASA GISTEMP v4',
    seaIceExtentMkm2: 6.25,
    seaIceProvenance: 'NSIDC Sea Ice Index v3 (DMSP SSM/I Satellite Series)',
    seaLevelRiseCm: 9.8,
    annualEmissionsGt: 25.5,
    headline: 'Emerging Anthropogenic Signal Across All Biospheric Indicators',
    scientificNarrative: 'By the turn of the millennium, anthropogenic radiative forcing had grown to overwhelm natural climate variability. Oceans absorbed over 90% of excess planetary heat energy, while Arctic sea ice thinning and seasonal coverage decline began accelerating.',
    keyEvents: 'Kyoto Protocol mechanisms developed; Argo robotic ocean float network begins global deployment; Arctic summer ice extent drops below 6.5M km².',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: true,
      hasInSituCO2: true,
      hasSatelliteSeaIce: true
    },
    citation: 'IPCC Third Assessment Report (TAR 2001); Hansen et al. (NASA GISS)'
  },
  {
    year: 2015,
    label: '2015 Paris Accord',
    eraTitle: 'The 400 ppm Threshold Permanently Surpassed',
    co2Ppm: 400.8,
    co2Source: 'NOAA Mauna Loa Observatory In-Situ Spectrometer',
    tempAnomaly: 0.94,
    tempSource: 'NASA GISTEMP v4 / Copernicus ERA5 Reanalysis',
    seaIceExtentMkm2: 4.63,
    seaIceProvenance: 'NSIDC Sea Ice Index v3 (DMSP SSMIS Satellite Series)',
    seaLevelRiseCm: 14.5,
    annualEmissionsGt: 35.5,
    headline: 'Global Commitment to 1.5°C & Permanent >400 ppm CO₂',
    scientificNarrative: 'In 2015, global atmospheric CO₂ concentrations crossed 400 ppm for the first time in over 3 million years (Pliocene Epoch). At COP21, 196 nations adopted the Paris Agreement, pledging to pursue efforts to limit the temperature increase to 1.5°C above pre-industrial levels.',
    keyEvents: 'Paris Climate Agreement signed; 400 ppm CO₂ milestone permanently exceeded; severe multi-basin coral bleaching event (2014–2017).',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: true,
      hasInSituCO2: true,
      hasSatelliteSeaIce: true
    },
    citation: 'UNFCCC Paris Agreement (2015); Betts et al., Nature Climate Change (2016)'
  },
  {
    year: 2026,
    label: 'Present (2026)',
    eraTitle: 'Multi-Instrument Contemporary Observation',
    co2Ppm: 429.12,
    co2Source: 'NOAA Mauna Loa Observatory (Jul 2026 Preliminary In-Situ)',
    tempAnomaly: 1.45,
    tempSource: 'Copernicus Climate Change Service / ERA5 & NASA GISTEMP (12-Mo Mean vs 1850–1900)',
    seaIceExtentMkm2: 4.05,
    seaIceProvenance: 'NSIDC Sea Ice Index v3 (Satellite Multi-Sensor Analysis)',
    seaLevelRiseCm: 19.8,
    annualEmissionsGt: 37.4,
    headline: 'Consecutive Multi-Month 1.5°C Threshold Exceedance',
    scientificNarrative: 'Global multi-instrument reanalysis confirms 12-month mean surface temperatures fluctuating within ~1.40°C–1.50°C above the 1850–1900 pre-industrial baseline. Ocean heat content and sea-surface temperatures set all-time instrumented records across the North Atlantic and Pacific.',
    keyEvents: 'Copernicus ERA5 records unprecedented sea-surface heat anomalies; NASA FIRMS detects pan-boreal and tropical fire spikes; atmospheric CO₂ touches 429+ ppm.',
    isProjected: false,
    observationalProvenance: {
      hasInstrumentalTemp: true,
      hasInSituCO2: true,
      hasSatelliteSeaIce: true
    },
    citation: 'Copernicus Climate Change Service (ERA5); NOAA Global Monitoring Laboratory (Jul 2026); NASA FIRMS'
  },
  {
    year: 2035,
    label: '2035 (IPCC SSP2-4.5)',
    eraTitle: 'Near-Term Projection: Middle of the Road Scenario',
    co2Ppm: 452.0,
    co2Source: 'IPCC AR6 CMIP6 Multi-Model Ensemble Median (SSP2-4.5)',
    tempAnomaly: 1.72,
    tempSource: 'IPCC AR6 Working Group 1 Assessment (SSP2-4.5)',
    seaIceExtentMkm2: 2.80,
    seaIceProvenance: 'CMIP6 Cryosphere Projection (Median Ice-Free Summer Window)',
    seaLevelRiseCm: 25.4,
    annualEmissionsGt: 35.0,
    headline: 'Projected: Near-Total Loss of Multi-Year Arctic Sea Ice',
    scientificNarrative: 'Under the intermediate SSP2-4.5 trajectory where current emissions trajectories slowly plateau, summer Arctic sea ice extent is projected to regularly fall below 1.0 million km² ("practically ice-free"). Extreme heat events that occurred once every 50 years in the pre-industrial climate occur roughly 9 times as often.',
    keyEvents: 'Projected: First practically ice-free Arctic summer (extent <1M km²); severe wet-bulb heat stress regularly affects over 500 million tropical citizens.',
    isProjected: true,
    observationalProvenance: {
      hasInstrumentalTemp: false,
      hasInSituCO2: false,
      hasSatelliteSeaIce: false
    },
    citation: 'IPCC AR6 WG1 Summary for Policymakers; CMIP6 ScenarioMIP'
  },
  {
    year: 2050,
    label: '2050 (IPCC SSP2-4.5)',
    eraTitle: 'Mid-Century Thresholds & Tipping Cascades',
    co2Ppm: 485.0,
    co2Source: 'IPCC AR6 CMIP6 Model Ensemble (SSP2-4.5)',
    tempAnomaly: 2.15,
    tempSource: 'IPCC AR6 WG1 Assessment (SSP2-4.5)',
    seaIceExtentMkm2: 1.20,
    seaIceProvenance: 'CMIP6 Cryosphere Projection',
    seaLevelRiseCm: 35.8,
    annualEmissionsGt: 28.0,
    headline: 'Projected: Severe Multi-System Planetary Strain',
    scientificNarrative: 'Projected climate state if global net-zero targets remain delayed until after mid-century. At +2.0°C to +2.2°C above pre-industrial levels, over 99% of warm-water coral reefs experience irreversible mortality, and regional Amazon dieback risks entering self-sustaining savannization.',
    keyEvents: 'Projected: >99% coral reef degradation; Amazon southeastern basin transition; permanent coastal displacement across low-lying river deltas.',
    isProjected: true,
    observationalProvenance: {
      hasInstrumentalTemp: false,
      hasInSituCO2: false,
      hasSatelliteSeaIce: false
    },
    citation: 'IPCC AR6 WG2 Impacts, Adaptation and Vulnerability; Lenton et al. (Tipping Elements)'
  }
];

export function getMilestoneByYear(year: number): TimelineMilestone {
  const found = TIMELINE_DATA.find(m => m.year === year);
  if (found) return found;
  // Return closest
  return TIMELINE_DATA.reduce((prev, curr) => 
    Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev
  );
}
