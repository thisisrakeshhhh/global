import React from 'react';
import { ArrowLeft, Database, ExternalLink, Satellite, Wind, Flame, Thermometer, ShieldCheck } from 'lucide-react';
import { AdSenseSlot } from '../UI/AdSenseSlot';

interface DataSourcesPageProps {
  onBackToGlobe: () => void;
}

export const DataSourcesPage: React.FC<DataSourcesPageProps> = ({ onBackToGlobe }) => {
  React.useEffect(() => {
    document.title = 'Verified Public Scientific Repositories | EARTH // LIVE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Inventory of open scientific satellite datasets, planetary vitals observatories, and peer-reviewed reanalysis feeds powering EARTH // LIVE.');
    }
  }, []);

  const sources = [
    {
      name: 'NASA FIRMS (Fire Information for Resource Management System)',
      agency: 'NASA Earth Science Data and Information System (ESDIS) / LANCE',
      instruments: 'NOAA-20 VIIRS, NOAA-21 VIIRS, Terra & Aqua MODIS',
      cadence: 'Near-Real-Time (orbital latency ~1 to 3 hours globally)',
      description: 'Provides global 24-hour active fire radiometric detections, Fire Radiative Power (MW), brightness temperature (K), and pixel coordinates.',
      url: 'https://firms.modaps.eosdis.nasa.gov/',
      category: 'NEAR-REAL-TIME SATELLITE'
    },
    {
      name: 'NOAA National Hurricane Center (NHC)',
      agency: 'National Oceanic and Atmospheric Administration (NOAA)',
      instruments: 'GOES-East/West Geostationary Satellites, Scatterometers & Reconnaissance Dropsondes',
      cadence: 'Operational 3-hour / 6-hour Public Advisories',
      description: 'Active tropical cyclone center coordinates, maximum sustained winds, central barometric pressure, Saffir-Simpson category classification, and projected forecast tracks.',
      url: 'https://www.nhc.noaa.gov/',
      category: 'NEAR-REAL-TIME SATELLITE'
    },
    {
      name: 'NASA EONET v3 (Earth Observatory Natural Event Tracker)',
      agency: 'NASA Goddard Space Flight Center',
      instruments: 'Multi-satellite curated geophysical anomaly pipeline',
      cadence: 'Continuous event registry updates',
      description: 'Tracks major global natural hazards including riverine floods, severe volcanic plumes, and major sea ice breakups.',
      url: 'https://eonet.gsfc.nasa.gov/',
      category: 'NEAR-REAL-TIME SATELLITE'
    },
    {
      name: 'NOAA Global Monitoring Laboratory (GML) — Mauna Loa Observatory',
      agency: 'NOAA / Scripps Institution of Oceanography',
      instruments: 'In-situ high-precision non-dispersive infrared (NDIR) gas analyzers',
      cadence: 'Daily / Monthly In-Situ Observations',
      description: 'The definitive Keeling Curve continuous atmospheric carbon dioxide (CO₂) mole fraction measurement in parts per million (ppm).',
      url: 'https://gml.noaa.gov/ccgg/trends/',
      category: 'UPDATED OBSERVATIONS'
    },
    {
      name: 'Copernicus Climate Change Service (ERA5 Global Reanalysis)',
      agency: 'European Centre for Medium-Range Weather Forecasts (ECMWF)',
      instruments: 'Numerical weather prediction model assimilation of tens of millions of daily observations',
      cadence: 'Monthly ERA5 Climate Bulletins (latency ~5 days)',
      description: 'Comprehensive fifth-generation global atmospheric reanalysis providing 2m surface temperature anomalies relative to the 1850–1900 pre-industrial baseline.',
      url: 'https://climate.copernicus.eu/',
      category: 'REANALYSIS / HISTORICAL'
    },
    {
      name: 'NASA GISS Surface Temperature Analysis (GISTEMP v4)',
      agency: 'NASA Goddard Institute for Space Studies',
      instruments: 'In-situ surface air temperatures (NOAA GHCNv4) and sea surface temperatures (ERSST v5)',
      cadence: 'Monthly Anomaly Revisions',
      description: 'Calculates global mean surface temperature change from 1880 to the present with rigorous spatial weighting and urban heat island corrections.',
      url: 'https://data.giss.nasa.gov/gistemp/',
      category: 'REANALYSIS / HISTORICAL'
    }
  ];

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
          DATA INVENTORY: <strong className="text-emerald-400">OPEN SCIENCE</strong>
        </span>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <Database className="w-4 h-4" />
            <span>PRIMARY SCIENTIFIC DATA CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Public Data Repositories & Sensor Citations
          </h1>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            EARTH // LIVE operates exclusively on peer-reviewed, open scientific data repositories from NASA, NOAA, 
            Copernicus, and the WMO. Every observation displayed on our 3D globe preserves its original instrument 
            provenance and observation timestamp.
          </p>
        </div>

        {/* Repositories List */}
        <div className="space-y-6">
          {sources.slice(0, 3).map((source, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {source.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{source.cadence}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{source.name}</h2>
              <p className="text-xs font-mono text-emerald-400 mb-3">{source.agency}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{source.description}</p>
              <div className="text-xs font-mono text-slate-400 mb-4">
                <strong>Instruments / Sensors:</strong> {source.instruments}
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition"
              >
                Access Official Agency Repository <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}

          {/* EDITORIAL CONTENT BREAK WITH ADSENSE COMPLIANCE */}
          <div className="py-3">
            <AdSenseSlot slotId="datasources-mid-banner" format="auto" />
          </div>

          {sources.slice(3).map((source, idx) => (
            <div key={idx + 3} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {source.category}
                </span>
                <span className="text-xs font-mono text-slate-400">{source.cadence}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">{source.name}</h2>
              <p className="text-xs font-mono text-sky-400 mb-3">{source.agency}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{source.description}</p>
              <div className="text-xs font-mono text-slate-400 mb-4">
                <strong>Instruments / Sensors:</strong> {source.instruments}
              </div>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 transition"
              >
                Access Official Agency Repository <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
