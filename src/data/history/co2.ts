/**
 * Atmospheric Carbon Dioxide (CO₂) Historical Record (1850–2026)
 *
 * Sources:
 * 1. Law Dome DE08 & DSS Ice Core Proxies (1850–1957) - CSIRO / NOAA Paleoclimatology
 * 2. NOAA Global Monitoring Laboratory & Scripps CO2 Program (Mauna Loa Observatory, 1958–2026)
 * Continuous in-situ spectroscopic measurements began March 1958 atop Mauna Loa, Hawaii.
 */

export interface CO2DataPoint {
  year: number;
  ppm: number;
  source: 'Law Dome Ice Core' | 'NOAA Mauna Loa Observatory';
  era: 'ice_core' | 'in_situ';
  uncertainty: number; // ± ppm
}

export const CO2_HISTORY: CO2DataPoint[] = [
  // Law Dome Ice Core Proxy Era (1850–1957)
  { year: 1850, ppm: 285.5, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1860, ppm: 286.8, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1870, ppm: 288.4, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1880, ppm: 290.8, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1890, ppm: 294.2, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1900, ppm: 296.1, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1910, ppm: 300.1, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1920, ppm: 303.4, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1930, ppm: 307.2, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1940, ppm: 310.3, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1950, ppm: 311.3, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1955, ppm: 313.8, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },
  { year: 1957, ppm: 315.0, source: 'Law Dome Ice Core', era: 'ice_core', uncertainty: 1.2 },

  // Continuous In-Situ Atmospheric Monitoring Genesis (1958–2026)
  { year: 1958, ppm: 315.71, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1959, ppm: 315.98, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1960, ppm: 316.91, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1961, ppm: 317.64, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1962, ppm: 318.45, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1963, ppm: 318.99, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1964, ppm: 319.62, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1965, ppm: 320.04, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1966, ppm: 321.37, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1967, ppm: 322.18, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1968, ppm: 323.05, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1969, ppm: 324.62, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1970, ppm: 325.68, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1971, ppm: 326.32, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1972, ppm: 327.46, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1973, ppm: 329.68, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1974, ppm: 330.19, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1975, ppm: 331.12, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1976, ppm: 332.03, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1977, ppm: 333.84, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1978, ppm: 335.41, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1979, ppm: 336.84, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1980, ppm: 338.76, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1981, ppm: 340.12, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1982, ppm: 341.48, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1983, ppm: 343.15, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1984, ppm: 344.87, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1985, ppm: 346.35, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1986, ppm: 347.61, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1987, ppm: 349.31, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1988, ppm: 351.69, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1989, ppm: 353.20, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1990, ppm: 354.45, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1991, ppm: 355.70, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1992, ppm: 356.54, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1993, ppm: 357.21, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1994, ppm: 358.96, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1995, ppm: 360.97, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1996, ppm: 362.74, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1997, ppm: 363.88, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1998, ppm: 366.84, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 1999, ppm: 368.51, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2000, ppm: 369.71, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2001, ppm: 371.32, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2002, ppm: 373.45, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2003, ppm: 375.98, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2004, ppm: 377.70, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2005, ppm: 379.98, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2006, ppm: 382.09, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2007, ppm: 384.02, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2008, ppm: 385.83, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2009, ppm: 387.64, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2010, ppm: 390.10, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2011, ppm: 391.85, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2012, ppm: 394.06, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2013, ppm: 396.74, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2014, ppm: 398.87, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2015, ppm: 401.01, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2016, ppm: 404.41, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2017, ppm: 406.76, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2018, ppm: 408.72, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2019, ppm: 411.66, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2020, ppm: 414.24, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2021, ppm: 416.45, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2022, ppm: 418.56, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2023, ppm: 421.08, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2024, ppm: 424.20, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2025, ppm: 426.85, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.12 },
  { year: 2026, ppm: 429.12, source: 'NOAA Mauna Loa Observatory', era: 'in_situ', uncertainty: 0.15 }
];
