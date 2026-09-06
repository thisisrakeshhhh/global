import { getFireTelemetry } from '../../server/telemetryEngine.mjs';

export default async function handler(req, res) {
  const sensor = (req.query?.sensor || 'ALL').toUpperCase();
  try {
    const data = await getFireTelemetry(sensor);
    res.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed retrieving fire telemetry', details: err.message });
  }
}
