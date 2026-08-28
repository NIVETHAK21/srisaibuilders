import React, { useState } from 'react';
import { Calculator, CheckCircle2, Phone, Send, ArrowRight, ShieldCheck, Sparkles, Building } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_DETAILS } from '../data/companyData';

interface CostEstimatorSectionProps {
  onOpenQuoteModal: () => void;
}

export const CostEstimatorSection: React.FC<CostEstimatorSectionProps> = ({ onOpenQuoteModal }) => {
  const [serviceType, setServiceType] = useState<'construction' | 'interior' | 'renovation'>('construction');
  const [tier, setTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [areaSqFt, setAreaSqFt] = useState<number>(2000);
  const [floors, setFloors] = useState<number>(2);
  const [includeModularKitchen, setIncludeModularKitchen] = useState<boolean>(true);
  const [include3dElevation, setInclude3dElevation] = useState<boolean>(true);

  // Rate calculations
  let baseRate = 2350;
  if (serviceType === 'construction') {
    baseRate = tier === 'standard' ? 1950 : tier === 'premium' ? 2350 : 2850;
  } else if (serviceType === 'interior') {
    baseRate = tier === 'standard' ? 1200 : tier === 'premium' ? 1650 : 2200;
  } else {
    baseRate = tier === 'standard' ? 750 : tier === 'premium' ? 1100 : 1600;
  }

  const baseTotal = areaSqFt * baseRate;
  const kitchenAddon = includeModularKitchen && serviceType === 'construction' ? 220000 : 0;
  const elevationAddon = include3dElevation && serviceType === 'construction' ? 45000 : 0;
  const grandTotal = baseTotal + kitchenAddon + elevationAddon;

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello Er. Manikandan (Pranav Sai Builders),\n\nI calculated an estimate for my plot:\n` +
      `• Work Type: ${serviceType.toUpperCase()}\n` +
      `• Quality Tier: ${tier.toUpperCase()}\n` +
      `• Area: ${areaSqFt} Sq.Ft\n` +
      `• Floors: ${floors}\n` +
      `• Estimated Total: ₹${grandTotal.toLocaleString('en-IN')}\n\nPlease share the detailed material specifications sheet.`
    );
    window.open(`https://wa.me/919952030796?text=${text}`, '_blank');
  };

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-white text-[#1d3557] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1d3557] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#E63946]" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Estimate Your Construction Cost
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Instant transparent budgeting for residential buildings, modular interiors, and structural remodeling in Chennai.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#f8f9fa] border border-slate-200 p-6 sm:p-10 shadow-xl space-y-8">
          
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1d3557] mb-3">
              Step 1: Choose Service Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'construction', label: 'Turnkey Construction', desc: 'From soil test to complete house handover' },
                { id: 'interior', label: 'Modular Interior Fit-Out', desc: 'Kitchen, wardrobes, false ceiling & lighting' },
                { id: 'renovation', label: 'Structural Renovation', desc: 'Floor addition, waterproofing & modern facade' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceType(s.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceType === s.id
                      ? 'bg-[#1d3557] border-[#1d3557] text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm">{s.label}</div>
                  <div className="text-[11px] opacity-80 mt-1">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tier Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1d3557] mb-3">
              Step 2: Choose Material Specification Tier
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { 
                  id: 'standard', 
                  title: 'Standard Tier', 
                  rate: serviceType === 'construction' ? '₹1,950 / sqft' : '₹1,200 / sqft',
                  features: 'ARS TMT Steel, 2x2 Vitrified Tiles, Anchor Roma Switches'
                },
                { 
                  id: 'premium', 
                  title: 'Premium Tier (Recommended)', 
                  rate: serviceType === 'construction' ? '₹2,350 / sqft' : '₹1,650 / sqft',
                  features: 'Tata Tiscon Fe550D, UltraTech 53G, 4x2 GVT Tiles, Jaquar Sanitary'
                },
                { 
                  id: 'luxury', 
                  title: 'Luxury Villa Tier', 
                  rate: serviceType === 'construction' ? '₹2,850+ / sqft' : '₹2,200 / sqft',
                  features: 'Italian Marble, Full Teak Wood, Kohler/Grohe CP, Smart Automation'
                },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTier(t.id as any)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    tier === t.id
                      ? 'bg-amber-50 border-[#FFC107] text-[#1d3557] shadow-sm ring-2 ring-[#FFC107]/40'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#1d3557]">{t.title}</span>
                    <span className="text-xs font-mono font-bold text-[#E63946]">{t.rate}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">{t.features}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Area Slider & Floors */}
          <div className="p-6 rounded-xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1d3557]">
                  Total Built-Up Area
                </label>
                <span className="text-lg font-black text-[#E63946] font-mono">
                  {areaSqFt.toLocaleString('en-IN')} Sq.Ft
                </span>
              </div>
              <input
                type="range"
                min="600"
                max="6000"
                step="50"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E63946]"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                <span>600 Sq.Ft (Compact)</span>
                <span>2,500 Sq.Ft (Standard Villa)</span>
                <span>6,000 Sq.Ft</span>
              </div>
            </div>

            {serviceType === 'construction' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1d3557] mb-2">
                  Building Height (Floors)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((fl) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setFloors(fl)}
                      className={`py-2 text-xs font-bold uppercase rounded border transition-all cursor-pointer ${
                        floors === fl
                          ? 'bg-[#1d3557] border-[#1d3557] text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      G+{fl - 1} ({fl} {fl === 1 ? 'Floor' : 'Fl'})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Box */}
          <div className="p-6 sm:p-8 rounded-xl bg-white border-2 border-l-4 border-l-[#FFC107] border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md">
            <div className="space-y-1">
              <div className="text-xs text-[#E63946] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Turnkey Cost ({tier.toUpperCase()})</span>
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1d3557] font-mono tracking-tight">
                ₹{grandTotal.toLocaleString('en-IN')}*
              </div>
              <p className="text-xs text-slate-500">
                Rate calculated at ₹{baseRate}/sq.ft for {areaSqFt} sq.ft area. Excludes government approval fees.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded shadow-md transition-all font-heading text-center cursor-pointer"
              >
                Request Free Inspection
              </button>
              <button
                onClick={handleWhatsAppSend}
                className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded shadow-md transition-all text-center cursor-pointer"
              >
                WhatsApp Er. Manikandan
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
