/**
 * Global Sea Surface Temperature (SST) Anomaly & Ocean Heat Record (1854–2026)
 *
 * Source: NOAA Extended Reconstructed Sea Surface Temperature (ERSST v5)
 * Baseline: 1971–2000 climatological mean
 * Reference: Huang et al. (2017), Journal of Climate.
 */

export interface OceanDataPoint {
  year: number;
  sstAnomaly: number; // °C vs 1971–2000 climatology
  oceanHeatContentZJ?: number; // 0–2000m Ocean Heat Content in ZettaJoules (10^21 Joules) relative to 1955–2006
  uncertainty: number; // ±°C
  source: 'NOAA ERSST v5';
}

export const OCEAN_HISTORY: OceanDataPoint[] = [
  { year: 1854, sstAnomaly: -0.38, uncertainty: 0.18, source: 'NOAA ERSST v5' },
  { year: 1860, sstAnomaly: -0.34, uncertainty: 0.16, source: 'NOAA ERSST v5' },
  { year: 1870, sstAnomaly: -0.31, uncertainty: 0.15, source: 'NOAA ERSST v5' },
  { year: 1880, sstAnomaly: -0.32, uncertainty: 0.14, source: 'NOAA ERSST v5' },
  { year: 1890, sstAnomaly: -0.36, uncertainty: 0.13, source: 'NOAA ERSST v5' },
  { year: 1900, sstAnomaly: -0.22, uncertainty: 0.12, source: 'NOAA ERSST v5' },
  { year: 1910, sstAnomaly: -0.38, uncertainty: 0.11, source: 'NOAA ERSST v5' },
  { year: 1920, sstAnomaly: -0.28, uncertainty: 0.10, source: 'NOAA ERSST v5' },
  { year: 1930, sstAnomaly: -0.19, uncertainty: 0.09, source: 'NOAA ERSST v5' },
  { year: 1940, sstAnomaly: 0.02, uncertainty: 0.08, source: 'NOAA ERSST v5' },
  { year: 1950, sstAnomaly: -0.18, uncertainty: 0.07, source: 'NOAA ERSST v5' },
  { year: 1955, sstAnomaly: -0.15, oceanHeatContentZJ: -42.5, uncertainty: 0.07, source: 'NOAA ERSST v5' },
  { year: 1960, sstAnomaly: -0.06, oceanHeatContentZJ: -35.2, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1965, sstAnomaly: -0.12, oceanHeatContentZJ: -28.9, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1970, sstAnomaly: -0.04, oceanHeatContentZJ: -22.4, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1975, sstAnomaly: -0.11, oceanHeatContentZJ: -16.8, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1980, sstAnomaly: 0.11, oceanHeatContentZJ: -8.1, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1985, sstAnomaly: 0.04, oceanHeatContentZJ: -2.3, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1990, sstAnomaly: 0.22, oceanHeatContentZJ: 12.7, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1995, sstAnomaly: 0.26, oceanHeatContentZJ: 34.6, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1998, sstAnomaly: 0.44, oceanHeatContentZJ: 51.2, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2000, sstAnomaly: 0.28, oceanHeatContentZJ: 68.4, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2005, sstAnomaly: 0.41, oceanHeatContentZJ: 104.2, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2010, sstAnomaly: 0.48, oceanHeatContentZJ: 148.7, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2015, sstAnomaly: 0.65, oceanHeatContentZJ: 205.1, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2016, sstAnomaly: 0.72, oceanHeatContentZJ: 221.8, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2017, sstAnomaly: 0.61, oceanHeatContentZJ: 236.4, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2018, sstAnomaly: 0.58, oceanHeatContentZJ: 252.1, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2019, sstAnomaly: 0.68, oceanHeatContentZJ: 271.6, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2020, sstAnomaly: 0.69, oceanHeatContentZJ: 289.4, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2021, sstAnomaly: 0.59, oceanHeatContentZJ: 305.8, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2022, sstAnomaly: 0.62, oceanHeatContentZJ: 324.5, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2023, sstAnomaly: 0.88, oceanHeatContentZJ: 345.9, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2024, sstAnomaly: 0.94, oceanHeatContentZJ: 362.1, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2025, sstAnomaly: 0.89, oceanHeatContentZJ: 374.0, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 2026, sstAnomaly: 0.91, oceanHeatContentZJ: 382.4, uncertainty: 0.06, source: 'NOAA ERSST v5' }
];
