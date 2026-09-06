import { getFireTelemetry, getClusterDetail } from '../../server/telemetryEngine.mjs';

export default async function handler(req, res) {
  const clusterId = req.query?.id;
  if (clusterId) {
    const detail = getClusterDetail(clusterId);
    if (!detail) {
      return res.status(404).json({ error: 'Cluster not found' });
    }
    res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=360');
    return res.status(200).json(detail);
  }

  const sensor = (req.query?.sensor || 'ALL').toUpperCase();
  try {
    const data = await getFireTelemetry(sensor);
    res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=360');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed retrieving fire telemetry', details: err.message });
  }
}

