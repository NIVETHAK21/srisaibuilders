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
  Layers
} from 'lucide-react';
import { SERVICES_DATA, POSTER_HIGHLIGHTS } from '../data/companyData';

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

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5" />;
      case 'Armchair':
        return <Armchair className="w-5 h-5" />;
      case 'PaintRoller':
        return <PaintRoller className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Box':
        return <Box className="w-5 h-5" />;
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5" />;
      case 'Trees':
        return <Trees className="w-5 h-5" />;
      case 'Handshake':
        return <Handshake className="w-5 h-5" />;
      case 'HardHat':
      default:
        return <HardHat className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-28 bg-[#f8f9fa] text-[#1d3557] relative overflow-hidden scroll-mt-24">
      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 pattern-dots-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 lg:space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Engineering & Civil Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Our 12 Core Construction & Civil Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg">
            {POSTER_HIGHLIGHTS.subHeading}
          </p>

          {/* Mobile Natural Hand Swipe Indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 text-[11px] font-bold text-[#E63946] bg-red-50/90 py-1 px-3 rounded-full border border-red-200 w-fit mx-auto animate-pulse">
            <span>👈 Swipe left & right to explore all 12 services 👉</span>
          </div>
        </div>

        {/* Poster Highlight Banner: ₹2250 / Sq.Ft Construction Offer + 3 Inclusions */}
        <div className="rounded-3xl bg-gradient-to-br from-[#14253e] via-[#1d3557] to-[#274773] text-white p-5 sm:p-8 lg:p-10 border-2 border-[#FFC107] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none font-mono text-8xl font-black hidden md:block">
            ₹2250
          </div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Turnkey Offer</span>
              </div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black font-heading text-white leading-tight">
                CONSTRUCTION COST @ JUST <span className="text-[#FFC107] font-mono">{POSTER_HIGHLIGHTS.packagePrice}</span> {POSTER_HIGHLIGHTS.packageUnit}
              </h3>
              <p className="text-slate-200 text-xs sm:text-sm font-medium">
                {POSTER_HIGHLIGHTS.packageTagline} — Complete Labour, 1st Quality Materials, Architectural Design & On-Site Supervision.
              </p>

              {/* 3 Drawing/Test Inclusions from Poster */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {POSTER_HIGHLIGHTS.specialInclusions.map((inc) => (
                  <div key={inc.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/10 border border-white/10 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white text-[11px]">{inc.title}</div>
                      <div className="text-[10px] text-[#FFC107] font-semibold">{inc.badge}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto flex-shrink-0">
              <button
                onClick={() => onNavigateToServicesPage('house-construction')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFC107] hover:bg-[#ffb300] text-[#14253e] font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer font-heading"
              >
                <span>View Full Service Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenQuoteModal('construction')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E63946] hover:bg-[#d90429] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all"
              >
                <span>Instant Estimate</span>
              </button>
            </div>
          </div>
        </div>

        {/* 12 Services (Grid on Desktop, Natural 1-Card Touch Swipe on Mobile) */}
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
                onClick={() => onNavigateToServicesPage(service.id)}
                className="w-full min-w-full sm:min-w-0 md:min-w-0 snap-start p-6 rounded-2xl text-left transition-all border border-slate-200 hover:border-[#E63946] bg-white shadow-sm hover:shadow-xl cursor-pointer relative overflow-hidden group flex flex-col justify-between flex-shrink-0"
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
                  <span>View Specifications</span>
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
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
              <span>View All 12 Services & Rate Cards</span>
              <ExternalLink className="w-4 h-4 text-[#FFC107]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
