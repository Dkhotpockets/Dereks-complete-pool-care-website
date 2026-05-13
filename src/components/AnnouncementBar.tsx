'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { currentSales } from '@/data/business';

export function AnnouncementBar() {
  const activeSale = currentSales[0]; // Default to the first sale
  
  if (!activeSale) return null;

  return (
    <div className="bg-gradient-to-r from-pool-600 to-pool-500 py-2.5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-center gap-4 text-white text-xs sm:text-sm font-bold tracking-wide">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="hidden sm:block"
          >
            <Sparkles className="h-4 w-4 text-yellow-300" />
          </motion.div>
          
          <p className="text-center">
            <span className="hidden md:inline">{activeSale.subtitle}: </span>
            <span className="text-yellow-200">{activeSale.description}</span>
            <span className="ml-2 opacity-80 hidden sm:inline">Ends {activeSale.endDate}</span>
          </p>

          <a 
            href="#contact" 
            className="flex items-center gap-1 group hover:text-yellow-200 transition-colors"
          >
            Claim Offer <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
