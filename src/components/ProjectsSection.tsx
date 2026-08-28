import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/companyData';
import { ProjectItem } from '../types';

interface ProjectsSectionProps {
  onOpenQuoteModal: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenQuoteModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'interior' | 'renovation'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const projectsScrollRef = React.useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Projects (85+)' },
    { id: 'residential', label: 'Residential Villas' },
    { id: 'interior', label: 'Interior Fit-Outs' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'renovation', label: 'Renovation & Extensions' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  const handleProjectsScroll = () => {
    if (projectsScrollRef.current) {
      const { scrollLeft, clientWidth } = projectsScrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveProjectIndex(Math.min(Math.max(index, 0), filteredProjects.length - 1));
      }
    }
  };

  const scrollProjectToIndex = (index: number) => {
    if (projectsScrollRef.current) {
      const { clientWidth } = projectsScrollRef.current;
      projectsScrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      });
      setActiveProjectIndex(index);
    }
  };

  const openLightbox = (project: ProjectItem) => {
    setSelectedProject(project);
    setGalleryIndex(0);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setGalleryIndex((prev) => (prev + 1) % selectedProject.galleryImages.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setGalleryIndex((prev) => (prev - 1 + selectedProject.galleryImages.length) % selectedProject.galleryImages.length);
  };

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-28 bg-[#f8f9fa] text-[#1d3557] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6 sm:pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>Engineered Architectural Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
              Featured Projects Across Chennai
            </h2>
            <p className="text-slate-600 text-xs sm:text-base">
              Explore our recent residential villas, luxury interior transformations, and structural commercial landmarks.
            </p>

            {/* Mobile Hand Swipe Indicator */}
            <div className="flex md:hidden items-center gap-2 text-[11px] font-bold text-[#E63946] bg-red-50/90 py-1 px-3 rounded-full border border-red-200 w-fit animate-pulse">
              <span>👈 Swipe sideways to view all projects 👉</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded shadow-md transition-all cursor-pointer font-heading"
            >
              <span>Build Something Similar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider pr-2 hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id as any);
                setActiveProjectIndex(0);
                if (projectsScrollRef.current) {
                  projectsScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#1d3557] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:text-[#1d3557] border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filterable Projects (Grid on Desktop, Natural 1-Photo Touch Swipe on Mobile) */}
        <div className="space-y-4">
          <div
            ref={projectsScrollRef}
            onScroll={handleProjectsScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-none pb-4 pt-1"
          >
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openLightbox(project)}
                className="w-full min-w-full sm:min-w-0 md:min-w-0 snap-start flex-shrink-0 group rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-md hover:border-[#E63946] transition-all duration-300 cursor-pointer flex flex-col justify-between box-pop interactive-card"
              >
                {/* Card Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200 text-[11px] font-bold uppercase tracking-wider text-[#1d3557] shadow-sm">
                    {project.categoryLabel}
                  </div>

                  {/* Completion Year */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#1d3557]/90 backdrop-blur-md rounded-lg border border-white/10 text-[11px] font-mono text-white flex items-center gap-1 shadow-sm">
                    <Calendar className="w-3 h-3 text-[#FFC107]" />
                    {project.completionYear}
                  </div>

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-[#1d3557]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                    <Maximize2 className="w-4 h-4 text-[#FFC107]" />
                    <span>Click for Full Gallery & Specs</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#E63946]" />
                      <span>{project.location}</span>
                      <span>•</span>
                      <span className="text-[#1d3557] font-mono font-bold">{project.areaSqFt}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-heading text-[#1d3557] group-hover:text-[#E63946] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Key feature pills */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {project.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-50 text-[10px] font-medium text-slate-700 border border-slate-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Pagination Dots Indicator */}
          {filteredProjects.length > 1 && (
            <div className="flex md:hidden items-center justify-center gap-2 pt-1">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollProjectToIndex(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeProjectIndex === i
                      ? 'w-6 bg-[#E63946]'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Lightbox Image Viewer Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1d3557]/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-xs font-bold text-[#E63946] uppercase tracking-wider">
                  {selectedProject.categoryLabel} • {selectedProject.location}
                </span>
                <h3 className="text-2xl font-bold font-heading text-[#1d3557] mt-0.5">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                onClick={closeLightbox}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Gallery Image Display with Prev/Next Controls */}
            <div className="relative aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden border border-slate-200">
              <img
                src={selectedProject.galleryImages[galleryIndex] || selectedProject.image}
                alt={`${selectedProject.title} view ${galleryIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {selectedProject.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1d3557]/90 text-white hover:bg-[#E63946] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1d3557]/90 text-white hover:bg-[#E63946] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image counter indicator */}
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-[#1d3557]/90 text-xs text-white rounded-lg backdrop-blur-md font-mono">
                Photo {galleryIndex + 1} of {selectedProject.galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {selectedProject.galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProject.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 cursor-pointer ${
                      galleryIndex === idx ? 'border-[#E63946]' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Project Specifications & Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Total Built-Up Area</span>
                <strong className="text-[#1d3557] font-mono text-sm">{selectedProject.areaSqFt}</strong>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Project Location</span>
                <strong className="text-[#1d3557] text-sm">{selectedProject.location}</strong>
              </div>
              <div>
                <span className="text-slate-500 uppercase tracking-wider text-[10px] font-bold block">Year of Handover</span>
                <strong className="text-[#E63946] font-mono text-sm">{selectedProject.completionYear}</strong>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              {selectedProject.description}
            </p>

            {selectedProject.testimonialSnippet && (
              <div className="p-4 rounded-xl bg-[#f1faee] border-l-4 border-[#FFC107] text-xs italic text-[#1d3557]">
                {selectedProject.testimonialSnippet}
              </div>
            )}

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
              <button
                onClick={() => {
                  closeLightbox();
                  onOpenQuoteModal();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded font-heading"
              >
                Inquire About This Elevation / Floor Plan
              </button>

              <button
                onClick={closeLightbox}
                className="text-xs font-bold text-slate-500 hover:text-[#1d3557] uppercase tracking-wider cursor-pointer"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

