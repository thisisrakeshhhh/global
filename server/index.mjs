import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  getFireTelemetry, 
  getClusterDetail, 
  getCycloneTelemetry, 
  getFreshnessTelemetry 
} from './telemetryEngine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

const PORT = parseInt(process.env.PORT || '3001', 10);

// MIME types lookup
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'public, max-age=180'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ==========================================
  // PRODUCTION TELEMETRY API ENDPOINTS
  // ==========================================

  // 1. Fire Clusters Endpoint: /api/telemetry/fires
  if (pathname === '/api/telemetry/fires') {
    const sensor = (parsedUrl.searchParams.get('sensor') || 'ALL').toUpperCase();
    try {
      const data = await getFireTelemetry(sensor);
      return sendJson(res, 200, data);
    } catch (err) {
      console.error('[API Error] /api/telemetry/fires:', err);
      return sendJson(res, 500, { error: 'Failed retrieving fire telemetry', details: err.message });
    }
  }

  // 2. On-Demand Cluster Detail: /api/telemetry/fires/:clusterId
  if (pathname.startsWith('/api/telemetry/fires/')) {
    const clusterId = pathname.replace('/api/telemetry/fires/', '');
    try {
      const cluster = await getClusterDetail(clusterId);
      if (!cluster) {
        return sendJson(res, 404, { error: 'Cluster not found', clusterId });
      }
      return sendJson(res, 200, cluster);
    } catch (err) {
      console.error(`[API Error] /api/telemetry/fires/${clusterId}:`, err);
      return sendJson(res, 500, { error: 'Failed retrieving cluster detail', details: err.message });
    }
  }

  // 3. NOAA NHC Cyclones Endpoint: /api/telemetry/cyclones
  if (pathname === '/api/telemetry/cyclones') {
    try {
      const data = await getCycloneTelemetry();
      return sendJson(res, 200, data);
    } catch (err) {
      console.error('[API Error] /api/telemetry/cyclones:', err);
      return sendJson(res, 500, { error: 'Failed retrieving cyclone telemetry', details: err.message });
    }
  }

  // 4. Freshness Telemetry Reports: /api/telemetry/freshness
  if (pathname === '/api/telemetry/freshness') {
    try {
      const data = getFreshnessTelemetry();
      return sendJson(res, 200, data);
    } catch (err) {
      console.error('[API Error] /api/telemetry/freshness:', err);
      return sendJson(res, 500, { error: 'Failed retrieving freshness telemetry', details: err.message });
    }
  }

  // ==========================================
  // STATIC PRODUCTION SPA ASSET SERVING
  // ==========================================
  if (fs.existsSync(DIST_DIR)) {
    let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);

    // Prevent directory traversal
    if (!filePath.startsWith(DIST_DIR)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      return fs.createReadStream(filePath).pipe(res);
    }

    // SPA Fallback: send index.html for client-side routes
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(indexPath).pipe(res);
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found (Build frontend with `npm run build` first)');
});

server.listen(PORT, () => {
  console.log(`[EARTH // LIVE Production Server] Running on http://localhost:${PORT}`);
  console.log(`[API Ready] Endpoints active:`);
  console.log(`  • GET http://localhost:${PORT}/api/telemetry/fires`);
  console.log(`  • GET http://localhost:${PORT}/api/telemetry/cyclones`);
  console.log(`  • GET http://localhost:${PORT}/api/telemetry/freshness`);
});
