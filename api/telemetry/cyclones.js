import { getCycloneTelemetry } from '../../server/telemetryEngine.mjs';

export default async function handler(req, res) {
  try {
    const data = await getCycloneTelemetry();
    res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed retrieving cyclone telemetry', details: err.message });
  }
}
