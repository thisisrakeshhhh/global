import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ExternalLink, 
  BookOpen, 
  Globe, 
  ShieldAlert, 
  Bookmark, 
  ChevronRight, 
  ArrowLeft, 
  Flame, 
  Wind,
  CheckCircle,
  Activity
} from 'lucide-react';
import { ScientificCountryProfile } from '../../types/climateIntelligence';
import { TippingPoint } from '../../data/tippingPoints';
import { audioController } from '../../utils/audioController';

interface ScientificDossierProps {
  country: ScientificCountryProfile | null;
  tippingPoint: TippingPoint | null;
  onClose: () => void;
  defaultTab?: 'overview' | 'drivers' | 'impacts';
}

export const ScientificDossier: React.FC<ScientificDossierProps> = ({
  country,
  tippingPoint,
  onClose,
  defaultTab = 'overview'
}) => {
  const [viewMode, setViewMode] = useState<'card' | 'detailed'>(defaultTab === 'overview' ? 'card' : 'detailed');
  const [activeTab, setActiveTab] = useState<'drivers' | 'impacts'>('drivers');
  const [saved, setSaved] = useState(false);

  if (!country && !tippingPoint) return null;

  const title = country ? country.name : tippingPoint?.name || '';
  const code = country ? country.code : '';
  const description = country 
    ? `${country.name} (${country.code}) is a sovereign nation monitored for carbon emissions, territorial warming trends, and climate vulnerability under the Paris Agreement framework.`
    : tippingPoint?.fullDesc || '';

  // Wikipedia link
  const wikiUrl = country 
    ? `https://en.wikipedia.org/wiki/${encodeURIComponent(country.name)}`
    : `https://en.wikipedia.org/wiki/Tipping_points_in_the_climate_system`;

  const govUrl = country?.id === 'ind' 
    ? 'https://india.gov.in' 
    : country?.id === 'usa' 
    ? 'https://usa.gov' 
    : country?.id === 'chn'
    ? 'https://english.www.gov.cn'
    : 'https://unfccc.int';

  return (
    <div className="fixed top-20 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] rounded-2xl bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 shadow-2xl font-sans text-slate-100 p-5 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
      {/* Top Header matching Google Earth card */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {title}
              {code && <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">{code}</span>}
            </h2>
            <span className="text-[11px] text-slate-400">
              {country ? 'Sovereign Territory • Climate Profile' : 'Critical Planetary Tipping Element'}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            audioController.playClick();
            onClose();
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {viewMode === 'card' ? (
        /* Card Mode - 100% Google Earth layout */
        <div className="mt-4 space-y-4 text-xs">
          {/* Main Description */}
          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>

          {/* Quick Metrics Grid */}
          {country && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Surface Anomaly</span>
                <span className="text-base font-bold text-amber-400">+{country.tempAnomaly}°C</span>
                <span className="text-[10px] text-slate-500 block truncate">vs Pre-industrial</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Annual Emissions</span>
                <span className="text-base font-bold text-sky-400">{country.totalEmissionsGt} Gt</span>
                <span className="text-[10px] text-slate-500 block truncate">Gt CO₂e / year</span>
              </div>
            </div>
          )}

          {tippingPoint && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-bold text-amber-400">Tipping Threshold</span>
                <span className="font-mono text-xs font-bold text-white">{tippingPoint.thresholdTemp}</span>
              </div>
              <p className="text-[11px] text-slate-300">{tippingPoint.shortDesc}</p>
            </div>
          )}

          {/* External Verified Links matching Google Earth India links */}
          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span className="flex-1 font-medium">Wikipedia</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <a
              href={govUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              <Globe className="w-4 h-4 text-slate-400" />
              <span className="flex-1 font-medium">{country ? `${country.name} Official Portal` : 'UNFCCC Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            {country && (
              <a
                href="https://climateactiontracker.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
              >
                <Activity className="w-4 h-4 text-slate-400" />
                <span className="flex-1 font-medium">Climate Action Tracker ({country.parisStatus})</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            )}
          </div>

          {/* Primary Action Button (Blue Google Earth Style) */}
          <div className="pt-2">
            <button
              onClick={() => {
                audioController.playSelect();
                setViewMode('detailed');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>Explore Scientific Attribution Dossier</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Detailed Attribution Mode */
        <div className="mt-4 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode('card')}
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
            </button>

            {country && (
              <div className="flex bg-white/10 p-0.5 rounded-lg text-[10px]">
                <button
                  onClick={() => setActiveTab('drivers')}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'drivers' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  Drivers
                </button>
                <button
                  onClick={() => setActiveTab('impacts')}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === 'impacts' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
                >
                  Impacts
                </button>
              </div>
            )}
          </div>

          {/* Drivers Content */}
          {country && activeTab === 'drivers' && (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              <div className="text-[11px] font-semibold text-slate-400">Emissions by Sector (EDGAR / IEA):</div>
              {country.drivers.map((d, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{d.sector}</span>
                    <span className="font-mono text-blue-400 font-bold">{d.percentage}% ({d.annualGtCO2eq} Gt)</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{d.primaryMechanism}</p>
                  <div className="text-[10px] text-slate-500 font-mono">Source: {d.source}</div>
                </div>
              ))}
            </div>
          )}

          {/* Impacts Content */}
          {country && activeTab === 'impacts' && (
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              <div className="text-[11px] font-semibold text-slate-400">Attributed Biophysical Vulnerabilities:</div>
              {country.impacts.map((imp, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{imp.title}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-500/20 text-rose-300">{imp.severity}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{imp.observedEvidence}</p>
                  <div className="text-[10px] text-slate-500 font-mono">Citation: {imp.citations}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
