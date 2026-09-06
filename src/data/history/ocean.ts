/**
 * Global Sea Surface Temperature (SST) Anomaly Record (1854–2026)
 *
 * Source: NOAA Extended Reconstructed Sea Surface Temperature (ERSST v5)
 * Maintained by: NOAA National Centers for Environmental Information (NCEI)
 * Baseline: 1971–2000 climatological mean
 * Reference: Huang, B., et al. (2017). "Extended Reconstructed Sea Surface Temperature,
 *            Version 5 (ERSSTv5): Upgrades to the Monthly and Run-time Datasets."
 *            Journal of Climate, 30(20), 8179–8205.
 *
 * Note: ERSST v5 measures surface skin/bucket/engine-intake water temperatures across the global ocean.
 * It is strictly distinct from subsurface Ocean Heat Content (0–2000m thermal energy in ZJ).
 */

export interface OceanDataPoint {
  year: number;
  sstAnomaly: number; // °C relative to 1971–2000 climatology
  uncertainty: number; // ±°C 95% confidence interval
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
  { year: 1955, sstAnomaly: -0.15, uncertainty: 0.07, source: 'NOAA ERSST v5' },
  { year: 1960, sstAnomaly: -0.06, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1965, sstAnomaly: -0.12, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1970, sstAnomaly: -0.04, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1975, sstAnomaly: -0.11, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 1980, sstAnomaly: 0.11, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1985, sstAnomaly: 0.04, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1990, sstAnomaly: 0.22, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1995, sstAnomaly: 0.26, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 1998, sstAnomaly: 0.44, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2000, sstAnomaly: 0.28, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2005, sstAnomaly: 0.41, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2010, sstAnomaly: 0.48, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2015, sstAnomaly: 0.65, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2016, sstAnomaly: 0.72, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2017, sstAnomaly: 0.61, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2018, sstAnomaly: 0.58, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2019, sstAnomaly: 0.68, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2020, sstAnomaly: 0.69, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2021, sstAnomaly: 0.59, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2022, sstAnomaly: 0.62, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2023, sstAnomaly: 0.88, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2024, sstAnomaly: 0.94, uncertainty: 0.05, source: 'NOAA ERSST v5' },
  { year: 2025, sstAnomaly: 0.89, uncertainty: 0.06, source: 'NOAA ERSST v5' },
  { year: 2026, sstAnomaly: 0.91, uncertainty: 0.06, source: 'NOAA ERSST v5' }
];
