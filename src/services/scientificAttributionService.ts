import { 
  FireCluster, 
  FireDetectionPoint, 
  NOAACycloneEvent, 
  ScientificAttribution 
} from '../types/climateIntelligence';

/**
 * Builds a strict 5-stage scientific attribution dossier without speculative causal leaps.
 * Adheres strictly to:
 * 1. OBSERVATION  (Direct satellite instrument detection)
 * 2. EVENT        (Classified natural phenomenon)
 * 3. DRIVERS      (Environmental preconditions & explicit caveats)
 * 4. IMPACTS      (Atmospheric & biophysical consequences)
 * 5. EVIDENCE     (Specific sensor bands & scientific citations)
 */
export function buildFireClusterAttribution(cluster: FireCluster): ScientificAttribution {
  return {
    observation: {
      description: `Thermal infrared radiative anomaly detected by ${cluster.satellites.join(' and ')} across ${cluster.detectionCount} coordinate points in the ${cluster.regionName} sector.`,
      instrument: cluster.satellites.join(', '),
      timestampUtc: cluster.latestObservation,
      confidenceTag: 'OBSERVED'
    },
    event: {
      classification: `Active Vegetative Fire Cluster • Aggregate FRP ${cluster.totalFRP} MW (Peak ${cluster.maxFRP} MW)`,
      intensityMetric: `${cluster.totalFRP} MW Fire Radiative Power`,
      confidenceTag: 'HIGH CONFIDENCE'
    },
    possibleDrivers: {
      factors: [
        'Elevated surface temperature and atmospheric vapor pressure deficit (VPD).',
        'Low fine fuel moisture content in vegetative canopy and ground litter.',
        'Local boundary layer wind velocity facilitating rapid thermal propagation.'
      ],
      caveat: 'Satellite sensors record thermal radiance only. Remote sensing alone does not identify the primary ignition source (lightning strike, agricultural land clearance, accidental sparks, or arson).',
      confidenceTag: 'POSSIBLE DRIVER'
    },
    potentialImpacts: {
      consequences: [
        'Atmospheric aerosol injection including fine particulate matter (PM2.5) and black carbon.',
        'Localized vegetative canopy destruction and soil organic horizon degradation.',
        'Pulse emissions of carbon dioxide (CO₂) and carbon monoxide (CO) into the troposphere.'
      ],
      confidenceTag: 'ESTIMATED'
    },
    evidenceAndCitations: {
      datasets: [
        'NASA FIRMS NRT (MODIS C6.1 & VIIRS NOAA-20/21)',
        'Giglio et al. (2016) Collection 6 MODIS Active Fire Algorithm',
        'Schroeder et al. (2014) VIIRS 375m Active Fire Detection Algorithm'
      ],
      doiOrUrl: 'https://firms.modaps.eosdis.nasa.gov/'
    }
  };
}

export function buildFirePointAttribution(point: FireDetectionPoint, regionName: string): ScientificAttribution {
  return {
    observation: {
      description: `Thermal radiance detected at ${point.lat.toFixed(3)}°, ${point.lng.toFixed(3)}° by ${point.satellite} (${point.daynight === 'D' ? 'Daytime' : 'Nighttime'} orbital pass). Brightness: ${point.brightness.toFixed(1)} K.`,
      instrument: point.satellite,
      timestampUtc: `${point.acqDate}T${point.acqTime.slice(0, 2)}:${point.acqTime.slice(2)}:00Z`,
      confidenceTag: 'OBSERVED'
    },
    event: {
      classification: `Active Combustion Point • FRP ${point.frp.toFixed(1)} MW`,
      intensityMetric: `${point.frp.toFixed(1)} MW`,
      confidenceTag: 'HIGH CONFIDENCE'
    },
    possibleDrivers: {
      factors: [
        'Low foliar moisture content and dry seasonal meteorological conditions.',
        'High ambient surface heat.'
      ],
      caveat: 'Satellite detection registers thermal radiance; ignition trigger is not identifiable from orbital thermal sensors alone.',
      confidenceTag: 'POSSIBLE DRIVER'
    },
    potentialImpacts: {
      consequences: [
        'Localized smoke plume generation and downwind particulate dispersion.',
        'Direct biomass combustion flux.'
      ],
      confidenceTag: 'ESTIMATED'
    },
    evidenceAndCitations: {
      datasets: [
        `NASA FIRMS ${point.satellite} NRT`,
        'NASA Land, Atmosphere Near real-time Capability for EOS (LANCE)'
      ],
      doiOrUrl: 'https://firms.modaps.eosdis.nasa.gov/'
    }
  };
}

export function buildCycloneAttribution(cyclone: NOAACycloneEvent): ScientificAttribution {
  return {
    observation: {
      description: `Low-pressure vortex center tracked at ${cyclone.currentLat.toFixed(2)}°, ${cyclone.currentLng.toFixed(2)}° with maximum sustained winds of ${cyclone.maxSustainedWindsKts} kts (${cyclone.maxSustainedWindsMph} mph) and central pressure of ${cyclone.centralPressureMb} mb.`,
      instrument: 'NOAA Geostationary Satellites (GOES), Scatterometers & Reconnaissance Dropsondes',
      timestampUtc: cyclone.advisoryTimeUtc,
      confidenceTag: 'OBSERVED'
    },
    event: {
      classification: `${cyclone.category} ${cyclone.stormName} (${cyclone.basin} Basin)`,
      intensityMetric: `${cyclone.maxSustainedWindsMph} mph Winds • ${cyclone.centralPressureMb} mb`,
      confidenceTag: 'HIGH CONFIDENCE'
    },
    possibleDrivers: {
      factors: [
        'Elevated Sea Surface Temperatures (SST > 26.5°C) providing convective thermal energy.',
        'Low tropospheric vertical wind shear permitting vertical chimney development.',
        'High middle-tropospheric relative humidity fueling sustained condensation latent heat.'
      ],
      caveat: 'Tropical cyclone genesis and intensification depend on complex atmospheric wave interactions and thermodynamic ocean heat content.',
      confidenceTag: 'POSSIBLE DRIVER'
    },
    potentialImpacts: {
      consequences: [
        'Coastal storm surge and destructive wave action.',
        'Extreme precipitation leading to inland flash flooding.',
        'High-velocity wind damage to terrestrial infrastructure and electrical grids.'
      ],
      confidenceTag: 'ESTIMATED'
    },
    evidenceAndCitations: {
      datasets: [
        'NOAA National Hurricane Center Tropical Cyclone Advisory Feeds',
        'NOAA Coral Reef Watch Sea Surface Temperature Anomalies',
        'WMO Saffir-Simpson Hurricane Wind Scale'
      ],
      doiOrUrl: 'https://www.nhc.noaa.gov/'
    }
  };
}
