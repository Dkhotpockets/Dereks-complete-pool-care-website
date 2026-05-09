'use client';

import { motion } from 'framer-motion';
import { businessInfo } from '@/data/business';
import { Users, Map, Star, Clock } from 'lucide-react';

const stats = [
  {
    label: 'Years of Excellence',
    value: `${businessInfo.yearsInBusiness}+`,
    icon: Clock,
    description: 'Expertise in every drop.'
  },
  {
    label: 'Clients Served',
    value: businessInfo.clientCount,
    icon: Users,
    description: 'A legacy of 5-star trust.'
  },
  {
    label: 'Service Reach',
    value: 'All Long Island',
    icon: Map,
    description: 'From Nassau to Montauk.'
  },
  {
    label: 'Google Rating',
    value: businessInfo.googleRating.toFixed(1),
    icon: Star,
    description: 'Top-rated service on Long Island.'
  }
];

export function AuthoritySection() {
  return (
    <section className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark p-8 rounded-3xl border border-white/5 hover:border-pool-500/30 transition-all group"
            >
              <div className="mb-6 p-3 bg-pool-500/10 rounded-2xl w-fit group-hover:bg-pool-500/20 transition-colors">
                <stat.icon className="w-6 h-6 text-pool-400" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-pool-100 font-semibold mb-2 uppercase text-xs tracking-widest">
                {stat.label}
              </p>
              <p className="text-pool-100/50 text-sm leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
