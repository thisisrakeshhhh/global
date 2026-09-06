import React, { useState, useMemo, useRef } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  Thermometer, 
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory>('ALL');
  const [activeArticleId, setActiveArticleId] = useState<string>(CLIMATE_ARTICLES[0].id);

  React.useEffect(() => {
    document.title = 'Climate Science Reference | EARTH // LIVE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Peer-reviewed climate science reference: greenhouse physics, Keeling curve, ocean heat, cryosphere, tipping points, and extreme weather attribution.');
    }
  }, []);

  const categories: { id: TopicCategory; label: string }[] = [
    { id: 'ALL', label: 'All Topics' },
    { id: 'PHYSICAL_BASIS', label: 'Physical Science' },
    { id: 'GREENHOUSE_GASES', label: 'Carbon & Gases' },
    { id: 'CRYOSPHERE_OCEANS', label: 'Oceans & Ice' },
    { id: 'TIPPING_POINTS', label: 'Tipping Points' },
    { id: 'EXTREME_WEATHER', label: 'Attribution & Extremes' },
    { id: 'EMISSIONS_INVENTORY', label: 'Emissions' },
    { id: 'IPCC_SCENARIOS', label: 'IPCC Scenarios' },
    { id: 'MITIGATION_SOLUTIONS', label: 'Solutions' },
    { id: 'GLOSSARY', label: 'Glossary' }
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
    <div ref={containerRef} className="fixed inset-0 overflow-y-auto bg-[#070b12] text-slate-200 font-sans selection:bg-slate-700 selection:text-white pb-24">
      {/* Top Quiet Header */}
      <header className="sticky top-0 z-40 bg-[#070b12]/95 backdrop-blur-md border-b border-slate-800/60 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGlobe}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
            <span>Return to Globe</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3.5 text-xs text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-300">
              Climate Science Reference
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Peer-reviewed scientific compendium
        </div>
      </header>

      {/* Editorial Title & Search Area (Clean, calm, no giant bloated box) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
            Climate Science Reference
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Explanations of planetary climate mechanics, greenhouse physics, ice sheet dynamics, and event attribution from peer-reviewed literature and IPCC assessments.
          </p>
        </div>

        {/* Search Bar & Category Filters in one calm group */}
        <div className="space-y-3">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, equations, or datasets..."
              className="w-full bg-slate-900/90 border border-slate-800 focus:border-slate-600 rounded-lg pl-10 pr-14 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none transition shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-md whitespace-nowrap transition cursor-pointer text-xs ${
                  selectedCategory === cat.id
                    ? 'bg-slate-800 text-slate-100 font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Sidebar Navigation + Active Article) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
        {/* Left Sidebar: Article Index */}
        <aside className="lg:col-span-4 space-y-5">
          {/* Article List */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5">
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-2.5 px-2">
              Articles ({filteredArticles.length})
            </div>
            <div className="space-y-0.5">
              {filteredArticles.map((article) => {
                const isActive = article.id === activeArticle.id;
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      setActiveArticleId(article.id);
                      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-start justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-slate-800/80 text-white font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-medium block leading-snug">
                        {article.title}
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5 truncate max-w-[220px]">
                        {article.subtitle}
                      </span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calm Observational Vital Signs Infobox */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 text-xs space-y-3">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-800">
              <Thermometer className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-medium text-slate-300 text-xs">
                Key Climate Indicators
              </span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div className="text-[11px] text-slate-400">Observed Surface Anomaly</div>
                <div className="text-base font-semibold text-slate-100 mt-0.5">+1.33°C</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NASA GISTEMP v4 (vs 1850–1900)</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div className="text-[11px] text-slate-400">Atmospheric CO₂</div>
                <div className="text-base font-semibold text-slate-100 mt-0.5">429.1 ppm</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NOAA Mauna Loa in-situ</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div className="text-[11px] text-slate-400">Ocean Heat Content (0–2000m)</div>
                <div className="text-base font-semibold text-slate-100 mt-0.5">+382.4 ZJ</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NOAA NCEI (Argo float array)</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div className="text-[11px] text-slate-400">Arctic Sea Ice Minimum</div>
                <div className="text-base font-semibold text-slate-100 mt-0.5">4.15 M km²</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NSIDC Sea Ice Index (Sept)</div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <div className="text-[11px] text-slate-400">Sea Level Rise Rate</div>
                <div className="text-base font-semibold text-slate-100 mt-0.5">+4.5 mm / yr</div>
                <div className="text-[10px] text-slate-500 mt-0.5">NASA / CNES Satellite Altimetry</div>
              </div>
            </div>

            <div className="pt-1 text-[10px] text-slate-500 text-center">
              Sources: NASA GISS, NOAA GML/NCEI, NSIDC.
            </div>
          </div>
        </aside>

        {/* Right Main Column: Full Article Content */}
        <main className="lg:col-span-8 space-y-6">
          <article className="bg-slate-900/30 border border-slate-800/70 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Article Header */}
            <div className="border-b border-slate-800/80 pb-5 space-y-1.5">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                {activeArticle.category.replace('_', ' ')}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
                {activeArticle.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-normal">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Lead Paragraph */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed">
              {activeArticle.leadParagraph}
            </div>

            {/* Key Fact Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeArticle.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/70">
                  <span className="text-[10px] text-slate-400 uppercase block">{fact.label}</span>
                  <span className="text-sm font-medium text-slate-200 block mt-0.5">{fact.value}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 truncate">{fact.source}</span>
                </div>
              ))}
            </div>

            {/* Detailed Article Sections */}
            <div className="space-y-6 text-slate-300 leading-relaxed text-xs sm:text-sm">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-slate-200 tracking-tight border-b border-slate-800/60 pb-1.5">
                    {section.heading}
                  </h3>

                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed text-slate-300">
                      {p}
                    </p>
                  ))}

                  {/* Scientific Formula Box */}
                  {section.formula && (
                    <div className="my-3 p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center font-mono">
                      <span className="text-[10px] text-slate-500 block mb-1 uppercase tracking-wider font-sans">
                        Governing Equation
                      </span>
                      <span className="text-xs sm:text-sm text-slate-200">
                        {section.formula}
                      </span>
                    </div>
                  )}

                  {/* Data Table */}
                  {section.table && (
                    <div className="my-3 overflow-x-auto rounded-lg border border-slate-800/80 bg-slate-950/70">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 text-slate-300 border-b border-slate-800">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-2.5 font-medium text-slate-300">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/30 transition">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2.5 text-slate-300">
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
                    <div className="my-3 p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-xs text-slate-200 block">
                          {section.callout.title}
                        </span>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Academic Citations & References Section */}
            <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Primary Citations & References
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {activeArticle.references.map((ref, idx) => (
                  <li key={idx} className="p-2 rounded-md bg-slate-950/50 border border-slate-800/60 flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-500 font-mono text-[11px] shrink-0">[{idx + 1}]</span>
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
