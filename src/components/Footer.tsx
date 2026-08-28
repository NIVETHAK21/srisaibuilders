import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp, MessageSquare } from 'lucide-react';
import { PsbLogo } from './PsbLogo';
import { COMPANY_DETAILS, FOUNDER_BIO } from '../data/companyData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14253e] text-slate-300 border-t border-white/10 relative z-20">
      
      {/* Top CTA Band */}
      <div className="bg-[#E63946] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left text-white">
            <h4 className="text-xl font-bold font-heading">
              Plan Your Dream Home in Chennai Today
            </h4>
            <p className="text-xs text-red-100 mt-0.5">
              Talk directly with certified Civil Engineer Er. D. Manikandan (12+ Yrs Exp).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="px-4 py-2.5 bg-[#1d3557] hover:bg-[#14253e] text-white font-bold text-xs uppercase tracking-wider rounded shadow-md transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Call: {COMPANY_DETAILS.phones[0]}</span>
            </a>
            <button
              onClick={onOpenQuoteModal}
              className="px-4 py-2.5 bg-[#FFC107] hover:bg-amber-300 text-[#1d3557] font-black text-xs uppercase tracking-wider rounded shadow-md transition-colors cursor-pointer font-heading"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <PsbLogo size="lg" variant="horizontal" theme="dark" />
            </button>

            <p className="text-xs text-slate-300 leading-relaxed pr-4">
              {COMPANY_DETAILS.tagline}. A premier civil engineering and construction enterprise based in Chennai, delivering residential villas, high-end commercial spaces, modular interiors, and structural renovation.
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-[#FFC107] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>GST Registered Business</span>
              </div>
              <div className="font-mono text-white text-xs font-bold tracking-wider">
                {COMPANY_DETAILS.gstNumber}
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold font-heading text-[#FFC107] uppercase tracking-widest">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  About Er. Manikandan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  All Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  Project Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  Cost Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  Client Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFC107] transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold font-heading text-[#FFC107] uppercase tracking-widest">
              Engineering Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Turnkey Residential Villa Construction</li>
              <li>• Commercial Complexes & Office Fit-Outs</li>
              <li>• Factory-Finished Modular Kitchens</li>
              <li>• False Ceilings & Lighting Automation</li>
              <li>• Structural Jacketing & Retrofitting</li>
              <li>• Floor Additions & Facade Modernization</li>
              <li>• Advanced Terrace Waterproofing</li>
              <li>• CMDA / DTCP Building Plan Approvals</li>
            </ul>
          </div>

          {/* Col 4: Contact info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold font-heading text-[#FFC107] uppercase tracking-widest">
              Headquarters & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E63946] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address}, {COMPANY_DETAILS.city}, {COMPANY_DETAILS.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFC107] flex-shrink-0" />
                <div className="flex flex-col font-mono text-white font-bold">
                  <a href={`tel:${COMPANY_DETAILS.phones[0]}`} className="hover:text-[#FFC107]">
                    +91 {COMPANY_DETAILS.phones[0]}
                  </a>
                  <a href={`tel:${COMPANY_DETAILS.phones[1]}`} className="hover:text-[#FFC107]">
                    +91 {COMPANY_DETAILS.phones[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#a8dadc] flex-shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-[#FFC107] break-all">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-bold">Proprietor:</span>
                <span className="font-bold text-white">Er. D. Manikandan, B.Tech (Civil)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">{COMPANY_DETAILS.name}</strong>. All rights reserved. GST: {COMPANY_DETAILS.gstNumber}.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-300">Chennai • Tamil Nadu</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/15 transition-colors flex items-center gap-1 cursor-pointer font-bold uppercase text-[11px]"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

