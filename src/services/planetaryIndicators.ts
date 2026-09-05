export interface PlanetaryVitalSign {
  id: string;
  label: string;
  value: string;
  unit: string;
  anomaly?: string;
  trend: 'rising' | 'declining' | 'critical';
  sourceInstitution: string;
  citation: string;
  lastUpdatedUTC: string;
  significance: string;
}

export const PLANETARY_VITAL_SIGNS: PlanetaryVitalSign[] = [
  {
    id: 'co2',
    label: 'Atmospheric CO₂',
    value: '426.9',
    unit: 'ppm',
    anomaly: '+2.4 ppm/yr',
    trend: 'rising',
    sourceInstitution: 'NOAA Global Monitoring Laboratory',
    citation: 'Mauna Loa Observatory in-situ infrared spectrophotometry (2024–2026)',
    lastUpdatedUTC: 'Updated daily at 00:00 UTC',
    significance: 'Pre-industrial baseline was ~280 ppm. Highest atmospheric concentration in over 3 million years (Pliocene Epoch).'
  },
  {
    id: 'temperature',
    label: 'Global Mean Surface Anomaly',
    value: '+1.48',
    unit: '°C',
    anomaly: '0.02°C from 1.50°C Paris Threshold',
    trend: 'critical',
    sourceInstitution: 'Copernicus Climate Change Service (C3S) / ECMWF',
    citation: 'ERA5 Global Atmospheric Reanalysis vs 1850–1900 Pre-industrial Baseline',
    lastUpdatedUTC: 'Monthly ERA5 consensus release',
    significance: 'First 12-month period in recorded human history consistently hovering at the 1.5°C Paris Agreement warming threshold.'
  },
  {
    id: 'ocean_heat',
    label: 'Global Ocean Sea Surface Temp',
    value: '21.12',
    unit: '°C',
    anomaly: '+0.85°C above 1982–2011 mean',
    trend: 'critical',
    sourceInstitution: 'NOAA Coral Reef Watch / OISST v2.1',
    citation: 'Optimum Interpolation Sea Surface Temperature satellite & drifter buoy array',
    lastUpdatedUTC: 'Daily 24h satellite blend',
    significance: 'Oceans absorb 90% of Earth excess greenhouse heat; sustained record warmth drives global coral bleaching and super-cyclones.'
  },
  {
    id: 'sea_ice',
    label: 'Arctic Summer Sea Ice Extent',
    value: '4.08',
    unit: 'M km²',
    anomaly: '-1.85M km² below 1981–2010 median',
    trend: 'declining',
    sourceInstitution: 'National Snow and Ice Data Center (NSIDC)',
    citation: 'DMSP SSMIS / AMSR2 passive microwave satellite radiometers',
    lastUpdatedUTC: 'Daily NSIDC Sea Ice Index',
    significance: 'Arctic is warming nearly 4x faster than the global average (Arctic Amplification), shedding multi-year reflective sea ice.'
  }
];
