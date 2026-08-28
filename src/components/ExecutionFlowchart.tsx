import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  HardHat, 
  Compass, 
  Layers, 
  Hammer, 
  Sparkles, 
  Key, 
  ShieldCheck, 
  Clock, 
  FileCheck, 
  Workflow, 
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ExecutionStep {
  phase: number;
  title: string;
  subtitle: string;
  duration: string;
  icon: any;
  color: string;
  deliverables: string[];
  materials: string[];
  engineerNote: string;
}

export const ExecutionFlowchart: React.FC<{ onOpenQuoteModal: () => void }> = ({ onOpenQuoteModal }) => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  const steps: ExecutionStep[] = [
    {
      phase: 1,
      title: 'Geotechnical Soil Study & Bhoomi Pooja',
      subtitle: 'Soil SBC Testing & Sacred Foundation Consecration',
      duration: 'Week 1 – 2',
      icon: HardHat,
      color: '#FFC107',
      deliverables: [
        'Rotary core drilling & Standard Penetration Test (SPT)',
        'Certified Safe Bearing Capacity (SBC) lab test report',
        'Total Station site boundary survey & level benchmark',
        'Auspicious North-East (Eshanya) corner Bhoomi Pooja ceremonial layout',
      ],
      materials: ['Certified Geotechnical Borehole Samples', 'Boundary Level Stakes', 'Ceremonial Granite Base'],
      engineerNote: 'Er. Manikandan personally verifies the soil test report to customize foundation depth and steel rebar specifications.',
    },
    {
      phase: 2,
      title: 'Architectural Blueprint & Municipal Sanction',
      subtitle: '2D Vaastu Layouts, 3D Elevation & CMDA Approval',
      duration: 'Week 2 – 4',
      icon: Compass,
      color: '#457b9d',
      deliverables: [
        '100% Vaastu Shastra compliant 2D room layouts',
        'Photorealistic 3D exterior day and night elevation renders',
        'Structural column, beam, and rebar scheduling blueprints',
        'CMDA / Greater Chennai Corporation / DTCP plan permit clearance',
      ],
      materials: ['Structural CAD Drawings', 'High-Res 3D Architectural Renders', 'Municipal Permit Documents'],
      engineerNote: 'Full transparent 3D visualization allows clients to fine-tune room dimensions and window openings before ground construction begins.',
    },
    {
      phase: 3,
      title: 'Substructure & RCC Foundation Casting',
      subtitle: 'Excavation, Anti-Termite Network & Plinth Beam',
      duration: 'Week 4 – 8',
      icon: Layers,
      color: '#E63946',
      deliverables: [
        'Machine excavation & PCC bed laying (1:4:8)',
        'Perimeter sub-soil anti-termite chemical piping installation',
        'Isolated / Raft RCC footing casting with cover blocks',
        'Plinth beam casting & quarry dust compacted backfilling',
      ],
      materials: ['UltraTech / Coromandel 53 Grade Cement', 'Tata Tiscon / JSW Fe550D TMT Steel', 'Anti-Termite Emulsion'],
      engineerNote: 'Anti-termite piping embedded around foundation perimeter protects the woodwork for generations.',
    },
    {
      phase: 4,
      title: 'Superstructure, Masonry & MEP Conduits',
      subtitle: 'Framed Columns, Brickwork, Concealed Plumbing & Electrical',
      duration: 'Week 8 – 16',
      icon: Hammer,
      color: '#1d3557',
      deliverables: [
        'Framed RCC columns and roof slab shuttering & casting',
        'High-density wire-cut/fly-ash brick masonry with river sand mortar',
        'Concealed CPVC/UPVC Ashirvad plumbing lines with pressure testing',
        'Finolex FRLS electrical conduits and metal switch boxes',
      ],
      materials: ['High-Strength 53G Cement', 'Ashirvad CPVC Pipes', 'Finolex FRLS Fire-Resistant Wires', 'River Sand'],
      engineerNote: 'Slab concrete is cured continuously for 21 days with water ponding to achieve maximum 28-day compressive strength.',
    },
    {
      phase: 5,
      title: 'Waterproofing, Modular Interiors & Finishes',
      subtitle: 'Terrace Membrane, BWP 710 Kitchen & Vitrified Tiles',
      duration: 'Week 16 – 22',
      icon: Sparkles,
      color: '#10b981',
      deliverables: [
        'Multi-layer Dr. Fixit crystalline terrace waterproofing coating',
        'Factory-finished 100% BWP 710 Marine Ply modular kitchen with soft-close tandem drawers',
        'Aluminum rolling shutter appliance garage & pull-out wicker baskets',
        '4x2 Glazed Vitrified tile flooring, teak wood main doors, and Asian Paints Royale finish',
      ],
      materials: ['100% BWP Grade 710 Marine Plywood', 'Hettich Soft-Close Hardware', 'Kajaria/Somany Tiles', 'Asian Paints Royale'],
      engineerNote: 'All woodwork is factory edge-banded with PUR adhesives to ensure zero moisture swelling in humid Chennai weather.',
    },
    {
      phase: 6,
      title: '50-Point Engineering Audit & Grand Handover',
      subtitle: 'Pressure Testing, Deep Cleaning & 10-Year Warranty',
      duration: 'Week 22 – 24',
      icon: Key,
      color: '#FFC107',
      deliverables: [
        'Comprehensive 50-point QA/QC structural, electrical, and plumbing inspection',
        '48-hour terrace ponding water test verification certificate',
        'Complete industrial deep cleaning and polishing of flooring',
        'Handover of structural stability certificate, warranty folder, and keys for Grihapravesam',
      ],
      materials: ['10-Year Structural Warranty Card', 'As-Built CAD Drawings', 'Grihapravesam Key Set'],
      engineerNote: 'Er. Manikandan conducts the final walkthrough with the family to verify every single fitting before the auspicious housewarming.',
    },
  ];

  const currentStep = steps.find((s) => s.phase === selectedPhase) || steps[0];

  const togglePhase = (phaseNum: number) => {
    if (selectedPhase === phaseNum) {
      // Keep selected or toggle
      setSelectedPhase(phaseNum);
    } else {
      setSelectedPhase(phaseNum);
    }
  };

  return (
    <section id="flowchart" className="py-16 sm:py-20 lg:py-28 bg-white text-[#1d3557] relative overflow-hidden scroll-mt-24 border-y border-slate-200">
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 pattern-dots-dark opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 lg:space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm box-pop">
            <Workflow className="w-3.5 h-3.5" />
            <span>Interactive Project Execution Flowchart</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Step-by-Step Construction & Handover Flowchart
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg">
            From initial geotechnical soil testing and auspicious Bhoomi Pooja to high-precision RCC casting and turnkey key handover.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW: ACCORDION STYLE (Expands directly underneath tapped phase) */}
        {/* ========================================================================= */}
        <div className="block lg:hidden space-y-3.5">
          {steps.map((step) => {
            const isSelected = selectedPhase === step.phase;
            const Icon = step.icon;

            return (
              <div 
                key={step.phase}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isSelected 
                    ? 'border-[#FFC107] bg-[#14253e] text-white shadow-xl ring-2 ring-[#FFC107]/30' 
                    : 'border-slate-200 bg-[#f8f9fa] text-[#1d3557] hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Header / Clickable Phase Header */}
                <button
                  type="button"
                  onClick={() => togglePhase(step.phase)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#FFC107] text-[#1d3557]'
                          : 'bg-white text-[#1d3557] border border-slate-200'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9.5px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/20 text-[#FFC107]' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Phase 0{step.phase}
                        </span>
                        <span className={`text-[10px] font-bold ${
                          isSelected ? 'text-[#FFC107]' : 'text-[#457b9d]'
                        }`}>
                          • {step.duration}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold font-heading mt-0.5 ${
                        isSelected ? 'text-white' : 'text-[#1d3557]'
                      }`}>
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/15 text-[#FFC107]' : 'bg-slate-200/60 text-slate-600'
                  }`}>
                    {isSelected ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Direct Inline Accordion Content (Reveals immediately below this phase) */}
                {isSelected && (
                  <div className="px-4 pb-5 pt-2 border-t border-white/10 space-y-4 animate-in fade-in-50 duration-200">
                    <p className="text-xs text-slate-300">
                      {step.subtitle}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#FFC107] flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Deliverables & Quality Milestones:</span>
                      </div>
                      <div className="space-y-2">
                        {step.deliverables.map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2 text-xs text-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC107] flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-300 block">
                        Specified Materials:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {step.materials.map((mat, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-md bg-white/10 text-[11px] text-[#a8dadc]">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Engineer's Note */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-[#FFC107] space-y-1">
                      <div className="text-[10.5px] font-bold text-[#FFC107] uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Er. Manikandan's Direct Supervision:</span>
                      </div>
                      <p className="text-xs text-slate-200 italic leading-relaxed">
                        "{step.engineerNote}"
                      </p>
                    </div>

                    {/* Milestone CTA Button */}
                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="w-full py-3 bg-[#E63946] hover:bg-[#d90429] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer font-heading active:scale-95"
                    >
                      <span>Get Estimate for Phase 0{step.phase}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW: HORIZONTAL STEPPER WITH DETAILED SHOWCASE PANEL */}
        {/* ========================================================================= */}
        <div className="hidden lg:block space-y-8">
          {/* Visual Flowchart Stepper Nodes */}
          <div className="relative">
            {/* Horizontal Connection Line */}
            <div className="absolute top-1/2 left-10 right-10 h-1 bg-gradient-to-r from-[#FFC107] via-[#E63946] to-[#10b981] -translate-y-1/2 z-0" />

            {/* Stepper Nodes Grid */}
            <div className="grid grid-cols-6 gap-3.5 relative z-10">
              {steps.map((step) => {
                const isSelected = selectedPhase === step.phase;
                const Icon = step.icon;

                return (
                  <button
                    key={step.phase}
                    onClick={() => setSelectedPhase(step.phase)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative box-pop interactive-card flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1d3557] text-white border-2 border-[#FFC107] shadow-xl scale-105 ring-4 ring-[#FFC107]/20'
                        : 'bg-[#f8f9fa] text-[#1d3557] border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top Row: Badge & Duration */}
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${
                            isSelected
                              ? 'bg-[#FFC107] text-[#1d3557]'
                              : 'bg-white text-[#1d3557] border border-slate-200'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-white/15 text-[#FFC107]' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Phase 0{step.phase}
                        </span>
                      </div>

                      <h4 className={`text-sm font-bold font-heading mb-1 line-clamp-2 ${
                        isSelected ? 'text-white' : 'text-[#1d3557]'
                      }`}>
                        {step.title}
                      </h4>
                      <p className={`text-[11px] line-clamp-2 ${
                        isSelected ? 'text-slate-200' : 'text-slate-500'
                      }`}>
                        {step.subtitle}
                      </p>
                    </div>

                    <div className={`mt-4 pt-2.5 border-t text-[10px] font-bold uppercase tracking-wider flex items-center justify-between ${
                      isSelected ? 'border-white/15 text-[#FFC107]' : 'border-slate-200 text-[#457b9d]'
                    }`}>
                      <span>{step.duration}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Deep-Dive Showcase Card (Desktop) */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1d3557] to-[#14253e] text-white p-6 sm:p-8 lg:p-10 border border-[#274773] shadow-2xl space-y-8 box-pop interactive-card">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 pb-6 border-b border-white/15">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFC107] text-[#1d3557] flex items-center justify-center shadow-lg flex-shrink-0">
                  {React.createElement(currentStep.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider flex items-center gap-2">
                    <span>Phase {currentStep.phase} of {steps.length}</span>
                    <span>•</span>
                    <span>Estimated Duration: {currentStep.duration}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-white mt-1">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-0.5">
                    {currentStep.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3 bg-[#E63946] hover:bg-[#d90429] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-heading w-fit"
              >
                <span>Get Estimate for this Milestone</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Column: Deliverables Checklist */}
              <div className="col-span-7 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#FFC107] flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  <span>Key Execution Deliverables & Quality Gates</span>
                </h4>

                <div className="space-y-3">
                  {currentStep.deliverables.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#FFC107] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Materials & Engineer Note */}
              <div className="col-span-5 space-y-6">
                {/* Materials */}
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Specified Certified Materials:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.materials.map((mat, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-xs text-[#a8dadc] font-medium">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Er. Manikandan's Note */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-[#FFC107] space-y-2">
                  <div className="text-xs font-bold text-[#FFC107] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FFC107]" />
                    <span>Chief Engineer's Direct Quality Supervision:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                    "{currentStep.engineerNote}"
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

