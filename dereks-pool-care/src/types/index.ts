// TypeScript interfaces for Derek's Complete Pool Care website

export interface BusinessInfo {
  name: string;
  tagline: string;
  description: string;
  established?: number;
  license?: string;
  insurance?: string;
  serviceArea: string[];
  rating: number;
  reviewCount: number;
}

export interface ContactInfo {
  phone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  businessHours: {
    [day: string]: {
      open: string;
      close: string;
    } | null;
  };
  emergencyAvailable: boolean;
  socialMedia: {
    facebook?: string;
    instagram?: string;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  startingPrice?: number;
  priceNote: string;
  duration?: string;
  frequency?: string;
  seasonal: boolean;
  popular: boolean;
  icon?: string;
  category: 'maintenance' | 'repair' | 'seasonal';
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  serviceType: string;
  location?: string;
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  additionalImages?: Array<{
    src: string;
    alt: string;
  }>;
  completedDate?: string;
  featured: boolean;
  tags: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  serviceType?: string;
  date: string;
  source: 'birdeye' | 'google' | 'facebook' | 'website';
  featured: boolean;
  location?: string;
}

export interface SeasonalTip {
  id: string;
  title: string;
  season: 'spring' | 'summer' | 'fall' | 'winter';
  category: 'maintenance' | 'safety' | 'equipment' | 'chemical';
  shortDescription: string;
  content: string;
  icon?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: string;
  featured: boolean;
  relatedServices: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  serviceRequested: 'Premium' | 'Repair' | 'Other';
  message?: string;
  submittedAt: string;
}
