import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'maintenance',
    name: 'Pool Maintenance',
    shortDescription: 'Weekly professional pool care and chemical balancing',
    description: 'Our comprehensive weekly maintenance service keeps your pool crystal clear and swim-ready all season long. We handle everything from chemical balancing to equipment inspection.',
    features: [
      'Chemical testing and balancing',
      'Skimming and debris removal',
      'Filter cleaning and inspection',
      'Equipment check and maintenance',
      'pH and chlorine level adjustment'
    ],
    startingPrice: 150,
    priceNote: 'Starting at $150/month - Contact for customized quote',
    duration: '1-2 hours',
    frequency: 'Weekly',
    seasonal: false,
    popular: true,
    category: 'maintenance',
    icon: 'droplets'
  },
  {
    id: 'remodeling',
    name: 'Pool Remodeling',
    shortDescription: 'Transform your pool with our premium remodeling services',
    description: 'Upgrade your pool with modern finishes, new tile, updated equipment, and stunning aesthetic improvements. Perfect for aging pools or when you want a fresh new look.',
    features: [
      'Plaster and tile replacement',
      'Equipment upgrades',
      'Lighting installation',
      'Deck resurfacing',
      'Water feature additions',
      'Energy-efficient system upgrades'
    ],
    priceNote: 'Contact for detailed estimate',
    seasonal: false,
    popular: true,
    category: 'seasonal',
    icon: 'paintbrush'
  },
  {
    id: 'plumbing-repair',
    name: 'Inground Pool Plumbing Repair',
    shortDescription: 'Expert diagnosis and repair of pool plumbing systems',
    description: 'Specialized inground pool plumbing services including leak detection, pipe repair, and complete system overhauls. We handle everything from minor leaks to major plumbing renovations.',
    features: [
      'Leak detection and repair',
      'Pipe replacement',
      'Valve and fitting upgrades',
      'Pressure testing',
      'Underground line repair',
      'System modernization'
    ],
    priceNote: 'Contact for assessment',
    seasonal: false,
    popular: true,
    category: 'repair',
    icon: 'wrench'
  },
  {
    id: 'equipment-repair',
    name: 'Equipment Repair and Sales',
    shortDescription: 'Repair and replacement of all pool equipment',
    description: 'Expert repair service for pumps, filters, heaters, and automation systems. We also offer sales and installation of premium pool equipment.',
    features: [
      'Pump repair and replacement',
      'Filter service',
      'Heater maintenance',
      'Automation system installation',
      'Salt system service',
      'Equipment diagnostics'
    ],
    startingPrice: 125,
    priceNote: 'Service call starting at $125 - Parts additional',
    seasonal: false,
    popular: false,
    category: 'repair',
    icon: 'settings'
  },
  {
    id: 'above-ground',
    name: 'Above Ground Pool Sales and Installation',
    shortDescription: 'Complete above ground pool packages',
    description: 'Professional installation of quality above ground pools. We offer a selection of top brands and handle everything from site preparation to final setup.',
    features: [
      'Site evaluation and preparation',
      'Pool installation',
      'Equipment setup',
      'Chemical startup',
      'Owner training',
      'Warranty support'
    ],
    priceNote: 'Packages starting at $3,500 - Contact for options',
    seasonal: true,
    popular: false,
    category: 'seasonal',
    icon: 'circle'
  },
  {
    id: 'cleanups',
    name: 'Pool Cleanups',
    shortDescription: 'One-time deep cleaning and restoration',
    description: 'Comprehensive pool cleanup service for neglected pools, storm aftermath, or opening after winter. We\'ll get your pool back to pristine condition.',
    features: [
      'Debris removal',
      'Algae treatment',
      'Pressure washing',
      'Chemical shock treatment',
      'Equipment inspection',
      'Water testing and balancing'
    ],
    startingPrice: 250,
    priceNote: 'Starting at $250 - Price varies by condition',
    seasonal: false,
    popular: false,
    category: 'maintenance',
    icon: 'sparkles'
  }
];
