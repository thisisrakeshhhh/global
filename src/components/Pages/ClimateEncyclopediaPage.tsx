import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  Thermometer, 
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { 
  CLIMATE_ARTICLES, 
  TopicCategory, 
  EncyclopediaArticle 
} from '../../data/encyclopediaData';

interface ClimateEncyclopediaPageProps {
  onBackToGlobe: () => void;
}

export const ClimateEncyclopediaPage: React.FC<ClimateEncyclopediaPageProps> = ({ onBackToGlobe }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory>('ALL');
  const [activeArticleId, setActiveArticleId] = useState<string>(CLIMATE_ARTICLES[0].id);

  React.useEffect(() => {
    document.title = 'Climate Science Encyclopedia | EARTH // LIVE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Peer-reviewed climate science compendium: greenhouse effect physics, Keeling curve, ocean heat uptake, cryosphere dynamics, tipping points, and extreme weather attribution.');
    }
  }, []);

  const categories: { id: TopicCategory; label: string }[] = [
    { id: 'ALL', label: 'All Topics' },
    { id: 'PHYSICAL_BASIS', label: 'Physical Science Basis' },
    { id: 'GREENHOUSE_GASES', label: 'Greenhouse Gases & Carbon' },
    { id: 'CRYOSPHERE_OCEANS', label: 'Oceans & Ice Sheets' },
    { id: 'TIPPING_POINTS', label: 'Planetary Tipping Points' },
    { id: 'EXTREME_WEATHER', label: 'Attribution & Extremes' },
    { id: 'EMISSIONS_INVENTORY', label: 'Emissions & Sectors' },
    { id: 'IPCC_SCENARIOS', label: 'IPCC Scenarios & Budgets' },
    { id: 'MITIGATION_SOLUTIONS', label: 'Solutions & Transition' },
    { id: 'GLOSSARY', label: 'Scientific Glossary' }
  ];

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return CLIMATE_ARTICLES.filter(article => {
      const matchesCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inTitle = article.title.toLowerCase().includes(q);
      const inSubtitle = article.subtitle.toLowerCase().includes(q);
      const inLead = article.leadParagraph.toLowerCase().includes(q);
      const inSections = article.sections.some(s => 
        s.heading.toLowerCase().includes(q) || 
        s.content.some(c => c.toLowerCase().includes(q)) ||
        (s.formula && s.formula.toLowerCase().includes(q))
      );
      return inTitle || inSubtitle || inLead || inSections;
    });
  }, [selectedCategory, searchQuery]);

  const activeArticle = useMemo(() => {
    return CLIMATE_ARTICLES.find(a => a.id === activeArticleId) || filteredArticles[0] || CLIMATE_ARTICLES[0];
  }, [activeArticleId, filteredArticles]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-slate-700 selection:text-white pb-24">
      {/* Top Editorial Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGlobe}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            <span>Return to Globe</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3.5 text-xs text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-300">
              Climate Science Encyclopedia
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-slate-400">
          <span className="hidden md:inline">Peer-reviewed compendium</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] font-medium text-slate-300">
            Verified Reference
          </span>
        </div>
      </header>

      {/* Hero Header & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-slate-400" />
              <span>Scientific Documentation & Physical Fundamentals</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-50 tracking-tight leading-tight">
              Earth System Science & Climate Compendium
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Explanations of planetary climate mechanics: atmospheric radiation transfer, greenhouse gas chemistry,
              ice sheet mass balance, oceanic heat uptake, tipping point dynamics, and scientific event attribution.
            </p>

            {/* Editorial Search Bar */}
            <div className="pt-2 relative max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, equations, terms, or datasets..."
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-slate-500 rounded-xl pl-11 pr-16 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 border-b border-slate-800/80 text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition cursor-pointer font-medium ${
                selectedCategory === cat.id
                  ? 'bg-slate-800 text-slate-100 border border-slate-700 font-semibold shadow-sm'
                  : 'bg-slate-900/40 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout (Sidebar Navigation + Active Article) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Article Index & Observational Summary */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Article Selector List */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
              Articles ({filteredArticles.length})
            </h3>
            <div className="space-y-1">
              {filteredArticles.map((article) => {
                const isActive = article.id === activeArticle.id;
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      setActiveArticleId(article.id);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 border cursor-pointer ${
                      isActive
                        ? 'bg-slate-800/90 border-slate-700 text-white shadow-sm font-medium'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-semibold block leading-snug text-slate-200">
                        {article.title}
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5 truncate max-w-[240px]">
                        {article.subtitle}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? 'text-slate-200' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calm Observational Vital Signs Infobox */}
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 sm:p-5 text-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="font-semibold text-slate-200 uppercase tracking-wider text-xs">
                Key Climate Indicators
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Observed Surface Anomaly</span>
                <span className="text-lg font-bold text-orange-400 block mt-0.5">+1.33°C</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">NASA GISTEMP v4 (vs 1850–1900 baseline)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Atmospheric CO₂</span>
                <span className="text-lg font-bold text-sky-400 block mt-0.5">429.1 ppm</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">NOAA Mauna Loa in-situ spectrometer</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Ocean Heat Content (0–2000m)</span>
                <span className="text-lg font-bold text-blue-400 block mt-0.5">+382.4 ZJ</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">NOAA NCEI Ocean Climate Lab (Argo floats)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Arctic Sea Ice Minimum</span>
                <span className="text-lg font-bold text-cyan-300 block mt-0.5">4.15 M km²</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">NSIDC Sea Ice Index (September minimum)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Sea Level Rise Rate</span>
                <span className="text-lg font-bold text-indigo-300 block mt-0.5">+4.5 mm / yr</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">NASA / CNES Satellite Radar Altimetry</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 text-center border-t border-slate-800/80">
              Verified with NASA GISS, NOAA GML/NCEI, and NSIDC.
            </div>
          </div>
        </aside>

        {/* Right Main Column: Full Encyclopedic Article Content */}
        <main className="lg:col-span-8 space-y-8">
          <article className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 space-y-8 backdrop-blur-sm">
            {/* Article Header */}
            <div className="border-b border-slate-800/80 pb-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                  {activeArticle.category.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-500 font-mono">ID: {activeArticle.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
                {activeArticle.title}
              </h2>
              <p className="text-sm text-slate-400">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Lead Paragraph */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed">
              {activeArticle.leadParagraph}
            </div>

            {/* Key Fact Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeArticle.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">{fact.label}</span>
                  <span className="text-sm font-semibold text-slate-100 block mt-1">{fact.value}</span>
                  <span className="text-[10px] text-slate-400 block mt-1 truncate">{fact.source}</span>
                </div>
              ))}
            </div>

            {/* Detailed Article Sections */}
            <div className="space-y-8 text-slate-300 leading-relaxed text-sm">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-3.5">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-100 tracking-tight border-b border-slate-800/80 pb-2">
                    {section.heading}
                  </h3>

                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed text-slate-300 text-sm">
                      {p}
                    </p>
                  ))}

                  {/* Scientific Formula Box */}
                  {section.formula && (
                    <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono">
                      <span className="text-[10px] text-slate-400 block mb-1 uppercase tracking-wider font-sans">
                        Governing Equation
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-slate-200">
                        {section.formula}
                      </span>
                    </div>
                  )}

                  {/* Data Table */}
                  {section.table && (
                    <div className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-semibold text-slate-200">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/40 transition">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-3 text-slate-300">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Alert Callout */}
                  {section.callout && (
                    <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-xs text-slate-200 block">
                          {section.callout.title}
                        </span>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Academic Citations & References Section */}
            <div className="pt-8 border-t border-slate-800/80 space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Primary Academic Citations & References
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeArticle.references.map((ref, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-400 font-mono font-semibold shrink-0">[{idx + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
