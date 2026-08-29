import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, MessageSquareHeart, CheckCircle2, Sparkles, MoveHorizontal } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/companyData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const startXRef = useRef<number>(0);
  const currentXRef = useRef<number>(0);

  useEffect(() => {
    if (!isAutoPlaying || isSwiping) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isSwiping]);

  // Touch Swipe Event Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    setIsSwiping(true);
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    // Cap visual drag offset for natural rubber-band feel
    setDragOffset(Math.max(Math.min(diff, 120), -120));
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const diff = currentXRef.current - startXRef.current;
    const threshold = 45; // Minimum px for swipe detection

    if (diff < -threshold) {
      // Swiped Left -> Next
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    } else if (diff > threshold) {
      // Swiped Right -> Previous
      setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
    }

    setDragOffset(0);
    setIsSwiping(false);
  };

  // Mouse Drag Handlers for Desktop Touch/Drag Experience
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsAutoPlaying(false);
    setIsSwiping(true);
    startXRef.current = e.clientX;
    currentXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSwiping) return;
    currentXRef.current = e.clientX;
    const diff = currentXRef.current - startXRef.current;
    setDragOffset(Math.max(Math.min(diff, 120), -120));
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isSwiping) {
      handleTouchEnd();
    }
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-8 sm:py-10 lg:py-12 bg-[#f8f9fa] text-[#1d3557] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
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

          {/* Hand Swipe Visual Indicator */}
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E63946] bg-red-50/90 py-1.5 px-4 rounded-full border border-red-200 shadow-sm animate-pulse">
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span>👈 Swipe left or right with your hand to browse reviews 👉</span>
          </div>
        </div>

        {/* Hand Swipeable Testimonial Card Container */}
        <div className="max-w-4xl mx-auto">
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `translateX(${dragOffset}px)`,
              transition: isSwiping ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className={`relative rounded-3xl bg-white border-2 border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl space-y-6 touch-pan-y cursor-grab ${
              isSwiping ? 'cursor-grabbing scale-[0.99] border-[#E63946]/50 shadow-2xl' : 'hover:border-slate-300'
            }`}
          >
            
            <div className="flex justify-between items-start">
              <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-[#E63946] shadow-sm">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              {/* Star Rating & Review Count */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FFC107] text-[#FFC107]" />
                  ))}
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400">
                  Review {currentIndex + 1} of {TESTIMONIALS_DATA.length}
                </span>
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
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#FFC107] shadow-sm flex-shrink-0"
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

            {/* Swipe Pagination Dots Indicator (Clickable + Hand Swiped) */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-8 bg-[#E63946]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <span>Hand swipe active</span>
                <Sparkles className="w-3 h-3 text-[#FFC107]" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

