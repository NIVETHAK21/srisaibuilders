import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  Phone, 
  Send, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Home, 
  Hammer, 
  Palette, 
  Paintbrush, 
  Zap, 
  Droplet, 
  Layers, 
  LayoutGrid, 
  ShieldCheck,
  Compass,
  HardHat,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_DETAILS, POSTER_HIGHLIGHTS } from '../data/companyData';

interface CostEstimatorSectionProps {
  onOpenQuoteModal: (serviceId?: 'construction' | 'interior' | 'renovation') => void;
}

type EstimatorServiceId = 
  | 'house-construction'
  | 'renovation-remodeling'
  | 'interior-design'
  | 'painting-work'
  | 'electrical-work'
  | 'plumbing-work'
  | 'false-ceiling-pop'
  | 'tile-granite-solutions';

interface ServiceConfig {
  id: EstimatorServiceId;
  name: string;
  shortDesc: string;
  icon: string;
  defaultArea: number;
  minArea: number;
  maxArea: number;
  areaStep: number;
  unit: string;
  tiers: {
    id: 'standard' | 'premium' | 'luxury';
    name: string;
    ratePerUnit: number;
    recommended?: boolean;
    description: string;
    materials: string;
  }[];
  addons?: {
    id: string;
    name: string;
    cost: number;
    description: string;
  }[];
}

const ESTIMATOR_SERVICES_CONFIG: ServiceConfig[] = [
  {
    id: 'house-construction',
    name: 'House Construction',
    shortDesc: 'Turnkey building from foundation to handover',
    icon: 'Home',
    defaultArea: 1800,
    minArea: 600,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft',
    tiers: [
      {
        id: 'standard',
        name: 'Standard Package',
        ratePerUnit: 1950,
        description: 'Quality structural materials & standard branded fittings',
        materials: 'ARS 550D TMT, Coromandel 53G, 2x2 Vitrified Tiles, Anchor Roma Switches'
      },
      {
        id: 'premium',
        name: 'Signature All-Inclusive (Poster Special)',
        ratePerUnit: 2250,
        recommended: true,
        description: '100% turnkey with Free 3D Plan, Structural Drawing & Soil Test Report',
        materials: 'Tata Tiscon Fe550D, UltraTech 53G, 4x2 GVT Tiles, Jaquar Sanitary & CP fittings'
      },
      {
        id: 'luxury',
        name: 'Luxury Villa Package',
        ratePerUnit: 2850,
        description: 'Elite architecture, 1st quality teak wood & smart automation',
        materials: 'Jindal/Tata Steel, Italian Marble / Quartz, Teak Frames, Kohler / Grohe fixtures'
      }
    ],
    addons: [
      { id: 'modular-kitchen', name: 'Factory Modular Kitchen', cost: 185000, description: 'Marine BWP 710 Plywood with Hafele/Hettich Soft-close' },
      { id: '3d-elevation', name: 'Architectural 3D Facade Upgrade', cost: 35000, description: 'CNC Louvers, Exterior Texture & Warm Facade Lighting' },
      { id: 'solar-ready', name: 'Solar Ready Rooftop Conduit & Piping', cost: 25000, description: 'Heavy-duty rooftop electrical infrastructure' }
    ]
  },
  {
    id: 'renovation-remodeling',
    name: 'Renovation & Remodeling',
    shortDesc: 'Old to new home renewal & structural extensions',
    icon: 'Hammer',
    defaultArea: 1200,
    minArea: 300,
    maxArea: 4000,
    areaStep: 50,
    unit: 'Sq.Ft',
    tiers: [
      {
        id: 'standard',
        name: 'Cosmetic Refresh',
        ratePerUnit: 850,
        description: 'Surface refinishing, partial rewiring & aesthetic upgrades',
        materials: 'Surface plaster repair, premium wall painting, floor rejuvenation'
      },
      {
        id: 'premium',
        name: 'Complete Modernization',
        ratePerUnit: 1250,
        recommended: true,
        description: 'Full room layout restructuring, plumbing & electrical overhaul',
        materials: 'Wall demolition/relocation, brand new CPVC plumbing, modern floor tiling'
      },
      {
        id: 'luxury',
        name: 'Structural Jacketing & Floor Addition',
        ratePerUnit: 1750,
        description: 'Heavy structural retrofitting and new floor construction',
        materials: 'Micro-concrete column jacketing, slab addition, complete architectural facelift'
      }
    ]
  },
  {
    id: 'interior-design',
    name: 'Interior Design & Modular Kitchen',
    shortDesc: 'Stylish, smart & functional woodwork',
    icon: 'Palette',
    defaultArea: 1000,
    minArea: 300,
    maxArea: 3500,
    areaStep: 50,
    unit: 'Sq.Ft (Floor / Built Area)',
    tiers: [
      {
        id: 'standard',
        name: 'Essential Laminate Tier',
        ratePerUnit: 1250,
        description: 'IS-303 Commercial Plywood with 0.8mm high-gloss laminates',
        materials: 'Century/Greenply MR Plywood, Merino Laminates, Ebco Hardware'
      },
      {
        id: 'premium',
        name: 'Premium Acrylic & BWP 710',
        ratePerUnit: 1750,
        recommended: true,
        description: '100% Boiling Water Proof Marine Plywood with seamless Acrylic finish',
        materials: 'Century Club Prime BWP 710, 1.5mm Acrylic sheets, Hafele soft-close hardware'
      },
      {
        id: 'luxury',
        name: 'Luxury Veneer & Smart PU',
        ratePerUnit: 2400,
        description: 'Natural Italian veneers, PU matte coating & sensor lighting',
        materials: 'Natural Teak/Walnut Veneer, Blum Aventos lift-ups, smart LED sensor profiles'
      }
    ]
  },
  {
    id: 'painting-work',
    name: 'Painting Work & Textures',
    shortDesc: 'Perfect finish & lasting architectural coatings',
    icon: 'Paintbrush',
    defaultArea: 2500,
    minArea: 500,
    maxArea: 10000,
    areaStep: 100,
    unit: 'Sq.Ft (Wall Surface)',
    tiers: [
      {
        id: 'standard',
        name: 'Interior Tractor / Premium Emulsion',
        ratePerUnit: 26,
        description: '2 Coats Birla Opus/Asian Putty + 1 Primer + 2 Coats Emulsion',
        materials: 'Birla White Putty, Asian Paints Tractor Emulsion (2.5 yr warranty)'
      },
      {
        id: 'premium',
        name: 'Asian Paints Royale Luxury',
        ratePerUnit: 38,
        recommended: true,
        description: 'Silky smooth washable finish with anti-fungal Teflon protection',
        materials: 'Birla Wallseal, Asian Paints Royale Luxury Emulsion + 1 Designer Accent Wall'
      },
      {
        id: 'luxury',
        name: 'Royale Aspira & Exterior Protek',
        ratePerUnit: 52,
        description: '10-year exterior weather protection & metallic texture finishes',
        materials: 'Asian Paints Apex Ultima Protek (Exterior) / Royale Aspira (Interior)'
      }
    ]
  },
  {
    id: 'electrical-work',
    name: 'Electrical Work & Power Systems',
    shortDesc: 'Safe, certified concealed electrical solutions',
    icon: 'Zap',
    defaultArea: 1500,
    minArea: 500,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Built-Up Area',
    tiers: [
      {
        id: 'standard',
        name: 'Standard Concealed Wiring',
        ratePerUnit: 180,
        description: 'Concealed PVC conduit, FR wires and standard modular switches',
        materials: 'Finolex FR Copper Wires, Anchor Roma Modular Switches, Legrand MCB'
      },
      {
        id: 'premium',
        name: 'Heavy-Duty Safe Power Distribution',
        ratePerUnit: 240,
        recommended: true,
        description: 'Dedicated AC, Geyser & EV wiring with Schneider/Legrand protection',
        materials: 'Polycab FRLS-H Flame Retardant, Legrand Mylinc Switches, 3-Phase DB setup'
      },
      {
        id: 'luxury',
        name: 'Smart Automation Ready Infrastructure',
        ratePerUnit: 340,
        description: 'Smart Wi-Fi relays, CAT6 networking, surge suppressor & sensor pathways',
        materials: 'Schneider AvatarOn / Norisys Smart Switches, Polycab FRLS, CAT6 gigabit networking'
      }
    ]
  },
  {
    id: 'plumbing-work',
    name: 'Plumbing Work & Sanitary Solutions',
    shortDesc: 'Leak-proof, long-lasting piping & fittings',
    icon: 'Droplet',
    defaultArea: 1500,
    minArea: 500,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Built-Up Area',
    tiers: [
      {
        id: 'standard',
        name: 'Standard Plumbing Line',
        ratePerUnit: 120,
        description: 'CPVC internal hot/cold lines with standard sanitary fitting installation',
        materials: 'Astral CPVC/UPVC pipes, Supreme SWR drainage lines, Parryware fittings'
      },
      {
        id: 'premium',
        name: 'Pressure-Tested Jaquar Sanitary',
        ratePerUnit: 180,
        recommended: true,
        description: '10-bar pressure tested pipes, concealed diverters & overhead tank setup',
        materials: 'Ashirvad CPVC FlowGuard, Jaquar Concealed Wall Mixers, Hindware Italian Collection'
      },
      {
        id: 'luxury',
        name: 'Concealed Diverters & Luxury Grohe/Kohler',
        ratePerUnit: 260,
        description: 'Thermostatic diverters, water softeners & dual booster pump piping',
        materials: 'Geberit Concealed Cisterns, Kohler / Grohe Rain Showers, Astral Silencio Soundproof'
      }
    ]
  },
  {
    id: 'false-ceiling-pop',
    name: 'False Ceiling & POP Works',
    shortDesc: 'Flawless ceiling designs & ambient cove lighting',
    icon: 'Layers',
    defaultArea: 1000,
    minArea: 200,
    maxArea: 4000,
    areaStep: 50,
    unit: 'Sq.Ft Ceiling Area',
    tiers: [
      {
        id: 'standard',
        name: 'Saint-Gobain Gyproc Plain',
        ratePerUnit: 105,
        description: 'Clean uniform false ceiling with perimeter lighting cutouts',
        materials: 'Saint-Gobain 12.5mm Gyproc sheets, Ultra G.I Channel framing'
      },
      {
        id: 'premium',
        name: 'Designer Cove & Profile Lighting',
        ratePerUnit: 135,
        recommended: true,
        description: 'Multi-layer perimeter cove with warm ambient LED track channels',
        materials: 'Gyproc Elite sheets, heavy G.I sections, LED profile aluminum channels'
      },
      {
        id: 'luxury',
        name: 'CNC Hybrid & Wooden Rafter Ceiling',
        ratePerUnit: 185,
        description: 'Combination of gypsum, teak finish rafters and backlit acrylic CNC patterns',
        materials: 'Acoustic Armstrong / Gyproc, WPC wooden rafters, CNC precision patterns'
      }
    ]
  },
  {
    id: 'tile-granite-solutions',
    name: 'Tile & Granite Solutions',
    shortDesc: 'Precision laying & mirror polish finish',
    icon: 'LayoutGrid',
    defaultArea: 1500,
    minArea: 300,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Floor / Wall Area',
    tiers: [
      {
        id: 'standard',
        name: 'Vitrified Tile Installation',
        ratePerUnit: 45,
        description: '2x2 or 4x2 Vitrified tile laying with polymer modified adhesive',
        materials: 'Laticrete / Roff adhesive fixing, epoxy spacer grouting, leveling clips'
      },
      {
        id: 'premium',
        name: 'Large GVT & Granite Fixing',
        ratePerUnit: 65,
        recommended: true,
        description: '4x2 & 6x4 Glazed Vitrified Tiles, staircase full-bullnose black granite',
        materials: 'Roff Powerfix, Zero-joint leveling clips, Chamfered & polished Granite borders'
      },
      {
        id: 'luxury',
        name: 'Italian Marble Laying & Diamond Polish',
        ratePerUnit: 110,
        description: 'Precision Italian marble laying with multi-stage diamond mirror polish',
        materials: 'White cement slurry backing, epoxy grout matching, 8-grade diamond mirror polish'
      }
    ]
  }
];

export const CostEstimatorSection: React.FC<CostEstimatorSectionProps> = ({ onOpenQuoteModal }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<EstimatorServiceId>('house-construction');
  const [selectedTier, setSelectedTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [area, setArea] = useState<number>(1800);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['modular-kitchen', '3d-elevation']);

  const currentService = ESTIMATOR_SERVICES_CONFIG.find(s => s.id === selectedServiceId) || ESTIMATOR_SERVICES_CONFIG[0];
  const activeTierConfig = currentService.tiers.find(t => t.id === selectedTier) || currentService.tiers[1];

  const handleServiceChange = (serviceId: EstimatorServiceId) => {
    setSelectedServiceId(serviceId);
    const newService = ESTIMATOR_SERVICES_CONFIG.find(s => s.id === serviceId);
    if (newService) {
      setArea(newService.defaultArea);
      setSelectedTier('premium');
      if (newService.addons && newService.addons.length > 0) {
        setSelectedAddons([newService.addons[0].id]);
      } else {
        setSelectedAddons([]);
      }
    }
  };

  const toggleAddon = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const baseCost = area * activeTierConfig.ratePerUnit;
  
  const addonsCost = (currentService.addons || [])
    .filter(a => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.cost, 0);

  const grandTotal = baseCost + addonsCost;

  const handleWhatsAppSend = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E63946', '#FFC107', '#1d3557'],
    });

    const text = encodeURIComponent(
      `Hello Er. Manikandan (Pranav Sai Builders),\n\nI calculated an estimate on your website for:\n` +
      `• Service: ${currentService.name}\n` +
      `• Package Tier: ${activeTierConfig.name} (@ ₹${activeTierConfig.ratePerUnit}/${currentService.unit})\n` +
      `• Scope / Area: ${area.toLocaleString('en-IN')} ${currentService.unit}\n` +
      (selectedAddons.length > 0 ? `• Add-ons: ${selectedAddons.join(', ')}\n` : '') +
      `• Estimated Total: ₹${grandTotal.toLocaleString('en-IN')}\n\n` +
      `Please connect with me for a site visit and detailed BOQ.`
    );
    window.open(`https://wa.me/91${COMPANY_DETAILS.phones[0]}?text=${text}`, '_blank');
  };

  const getQuoteCategory = (serviceId: string): 'construction' | 'interior' | 'renovation' => {
    if (serviceId === 'house-construction') return 'construction';
    if (serviceId === 'renovation-remodeling') return 'renovation';
    return 'interior';
  };

  const getServiceIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Home': return <Home className={className} />;
      case 'Hammer': return <Hammer className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Paintbrush': return <Paintbrush className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Droplet': return <Droplet className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'LayoutGrid': return <LayoutGrid className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  return (
    <section id="estimator" className="py-8 sm:py-10 lg:py-12 bg-white text-[#1d3557] relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator (All 8 Services)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Transparent Civil & Interior Estimator
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Choose from all 8 services to calculate transparent turnkey budgets in Chennai with live rate cards.
          </p>
        </div>

        {/* Poster Highlight Banner inside Estimator */}
        <div className="rounded-2xl bg-[#14253e] text-white p-5 sm:p-6 border-2 border-[#FFC107] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#E63946] text-white flex items-center justify-center flex-shrink-0 font-bold shadow">
              <Sparkles className="w-6 h-6 text-[#FFC107]" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#FFC107]">
                Official Poster Package
              </div>
              <div className="text-lg sm:text-xl font-black font-heading text-white">
                Construction Cost @ Just <span className="text-[#FFC107] font-mono">{POSTER_HIGHLIGHTS.packagePrice}</span> / Sq.Ft
              </div>
              <div className="text-xs text-slate-300">
                Includes Free 3D Plan, Structural Drawing & Soil Test Report.
              </div>
            </div>
          </div>

          <button
            onClick={() => handleServiceChange('house-construction')}
            className="px-5 py-2.5 rounded-xl bg-[#FFC107] hover:bg-[#ffb300] text-[#14253e] font-black text-xs uppercase tracking-wider shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer font-heading whitespace-nowrap shrink-0"
          >
            Calculate ₹2,250 Construction
          </button>
        </div>

        {/* Main Estimator Container */}
        <div className="rounded-3xl bg-[#f8f9fa] border border-slate-200 p-6 sm:p-10 shadow-xl space-y-10">
          
          {/* Step 1: 8 Services Tab Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Select from 8 Services:</span>
              </label>
              <span className="text-xs font-bold text-[#E63946]">
                {currentService.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {ESTIMATOR_SERVICES_CONFIG.map((s, idx) => {
                const isSelected = selectedServiceId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleServiceChange(s.id)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center justify-between gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#14253e] border-[#FFC107] text-white shadow-lg ring-2 ring-[#FFC107]/40 scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-[#E63946] text-white' : 'bg-slate-100 text-[#1d3557]'
                    }`}>
                      {getServiceIcon(s.icon, "w-4 h-4")}
                    </div>
                    <div className="text-[11px] font-bold leading-tight line-clamp-2">
                      {s.name}
                    </div>
                    <span className={`text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      isSelected ? 'bg-[#FFC107] text-[#14253e]' : 'bg-slate-100 text-slate-500'
                    }`}>
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Quality / Specification Tier */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Select Specification Tier for {currentService.name}:</span>
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentService.tiers.map((t) => {
                const isSelected = selectedTier === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTier(t.id)}
                    className={`p-5 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-2 border-[#E63946] shadow-md ring-2 ring-red-100'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {t.recommended && (
                      <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-[#FFC107] text-[#14253e] text-[9px] font-black uppercase tracking-wider rounded-full shadow-sm">
                        Recommended
                      </span>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold font-heading text-sm text-[#1d3557]">
                          {t.name}
                        </span>
                      </div>
                      <div className="text-2xl font-black text-[#E63946] font-mono">
                        ₹{t.ratePerUnit.toLocaleString('en-IN')} <span className="text-xs font-semibold text-slate-500">/ {currentService.unit}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {t.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                      <strong className="text-slate-700">Specs:</strong> {t.materials}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Area Slider & Optional Add-ons */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Area Slider (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>Set Quantity / Area:</span>
                </label>
                <div className="text-xl font-black text-[#E63946] font-mono">
                  {area.toLocaleString('en-IN')} <span className="text-xs text-slate-600 font-sans">{currentService.unit}</span>
                </div>
              </div>

              <input
                type="range"
                min={currentService.minArea}
                max={currentService.maxArea}
                step={currentService.areaStep}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#E63946]"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Min: {currentService.minArea} {currentService.unit}</span>
                <span>Avg: {currentService.defaultArea} {currentService.unit}</span>
                <span>Max: {currentService.maxArea} {currentService.unit}</span>
              </div>
            </div>

            {/* Optional Addons (5 cols) */}
            {currentService.addons && currentService.addons.length > 0 ? (
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] block">
                  Optional Value Add-ons:
                </label>
                <div className="space-y-2">
                  {currentService.addons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-red-50/60 border-[#E63946] text-[#1d3557]'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                          isChecked ? 'bg-[#E63946] border-[#E63946] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span>{addon.name}</span>
                            <span className="font-mono text-[#E63946]">+₹{addon.cost.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-[10.5px] text-slate-500 mt-0.5">{addon.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-8 h-8 text-[#E63946] flex-shrink-0" />
                <div>
                  <div className="font-bold text-[#1d3557]">Direct Engineering Supervision Included</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Every project is personally managed by Er. D. Manikandan, B.Tech (Civil) with zero subcontracting.
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Results Summary Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#14253e] text-white border-2 border-[#FFC107] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-1.5 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFC107] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Estimated Turnkey Budget ({activeTierConfig.name})</span>
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white font-mono tracking-tight">
                ₹{grandTotal.toLocaleString('en-IN')}*
              </div>
              <p className="text-xs text-slate-300 max-w-xl">
                Calculated at ₹{activeTierConfig.ratePerUnit}/{currentService.unit} for {area.toLocaleString('en-IN')} {currentService.unit}
                {addonsCost > 0 ? ` + ₹${addonsCost.toLocaleString('en-IN')} in selected add-ons` : ''}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto relative z-10">
              <button
                onClick={() => onOpenQuoteModal(getQuoteCategory(currentService.id))}
                className="px-6 py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 font-heading text-center cursor-pointer whitespace-nowrap"
              >
                Request Free Site Inspection
              </button>
              <button
                onClick={handleWhatsAppSend}
                className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 text-center cursor-pointer whitespace-nowrap"
              >
                Send to Er. Mani on WhatsApp
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
