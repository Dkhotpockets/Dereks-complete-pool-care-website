'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { businessInfo, contactInfo } from '@/data/business';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 w-full pt-40 md:pt-48">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0c4a6e,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-pool opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 bg-pool-500/10 border border-pool-500/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-pool-400" />
              <span className="text-xs font-bold text-pool-100 tracking-widest uppercase">Premier Luxury Pool Care</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">
              The Gold Standard in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 via-sky-300 to-pool-500">
                Pool Maintenance
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-pool-100/70 mb-10 leading-relaxed max-w-2xl">
              Elevate your backyard experience with Long Island&apos;s most trusted pool artisans. 
              {businessInfo.yearsInBusiness}+ years of precision engineering and 5-star service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button asChild size="lg" className="bg-pool-500 hover:bg-pool-400 text-white h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-pool-500/25 transition-all hover:scale-105 min-h-[48px]">
                <a href="#contact" className="flex items-center">Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" /></a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-pool-100/50 text-sm border-t border-pool-100/10 pt-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pool-400" />
                <span>{businessInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pool-400" />
                <span>{contactInfo.phone}</span>
              </div>
            </div>
          </motion.div>

          {/* Image Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/luxury_hero.png" 
                alt="Luxury Pool Design" 
                fill 
                className="object-cover" 
                priority={true}
                // @ts-ignore
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 glass-dark p-4 rounded-2xl border border-white/10 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-bold text-xl">5.0 Rating</p>
                  <p className="text-pool-100/60 text-xs uppercase tracking-widest">Google Guaranteed</p>
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">⭐</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -z-10 -top-6 -right-6 w-32 h-32 bg-pool-500/20 blur-3xl rounded-full" />
            <div className="absolute -z-10 -bottom-6 -left-6 w-48 h-48 bg-sky-500/10 blur-3xl rounded-full" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
