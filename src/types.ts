export interface CompanyInfo {
  name: string;
  shortName: string;
  tagline: string;
  proprietor: string;
  qualification: string;
  experienceYears: number;
  phones: string[];
  email: string;
  gstNumber: string;
  address: string;
  city: string;
  state: string;
  workingHours: string;
  instagramUrl?: string;
}

export interface CareerMilestone {
  id: string;
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  bannerImage: string;
  description: string;
  features: string[];
  processSteps: { step: number; title: string; description: string }[];
  packages: {
    name: string;
    ratePerSqFt: string;
    description: string;
    includes: string[];
    popular?: boolean;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'interior' | 'renovation';
  categoryLabel: string;
  location: string;
  areaSqFt: string;
  completionYear: string;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  testimonialSnippet?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
  date: string;
}

export interface CostEstimateInput {
  serviceType: 'construction' | 'interior' | 'renovation';
  packageTier: 'basic' | 'premium' | 'luxury';
  areaSqFt: number;
  floors: number;
  includesElevation: boolean;
  includesModularKitchen: boolean;
  includesCompoundWall: boolean;
}
