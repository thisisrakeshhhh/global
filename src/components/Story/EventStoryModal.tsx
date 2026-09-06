import { X, MapPin, AlertCircle, ExternalLink, ShieldCheck, BookOpen, Clock, Newspaper, Activity, ArrowRight, TrendingUp } from 'lucide-react';
import { EventStory } from '../../types/eventStory';
import { RegionalLocalMap } from '../Map/RegionalLocalMap';
import { audioController } from '../../utils/audioController';

interface EventStoryModalProps {
  story: EventStory | null;
  onClose: () => void;
  onExploreHistory?: (indicator?: string, year?: number) => void;
}

export const EventStoryModal: React.FC<EventStoryModalProps> = ({ story, onClose, onExploreHistory }) => {
  if (!story) return null;

  const handleClose = () => {
    audioController.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md pointer-events-auto animate-fadeIn font-sans text-slate-200">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-start justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl p-1 bg-slate-800 rounded-lg border border-slate-700/60">
              {story.countryFlag}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                  {story.countryName}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400">
                  {story.region}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700">
                  {story.statusBadge}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-50 leading-tight">
                {story.title}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-500" />
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
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* SECTION 1: WHAT HAPPENED? */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              What happened?
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {story.summary}
            </p>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {story.keyFacts.map((fact, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                    {fact.label}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-100 block">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2: 📍 WHERE IS IT HAPPENING? (2D Regional Map) */}
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Where is it happening?</span>
              </div>
              <span className="text-[11px] text-slate-500">
                The globe shows where on Earth; the local map shows where exactly.
              </span>
            </div>

            {/* 2D Local Map */}
            <RegionalLocalMap config={story.mapConfig} title={`${story.countryName} Local Geography`} />
          </section>

          {/* SECTION 3: WHY DID IT HAPPEN? (Visual Causal Chain + Uncertainty) */}
          <section className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span>Why did it happen?</span>
            </div>

            {/* Causal Chain */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-xs text-slate-400 font-medium block">
                Causal chain of events:
              </span>

              <div className="flex flex-col gap-2">
                {story.causalChain.map((step, idx) => {
                  const isLast = idx === story.causalChain.length - 1;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-mono font-semibold text-slate-300">
                          {idx + 1}
                        </div>
                        {!isLast && <div className="w-px h-6 bg-slate-800 my-0.5" />}
                      </div>

                      <div className="flex-1 pb-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                            {step.label}
                          </span>
                          <span
                            className={`text-[9px] uppercase font-medium px-2 py-0.5 rounded border ${
                              step.certainty === 'OBSERVED'
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                : step.certainty === 'ASSESSED'
                                ? 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                                : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
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

            {/* Uncertainty Notice */}
            <div className="p-3.5 rounded-xl bg-amber-950/15 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{story.uncertaintyNotes}</span>
            </div>
          </section>

          {/* SECTION 4: WHAT WAS AFFECTED? */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              What was affected?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Communities & Citizens
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {story.impactsSummary.communities}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Roads & Bridges
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {story.impactsSummary.infrastructure}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Power & Hydro Facilities
                </span>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {story.impactsSummary.hydropowerAndTransport}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: 📰 WHAT ARE SOURCES REPORTING? */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                <span>What are sources reporting?</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Verified news agencies & official situation bulletins
              </span>
            </div>

            <div className="space-y-2">
              {story.newsReports.map((report, idx) => (
                <a
                  key={idx}
                  href={report.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-300 text-xs">
                        {report.source}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {report.publishedAt}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition" />
                  </div>

                  <h4 className="font-semibold text-slate-100 text-xs sm:text-sm group-hover:text-white transition">
                    {report.title}
                  </h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">
                    {report.snippet}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* SECTION 6: 🌍 CONNECT TODAY WITH HISTORY */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Connect today with history: Is the climate changing?
            </h3>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                    Surface Warming (1850–Present)
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {story.historicalContext.tempAnomaly1850toNow}
                  </p>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                    Precipitation Dynamics
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {story.historicalContext.rainfallTrend}
                  </p>
                </div>

                {story.historicalContext.cryosphereTrend && (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                      Glaciers & Cryosphere
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {story.historicalContext.cryosphereTrend}
                    </p>
                  </div>
                )}
              </div>

              {/* Attribution Guardrail Callout */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{story.historicalContext.attributionGuardrail}</span>
              </div>

              {/* Systematic Context-Linked History Badges */}
              {onExploreHistory && (
                <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Explore how this event's environmental drivers compare with verified planetary climate records:</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {(story.historicalContext.historyLinks && story.historicalContext.historyLinks.length > 0 
                      ? story.historicalContext.historyLinks 
                      : [{ indicator: story.historicalContext.linkedIndicator || 'temperature', label: 'Global Surface Temperature', year: 2026 }]
                    ).map((link, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={() => {
                          onClose();
                          onExploreHistory(link.indicator, link.year || 2026);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-cyan-500/50 text-xs font-medium transition cursor-pointer group"
                        title={link.contextRationale}
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Note: Historical records establish broad climate trends and baselines; they do not by themselves determine causation for any single event.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 7: 🔬 SCIENTIFIC EVIDENCE & CITATIONS */}
          <section className="space-y-3 pb-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Scientific evidence & primary datasets
            </h3>

            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <strong className="text-slate-300 block mb-1 text-xs">Satellite Remote Sensing:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                  {story.evidenceSources.satelliteSystems.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-300 block mb-1 text-xs">Government & Official Feeds:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-400 text-[11px]">
                  {story.evidenceSources.governmentAgencies.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-300 block mb-1 text-xs">Scientific Datasets:</strong>
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
        <div className="px-6 py-3.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            EARTH // LIVE • Verified Evidence & Climate Intelligence
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
