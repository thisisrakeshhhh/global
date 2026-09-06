import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Search, 
  ExternalLink, 
  Thermometer, 
  Flame, 
  Wind, 
  Droplets, 
  Globe2, 
  Layers, 
  Zap, 
  BarChart3, 
  ChevronRight, 
  ShieldCheck, 
  FileText, 
  Atom, 
  Compass, 
  TreePine,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { AdSenseSlot } from '../UI/AdSenseSlot';
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
    document.title = 'Climate Change & Global Warming Encyclopedia | EARTH // LIVE';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Wikipedia-grade climate change encyclopedia: greenhouse effect physics, Keeling curve, ocean acidification, tipping points, extreme weather attribution, and IPCC AR6 mitigation.');
    }
  }, []);

  const categories: { id: TopicCategory; label: string }[] = [
    { id: 'ALL', label: 'All Articles' },
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
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white pb-16">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGlobe}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO 3D GLOBE</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 border-l border-slate-800 pl-3">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono tracking-wider text-slate-300 font-bold">
              EARTH // ENCYCLOPEDIA
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="hidden md:inline">PEER-REVIEWED SCIENTIFIC COMPENDIUM</span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
            WIKI EARTH
          </span>
        </div>
      </header>

      {/* Hero Header & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE GLOBAL WARMING & CLIMATE INTELLIGENCE ENCYCLOPEDIA</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              The Wikipedia for Global Warming & Earth System Science
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Comprehensive scientific documentation covering atmospheric physics, greenhouse radiative forcing, 
              ocean acidification, cryosphere collapse, Earth tipping points, extreme weather attribution, 
              and IPCC AR6 mitigation pathways.
            </p>

            {/* Search Input */}
            <div className="mt-6 relative max-w-xl">
              <Search className="w-5 h-5 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all climate articles, physics equations, glossary terms, or citations..."
                className="w-full bg-slate-950/90 border border-cyan-500/40 focus:border-cyan-400 rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4 border-b border-slate-800 text-xs font-mono">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout (Sidebar Navigation + Active Article) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Article Index & Wikipedia Infobox */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Article Selector List */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
              Table of Articles ({filteredArticles.length})
            </h3>
            <div className="space-y-1.5">
              {filteredArticles.map((article) => {
                const isActive = article.id === activeArticle.id;
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                      setActiveArticleId(article.id);
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl transition flex items-start justify-between gap-2 border ${
                      isActive
                        ? 'bg-cyan-950/60 border-cyan-500/50 text-white shadow-lg'
                        : 'bg-slate-950/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block leading-snug">{article.title}</span>
                      <span className="text-[10px] font-mono text-cyan-400/80 block mt-0.5 truncate max-w-[240px]">
                        {article.subtitle}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wikipedia Style Fast Fact Infobox */}
          <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-xl font-mono text-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Thermometer className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white tracking-wider">PLANETARY VITAL SIGNS (2026)</span>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">GLOBAL SURFACE ANOMALY</span>
                <span className="text-lg font-extrabold text-amber-400">+1.48°C</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Ref: 1850–1900 Pre-industrial (ERA5)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">ATMOSPHERIC CARBON DIOXIDE</span>
                <span className="text-lg font-extrabold text-cyan-400">426.9 ppm</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">NOAA Mauna Loa Keeling Curve (+52.5%)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">ATMOSPHERIC METHANE (CH₄)</span>
                <span className="text-lg font-extrabold text-sky-400">1,930 ppb</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">NOAA GML Global Average (+167%)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">OCEAN HEAT CONTENT (0–2000m)</span>
                <span className="text-lg font-extrabold text-rose-400">&gt;350 ZJ</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">All-time recorded high (NOAA NCEI)</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">RATE OF SEA LEVEL RISE</span>
                <span className="text-lg font-extrabold text-emerald-400">+4.5 mm / yr</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">NASA Satellite Altimetry Multi-Mission</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">REMAINING 1.5°C CARBON BUDGET</span>
                <span className="text-lg font-extrabold text-orange-400">~250 Gt CO₂</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">~6 years at 40 Gt/yr global burn rate</span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 text-center">
              Verified with NOAA GML, NASA ESDIS, Copernicus ECMWF & IPCC AR6.
            </div>
          </div>
        </aside>

        {/* Right Main Column: Full Encyclopedic Article Content */}
        <main className="lg:col-span-8 space-y-8">
          <article className="bg-slate-900/60 border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Article Header */}
            <div className="border-b border-slate-800 pb-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold border border-cyan-500/40">
                  {activeArticle.category.replace('_', ' ')}
                </span>
                <span className="text-xs font-mono text-slate-500">ARTICLE ID: {activeArticle.id}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeArticle.title}
              </h2>
              <p className="text-sm font-mono text-cyan-400/90">
                {activeArticle.subtitle}
              </p>
            </div>

            {/* Lead Paragraph */}
            <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/20 border-l-4 border-cyan-400 text-slate-200 text-sm sm:text-base leading-relaxed">
              {activeArticle.leadParagraph}
            </div>

            {/* Key Fact Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeArticle.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono">
                  <span className="text-[10px] text-slate-400 uppercase block">{fact.label}</span>
                  <span className="text-sm font-bold text-cyan-300 block mt-1">{fact.value}</span>
                  <span className="text-[9px] text-slate-500 block mt-1 truncate">{fact.source}</span>
                </div>
              ))}
            </div>

            {/* Detailed Article Sections */}
            <div className="space-y-8 text-slate-300 leading-relaxed text-sm">
              {activeArticle.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-slate-800/80 pb-2">
                    {section.heading}
                  </h3>

                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Scientific Formula Box */}
                  {section.formula && (
                    <div className="my-4 p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-center font-mono">
                      <span className="text-[10px] text-slate-500 block mb-1 uppercase tracking-widest">
                        Governing Thermodynamic Equation
                      </span>
                      <span className="text-sm sm:text-base font-bold text-cyan-300">
                        {section.formula}
                      </span>
                    </div>
                  )}

                  {/* Data Table */}
                  {section.table && (
                    <div className="my-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-bold text-cyan-400">
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
                    <div className="my-4 p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-xs text-cyan-300 block font-mono">
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
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Primary Academic Citations & Peer-Reviewed References
              </h4>
              <ul className="space-y-2 text-xs font-mono text-slate-400">
                {activeArticle.references.map((ref, idx) => (
                  <li key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-bold shrink-0">[{idx + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* AdSense Slot */}
          <div className="pt-4">
            <AdSenseSlot slotId="article-bottom-encyclopedia" />
          </div>
        </main>
      </div>
    </div>
  );
};
