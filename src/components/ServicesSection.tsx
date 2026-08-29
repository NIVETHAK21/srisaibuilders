import React, { useRef, useState } from 'react';
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
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  X,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { SERVICES_DATA, POSTER_HIGHLIGHTS, COMPANY_DETAILS } from '../data/companyData';
import { ServiceDetail } from '../types';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceId?: 'construction' | 'interior' | 'renovation') => void;
  onNavigateToServicesPage: (serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuoteModal,
  onNavigateToServicesPage,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [modalService, setModalService] = useState<ServiceDetail | null>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveServiceIndex(Math.min(Math.max(index, 0), SERVICES_DATA.length - 1));
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      });
      setActiveServiceIndex(index);
    }
  };

  const getServiceIcon = (iconName: string, className: string = 'w-5 h-5') => {
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

  const handleCardClick = (service: ServiceDetail) => {
    // Open detailed view modal directly so mobile & desktop users immediately see all specs & details
    setModalService(service);
  };

  return (
    <section id="services" className="py-8 sm:py-10 lg:py-12 bg-[#f8f9fa] text-[#1d3557] relative overflow-hidden scroll-mt-24">
      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 pattern-dots-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* Section Title - Updated to clean 'Services' */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Engineering & Civil Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg">
            {POSTER_HIGHLIGHTS.subHeading}
          </p>

          {/* Mobile Natural Hand Swipe Indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 text-[11px] font-bold text-[#E63946] bg-red-50/90 py-1.5 px-3.5 rounded-full border border-red-200 w-fit mx-auto shadow-sm">
            <span>Tap any service card to view all its details & rates</span>
          </div>
        </div>

        {/* Poster Highlight Banner: ₹2250 / Sq.Ft Construction Offer + 3 Inclusions - Fully Mobile Responsive Wrap Fix */}
        <div className="rounded-3xl bg-gradient-to-br from-[#14253e] via-[#1d3557] to-[#274773] text-white p-4 sm:p-8 lg:p-10 border-2 border-[#FFC107] shadow-xl relative overflow-hidden max-w-full">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none font-mono text-8xl font-black hidden md:block">
            ₹2250
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl min-w-0 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] text-[11px] sm:text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Turnkey Offer</span>
              </div>

              {/* Wrapped headline preventing overflow on 320px-420px mobile screens */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-black font-heading text-white leading-snug flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span>CONSTRUCTION COST @ JUST</span>
                  <span className="text-[#FFC107] font-mono whitespace-nowrap">{POSTER_HIGHLIGHTS.packagePrice}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200 whitespace-nowrap">{POSTER_HIGHLIGHTS.packageUnit}</span>
                </h3>
                <p className="text-slate-200 text-xs sm:text-sm font-medium pt-1">
                  {POSTER_HIGHLIGHTS.packageTagline} — Complete Labour, 1st Quality Materials, Architectural Design & On-Site Supervision.
                </p>
              </div>

              {/* 3 Drawing/Test Inclusions from Poster */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {POSTER_HIGHLIGHTS.specialInclusions.map((inc) => (
                  <div key={inc.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 border border-white/10 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-bold text-white text-[11px] truncate">{inc.title}</div>
                      <div className="text-[10px] text-[#FFC107] font-semibold">{inc.badge}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              <button
                onClick={() => onNavigateToServicesPage('house-construction')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFC107] hover:bg-[#ffb300] text-[#14253e] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer font-heading text-center"
              >
                <span>View Full Service Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenQuoteModal('construction')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E63946] hover:bg-[#d90429] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all text-center"
              >
                <span>Instant Estimate</span>
              </button>
            </div>
          </div>
        </div>

        {/* 12 Services (Grid on Desktop, Swipeable on Mobile, Tap to View Full Details Modal) */}
        <div className="space-y-4">
          {/* Service Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-none pb-4 pt-1"
          >
            {SERVICES_DATA.map((service, index) => (
              <div
                key={service.id}
                onClick={() => handleCardClick(service)}
                className="w-full min-w-full sm:min-w-0 md:min-w-0 snap-start p-5 sm:p-6 rounded-2xl text-left transition-all border border-slate-200 hover:border-[#E63946] bg-white shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden group flex flex-col justify-between flex-shrink-0 active:scale-[0.99]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-sm bg-slate-100 text-[#1d3557] group-hover:bg-[#E63946] group-hover:text-white">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-[#E63946] transition-colors">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-heading text-[#1d3557] mb-1 group-hover:text-[#E63946] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-[#E63946] font-bold uppercase tracking-wider mb-2.5 line-clamp-1">
                    {service.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1d3557] group-hover:text-[#E63946] transition-colors">
                  <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FFC107]" /> Tap for Full Details
                  </span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1 text-[#E63946]" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Pagination Dots Indicator */}
          <div className="flex md:hidden items-center justify-center gap-1.5 pt-1 overflow-x-auto py-2">
            {SERVICES_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to service ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeServiceIndex === i
                    ? 'w-5 bg-[#E63946]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Primary View All Redirect Button to Dedicated Page */}
          <div className="text-center pt-6 sm:pt-8">
            <button
              onClick={() => onNavigateToServicesPage()}
              className="inline-flex items-center gap-3 px-6 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-[#14253e] hover:bg-[#1d3557] text-[#FFC107] border-2 border-[#FFC107]/40 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-heading"
            >
              <span>Explore All 12 Services with Detailed Rates & Blueprints</span>
              <ExternalLink className="w-4 h-4 text-[#FFC107]" />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Service Details Modal (Pops up when clicking any service on mobile or desktop) */}
      {modalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-2 border-[#FFC107]/60 p-5 sm:p-8 space-y-6 text-[#1d3557]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-[#E63946] transition-colors cursor-pointer z-20 shadow-sm"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 pr-10 border-b border-slate-100 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-[#14253e] text-[#FFC107] flex items-center justify-center flex-shrink-0 shadow-md">
                {getServiceIcon(modalService.icon, 'w-7 h-7')}
              </div>
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#E63946] bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Civil Specification</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-[#1d3557] mt-1">
                  {modalService.title}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-[#E63946] uppercase tracking-wider">
                  {modalService.subtitle}
                </p>
              </div>
            </div>

            {/* Image & Description Banner */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-900 shadow-md">
                <img
                  src={modalService.bannerImage}
                  alt={modalService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold drop-shadow">
                  Supervised by Er. D. Manikandan, B.Tech (Civil)
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {modalService.description}
              </p>
            </div>

            {/* Key Deliverables & Features */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E63946]" />
                <span>Key Deliverables & Specifications</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {modalService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-[#E63946] font-black">•</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Steps */}
            {modalService.processSteps && modalService.processSteps.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#E63946]" />
                  <span>Execution Process</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {modalService.processSteps.map((step) => (
                    <div key={step.step} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                      <div className="font-bold text-[#1d3557] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#14253e] text-[#FFC107] font-mono text-[10px] font-black flex items-center justify-center">
                          {step.step}
                        </span>
                        <span>{step.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 pl-6">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packages & Rate Estimation */}
            {modalService.packages && modalService.packages.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-[#1d3557]">
                  Pricing & Standard Packages
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {modalService.packages.map((pkg, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-xs text-[#1d3557]">{pkg.name}</span>
                        <span className="text-xs font-black font-mono text-[#E63946] bg-red-50 px-2 py-0.5 rounded">
                          {pkg.ratePerSqFt}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600">{pkg.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  const cat = getQuoteCategory(modalService.id);
                  setModalService(null);
                  onOpenQuoteModal(cat);
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-[#E63946] hover:bg-[#d90429] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md text-center cursor-pointer transition-transform hover:scale-[1.02]"
              >
                Get Free Estimate for {modalService.title}
              </button>

              <a
                href={`https://wa.me/91${COMPANY_DETAILS.phones[0]}?text=Hello%20Er.%20Manikandan%20(Pranav%20Sai%20Builders),%20I%20want%20to%20know%20more%20about%20${encodeURIComponent(modalService.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Er. Manikandan</span>
              </a>

              <button
                onClick={() => {
                  const id = modalService.id;
                  setModalService(null);
                  onNavigateToServicesPage(id);
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1d3557] font-bold text-xs uppercase tracking-wider text-center cursor-pointer"
              >
                Full Page View
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
