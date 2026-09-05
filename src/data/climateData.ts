export interface CountryClimateProfile {
  id: string;
  name: string;
  code: string;
  lat: number;
  lng: number;
  tempAnomaly: number; // in °C above pre-industrial baseline
  emissionsGt: number; // annual CO2 eq in GigaTonnes
  emissionsPerCapita: number; // tonnes/person
  vulnerabilityRank: 'Critical' | 'High' | 'Moderate' | 'Severe';
  riskScore: number; // 0 - 100
  causes: {
    category: string;
    percentage: number;
    description: string;
  }[];
  impacts: {
    title: string;
    severity: 'critical' | 'high' | 'moderate';
    description: string;
    projectedLoss: string;
  }[];
  keyFact: string;
  parisCompliance: 'Critically Insufficient' | 'Highly Insufficient' | 'Insufficient' | 'Almost Sufficient' | '1.5°C Compatible';
}

export const COUNTRY_CLIMATE_DATA: CountryClimateProfile[] = [
  {
    id: 'in',
    name: 'India',
    code: 'IND',
    lat: 20.5937,
    lng: 78.9629,
    tempAnomaly: 1.85,
    emissionsGt: 2.85,
    emissionsPerCapita: 2.0,
    vulnerabilityRank: 'Critical',
    riskScore: 92,
    causes: [
      { category: 'Coal Power & Grids', percentage: 52, description: 'Rapid industrialization reliant on domestic thermal coal generation.' },
      { category: 'Agriculture & Livestock', percentage: 22, description: 'Paddy rice cultivation methane emissions and extensive livestock herds.' },
      { category: 'Heavy Industry & Cement', percentage: 16, description: 'High-growth steel, cement, and construction infrastructure boom.' },
      { category: 'Transport & Diesel Logistics', percentage: 10, description: 'Dense urban vehicle fleets and heavy inter-state diesel trucks.' }
    ],
    impacts: [
      { title: 'Lethal Wet-Bulb Heatwaves', severity: 'critical', description: 'Pre-monsoon temperatures exceeding 48°C pushing humidity beyond human survivability thresholds across northern plains.', projectedLoss: '6.4% GDP loss by 2030' },
      { title: 'Himalayan Glacial Depletion', severity: 'critical', description: 'Accelerated thaw threatening critical freshwater supply for 800M people dependent on Indus and Ganges basins.', projectedLoss: '35% river volume drop by 2060' },
      { title: 'Erratic Monsoons & Flash Floods', severity: 'high', description: 'Violent cloudbursts interspersed with multi-week agricultural drought spells ruining harvest cycles.', projectedLoss: '18% drop in kharif cereal yields' }
    ],
    keyFact: 'Over 380 million outdoor manual laborers face dangerous heat stress during peak pre-monsoon heat domes.',
    parisCompliance: 'Highly Insufficient'
  },
  {
    id: 'cn',
    name: 'China',
    code: 'CHN',
    lat: 35.8617,
    lng: 104.1954,
    tempAnomaly: 2.1,
    emissionsGt: 12.6,
    emissionsPerCapita: 8.8,
    vulnerabilityRank: 'High',
    riskScore: 84,
    causes: [
      { category: 'Industrial Power & Coal', percentage: 61, description: 'World largest coal fleet powering global manufacturing and export infrastructure.' },
      { category: 'Steel & Cement Construction', percentage: 19, description: 'Embodied carbon in colossal high-speed rail, mega-cities, and highway construction.' },
      { category: 'Urban Transport & Transit', percentage: 11, description: 'Massive logistics fleets despite world-leading domestic electric vehicle deployment.' },
      { category: 'Chemical & Fertilizer Runoff', percentage: 9, description: 'High-intensity nitrogen fertilizer usage and industrial chemical manufacturing.' }
    ],
    impacts: [
      { title: 'Yangtze River Basin Droughts', severity: 'critical', description: 'Record drying cutting hydro-power output and shuttering microchip manufacturing corridors.', projectedLoss: '$14B direct industrial disruptions' },
      { title: 'Pearl River Delta Sea Inundation', severity: 'high', description: 'Typhoon storm surges threatening coastal megacities Shenzhen, Guangzhou, and Hong Kong.', projectedLoss: '$250B coastal asset exposure by 2050' },
      { title: 'Northern Desertification', severity: 'high', description: 'Gobi desert expansion pushing dust storms deep into Beijing and Yellow River agricultural tracts.', projectedLoss: '12M tons annual grain risk' }
    ],
    keyFact: 'Accounts for ~30% of global annual carbon output, while also installing over 55% of the world solar panels and wind turbines.',
    parisCompliance: 'Highly Insufficient'
  },
  {
    id: 'us',
    name: 'United States',
    code: 'USA',
    lat: 37.0902,
    lng: -95.7129,
    tempAnomaly: 1.7,
    emissionsGt: 5.9,
    emissionsPerCapita: 14.9,
    vulnerabilityRank: 'High',
    riskScore: 78,
    causes: [
      { category: 'Transportation & Aviation', percentage: 38, description: 'Car-centric suburban sprawl, interstate trucking, and massive domestic air travel.' },
      { category: 'Natural Gas & Coal Electricity', percentage: 31, description: 'Fracked shale gas and lingering fossil plants providing electric grid baseload.' },
      { category: 'Commercial & Residential HVAC', percentage: 17, description: 'Extensive seasonal air conditioning and gas furnace heating across climate extremes.' },
      { category: 'Industrial Agriculture & Cattle', percentage: 14, description: 'Corn-ethanol monocropping, cattle feedlots, and methane leakage across oil basins.' }
    ],
    impacts: [
      { title: 'Mega-Drought & Colorado River Depletion', severity: 'critical', description: 'Lake Mead and Lake Powell near dead-pool elevations, restricting water for 40M citizens and farmland.', projectedLoss: 'Multi-billion dollar water cuts in 7 states' },
      { title: 'Catastrophic Gulf & Atlantic Hurricanes', severity: 'critical', description: 'Warmer ocean waters supercharging Category 4-5 hurricanes with 30% higher rainfall density.', projectedLoss: '$50B+ average annual disaster costs' },
      { title: 'Western Wildfire Firestorms', severity: 'high', description: 'Arid forests prolonging fire seasons, incinerating millions of acres in CA, OR, and WA.', projectedLoss: 'Toxic smoke choking 90M residents' }
    ],
    keyFact: 'Highest cumulative historical CO2 emissions on Earth—over 500 billion metric tons emitted since 1850.',
    parisCompliance: 'Insufficient'
  },
  {
    id: 'br',
    name: 'Brazil & Amazon Basin',
    code: 'BRA',
    lat: -14.235,
    lng: -51.9253,
    tempAnomaly: 1.95,
    emissionsGt: 2.1,
    emissionsPerCapita: 6.9,
    vulnerabilityRank: 'Severe',
    riskScore: 89,
    causes: [
      { category: 'Amazon Deforestation', percentage: 54, description: 'Illegal forest clearing and slash-and-burn for cattle pastures and soybean exports.' },
      { category: 'Enteric Methane (Cattle)', percentage: 24, description: 'Largest commercial cattle herd on Earth releasing potent ruminant methane.' },
      { category: 'Transport & Thermal Backup', percentage: 22, description: 'Diesel logistics and emergency thermoelectric plants during hydro droughts.' }
    ],
    impacts: [
      { title: 'Amazon Tipping Point Savannization', severity: 'critical', description: 'Deforestation nearing 20-25% threshold where rain cycle collapses, turning tropical rainforest to dry scrub.', projectedLoss: 'Release of 120 Gt stored carbon into atmosphere' },
      { title: 'Pantanal Wetland Conflagrations', severity: 'critical', description: 'Prolonged droughts turning the worlds largest wetland into catastrophic wildfire zones.', projectedLoss: '17M vertebrates perished in recent fires' },
      { title: 'Hydroelectric Generation Failure', severity: 'high', description: 'Low river levels threatening 65% of national electric power generation.', projectedLoss: 'Severe power rationing and economic slowdown' }
    ],
    keyFact: 'Parts of the south-eastern Amazon have already crossed the tipping point from net carbon sponge into a net carbon emitter.',
    parisCompliance: 'Insufficient'
  },
  {
    id: 'de',
    name: 'European Union (Germany)',
    code: 'DEU',
    lat: 51.1657,
    lng: 10.4515,
    tempAnomaly: 2.25,
    emissionsGt: 2.9,
    emissionsPerCapita: 7.2,
    vulnerabilityRank: 'Moderate',
    riskScore: 71,
    causes: [
      { category: 'Automotive & Freight Transit', percentage: 33, description: 'Intense highway transit, commercial trucking, and aviation corridors.' },
      { category: 'Gas & Lignite Coal Power', percentage: 29, description: 'Fossil gas baseload and remaining brown coal opencast mines.' },
      { category: 'Building Heat & Domestic Gas', percentage: 21, description: 'Extensive fossil fuel domestic heating boilers across winter months.' },
      { category: 'Industrial Dairy & Fertilizer', percentage: 17, description: 'Nitrous oxide and methane from intensive agro-industrial operations.' }
    ],
    impacts: [
      { title: 'Rhine River Navigation Halt', severity: 'high', description: 'Low water levels grounding cargo barges, crippling fuel and chemical supply chains.', projectedLoss: '0.5% drag on European industrial GDP' },
      { title: 'Alpine Glacial Extinction', severity: 'critical', description: 'Swiss and Austrian glaciers lost over 10% of their total ice volume in just 24 months.', projectedLoss: 'Disruption of Rhine and Danube headwaters' },
      { title: 'Excess Heat Mortality', severity: 'high', description: 'Prolonged summer heat domes causing over 60,000 heat-related deaths in single seasons.', projectedLoss: 'Hospital system overload and urban stress' }
    ],
    keyFact: 'Europe is the fastest-warming continent on Earth, warming at more than twice the global average rate since 1980.',
    parisCompliance: 'Almost Sufficient'
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AUS',
    lat: -25.2744,
    lng: 133.7751,
    tempAnomaly: 1.6,
    emissionsGt: 0.52,
    emissionsPerCapita: 15.4,
    vulnerabilityRank: 'High',
    riskScore: 82,
    causes: [
      { category: 'Coal & LNG Gas Exports', percentage: 48, description: 'Massive open-cut coal mining, gas fracking, and energy liquefaction.' },
      { category: 'Transport & Heavy Haulage', percentage: 24, description: 'Vast distances, high truck traffic, and large personal vehicle consumption.' },
      { category: 'Beef Pastoral Farming', percentage: 16, description: 'Extensive outback livestock grazing generating agricultural methane.' },
      { category: 'Land Clearing & Native Bush Removal', percentage: 12, description: 'Clearing of native woodland in Queensland and New South Wales.' }
    ],
    impacts: [
      { title: 'Great Barrier Reef Mass Bleaching', severity: 'critical', description: 'Repeated marine heatwaves causing catastrophic coral mortality across 2,300 km of reef.', projectedLoss: '64,000 tourism jobs & 90% shallow coral loss' },
      { title: 'Megafire "Black Summer" Recurrence', severity: 'critical', description: 'Extreme pyro-cumulonimbus firestorms incinerating millions of hectares.', projectedLoss: '$100B in economic and health damages' },
      { title: 'Murray-Darling Basin Aridity', severity: 'high', description: 'Critical water collapse and mass fish kills in national agricultural heartland.', projectedLoss: '40% reduction in irrigated agriculture' }
    ],
    keyFact: 'Second highest per-capita emissions in the OECD; ocean waters surrounding Australia are warming 3x faster than average.',
    parisCompliance: 'Insufficient'
  },
  {
    id: 'id',
    name: 'Indonesia',
    code: 'IDN',
    lat: -0.7893,
    lng: 113.9213,
    tempAnomaly: 1.4,
    emissionsGt: 1.25,
    emissionsPerCapita: 4.5,
    vulnerabilityRank: 'Severe',
    riskScore: 90,
    causes: [
      { category: 'Peatland Drainage & Palm Oil', percentage: 55, description: 'Draining tropical peat swamp forests for palm oil monoculture, venting ancient carbon.' },
      { category: 'Captive Coal Power Stations', percentage: 25, description: 'New off-grid coal plants built for nickel smelting and metal processing.' },
      { category: 'Urban Transport & Transit', percentage: 12, description: 'Dense motorbike and diesel vehicle fleets in urban centers.' },
      { category: 'Transboundary Forest Haze', percentage: 8, description: 'Intentional agricultural burning triggering widespread toxic smoke blankets.' }
    ],
    impacts: [
      { title: 'Jakarta Land Sinking & Sea Rise', severity: 'critical', description: 'Combination of sea level rise and ground subsidence sinking Jakarta 25cm/yr, forcing national capital relocation.', projectedLoss: '$33B capital relocation cost' },
      { title: 'Coral Triangle Acidification', severity: 'high', description: 'Ocean heating destroying marine sanctuaries that nourish 120M coastal residents.', projectedLoss: 'Collapse of local artisanal fisheries' },
      { title: 'Peat Carbon Bombs', severity: 'critical', description: 'Subterranean peat fires burning undetected for months, releasing gigatons of CO2.', projectedLoss: 'Regional air quality emergency' }
    ],
    keyFact: 'Tropical peatlands store up to 20 times more carbon than ordinary rainforest soil; once drained, they burn for months.',
    parisCompliance: 'Critically Insufficient'
  },
  {
    id: 'ng',
    name: 'Nigeria / West Africa',
    code: 'NGA',
    lat: 9.082,
    lng: 8.6753,
    tempAnomaly: 1.75,
    emissionsGt: 0.35,
    emissionsPerCapita: 1.6,
    vulnerabilityRank: 'Critical',
    riskScore: 95,
    causes: [
      { category: 'Gas Flaring & Oil Spills', percentage: 38, description: 'Petroleum extraction flaring millions of cubic meters of associated gas daily.' },
      { category: 'Charcoal & Firewood Logging', percentage: 35, description: 'Reliance on wood fuel and charcoal for daily cooking by over 150M citizens.' },
      { category: 'Decentralized Diesel Gensets', percentage: 17, description: 'Erratic electrical grid compelling widespread use of gasoline/diesel generators.' },
      { category: 'Savannah Bush Burning', percentage: 10, description: 'Seasonal slash burning and cattle pastoralist land clearance.' }
    ],
    impacts: [
      { title: 'Lake Chad 90% Water Loss', severity: 'critical', description: 'Desiccation displacing 30 million people, fueling famine and regional insurgencies.', projectedLoss: 'Mass climate refugee displacement' },
      { title: 'Sahel Desertification', severity: 'critical', description: 'Sahara desert marching southward at 1.4 km annually, destroying farmable soil.', projectedLoss: 'Intensifying farmer-herder resource warfare' },
      { title: 'Lagos Sea Surge Flooding', severity: 'high', description: 'Coastal storms flooding Africa’s biggest metropolis with sewage-tainted ocean waters.', projectedLoss: '$15B infrastructure exposure' }
    ],
    keyFact: 'Contributes less than 1% of global historical emissions, yet ranks among the top 5 most vulnerable geographic zones on Earth.',
    parisCompliance: 'Insufficient'
  },
  {
    id: 'ru',
    name: 'Russia / Siberia',
    code: 'RUS',
    lat: 61.524,
    lng: 105.3188,
    tempAnomaly: 3.1,
    emissionsGt: 2.1,
    emissionsPerCapita: 14.5,
    vulnerabilityRank: 'High',
    riskScore: 80,
    causes: [
      { category: 'Fossil Gas & Pipeline Leaks', percentage: 46, description: 'Vast Siberian gas extraction, pipeline venting, and fugitive methane releases.' },
      { category: 'Heavy Metallurgy & Mining', percentage: 28, description: 'Smelting complexes in Norilsk and coal mining in Kuzbass.' },
      { category: 'Thermal District Heating', percentage: 16, description: 'Steam heating plants powered by heavy fuel oil and coal in freezing cities.' },
      { category: 'Boreal Taiga Wildfires', percentage: 10, description: 'Mega-fires burning millions of hectares of coniferous forest canopy.' }
    ],
    impacts: [
      { title: 'Permafrost Collapse & Buckled Cities', severity: 'critical', description: 'Melting permafrost causing apartment buildings, pipelines, and airstrips to deform and crack.', projectedLoss: '$67B Arctic building damage by 2050' },
      { title: 'Explosive Methane Craters', severity: 'critical', description: 'Subterranean gas blowouts creating 50-meter deep explosive craters in Yamal tundra.', projectedLoss: 'Irreversible carbon feedback cycle' },
      { title: 'Soot Cloud Arctic Dimming', severity: 'high', description: 'Wildfire black carbon settling over Arctic sea ice, multiplying solar heat absorption.', projectedLoss: 'Accelerated sea-ice disappearance' }
    ],
    keyFact: 'Siberia is warming nearly 3 times faster than the rest of the planet, unlocking ancient greenhouse gases locked for millennia.',
    parisCompliance: 'Critically Insufficient'
  },
  {
    id: 'gl',
    name: 'Greenland & Arctic',
    code: 'GRL',
    lat: 71.7069,
    lng: -42.6043,
    tempAnomaly: 3.8,
    emissionsGt: 0.001,
    emissionsPerCapita: 0.2,
    vulnerabilityRank: 'Critical',
    riskScore: 99,
    causes: [
      { category: 'Black Carbon Soot Drift', percentage: 65, description: 'Soot particles from northern wildfires darkening pristine white ice surfaces.' },
      { category: 'Circumpolar Marine Shipping', percentage: 35, description: 'Commercial cargo freighters and oil tankers using opening polar straits.' }
    ],
    impacts: [
      { title: '30 Million Tons Ice Loss Per Hour', severity: 'critical', description: 'Greenland ice sheet melting at record velocity, directly driving global sea level rise.', projectedLoss: '7.2 meters global sea rise if totally melted' },
      { title: 'Albedo Feedback Loop', severity: 'critical', description: 'Dark ocean water replacing reflective white ice, absorbing 90% of incoming solar heat.', projectedLoss: 'Planetary heat absorption amplification' },
      { title: 'AMOC Ocean Conveyor Slowdown', severity: 'critical', description: 'Cold freshwater influx disrupting the Atlantic Gulf Stream conveyor belt.', projectedLoss: 'Catastrophic climate disruption in Europe & Americas' }
    ],
    keyFact: 'Greenland shed over 5,000 billion tons of ice in the past 20 years alone—enough water to cover the entire UK under 20 meters of water.',
    parisCompliance: '1.5°C Compatible'
  }
];
