/**
 * Planetary Climate Story Milestones (1850–2026)
 *
 * Each milestone answers three fundamental questions:
 * 1. What changed on Earth?
 * 2. How do we know scientifically?
 * 3. What dataset / observational infrastructure records it?
 */

export interface ClimateStoryMilestone {
  year: number;
  label: string;
  eraTitle: string;
  theme: 'baseline' | 'industrial' | 'monitoring' | 'satellite' | 'acceleration' | 'tipping';
  whatHappened: string;
  howWeKnow: string;
  datasetEvidence: string;
  citation: string;
  keyIndicators: {
    tempAnomalyC: number;
    co2Ppm: number;
    oceanAnomalyC?: number;
    seaIceArcticMkm2?: number;
    seaLevelMm?: number;
  };
}

export const CLIMATE_STORY_MILESTONES: ClimateStoryMilestone[] = [
  {
    year: 1850,
    label: '1850 Baseline',
    eraTitle: 'Pre-Industrial Thermal Equilibrium',
    theme: 'baseline',
    whatHappened: 'Before large-scale fossil fuel combustion and industrial mechanization spread globally, planetary climate forcings were governed predominantly by subtle solar irradiance cycles and volcanic eruptions. Atmospheric carbon dioxide stood stable at ~285 ppm.',
    howWeKnow: 'Antarctic polar ice cores (such as Law Dome DE08 and Dome C) preserve microscopic fossilized air bubbles trapped as falling snow compacted into glacial ice centuries ago, providing an unadulterated chemical archive of ancient atmospheres.',
    datasetEvidence: 'Law Dome & EPICA Ice Core Gas Chemistry Archive (CSIRO / NOAA Paleoclimatology); IPCC AR6 Pre-Industrial Baseline Reference.',
    citation: 'Etheridge et al. (1996); IPCC AR6 Working Group I, Chapter 2.',
    keyIndicators: {
      tempAnomalyC: 0.00,
      co2Ppm: 285.5
    }
  },
  {
    year: 1880,
    label: '1880 Instrumental Genesis',
    eraTitle: 'Global Weather Station Networks Begin',
    theme: 'industrial',
    whatHappened: 'Coordinated land-surface meteorological stations and commercial maritime merchant shipping logbooks reached sufficient spatial distribution across the Northern and Southern Hemispheres to compute a continuous global surface temperature anomaly.',
    howWeKnow: 'Standardized thermometer shelters (Stevenson screens) and calibrated bucket sea surface measurements began systematic archiving across hundreds of certified weather bureaus globally.',
    datasetEvidence: 'NASA Goddard Institute for Space Studies Surface Temperature Analysis (GISTEMP v4) and Hadley Centre / UEA HadCRUT5.',
    citation: 'Lenssen et al. (2019), Journal of Geophysical Research: Atmospheres; Morice et al. (2021).',
    keyIndicators: {
      tempAnomalyC: -0.16,
      co2Ppm: 290.8,
      oceanAnomalyC: -0.32,
      seaLevelMm: -180.0
    }
  },
  {
    year: 1896,
    label: '1896 Greenhouse Physics',
    eraTitle: 'Svante Arrhenius Calculates Climate Sensitivity',
    theme: 'industrial',
    whatHappened: 'Swedish physicist and chemist Svante Arrhenius completed the first quantitative calculations of the Earth’s greenhouse effect, predicting that halving or doubling atmospheric carbonic acid (CO₂) would alter global surface temperatures by ~4°C to 5°C.',
    howWeKnow: 'Arrhenius combined infrared absorption laboratory measurements of carbonic acid conducted by Samuel Pierpont Langley and John Tyndall with astronomical observations of full-moon infrared radiation through Earth’s atmosphere.',
    datasetEvidence: 'Arrhenius (1896) Philosophical Magazine & Journal of Science; Langley infrared spectroscopic lunar bolometer experiments.',
    citation: 'Arrhenius, S. (1896). "On the Influence of Carbonic Acid in the Air upon the Temperature of the Ground", Phil. Mag. 41: 237–276.',
    keyIndicators: {
      tempAnomalyC: -0.11,
      co2Ppm: 295.0
    }
  },
  {
    year: 1958,
    label: '1958 Keeling Curve',
    eraTitle: 'Continuous In-Situ Atmospheric Monitoring Genesis',
    theme: 'monitoring',
    whatHappened: 'Charles David Keeling initiated continuous, ultra-precise in-situ infrared spectroscopic measurements of atmospheric carbon dioxide at the pristine altitude of Mauna Loa Observatory, Hawaii (3,397 m), establishing the longest direct instrumental greenhouse gas record.',
    howWeKnow: 'A dual-detector nondispersive infrared (NDIR) gas analyzer measured clean marine boundary layer air pumped into calibrated sample chambers, documenting both seasonal biosphere breathing and the relentless upward climb of fossil carbon.',
    datasetEvidence: 'Scripps CO2 Program (Scripps Institution of Oceanography) & NOAA Global Monitoring Laboratory (GML).',
    citation: 'Keeling, C. D. et al. (1976); NOAA Global Monitoring Laboratory Annual Carbon Summary.',
    keyIndicators: {
      tempAnomalyC: 0.07,
      co2Ppm: 315.71,
      oceanAnomalyC: -0.09,
      seaLevelMm: -65.0
    }
  },
  {
    year: 1979,
    label: '1979 Satellite Era Begins',
    eraTitle: 'Continuous Polar Cryosphere Observation',
    theme: 'satellite',
    whatHappened: 'NASA launched the Nimbus-7 satellite carrying the Scanning Multichannel Microwave Radiometer (SMMR), inaugurating the unbroken, daily satellite record of polar sea ice extent in both the Arctic and Antarctic oceans.',
    howWeKnow: 'Passive microwave radiometers detect thermal microwave emission from polar surfaces day and night through cloud cover, accurately calculating the surface fraction of open ocean versus sea ice at 25 km spatial resolution.',
    datasetEvidence: 'National Snow and Ice Data Center (NSIDC) Sea Ice Index v3; NASA Goddard SMMR / SSM/I-SSMIS sensor suite.',
    citation: 'Fetterer, F. et al. (2017). High-resolution passive microwave sea ice products, NSIDC; Parkinson & Cavalieri (2012).',
    keyIndicators: {
      tempAnomalyC: 0.16,
      co2Ppm: 336.84,
      oceanAnomalyC: 0.08,
      seaIceArcticMkm2: 7.05,
      seaLevelMm: -28.0
    }
  },
  {
    year: 1993,
    label: '1993 Satellite Altimetry',
    eraTitle: 'Millimeter-Precision Global Sea Level Tracking',
    theme: 'satellite',
    whatHappened: 'The joint US-French TOPEX/Poseidon satellite mission commenced continuous, millimeter-accuracy radar altimetry tracking of global sea surface height, replacing localized coastal tide gauges with total ocean basin coverage.',
    howWeKnow: 'Spaceborne radar pulses timed to picoseconds calculate the round-trip distance between the satellite orbit and the sea surface, revealing thermal expansion from ocean warming plus melting land ice mass loss.',
    datasetEvidence: 'NASA / CNES Ocean Surface Topography Missions (TOPEX/Poseidon, Jason-1/2/3, Sentinel-6 Michael Freilich).',
    citation: 'Beckley et al. (2017), Remote Sensing of Environment; Nerem et al. (2018), PNAS.',
    keyIndicators: {
      tempAnomalyC: 0.24,
      co2Ppm: 357.21,
      oceanAnomalyC: 0.21,
      seaIceArcticMkm2: 6.18,
      seaLevelMm: 0.0
    }
  },
  {
    year: 2015,
    label: '2015 Paris Accord & 400 PPM',
    eraTitle: 'Atmospheric CO₂ Breaches 400 PPM Milestone',
    theme: 'acceleration',
    whatHappened: 'Global mean atmospheric CO₂ permanently breached 400 parts per million across all global monitoring stations—levels unrecorded on Earth in over 3 million years (Pliocene Epoch). 196 nations adopted the Paris Agreement targeting well below 2.0°C.',
    howWeKnow: '120+ calibrated stations in the WMO Global Atmosphere Watch network recorded daily, weekly, and monthly CO₂ averages above 400 ppm, verified by airborne flask sampling and satellite spectrometers (OCO-2).',
    datasetEvidence: 'WMO Greenhouse Gas Bulletin; NOAA Global Greenhouse Gas Reference Network; NASA Orbiting Carbon Observatory 2.',
    citation: 'WMO Statement on the State of the Global Climate; Betts et al. (2016), Nature Climate Change.',
    keyIndicators: {
      tempAnomalyC: 0.90,
      co2Ppm: 401.01,
      oceanAnomalyC: 0.65,
      seaIceArcticMkm2: 4.41,
      seaLevelMm: 74.9
    }
  },
  {
    year: 2026,
    label: '2026 Present Record',
    eraTitle: 'Contemporary Instrumental Observation',
    theme: 'tipping',
    whatHappened: 'Global surface temperature averages exceed +1.3°C to +1.4°C above pre-industrial levels, driven by cumulative historical greenhouse emissions. Ocean heat content, atmospheric CO₂ (429 ppm), and sea levels all stand at recorded historical highs.',
    howWeKnow: 'A constellation of synchronized observational systems—thousands of autonomous Argo ocean profiling floats, NASA/Copernicus Sentinel satellites, and in-situ spectroscopic networks—continuously record Earth’s energy imbalance in real time.',
    datasetEvidence: 'Integrated Copernicus Climate Change Service (C3S ERA5), NASA GISTEMP v4, NOAA GML, NSIDC Sea Ice Index, NASA Altimetry.',
    citation: 'Copernicus Climate Change Service / ECMWF Global Climate Highlights; NASA GISS GISTEMP v4.',
    keyIndicators: {
      tempAnomalyC: 1.33,
      co2Ppm: 429.12,
      oceanAnomalyC: 0.91,
      seaIceArcticMkm2: 4.15,
      seaLevelMm: 124.5
    }
  }
];
