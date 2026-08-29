import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareHeart, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/companyData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-[#f8f9fa] text-[#1d3557] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Homeowner Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            What Chennai Families Say About PSB
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Real experiences from clients who entrusted their homes and commercial investments to Er. D. Manikandan.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 shadow-xl space-y-6">
            
            <div className="flex justify-between items-start">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[#E63946]">
                <Quote className="w-8 h-8" />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFC107] text-[#FFC107]" />
                ))}
              </div>
            </div>

            {/* Testimonial Quote Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#1d3557] font-medium leading-relaxed italic pl-4 border-l-4 border-[#FFC107]">
              "{current.review}"
            </p>

            {/* Client Profile Footer */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FFC107] shadow-sm"
                />
                <div>
                  <div className="font-heading font-bold text-[#1d3557] text-base">
                    {current.clientName}
                  </div>
                  <div className="text-xs text-[#E63946] font-bold uppercase tracking-wider">
                    {current.projectType} • {current.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">{current.date}</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Verified Client
                </span>
              </div>
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex gap-1.5">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-8 bg-[#E63946]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1d3557] transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1d3557] transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

