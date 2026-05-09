'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Hammer, CheckCircle2, Sparkles, Paintbrush, Zap } from 'lucide-react';
import Image from 'next/image';

export function RenovationsSection() {
  const renovationFeatures = [
    {
      title: 'Modern Tile & Coping',
      description: 'Hand-selected premium glass and stone finishes.',
      icon: Paintbrush
    },
    {
      title: 'Aboveground Repairs',
      description: 'Liner patches, frame stabilization, and equipment fixes.',
      icon: Hammer
    },
    {
      title: 'Automation & Lighting',
      description: 'Smart controls and vibrant LED transformations.',
      icon: Zap
    },
    {
      title: 'Energy Efficiency',
      description: 'Upgrading to variable speed pumps and heaters.',
      icon: Sparkles
    }
  ];

  return (
    <section id="renovations" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pool-500/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-8">
              <Hammer className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-200 tracking-widest uppercase">Legacy Restoration Specialists</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8">
              Expert Renovations <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">& Professional Repairs</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
              Don&apos;t settle for an outdated or broken backyard. Our experts specialize in transforming aging pools into modern architectural masterpieces and providing critical repairs for both inground and aboveground systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {renovationFeatures.map((feature, index) => (
                <div key={index} className="flex flex-col gap-3 p-6 glass-dark rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors group">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                    <p className="text-slate-500 text-sm leading-snug">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-amber-600 hover:bg-amber-500 text-white h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-amber-600/20 transition-all"
              >
                <a href="#contact">Get a Renovation Quote</a>
              </Button>
            </div>
            
            <p className="mt-8 text-slate-500 text-sm italic">
              * Don't see your specific repair or renovation need? We handle all custom pool projects and emergency repairs. Just ask!
            </p>
          </motion.div>

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/renovation.png" 
                alt="Luxury Pool Renovation Transformation" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              
              {/* Overlay labels */}
              <div className="absolute top-8 left-8 flex gap-2">
                <span className="px-4 py-1.5 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">Before</span>
                <span className="px-4 py-1.5 bg-amber-500 border border-amber-400 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">After</span>
              </div>
            </div>
            
            {/* Achievement card */}
            <div className="absolute -bottom-10 -left-10 glass-dark p-8 rounded-3xl border border-white/10 shadow-2xl max-w-[280px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pool-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white leading-none">150+</div>
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Renovations Done</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Expert-led restorations that increase property value and summer enjoyment.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
