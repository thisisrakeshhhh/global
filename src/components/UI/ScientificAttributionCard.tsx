import React from 'react';
import { 
  X, 
  ExternalLink, 
  Satellite, 
  Flame, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  Copy, 
  Check, 
  HelpCircle,
  Eye
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

  // Derive title, provenance, and 5-stage attribution
  let title = '';
  let subheader = '';
  let badgeLabel = '';
  let attribution = (event as any).attribution;
  let provenance = (event as any).provenance;

  if (isCluster) {
    const cl = event as FireCluster;
    title = `Active Vegetative Fire Cluster • ${cl.regionName}`;
    subheader = `${cl.detectionCount} Satellite Detections • ${cl.totalFRP} MW Combined Fire Radiative Power`;
    badgeLabel = 'THERMAL CLUSTER (1.5° GRID)';
    attribution = buildFireClusterAttribution(cl);
    provenance = cl.provenance;
  } else if (isCyclone) {
    const cy = event as NOAACycloneEvent;
    title = `${cy.category} ${cy.stormName}`;
    subheader = `${cy.basin} Basin • Max Winds ${cy.maxSustainedWindsMph} mph • Pressure ${cy.centralPressureMb} mb`;
    badgeLabel = 'TROPICAL CYCLONE (NOAA NHC)';
    attribution = buildCycloneAttribution(cy);
    provenance = cy.provenance;
  } else if (isPoint) {
    const pt = event as FireDetectionPoint;
    title = `Active Combustion Point • FRP ${pt.frp.toFixed(1)} MW`;
    subheader = `Sensor: ${pt.satellite} • Radiance: ${pt.brightness.toFixed(1)} K • Confidence: ${pt.confidence.level.toUpperCase()}`;
    badgeLabel = 'ORBITAL THERMAL POINT';
    attribution = buildFirePointAttribution(pt, `${pt.lat.toFixed(2)}°, ${pt.lng.toFixed(2)}°`);
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
    title = ev.title;
    subheader = `${ev.location} • ${ev.metricLabel}: ${ev.metricValue}`;
    badgeLabel = ev.type.toUpperCase();
    if (!attribution) {
      attribution = {
        observation: {
          description: ev.details || 'Orbital satellite observation.',
          instrument: ev.source,
          timestampUtc: ev.exactUtcTimestamp,
          confidenceTag: 'OBSERVED'
        },
        event: {
          classification: ev.title,
          intensityMetric: ev.metricValue,
          confidenceTag: 'HIGH CONFIDENCE'
        },
        possibleDrivers: {
          factors: ['Favorable regional atmospheric thermal preconditions.'],
          caveat: 'Direct causal attribution cannot be inferred from satellite observation alone.',
          confidenceTag: 'POSSIBLE DRIVER'
        },
        potentialImpacts: {
          consequences: ['Regional environmental stress and local particulate displacement.'],
          confidenceTag: 'ESTIMATED'
        },
        evidenceAndCitations: {
          datasets: [ev.source],
          doiOrUrl: ev.url
        }
      };
    }
  }

  const handleCopyProvenance = () => {
    if (provenance) {
      navigator.clipboard.writeText(JSON.stringify(provenance, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed top-20 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1e1e1e]/95 border border-white/10 shadow-2xl backdrop-blur-xl text-slate-100 font-sans p-5 animate-in fade-in slide-in-from-right-4 duration-200 scrollbar-thin scrollbar-thumb-white/20">
      {/* Header */}
      <div className="flex items-start justify-between pb-3.5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wide bg-blue-500/20 text-blue-300 border border-blue-500/30">
              {badgeLabel}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {attribution?.observation?.timestampUtc 
                ? new Date(attribution.observation.timestampUtc).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) + ' UTC'
                : 'Observed'}
            </span>
          </div>
          <h2 className="text-base font-bold text-white mt-1.5 leading-snug">{title}</h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">{subheader}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close dossier"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Cluster Drilldown Action */}
      {isCluster && onDrillDownCluster && (
        <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-white block">Expand Active Points</span>
            <span className="text-[11px] text-slate-400">View individual satellite detection pins</span>
          </div>
          <button
            onClick={() => onDrillDownCluster((event as FireCluster).id)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1 transition shadow-md"
          >
            Zoom In <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5-Stage Scientific Dossier */}
      <div className="mt-4 space-y-3 text-xs">
        {/* Stage 1: Observation */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> 1. SATELLITE OBSERVATION
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
              OBSERVED
            </span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{attribution.observation.description}</p>
          <div className="mt-2 text-[10px] font-mono text-slate-400">
            SENSOR: <strong className="text-slate-200">{attribution.observation.instrument}</strong>
          </div>
        </div>

        {/* Stage 2: Event */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-blue-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> 2. CLASSIFIED EVENT
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-500/20 text-blue-300">
              {attribution.event.confidenceTag}
            </span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{attribution.event.classification}</p>
        </div>

        {/* Stage 3: Possible Drivers */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-purple-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> 3. POSSIBLE DRIVERS
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300">
              {attribution.possibleDrivers.confidenceTag}
            </span>
          </div>
          <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
            {attribution.possibleDrivers.factors.map((fac: string, idx: number) => (
              <li key={idx} className="leading-relaxed">{fac}</li>
            ))}
          </ul>
          <div className="mt-2 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-200 flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
            <span>{attribution.possibleDrivers.caveat}</span>
          </div>
        </div>

        {/* Stage 4: Potential Impacts */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> 4. POTENTIAL IMPACTS
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300">
              {attribution.potentialImpacts.confidenceTag}
            </span>
          </div>
          <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
            {attribution.potentialImpacts.consequences.map((c: string, idx: number) => (
              <li key={idx} className="leading-relaxed">{c}</li>
            ))}
          </ul>
        </div>

        {/* Stage 5: Evidence & Citations */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> 5. EVIDENCE & CITATIONS
            </span>
          </div>
          <div className="space-y-1 text-slate-400 text-xs">
            {attribution.evidenceAndCitations.datasets.map((ds: string, idx: number) => (
              <div key={idx} className="flex items-center gap-1 text-slate-300">
                <span className="text-slate-500">•</span>
                <span>{ds}</span>
              </div>
            ))}
          </div>
          {attribution.evidenceAndCitations.doiOrUrl && (
            <a
              href={attribution.evidenceAndCitations.doiOrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[11px] text-blue-400 hover:underline"
            >
              Verify Primary Data Repository <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Provenance Metadata Card */}
      {provenance && (
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-slate-500 tracking-wider">DATA PROVENANCE</span>
            <button
              onClick={handleCopyProvenance}
              className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied Provenance' : 'Copy JSON'}
            </button>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/80 font-mono text-[10px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Source:</span>
              <span className="text-slate-300 font-semibold">{provenance.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Dataset:</span>
              <span className="text-slate-300">{provenance.dataset}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Observed UTC:</span>
              <span className="text-slate-300">{provenance.observationTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ingested UTC:</span>
              <span className="text-slate-300">{provenance.ingestionTime}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
