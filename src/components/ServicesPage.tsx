import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Armchair, 
  Hammer, 
  PaintRoller, 
  Zap, 
  Droplets, 
  Box, 
  Building2, 
  FlaskConical, 
  Trees, 
  Handshake, 
  HardHat, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  Compass, 
  Layers,
  Clock,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { SERVICES_DATA, COMPANY_DETAILS, POSTER_HIGHLIGHTS } from '../data/companyData';

interface ServicesPageProps {
  initialServiceId?: string;
  onBackToHome: () => void;
  onOpenQuoteModal: (serviceId?: 'construction' | 'interior' | 'renovation') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialServiceId,
  onBackToHome,
  onOpenQuoteModal,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || SERVICES_DATA[0].id
  );

  useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [initialServiceId]);

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const getServiceIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Home':
        return <Home className={className} />;
      case 'Hammer':
        return <Hammer className={className} />;
      case 'Armchair':
        return <Armchair className={className} />;
      case 'PaintRoller':
        return <PaintRoller className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Droplets':
        return <Droplets className={className} />;
      case 'Box':
        return <Box className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'FlaskConical':
        return <FlaskConical className={className} />;
      case 'Trees':
        return <Trees className={className} />;
      case 'Handshake':
        return <Handshake className={className} />;
      case 'HardHat':
      default:
        return <HardHat className={className} />;
    }
  };

  const getQuoteCategory = (serviceId: string): 'construction' | 'interior' | 'renovation' => {
    if (serviceId === 'house-construction' || serviceId === 'civil-construction' || serviceId === 'structural-drawing' || serviceId === 'soil-test') return 'construction';
    if (serviceId === 'renovation-remodeling' || serviceId === 'painting-works' || serviceId === 'plumbing-works' || serviceId === 'electrical-works') return 'renovation';
    return 'interior';
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1d3557] pt-24 pb-20 font-sans">
      {/* Top Breadcrumb & Back Action Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-[#1d3557] hover:text-[#E63946] transition-colors font-bold cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#E63946]" />
              <span>Back to Home</span>
            </button>
            <span>/</span>
            <span className="text-[#E63946] font-bold">Services & Rate Cards</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1d3557] hover:text-[#E63946] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E63946]" />
              <span>+91 {COMPANY_DETAILS.phones[0]}</span>
            </a>
            <button
              onClick={() => onOpenQuoteModal(getQuoteCategory(selectedServiceId))}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#E63946] hover:bg-[#d90429] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              <span>Get Free Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        
        {/* Page Hero Header with Poster Banner */}
        <div className="rounded-3xl bg-[#14253e] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border-2 border-[#FFC107]/40">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#E63946]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden lg:block font-mono text-9xl font-black">
            PSB
          </div>

          <div className="relative z-10 space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFC107] text-xs font-black uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#FFC107]" />
              <span>Official Engineering & Construction Catalog</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-tight">
              Our 12 Comprehensive <span className="text-[#FFC107]">Construction, Civil & Interior</span> Services
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {POSTER_HIGHLIGHTS.subHeading}
            </p>

            {/* Poster Signature ₹2250/sq.ft All-Inclusive Banner Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-red-950/80 via-red-900/60 to-[#1d3557]/80 border-2 border-[#FFC107] shadow-xl backdrop-blur-md space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#FFC107]">
                    Signature Turnkey Offer
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-white flex items-baseline gap-2 mt-0.5">
                    <span>CONSTRUCTION COST @ JUST</span>
                    <span className="text-[#FFC107] font-mono">{POSTER_HIGHLIGHTS.packagePrice}</span>
                    <span className="text-sm font-bold text-slate-300">{POSTER_HIGHLIGHTS.packageUnit}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                    {POSTER_HIGHLIGHTS.packageTagline}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedServiceId('house-construction');
                    onOpenQuoteModal('construction');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-[#FFC107] hover:bg-[#ffb300] text-[#14253e] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer font-heading"
                >
                  Book ₹2250 Offer Now
                </button>
              </div>

              {/* 3 Free Included Drawings & Tests from Poster */}
              <div className="pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {POSTER_HIGHLIGHTS.specialInclusions.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <div className="w-9 h-9 rounded-lg bg-[#E63946] text-white flex items-center justify-center flex-shrink-0 font-bold shadow">
                      {item.id === '3d-plan' && <Box className="w-5 h-5" />}
                      {item.id === 'structural-drawing' && <Layers className="w-5 h-5" />}
                      {item.id === 'soil-test' && <FlaskConical className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-xs font-black text-[#FFC107]">{item.title}</div>
                      <div className="text-[11px] text-slate-300 line-clamp-1">{item.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 12 Services Navigation Bar (Sticky Tabs) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black font-heading text-[#1d3557]">
              Select a Service to Inspect Specifications & Rate Cards
            </h2>
            <span className="text-xs font-mono font-bold text-slate-500 hidden sm:inline">
              12 Available Services
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {SERVICES_DATA.map((service, index) => {
              const isCurrent = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setSelectedServiceId(service.id);
                    const el = document.getElementById(`service-detail-${service.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                  }}
                  className={`p-3 sm:p-4 rounded-xl text-center flex flex-col items-center justify-between gap-2 border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#14253e] text-white border-[#FFC107] shadow-lg ring-2 ring-[#FFC107]/50 scale-[1.03]'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isCurrent ? 'bg-[#E63946] text-white' : 'bg-slate-100 text-[#1d3557]'
                    }`}
                  >
                    {getServiceIcon(service.icon, 'w-5 h-5')}
                  </div>
                  <div className="text-[11px] font-bold leading-tight line-clamp-2">
                    {service.title}
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isCurrent ? 'bg-[#FFC107] text-[#14253e]' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Service Detailed View */}
        <div id={`service-detail-${activeService.id}`} className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl space-y-12">
          
          {/* Service Header Info */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E63946] border border-red-200 text-xs font-bold uppercase tracking-wider">
                {getServiceIcon(activeService.icon, 'w-4 h-4')}
                <span>Service Category Specification</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#1d3557] tracking-tight">
                {activeService.title}
              </h2>

              <p className="text-sm font-bold text-[#E63946] uppercase tracking-wider">
                {activeService.subtitle}
              </p>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {activeService.description}
              </p>

              {/* Verified Checklist */}
              <div className="space-y-2.5 pt-3">
                <div className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Key Deliverables & Guarantee:
                </div>
                {activeService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenQuoteModal(getQuoteCategory(activeService.id))}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded-xl shadow-lg text-xs sm:text-sm font-heading cursor-pointer transition-transform hover:scale-105 active:scale-95"
                >
                  <span>Request Quote for {activeService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/91${COMPANY_DETAILS.phones[0]}?text=Hello%20Pranav%20Sai%20Builders,%20I%20am%20interested%20in%20your%20service:%20${encodeURIComponent(activeService.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider rounded-xl shadow-md text-xs sm:text-sm font-heading transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Er. Manikandan</span>
                </a>
              </div>
            </div>

            {/* Service Banner Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] group">
                <img
                  src={activeService.bannerImage}
                  alt={activeService.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557]/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 right-4 bg-[#FFC107] text-[#14253e] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  100% Quality Assured
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 flex items-center justify-between shadow-lg">
                  <div>
                    <div className="font-bold text-[#1d3557]">Direct Supervision</div>
                    <div className="text-[10px] text-slate-500">By Er. D. Manikandan, B.Tech (Civil)</div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#E63946]" />
                </div>
              </div>
            </div>
          </div>

          {/* Process Workflow Steps */}
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E63946]">
                <Clock className="w-3.5 h-3.5" />
                <span>Standard Operating Procedure (SOP)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557] mt-1">
                Execution Workflow & Quality Checkpoints
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {activeService.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#FFC107] space-y-3 relative transition-all shadow-sm group hover:shadow-md"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#14253e] text-[#FFC107] font-black flex items-center justify-center text-xs font-mono group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                    0{step.step}
                  </div>
                  <div className="text-sm font-bold font-heading text-[#1d3557]">
                    {step.title}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Specification Packages */}
          <div className="pt-10 border-t border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E63946]">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Transparent Rate Cards</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557] mt-1">
                  Packages & Specifications
                </h3>
              </div>
              
              <button
                onClick={() => onOpenQuoteModal(getQuoteCategory(activeService.id))}
                className="text-xs font-bold text-[#E63946] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                Need custom square feet estimation? Open Live Calculator →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeService.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all relative ${
                    pkg.popular
                      ? 'bg-white border-2 border-[#FFC107] shadow-xl ring-2 ring-[#FFC107]/20'
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 right-6 px-3 py-1 bg-[#FFC107] text-[#14253e] text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                      Recommended
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold font-heading text-[#1d3557]">
                        {pkg.name}
                      </h4>
                      <div className="text-2xl sm:text-3xl font-black text-[#E63946] font-mono mt-1">
                        {pkg.ratePerSqFt}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2.5">
                      <div className="text-[11px] font-black uppercase tracking-wider text-slate-800">
                        Scope & Bill of Materials:
                      </div>
                      {pkg.includes.map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E63946] flex-shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      onClick={() => onOpenQuoteModal(getQuoteCategory(activeService.id))}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        pkg.popular
                          ? 'bg-[#E63946] hover:bg-[#d90429] text-white shadow-md'
                          : 'bg-[#14253e] hover:bg-[#1d3557] text-white'
                      }`}
                    >
                      Book This Specification Tier
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* All 12 Services Quick Grid Overview */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFC107]">
              <span>Complete Civil & Interior Portfolio</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              All 12 Pranav Sai Builders Services at a Glance
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Click any service below to jump directly to its engineering rate breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES_DATA.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedServiceId(service.id);
                  const el = document.getElementById(`service-detail-${service.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between group ${
                  service.id === selectedServiceId
                    ? 'bg-[#1d3557] border-[#FFC107] shadow-xl'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FFC107] flex items-center justify-center group-hover:bg-[#E63946] group-hover:text-white transition-colors">
                      {getServiceIcon(service.icon, 'w-5 h-5')}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-heading text-white group-hover:text-[#FFC107] transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-[11px] text-[#FFC107] font-semibold mt-1 line-clamp-1">
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#FFC107]">
                  <span>Explore Scope</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#14253e] to-[#1d3557] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#FFC107]/40 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="text-xs font-black uppercase tracking-widest text-[#FFC107]">
              {COMPANY_DETAILS.tagline}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Ready to construct or renovate your property?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Meet Er. D. Manikandan at our office at {COMPANY_DETAILS.address} or request a site visit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onBackToHome}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors border border-white/20"
            >
              ← Back to Home
            </button>
            <button
              onClick={() => onOpenQuoteModal('construction')}
              className="px-6 py-3.5 rounded-xl bg-[#E63946] hover:bg-[#d90429] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              Get Free Consultation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
