import { TEMPERATURE_HISTORY, TemperatureDataPoint } from '../data/history/temperature';
import { CO2_HISTORY, CO2DataPoint } from '../data/history/co2';
import { OCEAN_HISTORY, OceanDataPoint } from '../data/history/ocean';
import { OCEAN_HEAT_HISTORY, OceanHeatDataPoint } from '../data/history/oceanHeat';
import { SEA_ICE_HISTORY, SeaIceDataPoint } from '../data/history/seaIce';
import { SEA_LEVEL_HISTORY, SeaLevelDataPoint } from '../data/history/seaLevel';
import { CLIMATE_STORY_MILESTONES, ClimateStoryMilestone } from '../data/history/timeline';

export type IndicatorType = 'temperature' | 'co2' | 'ocean' | 'oceanHeat' | 'seaIce' | 'seaLevel';
export type TimeRangeType = 'all' | '1950' | '1980' | '2000';

export interface IndicatorMeta {
  id: IndicatorType;
  title: string;
  subtitle: string;
  unit: string;
  datasetName: string;
  agency: string;
  baseline: string;
  latestValue: string;
  changeDescription: string;
  colorHex: string;
}

export const INDICATOR_METADATA: Record<IndicatorType, IndicatorMeta> = {
  temperature: {
    id: 'temperature',
    title: 'Global Surface Temperature',
    subtitle: 'Annual mean land-ocean temperature anomaly vs 1850–1900 baseline',
    unit: '°C anomaly',
    datasetName: 'NASA GISTEMP v4',
    agency: 'NASA Goddard Institute for Space Studies',
    baseline: '1850–1900 Pre-Industrial',
    latestValue: '+1.33°C',
    changeDescription: 'Long-term observed warming since pre-industrial era',
    colorHex: '#f97316' // warm orange
  },
  co2: {
    id: 'co2',
    title: 'Atmospheric Carbon Dioxide',
    subtitle: 'Direct in-situ spectroscopic measurements atop Mauna Loa',
    unit: 'ppm',
    datasetName: 'NOAA Global Monitoring Laboratory & Scripps CO2',
    agency: 'NOAA GML / Scripps',
    baseline: '280–285 ppm pre-industrial equilibrium',
    latestValue: '429.1 ppm',
    changeDescription: '+50% increase above pre-industrial baseline',
    colorHex: '#38bdf8' // calm light blue
  },
  ocean: {
    id: 'ocean',
    title: 'Sea Surface Temperature Anomaly',
    subtitle: 'Extended reconstructed global ocean surface skin/bucket temperature anomaly',
    unit: '°C anomaly',
    datasetName: 'NOAA ERSST v5',
    agency: 'NOAA National Centers for Environmental Information (NCEI)',
    baseline: '1971–2000 Climatological Mean',
    latestValue: '+0.91°C',
    changeDescription: 'Surface ocean warming driving tropical marine heatwaves and cyclone energy',
    colorHex: '#06b6d4' // cyan
  },
  oceanHeat: {
    id: 'oceanHeat',
    title: 'Ocean Heat Content (0–2000m)',
    subtitle: 'Subsurface thermal energy uptake recorded by Argo profiling floats & XBTs',
    unit: 'ZettaJoules (ZJ)',
    datasetName: 'NOAA NCEI Ocean Heat Content',
    agency: 'NOAA NCEI Ocean Climate Laboratory',
    baseline: '1971–2000 Climatological Mean',
    latestValue: '+382.4 ZJ',
    changeDescription: 'Over 90% of Earth’s accumulated excess greenhouse heat is stored in the oceans',
    colorHex: '#3b82f6' // deep blue
  },
  seaIce: {
    id: 'seaIce',
    title: 'Arctic Sea Ice Minimum Extent',
    subtitle: 'September annual post-summer minimum extent',
    unit: 'million km²',
    datasetName: 'NSIDC Sea Ice Index v3 (Passive Microwave)',
    agency: 'National Snow and Ice Data Center / NASA',
    baseline: '1981–2010 Median (~6.5 million km²)',
    latestValue: '4.15 M km²',
    changeDescription: '~40% decline in late-summer Arctic sea ice extent since 1979',
    colorHex: '#a5f3fc' // ice blue
  },
  seaLevel: {
    id: 'seaLevel',
    title: 'Global Mean Sea Level',
    subtitle: 'Continuous satellite radar altimetry & historical tide gauges',
    unit: 'mm rise',
    datasetName: 'NASA / CNES Ocean Altimetry Multi-Mission',
    agency: 'NASA GSFC / Copernicus Marine',
    baseline: '1993 Reference Year (0 mm)',
    latestValue: '+124.5 mm',
    changeDescription: 'Rate accelerated from 1.7 mm/yr in 20th century to 4.5 mm/yr today',
    colorHex: '#60a5fa' // marine blue
  }
};

export class ClimateHistoryService {
  /**
   * Filter data series based on selected time range
   */
  static getFilteredTemperature(range: TimeRangeType): TemperatureDataPoint[] {
    const minYear = this.getMinYear(range);
    return TEMPERATURE_HISTORY.filter(d => d.year >= minYear);
  }

  static getFilteredCO2(range: TimeRangeType): CO2DataPoint[] {
    const minYear = this.getMinYear(range);
    return CO2_HISTORY.filter(d => d.year >= minYear);
  }

  static getFilteredOcean(range: TimeRangeType): OceanDataPoint[] {
    const minYear = this.getMinYear(range);
    return OCEAN_HISTORY.filter(d => d.year >= minYear);
  }

  static getFilteredOceanHeat(range: TimeRangeType): OceanHeatDataPoint[] {
    const minYear = this.getMinYear(range);
    return OCEAN_HEAT_HISTORY.filter(d => d.year >= minYear);
  }

  static getFilteredSeaIce(range: TimeRangeType): SeaIceDataPoint[] {
    const minYear = this.getMinYear(range);
    return SEA_ICE_HISTORY.filter(d => d.year >= minYear);
  }

  static getFilteredSeaLevel(range: TimeRangeType): SeaLevelDataPoint[] {
    const minYear = this.getMinYear(range);
    return SEA_LEVEL_HISTORY.filter(d => d.year >= minYear);
  }

  static getMilestones(): ClimateStoryMilestone[] {
    return CLIMATE_STORY_MILESTONES;
  }

  static getMilestoneByYear(year: number): ClimateStoryMilestone | undefined {
    return CLIMATE_STORY_MILESTONES.find(m => m.year === year);
  }

  private static getMinYear(range: TimeRangeType): number {
    switch (range) {
      case '1950': return 1950;
      case '1980': return 1979;
      case '2000': return 2000;
      case 'all':
      default:
        return 1850;
    }
  }
}
