'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ShoppingCart, ArrowRight, Star, X, Info, ShieldCheck, Ruler } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { poolModels, PoolModel } from '@/data/pools';
import PoolCard from './PoolCard';

export function AbovegroundSection() {
  const [showCatalog, setShowCatalog] = useState(false);
  const [selectedPool, setSelectedPool] = useState<PoolModel | null>(null);

  const features = [
    'Premium Resin & Steel Models',
    'Custom Deck Integration',
    'High-Efficiency Filtration Systems',
    'Complete Professional Installation',
    'Full Warranty & Support',
    'Flexible Financing Available'
  ];

  return (
    <section id="aboveground" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-pool-500/5 blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/pools/sensation-v2.png" 
                alt="Luxury Aboveground Pool Installation" 
                fill 
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass-dark p-6 rounded-2xl border border-white/10 shadow-xl max-w-[240px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-pool-400 text-pool-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white">Top Rated</span>
              </div>
              <p className="text-pool-100/70 text-sm italic">
                "The best investment we made for our summer. Professional and beautiful!"
              </p>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-pool-500/10 border border-pool-500/20 px-4 py-2 rounded-full mb-8">
              <ShoppingCart className="w-4 h-4 text-pool-400" />
              <span className="text-xs font-bold text-pool-100 tracking-widest uppercase">Now Offering Sales & Setup</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8">
              Premium Aboveground <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-300">Pool Solutions</span>
            </h2>
            
            <p className="text-pool-100/60 text-lg mb-10 leading-relaxed">
              Experience luxury at any height. We don&apos;t just sell pools; we design backyard escapes. Our premium aboveground selections offer the durability of an inground pool with the versatility your landscape requires.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-pool-400 shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => setShowCatalog(true)}
                size="lg" 
                className="bg-pool-500 hover:bg-pool-400 text-white h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-pool-500/20 transition-all"
              >
                Shop Pool Models <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                asChild
                size="lg" 
                className="bg-transparent border-2 border-pool-500 text-pool-400 hover:bg-pool-500 hover:text-white h-14 px-8 rounded-full text-lg font-bold transition-all cursor-pointer shadow-lg shadow-pool-500/10"
              >
                <a href="#contact">Installation Quote</a>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Catalog Overlay */}
      <AnimatePresence>
        {showCatalog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCatalog(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-7xl h-[90vh] bg-zinc-900 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">Pool Model Catalog</h3>
                  <p className="text-zinc-400 text-sm">Select a model to see specifications and installation options.</p>
                </div>
                <button 
                  onClick={() => setShowCatalog(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {poolModels.map((pool) => (
                    <PoolCard 
                      key={pool.id} 
                      pool={pool} 
                      onSelect={(p) => setSelectedPool(p)}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/5 bg-zinc-950/50 shrink-0 text-center">
                <p className="text-zinc-500 text-sm italic">
                  *Prices shown are for base pool kits. Professional installation and excavation are quoted separately.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model Detail Modal */}
      <AnimatePresence>
        {selectedPool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <motion.div 
              onClick={() => setSelectedPool(null)}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src={selectedPool.image} 
                    alt={selectedPool.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="p-8 md:p-12">
                  <button 
                    onClick={() => setSelectedPool(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors md:hidden"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  
                  <div className="mb-8">
                    <span className="text-pool-400 font-bold text-xs uppercase tracking-widest mb-2 block">{selectedPool.series}</span>
                    <h4 className="text-3xl font-bold text-white mb-4">{selectedPool.name}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{selectedPool.description}</p>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="bg-pool-500/10 p-2 rounded-lg">
                        <Ruler className="w-5 h-5 text-pool-400" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-zinc-500 uppercase">Available Sizes</span>
                        <span className="text-white text-sm">{selectedPool.sizes.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-pool-500/10 p-2 rounded-lg">
                        <ShieldCheck className="w-5 h-5 text-pool-400" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-zinc-500 uppercase">Warranty & Build</span>
                        <span className="text-white text-sm">{selectedPool.specs.warranty} • {selectedPool.specs.construction}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-pool-500/10 p-2 rounded-lg">
                        <Info className="w-5 h-5 text-pool-400" />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-zinc-500 uppercase">Key Features</span>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                          {selectedPool.features.map(f => (
                            <li key={f} className="text-white text-xs flex items-center gap-2">
                              <div className="w-1 h-1 bg-pool-400 rounded-full" /> {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={() => {
                        setSelectedPool(null);
                        setShowCatalog(false);
                        window.location.hash = 'contact';
                      }}
                      className="bg-pool-500 hover:bg-pool-400 text-white flex-1 h-12 rounded-full font-bold"
                    >
                      Request This Model
                    </Button>
                    <Button 
                      onClick={() => setSelectedPool(null)}
                      variant="outline" 
                      className="border-white/10 text-white flex-1 h-12 rounded-full font-bold hover:bg-white/5"
                    >
                      Back to Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
