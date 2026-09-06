import React from 'react';
import { 
  X, 
  ExternalLink, 
  Flame, 
  Disc, 
  AlertTriangle, 
  CheckCircle2, 
  BookOpen, 
  Copy, 
  Check, 
  HelpCircle,
  Eye,
  ArrowRight,
  TrendingDown,
  Wind
} from 'lucide-react';
import { FireCluster, NOAACycloneEvent, LiveEvent, FireDetectionPoint } from '../../types/climateIntelligence';
import { 
  buildFireClusterAttribution, 
  buildCycloneAttribution,
  buildFirePointAttribution 
} from '../../services/scientificAttributionService';

interface ScientificAttributionCardProps {
  event: LiveEvent | FireCluster | NOAACycloneEvent | FireDetectionPoint | null;
  onClose: () => void;
  onDrillDownCluster?: (clusterId: string) => void;
}

export const ScientificAttributionCard: React.FC<ScientificAttributionCardProps> = ({
  event,
  onClose,
  onDrillDownCluster
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!event) return null;

  const isCluster = 'gridKey' in event;
  const isCyclone = 'stormName' in event;
  const isPoint = 'frp' in event && !('gridKey' in event);

  // Derive intelligence details
  let eventType: 'wildfire' | 'cyclone' | 'general' = 'wildfire';
  let title = '';
  let location = '';
  let detections = 0;
  let intensity = '';
  let observationTime = '';
  let source = '';
  let attribution = (event as any).attribution;
  let provenance = (event as any).provenance;

  if (isCluster) {
    const cl = event as FireCluster;
    eventType = 'wildfire';
    title = 'Active Wildfire Cluster';
    location = cl.regionName || `${cl.lat.toFixed(2)}°, ${cl.lng.toFixed(2)}°`;
    detections = cl.detectionCount;
    intensity = `${Math.round(cl.totalFRP)} MW (Peak ${Math.round(cl.maxFRP)} MW)`;
    observationTime = cl.latestObservation 
      ? new Date(cl.latestObservation).toUTCString().slice(5, 22) + ' UTC'
      : 'Recent NASA Pass';
    source = `NASA FIRMS (${cl.satellites.join(', ')})`;
    attribution = buildFireClusterAttribution(cl);
    provenance = cl.provenance;
  } else if (isCyclone) {
    const cy = event as NOAACycloneEvent;
    eventType = 'cyclone';
    title = `${cy.category} ${cy.stormName}`;
    location = `${cy.basin} Basin (${cy.currentLat.toFixed(1)}°, ${cy.currentLng.toFixed(1)}°)`;
    detections = 1;
    intensity = `Max Winds ${cy.maxSustainedWindsMph} mph • Pressure ${cy.centralPressureMb} mb`;
    observationTime = cy.advisoryTimeUtc 
      ? new Date(cy.advisoryTimeUtc).toUTCString().slice(5, 22) + ' UTC'
      : 'Active Advisory';
    source = 'NOAA National Hurricane Center (NHC)';
    attribution = buildCycloneAttribution(cy);
    provenance = cy.provenance;
  } else if (isPoint) {
    const pt = event as FireDetectionPoint;
    eventType = 'wildfire';
    title = 'Active Combustion Point';
    location = `${pt.lat.toFixed(3)}°, ${pt.lng.toFixed(3)}°`;
    detections = 1;
    intensity = `${pt.frp.toFixed(1)} MW FRP • Brightness ${pt.brightness.toFixed(1)} K`;
    observationTime = `${pt.acqDate} • ${pt.acqTime} UTC`;
    source = `NASA FIRMS (${pt.satellite})`;
    attribution = buildFirePointAttribution(pt, location);
    provenance = {
      source: 'NASA FIRMS',
      dataset: pt.satellite,
      observationTime: `${pt.acqDate}T${pt.acqTime.slice(0, 2)}:${pt.acqTime.slice(2)}:00Z`,
      ingestionTime: new Date().toISOString(),
      processingVersion: 'v1.0',
      sourceUrl: 'https://firms.modaps.eosdis.nasa.gov/'
    };
  } else {
    const ev = event as LiveEvent;
    eventType = ev.type === 'cyclone' ? 'cyclone' : 'wildfire';
    title = ev.title;
    location = ev.location;
    detections = ev.detectionCount || 1;
    intensity = `${ev.metricLabel}: ${ev.metricValue}`;
    observationTime = ev.detectedAt || 'Recent Observation';
    source = ev.source || 'NASA / NOAA Live Pipeline';
  }

  const handleCopyProvenance = () => {
    if (provenance) {
      navigator.clipboard.writeText(JSON.stringify(provenance, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 w-[440px] max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-950/95 border border-slate-700/80 shadow-2xl backdrop-blur-2xl text-slate-200 font-sans p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 no-scrollbar">
      {/* Top Bar with Close */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-rose-500/20 text-rose-400">
            {eventType === 'wildfire' ? <Flame className="w-4 h-4" /> : <Disc className="w-4 h-4" />}
          </div>
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            Event Intelligence Dossier
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          title="Close Intelligence Dossier"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* SECTION 1: WHAT HAPPENED? */}
      <div className="mt-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-orange-400" /> WHAT HAPPENED?
          </span>
          <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">
            REAL SATELLITE DETECTION
          </span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="text-sm font-bold text-white">{title}</div>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] mt-2 pt-2 border-t border-slate-800/80">
            <div>
              <span className="text-slate-500 block text-[10px]">LOCATION</span>
              <span className="text-slate-200 font-medium">{location}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">INTENSITY</span>
              <span className="text-amber-400 font-mono font-semibold">{intensity}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">SATELLITE DETECTIONS</span>
              <span className="text-slate-200 font-mono">{detections} points</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">OBSERVED UTC</span>
              <span className="text-slate-200 font-mono">{observationTime}</span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Source: <strong className="text-cyan-300">{source}</strong>
          </div>
        </div>

        {/* Drill Down Cluster Action */}
        {isCluster && onDrillDownCluster && (
          <button
            onClick={() => onDrillDownCluster((event as FireCluster).id)}
            className="mt-2.5 w-full py-1.5 px-2.5 rounded-lg bg-orange-600/90 hover:bg-orange-500 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
          >
            <span>Inspect All {(event as FireCluster).detectionCount} Individual Detection Points</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* SECTION 2: WHY IS IT HAPPENING? */}
      <div className="mt-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
        <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> WHY IS IT HAPPENING?
        </span>

        {eventType === 'wildfire' ? (
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                Likely Environmental Preconditions
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Elevated surface temperature & high vapor pressure deficit (VPD)</li>
                <li>Low vegetation & fine fuel moisture content in ground litter</li>
                <li>Atmospheric wind conditions facilitating thermal propagation</li>
              </ul>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80">
              <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                Possible Ignition Sources
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Natural lightning discharge</li>
                <li>Agricultural pasture maintenance or crop residue burn</li>
                <li>Accidental ignition or sparks from machinery/transport</li>
                <li>Land clearing or deforestation activity</li>
              </ul>
            </div>

            {/* Scientific Truth Caveat */}
            <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-800/40 text-[10px] text-purple-200 flex items-start gap-1.5 mt-2">
              <AlertTriangle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Scientific Caveat:</strong> NASA FIRMS satellite sensors detect thermal radiative power only; remote sensing cannot identify which individual person or ignition source initiated combustion.
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider block mb-1">
                Thermodynamic & Atmospheric Drivers
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Sea surface temperatures above the critical 26.5°C threshold</li>
                <li>High mid-tropospheric atmospheric moisture content</li>
                <li>Low vertical wind shear allowing convective vertical column development</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: WHAT CAN THIS CAUSE? */}
      <div className="mt-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
          <TrendingDown className="w-3.5 h-3.5 text-amber-400" /> WHAT CAN THIS CAUSE?
        </span>

        {eventType === 'wildfire' ? (
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Immediate Physical Impacts
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Dense smoke plumes with hazardous PM2.5 particulate concentrations</li>
                <li>Acute reduction in regional air quality and surface visibility</li>
                <li>Vegetation canopy loss and ground habitat combustion</li>
              </ul>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80">
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Environmental & Atmospheric Fluxes
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Pulse release of biogenic carbon dioxide (CO₂) and carbon monoxide (CO)</li>
                <li>Black carbon aerosol deposition affecting surface albedo</li>
                <li>Soil organic horizon depletion and erosion susceptibility</li>
              </ul>
            </div>

            <div className="pt-1.5 border-t border-slate-800/80">
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Downstream Consequences
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Downwind atmospheric transport to inhabited communities</li>
                <li>Human respiratory health risk and cardiovascular exposure</li>
                <li>Long-term alteration of regional ecological succession</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                Severe Meteorological Impacts
              </span>
              <ul className="text-[11px] text-slate-300 space-y-0.5 list-disc list-inside">
                <li>Destructive cyclonic winds exceeding sustained thresholds</li>
                <li>Storm surge and extreme coastal marine inundation</li>
                <li>Extreme precipitation leading to inland flash flooding and landslides</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: EVIDENCE & METHODOLOGY */}
      <div className="mt-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" /> EVIDENCE & CITATIONS
          </span>
          <button
            onClick={handleCopyProvenance}
            className="text-[9px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'JSON Provenance'}</span>
          </button>
        </div>

        <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
          <li>NASA FIRMS Near-Real-Time (NRT) Satellite Pipeline</li>
          <li>Schroeder et al. (2014) VIIRS 375m Active Fire Detection Algorithm</li>
          <li>Giglio et al. (2016) MODIS Collection 6.1 Thermal Anomaly Product</li>
        </ul>

        <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
          <a
            href="https://firms.modaps.eosdis.nasa.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>Verify in Primary NASA Data Repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
