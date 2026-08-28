import React, { useState } from 'react';
import { 
  GraduationCap, 
  HardHat, 
  Building2, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  Compass, 
  UserCheck, 
  ArrowRight,
  Phone,
  FileText
} from 'lucide-react';
import { FOUNDER_BIO, CAREER_TIMELINE, COMPANY_DETAILS } from '../data/companyData';
import { PsbLogo } from './PsbLogo';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenQuoteModal,
  onContactClick,
}) => {
  const [activeMilestone, setActiveMilestone] = useState<number>(3); // default to Founded PSB

  const milestoneColors = ['#FFC107', '#457b9d', '#457b9d', '#E63946'];

  const getMilestoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#FFC107]" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5 text-[#457b9d]" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-[#457b9d]" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5 text-[#E63946]" />;
    }
  };

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#f8f9fa] text-[#1d3557] relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 pattern-dots-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Leadership & Engineering Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Meet the Civil Engineer Behind <br className="hidden sm:inline" />
            <span className="text-[#E63946]">Pranav Sai Builders</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Founded by <strong className="text-[#1d3557]">Er. D. Manikandan, B.Tech (Civil)</strong>, Pranav Sai Builders combines over 12 years of hands-on structural site execution, architectural coordination, and strict quality governance.
          </p>
        </div>

        {/* Founder Profile & Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Founder Photo Spotlight Frame */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#E63946] via-[#FFC107] to-[#1d3557] rounded-3xl opacity-25 blur-lg" />
              
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xl p-2.5">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center group">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                    alt="Er. D. Manikandan, B.Tech (Civil) - Founder & Proprietor of Pranav Sai Builders"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d3557] via-[#1d3557]/30 to-transparent" />

                  {/* Monogram floating badge */}
                  <div className="absolute top-4 left-4 p-1.5 bg-white/90 backdrop-blur-md rounded-xl border border-slate-200 shadow-md">
                    <PsbLogo size="sm" variant="icon-only" />
                  </div>

                  {/* Founder Title Box at bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#1d3557]/95 backdrop-blur-md border border-white/15 space-y-1 text-white shadow-lg">
                    <div className="text-lg font-black font-heading text-white">
                      Er. D. Manikandan
                    </div>
                    <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider">
                      B.Tech (Civil) • Founder & Chief Engineer
                    </div>
                    <div className="text-[11px] text-slate-200 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FFC107]" />
                      <span>12+ Years Practical Construction Mastery in Chennai</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Credential Highlights */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm text-xs text-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">GST Registered Entity</span>{' '}
                  <strong className="text-[#1d3557] font-mono text-sm font-bold">{COMPANY_DETAILS.gstNumber}</strong>
                </div>
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0]}`}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-[#E63946] hover:bg-red-100 font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Er. Mani
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Narrative, Philosophy & Strengths */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3 pl-4 border-l-4 border-[#FFC107]">
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557]">
                Engineering Integrity, Personal Supervision & Generational Durability
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {FOUNDER_BIO.summary}
              </p>
            </div>

            {/* Founder Quote Card with Mint Background */}
            <div className="p-5 rounded-2xl bg-[#f1faee] border border-[#a8dadc] text-[#1d3557] space-y-2 shadow-sm">
              <p className="italic text-sm sm:text-base text-slate-800 font-medium">
                "{FOUNDER_BIO.philosophy}"
              </p>
              <div className="text-xs text-[#E63946] font-bold uppercase tracking-widest">
                — Er. D. Manikandan, B.Tech Civil
              </div>
            </div>

            {/* Core Competencies Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Structural Safety & Soil Dynamics', desc: 'Custom foundations engineered on exact geotechnical bearing capacity.' },
                { title: 'Turnkey Project Execution', desc: 'Zero hassle from plan sanction, RCC casting to modular interiors.' },
                { title: 'Transparent Itemized BOQ', desc: 'No hidden clauses, fixed price quotes with verified material brands.' },
                { title: 'Direct Engineering Oversight', desc: 'Er. Manikandan personally inspects reinforcement & slab casting.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <div className="flex items-center gap-2 text-[#1d3557] font-bold text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#E63946] flex-shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[12px] text-slate-600 leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded shadow-md transition-all font-heading cursor-pointer"
              >
                <span>Request Er. Manikandan for Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-[#1d3557] text-xs sm:text-sm font-bold uppercase tracking-wider rounded border border-slate-300 transition-colors cursor-pointer"
              >
                <span>View Contact Details</span>
              </button>
            </div>

          </div>
        </div>

        {/* 12-Year Career Timeline Stepper (The 4 Milestones from Prompt) */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557]">
              12-Year Career Journey & Milestones
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              The disciplined industry progression that built the foundation of Pranav Sai Builders.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CAREER_TIMELINE.map((item, index) => {
              const isSelected = activeMilestone === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMilestone(index)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#1d3557] text-white border-[#1d3557] shadow-lg'
                      : 'bg-white text-[#1d3557] border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {/* Step Number Tag & Custom Dot */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: milestoneColors[index] }}
                      />
                      <span className={`text-xs font-black font-mono ${isSelected ? 'text-[#FFC107]' : 'text-slate-500'}`}>
                        0{index + 1}
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-[#FFC107]' : 'text-[#457b9d]'}`}>
                      {item.period}
                    </span>
                  </div>

                  <div className={`font-heading font-bold text-sm line-clamp-1 ${isSelected ? 'text-white' : 'text-[#1d3557]'}`}>
                    {item.role}
                  </div>
                  <div className={`text-xs line-clamp-1 mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {item.organization}
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#1d3557] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Milestone Detailed Showcase Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-[#1d3557] text-white border border-[#274773] shadow-2xl">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 pb-6 border-b border-white/15">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 border border-white/15 rounded-xl">
                  {getMilestoneIcon(CAREER_TIMELINE[activeMilestone].icon)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider">
                    {CAREER_TIMELINE[activeMilestone].period} • {CAREER_TIMELINE[activeMilestone].location}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold font-heading text-white mt-0.5">
                    {CAREER_TIMELINE[activeMilestone].role} — {CAREER_TIMELINE[activeMilestone].organization}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-slate-200">
                  Stage {activeMilestone + 1} of {CAREER_TIMELINE.length}
                </span>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-4">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {CAREER_TIMELINE[activeMilestone].description}
                </p>
              </div>

              <div className="lg:col-span-5 space-y-2.5 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider mb-2">
                  Key Skills & Execution Highlights
                </div>
                {CAREER_TIMELINE[activeMilestone].highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC107] flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Mission */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E63946]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-[#1d3557]">Our Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To deliver world-class turnkey building construction and bespoke interior spaces across Chennai that combine certified civil engineering excellence, 100% price transparency, and generational structural durability—making dream homes a stress-free reality for every family.
            </p>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#FFC107]">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-[#1d3557]">Our Vision</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              To be Chennai’s most trusted and architecturally refined construction company, recognized for unwavering honesty in material specification, cutting-edge modern engineering practices, and timeless aesthetic execution.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

