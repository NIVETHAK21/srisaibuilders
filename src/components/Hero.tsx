import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Award, HardHat, Sparkles, Building, CheckCircle } from 'lucide-react';
import { ThreeHeroScene } from './ThreeHeroScene';
import { COMPANY_DETAILS, FOUNDER_BIO } from '../data/companyData';

interface HeroProps {
  onOpenQuoteModal: () => void;
  onExploreProjects: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuoteModal,
  onExploreProjects,
  onExploreServices,
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-32 sm:pt-36 md:pt-36 lg:pt-28 pb-16 overflow-hidden bg-[#1d3557] text-white pattern-dots">
      {/* 3D Three.js Interactive Architectural Scene */}
      <ThreeHeroScene />

      {/* Gradient Overlays for High Legibility & High Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557] via-[#1d3557]/75 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#1d3557]/50 to-[#1d3557]/95 pointer-events-none z-10" />

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6 pt-4 sm:pt-6">
          
          {/* Engineering Accreditation & GST Pill */}
          <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs text-slate-200 backdrop-blur-md shadow-lg box-pop">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC107] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC107]"></span>
            </span>
            <span className="font-bold text-[#FFC107]">Er. D. Manikandan, B.Tech (Civil)</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-200 hidden sm:inline font-medium">12+ Years Industry Experience</span>
            <span className="text-slate-400 hidden md:inline">•</span>
            <span className="text-[#FFC107] font-mono text-[11px] hidden md:inline">GST: {COMPANY_DETAILS.gstNumber}</span>
          </div>

          {/* Primary Main Headline & Tagline with gold accent border */}
          <div className="space-y-3 pl-4 border-l-4 border-[#FFC107]">
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-[#a8dadc]">
              Pranav Sai Builders
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black font-heading tracking-tight leading-[1.08] text-white">
              Sculpt Your Dream Home With{' '}
              <span className="text-[#FFC107]">
                Engineering Precision
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl pt-1">
              Turnkey residential construction, luxury interior fit-outs, and engineered renovation in Chennai. 
              Built on certified civil engineering rigor, 100% itemized transparency, and zero compromise on materials.
            </p>
          </div>

          {/* Key Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
              <span>10-Year Structural Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
              <span>100% Vaastu Compliant Plans</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
              <span>UltraTech & Tata TMT Steel</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#E63946] hover:bg-[#d90429] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer font-heading glow-action"
            >
              <span>Get Free Itemized Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreProjects}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white hover:bg-white hover:text-[#1d3557] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-lg transition-all backdrop-blur-md cursor-pointer font-heading hover:shadow-lg active:scale-95"
            >
              <span>View Portfolio (85+ Projects)</span>
            </button>

            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="inline-flex items-center gap-2 px-4 py-4 text-xs sm:text-sm font-bold text-slate-200 hover:text-[#FFC107] transition-all hover:scale-105"
            >
              <Phone className="w-4 h-4 text-[#FFC107]" />
              <span>Direct Call: <strong className="text-white font-mono">{COMPANY_DETAILS.phones[0]}</strong></span>
            </a>
          </div>

          {/* Metric Badges Banner */}
          <div className="pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FOUNDER_BIO.stats.map((stat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm box-pop interactive-card">
                <div className="text-2xl sm:text-3xl font-black font-heading text-[#FFC107] font-mono">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-200 font-bold uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Subtle Hint Indicator for 3D Interaction */}
      <div className="hidden md:flex absolute bottom-4 right-8 z-20 items-center gap-2 text-[11px] text-slate-300 bg-[#14253e]/90 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-sm pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
        <span>Interactive 3D Blueprint: Move mouse to orbit view</span>
      </div>
    </section>
  );
};

