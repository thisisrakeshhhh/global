import { LiveEvent } from '../types/climateIntelligence';
import { getFireClusters, getActiveCyclones } from './apiClient';

export interface TelemetrySyncStatus {
  status: 'live' | 'recent' | 'delayed' | 'offline';
  sourceLabel: string;
  lastUpdatedSecondsAgo: number;
  lastSyncFormatted: string;
  totalFiresCount: number;
  totalStormsCount: number;
  totalEvents: number;
}

let cachedCombinedEvents: LiveEvent[] | null = null;
let lastSuccessfulSyncTimestamp: number = 0;
let syncSourceDescription = 'NASA FIRMS & NOAA NHC';

/**
 * Fetches real telemetry exclusively through the production API client.
 * Zero fabricated fallback events!
 */
export async function fetchLiveDisasterEvents(forceRefresh: boolean = false): Promise<LiveEvent[]> {
  const now = Date.now();
  if (!forceRefresh && cachedCombinedEvents && now - lastSuccessfulSyncTimestamp < 120000) {
    return cachedCombinedEvents;
  }

  const allEvents: LiveEvent[] = [];

  try {
    const [firesData, cyclonesData] = await Promise.all([
      getFireClusters('ALL'),
      getActiveCyclones()
    ]);

    // Map real fire clusters
    if (firesData && firesData.clusters) {
      firesData.clusters.forEach((cl) => {
        allEvents.push({
          id: cl.id,
          type: 'wildfire',
          title: `Vegetative Fire Cluster • ${cl.regionName}`,
          location: `${Math.abs(cl.lat).toFixed(2)}° ${cl.lat >= 0 ? 'N' : 'S'}, ${Math.abs(cl.lng).toFixed(2)}° ${cl.lng >= 0 ? 'E' : 'W'}`,
          lat: cl.lat,
          lng: cl.lng,
          detectedAt: cl.latestObservation,
          exactUtcTimestamp: cl.latestObservation,
          source: cl.satellites.join(' & '),
          confidence: `${cl.averageConfidence}% Satellite Confidence`,
          metricLabel: 'Aggregate FRP',
          metricValue: `${cl.totalFRP.toFixed(1)} MW`,
          severity: cl.totalFRP > 300 ? 'critical' : 'extreme',
          details: `Active thermal anomaly cluster with ${cl.detectionCount} satellite detection points.`,
          url: 'https://firms.modaps.eosdis.nasa.gov/',
          isLiveFetched: true,
          clusterId: cl.id,
          detectionCount: cl.detectionCount,
          provenance: cl.provenance,
          attributionChain: {
            whyOccurred: 'Elevated surface heat and low vegetative fuel moisture.',
            whatItCauses: `Carbon dioxide emissions and thermal radiative flux of ${cl.totalFRP} MW.`,
            whatItAffects: 'Local vegetative canopy and air quality.',
            evidenceSensors: cl.satellites.join(', '),
            confidenceLevel: `${cl.averageConfidence}%`
          }
        });
      });
    }

    // Map real NOAA cyclones
    if (cyclonesData && cyclonesData.cyclones) {
      cyclonesData.cyclones.forEach((cy) => {
        allEvents.push({
          id: cy.id,
          type: 'cyclone',
          title: `${cy.category} ${cy.stormName}`,
          location: `${cy.basin} Basin`,
          lat: cy.currentLat,
          lng: cy.currentLng,
          detectedAt: cy.advisoryTimeUtc,
          exactUtcTimestamp: cy.advisoryTimeUtc,
          source: 'NOAA National Hurricane Center',
          confidence: 'Official NOAA Advisory',
          metricLabel: 'Sustained Winds',
          metricValue: `${cy.maxSustainedWindsMph} mph (${cy.centralPressureMb} mb)`,
          severity: cy.category.includes('Hurricane') ? 'critical' : 'extreme',
          details: cy.advisoryNumber,
          url: 'https://www.nhc.noaa.gov/',
          isLiveFetched: true,
          provenance: cy.provenance,
          attributionChain: {
            whyOccurred: 'High sea-surface temperatures and favorable atmospheric convective conditions.',
            whatItCauses: 'Extreme winds, heavy precipitation, and marine storm surge.',
            whatItAffects: 'Maritime routes and coastal infrastructure.',
            evidenceSensors: 'NOAA Geostationary Satellites & Reconnaissance Dropsondes',
            confidenceLevel: 'High'
          }
        });
      });
    }

    if (allEvents.length > 0) {
      cachedCombinedEvents = allEvents;
      lastSuccessfulSyncTimestamp = now;
      syncSourceDescription = 'NASA FIRMS & NOAA NHC (Production API)';
      return allEvents;
    }
  } catch (err) {
    console.warn('[Live Telemetry] Sync failed, maintaining previous valid cache if available:', err);
  }

  // ZERO FABRICATED FALLBACKS!
  // If upstream failed, returns last verified cache; if none, returns empty array.
  return cachedCombinedEvents || [];
}

export function getTelemetrySyncStatus(): TelemetrySyncStatus {
  const now = Date.now();
  const elapsedSec = lastSuccessfulSyncTimestamp > 0 ? Math.floor((now - lastSuccessfulSyncTimestamp) / 1000) : 0;
  
  let status: TelemetrySyncStatus['status'] = 'live';
  if (lastSuccessfulSyncTimestamp === 0) status = 'offline';
  else if (elapsedSec > 300) status = 'recent';
  else if (elapsedSec > 900) status = 'delayed';

  const events = cachedCombinedEvents || [];
  const firesCount = events.filter((e) => e.type === 'wildfire').length;
  const stormsCount = events.filter((e) => e.type === 'cyclone').length;

  return {
    status,
    sourceLabel: syncSourceDescription,
    lastUpdatedSecondsAgo: elapsedSec,
    lastSyncFormatted: lastSuccessfulSyncTimestamp > 0
      ? new Date(lastSuccessfulSyncTimestamp).toUTCString().slice(17, 25) + ' UTC'
      : 'Awaiting Satellite Sync',
    totalFiresCount: firesCount,
    totalStormsCount: stormsCount,
    totalEvents: events.length
  };
}

export function clearLiveTelemetryCache() {
  cachedCombinedEvents = null;
  lastSuccessfulSyncTimestamp = 0;
}
