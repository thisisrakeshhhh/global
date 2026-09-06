import { getClusterDetail } from '../../../server/telemetryEngine.mjs';

export default async function handler(req, res) {
  const clusterId = req.query?.id;
  if (!clusterId) {
    return res.status(400).json({ error: 'Missing cluster id parameter' });
  }

  try {
    const detail = getClusterDetail(clusterId);
    if (!detail) {
      return res.status(404).json({ error: 'Cluster not found' });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=360');
    return res.status(200).json(detail);
  } catch (err) {
    return res.status(500).json({ error: 'Failed retrieving cluster detail', details: err.message });
  }
}
