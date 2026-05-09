'use client';

import { motion } from 'framer-motion';
import { services } from '@/data/services';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ServicesSection() {
  return (
    <section id="services" className="py-32 bg-slate-900/50 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-pool-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-pool-900/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-pool-400 uppercase tracking-[0.3em] mb-4">Our Service Suites</h2>
            <p className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
              Precision Care for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-200 to-pool-500">
                Premium Pool Owners
              </span>
            </p>
            <div className="w-24 h-1 bg-pool-500 mx-auto rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Droplets;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                <div className="h-full glass-dark border border-white/5 p-10 rounded-[2.5rem] transition-all duration-500 hover:border-pool-500/50 hover:bg-slate-900/80 flex flex-col">
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-pool-500/10 rounded-2xl group-hover:bg-pool-500/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-pool-400" />
                    </div>
                    {service.isPremium && (
                      <Badge className="bg-pool-500/20 text-pool-400 border-none px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                        V5 Elite
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-pool-300 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-pool-100/60 leading-relaxed mb-8 flex-grow">
                    {service.longDescription}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {service.features.map(feature => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-pool-100/40">
                        <Icons.Check className="w-4 h-4 text-pool-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="link" className="text-pool-400 p-0 h-auto font-bold tracking-wider group-hover:gap-4 transition-all">
                    <a href={service.link}>
                      Explore Service <Icons.ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            );
          })}

          {/* Custom Solutions Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: services.length * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-full"
          >
            <div className="h-full bg-pool-500/5 border border-pool-500/20 p-10 rounded-[2.5rem] transition-all duration-500 hover:bg-pool-500/10 flex flex-col justify-center text-center">
              <div className="mb-8 mx-auto">
                <div className="p-4 bg-pool-500/20 rounded-full">
                  <Icons.Plus className="w-8 h-8 text-pool-400" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                And Much More...
              </h3>
              
              <p className="text-pool-100/60 leading-relaxed mb-8">
                From plumbing overhauls to custom lighting and unique repair challenges—if it involves a pool, we have the solution.
              </p>

              <Button asChild className="bg-pool-500 hover:bg-pool-400 text-white rounded-full py-6 font-bold shadow-lg shadow-pool-500/20">
                <a href="#contact">Request Custom Service</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
