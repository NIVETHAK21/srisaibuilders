import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CostEstimatorSection } from './components/CostEstimatorSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteInitialService, setQuoteInitialService] = useState<'construction' | 'interior' | 'renovation'>('construction');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'projects', 'estimator', 'why-us', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openQuoteModal = (service: 'construction' | 'interior' | 'renovation' = 'construction') => {
    setQuoteInitialService(service);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1d3557] flex flex-col font-sans selection:bg-[#FFC107] selection:text-[#1d3557]">
      {/* Sticky Header & Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onOpenQuoteModal={() => openQuoteModal('construction')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with 3D Architectural Scene */}
        <Hero
          onOpenQuoteModal={() => openQuoteModal('construction')}
          onExploreProjects={() => navigateToSection('projects')}
          onExploreServices={() => navigateToSection('services')}
        />

        {/* 2. Detailed About & Founder 12-Year Career Stepper */}
        <AboutSection
          onOpenQuoteModal={() => openQuoteModal('construction')}
          onContactClick={() => navigateToSection('contact')}
        />

        {/* 3. Detailed Services (Construction, Interior, Renovation) */}
        <ServicesSection
          onOpenQuoteModal={(service) => openQuoteModal(service || 'construction')}
        />

        {/* 4. Filterable Project Portfolio & Lightbox */}
        <ProjectsSection
          onOpenQuoteModal={() => openQuoteModal('construction')}
        />

        {/* 5. Interactive Cost & Estimate Calculator */}
        <CostEstimatorSection
          onOpenQuoteModal={() => openQuoteModal('construction')}
        />

        {/* 6. Why Choose Pranav Sai Builders */}
        <WhyChooseUs
          onOpenQuoteModal={() => openQuoteModal('construction')}
        />

        {/* 7. Client Testimonials Carousel */}
        <TestimonialsSection />

        {/* 8. Contact Section & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateToSection}
        onOpenQuoteModal={() => openQuoteModal('construction')}
      />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions
        onOpenQuoteModal={() => openQuoteModal('construction')}
      />

      {/* Global Instant Quote & Estimator Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialService={quoteInitialService}
      />
    </div>
  );
}
