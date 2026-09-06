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
    // Pillar 1: Cumulative Historical Contribution
    cumulativeEmissionsGt: 58.4,
    cumulativeSharePercent: 3.4,
    cumulativeSource: 'Global Carbon Project (1850–2023 Territorial Cumulative CO₂)',
    // Pillar 2: Observed Climate Exposure & Vulnerability
    ndGainVulnerabilityScore: 54.2,
    ndGainRank: '125 of 185 countries',
    regionalWarmingRate: '1.2x global average (amplified over Third Pole)',
    vulnerabilityCategory: 'High',
    attributionGuardrail: 'Attribution Notice: India accounts for ~3.4% of historical emissions despite housing 17.8% of global population. High geographic exposure to tropical heat domes and monsoon reliance creates disproportionate humanitarian vulnerability.',
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
          driver: 'Global greenhouse radiative forcing intensifies continental thermal low pressures.',
          mechanism: 'Atmospheric heat dome traps humid maritime air over Gangetic plain, elevating relative humidity above 70% at 43°C+.',
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
          driver: 'Elevation-Dependent Warming (EDW) amplified by regional black carbon soot deposition on snowpack.',
          mechanism: 'Accelerated ablation of Gangotri, Chenab, and Indus basin glaciers; glacial lake volume expansion.',
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
    // Pillar 1: Cumulative Historical Contribution
    cumulativeEmissionsGt: 520.2,
    cumulativeSharePercent: 24.6,
    cumulativeSource: 'Global Carbon Project / Our World in Data (World highest cumulative emitter)',
    // Pillar 2: Observed Climate Exposure & Vulnerability
    ndGainVulnerabilityScore: 28.4,
    ndGainRank: '19 of 185 countries',
    regionalWarmingRate: '1.3x global average (higher in Alaska and Western interior)',
    vulnerabilityCategory: 'Moderate',
    attributionGuardrail: 'Attribution Notice: Highest cumulative emitter in history (nearly 25% of all historical CO₂). High economic adaptive capacity softens ND-GAIN vulnerability score, yet regional disaster frequency has grown 400% since 1980.',
    parisStatus: 'Insufficient',
    parisAssessmentSource: 'Climate Action Tracker (2024 Assessment)',
    academicCitation: 'Fifth National Climate Assessment (NCA5, 2023); US EPA Climate Indicators',
    keyObservation: 'Highest cumulative historical CO₂ emissions of any sovereign nation (>520 Gt since 1850). Billion-dollar weather disasters have quadrupled in frequency since 1980.',
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
    // Pillar 1: Cumulative Historical Contribution
    cumulativeEmissionsGt: 260.5,
    cumulativeSharePercent: 14.2,
    cumulativeSource: 'Global Carbon Project (Second highest cumulative emitter globally)',
    // Pillar 2: Observed Climate Exposure & Vulnerability
    ndGainVulnerabilityScore: 42.1,
    ndGainRank: '64 of 185 countries',
    regionalWarmingRate: '1.4x global average (faster in Tibetan Plateau and northern interior)',
    vulnerabilityCategory: 'Moderate',
    attributionGuardrail: 'Attribution Notice: Largest current annual emitter (~30% of global total), though per-capita emissions remain below US/Australia. Rapid clean energy installations (>50% of world total) coexist with extensive domestic coal power fleet.',
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
        observedEvidence: 'Yangtze riverbed exposed across Wuhan and Chongqing during catastrophic summer heatwaves.',
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
    // Pillar 1: Cumulative Historical Contribution
    cumulativeEmissionsGt: 38.2,
    cumulativeSharePercent: 2.1,
    cumulativeSource: 'Global Carbon Project & INPE (Fossil fuel + Land-Use Change)',
    // Pillar 2: Observed Climate Exposure & Vulnerability
    ndGainVulnerabilityScore: 45.8,
    ndGainRank: '82 of 185 countries',
    regionalWarmingRate: '1.4x global average across Amazonian and Cerrado biomes',
    vulnerabilityCategory: 'High',
    attributionGuardrail: 'Attribution Notice: Unlike fossil-heavy industrial economies, >50% of Brazilian emissions stem from land-use conversion and cattle farming. The Amazon serves as a critical planetary biome; regional drying directly threatens continental precipitation cycles.',
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
  },
  {
    id: 'de',
    name: 'European Union (Germany)',
    code: 'DEU',
    lat: 51.1657,
    lng: 10.4515,
    tempAnomaly: 2.25,
    tempAnomalySource: 'Copernicus Climate Change Service / DWD German Weather Service',
    totalEmissionsGt: 0.67,
    emissionsSource: 'UBA German Federal Environment Agency & European Environment Agency (EEA)',
    emissionsPerCapitaTonnes: 7.20,
    cumulativeEmissionsGt: 95.0,
    cumulativeSharePercent: 5.4,
    cumulativeSource: 'Global Carbon Project (Germany alone ~5.4%; Entire EU-27 ~17.0%)',
    ndGainVulnerabilityScore: 23.5,
    ndGainRank: '8 of 185 countries',
    regionalWarmingRate: '2.1x global average (Europe is the fastest warming continent)',
    vulnerabilityCategory: 'Low',
    attributionGuardrail: 'Attribution Notice: Early industrial pioneer with high cumulative historical contribution. Extremely high adaptive infrastructure and capital reserves moderate direct human mortality, despite Europe warming twice as fast as the global average.',
    parisStatus: 'Almost Sufficient',
    parisAssessmentSource: 'Climate Action Tracker (EU Assessment 2024)',
    academicCitation: 'Copernicus European State of the Climate 2023; IPCC AR6 WGII Chapter 13 (Europe)',
    keyObservation: 'Europe is warming twice as fast as the global average since the 1980s, driving catastrophic Alpine glacier retreat and Rhine shipping blockades.',
    drivers: [
      {
        sector: 'Automotive & Heavy Highway Freight',
        percentage: 33.2,
        annualGtCO2eq: 0.22,
        primaryMechanism: 'Extensive motorway transit, passenger vehicles, and trans-European diesel freight logistics.',
        source: 'Federal Ministry for Digital and Transport (BMDV)',
        inventoryYear: '2023',
        methodology: 'Fuel consumption and mileage accounting'
      },
      {
        sector: 'Lignite Coal & Natural Gas Power',
        percentage: 29.5,
        annualGtCO2eq: 0.20,
        primaryMechanism: 'Brown coal opencast mining combustion in western/eastern basins and natural gas peakers.',
        source: 'Fraunhofer ISE Energy Charts',
        inventoryYear: '2023',
        methodology: 'CEMS stack emission telemetry'
      },
      {
        sector: 'Building Thermal Heating & Gas Boilers',
        percentage: 21.0,
        annualGtCO2eq: 0.14,
        primaryMechanism: 'Residential fossil gas and light heating oil heating systems during prolonged winters.',
        source: 'BDEW German Association of Energy and Water Industries',
        inventoryYear: '2023',
        methodology: 'Municipal gas consumption data'
      },
      {
        sector: 'Heavy Chemicals & High-Precision Metallurgy',
        percentage: 16.3,
        annualGtCO2eq: 0.11,
        primaryMechanism: 'Process emissions from chemical feedstocks and primary steel making.',
        source: 'VCI German Chemical Industry Association',
        inventoryYear: '2023',
        methodology: 'EU ETS verified emissions'
      }
    ],
    impacts: [
      {
        title: 'Rhine River Low Flow Shipping Paralyzation',
        severity: 'critical',
        causalChain: {
          driver: 'Summer meteorological heat domes and reduced Alpine meltwater contribution.',
          mechanism: 'Kaub gauge water depth drops below 40 cm, preventing laden bulk freight barges from navigating.',
          directEffect: 'Crippled supply of chemical feedstocks, coal, and finished goods along Europe’s busiest commercial waterway.',
          humanCost: '0.4%–0.5% drag on quarterly German manufacturing GDP.'
        },
        observedEvidence: 'Historic low water levels at Kaub in August 2022 and late 2023 restricting barge capacity by 65%.',
        citations: 'Federal Institute of Hydrology (BfG); Nature Communications (2023)'
      }
    ]
  },
  {
    id: 'ng',
    name: 'Nigeria / West Africa',
    code: 'NGA',
    lat: 9.082,
    lng: 8.6753,
    tempAnomaly: 1.75,
    tempAnomalySource: 'NiMet Nigerian Meteorological Agency / ERA5 Reanalysis',
    totalEmissionsGt: 0.35,
    emissionsSource: 'Federal Ministry of Environment & EDGAR v8.0',
    emissionsPerCapitaTonnes: 1.60,
    cumulativeEmissionsGt: 5.2,
    cumulativeSharePercent: 0.28,
    cumulativeSource: 'Global Carbon Project (Under 0.3% of global historical emissions)',
    ndGainVulnerabilityScore: 61.8,
    ndGainRank: '160 of 185 countries',
    regionalWarmingRate: '1.3x global average (amplified in northern Sahel margin)',
    vulnerabilityCategory: 'Extreme',
    attributionGuardrail: 'Attribution Notice: Stark climate injustice profile. Responsible for less than 0.3% of historical global greenhouse emissions, yet ranks among the top 15% most vulnerable territories globally due to low infrastructural adaptive buffer.',
    parisStatus: 'Insufficient',
    parisAssessmentSource: 'Climate Action Tracker (2024)',
    academicCitation: 'Nigeria Third National Communication to UNFCCC; IPCC AR6 WGII Chapter 9 (Africa)',
    keyObservation: 'Contributes less than 0.3% of global historical emissions, yet faces catastrophic Sahelian desertification and coastal flooding in Lagos.',
    drivers: [
      {
        sector: 'Associated Gas Flaring & Oil Extraction',
        percentage: 38.0,
        annualGtCO2eq: 0.13,
        primaryMechanism: 'Combustion and routine venting of associated gas in Niger Delta oil extraction fields.',
        source: 'World Bank Global Gas Flaring Reduction Partnership (GGFR)',
        inventoryYear: '2023',
        methodology: 'VIIRS satellite nighttime flare radiance processing'
      },
      {
        sector: 'Traditional Biomass & Cooking Firewood',
        percentage: 35.0,
        annualGtCO2eq: 0.12,
        primaryMechanism: 'Wood fuel and charcoal combustion for domestic cooking across 150M+ non-electrified households.',
        source: 'FAO & Nigerian Energy Commission',
        inventoryYear: '2022',
        methodology: 'Biomass combustion factors'
      },
      {
        sector: 'Decentralized Diesel & Petrol Backup Generators',
        percentage: 17.0,
        annualGtCO2eq: 0.06,
        primaryMechanism: 'Millions of small, inefficient personal combustion generators compensating for national electrical grid unreliability.',
        source: 'Access to Energy Institute (A2EI)',
        inventoryYear: '2023',
        methodology: 'Refined fuel import and generator survey modeling'
      },
      {
        sector: 'Savannah Agricultural Burning',
        percentage: 10.0,
        annualGtCO2eq: 0.04,
        primaryMechanism: 'Seasonal dry season slash-and-burn pastoralist clearing.',
        source: 'NASA FIRMS & IPCC AFOLU',
        inventoryYear: '2023',
        methodology: 'Satellite fire scar mapping'
      }
    ],
    impacts: [
      {
        title: 'Lake Chad 90% Water Desiccation & Sahelian Conflict',
        severity: 'critical',
        causalChain: {
          driver: 'Atmospheric drying and shifting West African Monsoon precipitation belts.',
          mechanism: 'Lake Chad surface area contracted from 25,000 km² to under 2,500 km².',
          directEffect: 'Collapse of fishing, cattle pastoralism, and irrigated agricultural livelihoods for 30 million inhabitants.',
          humanCost: 'Mass displacement, severe food insecurity, and exacerbation of regional insurgencies.'
        },
        observedEvidence: 'Lake Chad Basin Commission long-term hydrographic surveys confirming critical water depletion.',
        citations: 'Lake Chad Basin Commission (LCBC); UNEP Global Environmental Alert Service'
      }
    ]
  },
  {
    id: 'tuv',
    name: 'Small Island States (Tuvalu)',
    code: 'TUV',
    lat: -7.1095,
    lng: 177.6493,
    tempAnomaly: 1.35,
    tempAnomalySource: 'Tuvalu Meteorological Service / Pacific Climate Change Science Program',
    totalEmissionsGt: 0.0001,
    emissionsSource: 'UNFCCC National Greenhouse Gas Inventory',
    emissionsPerCapitaTonnes: 0.90,
    cumulativeEmissionsGt: 0.002,
    cumulativeSharePercent: 0.0001,
    cumulativeSource: 'UNFCCC Carbon Registry (<0.0001% of global cumulative total)',
    ndGainVulnerabilityScore: 68.5,
    ndGainRank: '175 of 185 countries',
    regionalWarmingRate: '1.0x global average, but sea level rise is 1.5x global mean rate',
    vulnerabilityCategory: 'Extreme',
    attributionGuardrail: 'Attribution Notice: Pure victim of global emissions. With a total historical contribution approaching zero, Tuvalu faces complete territorial submergence by 2100 under current intermediate emissions scenarios.',
    parisStatus: '1.5°C Compatible',
    parisAssessmentSource: 'Alliance of Small Island States (AOSIS)',
    academicCitation: 'IPCC AR6 Cross-Chapter Paper 5 (Small Islands); Tuvalu National Adaptation Programme of Action',
    keyObservation: 'Highest point in the nation is 4.6 meters above sea level; king tides now regularly submerge critical island infrastructure and salinize taro pits.',
    drivers: [
      {
        sector: 'Domestic Marine Transport & Shipping',
        percentage: 62.0,
        annualGtCO2eq: 0.00006,
        primaryMechanism: 'Outboard marine diesel engines powering inter-atoll transit.',
        source: 'Tuvalu Department of Energy',
        inventoryYear: '2022',
        methodology: 'Fuel import tracking'
      },
      {
        sector: 'Diesel Island Generator Grid',
        percentage: 38.0,
        annualGtCO2eq: 0.00004,
        primaryMechanism: 'Diesel electricity generators for basic municipal services.',
        source: 'Tuvalu Electricity Corporation (TEC)',
        inventoryYear: '2022',
        methodology: 'Fuel consumption telemetry'
      }
    ],
    impacts: [
      {
        title: 'Complete Territorial Inundation & Statelessness Risk',
        severity: 'critical',
        causalChain: {
          driver: 'Thermal expansion of warming tropical ocean waters and polar ice sheet melting.',
          mechanism: 'Local sea levels rising at 3.9 mm/year, outstripping coral atoll vertical accretion rates.',
          directEffect: 'Regular saltwater overtopping during king tides; total loss of freshwater aquifers.',
          humanCost: 'Potential displacement of entire national population of 11,200 citizens; existential sovereignty threat.'
        },
        observedEvidence: 'King tides in Funafuti flooding the national airport runway and submerging residential compounds.',
        citations: 'Nature Climate Change (Storey et al.); IPCC AR6 Special Report on the Ocean and Cryosphere (SROCC)'
      }
    ]
  }
];

export function getCountryProfile(id: string): ScientificCountryProfile | undefined {
  return SCIENTIFIC_COUNTRY_INTELLIGENCE.find((c) => c.id === id);
}
