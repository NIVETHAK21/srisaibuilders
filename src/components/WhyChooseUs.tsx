import React from 'react';
import { 
  ShieldCheck, 
  FileSpreadsheet, 
  Clock, 
  Award, 
  Compass, 
  Building,
  CheckCircle,
  HardHat,
  ArrowRight
} from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY_DETAILS } from '../data/companyData';

interface WhyChooseUsProps {
  onOpenQuoteModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenQuoteModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#1d3557]" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-6 h-6 text-[#E63946]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#FFC107]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#1d3557]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#E63946]" />;
      case 'CheckCircle':
        return <CheckCircle className="w-6 h-6 text-[#1d3557]" />;
      case 'Building':
      default:
        return <Building className="w-6 h-6 text-[#FFC107]" />;
    }
  };

  return (
    <section id="why-us" className="py-8 sm:py-10 lg:py-12 bg-[#f8f9fa] text-[#1d3557] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <HardHat className="w-3.5 h-3.5" />
            <span>The PSB Construction Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Why Pranav Sai Builders Stands Apart
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            We eliminate the standard anxieties of homebuilding through certified civil engineering leadership, transparent contracts, and unwavering material integrity.
          </p>
        </div>

        {/* 6 Grid Advantage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#1d3557] transition-all duration-300 hover:-translate-y-1 group shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-heading text-[#1d3557] group-hover:text-[#E63946] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-[#E63946]" />
                <span>Standard Protocol on Every PSB Site</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Bar Banner */}
        <div className="rounded-2xl bg-[#1d3557] text-white border border-[#274773] p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 pattern-dots">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFC107]">
              Direct Engineering Consultation
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white">
              Ready to Excavate Your Dream Foundation?
            </h3>
            <p className="text-slate-200 text-sm max-w-xl">
              Get an instant itemized estimate and schedule a free on-site soil and architectural review with Er. D. Manikandan.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded shadow-xl transition-all cursor-pointer font-heading"
            >
              <span>Get Free Itemized Quote</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white hover:text-[#1d3557] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded border border-white/20 transition-colors"
            >
              <span>Call: {COMPANY_DETAILS.phones[0]}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

