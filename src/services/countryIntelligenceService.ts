import { ScientificCountryProfile } from '../types/climateIntelligence';

export const SCIENTIFIC_COUNTRY_INTELLIGENCE: ScientificCountryProfile[] = [
  {
    id: 'in',
    name: 'India',
    code: 'IND',
    lat: 20.5937,
    lng: 78.9629,
    tempAnomaly: 1.85,
    tempAnomalySource: 'Copernicus Climate Change Service / ERA5 (2024 Reanalysis vs 1850-1900)',
    totalEmissionsGt: 2.85,
    emissionsSource: 'IEA World Energy Outlook 2024 & EDGAR v8.0 Greenhouse Gas Database (2023 Inventory)',
    emissionsPerCapitaTonnes: 2.05,
    parisStatus: 'Highly Insufficient',
    parisAssessmentSource: 'Climate Action Tracker (November 2024 Assessment)',
    academicCitation: 'Government of India MoEFCC Third National Communication to UNFCCC; IPCC AR6 WGII Ch. 10 (Asia)',
    keyObservation: 'Over 380 million outdoor workers are exposed to wet-bulb heat stress surpassing OSHA safety limits during pre-monsoon heat domes.',
    drivers: [
      {
        sector: 'Coal Thermal Power Generation',
        percentage: 52.4,
        annualGtCO2eq: 1.49,
        primaryMechanism: 'Sub-critical thermal power plants combustion of high-ash domestic thermal coal for electrical baseload.',
        source: 'Central Electricity Authority (CEA) CO2 Baseline Database v19 (2023) & IEA',
        inventoryYear: '2023',
        methodology: 'Tier 2 fuel-specific emission factor accounting based on plant-level coal consumption'
      },
      {
        sector: 'Agriculture, Enteric Methane & Paddy Rice',
        percentage: 21.8,
        annualGtCO2eq: 0.62,
        primaryMechanism: 'Anaerobic microbial decomposition in flooded paddy fields generating methane (CH₄) and ruminant cattle enteric fermentation.',
        source: 'ICAR / Indian National GHG Inventory to UNFCCC (BUR-3)',
        inventoryYear: '2022',
        methodology: 'IPCC 2006 Agriculture, Forestry and Other Land Use (AFOLU) Guidelines with AR6 GWP-100 of 27.2 for CH₄'
      },
      {
        sector: 'Heavy Industrial Process (Steel & Cement)',
        percentage: 15.6,
        annualGtCO2eq: 0.44,
        primaryMechanism: 'Blast furnace basic oxygen steel production and limestone calcination in Portland cement kilns.',
        source: 'WRI Climate Watch & Bureau of Energy Efficiency (BEE)',
        inventoryYear: '2023',
        methodology: 'Direct industrial process emissions (IPPU) + captive power generation'
      },
      {
        sector: 'Transport & Freight Logistics',
        percentage: 10.2,
        annualGtCO2eq: 0.30,
        primaryMechanism: 'Combustion of diesel fuel in heavy-duty commercial freight trucking and inter-city transport.',
        source: 'Ministry of Petroleum and Natural Gas (PPAC) Consumption Statistics',
        inventoryYear: '2023',
        methodology: 'Tier 1 fuel sales approach, IPCC mobile combustion factors'
      }
    ],
    impacts: [
      {
        title: 'Extreme Wet-Bulb Heat Stress & Labor Productivity Collapse',
        severity: 'critical',
        causalChain: {
          driver: 'Coal & industrial fossil combustion drives global greenhouse radiative forcing.',
          mechanism: 'Atmospheric heat dome traps monsoon moisture over Gangetic plain, elevating relative humidity above 75% at 43°C.',
          directEffect: 'Wet-bulb temperature exceeds 32°C–34°C, preventing human evaporative skin cooling via sweating.',
          humanCost: 'Projected 5.4% drop in annual working hours for manual outdoor laborers; 380M people affected.'
        },
        observedEvidence: 'Record heat domes in May-June 2024 in Delhi, Phalodi (50.5°C), and Uttar Pradesh leading to acute power grid strain and casualty surges.',
        citations: 'IPCC AR6 WGII Cross-Chapter Paper 2; Lancet Countdown on Health and Climate Change (2024)'
      },
      {
        title: 'Himalayan Third-Pole Glacial Runoff Destabilization',
        severity: 'critical',
        causalChain: {
          driver: 'Regional warming amplified at high altitudes (Elevation-Dependent Warming) exacerbated by black carbon soot deposition.',
          mechanism: 'Accelerated ablation of Gangotri and Indus basin glaciers; glacial lake volume expansion.',
          directEffect: 'Short-term catastrophic Glacial Lake Outburst Floods (GLOFs) followed by long-term 30–40% lean season river volume reductions.',
          humanCost: 'Endangers perennial freshwater and irrigation for 800M people across the Indus, Ganges, and Brahmaputra basins.'
        },
        observedEvidence: 'South Lhonak Lake glacial outburst flood in Sikkim (October 2023) destroying Chungthang hydroelectric dam.',
        citations: 'ICIMOD (International Centre for Integrated Mountain Development) Water Tower Report 2023'
      }
    ]
  },
  {
    id: 'us',
    name: 'United States',
    code: 'USA',
    lat: 37.0902,
    lng: -95.7129,
    tempAnomaly: 1.70,
    tempAnomalySource: 'NOAA National Centers for Environmental Information (NCEI) Climate at a Glance (2024)',
    totalEmissionsGt: 5.92,
    emissionsSource: 'US EPA Inventory of U.S. Greenhouse Gas Emissions and Sinks 1990–2022 (2024 Report)',
    emissionsPerCapitaTonnes: 14.85,
    parisStatus: 'Insufficient',
    parisAssessmentSource: 'Climate Action Tracker (2024 Assessment)',
    academicCitation: 'Fifth National Climate Assessment (NCA5, 2023); US EPA Climate Indicators',
    keyObservation: 'Highest cumulative historical CO2 emissions of any sovereign nation (>500 Gt since 1850). Billion-dollar weather disasters have quadrupled in frequency since 1980.',
    drivers: [
      {
        sector: 'Transportation (Highway, Freight & Aviation)',
        percentage: 38.2,
        annualGtCO2eq: 2.26,
        primaryMechanism: 'Automobile dependency, light-duty passenger trucks/SUVs, long-haul diesel trucking, and extensive domestic civil aviation.',
        source: 'US EPA Transportation & Air Quality Division',
        inventoryYear: '2023',
        methodology: 'EPA MOVES3 emissions modeling based on Federal Highway Administration vehicle miles traveled (VMT)'
      },
      {
        sector: 'Electric Power Generation (Natural Gas & Coal)',
        percentage: 30.5,
        annualGtCO2eq: 1.81,
        primaryMechanism: 'Combined-cycle natural gas turbine generation and remaining sub-bituminous coal fleet.',
        source: 'US Energy Information Administration (EIA) Monthly Energy Review',
        inventoryYear: '2023',
        methodology: 'Continuous Emission Monitoring Systems (CEMS) stack data'
      },
      {
        sector: 'Industrial Petrochemicals & Refining',
        percentage: 17.1,
        annualGtCO2eq: 1.01,
        primaryMechanism: 'Gulf Coast ethylene steam cracking, petroleum refining, and fertilizer manufacturing.',
        source: 'EPA Greenhouse Gas Reporting Program (GHGRP)',
        inventoryYear: '2023',
        methodology: 'Facility-level reported direct fuel combustion and process venting'
      },
      {
        sector: 'Fugitive Oil & Gas Methane Leaks',
        percentage: 14.2,
        annualGtCO2eq: 0.84,
        primaryMechanism: 'Pneumatic device venting, flaring, and pipeline leaks across Permian and Appalachian shale basins.',
        source: 'EDGAR v8.0 & Environmental Defense Fund (MethaneSAT satellite data)',
        inventoryYear: '2024',
        methodology: 'Top-down aerial and satellite remote sensing calibration'
      }
    ],
    impacts: [
      {
        title: 'Multi-Decadal Western Megadrought & Colorado River Basin Depletion',
        severity: 'critical',
        causalChain: {
          driver: 'Radiative forcing elevates vapor pressure deficit (atmospheric thirst).',
          mechanism: 'Reduced Rocky Mountain snowpack sublimation and increased soil moisture deficit.',
          directEffect: 'Runoff into Lake Mead and Lake Powell falls 20% below 20th-century historical averages.',
          humanCost: 'Threatens drinking water and agricultural irrigation for 40M people across 7 Western states.'
        },
        observedEvidence: 'US Bureau of Reclamation declared tier-2 water shortages, mandating mandatory municipal and agricultural rationing.',
        citations: 'USGS Water Resources Mission Area; Williams et al., Nature Climate Change (2022)'
      },
      {
        title: 'Supercharged Gulf Coast Category 4–5 Tropical Cyclones',
        severity: 'critical',
        causalChain: {
          driver: 'Thermal accumulation in oceanic upper 100 meters in Gulf of Mexico.',
          mechanism: 'Warm ocean water provides latent heat for rapid storm eyewall intensification.',
          directEffect: 'Hurricanes undergo explosive 35+ knot intensification within 24 hours prior to landfall.',
          humanCost: 'Record coastal surge, catastrophic inland flooding, and cumulative annual insured damages exceeding $60B.'
        },
        observedEvidence: 'Hurricanes Ian, Idalia, and Helene showing unprecedented rapid intensification over 30°C+ Gulf waters.',
        citations: 'NOAA Geophysical Fluid Dynamics Laboratory (GFDL) Hurricane Research Division'
      }
    ]
  },
  {
    id: 'cn',
    name: 'China',
    code: 'CHN',
    lat: 35.8617,
    lng: 104.1954,
    tempAnomaly: 2.10,
    tempAnomalySource: 'China Meteorological Administration (CMA) Blue Book on Climate Change (2024)',
    totalEmissionsGt: 12.60,
    emissionsSource: 'IEA Global Energy Review 2024 / Carbon Brief China Quarterly Inventory (2023)',
    emissionsPerCapitaTonnes: 8.85,
    parisStatus: 'Highly Insufficient',
    parisAssessmentSource: 'Climate Action Tracker (2024)',
    academicCitation: 'Chinese Academy of Sciences National Climate Assessment; IPCC AR6 WGIII',
    keyObservation: 'Responsible for ~30% of global annual carbon emissions, while simultaneously manufacturing >75% of the world solar panels and EV batteries.',
    drivers: [
      {
        sector: 'Coal-Fired Power Baseload',
        percentage: 61.2,
        annualGtCO2eq: 7.71,
        primaryMechanism: 'World largest fleet of ultra-supercritical and sub-critical coal power stations supplying industrial power.',
        source: 'National Energy Administration (NEA) Statistics & Global Energy Monitor',
        inventoryYear: '2023',
        methodology: 'Plant-level coal combustion calculations based on provincial generation statistics'
      },
      {
        sector: 'Steel, Cement & Heavy Infrastructure',
        percentage: 18.8,
        annualGtCO2eq: 2.37,
        primaryMechanism: 'Embodied carbon in colossal metallurgical coking, blast furnaces, and rotary cement kilns.',
        source: 'China Iron and Steel Association (CISA) / EDGAR v8.0',
        inventoryYear: '2023',
        methodology: 'Process emissions from limestone decarbonization plus coking coal combustion'
      },
      {
        sector: 'Urban Transport & Industrial Freight',
        percentage: 11.2,
        annualGtCO2eq: 1.41,
        primaryMechanism: 'Diesel commercial trucking corridors and petrochemical shipping logistics.',
        source: 'Ministry of Transport of the PRC Statistics',
        inventoryYear: '2023',
        methodology: 'Refined petroleum distribution accounting'
      },
      {
        sector: 'Chemicals & Nitrogen Fertilizer Runoff',
        percentage: 8.8,
        annualGtCO2eq: 1.11,
        primaryMechanism: 'Coal gasification for ammonia production and synthetic fertilizer synthesis emitting N₂O.',
        source: 'China Nitrogen Fertilizer Industry Association & IPCC',
        inventoryYear: '2023',
        methodology: 'IPCC Tier 1 chemical synthesis factors'
      }
    ],
    impacts: [
      {
        title: 'Yangtze River Basin Hydropower & Supply Chain Drying',
        severity: 'critical',
        causalChain: {
          driver: 'Subtropical high-pressure heat dome anomalies exacerbated by greenhouse heating.',
          mechanism: 'Record dry spells cut runoff into Three Gorges and upper Yangtze tributaries by 45%.',
          directEffect: 'Sichuan hydropower output plunged 50%, forcing rolling blackouts across industrial silicon and EV battery plants.',
          humanCost: '$14.2B direct economic losses and disruption to global electronic component supply chains.'
        },
        observedEvidence: 'Yangtze riverbed exposed across Wuhan and Chongqing during the catastrophic summer 2022 and 2024 heatwaves.',
        citations: 'Ministry of Water Resources of the PRC; Copernicus Climate Change Service'
      }
    ]
  },
  {
    id: 'br',
    name: 'Brazil & Amazon Basin',
    code: 'BRA',
    lat: -14.235,
    lng: -51.9253,
    tempAnomaly: 1.95,
    tempAnomalySource: 'INPE (National Institute for Space Research) & Copernicus ERA5 (2024)',
    totalEmissionsGt: 2.10,
    emissionsSource: 'SEEG (Greenhouse Gas Emission and Removal Estimating System, 2024)',
    emissionsPerCapitaTonnes: 6.90,
    parisStatus: 'Insufficient',
    parisAssessmentSource: 'Climate Action Tracker (2024)',
    academicCitation: 'INPE PRODES/DETER satellite monitoring; Lovejoy & Nobre Amazon Tipping Point Studies',
    keyObservation: 'Southeastern Amazonia has transitioned from a net carbon sink into a net carbon emitter due to deforestation, logging, and warming.',
    drivers: [
      {
        sector: 'Land-Use Change & Amazon Deforestation',
        percentage: 54.0,
        annualGtCO2eq: 1.13,
        primaryMechanism: 'Slash-and-burn clearing of ancient tropical rainforest canopy for cattle pasture and soybean export monoculture.',
        source: 'INPE PRODES Satellite Imagery & SEEG 2024',
        inventoryYear: '2023',
        methodology: 'Biomass loss calculation based on satellite clear-cut polygon analysis'
      },
      {
        sector: 'Enteric Fermentation (Cattle Herd)',
        percentage: 24.2,
        annualGtCO2eq: 0.51,
        primaryMechanism: 'World largest commercial beef herd emitting potent ruminant methane (CH₄).',
        source: 'IBGE (Brazilian Institute of Geography and Statistics) Agricultural Census',
        inventoryYear: '2023',
        methodology: 'Tier 2 livestock methane modeling, IPCC AR6 GWP-100'
      },
      {
        sector: 'Energy & Thermoelectric Backup',
        percentage: 21.8,
        annualGtCO2eq: 0.46,
        primaryMechanism: 'Diesel transport logistics and fossil gas thermoelectric plant dispatches during reservoir droughts.',
        source: 'EPE (Energy Research Office) Brazilian Energy Balance',
        inventoryYear: '2023',
        methodology: 'Fuel combustion inventory'
      }
    ],
    impacts: [
      {
        title: 'Amazon Flying Rivers Collapse & Tipping Point Savannization',
        severity: 'critical',
        causalChain: {
          driver: 'Tree felling cuts tree evapotranspiration (which recycles water 5–6 times across the continent).',
          mechanism: 'Rainfall drops below 1,500 mm threshold; dry season extends beyond 4 months.',
          directEffect: 'Deep forest trees die standing; canopy becomes prone to wildfire conflagrations.',
          humanCost: 'Potential release of 120 Gt of stored carbon; catastrophic collapse of South American rain cycle.'
        },
        observedEvidence: 'Historic 2023–2024 Amazon drought stranding river communities along the Rio Negro and Solimões with record low water levels.',
        citations: 'Science (Nobre et al., 2022); Nature (Gatti et al., Amazonia Carbon Balance, 2021)'
      }
    ]
  }
];

export function getCountryProfile(id: string): ScientificCountryProfile | undefined {
  return SCIENTIFIC_COUNTRY_INTELLIGENCE.find((c) => c.id === id);
}
