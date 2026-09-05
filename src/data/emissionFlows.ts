export interface EmissionFlow {
  id: string;
  sourceName: string;
  sourceLat: number;
  sourceLng: number;
  targetName: string;
  targetLat: number;
  targetLng: number;
  gasType: 'CO2' | 'CH4' | 'Black Carbon' | 'Thermal';
  volumeMt: number; // megatons
  color: string;
  altitude: number; // arc height multiplier
}

export const EMISSION_FLOWS: EmissionFlow[] = [
  {
    id: 'flow-1',
    sourceName: 'East China Industrial Complex',
    sourceLat: 31.2304,
    sourceLng: 121.4737,
    targetName: 'North Pacific Atmospheric Sink',
    targetLat: 45.0,
    targetLng: 180.0,
    gasType: 'CO2',
    volumeMt: 4200,
    color: '#ff3366',
    altitude: 0.35
  },
  {
    id: 'flow-2',
    sourceName: 'US Gulf Coast Petrochemical Hub',
    sourceLat: 29.7604,
    sourceLng: -95.3698,
    targetName: 'North Atlantic Heat Basin',
    targetLat: 38.0,
    targetLng: -40.0,
    gasType: 'CH4',
    volumeMt: 2100,
    color: '#ffaa00',
    altitude: 0.38
  },
  {
    id: 'flow-3',
    sourceName: 'Gangetic Industrial & Coal Corridor',
    sourceLat: 23.6102,
    sourceLng: 85.2799,
    targetName: 'Arabian Sea Marine Heatwave',
    targetLat: 15.0,
    targetLng: 65.0,
    gasType: 'Black Carbon',
    volumeMt: 1900,
    color: '#ff5500',
    altitude: 0.28
  },
  {
    id: 'flow-4',
    sourceName: 'Persian Gulf Oil & Gas Flaring',
    sourceLat: 26.0667,
    sourceLng: 50.5577,
    targetName: 'Sahel Heat Dome',
    targetLat: 18.0,
    targetLng: 20.0,
    gasType: 'CH4',
    volumeMt: 1400,
    color: '#ff0055',
    altitude: 0.32
  },
  {
    id: 'flow-5',
    sourceName: 'European Industrial Rhineland',
    sourceLat: 50.9375,
    sourceLng: 6.9603,
    targetName: 'Arctic Polar Gyre',
    targetLat: 78.0,
    targetLng: 15.0,
    gasType: 'CO2',
    volumeMt: 1600,
    color: '#a855f7',
    altitude: 0.42
  },
  {
    id: 'flow-6',
    sourceName: 'Yamal Siberian Gas Extraction',
    sourceLat: 70.0,
    sourceLng: 70.0,
    targetName: 'Arctic Albedo Thaw Zone',
    targetLat: 82.0,
    targetLng: 40.0,
    gasType: 'CH4',
    volumeMt: 1100,
    color: '#06b6d4',
    altitude: 0.25
  },
  {
    id: 'flow-7',
    sourceName: 'Australian Bowen Basin Coal Mines',
    sourceLat: -22.5,
    sourceLng: 148.5,
    targetName: 'Coral Sea Thermal Anomaly',
    targetLat: -18.0,
    targetLng: 155.0,
    gasType: 'Thermal',
    volumeMt: 850,
    color: '#f97316',
    altitude: 0.3
  },
  {
    id: 'flow-8',
    sourceName: 'Sumatra Peatland Burning Front',
    sourceLat: 0.5,
    sourceLng: 101.5,
    targetName: 'Equatorial Pacific Jet Stream',
    targetLat: 2.0,
    targetLng: 150.0,
    gasType: 'CO2',
    volumeMt: 950,
    color: '#ef4444',
    altitude: 0.34
  }
];
