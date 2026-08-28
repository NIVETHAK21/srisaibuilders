import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ServicesPage } from './components/ServicesPage';
import { ExecutionFlowchart } from './components/ExecutionFlowchart';
import { ProjectsSection } from './components/ProjectsSection';
import { CostEstimatorSection } from './components/CostEstimatorSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { QuoteModal } from './components/QuoteModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services-page'>('home');
  const [selectedServiceIdForPage, setSelectedServiceIdForPage] = useState<string>('house-construction');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteInitialService, setQuoteInitialService] = useState<'construction' | 'interior' | 'renovation'>('construction');

  // Track active section on scroll when on home page
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'flowchart', 'projects', 'estimator', 'why-us', 'testimonials', 'contact'];
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
  }, [currentPage]);

  const navigateToSection = (sectionId: string) => {
    if (sectionId === 'services-page') {
      setCurrentPage('services-page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToServicesPage = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceIdForPage(serviceId);
    }
    setCurrentPage('services-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openQuoteModal = (service: 'construction' | 'interior' | 'renovation' = 'construction') => {
    setQuoteInitialService(service);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1d3557] flex flex-col font-sans selection:bg-[#FFC107] selection:text-[#1d3557]">
      {/* Sticky Header & Navbar */}
      <Navbar
        activeSection={currentPage === 'services-page' ? 'services' : activeSection}
        onNavigate={(id) => {
          if (id === 'services') {
            navigateToServicesPage();
          } else {
            navigateToSection(id);
          }
        }}
        onOpenQuoteModal={() => openQuoteModal('construction')}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'services-page' ? (
          /* Dedicated Services Page with all 8 services from poster */
          <ServicesPage
            initialServiceId={selectedServiceIdForPage}
            onBackToHome={backToHome}
            onOpenQuoteModal={(service) => openQuoteModal(service || 'construction')}
          />
        ) : (
          /* Landing Home Page with All Sections */
          <>
            {/* 1. Hero with 3D Architectural Scene */}
            <Hero
              onOpenQuoteModal={() => openQuoteModal('construction')}
              onExploreProjects={() => navigateToSection('projects')}
              onExploreServices={() => navigateToServicesPage()}
            />

            {/* 2. Detailed About & Founder 12-Year Career Stepper */}
            <AboutSection
              onOpenQuoteModal={() => openQuoteModal('construction')}
              onContactClick={() => navigateToSection('contact')}
            />

            {/* 3. Detailed Services (8 Core Civil & Interior Services with Poster Offer) */}
            <ServicesSection
              onOpenQuoteModal={(service) => openQuoteModal(service || 'construction')}
              onNavigateToServicesPage={navigateToServicesPage}
            />

            {/* 4. Interactive Execution Flowchart Roadmap */}
            <ExecutionFlowchart
              onOpenQuoteModal={() => openQuoteModal('construction')}
            />

            {/* 5. Filterable Project Portfolio & Lightbox */}
            <ProjectsSection
              onOpenQuoteModal={() => openQuoteModal('construction')}
            />

            {/* 6. Interactive Cost & Estimate Calculator */}
            <CostEstimatorSection
              onOpenQuoteModal={() => openQuoteModal('construction')}
            />

            {/* 7. Why Choose Pranav Sai Builders */}
            <WhyChooseUs
              onOpenQuoteModal={() => openQuoteModal('construction')}
            />

            {/* 8. Client Testimonials Carousel */}
            <TestimonialsSection />

            {/* 9. Contact Section & Map */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(id) => {
          if (id === 'services') {
            navigateToServicesPage();
          } else {
            navigateToSection(id);
          }
        }}
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
