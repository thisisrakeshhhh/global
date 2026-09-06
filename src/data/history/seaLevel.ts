/**
 * Global Mean Sea Level (GMSL) Historical Record (1880–2026)
 *
 * Sources:
 * 1. Coastal & Island Tide Gauge Reconstruction (1880–1992): Church & White (2011),
 *    CSIRO Marine and Atmospheric Research. Baseline set to 1993–2008 average.
 * 2. Precision Satellite Radar Altimetry (1993–2026): NASA Goddard Space Flight Center /
 *    Copernicus Marine Service. Missions: TOPEX/Poseidon (1992–2006), Jason-1 (2001–2013),
 *    OSTM/Jason-2 (2008–2019), Jason-3 (2016–present), Sentinel-6 Michael Freilich (2020–present).
 *
 * Units: Millimeters (mm) relative to 1993 baseline (0 mm).
 * Rate of rise: ~1.7 mm/year (20th century average) -> ~4.4 mm/year (current satellite altimetry decade).
 */

export interface SeaLevelDataPoint {
  year: number;
  seaLevelMm: number; // Global mean sea level anomaly in mm
  rateMmPerYear: number;
  era: 'tide_gauge' | 'satellite_altimetry';
  source: 'Church & White Tide Gauge' | 'NASA / CNES Satellite Altimetry';
  uncertainty: number; // ± mm
}

export const SEA_LEVEL_HISTORY: SeaLevelDataPoint[] = [
  // Tide Gauge Reconstruction Era (1880–1992)
  { year: 1880, seaLevelMm: -180.0, rateMmPerYear: 1.1, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 12.0 },
  { year: 1890, seaLevelMm: -168.0, rateMmPerYear: 1.2, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 11.0 },
  { year: 1900, seaLevelMm: -155.0, rateMmPerYear: 1.3, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 10.0 },
  { year: 1910, seaLevelMm: -142.0, rateMmPerYear: 1.4, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 9.0 },
  { year: 1920, seaLevelMm: -128.0, rateMmPerYear: 1.5, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 8.0 },
  { year: 1930, seaLevelMm: -112.0, rateMmPerYear: 1.6, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 7.5 },
  { year: 1940, seaLevelMm: -94.0, rateMmPerYear: 1.7, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 7.0 },
  { year: 1950, seaLevelMm: -78.0, rateMmPerYear: 1.7, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 6.5 },
  { year: 1960, seaLevelMm: -61.0, rateMmPerYear: 1.8, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 6.0 },
  { year: 1970, seaLevelMm: -43.0, rateMmPerYear: 1.9, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 5.5 },
  { year: 1980, seaLevelMm: -25.0, rateMmPerYear: 2.0, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 5.0 },
  { year: 1985, seaLevelMm: -15.0, rateMmPerYear: 2.1, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 4.8 },
  { year: 1990, seaLevelMm: -5.0, rateMmPerYear: 2.2, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 4.5 },
  { year: 1992, seaLevelMm: -1.5, rateMmPerYear: 2.3, era: 'tide_gauge', source: 'Church & White Tide Gauge', uncertainty: 4.2 },

  // Precision Satellite Radar Altimetry Era (1993–2026)
  { year: 1993, seaLevelMm: 0.0, rateMmPerYear: 2.4, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 2.5 },
  { year: 1995, seaLevelMm: 5.4, rateMmPerYear: 2.6, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 2.3 },
  { year: 1997, seaLevelMm: 12.8, rateMmPerYear: 2.7, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 2.2 },
  { year: 1999, seaLevelMm: 18.2, rateMmPerYear: 2.8, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 2.0 },
  { year: 2001, seaLevelMm: 24.1, rateMmPerYear: 2.9, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.9 },
  { year: 2003, seaLevelMm: 30.5, rateMmPerYear: 3.0, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.8 },
  { year: 2005, seaLevelMm: 37.4, rateMmPerYear: 3.1, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.8 },
  { year: 2007, seaLevelMm: 43.8, rateMmPerYear: 3.2, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.7 },
  { year: 2009, seaLevelMm: 51.0, rateMmPerYear: 3.4, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.7 },
  { year: 2011, seaLevelMm: 54.2, rateMmPerYear: 3.5, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.6 },
  { year: 2013, seaLevelMm: 64.7, rateMmPerYear: 3.7, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.6 },
  { year: 2015, seaLevelMm: 74.9, rateMmPerYear: 3.9, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.5 },
  { year: 2017, seaLevelMm: 82.3, rateMmPerYear: 4.0, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.5 },
  { year: 2019, seaLevelMm: 92.1, rateMmPerYear: 4.2, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.5 },
  { year: 2021, seaLevelMm: 100.8, rateMmPerYear: 4.3, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.4 },
  { year: 2023, seaLevelMm: 111.4, rateMmPerYear: 4.4, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.4 },
  { year: 2024, seaLevelMm: 115.8, rateMmPerYear: 4.5, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.4 },
  { year: 2025, seaLevelMm: 120.2, rateMmPerYear: 4.5, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.5 },
  { year: 2026, seaLevelMm: 124.5, rateMmPerYear: 4.6, era: 'satellite_altimetry', source: 'NASA / CNES Satellite Altimetry', uncertainty: 1.6 }
];
