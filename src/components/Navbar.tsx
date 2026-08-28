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
    { id: 'projects', label: 'Portfolio' },
    { id: 'estimator', label: 'Cost Estimator' },
    { id: 'why-us', label: 'Why PSB' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300">
      {/* Top Engineering & Compliance Bar */}
      <div className="bg-[#14253e] text-slate-200 text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#274773]/60">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[#FFC107] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC107]" />
              GST Reg: <strong className="text-white font-mono tracking-wider">{COMPANY_DETAILS.gstNumber}</strong>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
              Er. D. Manikandan, B.Tech (Civil) — 12+ Yrs Experience
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#FFC107] font-bold font-mono transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>+91 {COMPANY_DETAILS.phones[0]}</span>
            </a>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E63946]" />
              <span>{COMPANY_DETAILS.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar with signature red bottom border */}
      <nav
        className={`w-full transition-all duration-300 border-b-2 border-[#E63946] shadow-md ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md py-2.5 text-[#1d3557]'
            : 'bg-white/95 backdrop-blur-sm py-3.5 text-[#1d3557]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center text-left focus:outline-none cursor-pointer group"
          >
            <PsbLogo size="md" variant="horizontal" theme="light" />
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded text-xs xl:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#E63946] bg-red-50/80 font-black'
                      : 'text-[#1d3557] hover:text-[#E63946] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phones[0]}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1d3557] border border-slate-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Call Er. Mani</span>
            </a>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E63946] hover:bg-[#d90429] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer font-heading"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-1.5 bg-[#E63946] text-white text-xs font-bold uppercase tracking-wider rounded font-heading"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-[#1d3557] hover:text-[#E63946] border border-slate-300"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                className="w-full py-3 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded text-center text-xs shadow-md font-heading"
              >
                Get a Free Construction Quote
              </button>
              <div className="flex gap-2">
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0]}`}
                  className="flex-1 py-2.5 bg-slate-100 text-[#1d3557] text-xs font-bold rounded text-center border border-slate-300 flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E63946]" />
                  {COMPANY_DETAILS.phones[0]}
                </a>
                <a
                  href={`https://wa.me/919952030796?text=Hi%20Pranav%20Sai%20Builders,%20I%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded text-center flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
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

