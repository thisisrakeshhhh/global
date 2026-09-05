export interface TippingPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  thresholdTemp: string;
  currentStatus: 'Active Concern' | 'Accelerating' | 'Near Tipping Point' | 'Triggered';
  severity: 'critical' | 'extreme' | 'high';
  color: string;
  shortDesc: string;
  fullDesc: string;
  impactConsequences: string[];
  cameraFocus: {
    lat: number;
    lng: number;
    distance: number;
  };
}

export const TIPPING_POINTS: TippingPoint[] = [
  {
    id: 'greenland',
    name: 'Greenland Ice Sheet Collapse',
    lat: 72.0,
    lng: -40.0,
    thresholdTemp: '1.5°C - 2.0°C',
    currentStatus: 'Accelerating',
    severity: 'critical',
    color: '#00f0ff',
    shortDesc: 'Melting at 30 million tons per hour, accelerating global sea rise.',
    fullDesc: 'The Greenland Ice Sheet contains enough water to raise global sea levels by over 7 meters. As summer melt lakes drain through moulins to the bedrock, the glacier slides rapidly into warming ocean waters.',
    impactConsequences: [
      'Permanent submersion of global coastal megacities',
      'Massive freshwater discharge weakening the Atlantic Gulf Stream',
      'Irreversible sea level rise locked in for centuries'
    ],
    cameraFocus: { lat: 68.0, lng: -40.0, distance: 3.5 }
  },
  {
    id: 'amazon',
    name: 'Amazon Rainforest Savannization',
    lat: -3.4653,
    lng: -62.2159,
    thresholdTemp: '2.0°C - 2.5°C (or 20-25% Deforestation)',
    currentStatus: 'Near Tipping Point',
    severity: 'critical',
    color: '#10b981',
    shortDesc: 'Forest canopy drying out and transitioning into open degraded scrubland.',
    fullDesc: 'The Amazon generates its own rainfall via evapotranspiration (aerial rivers). As logging and climate droughts pass 20% deforestation, the rain feedback fails, triggering self-sustaining dieback and turning the forest into dry savannah.',
    impactConsequences: [
      'Release of up to 120 billion tons of stored CO2 into the atmosphere',
      'Extinction of 10% of Earth known biodiversity species',
      'Severe agricultural collapse across South America'
    ],
    cameraFocus: { lat: -5.0, lng: -60.0, distance: 3.8 }
  },
  {
    id: 'amoc',
    name: 'Atlantic Overturning Circulation (AMOC)',
    lat: 56.0,
    lng: -30.0,
    thresholdTemp: '1.4°C - 3.0°C',
    currentStatus: 'Accelerating',
    severity: 'critical',
    color: '#3b82f6',
    shortDesc: 'Gulf Stream circulation at weakest state in over 1,000 years.',
    fullDesc: 'The AMOC transports vast warm tropical heat northwards to Western Europe. Freshwater melt from Greenland dilutes dense salty sea water, preventing it from sinking and stalling the ocean conveyor engine.',
    impactConsequences: [
      'Severe winter deep-freeze conditions across Northern and Western Europe',
      'Drastic shift in tropical rainfall belts, triggering widespread famine in Sahel',
      'Rapid sea level rise on North American Eastern Seaboard'
    ],
    cameraFocus: { lat: 50.0, lng: -35.0, distance: 3.6 }
  },
  {
    id: 'permafrost',
    name: 'Boreal & Siberian Permafrost Thaw',
    lat: 67.0,
    lng: 110.0,
    thresholdTemp: '1.5°C - 2.0°C',
    currentStatus: 'Near Tipping Point',
    severity: 'extreme',
    color: '#f59e0b',
    shortDesc: 'Ancient frozen soils thawing, releasing massive subterranean methane plumes.',
    fullDesc: 'Permafrost holds approximately 1,500 billion metric tons of organic carbon—twice the carbon currently in Earth atmosphere. Warming causes microbes to break down ancient organic matter into explosive methane and carbon dioxide.',
    impactConsequences: [
      'Unstoppable global greenhouse feedback beyond human mitigation control',
      'Widespread structural collapse of Arctic roads, pipelines, and cities',
      'Massive thermokarst sinkholes and explosive craters'
    ],
    cameraFocus: { lat: 65.0, lng: 105.0, distance: 3.5 }
  },
  {
    id: 'coral_reefs',
    name: 'Global Coral Reef Die-Off',
    lat: -18.2871,
    lng: 147.6992,
    thresholdTemp: '1.5°C',
    currentStatus: 'Triggered',
    severity: 'critical',
    color: '#ec4899',
    shortDesc: 'Over 90% of shallow-water tropical corals face terminal bleaching at 1.5°C.',
    fullDesc: 'Marine heatwaves cause corals to expel their photosynthetic symbiotic algae, turning them ghostly white and causing mass starvation. Sequential mass bleachings leave insufficient recovery time.',
    impactConsequences: [
      'Collapse of nurseries supporting 25% of all marine life',
      'Loss of coastal storm breakwaters protecting 500 million people',
      'Devastating protein and economic loss for coastal fishing communities'
    ],
    cameraFocus: { lat: -18.0, lng: 145.0, distance: 3.4 }
  },
  {
    id: 'himalayas',
    name: 'Himalayan "Third Pole" Glaciers',
    lat: 28.0,
    lng: 86.0,
    thresholdTemp: '1.5°C - 2.0°C',
    currentStatus: 'Accelerating',
    severity: 'extreme',
    color: '#8b5cf6',
    shortDesc: 'Glacial retreat threatens water security for 1.9 billion people.',
    fullDesc: 'Known as the Asian Water Tower, Himalayan glaciers feed the Indus, Ganges, Brahmaputra, Yangtze, and Mekong rivers. Rapid loss creates flash glacial lake outburst floods followed by catastrophic perennial river dry-ups.',
    impactConsequences: [
      'Catastrophic summer water shortages for South and East Asia',
      'Destruction of hydro-power dams and mountain villages from lake bursts',
      'Acute food crises across the worlds most populous river deltas'
    ],
    cameraFocus: { lat: 28.0, lng: 85.0, distance: 3.4 }
  },
  {
    id: 'west_antarctica',
    name: 'West Antarctic Ice Sheet Instability',
    lat: -78.0,
    lng: -120.0,
    thresholdTemp: '1.5°C - 2.0°C',
    currentStatus: 'Accelerating',
    severity: 'critical',
    color: '#06b6d4',
    shortDesc: 'Warm ocean currents melting Thwaites "Doomsday" Glacier from below.',
    fullDesc: 'Much of the West Antarctic Ice Sheet sits on bedrock well below sea level. Deep warm ocean currents are melting the grounding line of Thwaites Glacier, risking an irreversible marine ice sheet instability collapse.',
    impactConsequences: [
      '3.3 meters of eventual global sea level rise',
      'Disruption of Southern Ocean thermohaline circulation',
      'Accelerated ice shelf calving across the Antarctic continent'
    ],
    cameraFocus: { lat: -78.0, lng: -120.0, distance: 3.5 }
  }
];
