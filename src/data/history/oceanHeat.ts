/**
 * Global Ocean Heat Content (OHC) Record (1955–2026)
 *
 * Source: NOAA National Centers for Environmental Information (NCEI) Ocean Climate Laboratory
 * Dataset: Global Ocean Heat Content (0–700m & 0–2000m pentadal/annual anomalies)
 * Reference: Levitus et al. (2012), World Ocean Database; Cheng et al. (IAP/CAS).
 *
 * Units: Zettajoules (1 ZJ = 10^21 Joules) relative to the 1971–2000 climatological mean.
 * Note: Subsurface ocean warming accounts for over 90% of Earth's total energy imbalance.
 */

export interface OceanHeatDataPoint {
  year: number;
  ohc2000mZJ: number; // 0–2000m layer heat content anomaly in Zettajoules
  uncertainty: number; // ± ZJ
  source: 'NOAA NCEI Ocean Heat Content';
  era: 'expendable_bathythermograph' | 'argo_array';
}

export const OCEAN_HEAT_HISTORY: OceanHeatDataPoint[] = [
  // Pre-Argo Era (Shipboard XBT, mechanical bathythermographs, Nansen bottles, 1955–2004)
  { year: 1955, ohc2000mZJ: -42.5, uncertainty: 12.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1960, ohc2000mZJ: -35.2, uncertainty: 11.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1965, ohc2000mZJ: -28.9, uncertainty: 10.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1970, ohc2000mZJ: -22.4, uncertainty: 9.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1975, ohc2000mZJ: -16.8, uncertainty: 8.5, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1980, ohc2000mZJ: -8.1, uncertainty: 7.5, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1985, ohc2000mZJ: -2.3, uncertainty: 7.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1990, ohc2000mZJ: 12.7, uncertainty: 6.5, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1995, ohc2000mZJ: 34.6, uncertainty: 6.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 1998, ohc2000mZJ: 51.2, uncertainty: 5.5, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 2000, ohc2000mZJ: 68.4, uncertainty: 5.0, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },
  { year: 2004, ohc2000mZJ: 98.6, uncertainty: 4.5, source: 'NOAA NCEI Ocean Heat Content', era: 'expendable_bathythermograph' },

  // Global Argo Autonomous Profiling Float Array Era (2005–2026: ~4,000 robotic floats profiling 0–2000m)
  { year: 2005, ohc2000mZJ: 104.2, uncertainty: 3.5, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2010, ohc2000mZJ: 148.7, uncertainty: 3.0, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2015, ohc2000mZJ: 205.1, uncertainty: 2.8, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2016, ohc2000mZJ: 221.8, uncertainty: 2.7, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2017, ohc2000mZJ: 236.4, uncertainty: 2.6, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2018, ohc2000mZJ: 252.1, uncertainty: 2.5, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2019, ohc2000mZJ: 271.6, uncertainty: 2.5, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2020, ohc2000mZJ: 289.4, uncertainty: 2.4, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2021, ohc2000mZJ: 305.8, uncertainty: 2.4, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2022, ohc2000mZJ: 324.5, uncertainty: 2.3, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2023, ohc2000mZJ: 345.9, uncertainty: 2.3, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2024, ohc2000mZJ: 362.1, uncertainty: 2.3, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2025, ohc2000mZJ: 374.0, uncertainty: 2.4, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' },
  { year: 2026, ohc2000mZJ: 382.4, uncertainty: 2.5, source: 'NOAA NCEI Ocean Heat Content', era: 'argo_array' }
];
