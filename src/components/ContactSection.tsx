import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  HelpCircle, 
  ChevronDown, 
  Building2,
  CalendarCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_DETAILS, FAQ_ITEMS } from '../data/companyData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Turnkey Construction',
    plotArea: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formspree.io/f/xbjnqkyz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: COMPANY_DETAILS.email,
          company: COMPANY_DETAILS.name,
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => {});

      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E63946', '#FFC107', '#1d3557', '#10B981'],
      });
    } catch {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-[#f8f9fa] text-[#1d3557] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Phone className="w-3.5 h-3.5" />
            <span>Consult Er. D. Manikandan Directly</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Contact Pranav Sai Builders
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Schedule a complimentary site visit, soil evaluation, or turnkey floor plan discussion anywhere in Chennai.
          </p>
        </div>

        {/* Contact Grid: Form & Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-[#1d3557]">
                    Send a Project Inquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct notification sent to <span className="text-[#E63946] font-bold">{COMPANY_DETAILS.email}</span> & WhatsApp.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Manikandan / Dr. Priya"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9952030796"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Service Required
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white transition-colors font-medium"
                    >
                      <option value="Turnkey Construction">Turnkey Residential Construction</option>
                      <option value="Modular Interior">Interior Design & Fit-Out</option>
                      <option value="Structural Renovation">Renovation & Floor Addition</option>
                      <option value="Commercial Complex">Commercial Building Construction</option>
                      <option value="Plan Approval & 3D">Architectural 3D & Plan Approval</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Plot / Built-Up Area & Location in Chennai
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2,400 Sq.Ft plot in Adyar / OMR / Anna Nagar"
                    value={formData.plotArea}
                    onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Requirements & Timeline
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your dream home requirements, budget expectations, or specific architecture preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-[#1d3557] text-sm focus:outline-none focus:border-[#1d3557] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded shadow-md transition-all cursor-pointer font-heading text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      'Sending Inquiry...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry to Er. D. Manikandan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-[#1d3557]">
                  Message Sent Successfully!
                </h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1d3557]">{formData.name}</strong>. Er. D. Manikandan has received your project details and will call you back on <strong className="text-[#E63946]">{formData.phone}</strong> shortly.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <a
                    href={`tel:${COMPANY_DETAILS.phones[0]}`}
                    className="px-6 py-3 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider rounded text-xs sm:text-sm"
                  >
                    Call Now: {COMPANY_DETAILS.phones[0]}
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-3 bg-slate-100 text-slate-700 hover:text-[#1d3557] rounded text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Cards, GST Details & Phone Numbers */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Phone Cards */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#1d3557] border-b border-slate-100 pb-2">
                Direct Contact Lines
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${COMPANY_DETAILS.phones[0]}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-[#E63946] flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Primary Mobile</div>
                      <div className="font-heading font-bold text-[#1d3557] text-base tracking-wide font-mono group-hover:text-[#E63946]">
                        +91 {COMPANY_DETAILS.phones[0]}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#E63946] bg-red-50 px-2.5 py-1 rounded">
                    Call
                  </span>
                </a>

                <a
                  href={`tel:${COMPANY_DETAILS.phones[1]}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Secondary Mobile</div>
                      <div className="font-heading font-bold text-[#1d3557] text-base tracking-wide font-mono group-hover:text-amber-600">
                        +91 {COMPANY_DETAILS.phones[1]}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                    Call
                  </span>
                </a>

                {/* Normal Instagram Link under Phone numbers */}
                <a
                  href={COMPANY_DETAILS.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-pink-50 border border-slate-200 hover:border-pink-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Official Instagram</div>
                      <div className="font-bold text-[#1d3557] text-sm group-hover:text-pink-600">
                        @_psb_builders_
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded">
                    Follow
                  </span>
                </a>

                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1d3557] flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Official Email</div>
                      <div className="font-bold text-[#1d3557] text-sm group-hover:text-[#E63946]">
                        {COMPANY_DETAILS.email}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* GST & Office Credentials Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 border-l-4 border-l-[#FFC107] shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1d3557]">
                  Business Registration
                </span>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">GST Registration Number:</div>
                <div className="text-lg font-mono font-black text-[#1d3557] tracking-widest bg-slate-50 px-3 py-1.5 rounded border border-slate-200 inline-block">
                  {COMPANY_DETAILS.gstNumber}
                </div>
              </div>
              <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                <div><strong className="text-[#1d3557]">Proprietor:</strong> Er. D. Manikandan, B.Tech (Civil)</div>
                <div><strong className="text-[#1d3557]">Service Areas:</strong> Adyar, T. Nagar, OMR, Anna Nagar, Velachery, ECR & Greater Chennai</div>
                <div><strong className="text-[#1d3557]">Working Hours:</strong> {COMPANY_DETAILS.workingHours}</div>
              </div>
            </div>

            {/* WhatsApp Direct Action */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/919952030796?text=${encodeURIComponent('Hello Er. Manikandan (Pranav Sai Builders), I would like to discuss a construction/interior project in Chennai.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold uppercase tracking-wider shadow-md transition-all transform hover:scale-[1.02] cursor-pointer text-xs sm:text-sm font-heading"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-2.227-.564-1.96-1.173-3.23-3.158-3.328-3.289-.098-.13-.799-1.062-.799-2.026 0-.964.506-1.438.686-1.634.18-.196.393-.245.524-.245.13 0 .262.002.376.007.12.006.281-.046.439.334.164.394.556 1.358.604 1.458.049.1.082.217.016.347-.066.13-.099.211-.197.325-.098.115-.207.257-.296.344-.099.097-.202.203-.087.401.115.197.511.844 1.096 1.365.753.67 1.388.877 1.585.975.197.099.312.082.427-.05.115-.13.492-.573.623-.77.13-.197.262-.164.442-.098.18.065 1.146.541 1.343.639.197.098.328.147.377.229.049.082.049.475-.095.88z" />
                </svg>
                <span>Chat on WhatsApp (+91 9952030796)</span>
              </a>
            </div>

          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white space-y-4 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <h3 className="text-lg font-bold font-heading text-[#1d3557] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E63946]" />
                <span>Pranav Sai Builders — Chennai Service Radius</span>
              </h3>
              <p className="text-xs text-slate-600">
                Executing turnkey projects across Central Chennai, South Chennai, OMR IT Corridor & ECR.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#1d3557] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Coverage: All Chennai Zones
            </span>
          </div>

          <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
            <iframe
              title="Pranav Sai Builders Chennai Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124419.46736480572!2d80.14777085189283!3d13.003923984638795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[#E63946] text-xs font-bold uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clear Answers for Homeowners</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-[#1d3557] font-bold text-sm sm:text-base hover:text-[#E63946] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#E63946]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

