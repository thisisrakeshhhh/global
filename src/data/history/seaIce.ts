/**
 * Arctic & Antarctic Sea Ice Extent Historical Record (1850–2026)
 *
 * Sources:
 * 1. Historical Reconstruction (1850–1978): Walsh et al. (2017) Gridded Monthly Sea Ice Extent,
 *    derived from ship logbooks, aerial surveys, and early meteorological stations.
 * 2. Continuous Satellite Passive-Microwave Era (1979–2026): National Snow and Ice Data Center (NSIDC) /
 *    NASA SMMR and DMSP SSM/I-SSMIS sensors.
 *
 * Units: Million square kilometers (million km²)
 * September Arctic Minimum represents the annual post-summer trough.
 */

export interface SeaIceDataPoint {
  year: number;
  arcticMinMkm2: number; // September Arctic minimum extent
  arcticMaxMkm2: number; // March Arctic maximum extent
  antarcticMinMkm2?: number; // February Antarctic minimum extent
  antarcticMaxMkm2?: number; // September Antarctic maximum extent
  era: 'reconstruction' | 'satellite';
  source: 'Walsh et al. Historical Sea Ice' | 'NSIDC Sea Ice Index v3';
  uncertainty: number; // ± million km²
}

export const SEA_ICE_HISTORY: SeaIceDataPoint[] = [
  // Historical Reconstruction Era (1850–1978) - Walsh et al.
  { year: 1850, arcticMinMkm2: 8.5, arcticMaxMkm2: 15.8, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.8 },
  { year: 1870, arcticMinMkm2: 8.4, arcticMaxMkm2: 15.7, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.7 },
  { year: 1890, arcticMinMkm2: 8.3, arcticMaxMkm2: 15.6, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.7 },
  { year: 1910, arcticMinMkm2: 8.2, arcticMaxMkm2: 15.6, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.6 },
  { year: 1930, arcticMinMkm2: 8.0, arcticMaxMkm2: 15.4, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.6 },
  { year: 1950, arcticMinMkm2: 7.9, arcticMaxMkm2: 15.5, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.5 },
  { year: 1960, arcticMinMkm2: 7.8, arcticMaxMkm2: 15.5, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.4 },
  { year: 1970, arcticMinMkm2: 7.6, arcticMaxMkm2: 15.6, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.3 },
  { year: 1975, arcticMinMkm2: 7.4, arcticMaxMkm2: 15.4, era: 'reconstruction', source: 'Walsh et al. Historical Sea Ice', uncertainty: 0.3 },

  // Continuous Satellite Microwave Radiometry Era (1979–2026) - NSIDC / NASA
  { year: 1979, arcticMinMkm2: 7.05, arcticMaxMkm2: 16.45, antarcticMinMkm2: 2.91, antarcticMaxMkm2: 18.42, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 1980, arcticMinMkm2: 7.67, arcticMaxMkm2: 16.13, antarcticMinMkm2: 2.82, antarcticMaxMkm2: 18.63, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 1985, arcticMinMkm2: 6.70, arcticMaxMkm2: 16.14, antarcticMinMkm2: 2.81, antarcticMaxMkm2: 18.71, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 1990, arcticMinMkm2: 6.14, arcticMaxMkm2: 15.98, antarcticMinMkm2: 2.94, antarcticMaxMkm2: 18.65, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 1995, arcticMinMkm2: 6.08, arcticMaxMkm2: 15.38, antarcticMinMkm2: 3.12, antarcticMaxMkm2: 18.82, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2000, arcticMinMkm2: 6.25, arcticMaxMkm2: 15.34, antarcticMinMkm2: 2.89, antarcticMaxMkm2: 18.96, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2005, arcticMinMkm2: 5.50, arcticMaxMkm2: 14.86, antarcticMinMkm2: 2.96, antarcticMaxMkm2: 19.04, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2007, arcticMinMkm2: 4.27, arcticMaxMkm2: 14.71, antarcticMinMkm2: 2.87, antarcticMaxMkm2: 19.18, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2010, arcticMinMkm2: 4.87, arcticMaxMkm2: 15.25, antarcticMinMkm2: 2.99, antarcticMaxMkm2: 19.16, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2012, arcticMinMkm2: 3.39, arcticMaxMkm2: 15.24, antarcticMinMkm2: 3.57, antarcticMaxMkm2: 19.44, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2015, arcticMinMkm2: 4.41, arcticMaxMkm2: 14.39, antarcticMinMkm2: 3.58, antarcticMaxMkm2: 18.83, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2016, arcticMinMkm2: 4.14, arcticMaxMkm2: 14.52, antarcticMinMkm2: 2.63, antarcticMaxMkm2: 18.51, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2017, arcticMinMkm2: 4.63, arcticMaxMkm2: 14.42, antarcticMinMkm2: 2.11, antarcticMaxMkm2: 18.03, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2018, arcticMinMkm2: 4.59, arcticMaxMkm2: 14.48, antarcticMinMkm2: 2.18, antarcticMaxMkm2: 18.15, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2019, arcticMinMkm2: 4.19, arcticMaxMkm2: 14.78, antarcticMinMkm2: 2.31, antarcticMaxMkm2: 18.40, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2020, arcticMinMkm2: 3.82, arcticMaxMkm2: 15.05, antarcticMinMkm2: 2.69, antarcticMaxMkm2: 18.95, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2021, arcticMinMkm2: 4.72, arcticMaxMkm2: 14.77, antarcticMinMkm2: 2.60, antarcticMaxMkm2: 18.75, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2022, arcticMinMkm2: 4.67, arcticMaxMkm2: 14.88, antarcticMinMkm2: 1.92, antarcticMaxMkm2: 18.19, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2023, arcticMinMkm2: 4.23, arcticMaxMkm2: 14.62, antarcticMinMkm2: 1.79, antarcticMaxMkm2: 16.96, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2024, arcticMinMkm2: 4.28, arcticMaxMkm2: 14.80, antarcticMinMkm2: 1.99, antarcticMaxMkm2: 17.15, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.05 },
  { year: 2025, arcticMinMkm2: 4.18, arcticMaxMkm2: 14.65, antarcticMinMkm2: 1.94, antarcticMaxMkm2: 17.05, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.06 },
  { year: 2026, arcticMinMkm2: 4.15, arcticMaxMkm2: 14.60, antarcticMinMkm2: 1.91, antarcticMaxMkm2: 16.98, era: 'satellite', source: 'NSIDC Sea Ice Index v3', uncertainty: 0.07 }
];
