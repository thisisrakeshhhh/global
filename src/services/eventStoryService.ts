import { EventStory, EventCategory } from '../types/eventStory';
import { FireCluster, NOAACycloneEvent } from '../types/climateIntelligence';

/**
 * Verified Real-World Event Story: Nepal Bhote Koshi–Trishuli Flash Flood
 * Source: Ministry of Foreign Affairs Nepal (Sept 6 2026 update), WHO Nepal Emergency Report,
 * GDACS (Event 1104124), Reuters, AP, ICIMOD.
 */
export const NEPAL_FLOOD_STORY: EventStory = {
  id: 'nepal-bhotekoshi-trishuli-2026',
  title: 'A catastrophic flood reshaped the Bhote Koshi–Trishuli corridor',
  subtitle: 'Bhote Koshi / Trishuli river systems · Central Nepal',
  countryName: 'Nepal',
  countryCode: 'NPL',
  countryFlag: '🇳🇵',
  region: 'Central Nepal (Rasuwa, Nuwakot, Dhading, Chitwan)',
  eventDate: 'August 26, 2026 · Ongoing response',
  statusBadge: 'Ongoing Response',
  category: 'flood',
  categoryIcon: '🌊',

  summary: 'A sudden upstream flood surge swept down the Bhote Koshi and Trishuli river systems in central Nepal, devastating riverside settlements, washing away highway bridges, and damaging critical hydroelectric infrastructure across four downstream districts.',
  
  keyFacts: [
    { label: 'Event Genesis', value: 'August 26, 2026 upstream surge' },
    { label: 'Primary Corridors', value: 'Bhote Koshi & Trishuli river basins' },
    { label: 'Districts Affected', value: 'Rasuwa, Nuwakot, Dhading, Chitwan' },
    { label: 'Current Phase', value: 'Rescue, temporary bridges & relief' }
  ],

  mapConfig: {
    centerLat: 27.95,
    centerLng: 85.25,
    defaultZoom: 10,
    markers: [
      {
        lat: 28.18,
        lng: 85.34,
        label: 'Upstream Surge Origin',
        type: 'epicenter',
        description: 'Zone of high-altitude rock/ice instability and temporary river damming along upper Bhote Koshi.'
      },
      {
        lat: 28.12,
        lng: 85.30,
        label: 'Dhunche (Rasuwa)',
        type: 'city',
        description: 'District headquarters of Rasuwa; key staging post for emergency logistics.'
      },
      {
        lat: 27.91,
        lng: 85.16,
        label: 'Bidur / Trishuli Bazaar',
        type: 'city',
        description: 'Major riverside settlement where water levels peaked significantly above danger marks.'
      },
      {
        lat: 27.7172,
        lng: 85.3240,
        label: 'Kathmandu (Capital)',
        type: 'city',
        description: 'National emergency operations command center.'
      },
      {
        lat: 28.02,
        lng: 85.22,
        label: 'Upper Trishuli Hydro Project',
        type: 'dam',
        description: 'Dam site impacted by heavy silt, boulder debris, and surge waters.'
      }
    ],
    rivers: [
      {
        name: 'Bhote Koshi River',
        points: [
          [28.25, 85.38],
          [28.18, 85.34],
          [28.10, 85.28],
          [28.05, 85.25]
        ]
      },
      {
        name: 'Trishuli River Corridor',
        points: [
          [28.05, 85.25],
          [27.95, 85.18],
          [27.88, 85.12],
          [27.75, 84.85],
          [27.65, 84.55]
        ]
      }
    ],
    districts: [
      { name: 'Rasuwa', lat: 28.12, lng: 85.30, severity: 'critical' },
      { name: 'Nuwakot', lat: 27.91, lng: 85.16, severity: 'critical' },
      { name: 'Dhading', lat: 27.85, lng: 84.95, severity: 'severe' },
      { name: 'Chitwan', lat: 27.53, lng: 84.45, severity: 'monitored' }
    ]
  },

  causalChain: [
    {
      label: 'High-Altitude Ice / Rock Instability',
      detail: 'Monsoon saturation combined with steep glaciated terrain destabilized upstream valley walls.',
      certainty: 'UNDER_INVESTIGATION'
    },
    {
      label: 'Sudden Upstream Blockage & Temporary Damming',
      detail: 'GDACS remote-sensing analysis identified evidence of an ice/rock landslide that temporarily choked the narrow gorge.',
      certainty: 'ASSESSED'
    },
    {
      label: 'Impounded Water Breach & Surging Wave',
      detail: 'Rapid dam collapse released a high-velocity outburst pulse down the Bhote Koshi gorge.',
      certainty: 'OBSERVED'
    },
    {
      label: 'Downstream Propagation along Trishuli Corridor',
      detail: 'The surge wave channeled through Nuwakot and Dhading, carrying immense sediment, tree trunks, and boulder loads.',
      certainty: 'OBSERVED'
    },
    {
      label: 'Infrastructure Destruction & Displacement',
      detail: 'Bridges snapped, highway links severed, riverside structures inundated, and riverbanks severely scoured.',
      certainty: 'OBSERVED'
    }
  ],

  uncertaintyNotes: 'Scientific Uncertainty Notice: GDACS satellite analysis points to a sudden ice-and-rock landslide followed by temporary dam breach. However, the World Health Organization (WHO) and local geological teams emphasize that the precise primary trigger remains under active field assessment as debris settles.',

  impactsSummary: {
    communities: 'Dozens of riverside families displaced; emergency shelters deployed in Rasuwa and Nuwakot; ongoing medical relief dispatched.',
    infrastructure: 'Multiple concrete motorable bridges washed away; Pasang Lhamu Highway severed in critical sections, halting trans-Himalayan commerce.',
    hydropowerAndTransport: 'Multiple run-of-river hydroelectric stations along the Trishuli basin sustained intake damage and forced turbine shutdowns.'
  },

  newsReports: [
    {
      title: 'Nepali woman found alive days after family began mourning rites following Trishuli flooding',
      source: 'Reuters',
      sourceType: 'news_agency',
      publishedAt: 'September 6, 2026',
      url: 'https://www.reuters.com/world/china/nepali-woman-found-alive-days-after-family-began-mourning-rites-2026-09-06/',
      snippet: 'Rescue teams located survivors along battered riverbanks in Nuwakot district as water levels receded, while emergency food and medical convoys continue clearing landslide-blocked mountain routes.'
    },
    {
      title: 'Humanitarian and Health Response in Rasuwa and Nuwakot Flash Floods',
      source: 'World Health Organization (WHO Nepal)',
      sourceType: 'un_who',
      publishedAt: 'September 2026 Situation Report',
      url: 'https://www.who.int/nepal/emergencies/2026-rasuwa-flash-floods',
      snippet: 'WHO coordinates with Nepal Ministry of Health to deploy emergency water purification tablets, cholera kits, and mobile clinics across Rasuwa, Nuwakot, and Dhading districts.'
    },
    {
      title: 'Daily Situation Update: Flood Relief, Bridge Restoration and Border Highway Operations',
      source: 'Ministry of Foreign Affairs, Government of Nepal',
      sourceType: 'official_government',
      publishedAt: 'September 6, 2026 Official Bulletin',
      url: 'https://www.mofa.gov.np/content/1878/daily-update-6-september-2026/',
      snippet: 'Nepal Army engineering divisions continue constructing Bailey bridges across severed crossings in Rasuwa to restore emergency vehicular movement and distribute heavy machinery.'
    },
    {
      title: 'Deadly flash floods in central Nepal highlight fragile mountain river corridors',
      source: 'Associated Press (AP)',
      sourceType: 'news_agency',
      publishedAt: 'September 5, 2026',
      url: 'https://apnews.com',
      snippet: 'Heavy monsoon rains combined with geological shifts have triggered recurring mountain hazards across Nepal, leaving remote communities isolated for days.'
    }
  ],

  historicalContext: {
    regionName: 'Nepal & Central Himalayas',
    tempAnomaly1850toNow: '+1.35°C warming since 1850 (amplified to +1.8°C at altitudes >3,000 m)',
    rainfallTrend: 'Monsoon total rainfall has become more erratic with prolonged dry intervals followed by concentrated high-intensity convective cloudbursts.',
    cryosphereTrend: 'Himalayan glaciers have lost over 30% of their mass since 1980 (ICIMOD Water Tower Report); moraine-dammed lakes have quadrupled in number.',
    attributionGuardrail: 'Scientific Attribution Guardrail: Today’s catastrophic flood is not by itself direct proof that climate change caused this specific event. However, long-term observational datasets confirm that atmospheric warming increases the frequency of extreme precipitation spikes and destabilizes permafrost-cemented rock faces in high-altitude catchments.',
    citations: [
      'ICIMOD: "Water, Ice, Society, and Ecosystems in the Hindu Kush Himalaya" (2023)',
      'IPCC AR6 WGII Chapter 10: "Asia — Mountains and River Basins"',
      'Department of Hydrology and Meteorology (DHM), Government of Nepal'
    ]
  },

  evidenceSources: {
    satelliteSystems: [
      'Copernicus Sentinel-1 SAR (all-weather flood extent and landslide scar radar mapping)',
      'Sentinel-2 Optical Multispectral (turbidity and river corridor scouring analysis)',
      'NASA GPM (Global Precipitation Measurement) IMERG 30-minute rainfall rates'
    ],
    governmentAgencies: [
      'Department of Hydrology and Meteorology (DHM), Nepal',
      'Ministry of Home Affairs National Disaster Risk Reduction and Management Authority (NDRRMA)',
      'Ministry of Foreign Affairs (MOFA), Government of Nepal'
    ],
    scientificDatasets: [
      'GDACS Event 1104124 Rapid Automated Satellite Analysis',
      'ICIMOD Regional Glacial Lake Inventory & Cryosphere Database',
      'Copernicus Emergency Management Service (EMS)'
    ]
  }
};

/**
 * Convert a live NASA FIRMS cluster into a human-first EventStory
 */
export function createStoryFromFireCluster(cluster: FireCluster): EventStory {
  const isHighIntensity = cluster.maxFRP > 500;
  
  // Detect country / region flag
  let flag = '🔥';
  let countryName = cluster.regionName;
  if (cluster.regionName.toLowerCase().includes('australia')) {
    flag = '🇦🇺';
    countryName = 'Australia';
  } else if (cluster.regionName.toLowerCase().includes('brazil') || cluster.regionName.toLowerCase().includes('amazon')) {
    flag = '🇧🇷';
    countryName = 'Brazil';
  } else if (cluster.regionName.toLowerCase().includes('mediterranean') || cluster.regionName.toLowerCase().includes('greece') || cluster.regionName.toLowerCase().includes('spain')) {
    flag = '🇪🇺';
    countryName = 'Mediterranean';
  } else if (cluster.regionName.toLowerCase().includes('canada') || cluster.regionName.toLowerCase().includes('north america')) {
    flag = '🇨🇦';
    countryName = 'Canada';
  } else if (cluster.regionName.toLowerCase().includes('africa') || cluster.regionName.toLowerCase().includes('congo')) {
    flag = '🌍';
    countryName = 'Central Africa';
  }

  return {
    id: `fire-cluster-${cluster.id}`,
    title: `Wildfire activity detected across ${cluster.regionName}`,
    subtitle: `Satellite observation · Recent`,
    countryName: countryName,
    countryCode: 'HOT',
    countryFlag: flag,
    region: cluster.regionName,
    eventDate: `Observed ${new Date(cluster.latestObservation).toLocaleDateString()}`,
    statusBadge: 'Active detection',
    category: 'wildfire',
    categoryIcon: '🔥',

    summary: `NASA orbital thermal sensors detected active thermal anomalies in ${cluster.regionName}. Radiative power measurements indicate combustion of surface vegetation and biomass.`,


    keyFacts: [
      { label: 'Thermal Detections', value: `${cluster.detectionCount} satellite points` },
      { label: 'Radiative Power', value: `${Math.round(cluster.totalFRP).toLocaleString()} MW total` },
      { label: 'Peak Intensity', value: `${Math.round(cluster.maxFRP)} MW` },
      { label: 'Satellites', value: cluster.satellites.join(', ') }
    ],

    mapConfig: {
      centerLat: cluster.lat,
      centerLng: cluster.lng,
      defaultZoom: 9,
      markers: [
        {
          lat: cluster.lat,
          lng: cluster.lng,
          label: cluster.regionName,
          type: 'epicenter',
          description: `Center of thermal concentration: ${cluster.detectionCount} detections.`
        }
      ]
    },

    causalChain: [
      {
        label: 'Surface Heat & Low Humidity',
        detail: 'Elevated ambient temperatures and dry fuel conditions prime the landscape for ignition.',
        certainty: 'ASSESSED'
      },
      {
        label: 'Ignition (Lightning or Anthropogenic)',
        detail: 'Thermal sensors detect infrared energy but cannot identify the proximate spark.',
        certainty: 'UNDER_INVESTIGATION'
      },
      {
        label: 'Active Flame Propagation',
        detail: 'Sensors measure radiant heat energy (FRP) emitting at 4-micrometer infrared bands.',
        certainty: 'OBSERVED'
      },
      {
        label: 'Smoke Plume & Trace Gas Dispersion',
        detail: 'Aerosol optical depth increases, dispersing PM2.5 and carbon monoxide downwind.',
        certainty: 'OBSERVED'
      }
    ],

    uncertaintyNotes: 'Satellite Remote Sensing Caveat: NASA satellites (VIIRS / MODIS) measure middle-infrared radiance (Fire Radiative Power), not the ignition source. The exact cause (agricultural management, lightning, or accident) requires on-the-ground verification by local authorities.',

    impactsSummary: {
      communities: 'Smoke and particulate matter (PM2.5) dispersion affecting localized air quality.',
      infrastructure: 'Vegetation canopy loss; risk of accelerated soil erosion during post-fire rain.',
      hydropowerAndTransport: 'Regional road visibility warnings issued in smoke plumes.'
    },

    newsReports: [
      {
        title: `Satellite fire alerts confirm thermal clusters across ${cluster.regionName}`,
        source: 'NASA FIRMS Global Feed',
        sourceType: 'scientific_consortium',
        publishedAt: new Date(cluster.latestObservation).toLocaleDateString(),
        url: cluster.provenance.sourceUrl,
        snippet: `Real-time satellite data processed by NASA Earth Science shows ${cluster.detectionCount} pixel detections with mean confidence of ${Math.round(cluster.averageConfidence)}%.`
      }
    ],

    historicalContext: {
      regionName: cluster.regionName,
      tempAnomaly1850toNow: '+1.4°C regional warming anomaly relative to pre-industrial baseline',
      rainfallTrend: 'Vapor pressure deficit has increased, extending annual fire season windows.',
      attributionGuardrail: 'Attribution Notice: Detecting an active fire cluster is not sole evidence of climate change. Warmer background conditions intensify fuel aridity, making fire ignition and spread more probable once sparked.',
      citations: [
        'NASA Earth Science Data and Information System (ESDIS)',
        'Global Wildfire Information System (GWIS)',
        'Copernicus Atmosphere Monitoring Service (CAMS)'
      ]
    },

    evidenceSources: {
      satelliteSystems: [
        ...cluster.satellites,
        'VIIRS Active Fire Product (375 m resolution)',
        'Terra & Aqua MODIS Thermal Anomalies'
      ],
      governmentAgencies: [
        'NASA Goddard Space Flight Center',
        'NOAA National Environmental Satellite, Data, and Information Service (NESDIS)'
      ],
      scientificDatasets: [
        'NASA FIRMS NRT Fire Radiative Power (MW)',
        'MODIS Collection 6.1 Fire Product'
      ]
    },

    rawTelemetrySnippet: {
      instrument: cluster.satellites.join(' / '),
      detectionCount: cluster.detectionCount,
      frpMW: cluster.totalFRP
    }
  };
}

/**
 * Convert a live NOAA Cyclone into a human-first EventStory
 */
export function createStoryFromCyclone(cyclone: NOAACycloneEvent): EventStory {
  return {
    id: `cyclone-${cyclone.id}`,
    title: `${cyclone.category}: ${cyclone.stormName}`,
    subtitle: `${cyclone.basin} Basin · NOAA Advisory ${cyclone.advisoryNumber}`,
    countryName: `${cyclone.basin} Basin`,
    countryCode: 'CYC',
    countryFlag: '🌀',
    region: `${cyclone.basin} Ocean`,
    eventDate: `Advisory Time: ${cyclone.advisoryTimeUtc}`,
    statusBadge: 'Active Tropical System',
    category: 'cyclone',
    categoryIcon: '🌀',

    summary: `${cyclone.category} ${cyclone.stormName} is active in the ${cyclone.basin} with maximum sustained winds of ${cyclone.maxSustainedWindsMph} mph (${cyclone.maxSustainedWindsKts} knots) and central pressure of ${cyclone.centralPressureMb} mb.`,

    keyFacts: [
      { label: 'Max Sustained Winds', value: `${cyclone.maxSustainedWindsMph} mph` },
      { label: 'Central Pressure', value: `${cyclone.centralPressureMb} mb` },
      { label: 'Current Basin', value: cyclone.basin },
      { label: 'Advisory Number', value: cyclone.advisoryNumber }
    ],

    mapConfig: {
      centerLat: cyclone.currentLat,
      centerLng: cyclone.currentLng,
      defaultZoom: 6,
      markers: [
        {
          lat: cyclone.currentLat,
          lng: cyclone.currentLng,
          label: `${cyclone.stormName} (${cyclone.category})`,
          type: 'epicenter',
          description: `Max winds: ${cyclone.maxSustainedWindsMph} mph.`
        },
        ...cyclone.forecastTrack.map(pt => ({
          lat: pt.lat,
          lng: pt.lng,
          label: `+${pt.forecastHour}h: ${pt.category}`,
          type: 'sensor' as const,
          description: `Wind: ${pt.maxWindsKts} kts`
        }))
      ]
    },

    causalChain: [
      {
        label: 'High Ocean Heat Content (>26.5°C)',
        detail: 'Deep warm water provides latent heat energy to fuel low-pressure atmospheric convection.',
        certainty: 'OBSERVED'
      },
      {
        label: 'Low Vertical Wind Shear',
        detail: 'Favorable upper-level atmospheric flow permits the convective core to organize vertically.',
        certainty: 'OBSERVED'
      },
      {
        label: 'Central Pressure Drop & Eye Formation',
        detail: 'Intense updrafts evacuate mass from the central column, steepening the pressure gradient.',
        certainty: 'OBSERVED'
      },
      {
        label: 'Coastal Surge & Torrential Rain Hazard',
        detail: 'Spiral rainbands and barometric ocean rise threaten coastal and inland catchments.',
        certainty: 'ASSESSED'
      }
    ],

    uncertaintyNotes: 'Forecast Track Uncertainty: NHC forecast points reflect consensus dynamical hurricane models (GFS, ECMWF, HWRF). Actual landfall coordinates may deviate within the cone of uncertainty.',

    impactsSummary: {
      communities: 'Coastal surge warnings, gale-force winds, and torrential rainfall advisories.',
      infrastructure: 'Marine transit restrictions, offshore oil platform evacuations, port closures.',
      hydropowerAndTransport: 'Aviation rerouting across oceanic track corridors.'
    },

    newsReports: [
      {
        title: `NOAA NHC issues Advisory ${cyclone.advisoryNumber} for ${cyclone.stormName}`,
        source: 'National Hurricane Center',
        sourceType: 'official_government',
        publishedAt: cyclone.advisoryTimeUtc,
        url: cyclone.provenance.sourceUrl,
        snippet: `Forecasters track sustained winds of ${cyclone.maxSustainedWindsMph} mph with ongoing monitoring by geostationary GOES satellites.`
      }
    ],

    historicalContext: {
      regionName: `${cyclone.basin} Tropical Belt`,
      tempAnomaly1850toNow: 'Sea-surface temperatures are +1.2°C above historical averages across tropical genesis zones.',
      rainfallTrend: 'Warmer atmosphere holds 7% more moisture per 1°C (Clausius-Clapeyron relation), increasing hurricane rainfall rates.',
      attributionGuardrail: 'Scientific Attribution: Climate change does not necessarily increase total global cyclone counts, but peer-reviewed research indicates it increases the proportion of Category 4–5 intense storms and elevates peak rainfall rates.',
      citations: [
        'NOAA Geophysical Fluid Dynamics Laboratory (GFDL)',
        'IPCC AR6 Working Group 1 Chapter 11: Extreme Weather',
        'Knutson et al., Bulletin of the American Meteorological Society'
      ]
    },

    evidenceSources: {
      satelliteSystems: [
        'NOAA GOES-16 / GOES-18 Geostationary Weather Satellites',
        'NASA/JAXA GPM Microwave Imager'
      ],
      governmentAgencies: [
        'NOAA National Hurricane Center (NHC)',
        'World Meteorological Organization (WMO) Tropical Cyclone Programme'
      ],
      scientificDatasets: [
        'NHC Automated Tropical Cyclone Forecasting (ATCF) System',
        'Copernicus ERA5 Oceanic Reanalysis'
      ]
    }
  };
}

export const AUSTRALIA_WILDFIRE_STORY: EventStory = {
  id: 'australia-bushfire-satellite',
  title: 'Wildfire activity detected across Eastern Australia',
  subtitle: 'Satellite observation · Recent',
  countryName: 'Australia',
  countryCode: 'AUS',
  countryFlag: '🇦🇺',
  region: 'Eastern Australia (Queensland & New South Wales)',
  eventDate: 'Satellite observation · Recent',
  statusBadge: 'Active detection',
  category: 'wildfire',
  categoryIcon: '🔥',
  summary: 'NASA VIIRS orbital sensors detected thermal fire anomalies across dry eucalyptus woodlands in Eastern Australia following elevated vapor pressure deficit and dry seasonal winds.',
  keyFacts: [
    { label: 'Primary Sensor', value: 'VIIRS NOAA-20 / NOAA-21 (375 m)' },
    { label: 'Fuel Type', value: 'Sclerophyll woodland & savannah' },
    { label: 'Contributing Index', value: 'High Forest Fire Danger Index' },
    { label: 'Agency Tracking', value: 'Bureau of Meteorology (BOM) & QFES' }
  ],
  mapConfig: {
    centerLat: -27.47,
    centerLng: 151.85,
    defaultZoom: 7,
    markers: [
      {
        lat: -26.85,
        lng: 151.85,
        label: 'Thermal Hotspot Cluster',
        type: 'epicenter',
        description: 'Cluster of middle-infrared radiative fire detections.'
      },
      {
        lat: -27.47,
        lng: 153.02,
        label: 'Brisbane',
        type: 'city'
      }
    ]
  },
  causalChain: [
    { label: 'Prolonged High Temperature & Low Humidity', detail: 'Elevated vapor pressure deficit accelerates soil and canopy moisture evaporation.', certainty: 'OBSERVED' },
    { label: 'Vegetation Fuel Desiccation', detail: 'High curing rates leave grasses and eucalypt litter highly combustible.', certainty: 'OBSERVED' },
    { label: 'Ignition & Flare-Up', detail: 'Dry lightning or local spark initiates surface fire front.', certainty: 'UNDER_INVESTIGATION' },
    { label: 'Atmospheric Smoke Plume', detail: 'Winds drive aerosol dispersion across regional corridors.', certainty: 'OBSERVED' }
  ],
  uncertaintyNotes: 'Satellite Detection Notice: NASA FIRMS middle-infrared sensors detect fire radiance (FRP) at the moment of satellite overpass. Local ignition causes and containment status are determined by regional state fire authorities (RFS/QFES).',
  impactsSummary: {
    communities: 'Air quality advisories issued in downwind communities; localized smoke haze.',
    infrastructure: 'Rural access roads monitored for smoke visibility hazards.',
    hydropowerAndTransport: 'Regional electrical transmission corridors inspected.'
  },
  newsReports: [
    {
      title: 'Satellite sensors monitor active brush fires across Eastern Australian interior',
      source: 'Australian Associated Press (AAP)',
      sourceType: 'news_agency',
      publishedAt: 'Recent Bulletin',
      url: 'https://www.bom.gov.au',
      snippet: 'State fire services urge landowners to maintain firebreaks as warmer seasonal conditions elevate fire danger ratings.'
    }
  ],
  historicalContext: {
    regionName: 'Australia & Tasman Basin',
    tempAnomaly1850toNow: '+1.6°C warming anomaly across the Australian continent since 1910',
    rainfallTrend: 'Cool-season rainfall in south-eastern Australia has declined by ~12% over recent decades.',
    attributionGuardrail: 'Attribution Notice: Detecting an active fire front is not by itself direct proof of climate change. However, long-term warming and extended fire weather seasons significantly increase the number of days with dangerous fire conditions.',
    citations: [
      'Bureau of Meteorology (BOM) State of the Climate 2024',
      'CSIRO Australian Climate Change Science',
      'IPCC AR6 WGII Chapter 11: Australasia'
    ]
  },
  evidenceSources: {
    satelliteSystems: ['VIIRS NOAA-20 375m NRT', 'Himawari-9 Geostationary 10-Minute Rapid Fire Detection'],
    governmentAgencies: ['Bureau of Meteorology (BOM)', 'Queensland Fire and Emergency Services (QFES)'],
    scientificDatasets: ['NASA FIRMS Active Fire Database', 'Global Wildfire Information System (GWIS)']
  }
};

/**
 * Retrieve primary featured stories (dynamically populated across regions)
 */
export function getFeaturedStories(
  fireClusters: FireCluster[],
  cyclones: NOAACycloneEvent[]
): EventStory[] {
  const stories: EventStory[] = [NEPAL_FLOOD_STORY, AUSTRALIA_WILDFIRE_STORY];

  // Convert top fire clusters from different geographic regions (e.g. Amazon, Mediterranean, Canada)
  if (fireClusters.length > 0) {
    const additionalClusters = fireClusters.filter(c => !c.regionName.toLowerCase().includes('australia'));
    for (const cluster of additionalClusters.slice(0, 3)) {
      stories.push(createStoryFromFireCluster(cluster));
    }
  }

  // If there are real cyclones, add them
  if (cyclones.length > 0) {
    stories.push(createStoryFromCyclone(cyclones[0]));
  }

  return stories;
}

