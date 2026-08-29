import React, { useState } from 'react';
import { Phone, Mail, ShieldCheck, Award, CheckCircle, CreditCard, Sparkles, UserCheck } from 'lucide-react';
import { COMPANY_DETAILS, FOUNDER_BIO } from '../data/companyData';
import { PsbLogo } from './PsbLogo';

export const FounderCard: React.FC = () => {
  const [showBusinessCard, setShowBusinessCard] = useState(false);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Decorative Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#E63946] via-[#FFC107] to-[#1d3557] rounded-3xl opacity-25 blur-lg" />

      {/* Main Founder Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-white border-2 border-slate-200 shadow-2xl p-3 box-pop interactive-card">
        
        {/* Real Founder Spotlight Visual Frame */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 shadow-md group">
          {/* Authentic Real Portrait Photograph of Er. D. Manikandan */}
          <img
            src="/manikandan_founder.jpg"
            alt="Er. D. Manikandan, B.Tech (Civil) - Founder & Proprietor of Pranav Sai Builders"
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to direct asset if root path fails
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('src/assets')) {
                target.src = '/src/assets/images/manikandan_exact_photo_1787929455678.jpg';
              }
            }}
          />

          {/* Monogram Badge in top corner */}
          <div className="absolute top-2.5 left-2.5 p-1 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 shadow-md z-30 flex items-center gap-1.5 px-2.5 py-1">
            <PsbLogo size="sm" variant="icon-only" />
            <span className="text-[10px] font-mono font-black text-[#1d3557] uppercase tracking-wider">PSB Founder</span>
          </div>

          {/* Quick Toggle to View Official Visiting Card */}
          <button
            onClick={() => setShowBusinessCard(!showBusinessCard)}
            className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-[#1d3557]/90 hover:bg-[#14253e] text-[#FFC107] border border-[#FFC107]/40 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-md transition-all cursor-pointer z-30 hover:scale-105"
          >
            <CreditCard className="w-3 h-3" />
            <span>{showBusinessCard ? 'View Photo' : 'Visiting Card'}</span>
          </button>
        </div>

        {/* Founder Title Box Below Photo */}
        <div className="mt-3 p-4 bg-[#14253e] rounded-xl border border-white/10 space-y-1.5 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-lg sm:text-xl font-black font-heading text-white">
              Er. D. Manikandan
            </div>
            <span className="px-2 py-0.5 rounded bg-[#E63946] text-white text-[10px] font-black uppercase tracking-wider">
              Proprietor
            </span>
          </div>
          <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider">
            B.Tech (Civil) • Chief Structural Engineer
          </div>
          <div className="text-[11px] text-slate-200 flex items-center gap-1.5 pt-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFC107] flex-shrink-0" />
            <span>12+ Years Practical Construction Mastery in Chennai</span>
          </div>
        </div>

        {/* Business Card Modal/Overlay if Toggled */}
        {showBusinessCard && (
          <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-[#1d3557] to-[#14253e] text-white border-2 border-[#FFC107] shadow-xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-white/20 pb-2">
              <div>
                <div className="text-xs text-[#FFC107] font-black uppercase tracking-widest font-heading">
                  PRANAV SAI BUILDER'S
                </div>
                <div className="text-[10px] text-slate-300 font-medium italic">
                  "Sculpt Your Dream Home With Us"
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-[#FFC107] font-mono block">GST: 33CHZPM7358H1ZK</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-white">D. Manikandan, B.Tech., (Civil)</div>
              <div className="text-[11px] text-[#FFC107] font-semibold">Proprietor</div>
            </div>

            <div className="text-[11px] text-slate-200 space-y-1 pt-1 font-mono">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E63946]" />
                <a href="tel:9952030796" className="hover:text-[#FFC107] font-bold">9952030796</a>, <a href="tel:9150555796" className="hover:text-[#FFC107] font-bold">9150555796</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFC107]" />
                <a href="mailto:msmani1507@gmail.com" className="hover:text-white underline">msmani1507@gmail.com</a>
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 text-[10px] text-center font-bold text-[#a8dadc] uppercase tracking-wider">
              CONSTRUCTION • INTERIOR • RENOVATIONAL
            </div>
          </div>
        )}

        {/* User Request 4: Direct Interactive Phone Call Button */}
        <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-left w-full sm:w-auto">
            <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Direct Civil Engineer Line</span>
            <span className="text-[#1d3557] font-mono text-sm font-black">+91 9952030796</span>
          </div>

          <a
            href="tel:9952030796"
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#E63946] hover:bg-[#d90429] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-heading"
            title="Call Er. D. Manikandan on 9952030796"
          >
            <Phone className="w-3.5 h-3.5 animate-bounce" />
            <span>Call Er. Manikandan</span>
          </a>
        </div>

      </div>
    </div>
  );
};
