export interface PoolModel {
  id: string;
  name: string;
  series: string;
  description: string;
  image: string;
  shapes: ('Round' | 'Oval')[];
  sizes: string[];
  features: string[];
  specs: {
    wallHeight: string;
    warranty: string;
    construction: string;
  };
}

export const poolModels: PoolModel[] = [
  {
    id: 'chesapeake',
    name: 'Chesapeake',
    series: 'Hybrid Series',
    description: 'Our most popular hybrid model, blending high-tensile steel strength with corrosion-proof resin components. A Long Island favorite for its durability and classic look.',

    image: '/images/pools/chesapeake.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "30' Round", "15'x30' Oval", "18'x33' Oval"],
    features: [
      'Hybrid Structure',
      'Corrosion Resistant Resin',
      'Designer Wall Pattern',
      'Extra-Wide Top Ledge'
    ],
    specs: {
      wallHeight: '54"',
      warranty: '60 Year Limited',
      construction: 'Hybrid Resin/Steel'
    }
  },
  {
    id: 'costa-del-sol',
    name: 'Costa Del Sol',
    series: 'Hybrid Series',
    description: 'Inspired by the sun-drenched coasts of Spain, the Costa Del Sol features a sophisticated design with unmatched salt-water resistance and structural integrity.',

    image: '/images/pools/costa_del_sol.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "15'x30' Oval", "18'x33' Oval"],
    features: [
      'Enhanced Salt Protection',
      'Architectural Design',
      'Heavy-Duty Resin Ledges',
      'Interlocking Frame'
    ],
    specs: {
      wallHeight: '54"',
      warranty: '60 Year Limited',
      construction: 'Premium Hybrid'
    }
  },
  {
    id: 'emotion',
    name: 'Emotion',
    series: 'Resin Series',
    description: 'A masterpiece of pool engineering. The Emotion offers a sleek, modern aesthetic with a 100% resin structure that is immune to corrosion and rust.',

    image: '/images/pools/emotion.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "15'x30' Oval"],
    features: [
      '100% Resin Framework',
      'Salt-Water Proof',
      'Contemporary Wall Pattern',
      'Ultra-Stable Joints'
    ],
    specs: {
      wallHeight: '54"',
      warranty: 'Lifetime Frame',
      construction: 'Full Resin'
    }
  },
  {
    id: 'esprit-ii',
    name: 'Esprit II',
    series: 'Steel Series',
    description: 'The Esprit II combines affordability with proven reliability. A classic steel-walled design that has stood the test of time in thousands of Long Island backyards.',

    image: '/images/pools/esprit_ii.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["15' Round", "18' Round", "21' Round", "24' Round", "27' Round", "12'x24' Oval", "15'x30' Oval"],
    features: [
      'Corrugated Steel Wall',
      'Zinc-Coated Protection',
      'Classic Aesthetics',
      'Proven Longevity'
    ],
    specs: {
      wallHeight: '52"',
      warranty: '30 Year Limited',
      construction: 'Galvanized Steel'
    }
  },
  {
    id: 'patriot-hybrid',
    name: 'Patriot Hybrid',
    series: 'Hybrid Series',
    description: 'Strength and honor in every component. The Patriot Hybrid is a heavy-duty model designed for families who want a pool that will last for generations.',

    image: '/images/pools/patriot.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "15'x30' Oval"],
    features: [
      'Heavy-Gauge Steel Wall',
      'Resin Top Ledges',
      'Impact Resistant Covers',
      'Stable Buttress System'
    ],
    specs: {
      wallHeight: '52"',
      warranty: '40 Year Limited',
      construction: 'Hybrid Steel/Resin'
    }
  },
  {
    id: 'protege',
    name: 'Protégé',
    series: 'Steel Series',
    description: 'Perfect for the first-time pool owner. The Protégé offers exceptional value with a focus on simplicity, ease of maintenance, and reliable construction.',

    image: '/images/pools/protege.jpg',
    shapes: ['Round'],
    sizes: ["15' Round", "18' Round", "21' Round", "24' Round"],
    features: [
      'Easy-Install Frame',
      'Galvanized Protection',
      'Classic Wall Design',
      'Affordable Quality'
    ],
    specs: {
      wallHeight: '52"',
      warranty: '25 Year Limited',
      construction: 'Zinc-Coated Steel'
    }
  },
  {
    id: 'regency',
    name: 'Regency',
    series: 'Hybrid Series',
    description: 'Add a touch of royalty to your backyard. The Regency features an elegant cream-toned frame with high-impact resin components for a sophisticated look.',

    image: '/images/pools/regency.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "15'x30' Oval"],
    features: [
      'Elegant Design',
      'Resin Shield Protection',
      'Wide Stable Ledges',
      'UV Resistant Coating'
    ],
    specs: {
      wallHeight: '54"',
      warranty: '50 Year Limited',
      construction: 'Hybrid'
    }
  },
  {
    id: 'sensation',
    name: 'Sensation',
    series: 'Hybrid Series',
    description: 'The Sensation is truly sensational. A versatile model that can be installed above ground, semi-inground, or fully inground to fit any landscape.',

    image: '/images/pools/sensation-v2.png',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "15'x30' Oval"],
    features: [
      'Versatile Installation',
      'Burial-Rated Wall',
      'Premium Resin Components',
      'Salt-Water Ready'
    ],
    specs: {
      wallHeight: '54"',
      warranty: 'Lifetime Frame',
      construction: 'Heavy-Duty Hybrid'
    }
  },
  {
    id: 'trevi-211-drakkar',
    name: 'Trevi 211 (Drakkar)',
    series: 'Trevi Series',
    description: 'The legendary Trevi 211 with the Drakkar wall pattern. Robust, elegant, and built for those who demand the absolute best in pool technology and design.',

    image: '/images/pools/trevi-drakkar.jpg',
    shapes: ['Round', 'Oval'],
    sizes: ["18' Round", "21' Round", "24' Round", "27' Round", "15'x30' Oval"],
    features: [
      'Trevi Quality Seal',
      'SP Coating Technology',
      'Premium Resin Components',
      'High-Flow Skimmer'
    ],
    specs: {
      wallHeight: '52"',
      warranty: 'Lifetime Frame',
      construction: 'Premium Resin'
    }
  },
  {
    id: 'vista',
    name: 'Vista',
    series: 'Steel Series',
    description: 'Clear views and clean lines. The Vista offers a contemporary look with a focus on value and durability, featuring a subtle grey frame and a distinctive diamond-pattern designer wall.',

    image: '/images/pools/vista-v2.png',
    shapes: ['Round', 'Oval'],
    sizes: ["15' Round", "18' Round", "21' Round", "24' Round", "27' Round", "30' Round", "12'x21' Oval", "12'x24' Oval", "15'x24' Oval", "15'x30' Oval", "18'x33' Oval"],
    features: [
      'Modern Grey Finish',
      'Reinforced Steel Wall',
      'Zinc-Shield Coating',
      'Integrated Skimmer'
    ],
    specs: {
      wallHeight: '52"',
      warranty: '35 Year Limited',
      construction: 'Galvanized Steel'
    }
  }
];
