import type { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'John D.',
    rating: 5,
    reviewText: 'Derek and his team completely transformed our pool! The remodeling work was impeccable, and they finished ahead of schedule. Our pool has never looked better. Highly recommend for any pool remodeling needs.',
    serviceType: 'Pool Remodeling',
    date: '2024-08-20',
    source: 'google',
    featured: true,
    location: 'Holbrook'
  },
  {
    id: 'test-2',
    customerName: 'Sarah M.',
    rating: 5,
    reviewText: 'We\'ve been using Derek\'s Complete Pool Care for weekly maintenance for two years now. They\'re always reliable, professional, and our pool stays crystal clear all season. Best pool service on Long Island!',
    serviceType: 'Weekly Maintenance',
    date: '2024-07-15',
    source: 'facebook',
    featured: true,
    location: 'Suffolk County'
  },
  {
    id: 'test-3',
    customerName: 'Mike R.',
    rating: 5,
    reviewText: 'Had a major plumbing leak that other companies couldn\'t find. Derek diagnosed and fixed the problem efficiently. Great communication throughout the process and fair pricing. Will definitely use again!',
    serviceType: 'Plumbing Repair',
    date: '2024-06-28',
    source: 'birdeye',
    featured: true,
    location: 'Nassau County'
  },
  {
    id: 'test-4',
    customerName: 'Lisa T.',
    rating: 5,
    reviewText: 'Excellent service from start to finish! They installed our new salt system and variable speed pump. Energy bills are way down and the water quality is amazing. Derek really knows his stuff!',
    serviceType: 'Equipment Upgrade',
    date: '2024-05-10',
    source: 'google',
    featured: true,
    location: 'Holbrook'
  }
];
