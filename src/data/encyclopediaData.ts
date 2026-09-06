export type TopicCategory = 
  | 'ALL'
  | 'PHYSICAL_BASIS'
  | 'GREENHOUSE_GASES'
  | 'CRYOSPHERE_OCEANS'
  | 'TIPPING_POINTS'
  | 'EXTREME_WEATHER'
  | 'EMISSIONS_INVENTORY'
  | 'IPCC_SCENARIOS'
  | 'MITIGATION_SOLUTIONS'
  | 'GLOSSARY';

export interface EncyclopediaArticle {
  id: string;
  category: TopicCategory;
  title: string;
  subtitle: string;
  leadParagraph: string;
  sections: {
    heading: string;
    content: string[];
    formula?: string;
    table?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      type: 'info' | 'warning' | 'tip';
      title: string;
      text: string;
    };
  }[];
  keyFacts: { label: string; value: string; source: string }[];
  references: string[];
}

export const CLIMATE_ARTICLES: EncyclopediaArticle[] = [
  {
    id: 'physical-science-basis',
    category: 'PHYSICAL_BASIS',
    title: 'Physical Science Basis of Global Warming',
    subtitle: 'Atmospheric Radiative Transfer, Greenhouse Effect Physics & Climate Sensitivity',
    leadParagraph: 'Global warming is fundamentally governed by planetary radiative energy balance. Earth receives high-energy shortwave solar radiation and re-radiates lower-energy longwave infrared radiation back into space. Greenhouse gases selectively absorb this outgoing infrared spectrum and re-emit it in all directions, warming the troposphere and planetary surface.',
    sections: [
      {
        heading: '1. Radiative Energy Balance & Blackbody Physics',
        content: [
          'Without an atmospheric greenhouse effect, Earth would behave as an idealized blackbody emitter governed by the Stefan-Boltzmann law: E = σ · T⁴, where σ = 5.670374 × 10⁻⁸ W/(m²·K⁴). Given an average solar irradiance (solar constant) S₀ ≈ 1361 W/m² and a planetary albedo α ≈ 0.30, Earth effective radiating equilibrium temperature would be -18°C (255 K), rendering liquid water impossible.',
          'The natural greenhouse effect raises the surface temperature by +33°C to approximately +15°C (288 K), dominated historically by water vapor (H₂O), carbon dioxide (CO₂), and methane (CH₄). Anthropogenic emissions enhance this natural blanket, creating an Earth Energy Imbalance (EEI) of approximately 0.87 ± 0.12 W/m² (accumulating ~380 zettajoules of excess heat into the planetary system since 1971).'
        ],
        formula: 'ΔF = 5.35 · ln(C / C₀)  [W/m² radiative forcing for CO₂]',
        callout: {
          type: 'info',
          title: 'IPCC First Principles Citation',
          text: 'IPCC Sixth Assessment Report (AR6 WG1 Chapter 7): Earth energy imbalance is the fundamental metric of planetary warming; over 89% of this excess energy is absorbed by the global ocean, 6% by land, 4% by ice sheets/glaciers, and 1% by the atmosphere.'
        }
      },
      {
        heading: '2. Infrared Absorption Spectra & Molecular Vibrations',
        content: [
          'Diatomic homonuclear molecules that make up ~99% of dry air (N₂ and O₂) possess symmetrical electric charge distributions and no net dipole moment during vibration, allowing thermal infrared photons to pass through unobstructed.',
          'Polyatomic molecules such as CO₂, H₂O, CH₄, and N₂O possess vibrational modes (asymmetric stretch, bending) that create a transient dipole moment oscillating at frequencies corresponding to terrestrial infrared wavelengths (5 to 50 μm).',
          'Carbon dioxide possesses a strong fundamental absorption band centered at 15 μm (667 cm⁻¹), precisely overlapping the peak terrestrial infrared emission spectrum. As CO₂ concentrations increase, the band center becomes optically saturated, but the absorption edges (band wings) broaden through pressure broadening and Doppler shift, driving logarithmic radiative forcing.'
        ]
      },
      {
        heading: '3. Climate Feedbacks & Equilibrium Climate Sensitivity (ECS)',
        content: [
          'Direct radiative forcing from a doubling of CO₂ (from 280 ppm to 560 ppm) yields ~1.2°C of warming in isolation. The ultimate planetary warming is determined by positive and negative climate feedback loops:',
          '• Clausius-Clapeyron Water Vapor Feedback: As air warms by 1°C, its saturation vapor pressure increases by ~7%. Water vapor, itself a potent greenhouse gas, approximately doubles the initial warming response.',
          '• Ice-Albedo Feedback: Shrinking sea ice and snow cover reveal darker ocean water (albedo ~0.06) and land (albedo ~0.15) that absorb far more solar radiation than fresh snow (albedo ~0.85), driving polar amplification.',
          '• Cloud Radiative Feedbacks: Low stratocumulus clouds primarily reflect shortwave sunlight (cooling), while high cirrus clouds trap longwave infrared (warming). Net cloud feedback is evaluated as positive in IPCC AR6.',
          'Equilibrium Climate Sensitivity (ECS) represents the long-term temperature rise resulting from sustained doubling of atmospheric CO₂. IPCC AR6 narrows the likely range to 2.5°C – 4.0°C, with a best-estimate median of 3.0°C.'
        ],
        table: {
          headers: ['Metric', 'Pre-Industrial (1750)', 'Observed (2024-2026)', 'Change'],
          rows: [
            ['Global Surface Temp Anomaly', '0.0°C (baseline)', '+1.48°C ± 0.1°C', '+1.48°C'],
            ['Atmospheric CO₂ Mole Fraction', '280 ppm', '426.9 ppm', '+52.5%'],
            ['Atmospheric Methane (CH₄)', '722 ppb', '1,930 ppb', '+167.3%'],
            ['Radiative Forcing (Total Anthropogenic)', '0.0 W/m²', '+2.72 W/m² (AR6)', '+2.72 W/m²']
          ]
        }
      }
    ],
    keyFacts: [
      { label: 'Radiative Forcing Formula', value: 'ΔF = 5.35 × ln(C / C₀)', source: 'Myhre et al. / IPCC AR6' },
      { label: 'Equilibrium Climate Sensitivity', value: '3.0°C (likely 2.5–4.0°C)', source: 'IPCC AR6 WG1 SPM' },
      { label: 'Earth Energy Imbalance', value: '0.87 ± 0.12 W/m²', source: 'NASA CERES / von Schuckmann' }
    ],
    references: [
      'IPCC, 2021: Climate Change 2021: The Physical Science Basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change. Cambridge University Press.',
      'Myhre, G., et al., 1998: New estimates of radiative forcing due to well mixed greenhouse gases. Geophys. Res. Lett., 25, 2715–2718.',
      'von Schuckmann, K., et al., 2020: Heat stored in the Earth system: where does the energy go? Earth System Science Data, 12(3), 2013-2041.'
    ]
  },
  {
    id: 'greenhouse-gases-carbon-cycle',
    category: 'GREENHOUSE_GASES',
    title: 'Greenhouse Gases, Carbon Cycle & The Keeling Curve',
    subtitle: 'Atmospheric Mole Fractions, Lifetime Lifespans, Global Warming Potentials & Sinks',
    leadParagraph: 'Carbon dioxide, methane, nitrous oxide, and synthetic halocarbons form the primary anthropogenic drivers of modern climate change. The global carbon cycle balances emissions across the atmosphere, terrestrial biosphere, upper oceans, and deep ocean floor sediments. Understanding their atmospheric lifetimes and Global Warming Potentials (GWP) is critical to mitigation strategy.',
    sections: [
      {
        heading: '1. The Major Well-Mixed Greenhouse Gases',
        content: [
          '• Carbon Dioxide (CO₂): Responsible for ~66% of total radiative forcing from well-mixed greenhouse gases. Emitted primarily through fossil fuel combustion (coal, oil, gas) and land use change (deforestation). Unlike short-lived pollutants, CO₂ lacks a single chemical degradation pathway; an emitted pulse of CO₂ persists in the ocean-atmosphere-terrestrial system for thousands of years.',
          '• Methane (CH₄): Responsible for ~16% of direct warming. Anthropogenic sources include enteric fermentation in ruminant livestock, flooded rice cultivation, landfill anaerobic decay, and fugitive leaks across natural gas pipelines and coal mines. While possessing a shorter atmospheric lifetime (~11.8 years), CH₄ has an intense radiative efficiency—84 times higher than CO₂ over a 20-year timeline (GWP₂₀) and 28 times over 100 years (GWP₁₀₀).',
          '• Nitrous Oxide (N₂O): Responsible for ~7% of direct warming. Emitted primarily through synthetic nitrogen fertilizers in industrial agriculture and chemical processing. N₂O has an atmospheric residence time of ~109 years and a GWP₁₀₀ of 273.',
          '• Fluorinated Gases (HFCs, PFCs, SF₆, NF₃): Synthetic industrial chemicals utilized in refrigeration, air conditioning, electrical insulation, and semiconductor etching. Sulfur hexafluoride (SF₆) is the most potent greenhouse gas known, with an atmospheric lifetime of 3,200 years and a GWP₁₀₀ of 25,200.'
        ],
        table: {
          headers: ['Gas', 'Formula', 'Current Level', 'Atmospheric Lifetime', 'GWP₁₀₀', 'Primary Sources'],
          rows: [
            ['Carbon Dioxide', 'CO₂', '426.9 ppm', 'Centuries to Millennia', '1', 'Fossil fuel combustion, deforestation, cement'],
            ['Methane', 'CH₄', '1,930 ppb', '11.8 years', '28 (84 on GWP₂₀)', 'Oil/gas fugitive leaks, cattle, rice paddy, landfills'],
            ['Nitrous Oxide', 'N₂O', '336.5 ppb', '109 years', '273', 'Agricultural nitrogen fertilizer, chemical industry'],
            ['Sulfur Hexafluoride', 'SF₆', '11.2 ppt', '3,200 years', '25,200', 'High-voltage circuit breakers, switchgear']
          ]
        }
      },
      {
        heading: '2. The Global Carbon Cycle & Airborne Fraction',
        content: [
          'Human activities currently release approximately 40 to 42 billion metric tons (Gt) of CO₂ per year (equivalent to ~11 Gt of pure elemental carbon).',
          '• Airborne Fraction: Only about 44% to 46% of human annual emissions accumulate in the atmosphere, driving the rise from 280 ppm to 426.9 ppm.',
          '• Terrestrial Carbon Sink: Plants, forests, and soils absorb approximately 29% to 31% via photosynthesis, enhanced partially by CO₂ fertilization and reforestation, though threatened by heat stress, drought, and mega-wildfires.',
          '• Oceanic Carbon Sink: The global ocean absorbs approximately 24% to 26% through physico-chemical dissolution (the solubility pump) and marine phytoplankton photosynthesis (the biological pump).'
        ]
      },
      {
        heading: '3. The Keeling Curve & Mauna Loa Observatory',
        content: [
          'Initiated in March 1958 by geochemist Charles David Keeling at NOAA Mauna Loa Observatory in Hawaii (altitude 3,397m), the Keeling Curve provides the longest continuous high-precision instrumental record of atmospheric CO₂ mole fractions on Earth.',
          'The curve exhibits two primary characteristics:',
          '1. An undeniable upward multi-decadal exponential trajectory reflecting cumulative fossil fuel combustion, accelerating from ~0.7 ppm/yr growth in the 1960s to >2.4 ppm/yr in the 2020s.',
          '2. An annual seasonal oscillation of ~5 to 6 ppm driven by the Northern Hemisphere terrestrial biosphere: photosynthetic uptake during spring and summer draws down atmospheric CO₂, followed by autumn and winter respiration and vegetation decay that releases CO₂ back into the atmosphere.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Current CO₂ Mole Fraction', value: '426.9 ppm', source: 'NOAA GML / Scripps Keeling Curve' },
      { label: 'Pre-Industrial Baseline', value: '280.0 ppm', source: 'Law Dome & EPICA Ice Cores' },
      { label: 'Methane GWP20 Ratio', value: '84× more potent than CO₂', source: 'IPCC AR6 WG1' }
    ],
    references: [
      'Keeling, C. D., et al., 1976: Atmospheric carbon dioxide variations at Mauna Loa Observatory, Hawaii. Tellus, 28(6), 538–551.',
      'Friedlingstein, P., et al., 2023: Global Carbon Budget 2023. Earth System Science Data, 15(12), 5301–5369.',
      'Dlugokencky, E. J., et al., 2024: Trends in Atmospheric Methane. NOAA Global Monitoring Laboratory.'
    ]
  },
  {
    id: 'cryosphere-and-sea-level',
    category: 'CRYOSPHERE_OCEANS',
    title: 'Cryosphere Dynamics & Global Sea Level Rise',
    subtitle: 'Ice Sheet Dynamics, Glacial Isostatic Adjustment, Steric Expansion & Coastal Exposure',
    leadParagraph: 'Earth cryosphere—encompassing polar ice sheets, mountain glaciers, sea ice, and permafrost—is melting at rates unprecedented in human civilization. The resulting freshwater discharge and thermal expansion of seawater are accelerating Global Mean Sea Level (GMSL) rise, placing over 1 billion people in low-elevation coastal zones at severe risk.',
    sections: [
      {
        heading: '1. Ice Sheets: Greenland & Antarctica Mass Loss',
        content: [
          'Together, the Greenland and Antarctic ice sheets store more than 99% of Earth freshwater ice. If completely melted, Greenland would raise global sea levels by ~7.4 meters, and Antarctica by ~58.3 meters.',
          '• Greenland Ice Sheet: Currently shedding an average of ~270 to 280 billion metric tons (Gt) of ice each year. Mass loss is driven both by surface meltwater runoff (amplified by darker albedo from melt lakes and dust) and dynamic discharge through marine-terminating outlet glaciers.',
          '• Antarctic Ice Sheet: Currently losing ~150 Gt/year. While East Antarctica remains relatively stable, West Antarctica (WAIS) is experiencing accelerating discharge. Glaciers resting on retrograde bedrock (sloping downwards toward the interior below sea level) are susceptible to Marine Ice Sheet Instability (MISI). Thwaites Glacier ("The Doomsday Glacier") and Pine Island Glacier hold several meters of potential sea level rise and are thinning rapidly as warm Circumpolar Deep Water erodes their floating ice shelves from below.'
        ]
      },
      {
        heading: '2. Arctic Sea Ice Decline & Polar Amplification',
        content: [
          'Arctic sea ice extent at the September annual minimum has declined by over 12.2% per decade since satellite telemetry began in 1979.',
          'Beyond areal extent, ice volume has dropped by more than 75% as thick, multi-year pack ice is replaced by thin, seasonal first-year ice. The loss of sea ice triggers a massive albedo feedback: open ocean reflects only ~6% of incoming solar radiation compared to up to 85% for sea ice, absorbing solar energy and accelerating warming at 3.5 to 4 times the global average rate—a phenomenon known as Arctic Amplification.'
        ]
      },
      {
        heading: '3. Components of Global Mean Sea Level (GMSL) Rise',
        content: [
          'Global mean sea level has risen by approximately 21 to 24 cm since 1880, with the rate of rise accelerating from 1.4 mm/year in the 20th century to over 4.5 mm/year in the 2010s and 2020s.',
          'Modern sea level rise is driven by two primary physical processes:',
          '1. Steric / Thermal Expansion (~40%): Seawater expands in volume as it absorbs excess planetary thermal energy.',
          '2. Eustatic / Mass Addition (~60%): Meltwater discharge from mountain glaciers (~22%), the Greenland Ice Sheet (~20%), and the Antarctic Ice Sheet (~15%), combined with net terrestrial groundwater extraction.'
        ],
        table: {
          headers: ['Component', 'Annual Contribution (mm/yr)', 'Percentage Share'],
          rows: [
            ['Ocean Thermal Expansion (Steric)', '~1.6 mm/yr', '38%'],
            ['Mountain Glaciers Melt', '~0.9 mm/yr', '22%'],
            ['Greenland Ice Sheet Discharge', '~0.8 mm/yr', '20%'],
            ['Antarctica Ice Sheet Discharge', '~0.5 mm/yr', '13%'],
            ['Land Water Storage Changes', '~0.3 mm/yr', '7%']
          ]
        }
      }
    ],
    keyFacts: [
      { label: 'Current Rate of Sea Level Rise', value: '+4.5 mm / year', source: 'NASA Satellite Altimetry' },
      { label: 'Greenland Ice Mass Loss Rate', value: '~270 Gt / year', source: 'NASA / DLR GRACE-FO' },
      { label: 'September Arctic Sea Ice Trend', value: '-12.2% / decade', source: 'National Snow & Ice Data Center (NSIDC)' }
    ],
    references: [
      'Oppenheimer, M., et al., 2019: Sea Level Rise and Implications for Low-Elevation Islands, Coasts and Communities. In: IPCC Special Report on the Ocean and Cryosphere in a Changing Climate.',
      'Mouginot, J., et al., 2019: Forty-six years of Greenland Ice Sheet mass balance from 1972 to 2018. PNAS, 116(19), 9239–9244.',
      'Rignot, E., et al., 2019: Four decades of Antarctic Ice Sheet mass balance from 1979–2017. PNAS, 116(4), 1095–1103.'
    ]
  },
  {
    id: 'ocean-warming-acidification',
    category: 'CRYOSPHERE_OCEANS',
    title: 'Ocean Warming, Acidification & Deoxygenation',
    subtitle: 'The Thermodynamic Flywheel: Carbonate Chemistry, Aragonite Saturation & Marine Heatwaves',
    leadParagraph: 'Covering 71% of Earth surface, the oceans serve as the planetary climate flywheel. In absorbing ~90% of excess anthropogenic heat and ~26% of emitted carbon dioxide, the marine biosphere is experiencing drastic alterations in thermal structure, acid-base equilibrium, and dissolved oxygen concentrations.',
    sections: [
      {
        heading: '1. Ocean Heat Content (OHC) & Thermal Flywheel',
        content: [
          'Water has a specific heat capacity roughly four times greater than atmospheric air (4,184 J/(kg·K) vs 1,005 J/(kg·K)). Consequently, the top 3 meters of the global ocean store as much thermal energy as the entire atmosphere.',
          'Between 1971 and 2024, the upper 2,000 meters of the global ocean accumulated over 350 zettajoules (ZJ = 10²¹ Joules) of excess thermal energy. Every single year since 2019 has broken previous all-time historical Ocean Heat Content records.',
          'This colossal thermal reservoir creates committed warming: even if greenhouse gas emissions ceased instantly, oceans would slowly re-radiate excess thermal energy over centuries.'
        ]
      },
      {
        heading: '2. Chemical Mechanisms of Ocean Acidification',
        content: [
          'When atmospheric carbon dioxide dissolves in seawater, it undergoes a sequential chemical chain reaction that reduces ocean pH:',
          '1. Carbon dioxide reacts with water to form carbonic acid: CO₂ + H₂O ⇌ H₂CO₃',
          '2. Carbonic acid dissociates into hydrogen ions and bicarbonate: H₂CO₃ ⇌ H⁺ + HCO₃⁻',
          '3. The excess hydrogen ions (H⁺) react with free carbonate ions (CO₃²⁻), converting them into bicarbonate: H⁺ + CO₃²⁻ ⇌ HCO₃⁻',
          'This reaction sequence exerts two devastating biological consequences: it lowers ocean pH (surface seawater pH has dropped from ~8.25 in pre-industrial times to ~8.14 today, representing a >30% increase in H⁺ acidity), and it depletes available carbonate ions (CO₃²⁻), decreasing the saturation state (Ω) of calcium carbonate minerals (aragonite and calcite). Calcifying organisms—including coral polyps, pteropods (sea butterflies), coccolithophores, and mollusks—struggle to construct and maintain their protective calcium carbonate shells.'
        ],
        formula: 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻  and  H⁺ + CO₃²⁻ ⇌ HCO₃⁻'
      },
      {
        heading: '3. Marine Heatwaves (MHWs) & Coral Bleaching',
        content: [
          'A Marine Heatwave is defined as a discrete, prolonged period of anomalously warm seawater (above the 90th percentile of historical local baselines for at least 5 consecutive days).',
          'Satellite observations demonstrate that MHW frequency has doubled since 1982. Prolonged thermal stress forces reef-building corals to expel their symbiotic dinoflagellate algae (zooxanthellae), causing coral bleaching. If sea surface temperatures remain elevated for several weeks, massive coral mortality ensues. IPCC projections indicate that 70% to 90% of global tropical coral reefs will disappear at 1.5°C of warming, and over 99% will be lost at 2.0°C.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Surface Ocean pH Drop', value: 'From 8.25 to 8.14 (>30% [H⁺] increase)', source: 'NOAA Ocean Acidification Program' },
      { label: 'Ocean Heat Uptake Share', value: '89% of Earth excess energy', source: 'IPCC AR6 WG1' },
      { label: 'Coral Reef Loss at 1.5°C', value: '70% to 90% mortality', source: 'IPCC Special Report on 1.5°C' }
    ],
    references: [
      'Feely, R. A., et al., 2004: Impact of Anthropogenic CO₂ on the CaCO₃ System in the Oceans. Science, 305(5682), 362–366.',
      'Cheng, L., et al., 2024: New Record Ocean Temperatures and Related Climate Indicators in 2023. Advances in Atmospheric Sciences, 41, 1066–1082.',
      'Hobday, A. J., et al., 2016: A hierarchical approach to defining marine heatwaves. Progress in Oceanography, 141, 227–238.'
    ]
  },
  {
    id: 'planetary-tipping-points',
    category: 'TIPPING_POINTS',
    title: 'Planetary Tipping Points & System Cascades',
    subtitle: 'Self-Amplifying Feedbacks, Bifurcation Thresholds & Committed Planetary Commitments',
    leadParagraph: 'A climate tipping point occurs when a small additional increment of warming pushes a large-scale Earth system component past an irreversible threshold, triggering autonomous, self-sustaining changes that continue even if subsequent warming is arrested. Tipping cascades present catastrophic existential risks to human civilization.',
    sections: [
      {
        heading: '1. Theoretical Framework: Lenton & Armstrong McKay Synthesis',
        content: [
          'In Earth system science, tipping elements are subcontinental or planetary-scale components that feature a critical threshold (bifurcation point). Beyond this threshold, positive feedback mechanisms outpace stabilizing negative feedbacks.',
          'A landmark 2022 assessment in Science (Armstrong McKay et al.) re-evaluated over 200 empirical and paleoclimate studies, identifying 9 core global tipping elements and 7 regional impact tipping points, concluding that multiple tipping thresholds may already be breached within the Paris 1.5°C to 2.0°C warming window.'
        ]
      },
      {
        heading: '2. The Core Planetary Tipping Elements',
        content: [
          '• Atlantic Meridional Overturning Circulation (AMOC): The global convective conveyor belt carrying warm surface water northward and cold deep water southward. Massive freshwater discharge from Greenland melt dilutes North Atlantic surface salinity, reducing density and inhibiting convective sinking. An AMOC collapse would trigger drastic cooling across northwestern Europe, shift tropical rainfall belts southward, and disrupt monsoons.',
          '• Amazon Rainforest Savannization: The Amazon basin produces ~50% of its own rainfall via evapotranspiration (atmospheric flying rivers). As logging, road fragmentation, and global drought cross ~20% to 25% deforestation, this precipitation recycling loop breaks down, locking in self-propagating dieback into dry degraded savanna and releasing up to 120 Gt of stored carbon.',
          '• Permafrost Thaw & Carbon Release: Circumpolar permafrost soils contain approximately 1,400 to 1,600 Gt of frozen organic carbon (roughly double the current atmospheric carbon reservoir). As permafrost thaws, microbial decomposition releases CO₂ in aerobic zones and CH₄ in anaerobic thermokarst lakes, fueling a potent unconstrained positive feedback.',
          '• West Antarctic Ice Sheet (WAIS) Collapse: Grounded well below sea level, ungrounding of the Thwaites and Pine Island glacier ice shelves triggers runaway retreat, locking in 3.3 meters of global sea level rise.'
        ],
        table: {
          headers: ['Tipping Element', 'Threshold Range', 'Best Estimate', 'Timescale', 'Impact Severity'],
          rows: [
            ['Greenland Ice Sheet Collapse', '0.8°C – 3.0°C', '1.5°C', '1,000 – 15,000 yrs', 'High (+7m sea level)'],
            ['West Antarctic Ice Sheet Collapse', '1.0°C – 3.0°C', '1.5°C', '500 – 13,000 yrs', 'High (+3.3m sea level)'],
            ['Tropical Coral Reef Die-off', '1.0°C – 2.0°C', '1.5°C', 'Decades', 'Critical (Biodiversity loss)'],
            ['Permafrost Abrupt Thaw', '1.0°C – 2.3°C', '1.5°C', 'Centuries', 'High (CH₄ & CO₂ emission)'],
            ['AMOC Circulation Collapse', '1.4°C – 8.0°C', '4.0°C', 'Centuries', 'Catastrophic (Global climate shift)'],
            ['Amazon Rainforest Savannization', '2.0°C – 6.0°C', '3.5°C (or 20-25% logging)', 'Decades to Century', 'Catastrophic (100+ Gt CO₂)']
          ]
        }
      },
      {
        heading: '3. Tipping Cascades & Domino Dynamics',
        content: [
          'Earth tipping elements do not operate in isolation; they are interconnected through atmospheric teleconnections and ocean currents. A tipping event in one system can destabilize adjacent elements in a domino cascade:',
          'For example: Accelerated melting of Greenland discharges buoyant freshwater into the subpolar gyre → slows AMOC circulation → alters Atlantic trade winds and reduces tropical moisture flux to South America → intensifies severe Amazon droughts → accelerates tropical forest dieback and global carbon release.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Tipping Points at 1.5°C Risk', value: '5 elements (Greenland, WAIS, Corals, Permafrost, Barents)', source: 'Armstrong McKay et al., Science 2022' },
      { label: 'Permafrost Carbon Reservoir', value: '~1,400 to 1,600 Gt CO₂e', source: 'Schuur et al. / Nature' },
      { label: 'Amazon Dieback Deforestation Threshold', value: '20% to 25% total forest clearance', source: 'Lovejoy & Nobre' }
    ],
    references: [
      'Lenton, T. M., et al., 2019: Climate tipping points — too risky to bet against. Nature, 575, 592–595.',
      'Armstrong McKay, D. I., et al., 2022: Exceeding 1.5°C global warming could trigger multiple climate tipping points. Science, 377(6611), eabn7950.',
      'Lovejoy, T. E., & Nobre, C., 2018: Amazon Tipping Point. Science Advances, 4(2), eaat2340.'
    ]
  },
  {
    id: 'extreme-weather-attribution',
    category: 'EXTREME_WEATHER',
    title: 'Extreme Weather Attribution & Climate Dynamics',
    subtitle: 'Thermodynamic Scaling, Jet Stream Resonance, Compound Hazards & Event Attribution',
    leadParagraph: 'Attribution science rigorously determines the degree to which anthropogenic climate change has altered the probability, intensity, and geographic extent of specific extreme weather events. Far from natural variability, heatwaves, extreme precipitation, marine heatwaves, and wildfires show clear human fingerprints.',
    sections: [
      {
        heading: '1. The World Weather Attribution (WWA) Scientific Method',
        content: [
          'Event attribution evaluates extreme events using two complementary pillars: long-term empirical observational records and high-resolution climate model ensembles.',
          'Scientists simulate two distinct planetary regimes:',
          '1. The Factual World: Modern Earth incorporating observed greenhouse gas concentrations, aerosol loadings, and land use changes.',
          '2. The Counterfactual World: An idealized Earth without human greenhouse emissions, maintaining 1850 pre-industrial baselines (~280 ppm CO₂).',
          'By calculating the Probability Ratio (PR = P_factual / P_counterfactual) and Intensity Change (ΔI), scientists determine whether an event was made more probable or severe by human influence.'
        ]
      },
      {
        heading: '2. The Clausius-Clapeyron Relation & Extreme Precipitation',
        content: [
          'The fundamental physical law dictating precipitation intensity is the Clausius-Clapeyron relation, which states that for every 1°C of atmospheric warming, air can hold approximately 7% more water vapor.',
          'This thermodynamic capacity increases the volume of precipitable water available for convective updrafts, transforming normal meteorological storm fronts into catastrophic cloudbursts and flash flood events. In monsoon regions and atmospheric river corridors, precipitation extremes frequently exceed simple 7% scaling due to latent heat release fueling vertical convective velocity.'
        ],
        formula: 'd(es) / dT = (L_v · es) / (R_v · T²)  [~7% moisture increase per 1°C]'
      },
      {
        heading: '3. Heat Domes, Jet Stream Waviness & Wildfire VPD',
        content: [
          '• Heat Domes & Planetary Waves: Rapid Arctic warming reduces the temperature gradient between the equator and the North Pole. This thermal homogenization weakens the high-altitude polar jet stream, causing it to meander in slow-moving Rossby wave patterns. Quasi-resonant amplification locks high-pressure ridges (heat domes) in place for weeks, baking the surface, compressing air downward, and shattering historical temperature records by 4°C to 5°C.',
          '• Wildfire Dynamics & Vapor Pressure Deficit (VPD): VPD measures the difference between how much moisture the air holds and how much it could hold when saturated. As atmospheric temperature climbs, VPD rises exponentially, rapidly sucking moisture out of forest canopies, soil, and fallen timber. This creates tinder-dry fuel beds where lightning strikes or electrical sparks ignite explosive mega-wildfires characterized by extreme Fire Radiative Power (FRP) and pyrocumulonimbus cloud generation.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Atmospheric Moisture Scaling', value: '+7% water vapor capacity per 1°C', source: 'Clausius-Clapeyron Law' },
      { label: 'Attribution Metric', value: 'Probability Ratio (PR) & Intensity Shift (ΔI)', source: 'World Weather Attribution (WWA)' },
      { label: '2021 Pacific NW Heat Dome PR', value: 'Virtually impossible (>150× rarer) without climate change', source: 'Philip et al., Earth System Dynamics' }
    ],
    references: [
      'Stott, P. A., et al., 2016: Attribution of extreme weather and climate-related events. WIREs Climate Change, 7(1), 23–41.',
      'Philip, S. Y., et al., 2022: Rapid attribution analysis of the extraordinary heat wave on the Pacific Coast of the US and Canada in June 2021. Earth System Dynamics, 13(4), 1689–1713.',
      'Trenberth, K. E., et al., 2015: Attribution of climate extreme events. Nature Climate Change, 5(8), 725–730.'
    ]
  },
  {
    id: 'emissions-inventory-and-drivers',
    category: 'EMISSIONS_INVENTORY',
    title: 'Global Greenhouse Gas Emissions & Sectoral Attribution',
    subtitle: 'Sources by Economic Sector, Historical Carbon Debts & National Attribution',
    leadParagraph: 'Global annual greenhouse gas emissions stand at approximately 54 billion metric tons of CO₂ equivalent (Gt CO₂e/yr). Decarbonizing the global economy requires granular inventory accounting across power generation, industry, land use, transport, and building infrastructure.',
    sections: [
      {
        heading: '1. Sectoral Breakdown of Global Greenhouse Gas Emissions',
        content: [
          'According to the IPCC Working Group III Sixth Assessment Report, global emissions originate from five major economic sectors:',
          '1. Energy Supply & Electricity Generation (~34%): Combustion of thermal coal, methane natural gas, and heavy fuel oil for power grids and district heating.',
          '2. Heavy Industry & Manufacturing (~24%): High-temperature process heat, blast furnace coke in steelmaking, limestone calcination in Portland cement manufacturing, and chemical feedstocks.',
          '3. Agriculture, Forestry & Other Land Use (AFOLU) (~22%): Tropical deforestation, cattle enteric methane emissions, fertilizer nitrous oxide runoff, and peatland draining.',
          '4. Transportation (~15%): Internal combustion passenger automobiles, heavy-duty freight diesel trucks, maritime cargo shipping, and commercial aviation.',
          '5. Buildings & Built Infrastructure (~6% direct, ~16% indirect including electricity): Space heating via fossil gas boilers, cooling air conditioning, and domestic water heating.'
        ],
        table: {
          headers: ['Economic Sector', 'Annual Gt CO₂e', 'Global Share', 'Primary Decarbonization Lever'],
          rows: [
            ['Electricity & Heat', '18.4 Gt', '34%', 'Solar PV, Wind, Nuclear, Battery Storage'],
            ['Heavy Industry & Materials', '13.0 Gt', '24%', 'Green Hydrogen DRI Steel, LC3 Cement, CCUS'],
            ['Agriculture & Forestry (AFOLU)', '11.9 Gt', '22%', 'Deforestation moratoria, precision fertilizer, plant proteins'],
            ['Transport (Road/Air/Sea)', '8.1 Gt', '15%', 'Electric vehicles, Sustainable Aviation Fuels, Green ammonia'],
            ['Buildings & Heating', '3.2 Gt (direct)', '6%', 'Heat pumps, induction cooking, building envelope insulation']
          ]
        }
      },
      {
        heading: '2. Cumulative Historical Responsibility vs Per-Capita Emissions',
        content: [
          'Because carbon dioxide persists in the atmosphere for centuries, current global warming reflects cumulative historical emissions since 1850 rather than simply today annual output.',
          '• Historical Cumulative Debt (1850–2023): The United States has emitted ~509 Gt CO₂ (~20% of the world total), the European Union-27 ~420 Gt (~17%), and China ~280 Gt (~12%). Developed nations representing ~15% of global population account for nearly half of all historical cumulative emissions.',
          '• Per-Capita Disparity: Wide inequalities persist in annual per-capita carbon footprints. The average American emits ~14.9 metric tons CO₂/yr, the average European ~6.5 t, the average Chinese citizen ~8.8 t, and the average Indian ~2.0 t, while hundreds of millions across Sub-Saharan Africa emit under 0.8 t per year.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Total Annual Global GHG', value: '~54 Gt CO₂e / year', source: 'UNEP Emissions Gap Report' },
      { label: 'Largest Historical Emitter', value: 'United States (~20% cumulative)', source: 'Our World in Data / CDIAC' },
      { label: 'Largest Current Annual Emitter', value: 'China (~30% annual total)', source: 'Global Carbon Budget' }
    ],
    references: [
      'IPCC, 2022: Climate Change 2022: Mitigation of Climate Change. Contribution of Working Group III to the Sixth Assessment Report. Cambridge University Press.',
      'UNEP, 2023: Emissions Gap Report 2023: Broken Record – Temperatures hit new highs, yet world fails to cut emissions.',
      'Ritchie, H., & Roser, M., 2020: CO₂ and Greenhouse Gas Emissions. Our World in Data.'
    ]
  },
  {
    id: 'ipcc-scenarios-carbon-budgets',
    category: 'IPCC_SCENARIOS',
    title: 'IPCC AR6 Scenarios (SSPs) & Remaining Carbon Budgets',
    subtitle: 'Shared Socioeconomic Pathways, Radiative Forcing Trajectories & 1.5°C Carbon Math',
    leadParagraph: 'To project 21st-century climate trajectories, the IPCC Sixth Assessment Report combines Representative Concentration Pathways (RCPs) with Shared Socioeconomic Pathways (SSPs). These scenarios span ambitious decarbonization to fossil-fueled expansion, establishing the finite remaining carbon budget to hold global warming under 1.5°C or 2.0°C.',
    sections: [
      {
        heading: '1. Shared Socioeconomic Pathways (SSPs) Defined',
        content: [
          '• SSP1-1.9 (Very Low Emissions): The ambitious Paris 1.5°C pathway. Rapid international cooperation, aggressive global decarbonization, and net-zero global CO₂ emissions achieved around 2050, followed by net-negative emissions. Warming peaks around 1.6°C before declining to ~1.4°C by 2100.',
          '• SSP1-2.6 (Low Emissions): Strong mitigation holding warming to ~1.8°C by 2100, achieving global net-zero emissions around 2070.',
          '• SSP2-4.5 (Intermediate Emissions / "Middle of the Road"): Current implemented policies trajectory. Emissions plateau around 2030 and decline slowly, reaching ~2.7°C warming above pre-industrial levels by 2100.',
          '• SSP3-7.0 (High Emissions / "Regional Rivalry"): Resurgent nationalism, fragmented climate policies, and heavy coal usage leading to ~3.6°C warming by 2100.',
          '• SSP5-8.5 (Very High Emissions / "Fossil-Fueled Development"): Relentless extraction of fossil energy, tripling of coal usage, and minimal environmental regulation, leading to ~4.4°C warming by 2100 with catastrophic impacts.'
        ],
        table: {
          headers: ['Scenario', 'Short Description', '2050 Warming', '2100 Warming', 'Net-Zero Year'],
          rows: [
            ['SSP1-1.9', 'Sustainability / Paris 1.5°C', '+1.6°C', '+1.4°C', '~2050'],
            ['SSP1-2.6', 'Low emissions / Well-below 2°C', '+1.7°C', '+1.8°C', '~2070'],
            ['SSP2-4.5', 'Middle of the Road / Current Policies', '+2.0°C', '+2.7°C', 'After 2100'],
            ['SSP3-7.0', 'Regional Rivalry / High emissions', '+2.1°C', '+3.6°C', 'None'],
            ['SSP5-8.5', 'Fossil-Fueled Growth / Worst Case', '+2.4°C', '+4.4°C', 'None']
          ]
        }
      },
      {
        heading: '2. The Remaining Carbon Budget Arithmetic',
        content: [
          'The relationship between cumulative anthropogenic CO₂ emissions and global surface warming is nearly linear, defined as the Transient Climate Response to Cumulative Carbon Emissions (TCRE ≈ 0.45°C per 1,000 Gt CO₂).',
          'From the start of 2024, the remaining carbon budget for a 50% probability of limiting warming to 1.5°C is estimated at approximately 250 billion metric tons (Gt) of CO₂.',
          'At current annual global emission rates of ~40 Gt CO₂/year, this remaining budget will be exhausted in approximately 6 years (by ~2030) without immediate, unprecedented emissions cuts.'
        ]
      }
    ],
    keyFacts: [
      { label: '1.5°C Remaining Carbon Budget (50%)', value: '~250 Gt CO₂ (from 2024)', source: 'IPCC AR6 / Forster et al. 2023' },
      { label: 'Current Exhaustion Rate', value: '~40 Gt CO₂ / year (~6 years remaining)', source: 'Global Carbon Project' },
      { label: 'TCRE Coefficient', value: '0.45°C per 1,000 Gt CO₂ emitted', source: 'IPCC AR6 WG1 SPM' }
    ],
    references: [
      'IPCC, 2021: Summary for Policymakers. In: Climate Change 2021: The Physical Science Basis.',
      'Forster, P. M., et al., 2023: Indicators of Global Climate Change 2022: annual update of large-scale indicators of the state of the climate system and human influence. Earth System Science Data, 15(6), 2295–2327.',
      'Riahi, K., et al., 2017: The Shared Socioeconomic Pathways and their energy, land use, and greenhouse gas emissions implications. Global Environmental Change, 42, 153–168.'
    ]
  },
  {
    id: 'mitigation-solutions-transition',
    category: 'MITIGATION_SOLUTIONS',
    title: 'Mitigation Pathways & The Clean Energy Transition',
    subtitle: 'Renewables, Grid Battery Storage, Electrification, Industrial Green H₂ & Carbon Dioxide Removal',
    leadParagraph: 'Limiting global warming requires an unprecedented transformation of the global energy and industrial infrastructure. The solutions exist today: solar and wind have become the cheapest electricity sources in history, while battery storage, heat pumps, electric vehicles, and emerging carbon removal technologies provide a viable path to net-zero.',
    sections: [
      {
        heading: '1. Renewable Energy & Swanson Learning Curve',
        content: [
          'Between 2010 and 2023, the levelized cost of electricity (LCOE) for solar photovoltaics plummeted by 89%, and onshore wind by 68%. This exponential deflation is described by Swanson Law / Wright Law: every doubling of cumulative manufactured volume reduces costs by ~20% to 28%.',
          'Solar and wind generate zero operational carbon emissions and now represent over 80% of all newly installed electricity generation capacity worldwide.'
        ]
      },
      {
        heading: '2. Electrification of Heat, Transport & Storage',
        content: [
          '• Transportation: Electric vehicles (EVs) convert over 75% to 85% of grid electrical energy into kinetic movement, compared to only 20% to 25% thermodynamic efficiency for gasoline internal combustion engines.',
          '• Heating: Electric heat pumps utilize refrigeration cycles to transfer heat from outside air or ground, achieving Coefficients of Performance (COP) of 3.0 to 4.5 (delivering 3 to 4.5 units of heat for every 1 unit of electricity).',
          '• Grid Battery Storage: Lithium iron phosphate (LFP) and emerging sodium-ion batteries provide sub-second frequency regulation and 4-to-8 hour diurnal solar shifting, stabilizing renewable grids without fossil peaker plants.'
        ]
      },
      {
        heading: '3. Hard-to-Abate Sectors & Carbon Dioxide Removal (CDR)',
        content: [
          'Heavy industrial sectors cannot be decarbonized by direct electrification alone:',
          '• Steel: Transitioning from coal blast furnaces to Green Hydrogen Direct Reduced Iron (H₂-DRI) electric arc furnaces cuts emissions by >95%.',
          '• Cement: Replacing clinker with calcined clay and limestone (LC3) reduces embodied emissions by 40%, paired with CCUS for process emissions.',
          '• Carbon Dioxide Removal (CDR): Residual emissions from aviation and agriculture will necessitate durable CDR solutions, including Direct Air Capture with Carbon Storage (DACCS), Enhanced Rock Weathering (basalt spreading), biochar, and coastal mangrove restoration.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Solar PV Cost Decline (2010–2023)', value: '-89% levelized cost', source: 'IRENA Renewable Power Generation Costs' },
      { label: 'Heat Pump Efficiency (COP)', value: '300% to 450% thermodynamic efficiency', source: 'International Energy Agency (IEA)' },
      { label: 'Global Clean Investment (2023)', value: '$1.8 Trillion USD', source: 'BloombergNEF' }
    ],
    references: [
      'IEA, 2023: Net Zero Roadmap: A Global Pathway to Keep the 1.5 °C Goal in Reach. International Energy Agency, Paris.',
      'IRENA, 2023: Renewable Power Generation Costs in 2022. International Renewable Energy Agency, Abu Dhabi.',
      'Way, R., et al., 2022: Empirically grounded technology forecasts and the energy transition. Joule, 6(9), 2057–2082.'
    ]
  },
  {
    id: 'climate-science-glossary',
    category: 'GLOSSARY',
    title: 'Comprehensive Climate Science Glossary & Terminology',
    subtitle: 'Authoritative Definitions, Physical Units & IPCC Standards',
    leadParagraph: 'A reference compendium of 30+ fundamental scientific concepts, thermodynamic variables, satellite indicators, and international governance acronyms.',
    sections: [
      {
        heading: 'Alphabetical Scientific Glossary',
        content: [
          '• Albedo: The fraction of incident solar electromagnetic radiation reflected by a surface, expressed from 0.0 (total absorption, e.g. deep ocean ~0.06) to 1.0 (total reflection, e.g. fresh snow ~0.85).',
          '• AMOC (Atlantic Meridional Overturning Circulation): The large system of ocean currents that carries warm water from the tropics northwards into the North Atlantic, driving global thermohaline circulation.',
          '• Anthropogenic: Originating from or produced by human activities, especially industrial combustion, land transformation, and agricultural practices.',
          '• Carbon Budget: The maximum cumulative amount of global anthropogenic carbon dioxide emissions that would result in limiting global warming to a given level with a given probability.',
          '• Carbon Dioxide Equivalent (CO₂e): A metric measure used to compare the emissions from various greenhouse gases on the basis of their global-warming potential (GWP), by converting amounts of other gases to the equivalent amount of carbon dioxide with the same global warming impact.',
          '• Clausius-Clapeyron Relation: The physical law describing how saturation water vapor pressure increases exponentially with temperature (~7% per 1°C of warming).',
          '• Climate Sensitivity (ECS): The equilibrium change in annual global mean surface temperature following a sustained doubling of atmospheric carbon dioxide concentrations (pre-industrial 280 ppm to 560 ppm).',
          '• Deforestation: The conversion of forested land to non-forest uses, causing direct loss of biological carbon storage and eliminating vegetative rainfall recycling.',
          '• Earth Energy Imbalance (EEI): The difference between the amount of solar radiation absorbed by Earth and the amount of thermal infrared radiation emitted back into space, currently positive (~0.87 W/m²).',
          '• ENSO (El Niño–Southern Oscillation): A recurring climate pattern involving changes in the temperature of waters in the central and eastern tropical Pacific Ocean, alternating between warm (El Niño) and cool (La Niña) phases.',
          '• Evapotranspiration: The combined process of water evaporation from the Earth surface and soil, alongside transpiration from plant canopies into the atmosphere.',
          '• Fire Radiative Power (FRP): The rate of radiant energy emitted by a fire during combustion, measured in megawatts (MW) by satellite sensors such as VIIRS and MODIS, directly proportional to the rate of biomass consumption.',
          '• GWP (Global Warming Potential): An index measuring how much energy the emissions of 1 ton of a gas will absorb over a given period of time, relative to the emissions of 1 ton of carbon dioxide (CO₂ = 1).',
          '• Heat Dome: A high-pressure atmospheric circulation pattern that traps hot ocean air beneath a persistent thermal cap, compressing air and creating intense, prolonged surface heatwaves.',
          '• Keeling Curve: The continuous daily graph of atmospheric carbon dioxide concentration measured at Mauna Loa Observatory, Hawaii, begun in 1958 by Charles David Keeling.',
          '• Marine Heatwave (MHW): A prolonged period of anomalously high sea surface temperatures exceeding the 90th percentile of local historical baselines for at least five consecutive days.',
          '• Milankovitch Cycles: Cyclical variations in Earth orbital geometry (eccentricity, axial tilt/obliquity, and precession) that drive glacial-interglacial cycles over 20,000 to 100,000-year timescales.',
          '• Nationally Determined Contributions (NDCs): Formal national climate action plans submitted every 5 years under the Paris Agreement detailing emissions reduction targets and adaptation strategies.',
          '• Net Zero: The state achieved when anthropogenic greenhouse gas emissions into the atmosphere are balanced by anthropogenic removals over a specified period.',
          '• Ocean Acidification: The ongoing decrease in the pH of the Earth oceans, caused by the uptake of anthropogenic carbon dioxide (CO₂) from the atmosphere.',
          '• Ocean Heat Content (OHC): The total amount of thermal energy stored by the oceans, measured in zettajoules (ZJ = 10²¹ Joules).',
          '• Permafrost: Ground (soil, sediment, or rock, including ice) that remains at or below 0°C for at least two consecutive years.',
          '• Radiative Forcing: The net change in the energy balance of the Earth system due to an external perturbation, measured in Watts per square meter (W/m²).',
          '• Saffir-Simpson Hurricane Wind Scale: A 1 to 5 rating based on a hurricane sustained wind speed, estimating potential property damage and storm surge intensity.',
          '• Shared Socioeconomic Pathways (SSPs): Scenarios of projected socioeconomic global changes up to 2100, utilized by the IPCC to derive greenhouse gas emissions under diverse mitigation regimes.',
          '• Steric Sea Level Rise: Sea level change caused by variations in seawater density, primarily driven by thermal expansion as oceans absorb heat.',
          '• Tipping Point: A critical threshold at which a tiny perturbation can alter the state or development of a system qualitatively, irreversibly, and autonomously.',
          '• Vapor Pressure Deficit (VPD): The difference between the pressure exerted by the water vapor actually present in the air and the pressure exerted by water vapor that the air could hold at saturation.',
          '• VIIRS (Visible Infrared Imaging Radiometer Suite): A whiskbroom scanning radiometer aboard NOAA-20, NOAA-21, and Suomi-NPP satellites detecting active thermal fire anomalies at 375m spatial resolution.',
          '• Wet-Bulb Temperature (Tw): The lowest temperature that can be reached under current ambient conditions by the evaporation of water only. A wet-bulb temperature of 35°C represents the absolute physiological upper limit of human survivability without mechanical cooling.'
        ]
      }
    ],
    keyFacts: [
      { label: 'Glossary Terms Defined', value: '30+ Fundamental Concepts', source: 'WMO / IPCC AR6 Glossary' },
      { label: 'Human Physiological Heat Limit', value: '35°C Wet-Bulb (Tw)', source: 'Sherwood & Huber / PNAS' },
      { label: 'Primary Ocean Heat Unit', value: 'Zettajoule (ZJ = 10²¹ Joules)', source: 'NOAA NCEI' }
    ],
    references: [
      'IPCC, 2021: Annex VII: Glossary [Matthews, J.B.R., et al. (eds.)]. In: Climate Change 2021: The Physical Science Basis.',
      'World Meteorological Organization (WMO): International Meteorological Vocabulary, WMO-No. 182.',
      'Sherwood, S. C., & Huber, M., 2010: An adaptability limit to humans due to high temperature and humidity. PNAS, 107(21), 9552–9555.'
    ]
  }
];
