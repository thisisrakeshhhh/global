import React from 'react';
import { X, MapPin, AlertCircle, ArrowRight, ExternalLink, ShieldCheck, BookOpen, Clock, Newspaper, Activity, Waves, Flame, CloudRain } from 'lucide-react';
import { EventStory } from '../../types/eventStory';
import { RegionalLocalMap } from '../Map/RegionalLocalMap';
import { audioController } from '../../utils/audioController';

interface EventStoryModalProps {
  story: EventStory | null;
  onClose: () => void;
}

export const EventStoryModal: React.FC<EventStoryModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  const handleClose = () => {
    audioController.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md pointer-events-auto animate-fadeIn font-sans text-slate-100">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-2xl shadow-[0_0_80px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="flex items-start justify-between px-5 py-4 bg-slate-900/90 border-b border-cyan-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl p-1 bg-slate-800/80 rounded-xl border border-slate-700">
              {story.countryFlag}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                  {story.countryName}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-medium">
                  {story.region}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/40">
                  {story.statusBadge}
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black text-white leading-tight">
                {story.title}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{story.eventDate}</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            title="Close Story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* SECTION 1: WHAT HAPPENED? */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              WHAT HAPPENED?
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {story.summary}
            </p>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {story.keyFacts.map((fact, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">
                    {fact.label}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: 📍 WHERE IS IT HAPPENING? (2D Regional Map) */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs tracking-wider">
                <MapPin className="w-4 h-4" />
                📍 WHERE IS IT HAPPENING?
              </div>
              <span className="text-[11px] text-slate-400">
                Globe shows where on Earth • Local map shows where exactly
              </span>
            </div>

            {/* 2D Local Map */}
            <RegionalLocalMap config={story.mapConfig} title={`${story.countryName} — Local Flood Corridor`} />
          </section>

          {/* SECTION 3: WHY DID IT HAPPEN? (Visual Causal Chain + Uncertainty) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-xs tracking-wider">
              <Activity className="w-4 h-4" />
              WHY DID IT HAPPEN?
            </div>

            {/* Step-by-Step Causal Chain */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Visual Causal Chain of Events:
              </span>

              <div className="flex flex-col gap-2">
                {story.causalChain.map((step, idx) => {
                  const isLast = idx === story.causalChain.length - 1;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      {/* Step Indicator */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-cyan-500/50 flex items-center justify-center text-xs font-mono font-bold text-cyan-300">
                          {idx + 1}
                        </div>
                        {!isLast && <div className="w-0.5 h-6 bg-slate-700 my-0.5" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-slate-100 text-xs sm:text-sm">
                            {step.label}
                          </span>
                          <span
                            className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border ${
                              step.certainty === 'OBSERVED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : step.certainty === 'ASSESSED'
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {step.certainty.replace('_', ' ')}
                          </span>
                        </div>
                        {step.detail && (
                          <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                            {step.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scientific Uncertainty Notice */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{story.uncertaintyNotes}</span>
            </div>
          </section>

          {/* SECTION 4: WHAT WAS AFFECTED? */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold uppercase text-xs tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              WHAT WAS AFFECTED?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Communities & Citizens
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {story.impactsSummary.communities}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Roads & Bridges
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {story.impactsSummary.infrastructure}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Power & Hydro Facilities
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {story.impactsSummary.hydropowerAndTransport}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: 📰 WHAT ARE SOURCES REPORTING? */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs tracking-wider">
                <Newspaper className="w-4 h-4" />
                📰 WHAT ARE SOURCES REPORTING?
              </div>
              <span className="text-[11px] text-slate-400">
                Credible news agencies & official situation bulletins
              </span>
            </div>

            <div className="space-y-2.5">
              {story.newsReports.map((report, idx) => (
                <a
                  key={idx}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-cyan-400 text-xs">
                        {report.source}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {report.publishedAt}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                  </div>

                  <h3 className="font-bold text-slate-200 text-xs sm:text-sm group-hover:text-white transition">
                    {report.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">
                    {report.snippet}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* SECTION 6: 🌍 CONNECT TODAY WITH HISTORY */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-xs tracking-wider">
              <Clock className="w-4 h-4" />
              🌍 CONNECT TODAY WITH HISTORY: IS THE CLIMATE CHANGING?
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Temperature Trend */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">
                    Surface Warming (1850–Present)
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {story.historicalContext.tempAnomaly1850toNow}
                  </p>
                </div>

                {/* Rainfall Trend */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-sky-400 font-bold uppercase block mb-1">
                    Precipitation Dynamics
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {story.historicalContext.rainfallTrend}
                  </p>
                </div>

                {/* Cryosphere Trend */}
                {story.historicalContext.cryosphereTrend && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-1">
                      Himalayan Glaciers & Moraines
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {story.historicalContext.cryosphereTrend}
                    </p>
                  </div>
                )}
              </div>

              {/* Attribution Guardrail Callout */}
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5 text-xs text-cyan-200/90 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{story.historicalContext.attributionGuardrail}</span>
              </div>
            </div>
          </section>

          {/* SECTION 7: 🔬 SCIENTIFIC EVIDENCE & CITATIONS */}
          <section className="space-y-3 pb-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-xs tracking-wider">
              <BookOpen className="w-4 h-4" />
              🔬 SCIENTIFIC EVIDENCE & PRIMARY DATASETS
            </div>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <strong className="text-slate-300 block mb-1">Satellite Remote Sensing:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                  {story.evidenceSources.satelliteSystems.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-300 block mb-1">Government & Emergency Feeds:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                  {story.evidenceSources.governmentAgencies.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-300 block mb-1">Scientific Data Sources:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                  {story.evidenceSources.scientificDatasets.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900/90 border-t border-cyan-500/30 flex items-center justify-between text-xs">
          <span className="text-[10px] text-slate-500">
            EARTH // LIVE • Verified Evidence & Climate Intelligence
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
