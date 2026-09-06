import { 
  FireCluster, 
  NOAACycloneEvent, 
  DataProvenance, 
  SourceFreshnessReport 
} from '../types/climateIntelligence';
import { 
  ingestNASAFIRMS, 
  getClusterDetail, 
  ingestNOAACyclones, 
  getPlanetaryFreshness 
} from './serverTelemetryService';

/**
 * Clean Unified API Client for Earth Telemetry
 * Communicates with the ingestion server / proxy, with robust fallback
 */
export async function getFireClusters(sensorFilter: 'ALL' | 'VIIRS' | 'MODIS' = 'ALL'): Promise<{
  clusters: FireCluster[];
  provenance: DataProvenance;
  freshness: SourceFreshnessReport;
}> {
  try {
    const res = await fetch(`/api/telemetry/fires?sensor=${sensorFilter}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Graceful fallback to direct ingestion engine (e.g. static preview or local direct)
  }
  return await ingestNASAFIRMS(sensorFilter);
}

export async function getClusterPoints(clusterId: string): Promise<FireCluster | null> {
  try {
    const res = await fetch(`/api/telemetry/fires/${clusterId}`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return getClusterDetail(clusterId);
}

export async function getActiveCyclones(): Promise<{
  cyclones: NOAACycloneEvent[];
  freshness: SourceFreshnessReport;
}> {
  try {
    const res = await fetch('/api/telemetry/cyclones');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return await ingestNOAACyclones();
}

export async function getTelemetryFreshness(): Promise<SourceFreshnessReport[]> {
  try {
    const res = await fetch('/api/telemetry/freshness');
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fallback
  }
  return getPlanetaryFreshness();
}
