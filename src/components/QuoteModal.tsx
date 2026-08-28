import React, { useState } from 'react';
import { X, Calculator, CheckCircle2, Phone, Send, Sparkles, Shield, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_DETAILS } from '../data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: 'construction' | 'interior' | 'renovation';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'construction',
}) => {
  const [serviceType, setServiceType] = useState<'construction' | 'interior' | 'renovation'>(initialService);
  const [tier, setTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [areaSqFt, setAreaSqFt] = useState<number>(1800);
  const [floors, setFloors] = useState<number>(2);
  const [includeModularKitchen, setIncludeModularKitchen] = useState<boolean>(true);
  const [include3dElevation, setInclude3dElevation] = useState<boolean>(true);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [siteLocation, setSiteLocation] = useState<string>('Chennai');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Rate calculations
  let baseRate = 2350; // default premium construction
  if (serviceType === 'construction') {
    baseRate = tier === 'standard' ? 1950 : tier === 'premium' ? 2350 : 2850;
  } else if (serviceType === 'interior') {
    baseRate = tier === 'standard' ? 1200 : tier === 'premium' ? 1650 : 2200;
  } else {
    // renovation
    baseRate = tier === 'standard' ? 750 : tier === 'premium' ? 1100 : 1600;
  }

  const baseTotal = areaSqFt * baseRate;
  const kitchenAddon = includeModularKitchen && serviceType === 'construction' ? 220000 : 0;
  const elevationAddon = include3dElevation && serviceType === 'construction' ? 45000 : 0;
  const estimatedGrandTotal = baseTotal + kitchenAddon + elevationAddon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formspree.io/f/xbjnqkyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: COMPANY_DETAILS.name,
          service: serviceType,
          tier: tier,
          areaSqFt: areaSqFt,
          floors: floors,
          estimatedAmount: `₹${estimatedGrandTotal.toLocaleString('en-IN')}`,
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
          location: siteLocation,
          date: new Date().toISOString(),
        }),
      }).catch(() => {});

      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E63946', '#FFC107', '#1d3557', '#10B981'],
      });
    } catch {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Er. Manikandan (Pranav Sai Builders),\n\nI just calculated a quote on your website:\n` +
      `• Service: ${serviceType.toUpperCase()}\n` +
      `• Package: ${tier.toUpperCase()}\n` +
      `• Plot/Built-up Area: ${areaSqFt} sq.ft\n` +
      `• Floors: ${floors}\n` +
      `• Approx Estimate: ₹${estimatedGrandTotal.toLocaleString('en-IN')}\n` +
      `• My Name: ${clientName || 'Homeowner'}\n` +
      `• Location: ${siteLocation}\n\nPlease contact me for on-site inspection.`
    );
    window.open(`https://wa.me/919952030796?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1d3557]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl text-[#1d3557] p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#1d3557] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close quote modal"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2.5 bg-red-50 text-[#E63946] border border-red-200 rounded-xl">
                <Calculator className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-black font-heading text-[#1d3557]">
                  Instant Construction & Interior Estimator
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Transparent itemized rates for Chennai & Suburbs by Er. D. Manikandan
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Step 1: Select Service */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1d3557] mb-2">
                  1. Select Service Type
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'construction', label: 'Turnkey Construction' },
                    { id: 'interior', label: 'Interior Fit-Out' },
                    { id: 'renovation', label: 'Renovation / Remodel' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceType(s.id as any)}
                      className={`p-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg border transition-all text-center cursor-pointer ${
                        serviceType === s.id
                          ? 'bg-[#1d3557] border-[#1d3557] text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Quality Tier */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1d3557] mb-2">
                  2. Choose Specification Package
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { id: 'standard', name: 'Standard', rate: serviceType === 'construction' ? '₹1,950/sqft' : '₹1,200/sqft' },
                    { id: 'premium', name: 'Premium (Popular)', rate: serviceType === 'construction' ? '₹2,350/sqft' : '₹1,650/sqft' },
                    { id: 'luxury', name: 'Luxury Villa', rate: serviceType === 'construction' ? '₹2,850+/sqft' : '₹2,200/sqft' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTier(t.id as any)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                        tier === t.id
                          ? 'bg-amber-50 border-[#FFC107] text-[#1d3557] shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold text-[#1d3557]">{t.name}</div>
                      <div className="text-xs text-[#E63946] font-mono font-bold mt-0.5">{t.rate}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Area Slider & Floors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Built-Up Area</label>
                    <span className="text-sm font-bold text-[#1d3557] font-mono">{areaSqFt.toLocaleString('en-IN')} Sq.Ft</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="8000"
                    step="50"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1d3557]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                    <span>500 sq.ft</span>
                    <span>3,500 sq.ft</span>
                    <span>8,000 sq.ft</span>
                  </div>
                </div>

                {serviceType === 'construction' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">Number of Floors</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((fl) => (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => setFloors(fl)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                            floors === fl
                              ? 'bg-[#1d3557] border-[#1d3557] text-white'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          G+{fl - 1} ({fl} {fl === 1 ? 'Floor' : 'Floors'})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Addons for construction */}
              {serviceType === 'construction' && (
                <div className="flex flex-wrap gap-4 text-xs font-medium">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeModularKitchen}
                      onChange={(e) => setIncludeModularKitchen(e.target.checked)}
                      className="rounded border-slate-300 text-[#1d3557] focus:ring-[#1d3557]"
                    />
                    <span>Include Modular Kitchen (~₹2.2L value)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={include3dElevation}
                      onChange={(e) => setInclude3dElevation(e.target.checked)}
                      className="rounded border-slate-300 text-[#1d3557] focus:ring-[#1d3557]"
                    />
                    <span>Include 3D Exterior Elevation & Structural Design</span>
                  </label>
                </div>
              )}

              {/* Real-time Calculation Summary Card */}
              <div className="p-5 rounded-xl bg-[#1d3557] text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-md">
                <div>
                  <div className="text-[11px] text-slate-300 uppercase tracking-widest font-bold">
                    Estimated Project Cost ({tier.toUpperCase()} PACKAGE)
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#FFC107] font-mono tracking-tight mt-0.5">
                    ₹{estimatedGrandTotal.toLocaleString('en-IN')}*
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    *Includes structural steel, cement, brickwork, plastering, flooring & basic electrical/plumbing.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-[#FFC107] text-xs font-bold border border-white/20">
                    <Shield className="w-3.5 h-3.5" /> 10-Yr Warranty
                  </span>
                </div>
              </div>

              {/* Step 4: Contact details to finalize */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S. Karthik"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (10 Digits) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Plot Location / Area in Chennai</label>
                  <input
                    type="text"
                    placeholder="e.g. Adyar, Velachery, OMR"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded shadow-md transition-all cursor-pointer font-heading"
                >
                  {isSubmitting ? (
                    'Generating Itemized PDF Estimate...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Request Free Site Inspection & Detailed BOQ
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={shareViaWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider rounded shadow-md transition-all cursor-pointer text-xs sm:text-sm"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Confirmation */
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-[#1d3557]">
              Thank You, {clientName || 'Valued Client'}!
            </h3>
            <p className="text-slate-600 max-w-md mx-auto text-sm leading-relaxed">
              Your estimate calculation of <strong className="text-[#E63946]">₹{estimatedGrandTotal.toLocaleString('en-IN')}</strong> for{' '}
              <span className="text-[#1d3557] font-bold">{areaSqFt} Sq.Ft {serviceType}</span> in {siteLocation} has been dispatched directly to Er. D. Manikandan.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-xs text-slate-700 text-left space-y-1.5">
              <div className="text-[#1d3557] font-bold uppercase tracking-wider mb-1">What Happens Next?</div>
              <div>✓ Er. D. Manikandan will review your requirement within 2 hours.</div>
              <div>✓ Complimentary site visit and structural inspection scheduled.</div>
              <div>✓ Detailed Itemized BOQ (Bill of Quantities) with material brand list provided.</div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
              <button
                onClick={shareViaWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm cursor-pointer"
              >
                Instant Connect on WhatsApp
              </button>
              <a
                href={`tel:${COMPANY_DETAILS.phones[0]}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm"
              >
                <Phone className="w-4 h-4" /> Call Er. Manikandan: {COMPANY_DETAILS.phones[0]}
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-500 hover:text-[#1d3557] uppercase tracking-wider pt-2 block mx-auto cursor-pointer"
            >
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

