import type { PortfolioItem } from '@/types';

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'pool-remodel-1',
    title: 'Luxury Pool Renovation',
    description: 'Complete pool remodeling with new plaster, tile, and modern equipment upgrades. Transformed an aging pool into a stunning backyard oasis.',
    serviceType: 'Pool Remodeling',
    location: 'Holbrook, NY',
    beforeImage: {
      src: '/images/portfolio/project-1-before.jpg',
      alt: 'Pool before renovation - old plaster and dated tile in Holbrook NY'
    },
    afterImage: {
      src: '/images/portfolio/project-1-after.jpg',
      alt: 'Renovated pool with new plaster and modern tile - Holbrook NY'
    },
    completedDate: '2024-08-15',
    featured: true,
    tags: ['remodeling', 'plaster', 'tile', 'premium']
  },
  {
    id: 'plumbing-repair-1',
    title: 'Underground Leak Repair',
    description: 'Diagnosed and repaired major underground plumbing leak. Replaced damaged pipes and restored full system functionality.',
    serviceType: 'Plumbing Repair',
    location: 'Suffolk County, NY',
    beforeImage: {
      src: '/images/portfolio/project-2-before.jpg',
      alt: 'Pool with water loss from underground leak - Suffolk County'
    },
    afterImage: {
      src: '/images/portfolio/project-2-after.jpg',
      alt: 'Repaired plumbing system with full water pressure restored'
    },
    completedDate: '2024-07-22',
    featured: true,
    tags: ['plumbing', 'leak-repair', 'underground']
  },
  {
    id: 'equipment-upgrade-1',
    title: 'Energy-Efficient Equipment Upgrade',
    description: 'Upgraded to variable speed pump, salt system, and LED lighting. Reduced energy costs by 60% while improving water quality.',
    serviceType: 'Equipment',
    location: 'Nassau County, NY',
    beforeImage: {
      src: '/images/portfolio/project-3-before.jpg',
      alt: 'Old single-speed pool pump and outdated equipment'
    },
    afterImage: {
      src: '/images/portfolio/project-3-after.jpg',
      alt: 'New variable speed pump and modern salt system installation'
    },
    completedDate: '2024-06-10',
    featured: true,
    tags: ['equipment', 'energy-efficient', 'salt-system']
  },
  {
    id: 'pool-cleanup-1',
    title: 'Green Pool Recovery',
    description: 'Restored neglected pool from green algae condition to crystal clear. Deep cleaning, algae treatment, and chemical rebalancing.',
    serviceType: 'Cleanup',
    location: 'Holbrook, NY',
    beforeImage: {
      src: '/images/portfolio/project-4-before.jpg',
      alt: 'Green algae-filled pool before cleanup service'
    },
    afterImage: {
      src: '/images/portfolio/project-4-after.jpg',
      alt: 'Crystal clear pool after professional cleanup and treatment'
    },
    completedDate: '2024-05-18',
    featured: true,
    tags: ['cleanup', 'algae-treatment', 'restoration']
  },
  {
    id: 'above-ground-install',
    title: 'Above Ground Pool Installation',
    description: 'Complete above ground pool package with deck, equipment, and professional installation. Ready for family enjoyment.',
    serviceType: 'Above Ground',
    location: 'Suffolk County, NY',
    beforeImage: {
      src: '/images/portfolio/project-5-before.jpg',
      alt: 'Backyard before above ground pool installation'
    },
    afterImage: {
      src: '/images/portfolio/project-5-after.jpg',
      alt: 'New above ground pool with deck and equipment installed'
    },
    completedDate: '2024-04-25',
    featured: true,
    tags: ['above-ground', 'installation', 'deck']
  }
];
