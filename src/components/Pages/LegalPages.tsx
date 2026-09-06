import React, { useState } from 'react';
import { ArrowLeft, Shield, FileText, Mail, Info } from 'lucide-react';
import { AdSenseSlot } from '../UI/AdSenseSlot';

interface LegalPagesProps {
  onBackToGlobe: () => void;
  initialTab?: 'about' | 'privacy' | 'terms' | 'contact';
}

export const LegalPages: React.FC<LegalPagesProps> = ({ onBackToGlobe, initialTab = 'about' }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'privacy' | 'terms' | 'contact'>(initialTab);

  React.useEffect(() => {
    const titles = {
      about: 'About EARTH // LIVE | Planetary Climate Intelligence',
      privacy: 'Privacy Policy & Cookie Disclosures | EARTH // LIVE',
      terms: 'Terms of Service | EARTH // LIVE',
      contact: 'Contact & Editorial Inquiries | EARTH // LIVE'
    };
    document.title = titles[activeTab];
  }, [activeTab]);

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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab('about')}
            className={`px-3 py-1 rounded-lg transition ${activeTab === 'about' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-1 rounded-lg transition ${activeTab === 'privacy' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-1 rounded-lg transition ${activeTab === 'terms' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            Terms
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1 rounded-lg transition ${activeTab === 'contact' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
          >
            Contact
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Info className="w-4 h-4" />
                <span>ABOUT EARTH // LIVE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                A Visual Intelligence Layer for Earth's Changing Climate
              </h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed">
                EARTH // LIVE is an independent, non-partisan planetary monitoring platform created to make 
                complex remote sensing and climate science immediately accessible, verifiable, and visually intuitive.
              </p>
            </div>

            <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Our Mission</h2>
              <p>
                Too many climate platforms either present static, delayed charts or sensationalize planetary disasters 
                with speculative headlines. EARTH // LIVE combines high-resolution 3D WebGL computer graphics with direct, 
                server-validated telemetry pipelines from NASA, NOAA, Copernicus, and the WMO.
              </p>
              <p>
                Our core thesis: The 3D globe is the interface; the real scientific data, transparent methodology, 
                and standardized attribution are the product.
              </p>
            </section>

            <div className="py-4">
              <AdSenseSlot slotId="about-mid-banner" format="auto" />
            </div>

            <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-2">Commitment to Open Science</h2>
              <p>
                We do not invent synthetic fallback events. If a satellite instrument is delayed or calibrating, 
                we explicitly display <code>STATUS: DELAYED</code> with the observation timestamp. 
                Every data point links directly to its primary government repository.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Shield className="w-4 h-4" />
                <span>COMPLIANCE & TRANSPARENCY</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Privacy Policy & Cookie Disclosure
              </h1>
              <p className="mt-2 text-xs font-mono text-slate-400">Last updated: September 6, 2026</p>
            </div>

            <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">1. Information We Collect</h2>
              <p>
                EARTH // LIVE does not require account registration or collect personal identity information (PII) such as 
                your name, home address, or phone number. When accessing our 3D visualization, standard non-identifying technical 
                telemetry (IP address, browser user-agent, operating system, and WebGL capabilities) is processed temporarily to 
                render the 3D globe and prevent denial-of-service abuse.
              </p>

              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">2. Google AdSense & Third-Party Cookies</h2>
              <p>
                Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website 
                or other websites. Google's use of advertising cookies enables it and its partners to serve ads to your users 
                based on their visit to your sites and/or other sites on the Internet.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
                  Google Ads Settings
                </a>. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
                <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
                  aboutads.info
                </a>.
              </p>

              <div className="py-4">
                <AdSenseSlot slotId="privacy-mid-banner" format="auto" />
              </div>

              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">3. CCPA & GDPR Compliance</h2>
              <p>
                Under the California Consumer Privacy Act (CCPA) and European General Data Protection Regulation (GDPR), 
                visitors retain the right to request disclosure of categories of collected information and opt-out of 
                third-party tracking cookies via browser preference headers.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <FileText className="w-4 h-4" />
                <span>LEGAL TERMS</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Terms of Service</h1>
              <p className="mt-2 text-xs font-mono text-slate-400">Effective Date: September 6, 2026</p>
            </div>

            <section className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">1. Educational & Scientific Purpose Only</h2>
              <p>
                EARTH // LIVE is provided strictly for educational, research, and scientific visualization purposes. 
                Our platform is NOT an official emergency dispatch or civil defense evacuation system.
              </p>
              <p className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs">
                ⚠️ In any active wildfire, hurricane, or severe weather crisis, always consult official localized emergency directives 
                from your national meteorological and civil emergency management authorities (e.g. NOAA National Weather Service, FEMA, or localized disaster agencies).
              </p>

              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">2. Data Accuracy & Intellectual Property</h2>
              <p>
                Earth observation data is redistributed under open-access public domain licenses from NASA (LANCE/FIRMS/GISS), 
                NOAA (NHC/GML), and the European Commission (Copernicus C3S). The visualization architecture, 1.5° grid binning engine, 
                and interface code are proprietary to EARTH // LIVE.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Mail className="w-4 h-4" />
                <span>EDITORIAL & INQUIRIES</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Contact the Team</h1>
              <p className="mt-3 text-base text-slate-400 leading-relaxed">
                Have questions about our data pipeline, methodology citations, or scientific partnerships? We'd love to hear from you.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-1">Scientific Methodology & Corrections</h3>
                <p className="text-xs text-slate-400 mb-4">Inquire regarding satellite sensor citations, confidence normalization, or data anomalies.</p>
                <a href="mailto:science@earthlive.org" className="text-xs font-mono text-emerald-400 hover:underline">
                  science@earthlive.org
                </a>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
                <h3 className="text-base font-bold text-white mb-1">General & Press Inquiries</h3>
                <p className="text-xs text-slate-400 mb-4">Media inquiries, educational use licenses, and platform feedback.</p>
                <a href="mailto:contact@earthlive.org" className="text-xs font-mono text-emerald-400 hover:underline">
                  contact@earthlive.org
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
