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
  Info,
  Trees,
  Handshake,
  FlaskConical,
  Check,
  CheckSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_DETAILS, POSTER_HIGHLIGHTS } from '../data/companyData';

interface CostEstimatorSectionProps {
  onOpenQuoteModal: (serviceId?: 'construction' | 'interior' | 'renovation') => void;
}

export type EstimatorServiceId = 
  | 'house-construction'
  | 'renovation-remodeling'
  | 'interior-design'
  | 'painting-works'
  | 'electrical-works'
  | 'plumbing-works'
  | '3d-plan-drawing'
  | 'structural-drawing'
  | 'soil-test'
  | 'landscape-design'
  | 'properties-buying-selling'
  | 'civil-construction';

export interface ServiceConfig {
  id: EstimatorServiceId;
  name: string;
  shortDesc: string;
  icon: string;
  defaultArea: number;
  minArea: number;
  maxArea: number;
  areaStep: number;
  unit: string;
  deliverables: string[];
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

export const ESTIMATOR_SERVICES_CONFIG: ServiceConfig[] = [
  {
    id: 'house-construction',
    name: 'House Construction',
    shortDesc: 'Turnkey building from foundation to handover (@ ₹2250/sq.ft)',
    icon: 'Home',
    defaultArea: 1800,
    minArea: 600,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft',
    deliverables: [
      'Free 3D Architectural Plan & Elevation',
      'IS 456 Structural Drawings & Bar Bending Schedule',
      'Free Soil Test & Safe Bearing Capacity Report',
      'Tata Tiscon Fe550D TMT Steel & UltraTech 53G Cement',
      'Teak wood main entrance frame & designer fixtures'
    ],
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
    deliverables: [
      'Structural safety inspection & load audit',
      'Wall demolition, layout restructuring & beam reinforcement',
      'Modern electrical rewiring & plumbing revamp',
      'Bathroom remodeling & anti-skid tiling',
      'Anti-damp wall treatment & premium painting'
    ],
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
    ],
    addons: [
      { id: 'waterproofing', name: 'Terrace & Wet Area Waterproofing', cost: 28000, description: 'Dr. Fixit 2K Polymer coating with 5-year warranty' },
      { id: 'tile-overlay', name: 'Complete Floor Tile Chipping & Relay', cost: 45000, description: 'Direct vitrified tile overlay with polymer adhesive' }
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
    unit: 'Sq.Ft (Floor Area)',
    deliverables: [
      'Custom 3D Interior Visualizations & Elevations',
      'Marine Grade BWP 710 Boiling Water Proof Plywood',
      'German Soft-Close Hinges & Tandem Drawers',
      'Master Bedroom Wardrobes with Loft Storage',
      'Designer TV Unit, Shoe Rack & Crockery Display'
    ],
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
    ],
    addons: [
      { id: 'tandem-drawers', name: 'Hafele Soft-Close Tandem Drawer Set', cost: 32000, description: '40kg heavy duty pullouts for pots and pans' },
      { id: 'profile-led', name: 'Under-Cabinet Profile LED Strip Lighting', cost: 18000, description: 'Warm 3000K diffused lighting with motion sensors' }
    ]
  },
  {
    id: 'painting-works',
    name: 'Painting Works & Textures',
    shortDesc: 'Perfect finish & lasting architectural coatings',
    icon: 'Paintbrush',
    defaultArea: 2500,
    minArea: 500,
    maxArea: 10000,
    areaStep: 100,
    unit: 'Sq.Ft (Wall Surface)',
    deliverables: [
      'Surface preparation with mechanical sanding',
      '2 Coats Birla Opus / White Cement Wall Putty',
      '1 Coat Acrylic Interior/Exterior Primer',
      '2 Coats Luxury Emulsion Paint',
      'Complete furniture masking and floor protection'
    ],
    tiers: [
      {
        id: 'standard',
        name: 'Interior Tractor / Premium Emulsion',
        ratePerUnit: 26,
        description: '2 Coats Birla Putty + 1 Primer + 2 Coats Emulsion',
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
    ],
    addons: [
      { id: 'texture-wall', name: 'Designer Italian Royale Texture Wall', cost: 15000, description: 'Metallic stucco or dune texture on master accent wall' },
      { id: 'damp-seal', name: 'Anti-Damp Wall Sealing Treatment', cost: 12000, description: 'Nano-polymer damp proof undercoating' }
    ]
  },
  {
    id: 'electrical-works',
    name: 'Electrical Works & Power Systems',
    shortDesc: 'Safe, certified concealed electrical solutions',
    icon: 'Zap',
    defaultArea: 1500,
    minArea: 500,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Built-Up Area',
    deliverables: [
      'Concealed FRLS copper wiring with PVC conduits',
      'Modular switches & designer face plates',
      '3-Phase distribution board with MCB/ELCB',
      'Dedicated AC, geyser & high-load circuits',
      'Copper plate earth pit installation'
    ],
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
    ],
    addons: [
      { id: 'phase-changer', name: 'Automatic 3-Phase Changer & Surge Protector', cost: 22000, description: 'Protects appliances from phase imbalance & lightning surges' },
      { id: 'ev-point', name: 'Dedicated EV Charger Line & 32A MCB', cost: 16000, description: 'Heavy 6 sq.mm armoured copper run to parking bay' }
    ]
  },
  {
    id: 'plumbing-works',
    name: 'Plumbing Works & Sanitary Solutions',
    shortDesc: 'Leak-proof, long-lasting piping & fittings',
    icon: 'Droplet',
    defaultArea: 1500,
    minArea: 500,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Built-Up Area',
    deliverables: [
      'Astral / Ashirvad CPVC internal hot/cold water lines',
      'Supreme SWR drainage lines with inspection chambers',
      'Concealed wall mixer / diverter installations',
      'Overhead tank plumbing & float valve setup',
      '10-Bar hydrostatic pressure testing'
    ],
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
    ],
    addons: [
      { id: 'auto-controller', name: 'Automatic Overhead Tank Water Controller', cost: 8500, description: 'Wireless sensor auto start/stop controller' },
      { id: 'booster-pipe', name: 'Pressure Booster Pump Pipeline Setup', cost: 18000, description: 'Dedicated manifold for high-flow rain showers' }
    ]
  },
  {
    id: '3d-plan-drawing',
    name: '3D Plan Drawing & Elevation',
    shortDesc: 'Architectural designs & photorealistic renders',
    icon: 'Compass',
    defaultArea: 1500,
    minArea: 600,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Built-Up Area',
    deliverables: [
      'Vasthu-compliant 2D architectural floor layouts',
      'Photorealistic 3D exterior elevations in 4K resolution',
      'Day and warm twilight lighting simulation sets',
      'Door and window schedule with material specifications',
      'CMDA / DTCP building approval ready drawings'
    ],
    tiers: [
      {
        id: 'standard',
        name: '2D Floor Plan & Vasthu Layout',
        ratePerUnit: 12,
        description: 'Dimensional floor plans, room zoning & Vasthu orientation chart',
        materials: 'AutoCAD DXF/DWG, PDF dimension sets, CMDA sanction format'
      },
      {
        id: 'premium',
        name: 'Photorealistic 3D Elevation & 4K Views',
        ratePerUnit: 22,
        recommended: true,
        description: 'High-definition 3D facade modeling, material textures & 4 camera angles',
        materials: '3ds Max / V-Ray 4K renders, material finish schedules, day/night lighting'
      },
      {
        id: 'luxury',
        name: 'Complete 3D Walkthrough & BIM Model',
        ratePerUnit: 35,
        description: 'Cinematic 60fps video walkthrough + Revit BIM architectural model',
        materials: 'Revit BIM file, 4K video animation walkthrough, VR headset compatible tour'
      }
    ],
    addons: [
      { id: 'night-render', name: 'Architectural Night Illumination Set', cost: 7500, description: '3 Warm night renders with landscape lighting accents' },
      { id: 'vr-tour', name: 'Virtual 360 Panoramic Interactive Tour', cost: 15000, description: 'Interactive browser-based 360 walkthrough for family' }
    ]
  },
  {
    id: 'structural-drawing',
    name: 'Structural Drawing & BBS',
    shortDesc: 'IS 456 compliant structural design & detailing',
    icon: 'Building2',
    defaultArea: 1800,
    minArea: 600,
    maxArea: 6000,
    areaStep: 50,
    unit: 'Sq.Ft Built-Up Area',
    deliverables: [
      'Isolated / raft footing structural detailing based on SBC',
      'Column layout, reinforcement detailing & lap schedules',
      'Plinth beam, floor beam & slab bar bending schedules (BBS)',
      'IS 1893 seismic resistant design & wind load calculations',
      'Staircase, overhead tank & sump structural reinforcement details'
    ],
    tiers: [
      {
        id: 'standard',
        name: 'G+1 Foundation & Column Schedule',
        ratePerUnit: 18,
        description: 'Foundation design, column placement and basic slab rebar drawings',
        materials: 'STAAD Pro Analysis, IS 456:2000 calculations, CAD structural sheets'
      },
      {
        id: 'premium',
        name: 'Comprehensive IS 456 Seismic Drawing Set + BBS',
        ratePerUnit: 28,
        recommended: true,
        description: 'Complete G+2/G+3 structural drawing set with exact steel bar bending schedules',
        materials: 'ETABS 3D Seismic modeling, IS 13920 ductile detailing, steel cutting schedules'
      },
      {
        id: 'luxury',
        name: 'Heavy Commercial / Multi-Storey R.C.C Design',
        ratePerUnit: 42,
        description: 'Post-tensioned slab / commercial framed design with third-party vetting',
        materials: 'Non-linear dynamic analysis, wind tunnel compliance, PE stamping documentation'
      }
    ],
    addons: [
      { id: 'site-inspection', name: 'On-Site Rebar Verification Visits (3 Milestones)', cost: 12000, description: 'Footing, Plinth, and Roof slab steel inspection by Er. Manikandan' },
      { id: 'structural-stamp', name: 'Chartered Engineer Structural Stability Stamping', cost: 15000, description: 'Official stability certificate for bank loan / approval' }
    ]
  },
  {
    id: 'soil-test',
    name: 'Soil Test & SBC Investigation',
    shortDesc: 'Safe Bearing Capacity calculation & geotechnical reports',
    icon: 'FlaskConical',
    defaultArea: 1,
    minArea: 1,
    maxArea: 6,
    areaStep: 1,
    unit: 'Site Report / Borehole',
    deliverables: [
      'Rotary core drilling / Standard Penetration Test (SPT) up to hard strata',
      'Collection of undisturbed & disturbed soil samples',
      'Laboratory testing: Atterberg limits, sieve analysis, shear strength',
      'Safe Bearing Capacity (SBC) recommendation at various depths',
      'Groundwater table observation & foundation type recommendation'
    ],
    tiers: [
      {
        id: 'standard',
        name: 'Standard 1-Borehole SPT Investigation',
        ratePerUnit: 14000,
        description: 'Single borehole drilling up to 10m depth with standard geotechnical report',
        materials: 'IS 2131 SPT testing, basic soil classification report, SBC calculation'
      },
      {
        id: 'premium',
        name: 'Comprehensive 2-Borehole Residential Report',
        ratePerUnit: 22000,
        recommended: true,
        description: 'Two borehole drillings with full laboratory shear analysis & foundation guide',
        materials: 'Direct shear test, consolidation test, N-value graph, foundation depth optimization'
      },
      {
        id: 'luxury',
        name: 'Commercial Multi-Borehole Deep Core Investigation',
        ratePerUnit: 38000,
        description: 'Three deep boreholes with chemical analysis (sulphate/chloride) for high-rises',
        materials: 'Core recovery analysis, RQD calculation, chemical aggressivity report for concrete'
      }
    ],
    addons: [
      { id: 'fast-track-lab', name: 'Express 48-Hour Certified Lab Report', cost: 6000, description: 'Expedited NABL accredited laboratory results' },
      { id: 'foundation-consult', name: 'Foundation Design Optimization Consultation', cost: 8000, description: 'Engineer consultation to prevent over-design and save steel/concrete' }
    ]
  },
  {
    id: 'landscape-design',
    name: 'Landscape Design & Hardscaping',
    shortDesc: 'Outdoor living, native gardens & paving aesthetics',
    icon: 'Trees',
    defaultArea: 800,
    minArea: 200,
    maxArea: 5000,
    areaStep: 50,
    unit: 'Sq.Ft Outdoor Area',
    deliverables: [
      'Landscape master plan with plant selection suited for Chennai climate',
      'Interlocking heavy-duty paver block laying on compacted sub-base',
      'Lush natural Mexican / Bermuda grass lawn turf installation',
      'Perimeter compound wall vertical garden planters',
      'Integrated outdoor drainage & gentle slope runoff management'
    ],
    tiers: [
      {
        id: 'standard',
        name: 'Basic Greenery & Paver Pathway',
        ratePerUnit: 95,
        description: 'Heavy duty pavers, boundary shrub borders & soil preparation',
        materials: '60mm concrete pavers, red soil enrichment, native drought-tolerant plants'
      },
      {
        id: 'premium',
        name: 'Modern Lawn, Paver & Water Feature',
        ratePerUnit: 175,
        recommended: true,
        description: 'Bermuda grass turf, cobble stone driveways, water fountain & accent lighting',
        materials: 'Natural stone paving, Mexican grass rolls, ceramic water cascade, brass fixtures'
      },
      {
        id: 'luxury',
        name: 'Luxury Pergola, Gazebo & Smart Irrigation',
        ratePerUnit: 280,
        description: 'WPC wooden pergola, granite sit-outs, automated misting & landscape spotlights',
        materials: 'Weatherproof WPC pergola, ambient 3000K garden spike lights, smart drip network'
      }
    ],
    addons: [
      { id: 'drip-irrigation', name: 'Automated Timer Drip Irrigation System', cost: 16000, description: 'Smart battery-operated timer valve with micro-drippers' },
      { id: 'garden-lights', name: 'Warm LED Spike Landscape Lighting Kit', cost: 14000, description: '6 IP65 weatherproof garden spotlight set with cabling' }
    ]
  },
  {
    id: 'properties-buying-selling',
    name: 'Properties Buying & Selling',
    shortDesc: 'Civil engineer verified property advisory & valuation',
    icon: 'Handshake',
    defaultArea: 1,
    minArea: 1,
    maxArea: 4,
    areaStep: 1,
    unit: 'Property Valuation / Audit',
    deliverables: [
      'Civil engineer structural audit of existing building condition',
      'CMDA / DTCP layout verification & FSI / setback check',
      'Fair market valuation benchmark based on construction age & quality',
      'Encumbrance & parent document legal civil verification',
      'Renovation cost estimation before purchasing'
    ],
    tiers: [
      {
        id: 'standard',
        name: 'Document Verification & Civil Audit',
        ratePerUnit: 12000,
        description: 'On-site visual structural check, approval check & guideline value assessment',
        materials: 'Civil inspection report, setback compliance sheet, fair valuation certificate'
      },
      {
        id: 'premium',
        name: 'Comprehensive Structural Audit & Valuation',
        ratePerUnit: 25000,
        recommended: true,
        description: 'Non-destructive rebound hammer concrete test, moisture check & market benchmark',
        materials: 'Rebound hammer test report, dampness analysis, itemized renovation BOQ'
      },
      {
        id: 'luxury',
        name: 'Full End-to-End Escrow & Purchase Advisory',
        ratePerUnit: 45000,
        description: 'Complete legal + civil due diligence, price negotiation advisory & registration support',
        materials: 'Full legal title opinion, engineer stability certification, registration facilitation'
      }
    ],
    addons: [
      { id: 'ultrasonic-test', name: 'Ultrasonic Pulse Velocity (UPV) Test', cost: 12000, description: 'Deep concrete internal crack and void detection' },
      { id: 'cmda-check', name: 'CMDA / DTCP Legal Approval Investigation', cost: 8000, description: 'Official municipal record verification' }
    ]
  },
  {
    id: 'civil-construction',
    name: 'Civil Construction & Infrastructure',
    shortDesc: 'Commercial complexes, industrial sheds & heavy structures',
    icon: 'HardHat',
    defaultArea: 2000,
    minArea: 800,
    maxArea: 10000,
    areaStep: 100,
    unit: 'Sq.Ft Built-Up',
    deliverables: [
      'Heavy R.C.C column framework with commercial load design',
      'High-grade M25/M30 ready mix concrete with cube strength test records',
      'Industrial grade Tremix flooring / commercial vitrified tiling',
      'Fire fighting conduit provision & high-amperage electrical routing',
      'Heavy stormwater drainage trenching and compound security barriers'
    ],
    tiers: [
      {
        id: 'standard',
        name: 'Industrial Shed & Compound Infrastructure',
        ratePerUnit: 1450,
        description: 'Steel portal frame / PEB roofing with perimeter brick compound',
        materials: 'Tata Structura steel sections, JSW Colouron sheets, heavy concrete footings'
      },
      {
        id: 'premium',
        name: 'Commercial R.C.C Complex Framework',
        ratePerUnit: 1950,
        recommended: true,
        description: 'Multi-storey commercial frame with commercial stairs, lift core & parking',
        materials: 'M25 RMC, Fe550D Steel, heavy glass facade framing, commercial flooring'
      },
      {
        id: 'luxury',
        name: 'Heavy Industrial Superstructure & Post-Tensioned Slabs',
        ratePerUnit: 2650,
        description: 'Heavy machinery load capacity slabs, anti-static flooring & transformer yard',
        materials: 'M35 grade high performance concrete, Tremix laser screed, epoxy flooring'
      }
    ],
    addons: [
      { id: 'tremix-floor', name: 'Heavy Duty Laser Screed Tremix Flooring', cost: 75000, description: 'Non-dusting abrasion-resistant industrial floor' },
      { id: 'drainage-trench', name: 'Heavy Stormwater RCC Trench Network', cost: 45000, description: 'Precast heavy drain channels with cast iron gratings' }
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
      `• Package Tier: ${activeTierConfig.name} (@ ₹${activeTierConfig.ratePerUnit.toLocaleString('en-IN')}/${currentService.unit})\n` +
      `• Scope / Area: ${area.toLocaleString('en-IN')} ${currentService.unit}\n` +
      (selectedAddons.length > 0 ? `• Add-ons: ${selectedAddons.map(id => currentService.addons?.find(a => a.id === id)?.name).join(', ')}\n` : '') +
      `• Estimated Total: ₹${grandTotal.toLocaleString('en-IN')}\n\n` +
      `Please connect with me for a site visit and detailed BOQ.`
    );
    window.open(`https://wa.me/91${COMPANY_DETAILS.phones[0]}?text=${text}`, '_blank');
  };

  const getQuoteCategory = (serviceId: string): 'construction' | 'interior' | 'renovation' => {
    if (serviceId === 'house-construction' || serviceId === 'civil-construction' || serviceId === 'structural-drawing' || serviceId === 'soil-test') return 'construction';
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
      case 'Compass': return <Compass className={className} />;
      case 'Building2': return <Building2 className={className} />;
      case 'FlaskConical': return <FlaskConical className={className} />;
      case 'Trees': return <Trees className={className} />;
      case 'Handshake': return <Handshake className={className} />;
      case 'HardHat': return <HardHat className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  return (
    <section id="estimator" className="py-8 sm:py-10 lg:py-14 bg-white text-[#1d3557] relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#E63946] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator & Specification Viewer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-[#1d3557] tracking-tight">
            Transparent Civil & Interior Estimator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg">
            Tap any service to instantly inspect its technical specifications, rate cards, and live turnkey budget calculation right below.
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
            type="button"
            onClick={() => handleServiceChange('house-construction')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FFC107] hover:bg-[#ffb300] text-[#14253e] font-black text-xs uppercase tracking-wider shadow transition-transform active:scale-95 cursor-pointer font-heading text-center shrink-0"
          >
            Calculate ₹2,250 Construction
          </button>
        </div>

        {/* Main Estimator Container */}
        <div className="rounded-3xl bg-[#f8f9fa] border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-xl space-y-8">
          
          {/* Step 1: All 12 Services Selector Grid */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-mono">1</span>
                <span>Select from Services (Tap any service to view its details below):</span>
              </label>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E63946] bg-red-50 px-3 py-1 rounded-full border border-red-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active: {currentService.name}</span>
              </div>
            </div>

            {/* Responsive 12-Service Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {ESTIMATOR_SERVICES_CONFIG.map((s, idx) => {
                const isSelected = selectedServiceId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleServiceChange(s.id)}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-[#14253e] border-[#FFC107] text-white shadow-xl ring-2 ring-[#FFC107]/60 scale-[1.03] z-10'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FFC107] animate-ping" />
                    )}

                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#E63946] text-white shadow' : 'bg-slate-100 text-[#1d3557]'
                    }`}>
                      {getServiceIcon(s.icon, "w-4 h-4 sm:w-5 sm:h-5")}
                    </div>
                    
                    <div className="text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 px-0.5">
                      {s.name}
                    </div>

                    <div className="flex items-center justify-between w-full pt-1 border-t border-slate-100/20 text-[9px] font-mono font-bold">
                      <span className={isSelected ? 'text-[#FFC107]' : 'text-slate-400'}>
                        #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase ${
                        isSelected ? 'bg-[#FFC107] text-[#14253e]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isSelected ? 'Viewing' : 'Inspect'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC DETAILS CONTAINER - Appears immediately beneath the clicked service */}
          <div className="rounded-2xl bg-white border-2 border-slate-200 p-5 sm:p-7 shadow-md space-y-8 animate-in fade-in-50 duration-300">
            
            {/* Service Header & Technical Deliverables */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E63946] bg-red-50 px-3 py-1 rounded-full border border-red-200">
                  {getServiceIcon(currentService.icon, "w-3.5 h-3.5")}
                  <span>Detailed Civil Specifications & Rate Cards</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#1d3557]">
                  {currentService.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  {currentService.shortDesc}
                </p>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex-shrink-0">
                <ShieldCheck className="w-8 h-8 text-[#E63946] flex-shrink-0" />
                <div>
                  <div className="font-bold text-[#1d3557]">Supervised by Er. D. Manikandan</div>
                  <div className="text-[11px] text-slate-500">B.Tech (Civil) • 10+ Yrs Experience</div>
                </div>
              </div>
            </div>

            {/* Key Deliverables Checklist */}
            <div className="space-y-2.5">
              <div className="text-xs font-black uppercase tracking-wider text-slate-700">
                Key Deliverables & Civil Inclusions for {currentService.name}:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {currentService.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Specification Tiers */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-mono">2</span>
                <span>Select Quality Package / Specification Tier:</span>
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

            {/* Step 3: Scope Slider & Addons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
              
              {/* Scope Slider (7 cols) */}
              <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E63946] text-white flex items-center justify-center text-[10px] font-mono">3</span>
                    <span>Set {currentService.unit} Quantity / Scope:</span>
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
                  <span>Default: {currentService.defaultArea} {currentService.unit}</span>
                  <span>Max: {currentService.maxArea} {currentService.unit}</span>
                </div>
              </div>

              {/* Optional Addons (5 cols) */}
              {currentService.addons && currentService.addons.length > 0 ? (
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm space-y-3">
                  <label className="text-xs font-black uppercase tracking-wider text-[#1d3557] block">
                    Optional Add-ons for {currentService.name}:
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
                              ? 'bg-red-50/70 border-[#E63946] text-[#1d3557]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
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
                <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center gap-3 text-xs text-slate-600">
                  <ShieldCheck className="w-8 h-8 text-[#E63946] flex-shrink-0" />
                  <div>
                    <div className="font-bold text-[#1d3557]">Comprehensive Engineering Package</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      This service is executed end-to-end under the direct technical seal and supervision of Er. D. Manikandan with 100% material transparency.
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Results Summary Box - Inside Details */}
            <div className="p-4 sm:p-6 lg:p-7 rounded-2xl bg-[#14253e] text-white border-2 border-[#FFC107] flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-5 sm:gap-6 shadow-2xl relative overflow-hidden">
              <div className="space-y-2 relative z-10 min-w-0 flex-1">
                <div className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#FFC107] text-[11px] sm:text-xs font-black uppercase tracking-wider max-w-full">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="break-words">Estimated Total ({activeTierConfig.name})</span>
                </div>
                <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-white font-mono tracking-tight break-words">
                  ₹{grandTotal.toLocaleString('en-IN')}*
                </div>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  Calculated at ₹{activeTierConfig.ratePerUnit.toLocaleString('en-IN')}/{currentService.unit} for {area.toLocaleString('en-IN')} {currentService.unit}
                  {addonsCost > 0 ? ` + ₹${addonsCost.toLocaleString('en-IN')} in selected add-ons` : ''}.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full lg:w-auto relative z-10 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(getQuoteCategory(currentService.id))}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 bg-[#E63946] hover:bg-[#d90429] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 font-heading text-center cursor-pointer flex items-center justify-center"
                >
                  Book Free Site Consultation
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 text-center cursor-pointer flex items-center justify-center"
                >
                  Send Estimate on WhatsApp
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
