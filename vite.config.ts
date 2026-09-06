import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { 
  getFireTelemetry, 
  getClusterDetail, 
  getCycloneTelemetry, 
  getFreshnessTelemetry 
} from './server/telemetryEngine.mjs';

function telemetryDevPlugin(): Plugin {
  return {
    name: 'telemetry-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/telemetry/')) {
          return next();
        }

        try {
          const parsedUrl = new URL(req.url, 'http://localhost:5173');
          const pathname = parsedUrl.pathname;

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');

          if (pathname === '/api/telemetry/fires') {
            const sensor = (parsedUrl.searchParams.get('sensor') || 'ALL').toUpperCase();
            const data = await getFireTelemetry(sensor);
            return res.end(JSON.stringify(data));
          }

          if (pathname.startsWith('/api/telemetry/fires/')) {
            const clusterId = pathname.replace('/api/telemetry/fires/', '');
            const data = getClusterDetail(clusterId);
            if (!data) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: 'Cluster not found' }));
            }
            return res.end(JSON.stringify(data));
          }

          if (pathname === '/api/telemetry/cyclones') {
            const data = await getCycloneTelemetry();
            return res.end(JSON.stringify(data));
          }

          if (pathname === '/api/telemetry/freshness') {
            const data = getFreshnessTelemetry();
            return res.end(JSON.stringify(data));
          }
        } catch (err) {
          console.error('[Dev Telemetry Middleware Error]:', err);
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: err.message }));
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    telemetryDevPlugin()
  ],
  server: {
    port: 5173,
    host: true
  }
});
