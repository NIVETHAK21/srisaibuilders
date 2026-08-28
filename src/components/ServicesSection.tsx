import React, { useState } from 'react';
import { 
  Home, 
  Palette, 
  Hammer, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Sparkles, 
  Layers, 
  FileCheck,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { SERVICES_DATA } from '../data/companyData';

interface ServicesSectionProps {
  onOpenQuoteModal: (serviceId?: 'construction' | 'interior' | 'renovation') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenQuoteModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>('construction');

  const activeService = SERVICES_DATA.find((s) => s.id === activeTab) || SERVICES_DATA[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Hammer':
      default:
        return <Hammer className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#f8f9fa] text-[#1d3557] relative overflow-hidden">
      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 pattern-dots-dark opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>End-to-End Civil & Architectural Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Our Core Construction & Design Services
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            From greenfield villa construction to bespoke modular interiors and structural renovations across Chennai.
          </p>
        </div>

        {/* 3 Main Service Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {SERVICES_DATA.map((service) => {
            const isCurrent = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`p-6 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden group ${
                  isCurrent
                    ? 'bg-white border-2 border-[#E63946] shadow-xl ring-2 ring-red-100'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-[#E63946] text-white'
                        : 'bg-slate-100 text-[#1d3557] group-hover:bg-[#1d3557] group-hover:text-white'
                    }`}
                  >
                    {getServiceIcon(service.icon)}
                  </div>
                  {isCurrent && (
                    <span className="px-2.5 py-1 rounded bg-red-50 text-[#E63946] text-[11px] font-bold uppercase tracking-wider border border-red-200">
                      Selected
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold font-heading text-[#1d3557] mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-[#E63946] font-bold uppercase tracking-wider mb-3">
                  {service.subtitle}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-wider text-[#1d3557] group-hover:text-[#E63946] transition-colors">
                  <span>Explore Workflow & Packages</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Deep Dive Showcase */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl space-y-12">
          
          {/* Top Banner & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E63946]">
                <span>Civil Engineering Excellence</span>
                <span>•</span>
                <span>{activeService.subtitle}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557]">
                {activeService.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeService.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-2.5 pt-2">
                {activeService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenQuoteModal(activeService.id as any)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded shadow-md text-xs sm:text-sm font-heading cursor-pointer"
                >
                  <span>Get Quote for {activeService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Service Banner Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] group">
                <img
                  src={activeService.bannerImage}
                  alt={activeService.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 flex items-center justify-between shadow-md">
                  <span className="font-bold text-[#1d3557]">Verified Tier-1 Brands (Tata TMT / UltraTech)</span>
                  <ShieldCheck className="w-4 h-4 text-[#E63946]" />
                </div>
              </div>
            </div>
          </div>

          {/* Process Workflow Steps */}
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <div>
              <h4 className="text-xl sm:text-2xl font-black font-heading text-[#1d3557]">
                Step-by-Step Execution Lifecycle
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Our disciplined milestone method guarantees structural compliance and on-time handover.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {activeService.processSteps.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#FFC107] space-y-2 relative transition-colors shadow-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1d3557] text-[#FFC107] font-black flex items-center justify-center text-xs font-mono">
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

          {/* Specification Packages & Pricing Cards */}
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
              <div>
                <h4 className="text-xl sm:text-2xl font-black font-heading text-[#1d3557]">
                  Transparent Specification Packages
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Itemized pricing with strict material certifications.
                </p>
              </div>
              <button
                onClick={() => onOpenQuoteModal(activeService.id as any)}
                className="text-xs font-bold text-[#E63946] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                Customizing your own plan? Use Instant Estimator →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeService.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                    pkg.popular
                      ? 'bg-white border-2 border-[#FFC107] shadow-xl relative'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 right-6 px-3 py-1 bg-[#FFC107] text-[#1d3557] text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                      Most Selected
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-lg font-bold font-heading text-[#1d3557]">
                        {pkg.name}
                      </h5>
                      <div className="text-2xl font-black text-[#E63946] font-mono mt-1">
                        {pkg.ratePerSqFt}
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                        Package Inclusions:
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
                      onClick={() => onOpenQuoteModal(activeService.id as any)}
                      className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        pkg.popular
                          ? 'bg-[#E63946] hover:bg-[#d90429] text-white shadow-md'
                          : 'bg-[#1d3557] hover:bg-[#14253e] text-white'
                      }`}
                    >
                      Select & Calculate Estimate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

