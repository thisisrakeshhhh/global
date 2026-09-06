import React from 'react';
import { ArrowLeft, BookOpen, ShieldCheck, Satellite, Flame, Wind, Database, Info, ExternalLink } from 'lucide-react';
import { AdSenseSlot } from '../UI/AdSenseSlot';

interface MethodologyPageProps {
  onBackToGlobe: () => void;
}

export const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBackToGlobe }) => {
  React.useEffect(() => {
    document.title = 'Scientific Methodology & Telemetry Pipeline | EARTH // LIVE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Peer-reviewed scientific methodology, 1.5° spatial clustering algorithms, NASA FIRMS VIIRS/MODIS sensors, and attribution framework of EARTH // LIVE.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBackToGlobe}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO 3D EARTH</span>
        </button>
        <span className="text-xs font-mono text-slate-400">
          DOC REF: <strong className="text-emerald-400">ETH-MET-2026-v1.5</strong>
        </span>
      </header>

      {/* Main Scientific Content Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        {/* Title Section */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>SCIENTIFIC DOCUMENTATION & METHODOLOGY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How EARTH // LIVE Ingests, Validates, and Clusters Planetary Telemetry
          </h1>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            A comprehensive overview of our data ingestion architectures, spatial grid binning algorithms, 
            sensor-specific confidence normalization, and multi-stage attribution framework.
          </p>
        </div>

        {/* Section 1: Ingestion & Sensor Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Satellite className="w-5 h-5 text-sky-400" />
            1. Satellite Ingestion Architecture: VIIRS & MODIS
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Active thermal telemetry is streamed from the <strong>NASA Fire Information for Resource Management System (FIRMS)</strong>, 
            co-managed by NASA LANCE (Land, Atmosphere Near real-time Capability for EOS). 
            Our ingestion layer aggregates three primary orbital instruments:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">NOAA-20 VIIRS</span>
              <span className="text-slate-400 block">Band: 375m I-band</span>
              <span className="text-slate-500 block mt-2 text-[11px]">Orbit: Sun-synchronous (13:30 ascending node). High spatial resolution.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">NOAA-21 VIIRS</span>
              <span className="text-slate-400 block">Band: 375m I-band</span>
              <span className="text-slate-500 block mt-2 text-[11px]">Primary operational sensor complement to NOAA-20. Replaces retiring S-NPP.</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">Terra & Aqua MODIS</span>
              <span className="text-slate-400 block">Collection 6.1 (1 km)</span>
              <span className="text-slate-500 block mt-2 text-[11px]">Historical baseline since 2000 with 4µm thermal infrared channels.</span>
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Note on constellation longevity: Suomi NPP operational products are scheduled to sunset in late 2026. 
            Consequently, EARTH // LIVE prioritizes NOAA-20 and NOAA-21 VIIRS datasets as the enduring long-term standard.
          </p>
        </section>

        {/* Section 2: Spatial Grid Binning & Clustering Math */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Flame className="w-5 h-5 text-orange-400" />
            2. Spatial Clustering: Discrete 1.5° × 1.5° Grid Binning
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Individual satellite thermal detections can exceed 20,000 points globally within a 24-hour cycle. 
            Plotting raw unaggregated points causes severe visual occlusion and degrades client performance. 
            EARTH // LIVE implements a deterministic <strong>1.5° × 1.5° geographic grid binning algorithm</strong>:
          </p>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div>binLat = Math.floor(latitude / 1.5) * 1.5</div>
            <div>binLng = Math.floor(longitude / 1.5) * 1.5</div>
            <div>totalFRP = Sum(FRP_i) [MW] across all detections in bin</div>
            <div>Centroid = ( Mean(lat_i), Mean(lng_i) )</div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Clusters are dynamically ranked by aggregate Fire Radiative Power (MW). When a user zooms into the globe 
            or clicks a cluster node, the client seamlessly expands the cluster into individual detection points 
            scaled directly by radiative power and detection confidence.
          </p>
        </section>

        {/* Section 3: Sensor Confidence Normalization */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            3. Sensor-Specific Confidence Normalization
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Different remote sensing systems encode detection certainty under distinct conventions. 
            MODIS utilizes an integer percentage \((0\% - 100\%)\), while VIIRS distributes categorical quality flags 
            (<em>low</em>, <em>nominal</em>, <em>high</em>). We normalize both without loss of fidelity:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li><strong>VIIRS Categorical:</strong> Flag <code>'h'</code> maps to High (92%), <code>'n'</code> maps to Nominal (68%), and <code>'l'</code> maps to Low (35%). Low-confidence detections are suppressed to filter solar glint and false positives.</li>
            <li><strong>MODIS Percentage:</strong> Values \(\ge 80\%\) are classified as High; values between \(50\% - 79\%\) as Nominal; values \(&lt; 50\%\) are filtered.</li>
          </ul>
        </section>

        {/* EDITORIAL CONTENT BREAK WITH ADSENSE COMPLIANCE */}
        <div className="py-4">
          <AdSenseSlot slotId="methodology-mid-banner" format="auto" />
        </div>

        {/* Section 4: Scientific Attribution Taxonomy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Info className="w-5 h-5 text-emerald-400" />
            4. Five-Stage Attribution Framework (Observation vs Cause)
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            A critical scientific failure of automated platforms is conflating <em>remote sensing detection</em> with 
            <em>causal attribution</em>. An orbital radiometer detecting a thermal spike cannot discern whether the fire 
            was ignited by dry lightning, agricultural slash-and-burn, accidental human ignition, or intentional arson.
          </p>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-3">
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold shrink-0">1. OBSERVATION</span>
              <span className="text-slate-300">Direct, verifiable sensor measurement (coordinates, radiometric brightness, pass time, FRP).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono font-bold shrink-0">2. EVENT</span>
              <span className="text-slate-300">Classified geophysical occurrence (e.g. Vegetative Wildfire Cluster, Category 3 Cyclone).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono font-bold shrink-0">3. POSSIBLE DRIVERS</span>
              <span className="text-slate-300">Documented environmental correlates (atmospheric vapor pressure deficit, dry canopy moisture, wind shear). Accompanied by explicit caveats on ignition source limits.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold shrink-0">4. POTENTIAL IMPACTS</span>
              <span className="text-slate-300">Biophysical and atmospheric consequences (PM2.5 tropospheric loading, canopy loss, carbon flux).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-500/20 text-slate-300 font-mono font-bold shrink-0">5. EVIDENCE & CITATIONS</span>
              <span className="text-slate-300">Direct citations to published peer-reviewed algorithms and operational government repositories.</span>
            </div>
          </div>
        </section>

        {/* Section 5: Zero Fabricated Fallback Policy */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Database className="w-5 h-5 text-rose-400" />
            5. Zero Fabricated Fallbacks
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            If an upstream NASA or NOAA feed undergoes downtime or network disruption, EARTH // LIVE 
            <strong>never generates synthetic or hardcoded fallback events</strong>. 
            Instead, the telemetry status transitions cleanly to <code>STATUS: DELAYED</code> with the timestamp 
            of the last verified orbital pass, or displays <code>NO SATELLITE DATA AVAILABLE</code>. 
            Integrity of observation is prioritized over cosmetic activity.
          </p>
        </section>

        {/* Section 6: Primary References */}
        <section className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-white font-mono">PEER-REVIEWED CITATIONS & DATA PROTOCOLS</h3>
          <ul className="text-xs text-slate-400 font-mono space-y-1.5">
            <li>• Giglio, L., Schroeder, W., & Justice, C. O. (2016). The collection 6 MODIS active fire detection algorithm and fire products. <em>Remote Sensing of Environment</em>, 178, 31-41.</li>
            <li>• Schroeder, W., Oliva, P., Giglio, L., & Csiszar, I. A. (2014). The New VIIRS 375 m active fire detection data product. <em>Remote Sensing of Environment</em>, 143, 85-96.</li>
            <li>• Hersbach, H., et al. (2020). The ERA5 global reanalysis. <em>Quarterly Journal of the Royal Meteorological Society</em>, 146(730), 1999-2049.</li>
            <li>• Tans, P., & Keeling, R. (2026). NOAA Global Monitoring Laboratory Mauna Loa CO₂ In-Situ Observations.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};
