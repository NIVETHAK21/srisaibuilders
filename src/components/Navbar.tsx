import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { PsbLogo } from './PsbLogo';
import { COMPANY_DETAILS } from '../data/companyData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenQuoteModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'flowchart', label: 'Execution Flow' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'estimator', label: 'Estimator' },
    { id: 'why-us', label: 'Why PSB' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      {/* Top Engineering & Compliance Bar */}
      <div className="bg-[#14253e] text-slate-200 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8 border-b border-[#274773]/60">
        <div className="w-full mx-auto flex flex-nowrap justify-between items-center gap-3 overflow-x-auto scrollbar-none whitespace-nowrap">
          <div className="flex items-center gap-3 sm:gap-4 flex-nowrap shrink-0 whitespace-nowrap">
            <span className="inline-flex items-center gap-1 text-[#FFC107] font-semibold whitespace-nowrap shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC107] flex-shrink-0" />
              GST: <strong className="text-white font-mono tracking-wider">{COMPANY_DETAILS.gstNumber}</strong>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300 whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] flex-shrink-0" />
              Er. D. Manikandan, B.Tech (Civil) — 12+ Yrs Experience
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-nowrap shrink-0 whitespace-nowrap">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#FFC107] font-bold font-mono transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC107] flex-shrink-0" />
              <span>+91 {COMPANY_DETAILS.phones[0]}</span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a
              href={`https://wa.me/91${COMPANY_DETAILS.phones[0]}?text=${encodeURIComponent('Hello Er. Manikandan (Pranav Sai Builders), I would like to enquire about your construction and interior services.')}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors whitespace-nowrap shrink-0 group"
              title="Chat with Er. Manikandan on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current text-[#25D366] flex-shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-2.227-.564-1.96-1.173-3.23-3.158-3.328-3.289-.098-.13-.799-1.062-.799-2.026 0-.964.506-1.438.686-1.634.18-.196.393-.245.524-.245.13 0 .262.002.376.007.12.006.281-.046.439.334.164.394.556 1.358.604 1.458.049.1.082.217.016.347-.066.13-.099.211-.197.325-.098.115-.207.257-.296.344-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.365.753.67 1.388.877 1.585.975.197.099.312.082.427-.05.115-.13.492-.573.623-.77.13-.197.262-.164.442-.098.18.065 1.146.541 1.343.639.197.098.328.147.377.229.049.082.049.475-.095.88z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar with signature red bottom border */}
      <nav
        className={`w-full transition-all duration-300 border-b-2 border-[#E63946] shadow-md ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md py-2 text-[#1d3557]'
            : 'bg-white/95 backdrop-blur-sm py-2.5 sm:py-3 text-[#1d3557]'
        }`}
      >
        <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-2 lg:gap-3 xl:gap-4 flex-nowrap">
          {/* Brand Logo & Name (Responsive, never cut off) */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left focus:outline-none cursor-pointer group min-w-0 flex-1 sm:flex-initial"
          >
            <PsbLogo size="md" variant="horizontal" theme="light" />
          </button>

          {/* Desktop Nav Items (Single Line, No Wrap) */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 flex-nowrap shrink-0 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded text-xs xl:text-[13px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#E63946] bg-red-50/90 font-black'
                      : 'text-[#1d3557] hover:text-[#E63946] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA Button (Single Line) */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0 flex-nowrap whitespace-nowrap">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1d3557] border border-slate-300 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#E63946] flex-shrink-0" />
              <span>Call Er. Manikandan</span>
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="relative group overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 xl:px-5 py-2 sm:py-2.5 bg-[#E63946] hover:bg-[#d90429] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 hover:shadow-lg active:scale-95 cursor-pointer font-heading border border-red-400/30 whitespace-nowrap shrink-0"
            >
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <span>Get Free Quote</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </button>
          </div>

          {/* Mobile Navigation Toggle (Clean & Uncluttered) */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="p-2 rounded-lg bg-red-50 text-[#E63946] border border-red-200"
              aria-label="Call Pranav Sai Builders"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-[#1d3557] hover:text-[#E63946] border border-slate-300 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b-2 border-[#E63946] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`p-2.5 rounded-lg text-left text-xs font-bold uppercase tracking-wider transition-all ${
                    activeSection === link.id
                      ? 'bg-red-50 text-[#E63946] border border-red-200 font-black'
                      : 'bg-slate-50 text-[#1d3557] hover:bg-slate-100 hover:text-[#E63946]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-3 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded-lg text-center text-xs shadow-md font-heading transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Get Free Construction Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0]}`}
                  className="flex-1 py-2.5 bg-slate-100 text-[#1d3557] text-xs font-bold rounded-lg text-center border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E63946]" />
                  {COMPANY_DETAILS.phones[0]}
                </a>
                <a
                  href={`https://wa.me/919952030796?text=Hi%20Pranav%20Sai%20Builders,%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-lg text-center flex items-center justify-center gap-1.5"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-2.227-.564-1.96-1.173-3.23-3.158-3.328-3.289-.098-.13-.799-1.062-.799-2.026 0-.964.506-1.438.686-1.634.18-.196.393-.245.524-.245.13 0 .262.002.376.007.12.006.281-.046.439.334.164.394.556 1.358.604 1.458.049.1.082.217.016.347-.066.13-.099.211-.197.325-.098.115-.207.257-.296.344-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.365.753.67 1.388.877 1.585.975.197.099.312.082.427-.05.115-.13.492-.573.623-.77.13-.197.262-.164.442-.098.18.065 1.146.541 1.343.639.197.098.328.147.377.229.049.082.049.475-.095.88z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

