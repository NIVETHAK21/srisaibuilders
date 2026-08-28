import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp, Calculator } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';

interface FloatingActionsProps {
  onOpenQuoteModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenQuoteModal }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Er. Manikandan (Pranav Sai Builders), I am interested in discussing a construction/interior/renovation project in Chennai.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Quick Estimator Pill */}
      <button
        onClick={onOpenQuoteModal}
        className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1d3557] text-[#FFC107] border border-[#FFC107]/40 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md hover:bg-[#152740] hover:border-[#FFC107] transition-all transform hover:scale-105 cursor-pointer font-heading"
        title="Open Instant Cost Estimator"
      >
        <Calculator className="w-4 h-4 text-[#FFC107]" />
        <span>Cost Estimator</span>
      </button>

      {/* Floating Speed Dial Stack */}
      <div className="flex items-center gap-2.5">
        
        {/* Direct Call Floating Button */}
        <a
          href={`tel:${COMPANY_DETAILS.phones[0]}`}
          className="w-12 h-12 rounded-full bg-[#E63946] hover:bg-[#d90429] text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer"
          title={`Call Er. Manikandan (${COMPANY_DETAILS.phones[0]})`}
          aria-label="Call Pranav Sai Builders"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* WhatsApp Floating Action Button */}
        <a
          href={`https://wa.me/919952030796?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 cursor-pointer relative"
          title="Chat with Er. Manikandan on WhatsApp (9952030796)"
          aria-label="WhatsApp Chat with Pranav Sai Builders"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
          <MessageSquare className="w-6 h-6 relative z-10" />
        </a>
      </div>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-[#1d3557] hover:bg-slate-50 border border-slate-200 shadow-lg flex items-center justify-center transition-all transform hover:scale-105 cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 text-[#1d3557]" />
        </button>
      )}
    </div>
  );
};

