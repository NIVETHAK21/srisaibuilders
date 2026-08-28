import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, Calculator } from 'lucide-react';
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
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Quick Estimator Pill */}
      <button
        onClick={onOpenQuoteModal}
        className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1d3557] text-[#FFC107] border border-[#FFC107]/40 text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-md hover:bg-[#152740] hover:border-[#FFC107] transition-all transform hover:scale-105 cursor-pointer font-heading"
        title="Open Instant Cost Estimator"
      >
        <Calculator className="w-4 h-4 text-[#FFC107]" />
        <span>Cost Estimator</span>
      </button>

      {/* Floating Speed Dial Stack (Phone + WhatsApp) */}
      <div className="flex items-center gap-2.5">
        
        {/* Direct Call Floating Button */}
        <a
          href={`tel:${COMPANY_DETAILS.phones[0]}`}
          className="w-12 h-12 rounded-full bg-[#E63946] hover:bg-[#d90429] text-white shadow-xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
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
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 cursor-pointer relative group"
          title="Chat with Er. Manikandan on WhatsApp (9952030796)"
          aria-label="WhatsApp Chat with Pranav Sai Builders"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30"></span>
          <svg
            className="w-6 h-6 fill-current relative z-10 transition-transform group-hover:scale-110"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-2.227-.564-1.96-1.173-3.23-3.158-3.328-3.289-.098-.13-.799-1.062-.799-2.026 0-.964.506-1.438.686-1.634.18-.196.393-.245.524-.245.13 0 .262.002.376.007.12.006.281-.046.439.334.164.394.556 1.358.604 1.458.049.1.082.217.016.347-.066.13-.099.211-.197.325-.098.115-.207.257-.296.344-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.365.753.67 1.388.877 1.585.975.197.099.312.082.427-.05.115-.13.492-.573.623-.77.13-.197.262-.164.442-.098.18.065 1.146.541 1.343.639.197.098.328.147.377.229.049.082.049.475-.095.88z" />
          </svg>
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

