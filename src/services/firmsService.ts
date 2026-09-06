import { LiveEvent } from '../types/climateIntelligence';

export interface FIRMSFirePoint {
  latitude: number;
  longitude: number;
  brightness: number; // Kelvin
  scan: number;
  track: number;
  acq_date: string; // YYYY-MM-DD
  acq_time: string; // HHMM
  satellite: string; // T (Terra), A (Aqua), N (NOAA)
  confidence: number; // 0 - 100%
  frp: number; // Fire Radiative Power in MW
  daynight: 'D' | 'N';
}

let cachedFirmsEvents: LiveEvent[] | null = null;
let lastFirmsFetchTime = 0;

/**
 * Parses NASA FIRMS 24-hour Global MODIS/VIIRS Active Fire CSV feed
 */
export async function fetchNASAFirmsActiveFires(maxPoints: number = 60): Promise<LiveEvent[]> {
  const now = Date.now();
  // Cache for 3 minutes
  if (cachedFirmsEvents && now - lastFirmsFetchTime < 180000) {
    return cachedFirmsEvents;
  }

  try {
    // NASA FIRMS open 24h global active fire feed
    const response = await fetch(
      'https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/csv/MODIS_C6_1_Global_24h.csv',
      {
        headers: { Range: 'bytes=0-150000' } // Grab top active fires to prevent downloading tens of thousands
      }
    );

    if (!response.ok) {
      throw new Error(`NASA FIRMS HTTP status ${response.status}`);
    }

    const csvText = await response.text();
    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
      throw new Error('FIRMS CSV returned insufficient rows');
    }

    const firePoints: FIRMSFirePoint[] = [];

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',');
      if (cols.length < 12) continue;

      const lat = parseFloat(cols[0]);
      const lng = parseFloat(cols[1]);
      const brightness = parseFloat(cols[2]);
      const acq_date = cols[5];
      const acq_time = cols[6];
      const satellite = cols[7] === 'T' ? 'Terra' : cols[7] === 'A' ? 'Aqua' : cols[7];
      const confidence = parseInt(cols[8], 10) || 50;
      const frp = parseFloat(cols[11]) || 10.0;
      const daynight = (cols[12] || 'D').trim() as 'D' | 'N';

      if (!isNaN(lat) && !isNaN(lng) && confidence >= 40) {
        firePoints.push({
          latitude: lat,
          longitude: lng,
          brightness,
          scan: parseFloat(cols[3]) || 1,
          track: parseFloat(cols[4]) || 1,
          acq_date,
          acq_time,
          satellite,
          confidence,
          frp,
          daynight
        });
      }
    }

    // Sort by Fire Radiative Power (intensity) and take the top most significant fires
    firePoints.sort((a, b) => b.frp - a.frp);
    const topFires = firePoints.slice(0, maxPoints);

    const liveEvents: LiveEvent[] = topFires.map((fire, idx) => {
      const formattedTime = `${fire.acq_date} ${fire.acq_time.slice(0, 2)}:${fire.acq_time.slice(2)} UTC`;
      const satName = `NASA ${fire.satellite} MODIS (C6.1 NRT)`;

      return {
        id: `firms-${fire.acq_date}-${fire.acq_time}-${idx}`,
        type: 'wildfire',
        title: `Active Thermal Hotspot • FRP ${fire.frp.toFixed(0)} MW`,
        location: `${Math.abs(fire.latitude).toFixed(2)}° ${fire.latitude >= 0 ? 'N' : 'S'}, ${Math.abs(fire.longitude).toFixed(2)}° ${fire.longitude >= 0 ? 'E' : 'W'}`,
        lat: fire.latitude,
        lng: fire.longitude,
        detectedAt: formattedTime,
        exactUtcTimestamp: `${fire.acq_date}T${fire.acq_time.slice(0, 2)}:${fire.acq_time.slice(2)}:00Z`,
        source: satName,
        confidence: `${fire.confidence}% Confidence (${fire.daynight === 'D' ? 'Day' : 'Night'} pass)`,
        metricLabel: 'Fire Radiative Power (FRP)',
        metricValue: `${fire.frp.toFixed(1)} MW`,
        severity: fire.frp >= 100 ? 'critical' : 'extreme',
        details: `Real-time thermal anomaly detected by NASA FIRMS satellite pass. Brightness temperature: ${fire.brightness.toFixed(1)} K. Radiative power indicates high-temperature active flame combustion.`,
        url: 'https://firms.modaps.eosdis.nasa.gov/',
        isLiveFetched: true,
        attributionChain: {
          whyOccurred: 'Elevated surface aridity, low fuel moisture content, and atmospheric vapor pressure deficit.',
          whatItCauses: `Carbon dioxide emissions, atmospheric aerosols (PM2.5), and intense thermal radiative flux of ${fire.frp.toFixed(1)} MW.`,
          whatItAffects: 'Local vegetative cover, canopy health, downwind particulate air quality, and ecosystem habitats.',
          evidenceSensors: `${satName} 4-micron thermal infrared band.`,
          confidenceLevel: `${fire.confidence}% (NASA FIRMS Near-Real-Time algorithm)`
        }
      };
    });

    if (liveEvents.length > 0) {
      cachedFirmsEvents = liveEvents;
      lastFirmsFetchTime = now;
      return liveEvents;
    }
  } catch (err) {
    console.warn('[FIRMS Live] NASA FIRMS CSV fetch error, falling back to cached telemetry:', err);
  }

  return cachedFirmsEvents || [];
}
